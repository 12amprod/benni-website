import { Link } from "@tanstack/react-router";
import { site } from "#/content/site";

export function NotFound() {
	return (
		<section className="py-16 lg:py-0">
			<p className="label text-ink-muted">404</p>
			<h1 className="mt-4 font-display text-entry tracking-brand">{site.notFound.title}</h1>
			<p className="mt-4 max-w-sm text-ink-muted text-sm leading-relaxed">{site.notFound.body}</p>
			<Link
				to="/"
				className="label mt-8 inline-block text-ink-muted transition-colors duration-300 hover:text-ink"
			>
				{site.notFound.link} →
			</Link>
		</section>
	);
}
