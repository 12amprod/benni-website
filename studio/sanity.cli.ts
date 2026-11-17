import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./shared/project";

export default defineCliConfig({
	api: { projectId, dataset },
	deployment: {
		// The hosted Studio at https://relapse-archiv.sanity.studio — `/admin` forwards there.
		appId: "deolsqbh9ms1b8t045p1xztv",
		// Studio updates arrive with Sanity's own releases instead of waiting for a
		// redeploy from this repository. The Studio is an editing tool, not the site.
		autoUpdates: true,
	},
	// Generates types for the website's build-time query from this schema, so a renamed
	// field fails `pnpm typecheck` instead of failing silently in production.
	typegen: {
		path: "../scripts/**/*.ts",
		schema: "schema.json",
		generates: "../scripts/sanity.types.ts",
	},
});
