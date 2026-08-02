# Deploying STADIA to Vercel

This project is a static, multi-page site (no framework, no build step) — pages
live under `html/*.html`, with shared assets in `js/`, `src/`, `image/`, and
`vendor/`. This guide covers deploying it to Vercel with the Vercel CLI.

Live site: **https://stadia-vercel.vercel.app**

## 1. Prerequisites

- [Node.js](https://nodejs.org/) installed (for `npx`).
- A Vercel account. If you don't have one, `npx vercel login` will walk you
  through creating one.
- Push access to the Git remote you want Vercel deploys to come from (this
  repo pushes to a remote named `vercel`: `git remote -v` to check).

You do **not** need to globally install the Vercel CLI — every command below
uses `npx vercel ...`, which downloads and runs it on demand.

## 2. Log in (first time only)

```bash
npx vercel login
```

This opens a device-authorization flow: it prints a URL, you approve it in
your browser, and the CLI picks up the credentials automatically. Check you're
logged in at any time with:

```bash
npx vercel whoami
```

## 3. Link the project (first time only)

From the project root (the folder containing `vercel.json`):

```bash
npx vercel link --yes --project stadia-vercel
```

This creates `.vercel/project.json` locally, linking this folder to the
`stadia-vercel` project on Vercel. `.vercel/` is git-ignored — every teammate
who deploys needs to run this once (or you commit the project link, though
that's not done here).

**Project name rule**: Vercel project names must be lowercase, so if you ever
re-link with a different name, don't use the repo's actual folder name
(`Pre07-ISTAD-INSPIRED` has uppercase letters and gets rejected) — pass an
explicit lowercase `--project` name instead.

## 4. Deploy

```bash
npx vercel --prod --yes
```

This uploads the project and aliases the result to the production domain
(`https://stadia-vercel.vercel.app`). Every time you run this command it
creates a new deployment and re-points production at it — there's no separate
"promote" step needed for a straightforward CLI deploy like this one.

For a preview deployment instead (doesn't touch production), drop `--prod`:

```bash
npx vercel --yes
```

## 5. What's configured, and why

### `vercel.json`

- `buildCommand` / `installCommand` are empty strings — this is a pure static
  site, there is nothing to build or install for the deploy itself.
- `outputDirectory: "."` — serve the repo as-is.
- `rewrites` — the site's pages physically live at `/html/*.html` (e.g.
  `/html/projects.html`), but every page is also reachable at the clean path
  (`/projects.html`) via an explicit rewrite per page, plus `/` rewrites to
  `/html/index.html`. If you add a new page, add its rewrite here too, or it
  will only be reachable at `/html/your-page.html`.

### `vendor/`

Several pages load a few third-party libraries directly at runtime
(`<script src="../vendor/aos/aos.js">` etc. — not bundled): AOS, multiavatar,
Flowbite, and Preline. These normally live in `node_modules/`, which is
git-ignored, so they wouldn't exist in what gets deployed. Rather than
un-ignoring all of `node_modules` (adding ~200+ unused packages to the
deploy), the exact files actually referenced are copied into a small, tracked
`vendor/` folder instead. If you add a new runtime dependency loaded this way,
copy its file into `vendor/<package>/` and reference `../vendor/<package>/...`
from the HTML (see `package.json`'s `serve` script for the matching local-dev
mount).

### `.vercelignore`

Excludes `node_modules` from the upload (not needed — `vendor/` covers what's
actually used at runtime; the rest of `node_modules` is dev-only tooling like
`tailwindcss` and `live-server`).

## 6. After changing anything under `src/input.css`

Rebuild the compiled CSS before deploying — it's a committed, static file
(`src/output.css`), not generated at deploy time:

```bash
npx tailwindcss -i ./src/input.css -o ./src/output.css --minify
```

Then deploy as usual.

## 7. Known limitation: social link previews

Pasting a `project-detail.html` link into Messenger/Discord/Facebook/etc.
shows a generic STADIA preview card, not that specific project's real title,
description, and thumbnail. This is a deliberate simplification, not a bug
left unfixed by accident:

- Real per-project preview data requires the HTML that crawlers fetch to
  already contain the right `<meta property="og:...">` values server-side,
  since those crawlers don't run JavaScript — the client-side code that sets
  the correct values (see `project-detail.html`'s own `<script>`) only ever
  runs in an actual browser, which crawlers aren't.
- The natural fix is a small serverless function that fetches the project
  from `inspire-api.gital.me` and injects the real values before responding.
  This was built and tested, but **the backend API returns 403 to every
  request from Vercel's infrastructure** — both from serverless functions at
  request time and from the build step at deploy time — almost certainly a
  firewall/WAF rule blocking cloud/datacenter IP ranges. This is outside
  what's fixable from this repo; it needs whoever manages
  `inspire-api.gital.me` to allowlist Vercel's egress IPs (or relax that rule
  for the public, unauthenticated `GET /projects/*` endpoints).
- Until then, the static fallback tags at least show a real STADIA image and
  a real description instead of a blank/broken card.

## 8. Troubleshooting

- **A page 404s at its clean URL** (e.g. `/settings.html`) but works at
  `/html/settings.html` — you added a new page and forgot to add its rewrite
  in `vercel.json` (step 5).
- **A library 404s** (e.g. `vendor/aos/aos.js`) — the file wasn't copied into
  `vendor/`, or the HTML still points at `../node_modules/...` instead of
  `../vendor/...`.
- **`vercel --prod --yes` fails with a project-name error** — you're deploying
  from a fresh clone without `.vercel/project.json`; run step 3 again with an
  explicit lowercase `--project` name.
- **Changes don't show up live** — confirm you actually ran `vercel --prod`
  (not just `vercel`, which only creates a preview) and that you rebuilt
  `src/output.css` first if you touched any Tailwind classes or `input.css`.
