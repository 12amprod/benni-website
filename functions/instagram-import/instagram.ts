/**
 * The parts of the Instagram import that need no network: reading a post link, and picking
 * the pictures out of what the Instagram API returns. Kept apart from the handler so they
 * can be tested without a token, a Sanity project or Instagram.
 */

/** `https://www.instagram.com/timflp.archive/p/DbQ-m5eDG00/?img_index=2` → `DbQ-m5eDG00`. */
export function shortcodeFrom(url: string): string | null {
	const match = url.match(/instagram\.com\/(?:[\w.]+\/)?(?:p|reel|reels|tv)\/([\w-]+)/);
	return match?.[1] ?? null;
}

type MediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

type MediaChild = {
	id: string;
	media_type: MediaType;
	media_url?: string;
	thumbnail_url?: string;
};

/** One item of `GET graph.instagram.com/me/media` with the fields this import asks for. */
export type InstagramMedia = MediaChild & {
	permalink: string;
	timestamp: string;
	children?: { data: MediaChild[] };
};

export const MEDIA_FIELDS =
	"id,media_type,media_url,thumbnail_url,permalink,timestamp,children{id,media_type,media_url,thumbnail_url}";

export type Picture = { id: string; url: string };

/**
 * The pictures in a post, in the order Instagram shows them.
 *
 * A photo contributes itself. A film contributes its cover — `thumbnail_url`, which the API
 * delivers clean, without the play button Instagram burns into the cover it shows the
 * public. A carousel contributes each of its items by the same two rules. An item Instagram
 * withholds a URL for (it does for copyrighted music videos) is skipped rather than failing
 * the whole import.
 */
export function picturesIn(media: InstagramMedia): Picture[] {
	const items = media.media_type === "CAROUSEL_ALBUM" ? (media.children?.data ?? []) : [media];
	return items.flatMap((item) => {
		const url = item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url;
		return url ? [{ id: item.id, url }] : [];
	});
}

/** `2026-07-26T18:04:11+0000` → `2026-07-26`, the form Sanity's `date` field stores. */
export function postDate(timestamp: string): string {
	return timestamp.slice(0, 10);
}
