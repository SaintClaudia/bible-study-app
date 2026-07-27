'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { fetchSaintOfTheDay, type SaintOfTheDay } from '@/lib/saints'
import { LITURGICAL_COLOR_HEX } from '@/lib/liturgical-color'

// Preview-only override so the pilot batch can be reviewed on any date, e.g.
// http://localhost:3000/?saintDate=07-31#saint — remove once all 12 months are seeded.
function getPreviewDate(): Date | null {
  if (typeof window === 'undefined') return null
  const override = new URLSearchParams(window.location.search).get('saintDate')
  if (!override) return null
  const [month, day] = override.split('-').map(Number)
  if (!month || !day) return null
  return new Date(new Date().getFullYear(), month - 1, day)
}

export function SaintTab() {
  const [saint, setSaint] = useState<SaintOfTheDay | null>(null)
  const [loading, setLoading] = useState(true)
  const [displayDate, setDisplayDate] = useState(() => new Date())
  const [introDismissed, setIntroDismissed, hydrated] = useLocalStorage(
    'bs.saintIntroDismissed',
    false,
  )

  useEffect(() => {
    const date = getPreviewDate() ?? new Date()
    setDisplayDate(date)
    fetchSaintOfTheDay(date).then((s) => {
      setSaint(s)
      setLoading(false)
    })
  }, [])

  const today = displayDate.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  if (loading) {
    return (
      <div className="flex flex-col gap-8 animate-pulse pt-12">
        <div className="flex flex-col gap-3">
          <div className="h-2 w-32 rounded-full bg-secondary" />
          <div className="h-14 w-3/4 rounded-xl bg-secondary" />
          <div className="h-6 w-24 rounded-full bg-secondary" />
        </div>
        <div className="aspect-square w-full rounded-2xl bg-secondary" />
        <div className="h-24 rounded-2xl bg-secondary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="pt-12">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {today}
        </p>
        <h1 className="mt-3 font-heading text-[3.25rem] font-normal leading-[1.05] tracking-[-0.01em] text-foreground text-balance">
          {saint ? saint.name : 'Saint of the Day'}
        </h1>
        {saint && (
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: LITURGICAL_COLOR_HEX[saint.color] }}
              aria-hidden="true"
            />
            {saint.feastRank}
          </span>
        )}
      </section>

      {/* Intro context card — dismissible */}
      {hydrated && !introDismissed && (
        <section className="relative rounded-2xl bg-secondary px-5 py-4 pr-12">
          <button
            type="button"
            onClick={() => setIntroDismissed(true)}
            aria-label="Dismiss"
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Saint of the Day
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">
            Every day, the Church remembers a saint or holy figure whose life points back
            to Christ. Their stories remind us that ordinary people can become
            extraordinary through God&apos;s grace.
          </p>
        </section>
      )}

      {saint ? (
        <>
          <div className="relative w-full overflow-hidden rounded-2xl bg-secondary" style={{ aspectRatio: '1/1' }}>
            <Image src={saint.image} alt={saint.name} fill className="object-cover object-top" />
          </div>

          <section className="flex flex-col gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Their Story
              </p>
              <div className="mt-2 flex flex-col gap-3">
                {saint.bio.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-foreground">{paragraph}</p>
                ))}
              </div>
            </div>

            {saint.whyRemembered && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Why We Remember Them Today
                </p>
                <p className="mt-2 text-base leading-relaxed text-foreground">{saint.whyRemembered}</p>
              </div>
            )}

            {saint.patronOf && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Patron of
                </p>
                <p className="mt-1.5 text-base text-foreground">{saint.patronOf}</p>
              </div>
            )}

            {saint.facts && saint.facts.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Facts
                </p>
                <ul className="flex flex-col gap-2.5">
                  {saint.facts.map((fact, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <p className="font-heading text-xl text-foreground">No major feast today</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Today is an ordinary weekday on the calendar — check back tomorrow for the next saint.
          </p>
        </section>
      )}
    </div>
  )
}
