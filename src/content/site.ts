/**
 * Site-wide copy and metadata. Placeholder content until real copy (or a CMS) lands —
 * keep user-facing strings here rather than inline in JSX so they stay easy to find and
 * swap. German is the product language.
 */
export const site = {
	name: "Benni",
	title: "Benni – Portfolio",
	description: "Ausgewählte Arbeiten und Projekte von Benni.",
	locale: "de",
	email: "hallo@example.com",

	/**
	 * The live origin, no trailing slash, e.g. "https://benni.de".
	 * Empty until the domain is decided. Filling this in switches on the absolute
	 * `og:url` / `og:image` tags that link previews need — see `src/routes/__root.tsx`
	 * — and is also the `host` the sitemap needs (commented block in vite.config.ts).
	 * `as string` keeps it widened so those checks are not narrowed away by `as const`.
	 */
	url: "" as string,

	nav: [
		{ to: "/", label: "Start" },
		{ to: "/impressum", label: "Impressum" },
	],
} as const;
