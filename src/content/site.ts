/**
 * Site-wide copy and metadata. **All user-facing text lives here**, not inline in JSX, so
 * copy can change without touching components. German is the product language.
 *
 * Everything about the events and the editions below was read off the public Instagram
 * profile @relapse.vol4 (and the posts it is tagged in) on 2026-09-12. The archive — every
 * work, date, caption and link in `archive.segments` — was read off @timflp.archive on
 * 2026-09-19, which is also where every photograph in `public/images/timflp` comes from.
 * Anything that was on neither profile is marked `TODO` rather than invented — see the
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
	name: "relapse",
	title: "relapse – Eventreihe & Fotoarchiv",
	description:
		"relapse ist eine Eventreihe zwischen Techno und Rap in der Hafenbar Hettstedt. Termine, Lineup und das Fotoarchiv aller bisherigen Ausgaben.",
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
	 * The header navigation — one entry per section of the home page, so `to` is always
	 * "/" and `hash` picks the section. The section ids are set in `src/routes/index.tsx`.
	 *
	 * Four entries, not seven. A nav is a legend, and a legend nobody reads is decoration:
	 * "Lineup", "Galerie", "Termine" and "Location" were each one line inside a section
	 * this list already points at, so they are reached by scrolling rather than named twice.
	 */
	nav: [
		{ to: "/", hash: "vol4", label: "vol.4" },
		{ to: "/", hash: "ausgaben", label: "Ausgaben" },
		{ to: "/", hash: "archiv", label: "Archiv" },
		{ to: "/", hash: "kontakt", label: "Kontakt" },
	],

	hero: {
		title: "relapse",
		subtitle: "Techno, Rap und lange Nächte in der Hafenbar Hettstedt.",
		/** Set small and flush right under the wordmark, like "white pony" under "deftones". */
		edition: "vol.4",
		image: "/images/timflp/relapse-beach-02.jpg",
		imageAlt:
			"Volle Tanzfläche unter Lichterketten bei relapse beach, im grünen Scheinwerferlicht gehen Hände nach oben.",
		/** One, not two. The opening frame is the wordmark; this is the only thing beside it. */
		links: [{ label: "Ins Archiv", hash: "archiv" }],
	},

	/** The next edition. TODO: Datum, Lineup und Ticketlink ergänzen, sobald angekündigt. */
	next: {
		eyebrow: "Die nächste Ausgabe",
		title: "relapse vol.4",
		subtitle: "Coming soon.",
		body: "Datum, Lineup und Tickets werden zuerst auf Instagram angekündigt.",
		image: "/images/timflp/relapse-beach-03.jpg",
		imageAlt: "Fischaugenblick über das DJ-Pult auf die Menge bei relapse beach.",
		links: [{ label: "Auf Instagram folgen", href: instagram.url }],
	},

	/**
	 * Every edition, in one section rather than two. The last two carry a photograph each
	 * and open the section; the full run follows underneath as a ruled table. They were
	 * previously "Rückblick" and "Termine" — two headings, two numbers and two scroll
	 * anchors for one subject, which is the kind of thing that makes a page feel long.
	 */
	editions: {
		title: "Ausgaben",
		body: "Die letzte Ausgabe im Hof und der Teaser zur nächsten. Darunter alle Ausgaben in der Reihenfolge, in der sie stattgefunden haben.",
		/**
		 * The diptych that opens the section: the two editions this archive actually holds.
		 *
		 * It used to be "the two most recent" — beach and vol.3. vol.3 was photographed by
		 * someone else and its frames are gone with every other picture that was not
		 * @timflp.archive's, so the pairing is now the night he photographed and the one he
		 * filmed the teaser for. One half a photograph, one half a still: which is also the
		 * two halves of what this archive is.
		 */
		featured: [
			{
				title: "relapse beach",
				meta: "25.07.2026 · Hafenbar Hettstedt",
				body: "Open Air zum 13. Geburtstag der Hafenbar: Beach Stage, Live-Rap und Lichterketten bis in den Morgen.",
				image: "/images/timflp/relapse-beach-06.jpg",
				imageAlt:
					"Publikum bei relapse beach hält Handytaschenlampen in die Luft, im Hintergrund Lichterketten.",
			},
			{
				title: "relapse vol.4",
				meta: "Teaser · 04.05.2026",
				body: "Gedreht ist er: der Teaser zur vierten Ausgabe läuft seit Mai. Das Datum steht noch aus.",
				image: "/images/timflp/relapse-teaser-cover.jpg",
				imageAlt:
					"Standbild aus dem Teaser zu relapse vol.4: eine Silhouette vor dem Sonnenuntergang über dem Wasser.",
			},
		],
		/**
		 * TODO: Die Daten von vol.1 und vol.2 stehen nicht öffentlich auf dem Profil und
		 * sind bewusst offen gelassen, statt geraten zu werden.
		 */
		entries: [
			{
				title: "relapse vol.4",
				dateLabel: "Datum folgt",
				venue: "Hafenbar Hettstedt",
				note: "Angekündigt",
				upcoming: true,
			},
			{
				title: "relapse beach",
				dateLabel: "25.07.2026",
				venue: "Hafenbar Hettstedt",
				note: "13 Jahre Hafenbar",
				upcoming: false,
			},
			{
				title: "relapse vol.3",
				dateLabel: "Januar 2026",
				venue: "Hafenbar Hettstedt",
				/* Photographed by someone else, so it has no frames in this archive. */
				note: "Nicht im Archiv",
				upcoming: false,
			},
			{
				title: "relapse vol.2",
				dateLabel: "Datum wird ergänzt",
				venue: "Hafenbar Hettstedt",
				note: "Archiv",
				upcoming: false,
			},
			{
				title: "relapse vol.1",
				dateLabel: "Datum wird ergänzt",
				venue: "Hafenbar Hettstedt",
				note: "Archiv",
				upcoming: false,
			},
		],
	},

	/**
	 * The archive, and the reason this site has one: every photograph and every film on it
	 * was made by one person, @timflp.archive, and this section is his reference.
	 *
	 * It is ordered the way a body of work is ordered rather than the way an event site is:
	 * four segments — what he shot at events, what he filmed, what he made for releases, and
	 * what he made for nobody — and inside each segment the works run oldest to newest.
	 *
	 * `layout` decides whether a segment prints as sheets or as tiles, and the rule behind it
	 * is the one thing to keep when editing this list. A sheet row is four frames wide, so a
	 * work only earns a sheet if it has enough material to fill whole rows — four frames, or
	 * eight. Give a sheet five and the fifth sits alone against three empty cells, which
	 * reads as a broken grid rather than as an archive; that is exactly what the first cut of
	 * this section did. A work with less than a full row is a tile instead, which is why
	 * `releases` is a tile segment: a cover is one picture and always will be.
	 *
	 * Three works were dropped on that rule rather than padded or shrunk — madebyanybody
	 * (two frames), Nachtbilder (three) and Gedichte (three). Instagram serves the two
	 * @madebyanybody posts at thumbnail size to anyone not logged in, so there was no way to
	 * fill his row; the other two posts simply hold three pictures. They are the first things
	 * to bring back if more frames ever turn up.
	 *
	 * `date` is the day the work went up on @timflp.archive, not necessarily the day it was
	 * shot — that is the only date the profile actually states, so it is the only one claimed
	 * here. The single exception is `relapse beach`, whose event date the site already knows
	 * from elsewhere and states in `editions.entries`.
	 *
	 * `lift` is per-frame exposure and it does more work here than it did before. Every
	 * photograph is printed monochrome by `.plate`, and this set runs from a night clip at
	 * mean luma 18.1 to a bare winter forest at 140.5 — a 7.8x spread that no single filter
	 * can serve. Each frame therefore carries `clamp((64 / measured mean) ^ 0.6, 0.65, 2)`,
	 * which pulls the set into a 2.5x band without flattening a night into a day. The
	 * exponent is 0.6, not the 0.85 the old all-night set used: at 0.85 every daylight frame
	 * bottomed out against the floor of the clamp, which is the formula telling you it is the
	 * wrong curve. See `docs/photo-luminance.md` for the measurements.
	 *
	 * `lit` marks the one select: exactly one frame on the whole page keeps its colour, the
	 * way a select is ringed in grease pencil on a real sheet. It is `relapse-beach-04` — the
	 * site's own night, and a blue that cannot be mistaken for the green accent. Exactly one
	 * entry may carry `true`.
	 */
	archive: {
		title: "Archiv",
		body: "Alle Fotos und Filme von @timflp.archive, chronologisch und nach Art der Arbeit sortiert.",
		/**
		 * Every counted noun in the section, in both forms. German needs the singular as
		 * badly as English does, and "1 Fotos" in the margin of a contact sheet is the kind
		 * of thing that tells a visitor the page was assembled rather than made.
		 */
		labels: {
			frame: { one: "Foto", other: "Fotos" },
			work: { one: "Arbeit", other: "Arbeiten" },
			film: { one: "Film", other: "Filme" },
			still: { one: "Standbild", other: "Standbilder" },
			/** On the film tiles: what the thing is, and what the link does. */
			filmTag: "Film",
			watch: "Ansehen",
			/** In each work's margin marking: the way back to the original post. */
			source: "Beitrag",
		},
		/** The one person behind every frame on this site. */
		author: {
			name: "Tim",
			handle: "@timflp.archive",
			url: "https://www.instagram.com/timflp.archive/",
		},
		credits: "Alle Fotos und Filme: @timflp.archive. Jede Arbeit verlinkt auf den Originalbeitrag.",
		segments: [
			{
				id: "events",
				title: "Events",
				layout: "sheet",
				body: "Konzerte, Raves und was die Stadt sonst auf die Straße stellt — von der Kellerbühne bis zum Hof der Hafenbar.",
				works: [
					{
						title: "bone stew im RATS",
						date: "18.04.2026",
						meta: "Punk · Live",
						url: "https://www.instagram.com/timflp.archive/p/DXSBxu6DNPS/",
						photos: [
							{
								src: "/images/timflp/bone-stew-01.jpg",
								alt: "Zwei Gitarristen auf der kleinen Bühne im roten und grünen Scheinwerferlicht.",
								lift: 1.2,
							},
							{
								src: "/images/timflp/bone-stew-02.jpg",
								alt: "Blick von der Tanzfläche auf die Bühne: eine Person im Skelett-Shirt geht in die Knie.",
								lift: 1.04,
							},
							{
								src: "/images/timflp/bone-stew-03.jpg",
								alt: "Die Running Order des Abends als Ausdruck an der Wand, mit Totenköpfen bedruckt.",
								lift: 0.83,
							},
							{
								src: "/images/timflp/bone-stew-04.jpg",
								alt: "Weitwinkel auf die Bühne unter dem RATS-Schriftzug, die Band spielt im blauen Licht.",
								lift: 1.16,
							},
							{
								src: "/images/timflp/bone-stew-05.jpg",
								alt: "Schablonengraffiti eines Skaters an einer Betonwand, im Fischaugenblick.",
								lift: 0.87,
							},
							{
								src: "/images/timflp/bone-stew-07.jpg",
								alt: "Eine Person singt ins Mikrofon im violetten Licht, dahinter das Schlagzeug.",
								lift: 1.03,
							},
							{
								src: "/images/timflp/bone-stew-08.jpg",
								alt: "Die Band unter dem RATS-Schriftzug, Bass und Gitarre nebeneinander am Bühnenrand.",
								lift: 1.21,
							},
							{
								src: "/images/timflp/bone-stew-09.jpg",
								alt: "Rotes Pentagramm und Schriftzüge an der Wand neben der Bühne.",
								lift: 0.83,
							},
						],
					},
					{
						title: "Berggrenzlauf",
						date: "07.06.2026",
						meta: "Lauf · Schwarzweiß",
						url: "https://www.instagram.com/timflp.archive/p/DZSmw2rjO1o/",
						photos: [
							{
								src: "/images/timflp/berggrenzlauf-01.jpg",
								alt: "Rückenansicht eines Läufers, auf dem Trikot steht „Running against Rassismus“.",
								lift: 0.87,
							},
							{
								src: "/images/timflp/berggrenzlauf-02.jpg",
								alt: "Drei Personen mit Medaillen nach dem Ziel, Schwarzweiß.",
								lift: 0.84,
							},
							{
								src: "/images/timflp/berggrenzlauf-03.jpg",
								alt: "Das Läuferfeld sammelt sich unter dem Zielbogen.",
								lift: 0.82,
							},
							{
								src: "/images/timflp/berggrenzlauf-07.jpg",
								alt: "„7. Juni“ an eine alte Mauer gemalt.",
								lift: 0.89,
							},
						],
					},
					{
						title: "Meisterfeier MSV Eisleben",
						date: "14.06.2026",
						meta: "Aufstieg · Sport",
						url: "https://www.instagram.com/timflp.archive/p/DZkbadbjDwR/",
						photos: [
							{
								src: "/images/timflp/meisterfeier-01.jpg",
								alt: "Die Mannschaft feiert im violetten Rauch, Hände in der Luft.",
								lift: 0.91,
							},
							{
								src: "/images/timflp/meisterfeier-02.jpg",
								alt: "Die Mannschaft fällt sich auf dem Rasen um den Hals.",
								lift: 0.73,
							},
							{
								src: "/images/timflp/meisterfeier-03.jpg",
								alt: "Ein Spieler reißt im Laufen die Faust hoch.",
								lift: 0.76,
							},
							{
								src: "/images/timflp/meisterfeier-04.jpg",
								alt: "Die Mannschaft stemmt den Pokal in die Höhe.",
								lift: 0.75,
							},
							{
								src: "/images/timflp/meisterfeier-05.jpg",
								alt: "Rote Pyrotechnik hinter der Bande, Rauch zieht über den Platz.",
								lift: 0.93,
							},
							{
								src: "/images/timflp/meisterfeier-06.jpg",
								alt: "Einem Spieler wird von hinten Bier über den Kopf gegossen.",
								lift: 0.8,
							},
							{
								src: "/images/timflp/meisterfeier-11.jpg",
								alt: "Mannschaftsfoto auf dem Rasen, alle im Meistertrikot.",
								lift: 0.71,
							},
							{
								src: "/images/timflp/meisterfeier-13.jpg",
								alt: "Ein Spieler liegt im Gras und hält den Pokal in die Kamera.",
								lift: 0.78,
							},
						],
					},
					{
						title: "bone stew am Petrikirchplatz",
						date: "14.06.2026",
						meta: "Open Air · Live",
						url: "https://www.instagram.com/timflp.archive/p/DZlDuSwDMlG/",
						photos: [
							{
								src: "/images/timflp/petrikirchplatzfest-01.jpg",
								alt: "bone stew spielt vor dem Portal der Petrikirche.",
								lift: 0.73,
							},
							{
								src: "/images/timflp/petrikirchplatzfest-02.jpg",
								alt: "Blick über das Schlagzeug auf das Publikum und die Häuser am Platz.",
								lift: 0.77,
							},
							{
								src: "/images/timflp/petrikirchplatzfest-03.jpg",
								alt: "Fischaugenblick auf den Gitarristen vor dem Kirchenbogen.",
								lift: 0.7,
							},
							{
								src: "/images/timflp/petrikirchplatzfest-04.jpg",
								alt: "Zwei Gitarristen vor dem Kirchenportal, dazwischen ein Mikrofonständer.",
								lift: 0.82,
							},
							{
								src: "/images/timflp/petrikirchplatzfest-05.jpg",
								alt: "Der Platz von der Bühne aus: Publikum, Wimpelketten und Fachwerkhäuser.",
								lift: 0.94,
							},
							{
								src: "/images/timflp/petrikirchplatzfest-06.jpg",
								alt: "Eine Person headbangt am Mikrofon, daneben ein Skelett als Bühnendeko.",
								lift: 0.75,
							},
							{
								src: "/images/timflp/petrikirchplatzfest-07.jpg",
								alt: "Gitarrist neben dem Rippenbogen, der über der Bühne hängt.",
								lift: 0.8,
							},
							{
								src: "/images/timflp/petrikirchplatzfest-08.jpg",
								alt: "Schlagzeug von oben, die Becken füllen den Vordergrund.",
								lift: 0.71,
							},
						],
					},
					{
						title: "don’t think about it",
						date: "06.07.2026",
						meta: "Hauskonzert",
						url: "https://www.instagram.com/timflp.archive/p/DadiH3OjIH_/",
						photos: [
							{
								src: "/images/timflp/dont-think-01.jpg",
								alt: "Eine Wand voller Konzertposter über der Anlage.",
								lift: 0.89,
							},
							{
								src: "/images/timflp/dont-think-02.jpg",
								alt: "Band im Wohnzimmer, das Publikum steht einen Meter vor den Boxen.",
								lift: 1.43,
							},
							{
								src: "/images/timflp/dont-think-03.jpg",
								alt: "Eine Person spielt Gitarre im Zimmer, dahinter das Schlagzeug.",
								lift: 1.02,
							},
							{
								src: "/images/timflp/dont-think-04.jpg",
								alt: "Eine Person singt und spielt Bass in einem hell gestrichenen Zimmer.",
								lift: 0.76,
							},
						],
					},
					{
						title: "relapse beach",
						date: "26.07.2026",
						meta: "13 Jahre Hafenbar · Open Air",
						url: "https://www.instagram.com/timflp.archive/p/DbQ-m5eDG00/",
						photos: [
							{
								src: "/images/timflp/relapse-beach-01.jpg",
								alt: "Der Hof der Hafenbar bei Nacht: Lichterketten über der Menge, Rauch über dem Schornstein.",
								lift: 1.84,
							},
							{
								src: "/images/timflp/relapse-beach-02.jpg",
								alt: "Volle Tanzfläche unter Lichterketten, grünes Scheinwerferlicht über den Köpfen.",
								lift: 1.19,
							},
							{
								src: "/images/timflp/relapse-beach-03.jpg",
								alt: "Fischaugenblick über das DJ-Pult auf die Menge.",
								lift: 1.65,
							},
							{
								src: "/images/timflp/relapse-beach-04.jpg",
								alt: "Grelles blauweißes Bühnenlicht strahlt über die Menge.",
								lift: 0.93,
								lit: true,
							},
							{
								src: "/images/timflp/relapse-beach-05.jpg",
								alt: "Sonnenschirm und volle Terrasse der Hafenbar bei Nacht.",
								lift: 1.5,
							},
							{
								src: "/images/timflp/relapse-beach-06.jpg",
								alt: "Das Publikum hält Handytaschenlampen in die Luft.",
								lift: 1.11,
							},
							{
								src: "/images/timflp/relapse-beach-08.jpg",
								alt: "Eine Person am Mikrofon im grünen Licht, daneben ein Gitarrist.",
								lift: 1.37,
							},
							{
								src: "/images/timflp/relapse-beach-09.jpg",
								alt: "Zwei Gäste von hinten, eine Hand mit Feuerzeug in der Luft.",
								lift: 1,
							},
						],
					},
				],
			},
			{
				id: "video",
				title: "Videoarbeiten",
				layout: "tiles",
				body: "Musikvideos, Clips und Teaser. Jede Kachel führt zum Film auf Instagram — hier steht nur das erste Bild.",
				works: [
					{
						title: "CITY STORIES TOUR — Leipzig",
						date: "20.03.2026",
						meta: "@golagianni · Tourfilm",
						url: "https://www.instagram.com/timflp.archive/reel/DWHKucSjCkL/",
						video: true,
						photos: [
							{
								src: "/images/timflp/city-stories-cover.jpg",
								alt: "Standbild aus dem Tourfilm: eine Gestalt vor der blau ausgeleuchteten Bühne.",
								lift: 0.87,
							},
						],
					},
					{
						title: "relapse vol.4 — Teaser",
						date: "04.05.2026",
						meta: "@relapse.vol4 · Teaser",
						url: "https://www.instagram.com/relapse.vol4/reel/DX6hKDysPw6/",
						video: true,
						photos: [
							{
								src: "/images/timflp/relapse-teaser-cover.jpg",
								alt: "Standbild aus dem Teaser: eine Silhouette vor dem Sonnenuntergang über dem Wasser.",
								lift: 0.84,
							},
						],
					},
					{
						title: "NARCOTIC — Track 1, Intro",
						date: "18.05.2026",
						meta: "@yung.shattered · Videoclip",
						url: "https://www.instagram.com/yung.shattered/reel/DYe_T_XslN4/",
						video: true,
						photos: [
							{
								src: "/images/timflp/narcotic-intro-cover.jpg",
								alt: "Standbild aus dem Clip: eine Person vor dem NARCOTIC-Banner im winterlichen Wald.",
								lift: 0.65,
							},
						],
					},
					{
						title: "NARCOTIC — Track 2, keine Luft",
						date: "21.05.2026",
						meta: "@yung.shattered · Videoclip",
						url: "https://www.instagram.com/yung.shattered/reel/DYmyWPCom7I/",
						video: true,
						photos: [
							{
								src: "/images/timflp/narcotic-keine-luft-cover.jpg",
								alt: "Standbild aus dem Clip: Hände vor einer Lampe im Dunkeln, die Bewegung verwischt.",
								lift: 2,
							},
						],
					},
					{
						title: "CTE Remix",
						date: "27.08.2026",
						meta: "prod. @lost2n1ght · Videoclip",
						url: "https://www.instagram.com/timflp.archive/reel/DcjXyQkMZib/",
						video: true,
						photos: [
							{
								src: "/images/timflp/cte-remix-cover.jpg",
								alt: "Standbild aus dem Clip: eine Gestalt im blauen Licht, die Bewegung verwischt.",
								lift: 1.03,
							},
						],
					},
					{
						title: "TAUB — Musikvideo",
						date: "04.09.2026",
						meta: "Musikvideo · Release 11.09.",
						url: "https://www.instagram.com/timflp.archive/reel/Dc3z6dlsxI4/",
						video: true,
						photos: [
							{
								src: "/images/timflp/taub-cover.jpg",
								alt: "Standbild aus dem Musikvideo: eine Person zeigt über den Bergsee.",
								lift: 0.79,
							},
						],
					},
				],
			},
			{
				id: "releases",
				title: "Releases & Cover",
				layout: "tiles",
				body: "Einzelne Blätter statt einer Reihe: ein Shooting und zwei Cover, jedes für sich eine Arbeit. Die Kachel führt zum Beitrag.",
				works: [
					{
						title: "NARCOTIC — Shooting",
						date: "17.04.2026",
						meta: "Langzeitbelichtung",
						url: "https://www.instagram.com/timflp.archive/p/DXPsacDDGZA/",
						photos: [
							{
								src: "/images/timflp/narcotic-shoot-01.jpg",
								alt: "Langzeitbelichtetes Porträt, die Bewegung verwischt das Gesicht.",
								lift: 0.91,
							},
						],
					},
					{
						title: "NARCOTIC EP — Cover",
						date: "05.06.2026",
						meta: "@yung.shattered × @af.12am",
						url: "https://www.instagram.com/timflp.archive/p/DZMkYX5Mu2l/",
						photos: [
							{
								src: "/images/timflp/narcotic-cover-01.jpg",
								alt: "Das Cover der NARCOTIC EP: ein Banner mit dem Schriftzug zwischen Bäumen.",
								lift: 0.69,
							},
						],
					},
					{
						title: "ALTE MUSTER — Cover",
						date: "18.06.2026",
						meta: "@yung.shattered · Single",
						url: "https://www.instagram.com/timflp.archive/p/DZuLWJAs9pj/",
						photos: [
							{
								src: "/images/timflp/alte-muster-cover-01.jpg",
								alt: "Das Cover der Single ALTE MUSTER, grün eingefärbtes Standbild mit Schriftzug.",
								lift: 1.03,
							},
						],
					},
				],
			},
			{
				id: "frei",
				title: "Freie Arbeiten",
				layout: "sheet",
				body: "Serien ohne Auftrag. Dieselbe Kamera, dieselbe Handschrift, nur ohne Bühne davor.",
				works: [
					{
						title: "weiß",
						date: "28.02.2026",
						meta: "Serie · Winter",
						url: "https://www.instagram.com/timflp.archive/p/DVTgcH1jPOi/",
						photos: [
							{
								src: "/images/timflp/winter-01.jpg",
								alt: "Eine Hand hält einen brennenden Strauß weißer Rosen.",
								lift: 0.88,
							},
							{
								src: "/images/timflp/winter-02.jpg",
								alt: "Weiße Rosen auf einer Motorhaube, dahinter ein Bauwagen auf dem Feld.",
								lift: 0.67,
							},
							{
								src: "/images/timflp/winter-04.jpg",
								alt: "Eine Person steht an der offenen Autotür am Feldweg.",
								lift: 0.75,
							},
							{
								src: "/images/timflp/winter-07.jpg",
								alt: "Der brennende Rosenstrauß vor einer Betonwand.",
								lift: 0.75,
							},
						],
					},
					{
						title: "25 °C +",
						date: "29.05.2026",
						meta: "Serie · Sommer",
						url: "https://www.instagram.com/timflp.archive/p/DY7Yet2DAAc/",
						photos: [
							{
								src: "/images/timflp/summer-01.jpg",
								alt: "Fußball auf dem Weg im Park, der Ball rollt ins Bild.",
								lift: 0.87,
							},
							{
								src: "/images/timflp/summer-02.jpg",
								alt: "Grill mit Fleisch und Halloumi, von oben fotografiert.",
								lift: 0.74,
							},
							{
								src: "/images/timflp/summer-03.jpg",
								alt: "Eine Person im weißen Shirt hält einen Becher in die Kamera.",
								lift: 0.82,
							},
							{
								src: "/images/timflp/summer-04.jpg",
								alt: "Gäste laufen den Parkweg entlang, Bäume über dem Weg.",
								lift: 0.87,
							},
						],
					},
					{
						title: "August",
						date: "11.08.2026",
						meta: "Serie · Wasser",
						url: "https://www.instagram.com/timflp.archive/p/Db6tQ0kjBYf/",
						photos: [
							{
								src: "/images/timflp/august-01.jpg",
								alt: "Ein Wasserfall stürzt durch eine enge Felsschlucht.",
								lift: 0.89,
							},
							{
								src: "/images/timflp/august-02.jpg",
								alt: "Blick von oben auf den Steg, der sich durch die Klamm zieht.",
								lift: 0.88,
							},
							{
								src: "/images/timflp/august-03.jpg",
								alt: "Ein schmaler Wasserfall fällt die Felswand hinunter.",
								lift: 1.09,
							},
							{
								src: "/images/timflp/august-04.jpg",
								alt: "Maschendrahtzaun vor der Felswand über dem Bach.",
								lift: 0.8,
							},
						],
					},
					{
						title: "#weg",
						date: "12.08.2026",
						meta: "Serie · Berge",
						url: "https://www.instagram.com/timflp.archive/p/Db71luKDPm6/",
						photos: [
							{
								src: "/images/timflp/weg-01.jpg",
								alt: "Zwei Personen liegen auf einer Decke im Gras am See.",
								lift: 0.78,
							},
							{
								src: "/images/timflp/weg-02.jpg",
								alt: "Blick ins Tal, oben hängen Tannenzweige ins Bild.",
								lift: 0.74,
							},
							{
								src: "/images/timflp/weg-03.jpg",
								alt: "Der Weg führt am türkisen Bergsee entlang.",
								lift: 0.84,
							},
							{
								src: "/images/timflp/weg-05.jpg",
								alt: "Der See spiegelt die Berge, Wolken stehen über dem Grat.",
								lift: 0.71,
							},
						],
					},
				],
			},
		],
	},

	/** TODO: Adresse und Anfahrt ergänzen — auf dem Profil steht nur der Name der Location. */
	venue: {
		eyebrow: "Location",
		title: "Hafenbar Hettstedt",
		subtitle: "Ein Ort, alle Ausgaben.",
		body: "Jede bisherige Ausgabe von relapse lief in der Hafenbar — drinnen im Club und draußen auf dem Hof mit der Beach Stage.",
		handle: "@hafenbar_hettstedt",
		url: "https://www.instagram.com/hafenbar_hettstedt/",
		image: "/images/timflp/relapse-beach-01.jpg",
		imageAlt:
			"Der Hof der Hafenbar Hettstedt bei Nacht: Schornstein mit Rauch, Lichterketten und Publikum vor der Bühne.",
	},

	contact: {
		eyebrow: "Kontakt",
		title: "Booking, Presse oder einfach fragen.",
		body: "Am schnellsten geht es per DM auf Instagram. Für alles Längere gibt es die Mailadresse.",
	},

	footer: {
		/** The small print, and then one ruled line. The link columns that used to sit
		    between them repeated the navigation three feet below the navigation. */
		note: "Alle Fotos und Filme auf dieser Seite stammen von @timflp.archive und werden mit Nennung verwendet. Termine und Lineups können sich ändern.",
	},
} as const;

/**
 * The archive's shape, read off the data rather than declared next to it — so adding a
 * segment or a frame cannot drift from the type that renders it.
 */
export type ArchiveSegment = (typeof site.archive.segments)[number];
export type ArchiveWork = ArchiveSegment["works"][number];

/**
 * The sections of the home page, in the order they are laid out, and the four values each
 * of them writes into the metadata line along the bottom edge: where you are, what you are
 * looking at, one fact about it, and what kind of thing it is. It is the HUD of a camera.
 *
 * `id` matches the section's `id` attribute — which is also its anchor in `site.nav` — so a
 * section can look up its own entry. `start` is the opening panel and has no anchor.
 *
 * Six entries, down from eight: a page that counts itself out to "08" is telling the
 * visitor how far there is left to go, which is the one thing a slow page should not say.
 *
 * Counts are read off the arrays above rather than typed out, so they cannot go stale when
 * a photo or a work is added.
 */
/* Annotated rather than inferred: `segments` is a tuple of four differently shaped
   segments, so without this the union of their `works` tuples has nothing to collapse to
   and `flatMap` infers `unknown`. */
const archiveWorks: readonly ArchiveWork[] = site.archive.segments.flatMap(
	(segment): readonly ArchiveWork[] => segment.works,
);
const archiveWorkCount = archiveWorks.length;
const archiveFrameCount = archiveWorks.reduce((total, work) => total + work.photos.length, 0);

const sectionList = [
	{ id: "start", name: "relapse", detail: "Techno & Rap", type: "Eventreihe" },
	{ id: "vol4", name: "relapse vol.4", detail: "Datum folgt", type: "Nächste Ausgabe" },
	{
		id: "ausgaben",
		name: "Ausgaben",
		detail: `${site.editions.entries.length} Ausgaben`,
		type: "Reihe",
	},
	{
		id: "archiv",
		name: "Archiv",
		detail: `${archiveWorkCount} Arbeiten · ${archiveFrameCount} Fotos`,
		type: "@timflp.archive",
	},
	{ id: "location", name: "Hafenbar Hettstedt", detail: "Hettstedt", type: "Location" },
	{ id: "kontakt", name: "Kontakt", detail: site.instagram.handle, type: "Booking & Presse" },
] as const;

export type SectionId = (typeof sectionList)[number]["id"];

export type SectionMeta = {
	id: SectionId;
	/** The section's own number, e.g. "04" — set next to its heading. */
	number: string;
	/** The same number against the total, e.g. "04 / 06" — set in the metadata line. */
	index: string;
	name: string;
	detail: string;
	type: string;
};

export const sections: readonly SectionMeta[] = sectionList.map((section, i) => ({
	...section,
	number: String(i + 1).padStart(2, "0"),
	index: `${String(i + 1).padStart(2, "0")} / ${String(sectionList.length).padStart(2, "0")}`,
}));
