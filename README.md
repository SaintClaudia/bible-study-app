# Bible Study — OCIA Catholic Companion

A mobile-first web app for anyone exploring or living the Catholic faith. Sunday readings, Mass guidance, faith formation, a journey into the Church, and curated resources — all in one place.

**Live:** [app.biblestudylovesyou.com](https://app.biblestudylovesyou.com)
**Marketing site:** [biblestudylovesyou.com](https://biblestudylovesyou.com)

---

## Features

| Tab | What it does |
|---|---|
| **Readings** | This Sunday's Mass readings (NABRE) with plain-language summaries — auto-updated every Sunday at 5pm CST via GitHub Actions + Claude |
| **Mass** | Step-by-step guidance through the Order of the Mass, including Church Mode for use during Mass |
| **Formation** | Learning paths on attending Mass, prayer, Catholic beliefs, and living the faith |
| **Journey** | Honest answers for those exploring or entering the Church — OCIA, marriage, the Easter Vigil, common questions |
| **Resources** | Curated Watch, Read, Explore, and Listen picks with in-app detail pages and Spotify embeds |

- Dark mode (follows system preference)
- WCAG 2.1 AA accessible
- Installable as a PWA on iOS and Android
- Share links on every resource detail page (native share sheet on mobile)
- Google Analytics

---

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- [Lucide React](https://lucide.dev) icons
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode
- [Playwright](https://playwright.dev) + [catholic-mass-readings](https://www.npmjs.com/package/catholic-mass-readings) for automated readings
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript) for Claude-generated summaries

---

## Project Structure

```
app/
  layout.tsx               # Root layout — metadata, GA, theme provider
  page.tsx                 # Renders AppShell
  globals.css              # Tailwind base + CSS variables
  not-found.tsx            # Custom 404

components/
  app-shell.tsx            # Tab shell, header, nav bar
  theme-toggle.tsx
  theme-provider.tsx
  readings/
    readings-tab.tsx       # Sunday readings view
  mass/
    mass-tab.tsx
    church-mode.tsx        # Full-screen Mass guidance
  formation/
    formation-tab.tsx
  journey/
    journey-tab.tsx
  resources/
    resources-tab.tsx      # Cards + in-app detail pages
  shared/
    glossary-term.tsx
    glossary-sheet.tsx

lib/
  content.ts               # All app content — Mass, formation, journey, resources
  readings.ts              # Readings data helpers
  readings-data.json       # Current Sunday's readings (auto-updated)
  liturgical-color.ts      # Season → color mapping
  glossary.ts
  utils.ts

.github/
  workflows/
    update-readings.yml    # Scheduled GitHub Action (Sundays 5pm CST)
  scripts/
    update-readings.mjs    # Playwright + Claude script for readings

public/
  the-chosen.jpg
  king-of-kings.jpg
  catechism.jpg
  compendium.jpg
  theology-of-home.jpg
  laudate.png
  apple-touch-icon.png
  icon-32x32.png
```

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Automated Sunday Readings

Readings update automatically every Sunday at 5pm CST via a GitHub Action:

1. Playwright launches a real browser to fetch readings from [bible.usccb.org](https://bible.usccb.org) (bypasses bot protection)
2. `catholic-mass-readings` parses the HTML into structured readings
3. Claude (`claude-sonnet-4-6`) generates plain-language summaries and liturgical metadata
4. `lib/readings-data.json` is committed and Vercel redeploys automatically

**Required GitHub secret:** `ANTHROPIC_API_KEY`

To trigger manually: Actions → Update Sunday Readings → Run workflow (optionally pass a `YYYY-MM-DD` date override).

---

## Updating Content

All non-readings content lives in `lib/content.ts`:

- **`massSections`** — the Order of the Mass steps
- **`learningPaths`** — Formation tab lessons
- **`journeyTopics`** — Journey tab articles and FAQs
- **`resourceGroups`** — Resources tab (Watch, Read, Explore, Listen)

Edit the relevant export and push to deploy.

---

## Deployment

Deployed on **Vercel**. Every push to `main` triggers an automatic deploy (~60 seconds).

---

## Roadmap

| Priority | Item | Description |
|---|---|---|
| 1 | **Desktop & Tablet View** | Responsive layouts optimized for larger screens — sidebar navigation, wider content panels |
| 2 | **Native App** | iOS and Android native app submitted to the App Store and Google Play |
| 3 | **Community Build** | Social and community features — groups, shared reflections, parish integration |

---

## Related Repo

The marketing/landing site lives at [`SaintClaudia/bible-study`](https://github.com/SaintClaudia/bible-study).
