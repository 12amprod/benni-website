import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "#/components/GalleryPage";
import { site } from "#/content/site";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [{ title: site.title }, { name: "description", content: site.description }],
	}),
	component: EventsPage,
});

/** The portfolio opens on its events: the first thing anyone sees is the work. */
function EventsPage() {
	return <GalleryPage id="events" />;
}
