import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "#/components/GalleryPage";
import { site } from "#/content/site";

export const Route = createFileRoute("/relapse")({
	head: () => ({
		meta: [
			{ title: site.galleries.relapse.documentTitle },
			{ name: "description", content: site.galleries.relapse.intro },
		],
	}),
	component: RelapsePage,
});

function RelapsePage() {
	return <GalleryPage id="relapse" />;
}
