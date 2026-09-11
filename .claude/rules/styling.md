---
paths:
  - "src/**/*.css"
  - "src/components/**"
---

# Styling conventions

Tailwind v4 is CSS-first: there is no `tailwind.config.js`. Everything configurable lives in
`src/styles.css` inside `@theme`, as CSS custom properties.

- **Add a token, don't hardcode.** A new colour, font or spacing step goes into `@theme` in
  `src/styles.css` and is then used as a utility class. Arbitrary values (`text-[#ff0000]`,
  `mt-[37px]`) are a smell — one or two are fine, a pattern of them means a token is missing.
- **Utilities in JSX, not a parallel stylesheet.** Write `className="mt-6 text-lg"` rather
  than inventing a CSS class. Only reach for plain CSS in `@layer base` for genuinely global
  things (element defaults, `@font-face`, reduced-motion handling).
- **Mobile first.** Unprefixed classes describe the phone; `sm:` and up widen it. Check 375px
  before checking a desktop width.
- **Consistent scale.** Reuse the spacing and type steps already on the page instead of
  introducing a new one. Page sections share one container: `mx-auto max-w-5xl px-6`.
- **Respect `prefers-reduced-motion`** for anything that moves. An animation that cannot be
  turned off is a bug for people who get motion sick.
- **Contrast.** Body text needs at least 4.5:1 against its background. Light grey on white
  looks elegant in a mockup and is unreadable in sunlight.
- Biome formats CSS too; the auto-fix hook handles it. Never hand-align declarations.
