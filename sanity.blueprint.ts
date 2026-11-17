import { defineBlueprint, defineDocumentFunction } from "@sanity/blueprints";

/**
 * Sanity's side of this repository: the server-side code that runs on Sanity's
 * infrastructure, declared here and deployed with `npx sanity@latest blueprints deploy`.
 *
 * Nothing in here runs on the website's host. The site stays static files.
 *
 * A rebuild-on-publish hook belongs here too once the site has a host — see docs/cms.md.
 * It is not declared yet because its only parameter is the host's deploy-hook URL.
 */
export default defineBlueprint({
	resources: [
		defineDocumentFunction({
			name: "instagram-import",
			displayName: "Instagram-Import",
			// A carousel is up to 20 pictures, each downloaded and uploaded in turn.
			timeout: 120,
			event: {
				on: ["create", "update"],
				// Drafts only, and only while a request is waiting. The function's first write
				// sets the status to `running`, which stops it matching its own changes.
				filter:
					'_type == "archiveWork" && _id in path("drafts.**") && instagramImport.status == "requested"',
				projection: "{_id, url, date}",
				includeDrafts: true,
			},
		}),
	],
});
