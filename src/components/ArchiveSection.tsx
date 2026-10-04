import { ArchiveSegment } from "#/components/ArchiveSegment";
import { SectionHead } from "#/components/SectionHead";
import { site } from "#/content/site";
import { metaAttrs } from "#/lib/section-meta";

/** A, B, C, … — the drawer each segment is filed in. */
const mark = (i: number) => String.fromCharCode(65 + i);

/**
 * The archive: one photographer's work, which is every picture on this site.
 *
 * This used to be "Lineup + Galerie" — three acts with a portrait each, then a contact
 * sheet of sixteen frames off two nights. Both are gone. The portraits were somebody else's
 * photographs, and the sheet could only ever hold the nights relapse itself put on, which
 * is a fraction of what @timflp.archive actually shoots.
 *
 * What replaced them is a reference: four segments — events, films, releases, free work —
 * with the works inside each running oldest to newest. Segments rather than one long sheet
 * because "sorted by events and video works" is the question the page is answering, and
 * chronological inside them because that is the only order a body of work has that is not
 * an opinion.
 *
 * The heading and the credit sit in the content column; the sheets break out of it. That
 * split is unchanged from the version before this one, and it is the thing that makes the
 * photography read as printed rather than as illustrated.
 */
export function ArchiveSection() {
	const { title, body, credits, segments } = site.archive;

	return (
		<section
			id="archiv"
			{...metaAttrs("archiv")}
			className="border-hairline border-t bg-canvas py-28 sm:py-40"
		>
			<div className="mx-auto max-w-6xl px-5 sm:px-6">
				<SectionHead id="archiv" title={title} body={body} />
			</div>

			<div className="mt-20 space-y-24 sm:mt-24 sm:space-y-32">
				{segments.map((segment, i) => (
					<ArchiveSegment key={segment.id} segment={segment} mark={mark(i)} />
				))}
			</div>

			<div className="mx-auto max-w-6xl px-5 sm:px-6">
				<p className="label mt-16 text-ink/45">
					<a
						href={site.archive.author.url}
						target="_blank"
						rel="noreferrer"
						className="transition-colors duration-300 ease-ui hover:text-ink"
					>
						{credits}
					</a>
				</p>
			</div>
		</section>
	);
}
