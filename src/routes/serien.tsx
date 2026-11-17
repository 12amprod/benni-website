import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "#/components/GalleryPage";
import { site } from "#/content/site";

export const Route = createFileRoute("/serien")({
	head: () => ({
		meta: [
			{ title: `${site.galleries.serien.title} – ${site.name}` },
			{ name: "description", content: site.description },
		],
	}),
	component: SerienPage,
});

function SerienPage() {
	return <GalleryPage id="serien" />;
}
