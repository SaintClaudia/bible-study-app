'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { fetchSundayReadings, type DailyReadings } from '@/lib/readings'

export function ReadingsTab({ onEnterChurchMode }: { onEnterChurchMode?: () => void }) {
  const [data, setData] = useState<DailyReadings | null>(null)
  const [loading, setLoading] = useState(true)
  const [openReading, setOpenReading] = useState<number | null>(null)
  const [introDismissed, setIntroDismissed, hydrated] = useLocalStorage(
    'bs.readingsIntroDismissed',
    false,
  )

  const sunday = (() => {
    const today = new Date()
    const day = today.getDay()
    const s = new Date(today)
    s.setDate(today.getDate() + (day === 0 ? 0 : 7 - day))
    return s
  })()

  const dateStr = sunday.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  useEffect(() => {
    fetchSundayReadings().then((d) => {
      setData(d)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-5 animate-pulse pt-2">
        <div className="h-3 w-36 rounded-full bg-secondary"/>
        <div className="h-16 w-3/4 rounded-xl bg-secondary"/>
        <div className="h-6 w-24 rounded-full bg-secondary"/>
        <div className="h-28 rounded-2xl bg-secondary"/>
        <div className="h-14 rounded-2xl bg-secondary"/>
        <div className="h-14 rounded-2xl bg-secondary"/>
        <div className="h-14 rounded-2xl bg-secondary"/>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center gap-4 pt-20 text-center">
        <p className="font-heading text-xl text-foreground">Readings unavailable</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Could not load this Sunday&apos;s readings. Please check your connection and try again.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Date + Title */}
      <section>
        <p className="text-sm text-muted-foreground">{dateStr}</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold leading-tight text-foreground">
          {data.liturgicalDay.replace(/\s+in\s+Ordinary\s+Time/i, '')}
        </h1>
        <span className="mt-2 inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          {data.season}
        </span>
      </section>

      {/* Intro context card — dismissible, stays gone once closed */}
      {hydrated && !introDismissed && (
        <section className="relative rounded-2xl bg-secondary px-5 py-4 pr-12">
          <button
            type="button"
            onClick={() => setIntroDismissed(true)}
            aria-label="Dismiss"
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          This Sunday&apos;s readings
        </h2>

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
                    className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200', open && 'rotate-180')}
                    aria-hidden
                  />
                </button>

                {open && (
                  <div className="border-t border-border">
                    {/* Full scripture text */}
                    {reading.fullText ? (
                      <div className="px-5 pt-5 pb-4">
                        <div className="font-heading text-[17px] leading-[1.85] text-foreground whitespace-pre-wrap">
                          {reading.fullText}
                        </div>
                      </div>
                    ) : (
                      <div className="px-5 pt-5 pb-2">
                        <p className="text-sm text-muted-foreground italic">
                          Full text unavailable — please see the USCCB website for this reading.
                        </p>
                      </div>
                    )}

                    {/* Plain language summary */}
                    <div className="mx-4 mb-4 rounded-xl bg-secondary/60 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
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
