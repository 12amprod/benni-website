import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "#/components/GalleryPage";
import { site } from "#/content/site";

export const Route = createFileRoute("/videos")({
	head: () => ({
		meta: [
			{ title: `${site.galleries.videos.title} – ${site.name}` },
			{ name: "description", content: site.description },
		],
	}),
	component: VideosPage,
});

function VideosPage() {
	return <GalleryPage id="videos" />;
}
