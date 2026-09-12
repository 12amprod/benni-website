import { Link } from "@tanstack/react-router";
import { site } from "#/content/site";

/**
 * Apple's global footer: the small print first, then the link columns, then one thin row
 * with the copyright and the legal pages. All of it at 12px.
 */
export function SiteFooter() {
	return (
		<footer className="border-hairline border-t bg-canvas text-ink-muted text-xs">
			<div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
				<p className="max-w-2xl leading-relaxed">{site.footer.note}</p>

				<div className="mt-10 grid gap-8 border-hairline border-t pt-8 sm:grid-cols-3">
					{site.footer.columns.map((column) => (
						<nav key={column.title} aria-label={column.title}>
							<h2 className="font-bold text-ink">{column.title}</h2>
							<ul className="mt-3 space-y-2 font-display">
								{column.links.map((link) => (
									<li key={link.label}>
										<Link to="/" hash={link.hash} className="transition-colors hover:text-ink">
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>

				<div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-hairline border-t pt-6 font-display">
					<p>
						© {new Date().getFullYear()} {site.name}
					</p>
					<Link to="/impressum" className="transition-colors hover:text-ink">
						Impressum
					</Link>
					<a
						href={site.instagram.url}
						target="_blank"
						rel="noreferrer"
						className="transition-colors hover:text-ink"
					>
						{site.instagram.handle}
					</a>
					<a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
						{site.email}
					</a>
				</div>
			</div>
		</footer>
	);
}
