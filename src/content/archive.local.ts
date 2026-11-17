/**
 * The archive as it stood before the CMS: every work photographed or filmed by
 * @timflp.archive, read off his profile on 2026-09-19, with the frames served from
 * `public/images/timflp`.
 *
 * It is what the site builds from whenever Sanity is not connected — a fresh clone, CI
 * without credentials, or an afternoon offline — and it is what `scripts/seed-sanity.ts`
 * uploads to give the team a starting point that matches the live page. Once the team
 * edits in the Studio, Sanity is the source of truth and this file is the fallback.
 *
 * These frames are at most 1200px and have no CDN behind them, so `full` is the same file
 * as `src` and there is no `srcSet` — the fallback looks right, Sanity makes it sharp.
 */
import type { ArchiveWorkSource } from "./archive-source.ts";

export const localWorks: readonly ArchiveWorkSource[] = [
	{
		page: "tim",
		segment: "events",
		title: "bone stew im RATS",
		date: "2026-04-18",
		meta: "Punk · Live",
		url: "https://www.instagram.com/timflp.archive/p/DXSBxu6DNPS/",
		photos: [
			{
				src: "/images/timflp/bone-stew-01.jpg",
				full: "/images/timflp/bone-stew-01.jpg",
				alt: "Zwei Gitarristen auf der kleinen Bühne im roten und grünen Scheinwerferlicht.",
			},
			{
				src: "/images/timflp/bone-stew-02.jpg",
				full: "/images/timflp/bone-stew-02.jpg",
				alt: "Blick von der Tanzfläche auf die Bühne: eine Person im Skelett-Shirt geht in die Knie.",
			},
			{
				src: "/images/timflp/bone-stew-03.jpg",
				full: "/images/timflp/bone-stew-03.jpg",
				alt: "Die Running Order des Abends als Ausdruck an der Wand, mit Totenköpfen bedruckt.",
			},
			{
				src: "/images/timflp/bone-stew-04.jpg",
				full: "/images/timflp/bone-stew-04.jpg",
				alt: "Weitwinkel auf die Bühne unter dem RATS-Schriftzug, die Band spielt im blauen Licht.",
			},
			{
				src: "/images/timflp/bone-stew-05.jpg",
				full: "/images/timflp/bone-stew-05.jpg",
				alt: "Schablonengraffiti eines Skaters an einer Betonwand, im Fischaugenblick.",
			},
			{
				src: "/images/timflp/bone-stew-07.jpg",
				full: "/images/timflp/bone-stew-07.jpg",
				alt: "Eine Person singt ins Mikrofon im violetten Licht, dahinter das Schlagzeug.",
			},
			{
				src: "/images/timflp/bone-stew-08.jpg",
				full: "/images/timflp/bone-stew-08.jpg",
				alt: "Die Band unter dem RATS-Schriftzug, Bass und Gitarre nebeneinander am Bühnenrand.",
			},
			{
				src: "/images/timflp/bone-stew-09.jpg",
				full: "/images/timflp/bone-stew-09.jpg",
				alt: "Rotes Pentagramm und Schriftzüge an der Wand neben der Bühne.",
			},
		],
	},
	{
		page: "tim",
		segment: "events",
		title: "Berggrenzlauf",
		date: "2026-06-07",
		meta: "Lauf · Schwarzweiß",
		url: "https://www.instagram.com/timflp.archive/p/DZSmw2rjO1o/",
		photos: [
			{
				src: "/images/timflp/berggrenzlauf-01.jpg",
				full: "/images/timflp/berggrenzlauf-01.jpg",
				alt: "Rückenansicht eines Läufers, auf dem Trikot steht „Running against Rassismus“.",
			},
			{
				src: "/images/timflp/berggrenzlauf-02.jpg",
				full: "/images/timflp/berggrenzlauf-02.jpg",
				alt: "Drei Personen mit Medaillen nach dem Ziel, Schwarzweiß.",
			},
			{
				src: "/images/timflp/berggrenzlauf-03.jpg",
				full: "/images/timflp/berggrenzlauf-03.jpg",
				alt: "Das Läuferfeld sammelt sich unter dem Zielbogen.",
			},
			{
				src: "/images/timflp/berggrenzlauf-07.jpg",
				full: "/images/timflp/berggrenzlauf-07.jpg",
				alt: "„7. Juni“ an eine alte Mauer gemalt.",
			},
		],
	},
	{
		page: "tim",
		segment: "events",
		title: "bone stew am Petrikirchplatz",
		date: "2026-06-14",
		meta: "Open Air · Live",
		url: "https://www.instagram.com/timflp.archive/p/DZlDuSwDMlG/",
		photos: [
			{
				src: "/images/timflp/petrikirchplatzfest-01.jpg",
				full: "/images/timflp/petrikirchplatzfest-01.jpg",
				alt: "bone stew spielt vor dem Portal der Petrikirche.",
			},
			{
				src: "/images/timflp/petrikirchplatzfest-02.jpg",
				full: "/images/timflp/petrikirchplatzfest-02.jpg",
				alt: "Blick über das Schlagzeug auf das Publikum und die Häuser am Platz.",
			},
			{
				src: "/images/timflp/petrikirchplatzfest-03.jpg",
				full: "/images/timflp/petrikirchplatzfest-03.jpg",
				alt: "Fischaugenblick auf den Gitarristen vor dem Kirchenbogen.",
			},
			{
				src: "/images/timflp/petrikirchplatzfest-04.jpg",
				full: "/images/timflp/petrikirchplatzfest-04.jpg",
				alt: "Zwei Gitarristen vor dem Kirchenportal, dazwischen ein Mikrofonständer.",
			},
			{
				src: "/images/timflp/petrikirchplatzfest-05.jpg",
				full: "/images/timflp/petrikirchplatzfest-05.jpg",
				alt: "Der Platz von der Bühne aus: Publikum, Wimpelketten und Fachwerkhäuser.",
			},
			{
				src: "/images/timflp/petrikirchplatzfest-06.jpg",
				full: "/images/timflp/petrikirchplatzfest-06.jpg",
				alt: "Eine Person headbangt am Mikrofon, daneben ein Skelett als Bühnendeko.",
			},
			{
				src: "/images/timflp/petrikirchplatzfest-07.jpg",
				full: "/images/timflp/petrikirchplatzfest-07.jpg",
				alt: "Gitarrist neben dem Rippenbogen, der über der Bühne hängt.",
			},
			{
				src: "/images/timflp/petrikirchplatzfest-08.jpg",
				full: "/images/timflp/petrikirchplatzfest-08.jpg",
				alt: "Schlagzeug von oben, die Becken füllen den Vordergrund.",
			},
		],
	},
	{
		page: "tim",
		segment: "events",
		title: "don’t think about it",
		date: "2026-07-06",
		meta: "Hauskonzert",
		url: "https://www.instagram.com/timflp.archive/p/DadiH3OjIH_/",
		photos: [
			{
				src: "/images/timflp/dont-think-01.jpg",
				full: "/images/timflp/dont-think-01.jpg",
				alt: "Eine Wand voller Konzertposter über der Anlage.",
			},
			{
				src: "/images/timflp/dont-think-02.jpg",
				full: "/images/timflp/dont-think-02.jpg",
				alt: "Band im Wohnzimmer, das Publikum steht einen Meter vor den Boxen.",
			},
			{
				src: "/images/timflp/dont-think-03.jpg",
				full: "/images/timflp/dont-think-03.jpg",
				alt: "Eine Person spielt Gitarre im Zimmer, dahinter das Schlagzeug.",
			},
			{
				src: "/images/timflp/dont-think-04.jpg",
				full: "/images/timflp/dont-think-04.jpg",
				alt: "Eine Person singt und spielt Bass in einem hell gestrichenen Zimmer.",
			},
		],
	},
	{
		page: "relapse",
		segment: "events",
		title: "relapse beach",
		date: "2026-07-26",
		meta: "13 Jahre Hafenbar · Open Air",
		url: "https://www.instagram.com/timflp.archive/p/DbQ-m5eDG00/",
		photos: [
			{
				src: "/images/timflp/relapse-beach-01.jpg",
				full: "/images/timflp/relapse-beach-01.jpg",
				alt: "Der Hof der Hafenbar bei Nacht: Lichterketten über der Menge, Rauch über dem Schornstein.",
			},
			{
				src: "/images/timflp/relapse-beach-02.jpg",
				full: "/images/timflp/relapse-beach-02.jpg",
				alt: "Volle Tanzfläche unter Lichterketten, grünes Scheinwerferlicht über den Köpfen.",
			},
			{
				src: "/images/timflp/relapse-beach-03.jpg",
				full: "/images/timflp/relapse-beach-03.jpg",
				alt: "Fischaugenblick über das DJ-Pult auf die Menge.",
			},
			{
				src: "/images/timflp/relapse-beach-04.jpg",
				full: "/images/timflp/relapse-beach-04.jpg",
				alt: "Grelles blauweißes Bühnenlicht strahlt über die Menge.",
			},
			{
				src: "/images/timflp/relapse-beach-05.jpg",
				full: "/images/timflp/relapse-beach-05.jpg",
				alt: "Sonnenschirm und volle Terrasse der Hafenbar bei Nacht.",
			},
			{
				src: "/images/timflp/relapse-beach-06.jpg",
				full: "/images/timflp/relapse-beach-06.jpg",
				alt: "Das Publikum hält Handytaschenlampen in die Luft.",
			},
			{
				src: "/images/timflp/relapse-beach-08.jpg",
				full: "/images/timflp/relapse-beach-08.jpg",
				alt: "Eine Person am Mikrofon im grünen Licht, daneben ein Gitarrist.",
			},
			{
				src: "/images/timflp/relapse-beach-09.jpg",
				full: "/images/timflp/relapse-beach-09.jpg",
				alt: "Zwei Gäste von hinten, eine Hand mit Feuerzeug in der Luft.",
			},
		],
	},
	{
		page: "tim",
		segment: "video",
		title: "CITY STORIES TOUR — Leipzig",
		date: "2026-03-20",
		meta: "@golagianni · Tourfilm",
		url: "https://www.instagram.com/timflp.archive/reel/DWHKucSjCkL/",
		photos: [
			{
				src: "/images/timflp/city-stories-cover.jpg",
				full: "/images/timflp/city-stories-cover.jpg",
				alt: "Standbild aus dem Tourfilm: eine Gestalt vor der blau ausgeleuchteten Bühne.",
			},
		],
	},
	{
		page: "relapse",
		segment: "video",
		title: "relapse vol.4 — Teaser",
		date: "2026-05-04",
		meta: "@relapse.vol4 · Teaser",
		url: "https://www.instagram.com/relapse.vol4/reel/DX6hKDysPw6/",
		photos: [
			{
				src: "/images/timflp/relapse-teaser-cover.jpg",
				full: "/images/timflp/relapse-teaser-cover.jpg",
				alt: "Standbild aus dem Teaser: eine Silhouette vor dem Sonnenuntergang über dem Wasser.",
			},
		],
	},
	{
		page: "yung-shattered",
		segment: "video",
		title: "NARCOTIC — Track 1, Intro",
		date: "2026-05-18",
		meta: "@yung.shattered · Videoclip",
		url: "https://www.instagram.com/yung.shattered/reel/DYe_T_XslN4/",
		photos: [
			{
				src: "/images/timflp/narcotic-intro-cover.jpg",
				full: "/images/timflp/narcotic-intro-cover.jpg",
				alt: "Standbild aus dem Clip: eine Person vor dem NARCOTIC-Banner im winterlichen Wald.",
			},
		],
	},
	{
		page: "yung-shattered",
		segment: "video",
		title: "NARCOTIC — Track 2, keine Luft",
		date: "2026-05-21",
		meta: "@yung.shattered · Videoclip",
		url: "https://www.instagram.com/yung.shattered/reel/DYmyWPCom7I/",
		photos: [
			{
				src: "/images/timflp/narcotic-keine-luft-cover.jpg",
				full: "/images/timflp/narcotic-keine-luft-cover.jpg",
				alt: "Standbild aus dem Clip: Hände vor einer Lampe im Dunkeln, die Bewegung verwischt.",
			},
		],
	},
	{
		page: "yung-shattered",
		segment: "video",
		title: "CTE Remix",
		date: "2026-08-27",
		meta: "prod. @lost2n1ght · Videoclip",
		url: "https://www.instagram.com/timflp.archive/reel/DcjXyQkMZib/",
		photos: [
			{
				src: "/images/timflp/cte-remix-cover.jpg",
				full: "/images/timflp/cte-remix-cover.jpg",
				alt: "Standbild aus dem Clip: eine Gestalt im blauen Licht, die Bewegung verwischt.",
			},
		],
	},
	{
		page: "yung-shattered",
		segment: "video",
		title: "TAUB — Musikvideo",
		date: "2026-09-04",
		meta: "Musikvideo · Release 11.09.",
		url: "https://www.instagram.com/timflp.archive/reel/Dc3z6dlsxI4/",
		photos: [
			{
				src: "/images/timflp/taub-cover.jpg",
				full: "/images/timflp/taub-cover.jpg",
				alt: "Standbild aus dem Musikvideo: eine Person zeigt über den Bergsee.",
			},
		],
	},
	{
		page: "yung-shattered",
		segment: "releases",
		title: "NARCOTIC — Shooting",
		date: "2026-04-17",
		meta: "Langzeitbelichtung",
		url: "https://www.instagram.com/timflp.archive/p/DXPsacDDGZA/",
		photos: [
			{
				src: "/images/timflp/narcotic-shoot-01.jpg",
				full: "/images/timflp/narcotic-shoot-01.jpg",
				alt: "Langzeitbelichtetes Porträt, die Bewegung verwischt das Gesicht.",
			},
		],
	},
	{
		page: "yung-shattered",
		segment: "releases",
		title: "NARCOTIC EP — Cover",
		date: "2026-06-05",
		meta: "@yung.shattered × @af.12am",
		url: "https://www.instagram.com/timflp.archive/p/DZMkYX5Mu2l/",
		photos: [
			{
				src: "/images/timflp/narcotic-cover-01.jpg",
				full: "/images/timflp/narcotic-cover-01.jpg",
				alt: "Das Cover der NARCOTIC EP: ein Banner mit dem Schriftzug zwischen Bäumen.",
			},
		],
	},
	{
		page: "yung-shattered",
		segment: "releases",
		title: "ALTE MUSTER — Cover",
		date: "2026-06-18",
		meta: "@yung.shattered · Single",
		url: "https://www.instagram.com/timflp.archive/p/DZuLWJAs9pj/",
		photos: [
			{
				src: "/images/timflp/alte-muster-cover-01.jpg",
				full: "/images/timflp/alte-muster-cover-01.jpg",
				alt: "Das Cover der Single ALTE MUSTER, grün eingefärbtes Standbild mit Schriftzug.",
			},
		],
	},
	{
		page: "tim",
		segment: "frei",
		title: "weiß",
		date: "2026-02-28",
		meta: "Serie · Winter",
		url: "https://www.instagram.com/timflp.archive/p/DVTgcH1jPOi/",
		photos: [
			{
				src: "/images/timflp/winter-01.jpg",
				full: "/images/timflp/winter-01.jpg",
				alt: "Eine Hand hält einen brennenden Strauß weißer Rosen.",
			},
			{
				src: "/images/timflp/winter-02.jpg",
				full: "/images/timflp/winter-02.jpg",
				alt: "Weiße Rosen auf einer Motorhaube, dahinter ein Bauwagen auf dem Feld.",
			},
			{
				src: "/images/timflp/winter-04.jpg",
				full: "/images/timflp/winter-04.jpg",
				alt: "Eine Person steht an der offenen Autotür am Feldweg.",
			},
			{
				src: "/images/timflp/winter-07.jpg",
				full: "/images/timflp/winter-07.jpg",
				alt: "Der brennende Rosenstrauß vor einer Betonwand.",
			},
		],
	},
	{
		page: "tim",
		segment: "frei",
		title: "25 °C +",
		date: "2026-05-29",
		meta: "Serie · Sommer",
		url: "https://www.instagram.com/timflp.archive/p/DY7Yet2DAAc/",
		photos: [
			{
				src: "/images/timflp/summer-01.jpg",
				full: "/images/timflp/summer-01.jpg",
				alt: "Fußball auf dem Weg im Park, der Ball rollt ins Bild.",
			},
			{
				src: "/images/timflp/summer-02.jpg",
				full: "/images/timflp/summer-02.jpg",
				alt: "Grill mit Fleisch und Halloumi, von oben fotografiert.",
			},
			{
				src: "/images/timflp/summer-03.jpg",
				full: "/images/timflp/summer-03.jpg",
				alt: "Eine Person im weißen Shirt hält einen Becher in die Kamera.",
			},
			{
				src: "/images/timflp/summer-04.jpg",
				full: "/images/timflp/summer-04.jpg",
				alt: "Gäste laufen den Parkweg entlang, Bäume über dem Weg.",
			},
		],
	},
	{
		page: "tim",
		segment: "frei",
		title: "August",
		date: "2026-08-11",
		meta: "Serie · Wasser",
		url: "https://www.instagram.com/timflp.archive/p/Db6tQ0kjBYf/",
		photos: [
			{
				src: "/images/timflp/august-01.jpg",
				full: "/images/timflp/august-01.jpg",
				alt: "Ein Wasserfall stürzt durch eine enge Felsschlucht.",
			},
			{
				src: "/images/timflp/august-02.jpg",
				full: "/images/timflp/august-02.jpg",
				alt: "Blick von oben auf den Steg, der sich durch die Klamm zieht.",
			},
			{
				src: "/images/timflp/august-03.jpg",
				full: "/images/timflp/august-03.jpg",
				alt: "Ein schmaler Wasserfall fällt die Felswand hinunter.",
			},
			{
				src: "/images/timflp/august-04.jpg",
				full: "/images/timflp/august-04.jpg",
				alt: "Maschendrahtzaun vor der Felswand über dem Bach.",
			},
		],
	},
	{
		page: "tim",
		segment: "frei",
		title: "#weg",
		date: "2026-08-12",
		meta: "Serie · Berge",
		url: "https://www.instagram.com/timflp.archive/p/Db71luKDPm6/",
		photos: [
			{
				src: "/images/timflp/weg-01.jpg",
				full: "/images/timflp/weg-01.jpg",
				alt: "Zwei Personen liegen auf einer Decke im Gras am See.",
			},
			{
				src: "/images/timflp/weg-02.jpg",
				full: "/images/timflp/weg-02.jpg",
				alt: "Blick ins Tal, oben hängen Tannenzweige ins Bild.",
			},
			{
				src: "/images/timflp/weg-03.jpg",
				full: "/images/timflp/weg-03.jpg",
				alt: "Der Weg führt am türkisen Bergsee entlang.",
			},
			{
				src: "/images/timflp/weg-05.jpg",
				full: "/images/timflp/weg-05.jpg",
				alt: "Der See spiegelt die Berge, Wolken stehen über dem Grat.",
			},
		],
	},
];
