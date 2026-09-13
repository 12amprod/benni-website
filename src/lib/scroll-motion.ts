/**
 * Scroll motion for the site: staggered section reveals, photographs that
 * travel as their panel passes, the hero falling away, and the header
 * background that appears once the page has moved.
 *
 * Two earlier attempts are worth remembering. The first drove everything from
 * CSS scroll timelines (`animation-timeline: view()`); it measured correctly in
 * Chromium and did nothing in the browser it was for, and because its fallback
 * is "content simply appears", a dead animation looked exactly like no
 * animation. IntersectionObserver has shipped everywhere since 2019 and cannot
 * quietly no-op. The second worked but was pitched so low nobody noticed it —
 * hence the stagger below, which is what separates a reveal that reads as
 * deliberate from one that reads as a repaint.
 *
 * Nothing here hides anything on its own: only elements that are below the fold
 * at the moment this runs are armed. With JavaScript off, or if the bundle never
 * arrives, the page is the static page, complete and readable.
 */

/** How far a photograph is allowed to drift closer, as a scale factor. */
const ZOOM = 0.18;
/** How far a photograph slides against the scroll, in pixels at each extreme. */
const SHIFT = 42;
/** Gap between neighbouring reveals, and the point at which it stops growing. */
const STAGGER_MS = 90;
const STAGGER_MAX = 6;

export function initScrollMotion(): () => void {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const cleanups: Array<() => void> = [];

	// --- Section reveals ---------------------------------------------------
	// Kept under reduced motion, where the CSS drops the travel and shortens the
	// fade: an element that teleports into place is worse than one that fades.
	const armed = [...document.querySelectorAll<HTMLElement>(".reveal")].filter(
		(el) => el.getBoundingClientRect().top > window.innerHeight * 0.85,
	);

	// Siblings arrive one after another rather than as a block. Grouping by
	// parent means a grid of ten photographs ripples, while a lone heading is
	// not needlessly delayed.
	const seen = new Map<Element, number>();
	for (const el of armed) {
		const parent = el.parentElement;
		if (!parent) continue;
		const index = seen.get(parent) ?? 0;
		seen.set(parent, index + 1);
		if (index > 0) {
			el.style.setProperty("--reveal-delay", `${Math.min(index, STAGGER_MAX) * STAGGER_MS}ms`);
		}
		el.dataset.reveal = "pending";
	}

	if (armed.length > 0) {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					(entry.target as HTMLElement).dataset.reveal = "in";
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
		);
		for (const el of armed) observer.observe(el);
		cleanups.push(() => observer.disconnect());
	}

	// --- Per-frame work ----------------------------------------------------
	// The header switch is a colour change and safe for everyone. The travelling
	// photographs and the falling hero are large moving surfaces — vestibular
	// triggers — so they are not wired up at all when reduced motion is asked for.
	const panels = reduced ? [] : [...document.querySelectorAll<HTMLElement>(".scroll-zoom")];
	const heroes = reduced ? [] : [...document.querySelectorAll<HTMLElement>(".hero-exit")];
	const root = document.documentElement;
	let frame = 0;

	const update = () => {
		frame = 0;
		root.toggleAttribute("data-scrolled", window.scrollY > 8);

		const viewport = window.innerHeight;

		for (const el of panels) {
			const rect = el.getBoundingClientRect();
			if (rect.bottom < 0 || rect.top > viewport) continue;
			// 0 while the panel rests in view, 1 once it has fully travelled past.
			const passed = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
			// -1 above the fold through +1 below it, for the counter-scroll slide.
			const centred = (rect.top + rect.height / 2 - viewport / 2) / viewport;
			el.style.setProperty("--zoom", String(1 + passed * ZOOM));
			el.style.setProperty("--shift", `${Math.max(-1, Math.min(1, centred)) * SHIFT}px`);
		}

		for (const el of heroes) {
			const rect = el.getBoundingClientRect();
			const progress = Math.min(1, Math.max(0, -rect.top / (viewport * 0.7)));
			el.style.setProperty("--exit-fade", String(1 - progress));
			el.style.setProperty("--exit-rise", `${progress * -80}px`);
		}
	};

	const onScroll = () => {
		if (frame === 0) frame = requestAnimationFrame(update);
	};

	update();
	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("resize", onScroll, { passive: true });
	cleanups.push(() => {
		window.removeEventListener("scroll", onScroll);
		window.removeEventListener("resize", onScroll);
		if (frame !== 0) cancelAnimationFrame(frame);
	});

	return () => {
		for (const cleanup of cleanups) cleanup();
	};
}
