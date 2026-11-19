import type { ArchivePhoto, ArchiveWork } from "#/content/archive";
import { arrival, enlargeLink, FrameImage, frameLinkClass } from "./Frame";

type WorkSeriesProps = {
	work: ArchiveWork;
	/** `h3` when the work sits under a group heading, `h2` when it does not. */
	headingLevel: 2 | 3;
	/** The first work on the page: its first row is fetched immediately. */
	eager?: boolean;
	/** Where this series' first frame falls on the page, counting every frame above it. */
	firstFrame: number;
	onEnlarge: (photo: ArchivePhoto) => void;
};

/**
 * One series — a night, a shoot — as its title and date in one mono line, then its frames
 * two abreast. The line is the only text the series carries; what it was and where it was
 * posted is in the enlarged view, for whoever wants it.
 */
export function WorkSeries({
	work,
	headingLevel,
	eager = false,
	firstFrame,
	onEnlarge,
}: WorkSeriesProps) {
	const Heading = headingLevel === 2 ? "h2" : "h3";

	return (
		<section aria-label={work.title}>
			<Heading className="label mb-3 flex flex-wrap gap-x-4 sm:mb-4">
				<span className="text-ink">{work.title}</span>
				<span className="text-ink-muted">{work.date}</span>
			</Heading>
			<ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-10">
				{work.photos.map((photo, i) => (
					<li key={photo.src} {...arrival(firstFrame + i)}>
						<a {...enlargeLink(photo, () => onEnlarge(photo))} className={frameLinkClass}>
							<FrameImage photo={photo} eager={eager && i < 4} />
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
