import { createFileRoute } from "@tanstack/react-router";
import { site } from "#/content/site";
import { studioUrl } from "../../studio/shared/project.ts";

/**
 * `/admin`: the address the team remembers, forwarding to the address that does the work.
 *
 * Deliberately empty. There is no login form on this site and nothing to attack here —
 * the page is a static file with a link in it. Authentication happens in the Sanity Studio
 * on Sanity's own domain, where only invited project members get through.
 *
 * Forwarded by a meta refresh rather than a script so it works with JavaScript off, and
 * kept out of search results: an admin URL in a search index helps nobody it is for.
 */
export const Route = createFileRoute("/admin")({
	head: () => ({
		meta: [
			{ title: `${site.admin.title} – ${site.name}` },
			{ name: "robots", content: "noindex, nofollow" },
			{ httpEquiv: "refresh", content: `0; url=${studioUrl}` },
		],
	}),
	component: AdminPage,
});

function AdminPage() {
	return (
		<section className="py-16 lg:py-0">
			<h1 className="font-display text-entry tracking-brand">{site.admin.title}</h1>
			<p className="mt-5 max-w-sm text-ink-muted text-sm leading-relaxed">{site.admin.body}</p>
			<a
				href={studioUrl}
				className="label mt-8 inline-block text-ink-muted transition-colors duration-300 hover:text-ink"
			>
				{site.admin.link} →
			</a>
		</section>
	);
}
