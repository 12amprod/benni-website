import { useCallback, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import type { ArchivePhoto } from "#/content/archive";
import { type GalleryId, galleryGroups } from "#/content/galleries";
import { site } from "#/content/site";
import { transition } from "#/lib/motion";
import { frameOf, preloadWhole } from "./Frame";
import { Lightbox, type LightboxEntry } from "./Lightbox";
import { WorkSeries } from "./WorkSeries";
import { WorkTiles } from "./WorkTiles";

/** How long a click waits for the whole picture before the frame starts to grow anyway. */
const PRELOAD_GRACE_MS = 300;
const wait = (ms: number) => new Promise((done) => setTimeout(done, ms));

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

	// Where each work's first frame falls on the page, counted from the top across every
	// group, so the frames that rise in as the page opens are the ones on screen.
	const firstFrame = useMemo(() => {
		const at = new Map<string, number>();
		let count = 0;
		for (const group of groups) {
			for (const work of group.works) {
				at.set(work.url, count);
				count += group.layout === "sheet" ? work.photos.length : 1;
			}
		}
		return at;
	}, [groups]);

	/*
	 * Into the enlarged view: the frame grows out of the grid into the whole picture. The
	 * picture gets a moment to arrive first, so the frame grows into it rather than into an
	 * empty box; on a slow line the box grows anyway and the picture fills it on arrival.
	 */
	const enlarge = useCallback(
		async (photo: ArchivePhoto) => {
			const at = entries.findIndex((entry) => entry.photo === photo);
			const frame = frameOf(photo);
			await Promise.race([preloadWhole(photo), wait(PRELOAD_GRACE_MS)]);
			frame?.style.setProperty("view-transition-name", "photo");
			transition("photo", () => {
				frame?.style.removeProperty("view-transition-name");
				flushSync(() => setOpen(at));
			});
		},
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
										firstFrame={firstFrame.get(work.url) ?? 0}
										onEnlarge={enlarge}
									/>
								))}
							</div>
						) : (
							<WorkTiles
								works={group.works}
								eager={g === 0}
								firstFrame={firstFrame.get(group.works[0]?.url ?? "") ?? 0}
								onEnlarge={enlarge}
							/>
						)}
					</section>
				))}
			</div>

			<Lightbox entries={entries} index={open} onIndexChange={setOpen} />
		</>
	);
}
