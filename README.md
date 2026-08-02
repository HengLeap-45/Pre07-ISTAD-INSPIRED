# STADIA — Student Project Showcase Platform

STADIA is a web platform built for [ISTAD](https://istad.co) students to publish, browse, and get
feedback on their project work. Students create an account, post projects (with a thumbnail,
description, tech stack, demo/video/repo links), and browse what other students in their
course/generation have built. It's a final project built with plain HTML/CSS/JavaScript on the
frontend, consuming a remote REST API for all data.

## Features

- **Browse & search** — filter projects by category, or search by keyword, with a skeleton loading
  state while results load.
- **Project detail pages** — description, tech stack, comments, and rich previews for video/demo/
  repository links (embedded YouTube player, styled cards for demo/GitHub links).
- **Authentication** — sign up / sign in, with protected actions (posting a project, commenting)
  redirecting to login and returning the user to what they were doing afterward.
- **Post Creator** — create or edit a project, with inline creation of categories and
  course/generation, a live preview tab, thumbnail upload with preview, and required-field validation.
- **Dashboard** — manage your own projects (edit, publish/unpublish, delete) with real stats.
- **Favorites & history** — bookmark projects and revisit recently-viewed ones (stored locally in
  the browser).
- **Profile** — edit your name and upload an avatar; users without a photo get a
  [Multiavatar](https://github.com/multiavatar/Multiavatar)-generated avatar instead of a blank circle.
- **Dark mode** — a light/dark toggle in the navbar, with the preference remembered across visits.
- **Session handling** — expired or invalid sessions are detected automatically, clearing local
  state and redirecting to login instead of leaving the app in a broken logged-in-looking state.

## Tech stack

- **Vanilla JavaScript** — no framework, no build step for the app logic itself. Each API resource
  (projects, categories, courses, generations, users, reviews, tech stacks, media, auth, favorites,
  theme) has its own module under [js/](js/), attached to `window` so pages can use it via plain
  `<script>` tags.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — utility classes compiled from [src/input.css](src/input.css)
  into [src/output.css](src/output.css), the stylesheet every page links to.
- **[live-server](https://www.npmjs.com/package/live-server)** — local dev server with live reload.
- **Remote API** — all data (projects, users, categories, courses, generations, media uploads, etc.)
  is served by a separate backend at `https://inspire-api.gital.me/api/v1`. This repo is
  frontend-only; there is no local database or backend code here.

## Project structure

```
html/       Every page (project pages, dashboard, auth, settings, favorites/history, etc.)
js/         One module per API resource, plus shared helpers (config/auth/theme/cardDetail)
src/        Tailwind entry point (input.css) and compiled output (output.css)
image/      Static images (logo, illustrations)
components/ Reusable component fragments
store/      Client-side data helpers
```

## Getting started

```bash
npm install
npm start
```

This runs the Tailwind CSS watcher and the dev server together, and opens the app at
`http://localhost:3000`. If port 3000 is already in use, `npm start` frees it automatically before
starting (see the `prestart` script).

Other scripts:

```bash
npm run css     # rebuild Tailwind CSS once, or --watch during development
npm run build   # minified production CSS build
```

## Notes

- There's no `.env` or local secrets to configure — the app talks directly to the hosted API.
- Favorites, view history, and the dark-mode preference are stored in the browser's `localStorage`,
  not on the server, since the API doesn't expose endpoints for them.
