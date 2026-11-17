/**
 * The archive's structure and its one hard rule, shared by everything that touches it:
 * the Studio validates against it while the team edits, the build-time pull refuses data
 * that breaks it, and the website's tests check the archive it actually ships.
 *
 * It lives in `studio/` rather than `src/` because the Studio is served by its own Vite
 * root and may not import from outside it; the website can import from here freely.
 */

/**
 * Whose work it is, which decides where on the site it appears. Tim's own portfolio comes
 * first; Yung Shattered and the relapse series each get a page of their own. Every work
 * on the site is photographed or filmed by Tim — this is about who it was *for*.
 */
export const pageIds = ["tim", "yung-shattered", "relapse"] as const;
export type PageId = (typeof pageIds)[number];

export const pages: Record<PageId, { title: string }> = {
	tim: { title: "Tim — Portfolio" },
	"yung-shattered": { title: "Yung Shattered" },
	relapse: { title: "relapse" },
};

export function isPageId(value: unknown): value is PageId {
	return typeof value === "string" && (pageIds as readonly string[]).includes(value);
}

/** What kind of work it is — a series, a film, a cover — which decides how it is laid out. */
export const segmentIds = ["events", "video", "releases", "frei"] as const;
export type SegmentId = (typeof segmentIds)[number];

/**
 * `sheet` prints a work as rows of four equal frames; `tiles` prints it as one captioned
 * plate. Films have one still and covers are one picture, so those segments are tiles.
 */
export type SegmentLayout = "sheet" | "tiles";

export const segments: Record<SegmentId, { title: string; layout: SegmentLayout }> = {
	events: { title: "Events", layout: "sheet" },
	video: { title: "Videoarbeiten", layout: "tiles" },
	releases: { title: "Releases & Cover", layout: "tiles" },
	frei: { title: "Freie Arbeiten", layout: "sheet" },
};

export function isSegmentId(value: unknown): value is SegmentId {
	return typeof value === "string" && (segmentIds as readonly string[]).includes(value);
}

/** A series comes in steps of four frames: two full rows of the two-column grid. */
export const ROW = 4;
/** Three steps (twelve frames) is the most a work may take before it stops reading as one shoot. */
export const MAX_ROWS = 3;

/**
 * Why a work with `count` frames cannot sit in `segment`, or `null` if it can.
 *
 * The rule exists because of how a series looks, not because of any technical limit: the
 * grid is two frames wide, so an odd count leaves the last photograph alone beside an empty
 * cell, and steps of four keep every series a balanced block. The messages are written for
 * the person editing, in German, and say what to do — not what went wrong in the abstract.
 */
export function frameCountProblem(segment: SegmentId, count: number): string | null {
	if (segments[segment].layout === "tiles") {
		return count === 1
			? null
			: `In „${segments[segment].title}“ steht jede Arbeit als eine Kachel — genau 1 Bild, gerade sind es ${count}.`;
	}

	if (count === 0) return "Mindestens 4 Bilder.";
	if (count % ROW !== 0) {
		const down = count - (count % ROW);
		const up = down + ROW;
		const options = down > 0 ? `${down} oder ${up}` : `${up}`;
		return `Eine Serie hat ${ROW}, ${ROW * 2} oder ${ROW * 3} Bilder. Bei ${count} Bildern geht sie nicht auf — kürze auf ${options}.`;
	}
	if (count > ROW * MAX_ROWS) {
		return `Höchstens ${ROW * MAX_ROWS} Bilder pro Arbeit, gerade sind es ${count}.`;
	}
	return null;
}
