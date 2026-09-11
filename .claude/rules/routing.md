---
paths:
  - "src/routes/**"
---

# Route file conventions

Routes are file-based: the path under `src/routes/` becomes the URL. `about.tsx` → `/about`,
`projekte/index.tsx` → `/projekte`, `projekte/$slug.tsx` → `/projekte/:slug`. Prefer a flat
`name.tsx` for a single page; switch to a directory once a segment has more than one child.

A page route looks like this:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { site } from "#/content/site";

export const Route = createFileRoute("/ueber-mich")({
  head: () => ({
    meta: [
      { title: `Über mich – ${site.name}` },
      { name: "description", content: "…" },
    ],
  }),
  component: UeberMichPage,
});

function UeberMichPage() {
  return <section className="mx-auto max-w-5xl px-6 py-24">…</section>;
}
```

Rules:

- **Every route sets its own `head`** with at least a `title`. The root route supplies the
  defaults; a page that does not override them is invisible to search engines and to anyone
  sharing the link. A page excluded from search needs `{ name: "robots", content: "noindex" }`.
- **The route file owns the page, not the chrome.** Header, footer and `<html>` live in
  `__root.tsx`. A route renders one `<section>`-level tree and nothing above it.
- **Keep route files thin.** More than roughly 80 lines of markup means the page wants
  components in `src/components/`, composed from the route file.
- **Text comes from `src/content/site.ts`**, not string literals in the route.
- **Add the page to the navigation** in `src/content/site.ts` if a visitor should be able to
  reach it. A route no one links to is only prerendered because link crawling finds it —
  an orphan page silently disappears from the build.
- **Data belongs in `loader`**, which runs at build time during prerender. Never fetch in a
  `useEffect` for content that should be in the HTML.
- After adding or renaming a route file, run `pnpm build` (or leave `pnpm dev` running) to
  regenerate `src/routeTree.gen.ts`, then `pnpm typecheck`. Never edit that file by hand.
- New routes are prerendered automatically — no config to update. Confirm it in the build
  output, which lists every prerendered path.
