import { site } from "#/content/site";
import { metaAttrs, sectionMeta } from "#/lib/section-meta";

/**
 * The closing call to action, and the one screen on the site that inverts: cream ground,
 * black type. It is the light half of the diptych the rest of the page is the dark half of,
 * and it is why the five sections above it read as night rather than as unlit.
 *
 * Spend the cream here and nowhere else. `data-ground="paper"` re-colours the focus ring,
 * because the brand green has nothing like enough contrast against it.
 *
 * The two addresses are ruled words, not filled buttons. A black slab on cream is the most
 * emphatic thing the site could put on its last screen, and the last screen is exactly
 * where it has already been earned.
 */
export function ContactPanel() {
	const { eyebrow, title, body } = site.contact;
	const meta = sectionMeta("kontakt");

	return (
		<section
			id="kontakt"
			data-ground="paper"
			{...metaAttrs("kontakt")}
			className="bg-paper py-32 text-canvas sm:py-44"
		>
			<div className="mx-auto max-w-6xl px-5 sm:px-6">
				<header className="border-canvas/15 border-t pt-5">
					<p className="reveal flex items-baseline gap-x-4">
						<span className="label text-canvas/35">{meta.number}</span>
						<span className="label text-canvas/55">{eyebrow}</span>
					</p>

					<h2 className="reveal mask-reveal mt-8 max-w-2xl font-normal text-section tracking-brand">
						<span className="mask-line">
							<span>{title}</span>
						</span>
					</h2>

					<p className="reveal mt-5 max-w-sm text-canvas/60 text-sm leading-relaxed">{body}</p>
				</header>

				<div className="reveal mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
					<a
						href={site.instagram.url}
						target="_blank"
						rel="noreferrer"
						className="border-canvas/25 border-b pb-1.5 font-display text-canvas text-label uppercase tracking-label transition-colors duration-500 hover:border-canvas"
					>
						{site.instagram.handle}
					</a>
					<a
						href={`mailto:${site.email}`}
						className="border-canvas/25 border-b pb-1.5 font-display text-canvas text-label uppercase tracking-label transition-colors duration-500 hover:border-canvas"
					>
						{site.email}
					</a>
				</div>
			</div>
		</section>
	);
}
