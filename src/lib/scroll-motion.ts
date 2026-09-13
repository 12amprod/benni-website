/**
 * Scroll motion for the home page: section reveals, a slow push-in on the
 * full-bleed photographs, and the header background that appears once the page
 * has moved.
 *
 * Why not CSS scroll timelines: the first attempt used `animation-timeline:
 * view()`. It measured correctly in Chromium and did nothing whatsoever in the
 * browser it was meant for. The API is too new to carry a whole page, and its
 * failure mode is silent — the content simply appears, so a broken animation
 * looks exactly like no animation. IntersectionObserver has shipped everywhere
 * since 2019 and cannot quietly no-op.
 *
 * Why not GSAP: reveals and a scale are not what a 110 KB scroll library is for
 * (pinning, scrubbed timelines, SplitText, Flip). This file is the whole motion
 * layer and it costs nothing to download.
 *
 * Nothing here hides anything on its own. Only elements that are below the fold
 * *at the moment this runs* are armed, so there is never a frame where visible
 * content blinks out — and with JavaScript off, or if the bundle never arrives,
 * the page is just the static page, complete and readable.
 */

/** How far a photograph is allowed to drift closer, as a scale factor. */
const ZOOM = 0.08;

export function initScrollMotion(): () => void {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const cleanups: Array<() => void> = [];

	// --- Section reveals ---------------------------------------------------
	// Kept under reduced motion, where the CSS drops the travel and shortens the
	// fade: an element that teleports into place is worse than one that fades.
	const candidates = [...document.querySelectorAll<HTMLElement>(".reveal")];
	const armed = candidates.filter(
		(el) => el.getBoundingClientRect().top > window.innerHeight * 0.9,
	);
	for (const el of armed) el.dataset.reveal = "pending";

	if (armed.length > 0) {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					(entry.target as HTMLElement).dataset.reveal = "in";
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
		);
		for (const el of armed) observer.observe(el);
		cleanups.push(() => observer.disconnect());
	}

	// --- Header background + photograph drift ------------------------------
	// The header switch is a colour change, which is safe for everyone. The
	// drift is a large element scaling under the reader — a vestibular trigger —
	// so it is not wired up at all when reduced motion is asked for.
	const panels = reduced ? [] : [...document.querySelectorAll<HTMLElement>(".scroll-zoom")];
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
			const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
			el.style.setProperty("--zoom", String(1 + progress * ZOOM));
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
