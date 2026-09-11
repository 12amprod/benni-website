# benni-website

Static portfolio site. React 19, TanStack Start with file-based TanStack Router, Tailwind v4
(CSS-first, no config file), Biome, Vitest, pnpm.

**There is no backend and no server at runtime.** Every route is rendered to plain HTML at
build time and `dist/client` is the whole deployable site. Keep it that way unless asked
otherwise — it is the property that makes this site fast, cheap to host and impossible to
break at 3am.

## Commands

- `pnpm dev` — dev server on <http://localhost:3000>
- `pnpm typecheck` — `tsc -b`, no emit
- `pnpm check` — Biome lint + format + import order (read-only; `pnpm check:fix` writes)
- `pnpm test` — Vitest, single run
- `pnpm build` — build + prerender every route into `dist/client`
- `pnpm preview` — serve the built site locally, exactly as a host would

Verify every change with `pnpm typecheck && pnpm check`. A hook auto-formats each file you
edit, so never spend a turn on formatting. Another hook runs typecheck + lint when you finish
and hands the errors back — fix them, never disable or work around them.

## Generated files — never edit

- `src/routeTree.gen.ts` — written by the Start plugin whenever `pnpm dev` or `pnpm build`
  runs. Add or rename files in `src/routes/` and it updates itself. It is committed so that
  `pnpm typecheck` works on a fresh clone without a build first.
- `pnpm-lock.yaml` — managed by pnpm. Use `pnpm add <pkg>`.

## Structure & conventions

- `src/routes/` — file-based routes, one file per page. The filename *is* the URL:
  `impressum.tsx` → `/impressum`. See `.claude/rules/routing.md` before adding one.
- `src/routes/__root.tsx` — the document shell (`<html>`, `<head>`, global meta) **and** the
  site layout (header, `<main>`, footer). Everything on every page goes through here.
- `src/components/` — shared UI. PascalCase filename, named export, one component per file.
- `src/content/site.ts` — site metadata and copy. **All user-facing text lives here**, not
  inline in JSX, so that copy can be changed without touching components — and so a CMS can
  replace this one module later without a rewrite.
- `src/styles.css` — the Tailwind entry point and the design tokens (`@theme`). There is no
  `tailwind.config.js` in Tailwind v4; tokens are CSS variables in this file.
- `src/test/` — Vitest setup plus `renderWithRouter()`, which you need for any component
  that uses `<Link>` or a router hook.
- Import with the `#/*` alias (`#/components/SiteHeader`), never `../../components/...`.

## Before the site goes live

`site.url` in `src/content/site.ts` is empty. Fill it with the real origin once the domain
exists — that one value switches on the absolute `og:url` / `og:image` tags that link
previews need, and it is the `host` the sitemap wants (there is a commented block in
`vite.config.ts`). An `og.png` (1200×630) then belongs in `public/`. Until then the tags are
deliberately omitted rather than shipped pointing at a placeholder.

`src/routes/404.tsx` exists only to be prerendered to `dist/client/404.html`, which is the
file static hosts serve for unknown URLs. Leave its `outputPath` override in `vite.config.ts`
alone.

## Language

German is the product language. Every string a visitor reads is German. Code, comments,
commit messages and file names stay English. There is no i18n library — if a second language
is ever needed, add Paraglide rather than hand-rolling one.

## Styling

- Tailwind utility classes in JSX. Reach for a token in `src/styles.css` before inventing a
  one-off value, and add a new token there rather than hardcoding a hex or a pixel font size.
- Mobile first. Every page must work at 375px wide. Test narrow before wide.
- Semantic HTML carries the accessibility: real `<h1>`/`<nav>`/`<main>`/`<footer>`, one `<h1>`
  per page, `alt` on every image, visible focus states. Do not add ARIA to paper over a
  `<div>` that should have been a `<button>`.

## Data and the future CMS

Route loaders run **at build time**, not in the browser. That is where a CMS fetch belongs when
one is added — the content ends up baked into the HTML and the site stays static. Do not add
client-side fetching on first paint, and do not add a server, an API route or a database
without being asked. Hardcoded content in `src/content/site.ts` is the right answer until
there is a reason for more.

## Adding dependencies

The stack already covers routing, styling, testing and formatting. Before adding a package,
check whether Tailwind, the router or plain CSS already does it. Animations, icons and date
formatting are the usual honest exceptions. Never add a UI framework alongside Tailwind.

## Verify in the browser

For anything visual, look at it before declaring it done: `pnpm dev`, then Playwright MCP
(`browser_navigate` → `browser_snapshot` → `browser_console_messages`). Report what you
actually saw. If you could not check something, say so rather than implying you did.

Before shipping a visual change, also run `pnpm build && pnpm preview` once. The dev server and
the prerendered output can differ, and the prerendered output is what visitors get.

## Git

- `main` is the default branch. Conventional commits (`feat:`, `fix:`, `chore:`, `style:`).
- Commit in small, working steps with a message that says *why*, not *what*.
- Never commit secrets, API keys or `.env` files.
- `pnpm build` output (`dist/`) is generated and gitignored — never commit it.
- A pre-commit hook runs Biome and a full typecheck on staged files. If it fails, fix the
  code. Never use `--no-verify`.
