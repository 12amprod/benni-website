import { Link } from "@tanstack/react-router";

/**
 * A link either stays on this site and jumps to a section (`hash`), or it leaves
 * (`href`) — never both, which is why this is a union rather than two optional fields.
 */
export type PanelLinkTarget =
	| { label: string; hash: string; href?: undefined }
	| { label: string; href: string; hash?: undefined };

/**
 * Apple's call-to-action link: accent colour, no underline, and a chevron that nudges
 * right on hover.
 */
export function PanelLink(target: PanelLinkTarget) {
	const className =
		"group inline-flex items-center gap-1 font-display text-relapse text-lg transition-opacity hover:opacity-80";
	const chevron = (
		<span
			aria-hidden="true"
			className="group-hover:translate-x-0.5 motion-safe:transition-transform"
		>
			›
		</span>
	);

	if (target.href !== undefined) {
		return (
			<a href={target.href} target="_blank" rel="noreferrer" className={className}>
				{target.label}
				{chevron}
			</a>
		);
	}

	return (
		<Link to="/" hash={target.hash} className={className}>
			{target.label}
			{chevron}
		</Link>
	);
}
