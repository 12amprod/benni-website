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
		<section className="mx-auto max-w-5xl px-6 py-24">
			<h1 className="font-bold text-3xl">Impressum</h1>
			<p className="mt-6 max-w-prose text-ink-muted">
				Angaben gemäß § 5 DDG folgen. Platzhalter, bis die echten Kontaktdaten vorliegen.
			</p>
		</section>
	);
}
