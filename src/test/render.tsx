import {
	createMemoryHistory,
	createRootRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";

/**
 * Renders `ui` inside a throwaway in-memory router so components that use
 * <Link> or router hooks work in unit tests. The router renders asynchronously,
 * so query with `findBy*` rather than `getBy*`.
 */
export function renderWithRouter(ui: ReactNode) {
	const rootRoute = createRootRoute({ component: () => ui });
	const router = createRouter({
		routeTree: rootRoute,
		history: createMemoryHistory({ initialEntries: ["/"] }),
	});
	return render(<RouterProvider router={router} />);
}
