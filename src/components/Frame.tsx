import type { MouseEvent } from "react";
import type { ArchivePhoto } from "#/content/archive";

/**
 * How wide a frame is drawn, for the browser to choose from `srcset`: half the viewport
 * below `lg`, and from `lg` one of two columns beside the sidebar, which tops out near
 * 34rem in the `max-w-6xl` container.
 */
const SIZES = "(min-width: 64rem) 34rem, 50vw";

type FrameImageProps = {
	photo: ArchivePhoto;
	/** Above the fold on first paint: fetched at once rather than when scrolled to. */
	eager?: boolean;
};

/**
 * One frame in a grid: a 4:5 portrait, every one the same shape, so a page of different
 * photographs reads as one body of work. The CDN has already cut it around the hotspot;
 * `object-cover` does the same for the local fallback frames, which arrive uncut.
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
			className="aspect-4/5 size-full bg-surface object-cover"
		/>
	);
}

/**
 * A click that should open the enlarged view rather than follow the link. The link itself
 * points at the full-size picture, so with JavaScript off — or with a modifier key held, to
 * open it in a tab — it still does the useful thing.
 */
export function enlargeOnClick(open: () => void) {
	return (event: MouseEvent<HTMLAnchorElement>) => {
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
			return;
		}
		event.preventDefault();
		open();
	};
}

/** The hover state every enlargeable frame and tile shares. */
export const frameLinkClass =
	"group block transition-opacity duration-300 ease-ui hover:opacity-80 focus-visible:opacity-80";
