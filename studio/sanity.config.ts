import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { importFromInstagram } from "./actions/import-from-instagram";
import { schemaTypes } from "./schemaTypes";
import { dataset, projectId } from "./shared/project";
import { structure } from "./structure";

if (!projectId) {
	throw new Error(
		"studio/shared/project.ts: projectId ist leer. Erst das Sanity-Projekt anlegen (siehe docs/cms.md).",
	);
}

export default defineConfig({
	name: "default",
	title: "RELAPSE Archiv",
	projectId,
	dataset,

	/**
	 * Email and password as the front door.
	 *
	 * A plain array replaces Sanity's default list of providers, and `redirectOnSingle`
	 * sends a logged-out visitor straight to Sanity's email-and-password form instead of a
	 * screen asking how to log in.
	 *
	 * This chooses the door; it does not lock the others. Sanity's login page still links
	 * to "Other login options" (Google, GitHub, SSO), and enforcing one method is an
	 * Enterprise SSO feature. What actually keeps people out is project membership: only
	 * accounts invited in Sanity Manage can read drafts or write anything, whichever way
	 * they logged in. Passwords are stored and checked by Sanity, never by this repository.
	 */
	auth: {
		redirectOnSingle: true,
		providers: [
			{
				name: "sanity",
				title: "E-Mail und Passwort",
				url: "https://api.sanity.io/v1/auth/login/sanity",
			},
		],
	},

	plugins: [structureTool({ structure, title: "Archiv" })],

	schema: {
		types: schemaTypes,
		templates: (prev) => [
			...prev,
			{
				id: "archiveWork-in-segment",
				title: "Arbeit in diesem Bereich",
				schemaType: "archiveWork",
				parameters: [
					{ name: "page", type: "string" },
					{ name: "segment", type: "string" },
				],
				value: (params: { page: string; segment: string }) => ({
					page: params.page,
					segment: params.segment,
				}),
			},
		],
	},

	document: {
		actions: (prev, context) =>
			context.schemaType === "archiveWork" ? [...prev, importFromInstagram] : prev,
	},
});
