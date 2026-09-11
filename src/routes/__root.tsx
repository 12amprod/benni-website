import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { NotFound } from "#/components/NotFound";
import { SiteFooter } from "#/components/SiteFooter";
import { SiteHeader } from "#/components/SiteHeader";
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

function RootLayout() {
	return (
		<>
			<SiteHeader />
			<main>
				<Outlet />
			</main>
			<SiteFooter />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
