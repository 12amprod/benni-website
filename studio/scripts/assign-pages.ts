/**
 * One-off migration for the site's split into three pages: give every work its „Seite“,
 * hide the one work that comes off the site, and drop the retired „bleibt farbig“ flag.
 *
 *   pnpm --dir studio exec sanity exec scripts/assign-pages.ts --with-user-token
 *       — dry run: prints what would change, writes nothing
 *   pnpm --dir studio exec sanity exec scripts/assign-pages.ts --with-user-token -- --write
 *       — applies it, published documents and drafts alike
 *
 * Runs as whoever is logged in to the Sanity CLI, like `pnpm seed`. Safe to run again: a
 * work that already has a page keeps it, so nothing the team has set since is overwritten.
 *
 * The rules are by title because that is how the decision was made (2026-11-14): the
 * Yung Shattered releases and films — TAUB and the CTE Remix included — go to his page,
 * the relapse editions to relapse, everything else is Tim's portfolio. The Meisterfeier
 * (football) stays in Sanity but is no longer shown.
 */
import { getCliClient } from "sanity/cli";
import type { PageId } from "../shared/archive-rules.ts";
import { apiVersion } from "../shared/project.ts";

const write = process.argv.includes("--write");
const client = getCliClient({ apiVersion });

const YUNG_SHATTERED = /^(NARCOTIC|ALTE MUSTER|TAUB|CTE Remix|today is not yesterday)\b/;
const HIDDEN = ["Meisterfeier MSV Eisleben"];

function pageFor(title: string): PageId {
	if (/^relapse\b/i.test(title)) return "relapse";
	if (YUNG_SHATTERED.test(title)) return "yung-shattered";
	return "tim";
}

type Work = {
	_id: string;
	title?: string;
	page?: string;
	hidden?: boolean;
	photos?: { _key: string; isSelect?: boolean | null }[];
};

const works = await client.fetch<Work[]>(
	`*[_type == "archiveWork"] | order(date asc) { _id, title, page, hidden, photos[] { _key, isSelect } }`,
);

const transaction = client.transaction();
let changes = 0;

for (const work of works) {
	const title = work.title ?? work._id;
	const draft = work._id.startsWith("drafts.") ? " (Entwurf)" : "";
	const set: Record<string, unknown> = {};
	const unset: string[] = [];

	if (!work.page) set.page = pageFor(title);
	if (HIDDEN.includes(title) && !work.hidden) set.hidden = true;
	for (const photo of work.photos ?? []) {
		if (photo.isSelect != null) unset.push(`photos[_key=="${photo._key}"].isSelect`);
	}

	const notes = [
		set.page ? `Seite → ${set.page}` : `Seite bleibt ${work.page}`,
		set.hidden ? "ausgeblendet" : null,
		unset.length > 0 ? `${unset.length}× „bleibt farbig“ entfernt` : null,
	].filter(Boolean);
	console.log(
		`  ${Object.keys(set).length + unset.length > 0 ? "~" : "="} ${title}${draft}: ${notes.join(", ")}`,
	);

	if (Object.keys(set).length + unset.length === 0) continue;
	changes++;
	// An empty `set` or `unset` is rejected by the API, so each is added only when it has work.
	transaction.patch(work._id, (patch) => {
		const withSet = Object.keys(set).length > 0 ? patch.set(set) : patch;
		return unset.length > 0 ? withSet.unset(unset) : withSet;
	});
}

if (write && changes > 0) await transaction.commit();

console.log(
	write
		? `\nFertig: ${changes} von ${works.length} Dokumenten geändert.`
		: `\nProbelauf: ${changes} von ${works.length} Dokumenten würden geändert. Mit --write ausführen.`,
);
