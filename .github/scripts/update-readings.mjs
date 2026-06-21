#!/usr/bin/env node
/**
 * Fetches this Sunday's Mass readings from USCCB using a real browser
 * (Playwright bypasses their bot protection), then generates plain-language
 * summaries and liturgical metadata via Claude, and writes the result to
 * lib/readings-data.json.
 *
 * Run via the update-readings GitHub Action, or manually:
 *   node .github/scripts/update-readings.mjs
 *   OVERRIDE_DATE=2026-12-27 node .github/scripts/update-readings.mjs
 */

import { chromium } from 'playwright'
import Anthropic from '@anthropic-ai/sdk'
import { USCCB, SectionType, readingHeader, sectionTypeFromHeader } from 'catholic-mass-readings'
import { load as cheerioLoad } from 'cheerio'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const READINGS_PATH = join(__dirname, '../../lib/readings-data.json')

// ── Date helpers ──────────────────────────────────────────────────────────────

function getTargetSunday() {
  const override = process.env.OVERRIDE_DATE
  if (override) {
    const d = new Date(override + 'T12:00:00Z')
    if (isNaN(d.getTime())) throw new Error(`Invalid OVERRIDE_DATE: ${override}`)
    return d
  }
  const now = new Date()
  const day = now.getUTCDay() // 0 = Sunday
  // Always advance to the upcoming Sunday (next week when today is Sunday,
  // since the action fires Sunday afternoon after Mass)
  const daysUntilSunday = day === 0 ? 7 : 7 - day
  const sunday = new Date(now)
  sunday.setUTCDate(now.getUTCDate() + daysUntilSunday)
  sunday.setUTCHours(12, 0, 0, 0)
  return sunday
}

function toUSCCBDateStr(date) {
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(date.getUTCDate()).padStart(2, '0')
  const yy = String(date.getUTCFullYear()).slice(-2)
  return `${mm}${dd}${yy}`
}

function toISODateStr(date) {
  return date.toISOString().split('T')[0]
}

// ── Text extraction with preserved line breaks ────────────────────────────────

function extractFormattedText($, container) {
  const contentBody = $(container).find('.content-body').first()
  if (!contentBody.length) return ''
  const clone = contentBody.clone()
  clone.find('br').replaceWith('\n')
  return clone.text()
    .split('\n')
    .map(line => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// ── Section → label mapping ───────────────────────────────────────────────────

function sectionToLabel(type, readingIndex) {
  if (type === SectionType.PSALM) return 'Responsorial Psalm'
  if (type === SectionType.GOSPEL) return 'Gospel'
  if (type === SectionType.READING) {
    return readingIndex === 0 ? 'First Reading' : 'Second Reading'
  }
  return null // ALLELUIA, SEQUENCE, UNKNOWN, ALTERNATIVE — skip
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const sunday = getTargetSunday()
  const dateStr = toUSCCBDateStr(sunday)
  const url = `https://bible.usccb.org/bible/readings/${dateStr}.cfm`

  console.log(`Target Sunday: ${sunday.toUTCString()}`)
  console.log(`USCCB URL: ${url}`)

  // 1. Fetch page HTML with a real browser (bypasses bot JS challenge)
  console.log('\n🌐 Launching browser…')
  const browser = await chromium.launch({ headless: true })
  let html
  try {
    const page = await browser.newPage()
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' })
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })
    // Wait for actual readings content to appear
    await page.waitForSelector('.container', { timeout: 20_000 }).catch(() => {})
    html = await page.content()
    console.log(`  Got ${html.length} bytes of HTML`)
  } finally {
    await browser.close()
  }

  // 2. Parse with catholic-mass-readings (uses cheerio internally)
  const usccb = new USCCB()
  const mass = usccb.parseMass(html, url, sunday, null)

  console.log(`\n📖 Parsed: "${mass.title}"`)
  if (!mass.sections?.length) {
    throw new Error('No sections parsed — USCCB page structure may have changed')
  }
  console.log(`  Sections: ${mass.sections.map(s => `${s.header}(${s.type})`).join(', ')}`)

  // 3. Build readings array, skipping ALLELUIA / SEQUENCE / ALTERNATIVE
  // Use cheerio directly to extract text with USCCB line breaks preserved —
  // the package's cleanText() collapses all whitespace which destroys formatting.
  const $ = cheerioLoad(html)
  const readings = []
  let readingIndex = 0
  let containerIndex = 0
  const containers = $('.container').toArray()

  for (const section of mass.sections) {
    const label = sectionToLabel(section.type, readingIndex)

    // Advance containerIndex to the matching container for this section
    while (containerIndex < containers.length) {
      const headerText = $(containers[containerIndex]).find('.name').first().text().trim()
      if (sectionTypeFromHeader(headerText) === section.type) break
      containerIndex++
    }

    if (!label) {
      containerIndex++
      if (section.type === SectionType.READING) readingIndex++
      continue
    }

    const r = section.readings?.[0]
    if (!r) { containerIndex++; if (section.type === SectionType.READING) readingIndex++; continue }

    const fullText = containerIndex < containers.length
      ? extractFormattedText($, containers[containerIndex])
      : r.text ?? ''

    readings.push({ label, reference: readingHeader(r), fullText, summary: '' })
    containerIndex++
    if (section.type === SectionType.READING) readingIndex++
  }

  if (readings.length === 0) {
    throw new Error('Parsed 0 readings — check USCCB HTML selectors')
  }
  console.log(`  Readings: ${readings.map(r => r.label).join(', ')}`)

  // 4. Generate metadata + summaries via Claude
  console.log('\n🤖 Generating summaries with Claude…')
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const readingBlocks = readings
    .map(r => `**${r.label} — ${r.reference}**\n${r.fullText.slice(0, 1200)}`)
    .join('\n\n---\n\n')

  const prompt = `You are writing content for a Catholic app designed for people exploring or newly entering the faith through OCIA. Keep language warm, clear, and free of jargon.

This Sunday's Mass is: ${mass.title}

Readings:

${readingBlocks}

Respond with ONLY valid JSON in this exact structure (no markdown fences, no commentary):
{
  "season": "<one of: Ordinary Time | Advent | Christmas | Lent | Easter>",
  "color": "<only include this key on special Sundays that depart from their season color: rose for Laetare/Gaudete, red for Pentecost/Palm Sunday, white for Christ the King — omit on all other Sundays>",
  "theme": "<3-6 word title capturing the week's thread>",
  "themeNote": "<2-3 sentences weaving the readings together for someone new to the faith>",
  "summaries": [
    "<2-4 sentence plain-language summary for ${readings[0]?.label ?? 'First Reading'}>",
    "<2-4 sentence plain-language summary for ${readings[1]?.label ?? 'Responsorial Psalm'}>",
    "<2-4 sentence plain-language summary for ${readings[2]?.label ?? 'Second Reading'}>",
    "<2-4 sentence plain-language summary for ${readings[3]?.label ?? 'Gospel'}>"
  ]
}`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1200,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = response.content[0].text.trim()
    .replace(/^```json\s*/i, '').replace(/\s*```$/, '')
  const meta = JSON.parse(raw)

  console.log(`  Season: ${meta.season} | Theme: "${meta.theme}"`)

  // Apply summaries
  readings.forEach((r, i) => { r.summary = meta.summaries[i] ?? '' })

  // 5. Build final data object
  const data = {
    sunday: {
      date: toISODateStr(sunday),
      liturgicalDay: mass.title,
      season: meta.season,
      ...(meta.color ? { color: meta.color } : {}),
      theme: meta.theme,
      themeNote: meta.themeNote,
      readings,
    },
  }

  // 6. Write to file
  writeFileSync(READINGS_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`\n✅ Written to lib/readings-data.json`)
  console.log(`   ${readings.length} readings for "${mass.title}"`)
}

main().catch(err => {
  console.error('\n❌ update-readings failed:', err)
  process.exit(1)
})
