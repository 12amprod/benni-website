/**
 * Pull the published archive out of Sanity and bake it into the build.
 *
 *   node scripts/pull-archive.ts          — `pnpm build` runs this first; any failure fails the build
 *   node scripts/pull-archive.ts --soft   — `pnpm dev` runs this; failures only warn
 *
 * Writes `src/content/archive.sanity.json`, which `src/content/archive.ts` reads in place of
 * the local archive. The file is generated and gitignored. The live site never talks to
 * Sanity: everything a visitor sees is fixed here, at build time.
 *
 * Three decisions worth knowing before changing this:
 *
 * - When Sanity is configured and the pull fails, the build fails. A host keeps serving the
 *   last good deploy when a build fails, so a Sanity outage leaves the site as it was. The
 *   alternative — falling back to the local archive — would quietly publish stale content
 *   that nobody notices for weeks.
 * - Every frame becomes fixed URLs: a 4:5 portrait cut around the hotspot the team set in
 *   the Studio, at four widths for the grid's `srcset`, and the whole uncropped picture for
 *   the enlarged view — all in whatever modern format the visitor's browser accepts. The
 *   original upload is never sent to a visitor, so it can be any size and any format.
 * - A work ticked „Nicht anzeigen“ is left out by the query itself: it stays in Sanity and
 *   never reaches the build.
 */
import { rm, writeFile } from "node:fs/promises";
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { defineQuery } from "groq";
import type { ArchiveSnapshot, ArchiveWorkSource } from "../src/content/archive-source.ts";
import { frameCountProblem, isPageId, isSegmentId } from "../studio/shared/archive-rules.ts";
import { apiVersion, dataset, projectId } from "../studio/shared/project.ts";

const OUT = new URL("../src/content/archive.sanity.json", import.meta.url);

/*
 * The grid prints every frame as a 4:5 portrait, cut around the hotspot the team set in the
 * Studio; the enlarged view shows the whole picture, never upscaled. Passed through
 * `withOptions` rather than the builder's `.fit()` method: Biome reads any call named `fit`
 * as a focused Jasmine test and offers to "fix" it into `it`.
 *
 * Quality 82 rather than the CDN's default 75: these are night photographs, and the
 * shadows are where a low setting bands first.
 */
const PORTRAIT = { fit: "crop", auto: "format", quality: 82 } as const;
/* `max-w`/`max-h` rather than width and height: given both, the builder cuts around the
   hotspot to that aspect, which here would turn every picture into a square. */
const WHOLE = { maxWidth: 2400, maxHeight: 2400, auto: "format", quality: 85 } as const;
/** Grid widths for `srcset`. A grid column is at most ~36rem, so 1600 covers a 2x screen. */
const GRID_WIDTHS = [480, 800, 1200, 1600] as const;
const GRID_SRC_WIDTH = 800;

const soft = process.argv.includes("--soft");
const log = (message: string) => console.log(`[archive] ${message}`);

/**
 * Published, visible works only, oldest first; same-day works keep the order they were
 * created in.
 */
export const ARCHIVE_QUERY = defineQuery(`
	*[_type == "archiveWork" && hidden != true] | order(date asc, _createdAt asc) {
		_id,
		title,
		page,
		segment,
		date,
		meta,
		url,
		photos[] {
			_key,
			alt,
			crop,
			hotspot,
			asset
		}
	}
`);

async function pull(): Promise<ArchiveSnapshot> {
	const client = createClient({
		projectId,
		dataset,
		apiVersion,
		// Straight from the API rather than the CDN: a build triggered by a publish should
		// see that publish, not a cache from a minute ago.
		useCdn: false,
		perspective: "published",
	});
	const images = createImageUrlBuilder({ projectId, dataset });

	// Typed by TypeGen from the Studio schema (`scripts/sanity.types.ts`, regenerate with
	// `pnpm --dir studio typegen`): a renamed field fails `pnpm typecheck`, not the live site.
	const results = await client.fetch(ARCHIVE_QUERY);
	const problems: string[] = [];
	const works: ArchiveWorkSource[] = [];

	for (const work of results) {
		// The generated types say these are always set, because the Studio will not publish a
		// work without them. A document written straight through the API never passed the
		// Studio, so the build checks again rather than trusting the type.
		const name = work.title || work._id;
		const { page, segment, title, date, meta, url } = work;
		if (!isPageId(page) || !isSegmentId(segment) || !title || !date || !meta || !url) {
			problems.push(
				`„${name}“: Pflichtfeld fehlt (Seite, Bereich, Titel, Datum, Kurzinfo oder Link).`,
			);
			continue;
		}
		const photos = (work.photos ?? []).filter((photo) => photo.asset);
		const countProblem = frameCountProblem(segment, photos.length);
		if (countProblem) {
			problems.push(`„${title}“: ${countProblem}`);
			continue;
		}

		works.push({
			page,
			segment,
			title,
			date,
			meta,
			url,
			photos: photos.map((photo) => {
				if (!photo.alt) problems.push(`„${title}“: ein Bild ohne Alt-Text.`);

				const grid = (width: number) =>
					images
						.image(photo)
						.withOptions({ ...PORTRAIT, width, height: Math.round(width * 1.25) })
						.url();

				return {
					src: grid(GRID_SRC_WIDTH),
					srcSet: GRID_WIDTHS.map((width) => `${grid(width)} ${width}w`).join(", "),
					full: images.image(photo).withOptions(WHOLE).url(),
					alt: photo.alt ?? "",
				};
			}),
		});
	}

	if (problems.length > 0) {
		throw new Error(
			`Das Archiv in Sanity verletzt die Regeln — die Seite wird nicht gebaut:\n  - ${problems.join("\n  - ")}`,
		);
	}

	return { source: "sanity", projectId, dataset, pulledAt: new Date().toISOString(), works };
}

if (!projectId) {
	// Not connected yet: build from the local archive, and make sure no stale snapshot from
	// an earlier connection is lying around to be picked up instead.
	await rm(OUT, { force: true });
	log("Sanity ist nicht verbunden — die Seite baut aus dem lokalen Archiv.");
} else {
	try {
		const snapshot = await pull();
		await writeFile(OUT, `${JSON.stringify(snapshot, null, "\t")}\n`);
		const frames = snapshot.works.reduce((total, work) => total + work.photos.length, 0);
		log(
			`${snapshot.works.length} Arbeiten, ${frames} Bilder aus Sanity (${projectId}/${dataset}).`,
		);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		if (!soft) {
			console.error(`[archive] ${message}`);
			process.exit(1);
		}
		log(`Warnung: ${message}`);
		log("Weiter mit dem letzten Stand (oder dem lokalen Archiv, falls es keinen gibt).");
	}
}
