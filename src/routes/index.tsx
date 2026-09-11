import { createFileRoute } from "@tanstack/react-router";
import { site } from "#/content/site";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<section className="mx-auto max-w-5xl px-6 py-24">
			<h1 className="font-semibold text-4xl tracking-tight sm:text-5xl">{site.name}</h1>
			<p className="mt-6 max-w-prose text-lg text-neutral-600">{site.description}</p>
		</section>
	);
}
