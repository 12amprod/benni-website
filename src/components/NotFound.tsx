import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<section className="mx-auto max-w-5xl px-6 py-24">
			<h1 className="font-semibold text-3xl tracking-tight">Seite nicht gefunden</h1>
			<p className="mt-4 text-neutral-600">Die angeforderte Seite existiert nicht.</p>
			<Link to="/" className="mt-8 inline-block underline">
				Zur Startseite
			</Link>
		</section>
	);
}
