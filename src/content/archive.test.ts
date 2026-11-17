import { describe, expect, it } from "vitest";
import { frameCountProblem, isPageId, ROW, segments } from "../../studio/shared/archive-rules.ts";
import { archiveSource, archiveWorks } from "./archive.ts";
import { galleryGroups, galleryIds } from "./galleries.ts";

/*
 * These run against whatever archive this build would ship — the local one on a fresh
 * clone, the Sanity snapshot after `pnpm content:pull`. The rules are the ones the Studio
 * enforces; testing them here catches anything that reached the dataset some other way.
 */
describe(`the archive this build ships (${archiveSource})`, () => {
	const frames = archiveWorks.flatMap((work) => work.photos);

	it("is not empty", () => {
		expect(archiveWorks.length).toBeGreaterThan(0);
	});

	it("puts every work on a page", () => {
		for (const work of archiveWorks) expect(isPageId(work.page), work.title).toBe(true);
	});

	it("fills every row: series in whole rows of four, tiles with exactly one frame", () => {
		for (const work of archiveWorks) {
			expect(frameCountProblem(work.segment, work.photos.length), work.title).toBeNull();
		}
	});

	it("describes every frame and has a full-size picture for it", () => {
		for (const photo of frames) {
			expect(photo.alt.trim(), photo.src).not.toBe("");
			expect(photo.full, photo.src).not.toBe("");
		}
	});

	it("runs newest to oldest", () => {
		const iso = archiveWorks.map((work) => work.date.split(".").reverse().join("-"));
		expect(iso).toEqual(iso.toSorted().toReversed());
	});

	it("links every work back to its Instagram post", () => {
		for (const work of archiveWorks) {
			expect(work.url).toMatch(/^https:\/\/www\.instagram\.com\//);
		}
	});

	it("marks films, and only films, as video", () => {
		for (const work of archiveWorks) expect(work.video).toBe(work.segment === "video");
	});

	it("shows every work on exactly one gallery page", () => {
		const shown = galleryIds.flatMap((id) =>
			galleryGroups(id).flatMap((group) => group.works.map((work) => work.url)),
		);
		expect(shown.toSorted()).toEqual(archiveWorks.map((work) => work.url).toSorted());
	});

	it("does not show the Meisterfeier", () => {
		expect(archiveWorks.map((work) => work.title)).not.toContain("Meisterfeier MSV Eisleben");
	});
});

describe("frameCountProblem", () => {
	it("accepts whole rows on a sheet, up to three", () => {
		for (const count of [4, 8, 12]) expect(frameCountProblem("events", count)).toBeNull();
	});

	it("refuses a short row and says what to cut to", () => {
		expect(frameCountProblem("events", 5)).toContain("4 oder 8");
		expect(frameCountProblem("frei", 3)).toContain(`${ROW}`);
		expect(frameCountProblem("events", 0)).not.toBeNull();
		expect(frameCountProblem("events", 16)).not.toBeNull();
	});

	it("wants exactly one frame on a tile", () => {
		expect(frameCountProblem("video", 1)).toBeNull();
		expect(frameCountProblem("releases", 2)).toContain(segments.releases.title);
	});
});
