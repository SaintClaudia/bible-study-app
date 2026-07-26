// Readings are sourced from readings-data.json
// Update this file each week with the NABRE text from https://bible.usccb.org/bible/readings

import readingsData from './readings-data.json'
import type { LiturgicalColor } from './liturgical-color'

export interface ReflectionPrompt {
  // A single honest, personal, non-academic question.
  question: string
  // Shown as the textarea placeholder — the first few words of an answer
  // (e.g. "If I'm honest, the thing I'd need to let go of is…"), not an instruction.
  starter?: string
}

export interface ReadingReflection {
  // As many prompts as the passage genuinely offers — usually 1, sometimes 2. Never padded to a fixed count.
  prompts: ReflectionPrompt[]
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
// future reflection timeline. Array index lines up with that reading's
// `prompts` array.
export const REFLECTION_RESPONSES_KEY = 'bs.reflectionResponses'
export type ReflectionResponses = Record<string, Record<string, string[]>>

export type ReflectionStatus = 'not-started' | 'in-progress' | 'complete'

// 'complete' only once every prompt on every passage has an answer;
// 'in-progress' if anything is answered short of that; otherwise 'not-started'.
// Used to drive the CTA's status copy/dot instead of collapsing "started" and "finished" together.
export function getReflectionStatus(date: string, readings: Reading[]): ReflectionStatus {
  if (typeof window === 'undefined' || readings.length === 0) return 'not-started'
  try {
    const raw = window.localStorage.getItem(REFLECTION_RESPONSES_KEY)
    const forDate = raw ? ((JSON.parse(raw) as ReflectionResponses)[date] ?? {}) : {}

    let anyAnswered = false
    let allComplete = true
    for (const r of readings) {
      const promptCount = r.reflection?.prompts.length ?? 0
      const saved = forDate[r.reference] ?? []
      if (saved.some((s) => s?.trim())) anyAnswered = true
      if (!Array.from({ length: promptCount }).every((_, j) => saved[j]?.trim())) allComplete = false
    }

    if (allComplete) return 'complete'
    if (anyAnswered) return 'in-progress'
    return 'not-started'
  } catch {
    return 'not-started'
  }
}

// Where Reflect mode should open to: the first passage (in order) that
// still has an unanswered prompt — never the most-recently-touched one.
// So answering only the first passage resumes at the second; answering only
// the third still resumes at the first, since it comes first in the flow.
export function getReflectionResumeStep(date: string, readings: Reading[]): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = window.localStorage.getItem(REFLECTION_RESPONSES_KEY)
    const forDate = raw ? ((JSON.parse(raw) as ReflectionResponses)[date] ?? {}) : {}
    for (let i = 0; i < readings.length; i++) {
      const promptCount = readings[i].reflection?.prompts.length ?? 0
      const saved = forDate[readings[i].reference] ?? []
      const complete = Array.from({ length: promptCount }).every((_, j) => saved[j]?.trim())
      if (!complete) return i
    }
    return 0 // everything answered — start from the top again
  } catch {
    return 0
  }
}
