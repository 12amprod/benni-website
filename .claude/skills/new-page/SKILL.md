---
name: new-page
description: Add a new page to the portfolio site — route file, metadata, navigation entry and verification. Use when asked to add, create or scaffold a page, route or section of the site.
---

Add the page described by: $ARGUMENTS

1. **Name the URL.** German, lowercase, hyphenated, no umlauts in the path itself
   (`/ueber-mich`, not `/über-mich`). Pick the file under `src/routes/` per
   `.claude/rules/routing.md`.

2. **Put the copy in `src/content/site.ts` first.** Add a section for the page with its
   title, description and body text. Real German copy — if the content is not known yet,
   write honest placeholder prose, never lorem ipsum, and never leave an empty page.

3. **Write the route file.** `createFileRoute` with a `head` that sets at least a `title`
   and a `description`, and a component that renders one `<section>` using the shared
   container (`mx-auto max-w-5xl px-6 py-24`). Pull every string from `site.ts`.

4. **Add it to the navigation** in the `nav` array in `src/content/site.ts`, unless the
   page is deliberately unlinked (a legal page reachable only from the footer, say).

5. **Extract components** into `src/components/` if the page grows past a screenful of
   markup. One component per file, named export, PascalCase.

6. **Verify, in this order:**
   - `pnpm typecheck && pnpm check`
   - `pnpm build` — confirm the new path appears in the `[prerender]` list in the output.
     If it does not, nothing links to it and it will not be published.
   - `pnpm dev`, then Playwright MCP: navigate to the new path, snapshot it, read the
     console. Check it at a phone width too.

7. **Report** the URL, what the page contains, and what you verified.
