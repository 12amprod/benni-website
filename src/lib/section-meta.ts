import { type SectionId, type SectionMeta, sections } from "#/content/site";

const byId = new Map<string, SectionMeta>(sections.map((section) => [section.id, section]));

/** The entry a section owns in `site.sections`. Ids come from the same list, so this hits. */
export function sectionMeta(id: SectionId): SectionMeta {
	const meta = byId.get(id);
	if (!meta) throw new Error(`Unknown section id: ${id}`);
	return meta;
}

/**
 * The attributes the metadata line reads off a section as it passes the top of the
 * viewport. Written into the markup at build time rather than looked up in JavaScript, so
 * the values are in the prerendered HTML and the line works from the first frame.
 */
export function metaAttrs(id: SectionId): Record<string, string> {
	const meta = sectionMeta(id);
	return {
		"data-meta-index": meta.index,
		"data-meta-name": meta.name,
		"data-meta-detail": meta.detail,
		"data-meta-type": meta.type,
	};
}
