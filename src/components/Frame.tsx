import type { MouseEvent, PointerEvent } from "react";
import type { ArchivePhoto } from "#/content/archive";
import { reveal, riseDelay } from "#/lib/motion";

/**
 * How wide a frame is drawn, for the browser to choose from `srcset`: half the viewport
 * below `lg`, and from `lg` one of two columns beside the sidebar, which tops out near
 * 34rem in the `max-w-6xl` container.
 */
const SIZES = "(min-width: 64rem) 34rem, 50vw";

/** The frames that rise in as a page opens; every later one rises as it is scrolled to. */
const OPENING_FRAMES = 6;

type FrameImageProps = {
	photo: ArchivePhoto;
	/** Above the fold on first paint: fetched at once rather than when scrolled to. */
	eager?: boolean;
};

/**
 * One frame in a grid: a 4:5 portrait, every one the same shape, so a page of different
 * photographs reads as one body of work. The CDN has already cut it around the hotspot;
 * `object-cover` does the same for the local fallback frames, which arrive uncut.
 *
 * `data-full` names the picture behind the frame, so the enlarged view can find the frame
 * again to grow out of and shrink back into (`frameOf`).
 */
export function FrameImage({ photo, eager = false }: FrameImageProps) {
	return (
		<img
			src={photo.src}
			srcSet={photo.srcSet}
			sizes={photo.srcSet ? SIZES : undefined}
			alt={photo.alt}
			width={800}
			height={1000}
			loading={eager ? "eager" : "lazy"}
			fetchPriority={eager ? "high" : "auto"}
			decoding="async"
			data-full={photo.full}
			className="aspect-4/5 size-full scroll-mt-header bg-surface object-cover"
		/>
	);
}

/** The frame in the grid showing `photo`, if the page holds one. */
export function frameOf(photo: ArchivePhoto) {
	return [...document.querySelectorAll<HTMLImageElement>("img[data-full]")].find(
		(img) => img.dataset.full === photo.full,
	);
}

/**
 * How the `index`th frame on a page arrives: the first few rise in as the page opens, one
 * after another; every later one waits below the fold and rises when it is scrolled to.
 * Spread onto the frame's list item.
 */
export function arrival(index: number) {
	return index < OPENING_FRAMES
		? { className: "motion-safe:animate-rise", style: riseDelay(index) }
		: { ref: reveal };
}

/**
 * How wide the whole picture is drawn in the enlarged view, for the browser to choose from
 * its `srcset`: the full width, unless the screen's height runs out first.
 */
export function wholeSizes(photo: ArchivePhoto) {
	return photo.width && photo.height
		? `min(100vw, ${Math.ceil((100 * photo.width) / photo.height)}vh)`
		: "100vw";
}

const preloaded = new Map<string, Promise<void>>();

/**
 * Fetches and decodes the whole picture behind a frame, at the size the enlarged view will
 * ask for. Resolves when it can be drawn — or failed to load, which the enlarged view then
 * shows the way any broken image shows.
 */
export function preloadWhole(photo: ArchivePhoto) {
	let ready = preloaded.get(photo.full);
	if (!ready) {
		const img = new Image();
		if (photo.fullSrcSet) {
			img.sizes = wholeSizes(photo);
			img.srcset = photo.fullSrcSet;
		}
		img.src = photo.full;
		ready = img.decode().catch(() => {});
		preloaded.set(photo.full, ready);
	}
	return ready;
}

/**
 * The link around an enlargeable frame. A click opens the enlarged view rather than follow
 * the link; the link itself points at the full-size picture, so with JavaScript off — or
 * with a modifier key held, to open it in a tab — it still does the useful thing.
 *
 * Pointing at a frame with a mouse, or tabbing to it, starts fetching the whole picture, so
 * it is usually there by the time the click lands. A finger is not counted: on a phone every
 * scroll starts with one, and fetching each frame it brushes past would waste the data plan.
 */
export function enlargeLink(photo: ArchivePhoto, open: () => void) {
	return {
		href: photo.full,
		onClick: (event: MouseEvent<HTMLAnchorElement>) => {
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
				return;
			}
			event.preventDefault();
			open();
		},
		onPointerEnter: (event: PointerEvent<HTMLAnchorElement>) => {
			if (event.pointerType === "mouse") preloadWhole(photo);
		},
		onFocus: () => preloadWhole(photo),
	};
}

/**
 * The state every enlargeable frame and tile shares: it dims under a mouse, and presses in
 * a little under a finger, which gets no hover.
 */
export const frameLinkClass =
	"group block transition-[opacity,scale] duration-300 ease-ui hover:opacity-80 focus-visible:opacity-80 active:scale-98";
