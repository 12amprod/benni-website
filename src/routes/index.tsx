import { createFileRoute } from "@tanstack/react-router";
import { ContactPanel } from "#/components/ContactPanel";
import { FeaturedTiles } from "#/components/FeaturedTiles";
import { GalleryGrid } from "#/components/GalleryGrid";
import { LineupGrid } from "#/components/LineupGrid";
import { ScheduleList } from "#/components/ScheduleList";
import { ShowcasePanel } from "#/components/ShowcasePanel";
import { Ticker } from "#/components/Ticker";
import { site } from "#/content/site";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [{ title: site.title }, { name: "description", content: site.description }],
	}),
	component: HomePage,
});

/**
 * Apple stacks one full-bleed panel per thing it wants you to see, then a tile row, then
 * the detail sections. Same order here: the series, the next edition, the last two, who
 * played, the archive, the dates, the place, how to reach them.
 */
function HomePage() {
	return (
		<>
			<ShowcasePanel lead brand {...site.hero} />
			<ShowcasePanel id="vol4" brand {...site.next} />
			<Ticker />
			<FeaturedTiles />
			<LineupGrid />
			<GalleryGrid />
			<ScheduleList />
			<ShowcasePanel
				id="location"
				eyebrow={site.venue.eyebrow}
				title={site.venue.title}
				subtitle={site.venue.subtitle}
				body={site.venue.body}
				links={[{ label: site.venue.handle, href: site.venue.url }]}
				image={site.venue.image}
				imageAlt={site.venue.imageAlt}
			/>
			<ContactPanel />
		</>
	);
}
