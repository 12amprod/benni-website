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
- `pnpm build` — pull the archive from Sanity, then build + prerender every route into `dist/client`
- `pnpm preview` — serve the built site locally, exactly as a host would
- `pnpm content:pull` — refresh the archive snapshot from Sanity without building
- `pnpm studio` — run the Sanity Studio locally (own deps: `pnpm --dir studio install` once)
- `pnpm seed` — copy the local archive into Sanity (dry run; `--write` to execute)

Verify every change with `pnpm typecheck && pnpm check`. A hook auto-formats each file you
edit, so never spend a turn on formatting. Another hook runs typecheck + lint when you finish
and hands the errors back — fix them, never disable or work around them.

## Generated files — never edit

- `src/routeTree.gen.ts` — written by the Start plugin whenever `pnpm dev` or `pnpm build`
  runs. Add or rename files in `src/routes/` and it updates itself. It is committed so that
  `pnpm typecheck` works on a fresh clone without a build first.
- `pnpm-lock.yaml` (and `studio/pnpm-lock.yaml`) — managed by pnpm. Use `pnpm add <pkg>`.
- `scripts/sanity.types.ts` — Sanity TypeGen output from the Studio schema and the queries in
  `scripts/`. Committed so typecheck works without the Studio installed. Regenerate with
  `pnpm --dir studio typegen` after changing the schema or a query.

## Structure & conventions

- `src/routes/` — file-based routes, one file per page. The filename *is* the URL:
  `impressum.tsx` → `/impressum`. See `.claude/rules/routing.md` before adding one.
- `src/routes/__root.tsx` — the document shell (`<html>`, `<head>`, global meta) **and** the
  site layout (header, `<main>`, footer). Everything on every page goes through here.
- `src/components/` — shared UI. PascalCase filename, named export, one component per file.
- `src/content/site.ts` — site metadata and copy. **All user-facing text lives here**, not
  inline in JSX, so that copy can be changed without touching components.
- `src/content/archive.ts` — every work the site renders; `galleries.ts` decides which gallery page
  (`/`, `/videos`, `/serien`, `/yung-shattered`, `/relapse`) shows which. Reads the Sanity snapshot if the
  build pulled one, otherwise `archive.local.ts`. Components import from here, never from
  either source directly.
- `studio/` — the Sanity Studio (the team's admin), its own package with its own deps.
  `studio/shared/` holds what Studio, build and site must agree on: the project ID and the
  archive rules (pages, segments, frames per series).
- `functions/` + `sanity.blueprint.ts` — code that runs on Sanity's servers (the Instagram
  import). Deployed with `npx sanity@latest blueprints deploy`, never on the site's host.
  Each function has its own `package.json`: the deploy bundles a function with Vite rooted at
  the nearest `node_modules`, and without its own that is the repo root — where the site's
  `vite.config.ts` (TanStack Start) takes over the bundle and the deploy fails with "no
  `handler` export found". Run `pnpm --dir functions/<name> install` before deploying.
- `scripts/pull-archive.ts` — the build-time bridge from Sanity to the site.
- `src/styles.css` — the Tailwind entry point and the design tokens (`@theme`). There is no
  `tailwind.config.js` in Tailwind v4; tokens are CSS variables in this file.
- `src/lib/motion.ts` — every movement the site makes in script: the view transitions
  (page change, the enlarged view), the scroll reveal, and whether to move at all. Timings and
  curves are tokens in `src/styles.css`; the bar is apple.com (`docs/design-system.md` §4).
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

## Data and the CMS

The archive is edited in **Sanity** (setup and team guide: `docs/cms.md`). It reaches the
site **at build time only**: `scripts/pull-archive.ts` runs before `vite build`, fetches the
published, visible works, computes every frame's 4:5 grid crops and full-size URL, and writes
`src/content/archive.sanity.json` (generated, gitignored). `archive.ts` reads that file if it
exists and falls back to `archive.local.ts` if not. While `projectId` in
`studio/shared/project.ts` is empty, every build — local, CI, host — skips the pull and uses
the local archive, exactly as the site looked before the CMS. Once it is set, every build
pulls; the dataset is publicly readable, so no token is needed anywhere.

Do not move the fetch into a route loader. TanStack runs loaders **in the browser** on
client-side navigation, so a visitor clicking from `/impressum` to `/` would query Sanity
live. Nothing on the live site talks to Sanity, and that stays true.

If Sanity is configured and the pull fails, the build fails on purpose — the host keeps the
last good deploy instead of silently shipping the local fallback.

`/admin` is a static redirect to the hosted Studio. There is no login, session or API route
on this site; authentication is Sanity's. Do not add a server, an API route or a database
without being asked.

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
