# How to Update Sunday Readings Each Week

Every week, copy the new readings from USCCB and paste them into `lib/readings-data.json`.

---

## Step 1 — Get the readings

Go to: **https://bible.usccb.org/bible/readings/**
Find the upcoming Sunday and note:
- The Sunday name (e.g. "Twelfth Sunday in Ordinary Time")
- The liturgical season (e.g. "Ordinary Time")
- All four readings: First Reading, Psalm, Second Reading, Gospel

---

## Step 2 — Open the file

Open `lib/readings-data.json` in any text editor (TextEdit, VS Code, etc.)

---

## Step 3 — Replace the content

Copy this template and fill in the blanks:

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

---

## Step 4 — Push to GitHub

```bash
cd ~/Library/CloudStorage/OneDrive-Personal/04_Projects/bible-study-app
git add lib/readings-data.json
git commit -m "Update readings — [SUNDAY NAME]"
git push
```

Vercel will deploy automatically in about 60 seconds.

---

## Tips

- Copy text directly from USCCB — it's already NABRE
- For the psalm, include the response (R.) before each verse group
- The `theme` and `themeNote` are yours to write — make them feel warm and inviting
- If there is no Second Reading (weekdays), just remove that object from the array
- Keep `\n` for line breaks within the text — this preserves the poetic formatting of psalms and gospels

