import { DownloadIcon } from "@sanity/icons/Download";
import { type DocumentActionComponent, useDocumentOperation } from "sanity";

type ImportState = { status?: string } | undefined;

/**
 * "Bilder von Instagram übernehmen": marks the work as waiting for an import, and
 * nothing more.
 *
 * The Studio runs in the editor's browser and cannot fetch from Instagram itself — the
 * browser would block it, and the access token must never reach a browser anyway. So
 * the button only writes a request onto the draft, and the `instagram-import` function
 * (see `functions/`), which runs on Sanity's servers and holds the token, picks it up,
 * fills in the photos and writes back what happened. The editor watches the result
 * arrive in the same draft and publishes when it looks right.
 */
export const importFromInstagram: DocumentActionComponent = (props) => {
	const { patch } = useDocumentOperation(props.id, props.type);
	const doc = props.draft ?? props.published;
	const url = typeof doc?.url === "string" ? doc.url : "";
	const status = (doc?.instagramImport as ImportState)?.status;
	const busy = status === "requested" || status === "running";

	return {
		label: busy ? "Import läuft …" : "Bilder von Instagram übernehmen",
		icon: DownloadIcon,
		disabled: !url || busy || Boolean(patch.disabled),
		title: !url
			? "Erst den Instagram-Beitrag eintragen."
			: "Ersetzt die Bilder dieser Arbeit durch die Bilder des Beitrags. Danach Auswahl kürzen, Alt-Texte schreiben, veröffentlichen.",
		onHandle: () => {
			patch.execute([
				{
					set: {
						instagramImport: {
							status: "requested",
							message: "Wird gleich abgeholt …",
							requestedAt: new Date().toISOString(),
						},
					},
				},
			]);
			props.onComplete();
		},
	};
};
