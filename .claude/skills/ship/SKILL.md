---
name: ship
description: Run the full check suite, verify the built site in a browser, then commit and push. Use when asked to ship, publish, deploy or push the current work.
---

Take the current working tree from "seems done" to "pushed", stopping at the first real
failure rather than pushing something broken.

1. **What changed.** `git status` and `git diff`. If the tree is clean, say so and stop.

2. **Checks.** Run in this order and fix what they report:
   - `pnpm typecheck`
   - `pnpm check` (use `pnpm check:fix` for anything auto-fixable)
   - `pnpm test`

3. **Build.** `pnpm build`. Read the `[prerender]` list in the output and confirm every page
   that should exist is there. A missing page means nothing links to it.

4. **Look at it.** `pnpm preview`, then Playwright MCP against the preview URL: navigate to
   each changed page, snapshot, read the console. Check one page at 375px wide. The preview
   server serves the real prerendered output, which is what visitors get — the dev server is
   not a substitute here. Stop the preview server by port when done.

5. **Commit.** Stage the relevant files — never `dist/`, never `.env*`. One conventional
   commit (`feat:`, `fix:`, `chore:`, `style:`) whose subject says why the change exists.
   Let the pre-commit hook run; if it fails, fix the code, never `--no-verify`.

6. **Push** to `main`.

7. **Report** the commit subject, the pages verified and anything you could not check.

If a check fails and the fix is not obvious, stop and explain. Do not push a red build.
