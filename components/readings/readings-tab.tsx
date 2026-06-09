'use client'

import { useState } from 'react'
import { ChevronDown, Church } from 'lucide-react'
import { cn } from '@/lib/utils'
import { sundayReadings } from '@/lib/content'

export function ReadingsTab({ onEnterChurchMode }: { onEnterChurchMode: () => void }) {
  const data = sundayReadings
  const [openReading, setOpenReading] = useState<number | null>(0)

  // Format today's date like "Sunday, June 14"
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  return (
    <div className="flex flex-col gap-6">

      {/* Date + Title */}
      <section>
        <p className="text-sm text-muted-foreground">{dateStr}</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold leading-tight text-foreground text-balance">
          {data.liturgicalDay}
        </h1>
        <span className="mt-2 inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          Ordinary Time
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
