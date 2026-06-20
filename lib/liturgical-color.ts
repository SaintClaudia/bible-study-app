// Maps the liturgical season to its color for the season dot.
//
// Base season colors are stable year to year, so they're derived from the
// `season` field already maintained in readings-data.json — no date math,
// nothing to break when the calendar rolls over.
//
// The handful of Sundays whose color departs from their season (the two rose
// Sundays, the red days, Christ the King) are handled by an optional `color`
// field on the week's data. Set it only on those weeks; leave it off the rest.

export type LiturgicalColor = 'green' | 'violet' | 'white' | 'red' | 'rose'

// Mid-tone values chosen to stay visible on both light and dark surfaces.
// `white` shows as gold, since a white dot would vanish on a light pill.
export const LITURGICAL_COLOR_HEX: Record<LiturgicalColor, string> = {
  green: '#2E7D52', // Ordinary Time
  violet: '#7C6BB0', // Advent, Lent
  white: '#C8A951', // Christmas, Easter, feasts of the Lord
  red: '#C0473C', // Pentecost, Palm Sunday, Good Friday, martyrs
  rose: '#C77DA0', // Laetare & Gaudete Sundays
}

const SEASON_TO_COLOR: Record<string, LiturgicalColor> = {
  'ordinary time': 'green',
  advent: 'violet',
  lent: 'violet',
  christmas: 'white',
  easter: 'white',
}

// Falls back to green (Ordinary Time) for any unrecognized season string.
export function seasonToColor(season: string): LiturgicalColor {
  return SEASON_TO_COLOR[season.trim().toLowerCase()] ?? 'green'
}

// Prefers an explicit per-week override, otherwise derives from the season.
export function getLiturgicalColor(input: {
  season: string
  color?: LiturgicalColor
}): LiturgicalColor {
  return input.color ?? seasonToColor(input.season)
}
