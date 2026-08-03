# Aneek Hait - Data & BI Analyst Portfolio

A static, responsive portfolio focused on selected analytics products, professional impact, experience, and verified credentials.

## Stack

- Semantic HTML5
- Custom CSS with light/dark design tokens and responsive editorial layouts
- Vanilla JavaScript for theme persistence, progressive reveals, counters, section tracking, and scroll controls
- Google Fonts: Fraunces, Space Grotesk, and IBM Plex Mono
- Pillow for deterministic Open Graph image generation

## Project Structure

```text
.
|-- index.html
|-- assets/
|   |-- css/portfolio.css
|   |-- js/portfolio.js
|   |-- images/
|   |   |-- contact-aneek.webp
|   |   |-- project-text-analyzer.webp
|   |   |-- project-titanic-joint.webp
|   |   |-- project-titanic-odds.webp
|   |   `-- IMAGEN-BRIEF.md
|   |-- pp.png
|   `-- og.png
`-- scripts/gen-og.py
```

## Local Preview

No build step is required. From the repository root:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000/`. The site can also be opened directly from `index.html`, but a local server better matches GitHub Pages behavior.

## Image Workflow

The website never calls Imagen at runtime and contains no API credentials. The hero is intentionally not portrait-led: its default visual is a responsive CSS signal map built from the portfolio's analysis, systems, and action themes. `assets/images/IMAGEN-BRIEF.md` defines an optional non-photographic data-studio texture that can be evaluated as a subtle supporting layer without replacing the HTML visualization or becoming the primary content.

Project imagery is copied from Aneek's public project repositories and committed locally so the portfolio does not hotlink assets or invent analytical interfaces.

Regenerate the social card after changing positioning copy or the signal-map art direction:

```powershell
python scripts/gen-og.py
```

This writes a deterministic, non-portrait `1200 x 630` card to `assets/og.png`; all card text and chart geometry are rendered by Pillow rather than image generation.

## Live Site

https://aneekhait.github.io

## License

MIT License