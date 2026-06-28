# Sunday Readings — How It Works

Readings update automatically every Sunday at 5pm CST via a GitHub Action. No manual steps needed under normal circumstances.

---

## Automatic updates (normal flow)

The GitHub Action runs every Sunday at 5pm CST and:

1. Fetches readings from [bible.usccb.org](https://bible.usccb.org) using a real browser (Playwright)
2. Generates plain-language summaries and liturgical metadata via Claude
3. Commits the updated `lib/readings-data.json` to `main`
4. Vercel redeploys automatically (~60 seconds)

You can monitor runs under **Actions → Update Sunday Readings** in the GitHub repo.

---

## Triggering manually

If you need to run it outside the schedule (e.g. to preview a future Sunday's readings):

1. Go to **Actions → Update Sunday Readings → Run workflow**
2. Optionally enter a date override in `YYYY-MM-DD` format
3. Leave blank to use the next upcoming Sunday

---

## Manual fallback (if automation fails)

If the action fails and you need to update readings by hand, edit `lib/readings-data.json` directly:

```json
{
  "sunday": {
    "date": "YYYY-MM-DD",
    "liturgicalDay": "NAME OF SUNDAY",
    "season": "Ordinary Time",
    "theme": "YOUR THEME TITLE",
    "themeNote": "A sentence or two about the theme of the week.",
    "readings": [
      {
        "label": "First Reading",
        "reference": "Book Chapter:Verses",
        "fullText": "PASTE FULL NABRE TEXT HERE\nUse \\n for line breaks.",
        "summary": "One paragraph plain-language summary."
      },
      {
        "label": "Responsorial Psalm",
        "reference": "Psalm XX:XX",
        "fullText": "R. REFRAIN TEXT\n\nVerse text here.\n\nR. REFRAIN TEXT",
        "summary": "One paragraph plain-language summary."
      },
      {
        "label": "Second Reading",
        "reference": "Book Chapter:Verses",
        "fullText": "PASTE FULL NABRE TEXT HERE",
        "summary": "One paragraph plain-language summary."
      },
      {
        "label": "Gospel",
        "reference": "Book Chapter:Verses",
        "fullText": "PASTE FULL NABRE TEXT HERE",
        "summary": "One paragraph plain-language summary."
      }
    ]
  }
}
```

Copy readings from [bible.usccb.org](https://bible.usccb.org) — text is already NABRE. Then push:

```bash
git add lib/readings-data.json
git commit -m "Update readings — [SUNDAY NAME]"
git push
```

Vercel deploys automatically in ~60 seconds.

---

## Tips

- For the psalm, include the response (R.) before each verse group
- The `theme` and `themeNote` are yours to write — make them feel warm and inviting
- If there is no Second Reading, remove that object from the array
- Use `\n` for line breaks within the text — preserves poetic formatting in psalms and gospels
