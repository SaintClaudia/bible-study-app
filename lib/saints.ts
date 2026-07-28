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
  // A traditional prayer associated with the saint, verbatim. Only set when
  // one genuinely exists and is commonly prayed (e.g. the Saint Michael Prayer).
  prayer?: string
  // CSS aspect-ratio for the portrait container (e.g. "1/1"). Defaults to a
  // square in the UI when omitted; override for images that get awkwardly
  // cropped as a square (a tall building, a wide composition, etc).
  imageAspectRatio?: string
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

// Used on plain ferial days (no saint assigned) to preview what's coming up
// next, rather than leaving the page empty. Searches forward day by day, but
// bounded to 14 days — comfortably wider than any real gap between two
// populated dates (currently 3 days at most) — so that once the dataset runs
// off the edge of its populated months (e.g. Aug 31 with only July/August
// seeded), this returns null instead of jumping to a saint many months away
// and presenting it as though it were the genuinely next one on the calendar.
const MAX_NEXT_SAINT_SEARCH_DAYS = 14

export async function fetchNextSaint(
  afterDate: Date = new Date(),
): Promise<{ date: Date; saint: SaintOfTheDay } | null> {
  const data = saintsData as Record<string, SaintOfTheDay>
  for (let i = 1; i <= MAX_NEXT_SAINT_SEARCH_DAYS; i++) {
    const candidate = new Date(afterDate)
    candidate.setDate(candidate.getDate() + i)
    const entry = data[toMonthDayKey(candidate)]
    if (entry) return { date: candidate, saint: entry }
  }
  return null
}
