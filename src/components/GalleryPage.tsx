import { useCallback, useMemo, useState } from "react";
import type { ArchivePhoto } from "#/content/archive";
import { type GalleryId, galleryGroups } from "#/content/galleries";
import { site } from "#/content/site";
import { Lightbox, type LightboxEntry } from "./Lightbox";
import { WorkSeries } from "./WorkSeries";
import { WorkTiles } from "./WorkTiles";

type GalleryPageProps = {
	id: GalleryId;
};

/**
 * A gallery page: its pictures, and as little else as possible.
 *
 * The `<h1>` is the page's name. On a phone it is printed, because the sidebar has folded
 * away and nothing else says where you are; from `lg` up the sidebar already marks the
 * page, so the heading is kept for assistive technology only and the first row of pictures
 * starts at the top of the screen.
 *
 * Group headings ("Videos", "Bilder") appear only on a page holding more than one kind of
 * work. Every frame that enlarges joins one sequence for the enlarged view, in reading
 * order, so the arrows walk the whole page rather than one series.
 */
export function GalleryPage({ id }: GalleryPageProps) {
	const gallery: { title: string; intro?: string; link?: { label: string; href: string } } =
		site.galleries[id];
	const groups = useMemo(() => galleryGroups(id), [id]);
	const grouped = groups.length > 1;

	const entries = useMemo<LightboxEntry[]>(
		() =>
			groups.flatMap((group) =>
				group.works
					.filter((work) => !work.video)
					.flatMap((work) => work.photos.map((photo) => ({ photo, work }))),
			),
		[groups],
	);
	const [open, setOpen] = useState<number | null>(null);
	const enlarge = useCallback(
		(photo: ArchivePhoto) => setOpen(entries.findIndex((entry) => entry.photo === photo)),
		[entries],
	);

	return (
		<>
			<h1 className="mb-6 font-display text-entry tracking-brand lg:sr-only">{gallery.title}</h1>

			{gallery.intro || gallery.link ? (
				<div className="mb-10 lg:mb-14">
					{gallery.intro ? (
						<p className="max-w-sm text-ink-muted text-sm leading-relaxed">{gallery.intro}</p>
					) : null}
					{gallery.link ? (
						<a
							href={gallery.link.href}
							target="_blank"
							rel="noreferrer"
							className="label mt-3 inline-block text-ink-muted transition-colors duration-300 hover:text-ink"
						>
							{gallery.link.label} ↗
						</a>
					) : null}
				</div>
			) : null}

			{groups.length === 0 ? <p className="text-ink-muted text-sm">{site.emptyGallery}</p> : null}

			<div className="space-y-20 lg:space-y-28">
				{groups.map((group, g) => (
					<section key={group.segment}>
						{grouped ? (
							<h2 className="mb-6 font-display text-entry tracking-brand lg:mb-8">{group.label}</h2>
						) : null}

						{group.layout === "sheet" ? (
							<div className="space-y-16 lg:space-y-24">
								{group.works.map((work, w) => (
									<WorkSeries
										key={work.url}
										work={work}
										headingLevel={grouped ? 3 : 2}
										eager={g === 0 && w === 0}
										onEnlarge={enlarge}
									/>
								))}
							</div>
						) : (
							<WorkTiles works={group.works} eager={g === 0} onEnlarge={enlarge} />
						)}
					</section>
				))}
			</div>

			<Lightbox entries={entries} index={open} onIndexChange={setOpen} />
		</>
	);
}
