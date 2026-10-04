import { Link } from "@tanstack/react-router";
import { site } from "#/content/site";

/**
 * The bottom chrome: the small print, then one ruled row with the copyright, the legal
 * page and the two ways to reach anyone. It sits above the metadata line, which the body
 * reserves room for.
 *
 * The three link columns that used to sit between them are gone. They repeated the header
 * navigation — which is four items and is sticky, so it is already on screen — under three
 * headings that named sections the page had just finished showing. A footer that restates
 * the site is the clearest sign a site has more chrome than content.
 */
export function SiteFooter() {
	return (
		<footer className="border-hairline border-t bg-canvas text-ink-muted">
			<div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
				<p className="max-w-md text-xs leading-relaxed">{site.footer.note}</p>

				<div className="label mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-hairline border-t pt-8">
					<p>
						© {new Date().getFullYear()} {site.name}
					</p>
					<Link to="/impressum" className="transition-colors duration-500 hover:text-ink">
						Impressum
					</Link>
					<a
						href={site.instagram.url}
						target="_blank"
						rel="noreferrer"
						className="ml-auto transition-colors duration-500 hover:text-ink"
					>
						{site.instagram.handle}
					</a>
					<a
						href={`mailto:${site.email}`}
						className="transition-colors duration-500 hover:text-ink"
					>
						{site.email}
					</a>
				</div>
			</div>
		</footer>
	);
}
