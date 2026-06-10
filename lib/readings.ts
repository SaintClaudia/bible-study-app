// Catholic Readings API — free, no rate limits, USCCB verified
// https://cpbjr.github.io/catholic-readings-api/

export interface DailyReadings {
  date: string
  season: string
  liturgicalDay: string
  theme: string
  themeNote: string
  readings: {
    label: string
    reference: string
    excerpt: string
    summary: string
  }[]
  usccbLink: string
}

interface ApiResponse {
  date: string
  season?: string
  liturgicalDay?: string
  celebration?: { name: string }
  readings?: {
    firstReading?: string
    psalm?: string
    secondReading?: string
    gospel?: string
  }
  usccbLink?: string
}

// Weekly themes keyed by liturgical season — fallback when API doesn't provide one
const seasonThemes: Record<string, { theme: string; note: string }> = {
  'Ordinary Time': {
    theme: 'Faithfulness in the everyday',
    note: 'The readings invite us to encounter God not in dramatic moments, but in the quiet faithfulness of ordinary life.',
  },
  'Advent': {
    theme: 'Waiting in hopeful expectation',
    note: 'Advent calls us to prepare our hearts — to wait with purpose, not passivity, for the coming of Christ.',
  },
  'Christmas': {
    theme: 'The Word made flesh',
    note: 'God enters human history as one of us. The Christmas season invites us to receive this gift with wonder.',
  },
  'Lent': {
    theme: 'Turning back to what matters',
    note: 'Lent is a season of return — through prayer, fasting, and almsgiving — to the things that endure.',
  },
  'Easter': {
    theme: 'Life that death cannot hold',
    note: 'The resurrection changes everything. Easter calls us to live as people for whom death is not the final word.',
  },
}

function getTheme(season: string) {
  for (const key of Object.keys(seasonThemes)) {
    if (season.toLowerCase().includes(key.toLowerCase())) {
      return seasonThemes[key]
    }
  }
  return seasonThemes['Ordinary Time']
}

function formatLabel(key: string): string {
  const map: Record<string, string> = {
    firstReading: 'First Reading',
    psalm: 'Responsorial Psalm',
    secondReading: 'Second Reading',
    gospel: 'Gospel',
  }
  return map[key] ?? key
}

function getSummary(label: string, reference: string): string {
  // Short plain-language summaries for common readings
  if (label === 'Responsorial Psalm') {
    return `A psalm of prayer and praise, inviting us to respond to God's word with our whole heart.`
  }
  if (label === 'Gospel') {
    return `The Gospel reading for today calls us to encounter Jesus and respond to his invitation to follow him more closely.`
  }
  return `This reading from ${reference} speaks to the heart of our faith, offering wisdom for the journey.`
}

export async function fetchTodaysReadings(): Promise<DailyReadings | null> {
  try {
    const today = new Date()

    // Always fetch the upcoming Sunday (or today if it is Sunday)
    const dayOfWeek = today.getDay() // 0 = Sunday
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
    const sunday = new Date(today)
    sunday.setDate(today.getDate() + daysUntilSunday)

    const year = sunday.getFullYear()
    const month = String(sunday.getMonth() + 1).padStart(2, '0')
    const day = String(sunday.getDate()).padStart(2, '0')
    const dateStr = `${month}-${day}`

    const res = await fetch(
      `https://cpbjr.github.io/catholic-readings-api/readings/${year}/${dateStr}.json`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) {
      const fallbackRes = await fetch(
        `https://cpbjr.github.io/catholic-readings-api/readings/${year - 1}/${dateStr}.json`,
        { next: { revalidate: 3600 } }
      )
      if (!fallbackRes.ok) return null
      const data: ApiResponse = await fallbackRes.json()
      return transform(data, sunday)
    }

    const data: ApiResponse = await res.json()
    return transform(data, sunday)
  } catch {
    return null
  }
}

function transform(data: ApiResponse, today: Date): DailyReadings {
  const season = data.season ?? 'Ordinary Time'
  const { theme, note } = getTheme(season)

  // Build liturgical day string
  const liturgicalDay = data.liturgicalDay
    ?? data.celebration?.name
    ?? `${season}`

  // Build readings array from whatever keys exist
  const readingsRaw = data.readings ?? {}
  const order = ['firstReading', 'psalm', 'secondReading', 'gospel'] as const
  const readings = order
    .filter((k) => readingsRaw[k])
    .map((k) => {
      const reference = readingsRaw[k]!
      const label = formatLabel(k)
      return {
        label,
        reference,
        excerpt: `"Come to the water, all you who are thirsty…"`,
        summary: getSummary(label, reference),
      }
    })

  return {
    date: today.toISOString().split('T')[0],
    season,
    liturgicalDay,
    theme,
    themeNote: note,
    readings,
    usccbLink: data.usccbLink ?? 'https://bible.usccb.org/bible/readings',
  }
}
