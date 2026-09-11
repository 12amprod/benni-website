import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Separate from vite.config.ts on purpose: the Start plugin (SSR + prerender)
// has no business in a unit-test environment.
export default defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [react()],
	test: {
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.test.{ts,tsx}"],
	},
});
