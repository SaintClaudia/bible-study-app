# Bible Study — Catholic Pocket Companion

A mobile-first web app for anyone exploring or living the Catholic faith. Sunday readings, Mass guidance, faith formation, a journey into the Church, and curated resources — all in one place.

**Live:** [app.biblestudylovesyou.com](https://app.biblestudylovesyou.com)
**Marketing site:** [biblestudylovesyou.com](https://biblestudylovesyou.com)

---

## Features

| Tab | What it does |
|---|---|
| **Readings** | This Sunday's Mass readings with summaries and a reflection question |
| **Mass** | Step-by-step guidance through the Order of the Mass, including Church Mode for use during Mass |
| **Formation** | Learning paths on attending Mass, prayer, Catholic beliefs, and living the faith |
| **Journey** | Honest answers for those exploring or entering the Church — OCIA, marriage, the Easter Vigil, common questions |
| **Resources** | Curated watch, listen, read, and learn picks |

- Dark mode (follows system preference)
- WCAG 2.1 AA accessible
- Installable as a PWA on iOS and Android
- Google Analytics (G-DD8L2T25FQ)

---

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- [Lucide React](https://lucide.dev) icons
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode

---

## Project Structure

```
app/
  layout.tsx          # Root layout — metadata, GA, skip nav, theme provider
  page.tsx            # Renders AppShell
  globals.css         # Tailwind base + CSS variables
  not-found.tsx       # Custom 404

components/
  app-shell.tsx       # Tab shell, header, nav bar
  theme-toggle.tsx    # Light/dark toggle button
  theme-provider.tsx  # next-themes wrapper
  readings/
    readings-tab.tsx  # Sunday readings view
  mass/
    mass-tab.tsx      # Mass overview and entry to Church Mode
    church-mode.tsx   # Step-by-step Mass guidance (full-screen)
  formation/
    formation-tab.tsx # Learning paths and lessons
  journey/
    journey-tab.tsx   # OCIA / faith exploration articles
  resources/
    resources-tab.tsx # Curated external resources
  shared/
    glossary-term.tsx # Inline glossary trigger
    glossary-sheet.tsx# Glossary definition sheet/popover

lib/
  content.ts          # All app content — readings, Mass sections, lessons, journey topics, resources
  readings.ts         # Readings data helpers
  readings-data.json  # Weekly readings (update each Sunday)
  glossary.ts         # Glossary terms
  utils.ts            # cn() utility

hooks/
  use-local-storage.ts

public/
  apple-touch-icon.png
```

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Updating Weekly Readings

See **[WEEKLY_READINGS_GUIDE.md](./WEEKLY_READINGS_GUIDE.md)** for step-by-step instructions on updating Sunday readings each week.

Short version: edit `lib/readings-data.json`, commit, and push. The app deploys automatically.

---

## Updating Content

All non-readings content lives in `lib/content.ts`:

- **`massSections`** — the Order of the Mass steps used in Mass Mode
- **`learningPaths`** — Formation tab lessons
- **`journeyTopics`** — Journey tab articles and FAQs
- **`resourceGroups`** — Resources tab curated links

Edit the relevant export and push to deploy.

---

## Deployment

The app is deployed on **Vercel**. Every push to `main` triggers an automatic deploy (~60 seconds).

---

## Related Repo

The marketing/landing site lives at [`SaintClaudia/bible-study`](https://github.com/SaintClaudia/bible-study).
