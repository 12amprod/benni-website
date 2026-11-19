import { createRouter } from "@tanstack/react-router";
import { routeTree } from "#/routeTree.gen";

export function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		// Every page change is a view transition: a short crossfade, timed in `src/styles.css`.
		// Browsers without the API simply change page, as before.
		defaultViewTransition: true,
	});
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
