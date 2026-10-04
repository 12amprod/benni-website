import { TileGrid } from "#/components/TileGrid";
import { WorkSheet } from "#/components/WorkSheet";
import { type ArchiveSegment as Segment, site } from "#/content/site";
import { count } from "#/lib/plural";

type ArchiveSegmentProps = {
	segment: Segment;
	/** "A", "B", … — see the note below on why these are letters and not numbers. */
	mark: string;
};

/**
 * One segment of the archive: a head in the content column, then its works full bleed.
 *
 * The head is the site's `SectionHead` one level down — same three elements in the same
 * order, a size smaller — so the page still reads as a set of numbered plates rather than
 * as a stack of unrelated blocks.
 *
 * The mark is a letter, not a number. The metadata line along the bottom edge is already
 * counting sections in two digits, and a second two-digit counter nested inside the fourth
 * of them would read as a page number against a page number. Letters say "this is a
 * drawer in a cabinet", which is what a segment of an archive is.
 *
 * `layout` is carried by the data rather than guessed from it. A segment is a sheet when
 * its works have enough frames to fill rows, and tiles when they do not — and that is an
 * editorial fact about the material, not something a component should infer.
 */
export function ArchiveSegment({ segment, mark }: ArchiveSegmentProps) {
	const { labels } = site.archive;
	const frames = segment.works.reduce((total, work) => total + work.photos.length, 0);
	const isFilm = segment.works.every((work) => "video" in work && work.video);

	return (
		<section aria-labelledby={`archiv-${segment.id}`}>
			<div className="mx-auto max-w-6xl px-5 sm:px-6">
				<header className="border-hairline border-t pt-5">
					<p className="reveal flex items-baseline gap-x-4">
						<span className="label text-ink/35">{mark}</span>
						<span className="label text-ink-muted">
							{count(segment.works.length, isFilm ? labels.film : labels.work)} ·{" "}
							{count(frames, isFilm ? labels.still : labels.frame)}
						</span>
					</p>

					<h3
						id={`archiv-${segment.id}`}
						className="reveal mask-reveal mt-6 font-normal text-2xl tracking-brand sm:text-3xl"
					>
						<span className="mask-line">
							<span>{segment.title}</span>
						</span>
					</h3>

					<p className="reveal mt-4 max-w-sm text-ink-muted text-sm leading-relaxed">
						{segment.body}
					</p>
				</header>
			</div>

			{/* Full bleed: no wrapper, no padding, no max-width. A contact sheet with a page
			    gutter around it is a picture of a contact sheet. */}
			<div className="mt-10">
				{segment.layout === "tiles" ? (
					<TileGrid works={segment.works} />
				) : (
					segment.works.map((work) => <WorkSheet key={work.url} work={work} />)
				)}
			</div>
		</section>
	);
}
