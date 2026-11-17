/**
 * The shape the archive arrives in, whichever source it comes from.
 *
 * Both the local archive (`archive.local.ts`) and the snapshot the build pulls out of
 * Sanity (`archive.sanity.json`, written by `scripts/pull-archive.ts`) are a flat list of
 * works in exactly this form. `archive.ts` turns either into the segmented, sorted,
 * labelled archive the page renders — so the components have one input and never know
 * where it came from.
 *
 * Plain types and no Vite APIs, because the Node scripts in `scripts/` import it too.
 */
import type { PageId, SegmentId } from "../../studio/shared/archive-rules.ts";

export type ArchivePhotoSource = {
	/**
	 * The grid's frame, ready to put in `src`: a 4:5 Sanity CDN crop, or a local `/images/…`
	 * path that the grid crops with `object-fit`.
	 */
	src: string;
	/** The same crop at several widths. Only the CDN can make them, so local frames have none. */
	srcSet?: string;
	/** The whole picture, uncropped and large, for the enlarged view. */
	full: string;
	alt: string;
};

export type ArchiveWorkSource = {
	page: PageId;
	segment: SegmentId;
	title: string;
	/** ISO date, `2026-07-26` — the day the work went up on Instagram. */
	date: string;
	meta: string;
	/** The Instagram post the work came from, and links back to. */
	url: string;
	photos: ArchivePhotoSource[];
};

/** What `scripts/pull-archive.ts` writes, and `archive.ts` reads if it is there. */
export type ArchiveSnapshot = {
	source: "sanity";
	projectId: string;
	dataset: string;
	pulledAt: string;
	works: ArchiveWorkSource[];
};
