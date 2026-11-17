import { createFileRoute } from "@tanstack/react-router";
import { site } from "#/content/site";

export const Route = createFileRoute("/impressum")({
	head: () => ({
		meta: [{ title: `Impressum – ${site.name}` }, { name: "robots", content: "noindex" }],
	}),
	component: ImpressumPage,
});

function ImpressumPage() {
	return (
		<section className="py-16 lg:py-0">
			<h1 className="font-display text-entry tracking-brand">{site.impressum.title}</h1>
			<p className="mt-4 max-w-sm text-ink-muted text-sm leading-relaxed">{site.impressum.body}</p>
		</section>
	);
}
