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
		<section className="mx-auto max-w-6xl px-5 py-32 sm:px-6">
			<p className="label text-ink-muted">Rechtliches</p>
			<h1 className="mt-8 font-normal text-section tracking-brand">Impressum</h1>
			<p className="mt-5 max-w-sm text-ink-muted text-sm leading-relaxed">
				Angaben gemäß § 5 DDG folgen. Platzhalter, bis die echten Kontaktdaten vorliegen.
			</p>
		</section>
	);
}
