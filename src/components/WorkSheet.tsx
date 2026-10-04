import type { CSSProperties } from "react";
import { type ArchiveWork, site } from "#/content/site";
import { count } from "#/lib/plural";

/**
 * Frames per strip. Four is the sheet's width at `sm` and up, so a strip and a visual row
 * are the same thing exactly where a pointer exists to light one up. Below `sm` the sheet
 * is two frames wide and a strip folds onto two lines — which costs nothing, because a
 * phone has no hover, and two divides into four.
 *
 * Every work on a sheet holds a whole number of strips; `site.archive.segments` says why,
 * and the generator that writes it refuses anything else.
 */
const COLUMNS = 4;

type WorkSheetProps = {
	work: ArchiveWork;
};

/**
 * One work, printed as a short contact sheet: a margin marking that names it, then its
 * frames at one size behind hairline rules.
 *
 * This is the old `GalleryGrid` narrowed from "the whole archive as two rolls" to "one
 * shoot". The archive now holds nineteen works rather than two nights, and a single sheet
 * of sixty-five squares says nothing about which frames belong together — which is the one
 * thing this section exists to say. So the roll marking moved down a level: every work
 * carries its own, and the sheet under it is only as long as the work is.
 *
 * Every frame is the same size, on every work, at every width. A cover that ran four times
 * larger because its work happens to hold one photograph would be saying the cover matters
 * four times as much, which is a claim about the work the page has no business making. The
 * price of that is that a sheet cannot show five frames, or three: the row would come out
 * short and the last photograph would sit alone against a black remainder. So a work earns
 * a sheet by having enough material to fill whole rows, and a work that does not is a tile
 * instead — see `TileGrid`.
 *
 * The rows are real elements rather than an artefact of one long grid wrapping, because the
 * row is what the pointer acts on: resting anywhere along it brings the whole strip back to
 * colour. A sheet is cut into strips and a strip is the unit a photographer picks up, so
 * that is the unit that lights. See `.strip` in `src/styles.css`.
 *
 * The marking is also the link out. A reference page whose frames cannot be traced back to
 * the post they came from is an assertion; this one can be checked, which is why the date
 * and the link sit on the same line as the title rather than in a credit at the bottom.
 */
export function WorkSheet({ work }: WorkSheetProps) {
	const { labels } = site.archive;

	/* Cut into strips of four. `start` is the frame's position on the whole sheet, which is
	   both the number printed in its corner and a key that survives a frame being added to
	   the strip above it — unlike its index within this list. */
	const strips = Array.from({ length: Math.ceil(work.photos.length / COLUMNS) }, (_, i) => {
		const start = i * COLUMNS;
		return { start, photos: work.photos.slice(start, start + COLUMNS) };
	});

	return (
		<section aria-label={work.title}>
			{/* The margin marking. Only the title is ink; the date, the count and the link sit
			    behind it at the same size, because nothing on a sheet changes scale to show
			    importance. */}
			<p className="reveal label flex flex-wrap items-baseline gap-x-4 gap-y-1 px-2 pt-10 pb-3 text-ink/45">
				<span className="text-ink">{work.title}</span>
				<span>{work.meta}</span>
				<span>{work.date}</span>
				<span>{count(work.photos.length, labels.frame)}</span>
				<a
					href={work.url}
					target="_blank"
					rel="noreferrer"
					className="group ml-auto transition-colors duration-300 ease-ui hover:text-ink"
				>
					{labels.source}
					<span
						aria-hidden="true"
						className="ml-2 inline-block group-hover:translate-x-1 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-ui"
					>
						→
					</span>
				</a>
			</p>

			{/* The rules are borders rather than gaps: a gap would push the row past the width
			    of its frames and the sheet would stop coming out level. Top and left rule on the
			    sheet, right and bottom on each frame, so every internal rule is drawn exactly
			    once — including the one between two strips. */}
			<div className="border-hairline border-t border-l">
				{strips.map((strip) => (
					<ul
						key={`${work.url}-strip-${strip.start}`}
						className="strip plate-colour group grid grid-cols-2 sm:grid-cols-4"
					>
						{strip.photos.map((photo, i) => (
							<li
								key={photo.src}
								className="reveal wipe-reveal relative aspect-square overflow-clip border-hairline border-r border-b"
							>
								<img
									src={photo.src}
									alt={photo.alt}
									width={1200}
									height={1200}
									loading="lazy"
									decoding="async"
									/* Per-frame exposure. See the note in `site.archive`: this set runs
									   7.8x apart in brightness and a single filter cannot print it. */
									style={{ "--lift": photo.lift } as CSSProperties}
									className={`plate absolute inset-0 size-full object-cover ${
										"lit" in photo && photo.lit ? "plate-lit" : "plate-dim"
									}`}
								/>

								{/* The mark on the select: eight pixels of green, the whole accent
								    budget this section spends. It is a cursor, not decoration. */}
								{"lit" in photo && photo.lit ? (
									<span
										aria-hidden="true"
										className="pointer-events-none absolute top-2 left-2 size-2 bg-relapse"
									/>
								) : null}

								{/* Numbered across the work, not restarted on each strip — the number
								    is the frame's place on the sheet. It brightens with the rest of
								    its strip rather than on its own, for the same reason the
								    photographs do. */}
								<span
									className={`label pointer-events-none absolute bottom-2 left-2 mix-blend-difference transition-colors duration-300 ease-ui group-hover:text-ink ${
										"lit" in photo && photo.lit ? "text-ink" : "text-ink/45"
									}`}
								>
									{String(strip.start + i + 1).padStart(2, "0")}
								</span>
							</li>
						))}
					</ul>
				))}
			</div>
		</section>
	);
}
