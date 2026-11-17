/**
 * The one place the Sanity project is named. Read by the Studio, by the build-time pull
 * in `scripts/`, and by the seed script — so the three can never point at different
 * datasets.
 *
 * None of these values is a secret. A project ID is printed in every image URL the CDN
 * serves; what protects the content is that writing needs a logged-in project member or
 * a token, and neither ever appears in this repository.
 *
 * `projectId` stays empty until the project exists. While it is empty the website builds
 * from the local archive in `src/content/archive.local.ts`, exactly as it did before the
 * CMS was attached, and the Studio refuses to start with a message saying so.
 */
export const projectId = "hx6xvawm";
export const dataset = "production";

/**
 * A date, not a version number: the API answers the way it did on this day, so a
 * behaviour change on Sanity's side cannot silently change what this site receives.
 * Move it forward deliberately, never automatically.
 */
export const apiVersion = "2026-10-01";

/** Where the hosted Studio lives once `pnpm --dir studio deploy` has run. */
export const studioUrl = "https://relapse-archiv.sanity.studio";
