import { site } from "#/content/site";

/**
 * The last two editions, as the diptych the whole site is built around: one frame split
 * down the middle by a single hairline, each half a photograph with its caption along the
 * bottom. Pointing at a half gives it room and takes room from the other one.
 *
 * On a phone the two halves stack, which is the orientation of the original image — so the
 * narrow layout is the truer one here, not the degraded one.
 */
export function EditionDiptych() {
	return (
		<div className="diptych flex flex-col border-hairline border-y md:flex-row">
			{site.editions.featured.map((item) => (
				<article
					key={item.title}
					className="diptych-half reveal relative isolate flex min-h-112 flex-col justify-end overflow-clip border-hairline border-t p-6 first:border-t-0 sm:p-10 md:min-h-160 md:border-t-0 md:border-l md:first:border-l-0"
				>
					<img
						src={item.image}
						alt={item.imageAlt}
						width={1280}
						height={1280}
						loading="lazy"
						decoding="async"
						className="plate -z-10 absolute inset-0 size-full object-cover"
					/>
					<div className="-z-10 absolute inset-0 bg-gradient-to-t from-canvas via-canvas/55 to-canvas/25" />

					<p className="label text-ink-muted">{item.meta}</p>
					<h3 className="mt-4 font-normal text-2xl tracking-brand sm:text-3xl">{item.title}</h3>
					<p className="mt-3 max-w-sm text-ink-muted text-sm leading-relaxed">{item.body}</p>
				</article>
			))}
		</div>
	);
}
