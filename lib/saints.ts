// Saint of the Day data, keyed by MM-DD.
//
// Feast days are fixed calendar dates (unlike the Sunday lectionary, which
// rotates by liturgical year), so this is a static, hand-curated dataset
// rather than something auto-generated on a schedule. Currently seeded for
// July only — see WEEKLY_READINGS_GUIDE.md / README for how to extend it.

import saintsData from './saints-data.json'
import type { LiturgicalColor } from './liturgical-color'

export interface SaintOfTheDay {
  name: string
  feastRank: string
  color: LiturgicalColor
  bio: string
  image: string
  patronOf?: string
  // Why the Church still keeps this saint's memory alive today, distinct from the bio's narrative.
  whyRemembered?: string
  // Short, concrete facts — dates, titles, firsts — not full sentences of narrative.
  facts?: string[]
  // One fun or surprising detail, often prefixed with an emoji (e.g. "💡 ...").
  didYouKnow?: string
}

function toMonthDayKey(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${mm}-${dd}`
}

export async function fetchSaintOfTheDay(date: Date = new Date()): Promise<SaintOfTheDay | null> {
  const key = toMonthDayKey(date)
  const entry = (saintsData as Record<string, SaintOfTheDay>)[key]
  return entry ?? null
}
