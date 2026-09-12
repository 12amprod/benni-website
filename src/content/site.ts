/**
 * Site-wide copy and metadata. **All user-facing text lives here**, not inline in JSX, so
 * copy can change without touching components. German is the product language.
 *
 * Everything about the events, the acts and the photo credits below was read off the
 * public Instagram profile @relapse.vol4 (and the posts it is tagged in) on 2026-09-12.
 * Anything that was not on that profile is marked `TODO` rather than invented — see the
 * `dateLabel` fields and `email` in particular.
 */
/**
 * Hoisted so the sections below can link to the profile without repeating the URL.
 */
const instagram = {
	handle: "@relapse.vol4",
	url: "https://www.instagram.com/relapse.vol4/",
} as const;

export const site = {
	name: "RELAPSE",
	title: "RELAPSE – Eventreihe & Fotoarchiv",
	description:
		"RELAPSE ist eine Eventreihe zwischen Techno und Rap in der Hafenbar Hettstedt. Termine, Lineup und das Fotoarchiv aller bisherigen Ausgaben.",
	locale: "de",

	/** TODO: Platzhalter, bis die echte Kontaktadresse feststeht. */
	email: "hallo@example.com",

	instagram,

	/**
	 * The live origin, no trailing slash, e.g. "https://relapse.de".
	 * Empty until the domain is decided. Filling this in switches on the absolute
	 * `og:url` / `og:image` tags that link previews need — see `src/routes/__root.tsx`
	 * — and is also the `host` the sitemap needs (commented block in vite.config.ts).
	 * `as string` keeps it widened so those checks are not narrowed away by `as const`.
	 */
	url: "" as string,

	/**
	 * The header navigation. Every entry points at a section of the home page, the way
	 * Apple's nav points at one product per entry, so `to` is always "/" and `hash` picks
	 * the section. The section ids are set in `src/routes/index.tsx`.
	 */
	nav: [
		{ to: "/", hash: "vol4", label: "VOL.4" },
		{ to: "/", hash: "events", label: "Events" },
		{ to: "/", hash: "lineup", label: "Lineup" },
		{ to: "/", hash: "galerie", label: "Galerie" },
		{ to: "/", hash: "termine", label: "Termine" },
		{ to: "/", hash: "location", label: "Location" },
		{ to: "/", hash: "kontakt", label: "Kontakt" },
	],

	hero: {
		title: "RELAPSE",
		subtitle: "Techno, Rap und lange Nächte in der Hafenbar Hettstedt.",
		image: "/images/relapse/beach-02.jpg",
		imageAlt:
			"Volle Tanzfläche unter Lichterketten bei RELAPSE BEACH, im grünen Scheinwerferlicht gehen Hände nach oben.",
		links: [
			{ label: "Events ansehen", hash: "events" },
			{ label: "Ins Fotoarchiv", hash: "galerie" },
		],
	},

	/** The next edition. TODO: Datum, Lineup und Ticketlink ergänzen, sobald angekündigt. */
	next: {
		eyebrow: "Die nächste Ausgabe",
		title: "RELAPSE VOL.4",
		subtitle: "Coming soon.",
		body: "Datum, Lineup und Tickets werden zuerst auf Instagram angekündigt.",
		image: "/images/relapse/vol3-07.jpg",
		imageAlt: "Silhouette vor weißem Nebel und Lichtpunkten auf der Tanzfläche bei RELAPSE VOL.3.",
		links: [
			{ label: "Auf Instagram folgen", href: instagram.url },
			{ label: "Alle Termine", hash: "termine" },
		],
	},

	/** The two most recent editions, as the pair of tiles under the VOL.4 panel. */
	featured: {
		title: "Die letzten Ausgaben",
		body: "Zweimal Hafenbar: einmal draußen im Hof, einmal drinnen im Club.",
		items: [
			{
				title: "RELAPSE BEACH",
				meta: "25.07.2026 · Hafenbar Hettstedt",
				body: "Open Air zum 13. Geburtstag der Hafenbar: Beach Stage, Live-Rap und Lichterketten bis in den Morgen.",
				image: "/images/relapse/beach-06.jpg",
				imageAlt:
					"Publikum bei RELAPSE BEACH hält Handytaschenlampen in die Luft, im Hintergrund Lichterketten.",
			},
			{
				title: "RELAPSE VOL.3",
				meta: "Januar 2026 · Hafenbar Hettstedt",
				body: "Die dritte Ausgabe drinnen: Nebel, Strobo und ein Lineup zwischen Hardtechno und Rap.",
				image: "/images/relapse/vol3-08.jpg",
				imageAlt: "Zwei DJs hinter den Decks bei RELAPSE VOL.3, auf der Leinwand steht 12AM.",
			},
		],
	},

	/** Acts that have played a RELAPSE so far, per the posts on the profile. */
	lineup: {
		title: "Das Lineup",
		body: "Wer bisher bei RELAPSE gespielt hat — zwischen Hardtechno, Industrial und deutschem Rap.",
		artists: [
			{
				name: "yung.shattered",
				role: "Rap · Live",
				handle: "@yung.shattered",
				url: "https://www.instagram.com/yung.shattered/",
				image: "/images/relapse/vol3-03.jpg",
				imageAlt: "yung.shattered singt bei RELAPSE VOL.3 ins Mikrofon.",
			},
			{
				name: "madebyanybody",
				role: "Hardtechno · Industrial",
				handle: "@madebyanybody",
				url: "https://www.instagram.com/madebyanybody/",
				image: "/images/relapse/vol3-09.jpg",
				imageAlt:
					"madebyanybody am DJ-Pult bei RELAPSE VOL.3, der Name leuchtet auf der Leinwand dahinter.",
			},
			{
				name: "DJ Sonnenschein",
				role: "DJ-Set",
				handle: "@djsonnenschein",
				url: "https://www.instagram.com/djsonnenschein/",
				image: "/images/relapse/vol3-05.jpg",
				imageAlt:
					"DJ Sonnenschein legt bei RELAPSE VOL.3 auf, der Name läuft über die Leinwand im Hintergrund.",
			},
		],
	},

	gallery: {
		title: "Das Archiv",
		body: "Fotos von RELAPSE BEACH und RELAPSE VOL.3.",
		/** Credits are the photographers tagged on the original posts. */
		credits: "Fotos: @jnsrbmn (VOL.3), @timflp.archive (BEACH), @madebyanybody",
		photos: [
			{
				src: "/images/relapse/beach-08.jpg",
				alt: "Rapper mit Mikrofon auf der Beach Stage im grünen Licht, daneben ein Gitarrist.",
				wide: true,
			},
			{
				src: "/images/relapse/beach-04.jpg",
				alt: "Grelles weißes Bühnenlicht strahlt über die Menge bei RELAPSE BEACH.",
				wide: false,
			},
			{
				src: "/images/relapse/vol3-01.jpg",
				alt: "Blick über das DJ-Pult bei RELAPSE VOL.3, ein Lichtstrahl bricht sich im Nebel über der Menge.",
				wide: false,
			},
			{
				src: "/images/relapse/beach-03.jpg",
				alt: "DJ mit Kopfhörern am Open-Air-Pult der Hafenbar, Gäste stehen davor.",
				wide: false,
			},
			{
				src: "/images/relapse/vol3-06.jpg",
				alt: "Violetter Nebel über der Tanzfläche bei RELAPSE VOL.3, im Hintergrund die Bühne.",
				wide: false,
			},
			{
				src: "/images/relapse/beach-07.jpg",
				alt: "Menschenmenge im Hof der Hafenbar unter Lichterketten und Rauch.",
				wide: true,
			},
			{
				src: "/images/relapse/vol3-04.jpg",
				alt: "Gäste sitzen bei warmem Lampenlicht an einem Tisch neben der Tanzfläche.",
				wide: false,
			},
			{
				src: "/images/relapse/beach-09.jpg",
				alt: "Zwei Besucherinnen von hinten, eine Hand mit Feuerzeug in der Luft.",
				wide: false,
			},
			{
				src: "/images/relapse/vol3-02.jpg",
				alt: "Zwei Silhouetten im violetten Licht vor der Bühne bei RELAPSE VOL.3.",
				wide: false,
			},
			{
				src: "/images/relapse/beach-05.jpg",
				alt: "Sonnenschirm und volle Terrasse der Hafenbar bei Nacht.",
				wide: false,
			},
		],
	},

	schedule: {
		title: "Termine",
		body: "Alle Ausgaben in der Reihenfolge, in der sie stattgefunden haben.",
		/**
		 * TODO: Die Daten von VOL.1 und VOL.2 stehen nicht öffentlich auf dem Profil und
		 * sind bewusst offen gelassen, statt geraten zu werden.
		 */
		entries: [
			{
				title: "RELAPSE VOL.4",
				dateLabel: "Datum folgt",
				venue: "Hafenbar Hettstedt",
				note: "Angekündigt",
				upcoming: true,
			},
			{
				title: "RELAPSE BEACH",
				dateLabel: "25.07.2026",
				venue: "Hafenbar Hettstedt",
				note: "13 Jahre Hafenbar",
				upcoming: false,
			},
			{
				title: "RELAPSE VOL.3",
				dateLabel: "Januar 2026",
				venue: "Hafenbar Hettstedt",
				note: "Fotos im Archiv",
				upcoming: false,
			},
			{
				title: "RELAPSE VOL.2",
				dateLabel: "Datum wird ergänzt",
				venue: "Hafenbar Hettstedt",
				note: "Archiv",
				upcoming: false,
			},
			{
				title: "RELAPSE VOL.1",
				dateLabel: "Datum wird ergänzt",
				venue: "Hafenbar Hettstedt",
				note: "Archiv",
				upcoming: false,
			},
		],
	},

	/** TODO: Adresse und Anfahrt ergänzen — auf dem Profil steht nur der Name der Location. */
	venue: {
		eyebrow: "Location",
		title: "Hafenbar Hettstedt",
		subtitle: "Ein Ort, alle Ausgaben.",
		body: "Jede bisherige Ausgabe von RELAPSE lief in der Hafenbar — drinnen im Club und draußen auf dem Hof mit der Beach Stage.",
		handle: "@hafenbar_hettstedt",
		url: "https://www.instagram.com/hafenbar_hettstedt/",
		image: "/images/relapse/beach-01.jpg",
		imageAlt:
			"Der Hof der Hafenbar Hettstedt bei Nacht: Schornstein mit Rauch, Lichterketten und Publikum vor der Bühne.",
	},

	contact: {
		eyebrow: "Kontakt",
		title: "Booking, Presse oder einfach fragen.",
		body: "Am schnellsten geht es per DM auf Instagram. Für alles Längere gibt es die Mailadresse.",
	},

	footer: {
		/** Apple's footnote block: the small print that sits above the link columns. */
		note: "Alle Fotos stammen von den Fotograf:innen der jeweiligen Veranstaltung und werden mit Nennung verwendet. Termine und Lineups können sich ändern.",
		columns: [
			{
				title: "Events",
				links: [
					{ label: "RELAPSE VOL.4", hash: "vol4" },
					{ label: "Alle Termine", hash: "termine" },
					{ label: "Location", hash: "location" },
				],
			},
			{
				title: "Archiv",
				links: [
					{ label: "Galerie", hash: "galerie" },
					{ label: "Lineup", hash: "lineup" },
				],
			},
			{
				title: "Kontakt",
				links: [{ label: "Kontakt", hash: "kontakt" }],
			},
		],
	},
} as const;
