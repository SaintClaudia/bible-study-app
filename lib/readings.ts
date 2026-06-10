// Two APIs working together:
// 1. Catholic Readings API → what to read (references)
// 2. bible-api.com → full scripture text for each reference

export interface Reading {
  label: string
  reference: string
  fullText: string
  summary: string
}

export interface DailyReadings {
  date: string
  season: string
  liturgicalDay: string
  theme: string
  themeNote: string
  readings: Reading[]
  usccbLink: string
}

interface CatholicApiResponse {
  date?: string
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

interface BibleApiResponse {
  reference: string
  verses: { book_name: string; chapter: number; verse: number; text: string }[]
  text: string
  translation_name: string
}

const seasonThemes: Record<string, { theme: string; note: string }> = {
  'Ordinary Time': {
    theme: 'Faithfulness in the everyday',
    note: 'The readings invite us to encounter God not in dramatic moments, but in the quiet faithfulness of ordinary life.',
  },
  'Advent': {
    theme: 'Waiting in hopeful expectation',
    note: 'Advent calls us to prepare our hearts — to wait with purpose for the coming of Christ.',
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
    if (season.toLowerCase().includes(key.toLowerCase())) return seasonThemes[key]
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
  if (label === 'Responsorial Psalm') {
    return `A psalm of prayer and praise, inviting us to respond to God's word with gratitude and trust.`
  }
  if (label === 'Gospel') {
    return `In this Gospel passage, Jesus invites us to encounter him more deeply and to respond to his call with our whole lives.`
  }
  if (label === 'First Reading') {
    return `This reading from the Old Testament sets the stage for the Gospel — showing how God has always been at work in human history.`
  }
  return `This reading speaks to the heart of our faith and how we are called to live it out in community.`
}

async function fetchFullText(reference: string): Promise<string> {
  try {
    // bible-api.com accepts natural references like "Matthew 9:36-10:8"
    const encoded = encodeURIComponent(reference)
    const res = await fetch(`https://bible-api.com/${encoded}?translation=web`, {
      next: { revalidate: 86400 } // cache 24 hours
    })
    if (!res.ok) return ''
    const data: BibleApiResponse = await res.json()
    // Return clean text, trim excessive whitespace
    return data.text?.trim() ?? ''
  } catch {
    return ''
  }
}

function getUpcomingSunday(): Date {
  const today = new Date()
  const day = today.getDay() // 0 = Sunday
  const daysUntilSunday = day === 0 ? 0 : 7 - day
  const sunday = new Date(today)
  sunday.setDate(today.getDate() + daysUntilSunday)
  return sunday
}

export async function fetchSundayReadings(): Promise<DailyReadings | null> {
  try {
    const sunday = getUpcomingSunday()
    const year = sunday.getFullYear()
    const month = String(sunday.getMonth() + 1).padStart(2, '0')
    const day = String(sunday.getDate()).padStart(2, '0')
    const dateStr = `${month}-${day}`

    // Step 1: Get the reading references from Catholic Readings API
    let catholicData: CatholicApiResponse | null = null
    const tryYear = async (y: number) => {
      const res = await fetch(
        `https://cpbjr.github.io/catholic-readings-api/readings/${y}/${dateStr}.json`,
        { next: { revalidate: 3600 } }
      )
      if (!res.ok) return null
      return res.json() as Promise<CatholicApiResponse>
    }

    catholicData = await tryYear(year)
    if (!catholicData) catholicData = await tryYear(year - 1)
    if (!catholicData) return null

    const season = catholicData.season ?? 'Ordinary Time'
    const { theme, note } = getTheme(season)
    const liturgicalDay = catholicData.liturgicalDay ?? catholicData.celebration?.name ?? season

    // Step 2: Fetch full scripture text for each reading in parallel
    const readingsRaw = catholicData.readings ?? {}
    const order = ['firstReading', 'psalm', 'secondReading', 'gospel'] as const

    const readingsWithText: Reading[] = await Promise.all(
      order
        .filter((k) => readingsRaw[k])
        .map(async (k) => {
          const reference = readingsRaw[k]!
          const label = formatLabel(k)
          const fullText = await fetchFullText(reference)
          return {
            label,
            reference,
            fullText,
            summary: getSummary(label, reference),
          }
        })
    )

    return {
      date: sunday.toISOString().split('T')[0],
      season,
      liturgicalDay,
      theme,
      themeNote: note,
      readings: readingsWithText,
      usccbLink: catholicData.usccbLink ?? 'https://bible.usccb.org/bible/readings',
    }
  } catch {
    return null
  }
}
