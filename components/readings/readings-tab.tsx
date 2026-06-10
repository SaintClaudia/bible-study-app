'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Church, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fetchTodaysReadings, type DailyReadings } from '@/lib/readings'

export function ReadingsTab({ onEnterChurchMode }: { onEnterChurchMode: () => void }) {
  const [data, setData] = useState<DailyReadings | null>(null)
  const [loading, setLoading] = useState(true)
  const [openReading, setOpenReading] = useState<number | null>(0)

  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
  const sunday = new Date(today)
  sunday.setDate(today.getDate() + daysUntilSunday)

  const dateStr = sunday.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  useEffect(() => {
    fetchTodaysReadings().then((d) => {
      setData(d)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-4 w-40 rounded bg-secondary"/>
        <div className="h-20 rounded-2xl bg-secondary"/>
        <div className="h-32 rounded-2xl bg-secondary"/>
        <div className="h-16 rounded-2xl bg-secondary"/>
        <div className="h-16 rounded-2xl bg-secondary"/>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center gap-4 pt-16 text-center">
        <p className="font-heading text-xl text-foreground">Readings unavailable</p>
        <p className="text-sm text-muted-foreground">
          Could not load today&apos;s readings. Please check your connection and try again.
        </p>
        <a
          href="https://bible.usccb.org/bible/readings"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
        >
          View on USCCB <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Date + Title */}
      <section>
        <p className="text-sm text-muted-foreground">{dateStr}</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold leading-tight text-foreground text-balance">
          {data.liturgicalDay}
        </h1>
        <span className="mt-2 inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          {data.season}
        </span>
      </section>

      {/* Theme of the week */}
      <section className="rounded-2xl border border-border bg-secondary/50 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Theme of the week
        </p>
        <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">
          {data.theme}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {data.themeNote}
        </p>
      </section>

      {/* Readings */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            This Sunday&apos;s readings
          </h2>
          <a
            href={data.usccbLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            USCCB <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="flex flex-col gap-2.5">
          {data.readings.map((reading, i) => {
            const open = openReading === i
            return (
              <div key={reading.reference} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpenReading(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                >
                  <span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {reading.label}
                    </span>
                    <span className="block font-heading text-lg font-medium text-foreground">
                      {reading.reference}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
                    aria-hidden
                  />
                </button>
                {open && (
                  <div className="border-t border-border px-4 py-4">
                    <p className="font-heading text-base italic leading-relaxed text-foreground/90">
                      {reading.excerpt}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      In plain language
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {reading.summary}
                    </p>
                    <a
                      href={data.usccbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Read full text on USCCB <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Enter Church Mode CTA */}
      <button
        type="button"
        onClick={onEnterChurchMode}
        className="flex items-center justify-center gap-2.5 rounded-2xl bg-foreground px-6 py-4 text-base font-semibold text-background shadow-sm transition-opacity hover:opacity-80 active:scale-[0.99]"
      >
        <Church className="h-5 w-5" aria-hidden />
        Enter Church Mode
      </button>

    </div>
  )
}
