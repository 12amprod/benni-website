import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

/**
 * One frame of a work. An image with the one thing the site needs beyond the pixels: what
 * it shows, for anyone who cannot see it.
 *
 * `hotspot` is on because every frame is printed in the grid as a 4:5 portrait: the editor
 * marks the part of the picture that must survive the crop, and the CDN cuts around it.
 * Without it a landscape loses its subject to a centred crop. The enlarged view shows the
 * whole picture, uncropped.
 *
 * The site never shows the original — it asks the CDN for the sizes it needs in a modern
 * format, so what the team uploads only has to be the right picture.
 *
 * `accept` lists exactly what Sanity's image pipeline takes, tested by uploading each
 * format on 2026-10-04: JPEG, PNG, WebP, AVIF, TIFF and GIF go through; HEIC, BMP and
 * JPEG 2000 are refused with "Invalid image". Naming the list means an unsupported file
 * cannot be picked at all instead of failing after the upload — and an iPhone, offered a
 * picker that does not ask for HEIC, hands over a JPEG by itself.
 */
export const archivePhoto = defineType({
	name: "archivePhoto",
	title: "Bild",
	type: "image",
	icon: ImageIcon,
	options: {
		hotspot: true,
		accept: "image/jpeg,image/png,image/webp,image/avif,image/tiff,image/gif",
	},
	fields: [
		defineField({
			name: "alt",
			title: "Alt-Text",
			type: "string",
			description:
				"Was ist zu sehen? Ein Satz für alle, die das Bild nicht sehen können — z. B. „Volle Tanzfläche unter Lichterketten, Hände in der Luft.“",
			validation: (rule) =>
				rule
					.required()
					.error("Alt-Text fehlt — beschreib kurz, was auf dem Bild zu sehen ist.")
					.max(180)
					.warning("Kürzer ist besser: ein Satz reicht."),
		}),
	],
	preview: {
		select: { title: "alt", media: "asset" },
		prepare: ({ title, media }) => ({ title: title || "Ohne Alt-Text", media }),
	},
});
