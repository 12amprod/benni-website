import "@testing-library/jest-dom/vitest";

// jsdom does not implement scrolling; the router calls it on navigation and would
// otherwise log "Not implemented: Window's scrollTo() method" on every test.
Object.defineProperty(window, "scrollTo", { value: () => {}, writable: true });
