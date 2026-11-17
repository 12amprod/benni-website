import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { NotFound } from "#/components/NotFound";
import { SiteFooter } from "#/components/SiteFooter";
import { SiteSidebar } from "#/components/SiteSidebar";
import { site } from "#/content/site";
import appCss from "#/styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: site.title },
			{ name: "description", content: site.description },
			{ property: "og:site_name", content: site.name },
			{ property: "og:title", content: site.title },
			{ property: "og:description", content: site.description },
			{ property: "og:type", content: "website" },
			{ property: "og:locale", content: "de_DE" },
			// Link previews need absolute URLs, which need the real domain. Both tags
			// appear as soon as `site.url` is filled in; until then they are omitted
			// rather than shipped pointing at a placeholder.
			...(site.url
				? [
						{ property: "og:url", content: site.url },
						{ property: "og:image", content: `${site.url}/og.png` },
					]
				: []),
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
			// The display face sets the wordmark and the navigation, which are on screen
			// from the first frame. Without the preload the browser only discovers it after
			// the stylesheet parses and the sidebar visibly swaps fonts. `crossorigin` is
			// required on font preloads even same-origin, or the file is fetched twice.
			{
				rel: "preload",
				as: "font",
				type: "font/woff2",
				href: "/fonts/texgyreadventor-regular.woff2",
				crossOrigin: "anonymous",
			},
			// The mono face sets the tagline and every title over a series, so it is
			// discovered with the display face rather than one stylesheet later.
			{
				rel: "preload",
				as: "font",
				type: "font/woff2",
				href: "/fonts/jetbrainsmono-regular.woff2",
				crossOrigin: "anonymous",
			},
		],
	}),
	shellComponent: RootDocument,
	component: RootLayout,
	notFoundComponent: NotFound,
});

// The document shell: rendered once around the whole app, on the server (prerender)
// and never re-rendered on navigation. Keep it to <html>/<head>/<body>.
function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang={site.locale}>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

/**
 * The sidebar, and to its right one column that is nothing but the page and a ruled line
 * under it. Below `lg` the sidebar is a bar on top and the column is the full width.
 */
function RootLayout() {
	return (
		<>
			<SiteSidebar />
			<div className="lg:pl-sidebar">
				<main className="mx-auto max-w-6xl px-4 pt-4 pb-24 sm:px-6 lg:px-12 lg:pt-12 lg:pb-32">
					<Outlet />
				</main>
				<SiteFooter />
			</div>
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
