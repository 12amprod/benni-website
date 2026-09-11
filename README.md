# benni-website

Static portfolio site. TanStack Start prerenders every route to HTML at build
time; there is no server at runtime. Output in `dist/client` is deployable to
any static host.

## Setup

Node is pinned by `.nvmrc` (24). pnpm is pinned by the `packageManager` field in
`package.json` and comes from corepack — enable it once, then every `pnpm` call uses
the pinned version automatically:

```sh
corepack enable        # once per machine (ships with Node)
pnpm install
pnpm dev
```

If `corepack` is missing, `npm install -g pnpm@12` works too.

## Commands

| Command          | What it does                                   |
| ---------------- | ---------------------------------------------- |
| `pnpm dev`       | Dev server on http://localhost:3000            |
| `pnpm build`     | Production build + prerender → `dist/client`   |
| `pnpm preview`   | Serve the production build locally             |
| `pnpm typecheck` | `tsc -b` over app + node configs               |
| `pnpm check`     | Biome lint + format check                      |
| `pnpm check:fix` | Auto-fix lint + format                         |
| `pnpm test`      | Vitest (jsdom + Testing Library)               |

Pre-commit (husky + lint-staged) runs Biome on staged files and a full typecheck.
CI (`.github/workflows/ci.yml`) runs typecheck, check, test and build.
