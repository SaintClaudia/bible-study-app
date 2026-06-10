'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Church } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fetchSundayReadings, type DailyReadings } from '@/lib/readings'

export function ReadingsTab({ onEnterChurchMode }: { onEnterChurchMode: () => void }) {
  const [data, setData] = useState<DailyReadings | null>(null)
  const [loading, setLoading] = useState(true)
  const [openReading, setOpenReading] = useState<number | null>(null)

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

      {/* Enter Church Mode */}
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
