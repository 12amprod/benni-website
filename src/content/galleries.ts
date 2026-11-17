import {
	type PageId,
	type SegmentId,
	type SegmentLayout,
	segments as segmentRules,
} from "../../studio/shared/archive-rules.ts";
import { type ArchiveWork, archiveWorks } from "./archive.ts";
import { site } from "./site.ts";

/**
 * The gallery pages of the site and which works each one shows.
 *
 * A work carries two things from the CMS: whose it is (`page`) and what kind it is
 * (`segment`). Tim's portfolio is split by kind into three pages, the way a photographer's
 * site lists its series; Yung Shattered and relapse each hold all their kinds on one page.
 * `segments` is also the order the groups appear in on the page.
 */
const galleryRules = {
	events: { page: "tim", segments: ["events"] },
	videos: { page: "tim", segments: ["video"] },
	serien: { page: "tim", segments: ["frei", "releases"] },
	"yung-shattered": {
		page: "yung-shattered",
		segments: ["video", "releases", "events", "frei"],
	},
	relapse: { page: "relapse", segments: ["events", "video", "releases", "frei"] },
} as const satisfies Record<string, { page: PageId; segments: readonly SegmentId[] }>;

export type GalleryId = keyof typeof galleryRules;

export type GalleryGroup = {
	segment: SegmentId;
	label: string;
	layout: SegmentLayout;
	works: readonly ArchiveWork[];
};

/**
 * A gallery's works, grouped by kind in the gallery's order, newest first inside each. A
 * kind with no works is left out rather than printed as a heading over nothing.
 */
export function galleryGroups(id: GalleryId): GalleryGroup[] {
	const { page, segments } = galleryRules[id];
	return segments
		.map((segment) => {
			const works = archiveWorks.filter((work) => work.page === page && work.segment === segment);
			return {
				segment,
				label: site.groupLabels[segment],
				layout: segmentRules[segment].layout,
				works,
			};
		})
		.filter((group) => group.works.length > 0);
}

/** Every gallery id, for tests that need to see the whole site. */
export const galleryIds = Object.keys(galleryRules) as GalleryId[];
