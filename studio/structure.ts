import { EyeClosedIcon } from "@sanity/icons/EyeClosed";
import { FolderIcon } from "@sanity/icons/Folder";
import { ImagesIcon } from "@sanity/icons/Images";
import type { StructureResolver } from "sanity/structure";
import { pageIds, pages, segmentIds, segments } from "./shared/archive-rules";

/**
 * The sidebar mirrors the site: one entry per page, and inside each one entry per kind of
 * work, newest first. A new work created from inside a list starts on that page and in
 * that segment, so the team never has to pick either twice.
 *
 * Hidden works stay in their lists (marked in the preview) and are also collected below,
 * so nothing that is kept off the site is ever out of sight in the Studio.
 */
export const structure: StructureResolver = (S) =>
	S.list()
		.title("Archiv")
		.items([
			...pageIds.map((page) =>
				S.listItem()
					.id(page)
					.title(pages[page].title)
					.icon(FolderIcon)
					.child(
						S.list()
							.title(pages[page].title)
							.items(
								segmentIds.map((segment) =>
									S.listItem()
										.id(`${page}-${segment}`)
										.title(segments[segment].title)
										.icon(ImagesIcon)
										.child(
											S.documentTypeList("archiveWork")
												.title(`${pages[page].title} · ${segments[segment].title}`)
												.filter('_type == "archiveWork" && page == $page && segment == $segment')
												.params({ page, segment })
												.defaultOrdering([{ field: "date", direction: "desc" }])
												.initialValueTemplates([
													S.initialValueTemplateItem("archiveWork-in-segment", { page, segment }),
												]),
										),
								),
							),
					),
			),
			S.divider(),
			S.listItem()
				.id("hidden")
				.title("Ausgeblendet")
				.icon(EyeClosedIcon)
				.child(
					S.documentTypeList("archiveWork")
						.title("Ausgeblendet")
						.filter('_type == "archiveWork" && hidden == true'),
				),
			S.documentTypeListItem("archiveWork").title("Alle Arbeiten"),
		]);
