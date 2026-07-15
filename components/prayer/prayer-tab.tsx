'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { prayers } from '@/lib/content'

export function PrayerTab() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-8">

      <section className="pt-12">
        <h1 className="font-heading text-[3.25rem] font-normal leading-[1.05] tracking-[-0.01em] text-foreground">
          Prayer
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The prayers every Catholic carries with them — for the Rosary, the sacraments, and everyday life.
        </p>
      </section>

      <section className="flex flex-col gap-2.5">
        {prayers.map((prayer) => {
          const isOpen = open === prayer.id
          return (
            <div key={prayer.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : prayer.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <span className="font-heading text-xl font-normal text-foreground">
                  {prayer.title}
                </span>
                <ChevronDown
                  className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200', isOpen && 'rotate-180')}
                  aria-hidden
                />
              </button>

              {isOpen && (
                <div className="border-t border-border">
                  <div className="px-5 pb-4 pt-5">
                    <div className="text-base leading-[1.85] text-foreground/90 whitespace-pre-wrap">
                      {prayer.text}
                    </div>
                  </div>
                  <div className="mx-4 mb-4 rounded-xl bg-secondary/60 px-4 py-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {prayer.note}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </section>

    </div>
  )
}
