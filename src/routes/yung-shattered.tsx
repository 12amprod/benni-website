import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "#/components/GalleryPage";
import { site } from "#/content/site";

export const Route = createFileRoute("/yung-shattered")({
	head: () => ({
		meta: [
			{ title: `${site.galleries["yung-shattered"].title} – ${site.name}` },
			{ name: "description", content: site.description },
		],
	}),
	component: YungShatteredPage,
});

function YungShatteredPage() {
	return <GalleryPage id="yung-shattered" />;
}
