// Readings are sourced from readings-data.json
// Update this file each week with the NABRE text from https://bible.usccb.org/bible/readings

import readingsData from './readings-data.json'
import type { LiturgicalColor } from './liturgical-color'

export interface Reading {
  label: string
  reference: string
  fullText: string
  summary: string
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
