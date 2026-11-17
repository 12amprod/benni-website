import type { ArchivePhoto, ArchiveWork } from "#/content/archive";
import { enlargeOnClick, FrameImage, frameLinkClass } from "./Frame";

type WorkTilesProps = {
	works: readonly ArchiveWork[];
	eager?: boolean;
	onEnlarge: (photo: ArchivePhoto) => void;
};

/**
 * Works that are a single picture — a film's still, a cover, one shoot — laid out in the
 * same two columns as the series, each with its title underneath.
 *
 * A film is a link to the film on Instagram — its title ends in ↗, the same mark every
 * outbound link on the site carries — because nothing plays here: the site is static HTML,
 * and the films live where they were posted. A cover or a shoot enlarges like any other
 * frame. Nothing is printed over a picture.
 */
export function WorkTiles({ works, eager = false, onEnlarge }: WorkTilesProps) {
	return (
		<ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:gap-x-10 lg:gap-y-12">
			{works.map((work, i) => {
				const photo = work.photos[0];
				// The Studio cannot publish a tile without its picture and the build refuses to
				// ship one, so this only guards against a hand-edited local archive.
				if (!photo) return null;

				return (
					<li key={work.url}>
						<a
							href={work.video ? work.url : photo.full}
							{...(work.video
								? { target: "_blank", rel: "noreferrer" }
								: { onClick: enlargeOnClick(() => onEnlarge(photo)) })}
							className={frameLinkClass}
						>
							<FrameImage photo={photo} eager={eager && i < 4} />
							<span className="label mt-3 block text-ink-muted transition-colors duration-300 group-hover:text-ink">
								{work.title}
								{work.video ? " ↗" : null}
							</span>
						</a>
					</li>
				);
			})}
		</ul>
	);
}
