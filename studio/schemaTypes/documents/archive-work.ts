import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
	frameCountProblem,
	isPageId,
	isSegmentId,
	pageIds,
	pages,
	segmentIds,
	segments,
} from "../../shared/archive-rules";

const INSTAGRAM_POST = /^https:\/\/(www\.)?instagram\.com\/([\w.]+\/)?(p|reel|tv)\/[\w-]+\/?/;

/** "2026-07-26" → "26.07.2026", for previews. The site formats dates the same way. */
function germanDate(iso: string | undefined): string {
	if (!iso) return "ohne Datum";
	const [y, m, d] = iso.split("-");
	return `${d}.${m}.${y}`;
}

/**
 * One piece of work in the archive: a shoot, a film, a cover.
 *
 * The site places it by `page` (whose work it is) and `segment` (what kind of work), and
 * orders it by `date`, so nothing here describes what it looks like — move a work to
 * another page or segment and the site re-lays itself.
 *
 * `url` is both the work's source and its link: every work on the page links back to the
 * Instagram post it came from, and the import reads the same field.
 */
export const archiveWork = defineType({
	name: "archiveWork",
	title: "Arbeit",
	type: "document",
	icon: ImagesIcon,
	fields: [
		defineField({
			name: "title",
			title: "Titel",
			type: "string",
			description: "So steht die Arbeit im Archiv, z. B. „bone stew im RATS“.",
			validation: (rule) => rule.required().max(60),
		}),
		defineField({
			name: "page",
			title: "Seite",
			type: "string",
			options: {
				list: pageIds.map((id) => ({ value: id, title: pages[id].title })),
				layout: "radio",
			},
			description:
				"Auf welcher Seite die Arbeit erscheint: Tims Portfolio, Yung Shattered oder relapse.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "segment",
			title: "Bereich",
			type: "string",
			options: {
				list: segmentIds.map((id) => ({ value: id, title: segments[id].title })),
				layout: "radio",
			},
			description:
				"Events und Freie Arbeiten zeigen Bildreihen (4 oder 8 Bilder). Videoarbeiten und Releases zeigen eine Kachel (genau 1 Bild).",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "date",
			title: "Datum",
			type: "date",
			description:
				"Tag, an dem die Arbeit auf Instagram erschienen ist. Danach sortiert das Archiv.",
			options: { dateFormat: "DD.MM.YYYY" },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "meta",
			title: "Kurzinfo",
			type: "string",
			description:
				"Eine Zeile neben dem Titel, z. B. „Punk · Live“ oder „@yung.shattered · Videoclip“.",
			validation: (rule) => rule.required().max(48),
		}),
		defineField({
			name: "url",
			title: "Instagram-Beitrag",
			type: "url",
			description:
				"Link zum Beitrag, z. B. https://www.instagram.com/p/DbQ-m5eDG00/. Die Arbeit verlinkt dorthin, und der Import liest die Bilder von hier.",
			validation: (rule) =>
				rule
					.required()
					.uri({ scheme: ["https"] })
					.custom((value) =>
						!value || INSTAGRAM_POST.test(value)
							? true
							: "Das sieht nicht nach einem Instagram-Beitrag aus (…instagram.com/p/… oder …/reel/…).",
					),
		}),
		defineField({
			name: "hidden",
			title: "Nicht anzeigen",
			type: "boolean",
			description:
				"Die Arbeit bleibt hier gespeichert, erscheint aber nicht auf der Website. Zum Zeigen einfach wieder abwählen.",
			initialValue: false,
		}),
		defineField({
			name: "instagramImport",
			title: "Status des letzten Imports",
			type: "object",
			readOnly: true,
			hidden: ({ value }) => !value,
			description:
				"Wird automatisch gesetzt, sobald du im Menü unten rechts „Bilder von Instagram übernehmen“ wählst.",
			fields: [
				defineField({
					name: "status",
					title: "Status",
					type: "string",
					options: {
						list: [
							{ value: "requested", title: "Angefragt" },
							{ value: "running", title: "Läuft" },
							{ value: "done", title: "Fertig" },
							{ value: "failed", title: "Fehlgeschlagen" },
						],
						layout: "radio",
					},
				}),
				defineField({ name: "message", title: "Meldung", type: "text", rows: 3 }),
				defineField({ name: "requestedAt", title: "Angefragt am", type: "datetime" }),
				defineField({ name: "finishedAt", title: "Beendet am", type: "datetime" }),
			],
		}),
		defineField({
			name: "photos",
			title: "Bilder",
			type: "array",
			of: [defineArrayMember({ type: "archivePhoto" })],
			options: { layout: "grid" },
			description:
				"Hochladen per Drag & Drop (JPEG, PNG, WebP, AVIF, TIFF oder GIF — iPhone-Fotos im HEIC-Format vorher als JPEG exportieren), oder im Menü „Bilder von Instagram übernehmen“. Die Reihenfolge hier ist die Reihenfolge auf der Seite.",
			validation: (rule) =>
				rule.custom((photos, context) => {
					const segment = context.document?.segment;
					if (!isSegmentId(segment)) return true;
					return frameCountProblem(segment, photos?.length ?? 0) ?? true;
				}),
		}),
	],
	orderings: [
		{
			title: "Neueste zuerst",
			name: "dateDesc",
			by: [{ field: "date", direction: "desc" }],
		},
	],
	preview: {
		select: {
			title: "title",
			page: "page",
			segment: "segment",
			date: "date",
			hidden: "hidden",
			media: "photos.0.asset",
		},
		prepare: ({ title, page, segment, date, hidden, media }) => ({
			title: `${hidden ? "(ausgeblendet) " : ""}${title || "Ohne Titel"}`,
			subtitle: [
				isPageId(page) ? pages[page].title : "Ohne Seite",
				isSegmentId(segment) ? segments[segment].title : "Ohne Bereich",
				germanDate(date),
			].join(" · "),
			media,
		}),
	},
});
