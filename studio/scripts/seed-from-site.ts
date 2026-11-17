/**
 * Copy the archive the website shows today into Sanity, so the team starts from the live
 * page instead of an empty Studio.
 *
 *   pnpm seed            — dry run: prints what it would create, writes nothing
 *   pnpm seed --write    — creates the works and uploads their photographs
 *
 * Runs through `sanity exec --with-user-token`, so it writes as whoever is logged in to
 * the Sanity CLI. No API token is created, copied or stored anywhere.
 *
 * Safe to run more than once. A work is matched by its Instagram link — the one field that
 * identifies it outside Sanity — and a work that already exists is left untouched, so a
 * second run never overwrites what the team has edited since. Sanity assigns every
 * document ID itself, and uploads the same file only once.
 */
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { getCliClient } from "sanity/cli";
import { localWorks } from "../../src/content/archive.local.ts";
import { apiVersion } from "../shared/project.ts";

const write = process.argv.includes("--write");
const client = getCliClient({ apiVersion });
const publicDir = new URL("../../public/", import.meta.url);

let created = 0;
let skipped = 0;

for (const work of localWorks) {
	const existing = await client.fetch<string | null>(
		`*[_type == "archiveWork" && url == $url][0]._id`,
		{ url: work.url },
	);
	if (existing) {
		skipped++;
		console.log(`  = ${work.title} (gibt es schon, bleibt wie es ist)`);
		continue;
	}

	console.log(
		`  + ${work.title} — ${work.photos.length} ${work.photos.length === 1 ? "Bild" : "Bilder"}`,
	);
	created++;
	if (!write) continue;

	const photos = [];
	for (const photo of work.photos) {
		const file = new URL(photo.src.replace(/^\//, ""), publicDir);
		const asset = await client.assets.upload("image", await readFile(file), {
			filename: basename(photo.src),
			source: { name: "relapse-website", id: photo.src, url: work.url },
		});
		photos.push({
			_type: "archivePhoto",
			_key: randomUUID().slice(0, 12),
			asset: { _type: "reference", _ref: asset._id },
			alt: photo.alt,
		});
	}

	await client.create({
		_type: "archiveWork",
		title: work.title,
		page: work.page,
		segment: work.segment,
		date: work.date,
		meta: work.meta,
		url: work.url,
		photos,
	});
}

console.log(
	write
		? `\nFertig: ${created} Arbeiten angelegt, ${skipped} übersprungen.`
		: `\nProbelauf: ${created} Arbeiten würden angelegt, ${skipped} übersprungen. Mit --write ausführen.`,
);
