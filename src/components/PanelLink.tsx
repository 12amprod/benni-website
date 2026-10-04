import { Link } from "@tanstack/react-router";

/**
 * A link either stays on this site and jumps to a section (`hash`), or it leaves
 * (`href`) — never both, which is why this is a union rather than two optional fields.
 */
export type PanelLinkTarget =
	| { label: string; hash: string; href?: undefined }
	| { label: string; href: string; hash?: undefined };

/**
 * The call to action: display type set small, wide and upright, over a rule that runs the
 * full width of the label and an arrow that leaves to the right on hover. No pill, no fill
 * — on a photograph a button is a patch, and a ruled word is a caption.
 *
 * Set in ink rather than in the brand green. A green link on every panel spends the one
 * accent the site has four or five times before the visitor has reached the bottom; the
 * green now appears exactly once, on the edition that has not happened yet.
 */
/**
 * The appearance, on its own, for the one or two links that are neither a section anchor
 * nor an outbound URL — the 404 page's way home. Exported so there is one ruled word on
 * the site rather than one per component that happened to need it.
 */
export const panelLinkClass =
	"group inline-flex items-center gap-2 border-ink/25 border-b pb-1.5 font-display text-ink text-label uppercase tracking-label transition-colors duration-500 hover:border-ink";

/** The arrow that leaves to the right on hover. Decorative, so it is hidden from the tree. */
export function PanelLinkArrow() {
	return (
		<span
			aria-hidden="true"
			className="group-hover:translate-x-1 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-ui"
		>
			→
		</span>
	);
}

export function PanelLink(target: PanelLinkTarget) {
	const className = panelLinkClass;
	const arrow = (
		<span
			aria-hidden="true"
			className="group-hover:translate-x-1 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-ui"
		>
			→
		</span>
	);

	if (target.href !== undefined) {
		return (
			<a href={target.href} target="_blank" rel="noreferrer" className={className}>
				{target.label}
				{arrow}
			</a>
		);
	}

	return (
		<Link to="/" hash={target.hash} className={className}>
			{target.label}
			{arrow}
		</Link>
	);
}
