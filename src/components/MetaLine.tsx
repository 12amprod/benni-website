import { sectionMeta } from "#/lib/section-meta";

/**
 * The metadata line, pinned to the bottom edge of every page.
 *
 * Four mono slots — index, name, detail, type — that read whichever section is currently
 * at the top of the viewport, plus a hairline of scroll progress along its upper edge. It
 * is the HUD of a camera, and it is the cheapest thing on the site that makes it read as
 * an instrument rather than a page.
 *
 * All four slots and the progress rule are ink. This line is on screen at every scroll
 * position, so anything coloured in it is a colour the visitor never stops seeing — which
 * is the definition of an accent being spent badly.
 *
 * The slots are filled here with the first section's values, so the line is correct in the
 * prerendered HTML and stays correct with JavaScript switched off. `src/lib/scroll-motion`
 * rewrites the text as the page moves; nothing else about the line is dynamic.
 *
 * `aria-hidden`: every value in it is a duplicate of a heading that is already on the page,
 * and a live region that rewrites itself on every scroll is hostile to a screen reader.
 */
export function MetaLine() {
	// The opening panel — the page always starts there, so these are the values that
	// belong in the static HTML.
	const first = sectionMeta("start");

	return (
		<div
			aria-hidden="true"
			className="fixed inset-x-0 bottom-0 z-40 border-hairline border-t bg-canvas/80 backdrop-blur-xl backdrop-saturate-150"
		>
			{/* The progress rule sits on the border, not under it. */}
			<span className="meta-progress absolute inset-x-0 top-0 block h-px bg-ink/30" />

			<div className="mx-auto flex h-metaline max-w-6xl items-center gap-x-5 px-5 sm:gap-x-8 sm:px-6">
				<span className="label shrink-0 text-ink/35" data-meta-slot="index">
					{first.index}
				</span>
				<span className="label truncate text-ink" data-meta-slot="name">
					{first.name}
				</span>
				<span className="label hidden truncate text-ink-muted sm:block" data-meta-slot="detail">
					{first.detail}
				</span>
				<span
					className="label ml-auto hidden shrink-0 text-ink-muted md:block"
					data-meta-slot="type"
				>
					{first.type}
				</span>
			</div>
		</div>
	);
}
