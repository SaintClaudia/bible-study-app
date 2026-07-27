'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { prayers } from '@/lib/content'
import { PrayerRequestForm } from '@/components/prayer/prayer-request-form'

function IconPrayingHands({ className }: { className?: string }) {
  return (
    // Always inverted to white — this icon sits on the CTA's dark surface in both light and dark theme.
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/praying-hands.webp" alt="" className={cn(className, 'object-contain invert')} />
  )
}

export function PrayerTab() {
  const [open, setOpen] = useState<string | null>(null)
  const [requestFormOpen, setRequestFormOpen] = useState(false)

  return (
    <div className="flex flex-col gap-8">

      <section className="pt-12">
        <h1 className="font-heading text-[3.25rem] font-normal leading-[1.05] tracking-[-0.01em] text-foreground">
          Prayer
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Learn the essential prayers of the Catholic faith—prayers you&rsquo;ll encounter in the Rosary, the sacraments, and everyday Catholic life.
        </p>
        <p className="mt-4 text-base font-semibold text-foreground">
          A simple way to begin
        </p>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          Choose one prayer at a time and learn it in small sections. Repeat one or two lines each day until they feel familiar, then add the next section. Take your time&mdash;prayer is learned through faithful practice, not all at once.
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

      <button
        type="button"
        onClick={() => setRequestFormOpen(true)}
        className="relative flex w-full items-center gap-3.5 overflow-hidden rounded-2xl bg-neutral-900 p-5 text-left dark:bg-neutral-800"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
          <IconPrayingHands className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-lg font-normal leading-tight text-white">Submit a Prayer Request</p>
          <p className="mt-0.5 text-sm" style={{ color: '#89877E' }}>
            Share what&apos;s on your heart
          </p>
        </div>
      </button>

      {requestFormOpen && <PrayerRequestForm onExit={() => setRequestFormOpen(false)} />}

    </div>
  )
}
