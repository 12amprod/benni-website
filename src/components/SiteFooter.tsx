import { site } from "#/content/site";

export function SiteFooter() {
	return (
		<footer className="border-neutral-200 border-t">
			<div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-neutral-500 text-sm">
				<p>
					© {new Date().getFullYear()} {site.name}
				</p>
				<a href={`mailto:${site.email}`} className="hover:underline">
					{site.email}
				</a>
			</div>
		</footer>
	);
}
