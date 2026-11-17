import { describe, expect, it } from "vitest";
import { type InstagramMedia, picturesIn, postDate, shortcodeFrom } from "./instagram.ts";

describe("shortcodeFrom", () => {
	it("reads every link shape Instagram hands out", () => {
		expect(shortcodeFrom("https://www.instagram.com/p/DbQ-m5eDG00/")).toBe("DbQ-m5eDG00");
		expect(shortcodeFrom("https://www.instagram.com/timflp.archive/p/DbQ-m5eDG00/")).toBe(
			"DbQ-m5eDG00",
		);
		expect(shortcodeFrom("https://instagram.com/reel/Dc3z6dlsxI4/?igsh=abc")).toBe("Dc3z6dlsxI4");
		expect(shortcodeFrom("https://www.instagram.com/p/DbQ-m5eDG00/?img_index=3")).toBe(
			"DbQ-m5eDG00",
		);
	});

	it("refuses links that are not a post", () => {
		expect(shortcodeFrom("https://www.instagram.com/timflp.archive/")).toBeNull();
		expect(shortcodeFrom("https://example.com/p/DbQ-m5eDG00/")).toBeNull();
	});
});

const base = { permalink: "https://www.instagram.com/p/X/", timestamp: "2026-07-26T18:04:11+0000" };

describe("picturesIn", () => {
	it("takes a photo as itself", () => {
		const media: InstagramMedia = { ...base, id: "1", media_type: "IMAGE", media_url: "a.jpg" };
		expect(picturesIn(media)).toEqual([{ id: "1", url: "a.jpg" }]);
	});

	it("takes a film's clean cover, not the video file", () => {
		const media: InstagramMedia = {
			...base,
			id: "2",
			media_type: "VIDEO",
			media_url: "film.mp4",
			thumbnail_url: "cover.jpg",
		};
		expect(picturesIn(media)).toEqual([{ id: "2", url: "cover.jpg" }]);
	});

	it("takes every item of a carousel in order, skipping what Instagram withholds", () => {
		const media: InstagramMedia = {
			...base,
			id: "3",
			media_type: "CAROUSEL_ALBUM",
			children: {
				data: [
					{ id: "a", media_type: "IMAGE", media_url: "1.jpg" },
					{ id: "b", media_type: "VIDEO", media_url: "2.mp4", thumbnail_url: "2.jpg" },
					{ id: "c", media_type: "IMAGE" },
					{ id: "d", media_type: "IMAGE", media_url: "4.jpg" },
				],
			},
		};
		expect(picturesIn(media).map((picture) => picture.url)).toEqual(["1.jpg", "2.jpg", "4.jpg"]);
	});
});

describe("postDate", () => {
	it("keeps the day Sanity's date field stores", () => {
		expect(postDate(base.timestamp)).toBe("2026-07-26");
	});
});
