import { Link } from "@tanstack/react-router";
import { site } from "#/content/site";

/**
 * One ruled line under the pictures: the copyright, the legal page and the ways to reach
 * anyone. Nothing else — the sidebar already says what the site is.
 */
export function SiteFooter() {
	return (
		<footer className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-12">
			<div className="label flex flex-wrap items-center gap-x-6 gap-y-2 border-hairline border-t pt-6 text-ink-muted">
				<p>
					© {new Date().getFullYear()} {site.name}
				</p>
				<Link to="/impressum" className="transition-colors duration-300 hover:text-ink">
					Impressum
				</Link>
				<a
					href={`mailto:${site.email}`}
					className="transition-colors duration-300 hover:text-ink sm:ml-auto"
				>
					{site.email}
				</a>
				<a
					href={site.author.url}
					target="_blank"
					rel="noreferrer"
					className="transition-colors duration-300 hover:text-ink"
				>
					{site.author.handle}
				</a>
			</div>
		</footer>
	);
}
