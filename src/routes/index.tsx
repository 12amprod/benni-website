import { createFileRoute } from "@tanstack/react-router";
import { ArchiveSection } from "#/components/ArchiveSection";
import { ContactPanel } from "#/components/ContactPanel";
import { EditionsSection } from "#/components/EditionsSection";
import { ShowcasePanel } from "#/components/ShowcasePanel";
import { site } from "#/content/site";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [{ title: site.title }, { name: "description", content: site.description }],
	}),
	component: HomePage,
});

/**
 * Six plates, not eight: the wordmark, the next edition, every edition, the archive, the
 * room it happens in, and how to reach anyone. Each one is a single subject, and the
 * visitor arrives at the bottom having been asked to read four headings rather than eight.
 *
 * The full-bleed photographic panels and the ruled sections alternate on purpose — a page
 * of nothing but pictures has no rhythm, and neither does a page of nothing but rules.
 */
function HomePage() {
	return (
		<>
			<ShowcasePanel id="start" lead {...site.hero} />
			<ShowcasePanel id="vol4" {...site.next} />
			<EditionsSection />
			<ArchiveSection />
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
