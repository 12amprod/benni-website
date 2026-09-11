import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "#/components/NotFound";

/**
 * Prerendered to `dist/client/404.html` (see `pages` in vite.config.ts). Static hosts
 * — Cloudflare Pages, Netlify, GitHub Pages — serve that file for any unknown URL, so
 * without this route a mistyped link would show the host's generic error page instead
 * of the site's own with its navigation.
 */
export const Route = createFileRoute("/404")({
	head: () => ({
		meta: [{ title: "Seite nicht gefunden" }, { name: "robots", content: "noindex" }],
	}),
	component: NotFound,
});
