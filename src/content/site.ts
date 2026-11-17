/**
 * Site-wide copy and metadata. **All user-facing text lives here**, not inline in JSX, so
 * copy can change without touching components. German is the product language.
 *
 * The site is relapse — the name, the wordmark — and what it shows first is the portfolio
 * of the person who photographed and filmed every frame on it, @timflp.archive. His own
 * work comes first, then Yung Shattered, then the relapse series itself.
 *
 * The works come from the CMS (or `archive.local.ts`), not from here — see `archive.ts`.
 * Only the words around them live in this file, and there are deliberately few of them:
 * the pictures are the page. Anything that was not on a public profile is marked `TODO`
 * rather than invented — see `email` in particular.
 */
export const site = {
	name: "relapse",
	title: "relapse — Fotografie & Film von Tim",
	description:
		"Fotografie und Film von @timflp.archive: Events, Videos und freie Serien, die Arbeiten für Yung Shattered und die Eventreihe relapse.",
	locale: "de",

	/** TODO: Platzhalter, bis die echte Kontaktadresse feststeht. */
	email: "hallo@example.com",

	/** The one person behind every frame on this site. */
	author: {
		name: "Tim",
		handle: "@timflp.archive",
		url: "https://www.instagram.com/timflp.archive/",
	},

	/**
	 * The live origin, no trailing slash, e.g. "https://relapse.de".
	 * Empty until the domain is decided. Filling this in switches on the absolute
	 * `og:url` / `og:image` tags that link previews need — see `src/routes/__root.tsx`
	 * — and is also the `host` the sitemap needs (commented block in vite.config.ts).
	 * `as string` keeps it widened so those checks are not narrowed away by `as const`.
	 */
	url: "" as string,

	/** Under the wordmark in the sidebar, one short line each. */
	tagline: ["Fotografie & Film", "von Tim"],

	/**
	 * The sidebar, in groups separated by space rather than by headings: Tim's own work
	 * first, then the two pages that are work for someone. `gallery` names the page's
	 * gallery, so an entry whose gallery is empty is left out of the sidebar instead of
	 * leading to a page with nothing on it.
	 */
	nav: [
		[
			{ to: "/", gallery: "events", label: "Events" },
			{ to: "/videos", gallery: "videos", label: "Videos" },
			{ to: "/serien", gallery: "serien", label: "Serien" },
		],
		[
			{ to: "/yung-shattered", gallery: "yung-shattered", label: "Yung Shattered" },
			{ to: "/relapse", gallery: "relapse", label: "relapse" },
		],
	],

	/**
	 * One entry per gallery page. `title` is the page's `<h1>` and its browser title;
	 * `intro` and `link` are the only words a gallery carries above its pictures, and most
	 * carry none.
	 */
	galleries: {
		events: { title: "Events" },
		videos: { title: "Videos" },
		serien: { title: "Serien" },
		"yung-shattered": {
			title: "Yung Shattered",
			link: { label: "@yung.shattered", href: "https://www.instagram.com/yung.shattered/" },
		},
		relapse: {
			title: "relapse",
			/** The page shares its name with the site, so its browser title says what it is. */
			documentTitle: "relapse – Eventreihe in der Hafenbar Hettstedt",
			intro: "Eventreihe zwischen Techno und Rap in der Hafenbar Hettstedt.",
			link: { label: "@relapse.vol4", href: "https://www.instagram.com/relapse.vol4/" },
		},
	},

	/**
	 * What a group of works is called on a page that holds more than one kind — on Yung
	 * Shattered, "Videos" over the films and "Bilder" over the covers and shoots. A page
	 * with one kind prints no group heading at all.
	 */
	groupLabels: {
		events: "Fotos",
		video: "Videos",
		releases: "Bilder",
		frei: "Serien",
	},

	/** On a gallery page the CMS has nothing for yet. */
	emptyGallery: "Hier sind gerade keine Arbeiten.",

	/** The enlarged view. */
	lightbox: {
		close: "Schließen",
		previous: "Vorheriges Bild",
		next: "Nächstes Bild",
		source: "Beitrag",
	},

	menu: { open: "Menü öffnen", close: "Menü schließen" },

	/**
	 * `/admin` — the address the RELAPSE team types to reach the archive's editor. The page
	 * itself holds nothing: no form, no script, no session. It forwards to the Sanity
	 * Studio, which is hosted by Sanity and where the login happens.
	 */
	admin: {
		title: "Admin",
		body: "Das Archiv wird im Sanity Studio gepflegt. Du wirst weitergeleitet — falls nicht, hier entlang:",
		link: "Zum RELAPSE Archiv",
	},

	impressum: {
		title: "Impressum",
		body: "Angaben gemäß § 5 DDG folgen. Platzhalter, bis die echten Kontaktdaten vorliegen.",
	},

	notFound: {
		title: "Seite nicht gefunden",
		body: "Die angeforderte Seite existiert nicht.",
		link: "Zur Startseite",
	},
} as const;
