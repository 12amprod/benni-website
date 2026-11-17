import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	// Consume the `#/*` alias straight from tsconfig instead of duplicating it here.
	resolve: { tsconfigPaths: true },
	plugins: [
		tailwindcss(),
		tanstackStart({
			// Prerendered to dist/client/404.html rather than 404/index.html, because that
			// is the filename every static host looks for when a URL matches nothing.
			pages: [
				{
					path: "/404",
					prerender: { outputPath: "/404.html", autoSubfolderIndex: false },
					sitemap: { exclude: true },
				},
				// Nothing links to /admin, so the link crawler would never find it. Listed
				// here so it is prerendered all the same; it forwards to the Sanity Studio.
				{ path: "/admin", prerender: { enabled: true }, sitemap: { exclude: true } },
			],
			// Every route is rendered to static HTML at build time and nothing runs at
			// request time, so `dist/client` is the whole deployable site. Content from the
			// CMS is pulled before this runs (`scripts/pull-archive.ts`) and baked in — not
			// fetched in a loader, which would re-run in the browser on client navigation.
			prerender: {
				enabled: true,
				crawlLinks: true,
				autoSubfolderIndex: true,
				failOnError: true,
			},
		}),
		// Sitemap: switch on once the domain is known. `host` must be the live origin,
		// so it reads from the same single source as the meta tags:
		//   sitemap: { enabled: true, host: site.url }
		// (import { site } from "./src/content/site" above.)
		//
		// react's vite plugin must come after start's vite plugin
		viteReact(),
	],
	server: { port: 3000 },
});
