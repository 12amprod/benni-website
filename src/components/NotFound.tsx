import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<section className="mx-auto max-w-5xl px-6 py-24">
			<h1 className="font-bold text-3xl">Seite nicht gefunden</h1>
			<p className="mt-4 text-ink-muted">Die angeforderte Seite existiert nicht.</p>
			<Link to="/" className="mt-8 inline-block font-display text-relapse">
				Zur Startseite
			</Link>
		</section>
	);
}
