import type { CSSProperties } from "react";
import { type ArchiveWork, site } from "#/content/site";

type TileGridProps = {
	works: readonly ArchiveWork[];
};

/**
 * A segment whose works are single plates rather than rows: one frame each, captioned,
 * linking to the original post.
 *
 * Two kinds of work land here. The films, because a film has one still and nothing to
 * arrange it with. And the short works — a cover, a single shooting — because a row on this
 * sheet is four frames wide and a work that cannot fill one has no business pretending to:
 * laid into a row it leaves a lone photograph beside three empty cells, which reads as a
 * bug rather than as an archive.
 *
 * Three across, so three works make a full row and six make two. That is the same rule the
 * sheets follow, one size coarser.
 *
 * Nothing plays on this page. The site is static HTML with no runtime, six autoplaying clips
 * would cost more than every photograph on the page put together, and the films live on
 * Instagram anyway — so a tile is a link, and it is honest about being one.
 *
 * The film stills are frames pulled out of the films themselves rather than the cover images
 * Instagram serves, which have a play button burned into the middle of them. Six borrowed
 * play buttons on a page with its own visual language is six pieces of someone else's
 * interface.
 */
export function TileGrid({ works }: TileGridProps) {
	const { labels } = site.archive;

	return (
		<ul className="grid grid-cols-1 border-hairline border-t border-l sm:grid-cols-2 lg:grid-cols-3">
			{works.map((work) => {
				const cover = work.photos[0];
				const isFilm = "video" in work && work.video;

				return (
					<li key={work.url} className="reveal border-hairline border-r border-b">
						<a
							href={work.url}
							target="_blank"
							rel="noreferrer"
							className="plate-colour group block h-full"
						>
							<div className="wipe-reveal relative aspect-square overflow-clip">
								<img
									src={cover.src}
									alt={cover.alt}
									width={1200}
									height={1200}
									loading="lazy"
									decoding="async"
									style={{ "--lift": cover.lift } as CSSProperties}
									className="plate plate-dim absolute inset-0 size-full object-cover"
								/>

								{/* Said once, in the same mono the rest of the site says technical
								    things in — and only where it adds something the caption does
								    not: a still out of a film does not look like a photograph of
								    one. A cover needs no label; it is plainly a cover. */}
								{isFilm ? (
									<span className="label pointer-events-none absolute top-3 left-3 text-ink/60 mix-blend-difference">
										{labels.filmTag}
									</span>
								) : null}
							</div>

							<div className="px-4 py-5">
								<h4 className="font-normal text-entry tracking-brand">{work.title}</h4>
								<p className="label mt-2 text-ink-muted">{work.meta}</p>
								<p className="label mt-4 flex items-baseline gap-x-4 text-ink/45 transition-colors duration-300 ease-ui group-hover:text-ink">
									<span>{work.date}</span>
									<span className="ml-auto">
										{isFilm ? labels.watch : labels.source}
										<span
											aria-hidden="true"
											className="ml-2 inline-block group-hover:translate-x-1 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-ui"
										>
											→
										</span>
									</span>
								</p>
							</div>
						</a>
					</li>
				);
			})}
		</ul>
	);
}
