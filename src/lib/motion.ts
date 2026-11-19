/**
 * The site's motion, in one place: whether to move at all, the view transitions that carry
 * a photograph from the grid into the enlarged view and back, and the reveal that lets
 * frames further down a page rise into place as they are scrolled to.
 *
 * All of it is an enhancement over a page that already works. Without JavaScript, in a
 * browser without view transitions, or with „Bewegung reduzieren“ switched on in the system
 * settings, the visitor gets the same pictures in the same places — they just do not move.
 * The timings live in `src/styles.css`, next to the curves.
 */

/** The gap between frames arriving together — apple.com staggers a group by 130ms. */
const STAGGER_MS = 130;
/** Frames past the fourth in one arrival start with the fourth, so none waits long. */
const STAGGER_STEPS = 3;

export function prefersMotion() {
	return (
		typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
	);
}

/** `photo`: into or out of the enlarged view. `step`: from one enlarged photo to the next. */
export type TransitionKind = "photo" | "step";

let latest = 0;

/**
 * Runs `update` as a view transition of the given kind, or simply runs it where the browser
 * has none or the visitor asked for less motion. `update` must change the DOM before it
 * returns — wrap React state in `flushSync` — because the browser captures the new state
 * straight after. Resolves once the transition has played out.
 */
export function transition(kind: TransitionKind, update: () => void): Promise<void> {
	if (!prefersMotion() || !("startViewTransition" in document)) {
		update();
		return Promise.resolve();
	}

	const root = document.documentElement;
	const id = ++latest;
	root.dataset.transition = kind;
	return document
		.startViewTransition(update)
		.finished.catch(() => {})
		.then(() => {
			// A transition started on top of this one has taken over the attribute.
			if (id === latest) delete root.dataset.transition;
		});
}

/*
 * Frames are checked in one pass after React has committed a page, rather than one at a
 * time as each mounts: measuring a frame right after hiding the last would force a fresh
 * layout per frame, and a page holds dozens.
 */
const mounted = new Set<HTMLElement>();
let observer: IntersectionObserver | undefined;

function arrivals() {
	observer ??= new IntersectionObserver(
		(entries) => {
			let arriving = 0;
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const frame = entry.target as HTMLElement;
				observer?.unobserve(frame);
				frame.style.transitionDelay = `${Math.min(arriving++, STAGGER_STEPS) * STAGGER_MS}ms`;
				frame.dataset.reveal = "shown";
				frame.addEventListener(
					"transitionend",
					() => frame.style.removeProperty("transition-delay"),
					{ once: true },
				);
			}
		},
		// A frame starts to rise once it is a little way onto the screen, so the movement is seen.
		{ rootMargin: "0px 0px -12% 0px" },
	);
	return observer;
}

function settle() {
	const fold = window.innerHeight;
	const below = [...mounted].filter((frame) => frame.getBoundingClientRect().top >= fold);
	mounted.clear();
	for (const frame of below) {
		frame.dataset.reveal = "hidden";
		arrivals().observe(frame);
	}
}

/**
 * Ref callback for a frame that should rise into place when it is scrolled to. A frame that
 * mounts on screen is left alone: hiding it would be a flash, and the first frames on a page
 * have their own entrance (`animate-rise`).
 */
export function reveal(frame: HTMLElement | null) {
	if (!frame || !prefersMotion() || !("IntersectionObserver" in window)) return;
	if (mounted.size === 0) queueMicrotask(settle);
	mounted.add(frame);
	return () => {
		mounted.delete(frame);
		observer?.unobserve(frame);
	};
}

/**
 * Puts a frame that is still waiting to rise — or rising — straight into place, unmoved: the
 * enlarged view is about to shrink a photograph into it, and it must already be there.
 */
export function settleFrame(element: Element) {
	const frame = element.closest<HTMLElement>("[data-reveal]");
	if (!frame) return;
	observer?.unobserve(frame);
	frame.removeAttribute("data-reveal");
	frame.style.removeProperty("transition-delay");
}

/** The entrance delay for the `index`th frame on a page, staggered like a revealed group. */
export function riseDelay(index: number) {
	return { animationDelay: `${index * STAGGER_MS}ms` };
}
