'use client'

import { Church } from 'lucide-react'

export function MassTab({ onEnterChurchMode }: { onEnterChurchMode: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Mass Mode</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Follow along at Mass with real-time guidance through the Order of the Mass. Perfect for newcomers and seasoned Catholics alike.
        </p>
      </section>

      <div className="rounded-2xl border border-border bg-secondary/50 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">What to expect</p>
        <h2 className="mt-2 font-heading text-xl font-semibold text-foreground">Step-by-step guidance</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Church Mode walks you through each part of the Mass — when to stand, sit, or kneel — with the responses and a brief explanation of what's happening and why.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {['Introductory Rites', 'Liturgy of the Word', 'Liturgy of the Eucharist', 'Communion Rite', 'Concluding Rites'].map((part, i) => (
          <div key={part} className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-muted-foreground font-sans">
              {i + 1}
            </div>
            <span className="font-heading text-base font-medium text-foreground">{part}</span>
          </div>
        ))}
      </div>

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
