import { Link } from "@tanstack/react-router";
import { site } from "#/content/site";

/** Each link is at least 44px tall on a phone, where it is a thumb's target; a row on a desk. */
const linkClass =
	"inline-flex min-h-11 items-center transition-colors duration-300 hover:text-ink active:text-ink sm:min-h-0";

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
				<Link to="/impressum" className={linkClass}>
					Impressum
				</Link>
				<a href={`mailto:${site.email}`} className={`${linkClass} sm:ml-auto`}>
					{site.email}
				</a>
				<a href={site.author.url} target="_blank" rel="noreferrer" className={linkClass}>
					{site.author.handle}
				</a>
			</div>
		</footer>
	);
}
