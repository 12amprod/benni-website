import { EditionDiptych } from "#/components/EditionDiptych";
import { EditionTable } from "#/components/EditionTable";
import { SectionHead } from "#/components/SectionHead";
import { site } from "#/content/site";
import { metaAttrs } from "#/lib/section-meta";

/**
 * Every edition of relapse, in one section.
 *
 * This used to be two — "Rückblick", which showed the last two, and "Termine", which
 * listed all five. Two headings, two numbers and two entries in the navigation, for one
 * subject the visitor thinks of as one thing. The two most recent still get a photograph
 * each, because they are the ones worth looking at; the rest follow as a table.
 */
export function EditionsSection() {
	const { title, body } = site.editions;

	return (
		<section
			id="ausgaben"
			{...metaAttrs("ausgaben")}
			className="border-hairline border-t bg-canvas"
		>
			<div className="mx-auto max-w-6xl px-5 pt-28 pb-16 sm:px-6 sm:pt-40 sm:pb-20">
				<SectionHead id="ausgaben" title={title} body={body} />
			</div>

			<EditionDiptych />

			<div className="mx-auto max-w-6xl px-5 pt-16 pb-28 sm:px-6 sm:pt-20 sm:pb-40">
				<EditionTable />
			</div>
		</section>
	);
}
