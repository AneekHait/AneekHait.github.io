# Aneek Hait — Data & BI Analyst Portfolio

A static, content-driven portfolio built with Astro. It covers selected analytics work,
experience, toolkit, written notes, and verified credentials.

Live site: <https://aneekhait.github.io>

## Stack

- **Astro** — component-based, zero-JS-by-default, static output
- **MDX** content collections for case studies and notes, validated with Zod schemas
- **`@astrojs/sitemap`** and **`@astrojs/rss`** for `/sitemap-index.xml` and `/rss.xml`
- **Custom CSS design system** ("Terminal Ledger") — dark-first tokens, fluid type scale,
  no CSS framework
- **Fontsource** self-hosted fonts: Inter Variable (UI) and IBM Plex Mono (labels, data)
- **Pillow** for deterministic Open Graph image generation
- **GitHub Actions** for build and deploy to GitHub Pages

## Requirements

Node.js 20 or later (developed against v24 LTS) and npm.

> **Windows PowerShell note:** the default execution policy blocks `npm.ps1`. Use
> `npm.cmd` instead of `npm`, e.g. `npm.cmd run dev`.

## Commands

Run from the repository root:

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `http://localhost:4321` |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Type-check `.astro`, `.ts`, and content schemas |

## Project Structure

```text
.
|-- astro.config.mjs
|-- src/
|   |-- assets/images/          # Optimised at build time by astro:assets
|   |-- components/             # BaseHead, Header, Footer, cards, ThemeToggle
|   |-- content/
|   |   |-- work/*.mdx          # Case studies
|   |   `-- notes/*.mdx         # Written notes
|   |-- content.config.ts       # Collection schemas
|   |-- data/                   # site, experience, credentials, toolkit
|   |-- layouts/BaseLayout.astro
|   |-- pages/
|   |   |-- index.astro
|   |   |-- about.astro
|   |   |-- work/[...id].astro
|   |   |-- notes/[...id].astro
|   |   |-- 404.astro
|   |   `-- rss.xml.ts
|   `-- styles/                 # tokens.css, global.css
|-- public/                     # Copied verbatim: og.png, pp.png, robots.txt,
|                               # favicon.svg, resume PDF, Search Console file
`-- scripts/gen-og.py
```

## Featured Work

| Project | Category | Detail |
| --- | --- | --- |
| [Text Analyzer Pro](src/content/work/text-analyzer-pro.mdx) | Work | Private, analyst-friendly text clustering for spreadsheet data |
| [Titanic Survival Analysis](src/content/work/titanic-survival-analysis.mdx) | Work | A familiar dataset pushed beyond familiar conclusions |
| [TicketAudit](src/content/work/ticket-audit.mdx) | Work | Offline desktop tool for auditing ITSM ticket exports at scale |
| [Atomic Focus](src/content/work/atomic-focus.mdx) | Side project | Free AI Pomodoro timer with ambient sounds for deep work |

## Adding Content

**A case study** — create `src/content/work/<slug>.mdx`. Required frontmatter: `title`,
`deck`, `order`, `year`, `role`. Set `status: planned` for work that has not shipped;
planned entries render as stubs, are excluded from the homepage, and must never carry
invented metrics or screenshots. `shipped` entries get a detail page at `/work/<slug>/`.

**A note** — create `src/content/notes/<slug>.mdx` with `title`, `description`, and
`pubDate`. Set `draft: true` to keep it out of the build.

Site-wide copy (name, role, tagline, "now" line, social links) lives in
`src/data/site.ts`. Experience, credentials, and toolkit lists live alongside it.

## Design Tokens

All colour, type, and spacing values are defined once in `src/styles/tokens.css` under
`:root` (dark) and `[data-theme='light']`. Theme choice persists in `localStorage` under
the key `aneek-theme` and is applied by an inline script in `BaseHead.astro` to avoid a
flash of the wrong theme.

## Open Graph Card

The site never calls an image-generation API at runtime and contains no credentials.
Regenerate the social card after changing positioning copy:

```powershell
python scripts/gen-og.py
```

This writes a deterministic `1200 x 630` card to `public/og.png` using the same palette as
`tokens.css`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
`withastro/action` and publishes `dist/` via `actions/deploy-pages`.

**One-time setup:** in the repository settings under *Pages*, set **Source** to
**GitHub Actions**.

## License

MIT License
