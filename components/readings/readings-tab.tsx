'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { fetchSundayReadings, type DailyReadings } from '@/lib/readings'
import { getLiturgicalColor, LITURGICAL_COLOR_HEX } from '@/lib/liturgical-color'

export function ReadingsTab() {
  const [data, setData] = useState<DailyReadings | null>(null)
  const [loading, setLoading] = useState(true)
  const [openReading, setOpenReading] = useState<number | null>(null)
  const [introDismissed, setIntroDismissed, hydrated] = useLocalStorage(
    'bs.readingsIntroDismissed',
    false,
  )

  useEffect(() => {
    fetchSundayReadings().then((d) => {
      setData(d)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-8 animate-pulse pt-12">
        <div className="flex flex-col gap-3">
          <div className="h-2 w-32 rounded-full bg-secondary" />
          <div className="h-20 w-3/4 rounded-xl bg-secondary" />
          <div className="h-6 w-24 rounded-full bg-secondary" />
        </div>
        <div className="h-24 rounded-2xl bg-secondary" />
        <div className="flex flex-col gap-2.5">
          <div className="h-14 rounded-2xl bg-secondary" />
          <div className="h-14 rounded-2xl bg-secondary" />
          <div className="h-14 rounded-2xl bg-secondary" />
          <div className="h-14 rounded-2xl bg-secondary" />
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center gap-4 pt-20 text-center">
        <p className="font-heading text-xl text-foreground">Readings unavailable</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Could not load this Sunday&apos;s readings. Please check your connection and try again.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Title — matches Guide / Discover heading pattern */}
      <section className="pt-12">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {new Date(data.date + 'T12:00:00Z').toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC',
          })}
        </p>
        <h1 className="mt-3 font-heading text-[3.25rem] font-normal leading-[1.05] tracking-[-0.01em] text-foreground text-balance">
          {data.liturgicalDay.replace(/\s+in\s+Ordinary\s+Time/i, '')}
        </h1>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: LITURGICAL_COLOR_HEX[getLiturgicalColor(data)] }}
            aria-hidden="true"
          />
          {data.season}
        </span>
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
            Why these readings
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">
            Catholics everywhere will hear these same Scriptures this Sunday. We share
            them here so you can carry them with you through the week.
          </p>
        </section>
      )}

      {/* Readings */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            This Sunday&apos;s readings
          </h2>
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
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {reading.label}
                  </span>
                  <span className="block font-heading text-xl font-normal text-foreground">
                    {reading.reference}
                  </span>
                </span>
                <ChevronDown
                  className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200', open && 'rotate-180')}
                  aria-hidden
                />
              </button>

              {open && (
                <div className="border-t border-border">
                  {reading.fullText ? (
                    <div className="px-5 pb-4 pt-5">
                      <div className="text-base leading-[1.85] text-foreground/90 whitespace-pre-wrap">
                        {reading.fullText}
                      </div>
                    </div>
                  ) : (
                    <div className="px-5 pb-2 pt-5">
                      <p className="text-sm italic text-muted-foreground">
                        Full text unavailable — please see the USCCB website for this reading.
                      </p>
                    </div>
                  )}

                  <div className="mx-4 mb-4 rounded-xl bg-secondary/60 px-4 py-3">
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      In plain language
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {reading.summary}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        </div>
      </section>

    </div>
  )
}
