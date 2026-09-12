import { site } from "#/content/site";

/**
 * Apple's two-up tile row: a pair of equal cards, each a photograph with the type set
 * across the top. Stacked below `sm`, side by side above it.
 */
export function FeaturedTiles() {
	const { title, body, items } = site.featured;

	return (
		<section id="events" className="bg-canvas px-2 pb-2">
			<div className="mx-auto max-w-6xl px-3 pt-20 pb-10 text-center sm:pt-28">
				<h2 className="font-bold text-4xl sm:text-5xl">{title}</h2>
				<p className="mx-auto mt-3 max-w-xl text-ink-muted">{body}</p>
			</div>

			<div className="grid gap-2 sm:grid-cols-2">
				{items.map((item) => (
					<article
						key={item.title}
						className="relative isolate flex min-h-96 flex-col items-center overflow-hidden rounded-3xl px-6 pt-12 pb-12 text-center sm:min-h-128"
					>
						<img
							src={item.image}
							alt={item.imageAlt}
							width={1280}
							height={1280}
							loading="lazy"
							decoding="async"
							className="-z-10 absolute inset-0 size-full object-cover"
						/>
						<div className="-z-10 absolute inset-0 bg-gradient-to-b from-canvas/80 via-canvas/25 to-canvas/75" />

						<h3 className="font-normal text-3xl tracking-brand sm:text-4xl">{item.title}</h3>
						<p className="mt-2 font-display font-bold text-relapse text-sm">{item.meta}</p>
						<p className="mx-auto mt-4 max-w-sm text-ink-muted text-sm">{item.body}</p>
					</article>
				))}
			</div>
		</section>
	);
}
