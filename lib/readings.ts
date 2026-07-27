// Readings are sourced from readings-data.json
// Update this file each week with the NABRE text from https://bible.usccb.org/bible/readings

import readingsData from './readings-data.json'
import type { LiturgicalColor } from './liturgical-color'

export interface ReadingReflection {
  // One or two plain-language sentences summarizing the passage's spiritual invitation. Never quotes the passage.
  reflection: string
  // A single gentle, open-ended question connecting the passage to the reader's life.
  question: string
}

export interface Reading {
  label: string
  reference: string
  fullText: string
  summary: string
  reflection?: ReadingReflection
}

export interface DailyReadings {
  date: string
  season: string
  color?: LiturgicalColor
  liturgicalDay: string
  theme: string
  themeNote: string
  readings: Reading[]
}

export async function fetchSundayReadings(): Promise<DailyReadings | null> {
  try {
    return readingsData.sunday as DailyReadings
  } catch {
    return null
  }
}

// Saved reflection responses, namespaced by Sunday date then reading
// reference, so each year's answers stay separate — the foundation for a
// future reflection timeline. One answer per reading, since each reading
// now carries a single reflection question.
export const REFLECTION_RESPONSES_KEY = 'bs.reflectionResponses'
export type ReflectionResponses = Record<string, Record<string, string>>

export type ReflectionStatus = 'not-started' | 'in-progress' | 'complete'

// 'complete' only once every passage has an answer; 'in-progress' if
// anything is answered short of that; otherwise 'not-started'. Used to
// drive the CTA's status copy/dot instead of collapsing "started" and
// "finished" together.
export function getReflectionStatus(date: string, readings: Reading[]): ReflectionStatus {
  if (typeof window === 'undefined' || readings.length === 0) return 'not-started'
  try {
    const raw = window.localStorage.getItem(REFLECTION_RESPONSES_KEY)
    const forDate = raw ? ((JSON.parse(raw) as ReflectionResponses)[date] ?? {}) : {}

    let anyAnswered = false
    let allComplete = true
    for (const r of readings) {
      const saved = forDate[r.reference]
      if (saved?.trim()) anyAnswered = true
      else if (r.reflection) allComplete = false
    }

    if (allComplete) return 'complete'
    if (anyAnswered) return 'in-progress'
    return 'not-started'
  } catch {
    return 'not-started'
  }
}

// Where Reflect mode should open to: the first passage (in order) that
// still has an unanswered question — never the most-recently-touched one.
// So answering only the first passage resumes at the second; answering only
// the third still resumes at the first, since it comes first in the flow.
export function getReflectionResumeStep(date: string, readings: Reading[]): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = window.localStorage.getItem(REFLECTION_RESPONSES_KEY)
    const forDate = raw ? ((JSON.parse(raw) as ReflectionResponses)[date] ?? {}) : {}
    for (let i = 0; i < readings.length; i++) {
      if (!readings[i].reflection) continue
      const saved = forDate[readings[i].reference]
      if (!saved?.trim()) return i
    }
    return 0 // everything answered — start from the top again
  } catch {
    return 0
  }
}
