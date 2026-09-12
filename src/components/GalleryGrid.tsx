import { site } from "#/content/site";

/**
 * The photo archive. A plain grid, deliberately: the pictures carry the section, so the
 * only job here is to give them even gutters and let the wide ones span two columns.
 */
export function GalleryGrid() {
	const { title, body, credits, photos } = site.gallery;

	return (
		<section id="galerie" className="bg-surface px-5 py-20 sm:px-6 sm:py-28">
			<div className="mx-auto max-w-6xl">
				<div className="text-center">
					<h2 className="font-bold text-4xl sm:text-5xl">{title}</h2>
					<p className="mx-auto mt-3 max-w-xl text-ink-muted">{body}</p>
				</div>

				<ul className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
					{photos.map((photo) => (
						<li key={photo.src} className={photo.wide ? "col-span-2" : undefined}>
							<img
								src={photo.src}
								alt={photo.alt}
								width={1280}
								height={1280}
								loading="lazy"
								decoding="async"
								className={`w-full rounded-xl object-cover sm:rounded-2xl ${
									photo.wide ? "aspect-video" : "aspect-square"
								}`}
							/>
						</li>
					))}
				</ul>

				<p className="mt-8 text-center text-ink-muted text-sm">{credits}</p>
			</div>
		</section>
	);
}
