'use client'

import { useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { massSections } from '@/lib/content'

export function ChurchMode({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0)
  const section = massSections[index]
  const total = massSections.length
  const atStart = index === 0
  const atEnd = index === total - 1

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center justify-between px-5 py-4">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Exit
        </button>
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Church Mode
        </span>
        <button
          type="button"
          onClick={onExit}
          aria-label="Exit Church Mode"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4.5 w-4.5" aria-hidden />
        </button>
      </header>

      <div className="px-5">
        <div className="flex gap-1.5" aria-hidden>
          {massSections.map((s, i) => (
            <span
              key={s.id}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors',
                i <= index ? 'bg-primary' : 'bg-border',
              )}
            />
          ))}
        </div>
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-7 py-10 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Step {index + 1} of {total}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold italic text-balance leading-tight">
          {section.title}
        </h1>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-5 py-2.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">
            {section.posture}
          </span>
        </div>

        <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
          {section.description}
        </p>

        {section.responses && section.responses.length > 0 && (
          <div className="mt-8 w-full max-w-md space-y-3">
            {section.responses.map((r, i) => (
              <div key={i} className="rounded-2xl bg-secondary/60 px-5 py-4">
                <p className="text-sm italic text-muted-foreground">
                  {r.prompt}
                </p>
                <p className="mt-1 font-heading text-lg font-semibold text-foreground">
                  {r.response}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="flex items-center justify-between gap-3 px-5 pb-8 pt-4">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={atStart}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border text-foreground transition-opacity disabled:opacity-30"
          aria-label="Previous step"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>

        {atEnd ? (
          <button
            type="button"
            onClick={onExit}
            className="flex h-14 flex-1 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground"
          >
            Mass complete
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground"
          >
            Next
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        )}
      </footer>
    </div>
  )
}
