# devops-portfolio-website

[![Deploy](https://github.com/rintuchowdory/devops-portfolio-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/rintuchowdory/devops-portfolio-website/actions/workflows/deploy.yml)

The site for my DevOps portfolio: a static Astro build that reads a FastAPI
microservice at build time and keeps polling it in the browser.

- Live site: <https://rintuchowdory.github.io/devops-portfolio-website/>
- Live dashboard: <https://rintuchowdory.github.io/devops-portfolio-website/dashboard/>
- API it talks to: <https://devops-portfolio-microservice.vercel.app/docs>

## Pages

| Route | What it does |
| --- | --- |
| `/` | Intro, honest skill levels, live API status probed from your browser |
| `/projects` | Both repositories, their stacks, live links and CI badges |
| `/dashboard` | Telemetry view: services, pipelines, Kubernetes, metrics and a log feed |
| `/api-docs` | Endpoint table and copy-paste `curl` examples for the live API |
| `/roadmap` | Done, next and later, with the reasoning behind the order |
| `/notes` | Short write-ups, clearly marked as drafts |
| `/contact` | Where to actually reach me |
| `404` | Fallback page with working links |

## Run locally

Node 22.12 or newer is required by Astro 6.

```bash
npm install
npm run dev          # http://localhost:4321/devops-portfolio-website/
```

To point the site at a local API instead of the deployed one:

```bash
cp .env.example .env
# then set PUBLIC_API_BASE=http://127.0.0.1:8000
npm run dev
```

```bash
npm run build        # static output in dist/
npm run preview      # serve the build
```

## Configuration

| Variable | Default | Used for |
| --- | --- | --- |
| `PUBLIC_API_BASE` | the deployed Vercel URL | Every live widget and the API docs page |
| `SITE` | `https://rintuchowdory.github.io` | Canonical URLs |
| `BASE` | `/devops-portfolio-website` | Base path, so links survive the Pages project path |

Internal links always go through `href()` in `src/lib/site.ts`, which prefixes
`import.meta.env.BASE_URL`. Hardcoded `/projects` style links break on a project page,
and that is the bug this helper exists to prevent.

## Stack

- Astro 6 with the Tailwind CSS 4 Vite plugin
- daisyUI 5 as a Tailwind plugin (`@plugin "daisyui"` in `src/styles/global.css`), theme `night`
- No client framework. Two small inline scripts: the live API probe and the dashboard poller

## Deploy

Pushes to `main` run `.github/workflows/deploy.yml`:

1. `npm ci`
2. `npm run build` with `SITE` and `BASE` from `actions/configure-pages`
3. Fail the job if `dist/index.html` is missing, so a silent routing regression cannot ship
4. Upload the artifact and deploy to GitHub Pages

The site is built for the `github-pages` environment, so Pages must be set to
**GitHub Actions** as its source in the repository settings.

## Structure

```
src/
  components/Nav.astro, Footer.astro
  layouts/BaseLayout.astro       head, metadata, chrome
  lib/site.ts                    site metadata, nav, projects, API base, href()
  lib/api.ts                     build-time fetch wrapper
  pages/                         index, projects, dashboard, api-docs, roadmap, notes, contact, 404
  styles/global.css              Tailwind, daisyUI theme, hero and glass utilities
public/                          favicon, robots.txt
```
