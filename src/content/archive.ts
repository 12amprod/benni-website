import {
	type PageId,
	type SegmentId,
	type SegmentLayout,
	segments,
} from "../../studio/shared/archive-rules.ts";
import { localWorks } from "./archive.local.ts";
import type { ArchivePhotoSource, ArchiveSnapshot } from "./archive-source.ts";

export type ArchivePhoto = ArchivePhotoSource;

export type ArchiveWork = {
	page: PageId;
	segment: SegmentId;
	/** `sheet`: a series of frames under one title. `tiles`: one captioned picture. */
	layout: SegmentLayout;
	title: string;
	/** Ready to print: `26.07.2026`. */
	date: string;
	meta: string;
	url: string;
	/** A film rather than a shoot: its tile links out to the film instead of enlarging. */
	video: boolean;
	photos: readonly ArchivePhoto[];
};

/*
 * The snapshot `pnpm build` pulls out of Sanity, if there is one.
 *
 * Read with `import.meta.glob` rather than a plain import because the file is allowed not
 * to exist: it is generated, gitignored, and absent on a fresh clone, in CI without
 * credentials, and before the Sanity project has been set up. A glob that matches nothing
 * returns an empty object instead of failing the build, and the archive falls back to the
 * local one.
 *
 * Both sources are baked into the HTML and the bundle at build time. Nothing on the live
 * site ever talks to Sanity: not on first paint, not on a client-side navigation, not
 * ever. That is why this is a generated module and not a route loader — a loader re-runs
 * in the browser when a visitor navigates to the page from another one.
 */
const snapshots = import.meta.glob<ArchiveSnapshot>("./archive.sanity.json", {
	eager: true,
	import: "default",
});
const snapshot = Object.values(snapshots)[0];

/** Which source this build used. Tests and the build log read it; the page does not. */
export const archiveSource: "sanity" | "local" = snapshot ? "sanity" : "local";

/** `2026-07-26` → `26.07.2026`. */
function printDate(iso: string): string {
	const [year, month, day] = iso.split("-");
	return `${day}.${month}.${year}`;
}

/**
 * Every work the site shows, newest first. Both sources list works oldest first; reversed
 * before the stable sort, two works from the same day come out newest-created first.
 */
export const archiveWorks: readonly ArchiveWork[] = (snapshot?.works ?? localWorks)
	.toReversed()
	.toSorted((a, b) => b.date.localeCompare(a.date))
	.map((work) => ({
		page: work.page,
		segment: work.segment,
		layout: segments[work.segment].layout,
		title: work.title,
		date: printDate(work.date),
		meta: work.meta,
		url: work.url,
		video: work.segment === "video",
		photos: work.photos,
	}));
