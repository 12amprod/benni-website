import { site } from "#/content/site";

/** The acts, as portrait cards — three across on desktop, one per row on a phone. */
export function LineupGrid() {
	const { title, body, artists } = site.lineup;

	return (
		<section id="lineup" className="bg-canvas px-5 py-20 sm:px-6 sm:py-28">
			<div className="mx-auto max-w-6xl">
				<div className="reveal text-center">
					<h2 className="font-bold text-4xl sm:text-5xl">{title}</h2>
					<p className="mx-auto mt-3 max-w-xl text-ink-muted">{body}</p>
				</div>

				<ul className="mt-12 grid gap-4 sm:grid-cols-3">
					{artists.map((artist) => (
						<li key={artist.name} className="reveal">
							<a
								href={artist.url}
								target="_blank"
								rel="noreferrer"
								className="group block overflow-clip rounded-3xl bg-surface transition-opacity hover:opacity-90"
							>
								<img
									src={artist.image}
									alt={artist.imageAlt}
									width={1280}
									height={1280}
									loading="lazy"
									decoding="async"
									className="aspect-square w-full object-cover duration-700 group-hover:scale-105 motion-safe:transition-transform"
								/>
								<div className="px-5 py-5">
									<h3 className="font-bold text-xl">{artist.name}</h3>
									<p className="mt-1 font-display text-ink-muted text-sm">{artist.role}</p>
									<p className="mt-3 font-display text-relapse text-sm">
										{artist.handle}
										<span aria-hidden="true" className="ml-1 inline-block">
											›
										</span>
									</p>
								</div>
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
