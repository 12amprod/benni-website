import { Link } from "@tanstack/react-router";
import { PanelLinkArrow, panelLinkClass } from "#/components/PanelLink";

export function NotFound() {
	return (
		<section className="mx-auto max-w-6xl px-5 py-32 sm:px-6">
			<p className="label text-ink-muted">404</p>
			<h1 className="mt-8 font-normal text-section tracking-brand">Seite nicht gefunden</h1>
			<p className="mt-5 max-w-sm text-ink-muted text-sm leading-relaxed">
				Die angeforderte Seite existiert nicht.
			</p>
			{/* The same ruled word as every other call to action on the site, rather than a
			    third variant of a link that only this page ever shows. `PanelLink` itself
			    takes a section anchor or an outbound URL, and this is neither. */}
			<Link to="/" className={`mt-10 ${panelLinkClass}`}>
				Zur Startseite
				<PanelLinkArrow />
			</Link>
		</section>
	);
}
