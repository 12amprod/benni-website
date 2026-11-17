/**
 * Instagram import: fills a work's photos from the Instagram post it links to.
 *
 * Triggered when the Studio's "Bilder von Instagram übernehmen" action sets
 * `instagramImport.status` to `requested` on a draft. Runs on Sanity's servers, never in a
 * browser, because it holds the Instagram access token.
 *
 * It uses the official Instagram API ("Instagram API with Instagram Login") rather than
 * reading the public page. That gives every picture of a carousel at full resolution and
 * film covers without a burned-in play button, and it keeps working when Instagram changes
 * its page or blocks scrapers. The price: it can only read posts of the account the token
 * belongs to — @timflp.archive — and that account has to be a professional (creator) one.
 * Setup and token renewal are in `docs/cms.md`.
 *
 * Only drafts are touched. The import replaces the draft's photos and stops; a person still
 * trims the selection, writes the alt texts and publishes. Nothing reaches the site
 * without that step.
 */
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";
import { documentEventHandler } from "@sanity/functions";
import {
	type InstagramMedia,
	MEDIA_FIELDS,
	picturesIn,
	postDate,
	shortcodeFrom,
} from "./instagram.ts";

type Work = { _id: string; url?: string; date?: string };

/** How far back the import looks for the post: 20 pages × 50 posts. */
const MAX_PAGES = 20;

class ImportError extends Error {}

/*
 * The token travels as the `access_token` query parameter, which is how Meta documents
 * this API and how its own `paging.next` links carry it. That puts the token inside
 * request URLs, so no URL from this file is ever logged or written to a document: errors
 * are reduced to their message before they reach `console.error` or the Studio.
 */
async function findPost(shortcode: string, token: string): Promise<InstagramMedia> {
	const first = new URL("https://graph.instagram.com/me/media");
	first.searchParams.set("fields", MEDIA_FIELDS);
	first.searchParams.set("limit", "50");
	first.searchParams.set("access_token", token);
	let next: string | undefined = first.toString();

	for (let page = 0; next && page < MAX_PAGES; page++) {
		const response = await fetch(next);
		const body = (await response.json()) as {
			data?: InstagramMedia[];
			paging?: { next?: string };
			error?: { code?: number; message?: string };
		};

		if (body.error) {
			if (body.error.code === 190) {
				throw new ImportError(
					"Der Instagram-Zugang ist abgelaufen oder ungültig. Token erneuern — Anleitung in docs/cms.md.",
				);
			}
			throw new ImportError(
				`Instagram antwortet mit einem Fehler: ${body.error.message ?? "unbekannt"}`,
			);
		}

		const post = body.data?.find((media) => shortcodeFrom(media.permalink) === shortcode);
		if (post) return post;

		next = body.paging?.next;
	}

	throw new ImportError(
		"Diesen Beitrag gibt es auf @timflp.archive nicht. Importieren lassen sich nur Beiträge von seinem eigenen Konto — Beiträge anderer Konten bitte als Datei hochladen.",
	);
}

export const handler = documentEventHandler<Work>(async ({ context, event }) => {
	// Writes only, and they always go to the live API; no reason to route anything via the CDN.
	const client = createClient({
		...context.clientOptions,
		apiVersion: "2026-10-01",
		useCdn: false,
	});
	const { _id, url, date } = event.data;

	const report = (status: "running" | "done" | "failed", message: string) =>
		client
			.patch(_id)
			.set({
				"instagramImport.status": status,
				"instagramImport.message": message,
				...(status === "running" ? {} : { "instagramImport.finishedAt": new Date().toISOString() }),
			})
			.commit({ dryRun: Boolean(context.local) });

	// First write: move off `requested`, so this function's own patches no longer match its
	// trigger filter and it cannot call itself again.
	await report("running", "Bilder werden von Instagram geholt …");

	try {
		const token = process.env.INSTAGRAM_ACCESS_TOKEN;
		if (!token) {
			throw new ImportError(
				"Instagram ist noch nicht verbunden (INSTAGRAM_ACCESS_TOKEN fehlt). Einrichtung in docs/cms.md.",
			);
		}
		const shortcode = url ? shortcodeFrom(url) : null;
		if (!shortcode) throw new ImportError("Im Feld „Instagram-Beitrag“ steht kein Beitrags-Link.");

		const post = await findPost(shortcode, token);
		const pictures = picturesIn(post);
		if (pictures.length === 0) {
			throw new ImportError("Instagram liefert für diesen Beitrag keine Bilder aus.");
		}

		const assets = [];
		for (const [i, picture] of pictures.entries()) {
			const response = await fetch(picture.url);
			if (!response.ok) {
				throw new ImportError(`Bild ${i + 1} ließ sich nicht laden (HTTP ${response.status}).`);
			}
			const asset = await client.assets.upload("image", Buffer.from(await response.arrayBuffer()), {
				filename: `${shortcode}-${String(i + 1).padStart(2, "0")}.jpg`,
				source: { name: "instagram", id: picture.id, url: post.permalink },
			});
			assets.push(asset);
		}

		await client
			.patch(_id)
			.set({
				photos: assets.map((asset) => ({
					_type: "archivePhoto",
					_key: randomUUID().slice(0, 12),
					asset: { _type: "reference", _ref: asset._id },
				})),
			})
			.setIfMissing(date ? {} : { date: postDate(post.timestamp) })
			.commit({ dryRun: Boolean(context.local) });

		await report(
			"done",
			`${assets.length} ${assets.length === 1 ? "Bild" : "Bilder"} übernommen. Jetzt auf 4 oder 8 kürzen (bzw. 1 bei Videoarbeiten und Releases), Alt-Texte schreiben, veröffentlichen.`,
		);
	} catch (error) {
		const message =
			error instanceof ImportError
				? error.message
				: "Der Import ist an einer unerwarteten Stelle abgebrochen. Bitte erneut versuchen; wenn es wieder passiert, die Bilder als Datei hochladen.";
		// The message only, never the error object: a failed `fetch` can carry the request
		// URL in its cause, and that URL contains the token.
		const detail = error instanceof Error ? error.message : String(error);
		console.error(
			"instagram-import failed:",
			detail.replace(/access_token=[^&\s]+/g, "access_token=***"),
		);
		await report("failed", message);
	}
});
