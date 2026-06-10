'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { type GlossaryTerm } from '@/lib/glossary'

interface GlossarySheetProps {
  term: GlossaryTerm | null
  onClose: () => void
  anchorRef?: React.RefObject<HTMLButtonElement | null>
}

export function GlossarySheet({ term, onClose, anchorRef }: GlossarySheetProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    if (term) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [term])

  if (!term) return null

  const steps = [
    { step: '1', gesture: 'Forehead', words: '"In the name of the Father…"' },
    { step: '2', gesture: 'Chest', words: '"…and of the Son…"' },
    { step: '3', gesture: 'Left shoulder', words: '"…and of the Holy…"' },
    { step: '4', gesture: 'Right shoulder', words: '"…Spirit. Amen."' },
  ]

  const content = (
    <>
      <p className="text-[15px] leading-relaxed text-foreground/80">
        {term.definition}
      </p>

      {term.id === 'sign-of-the-cross' && (
        <div className="mt-4 flex flex-col gap-2">
          {steps.map(({ step, gesture, words }) => (
            <div key={step} className="flex items-center gap-3 rounded-xl bg-secondary/60 px-3 py-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold flex-shrink-0">
                {step}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{gesture}</p>
                <p className="text-xs text-muted-foreground italic">{words}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {term.also && term.id !== 'sign-of-the-cross' && (
        <p className="mt-4 text-sm text-muted-foreground italic border-t border-border pt-4">
          {term.also}
        </p>
      )}
    </>
  )

  return (
    <>
      {/* ── MOBILE: bottom sheet ── */}
      <div className="md:hidden">
        <div
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden
        />
        <div
          className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-2xl rounded-t-3xl bg-background border-t border-x border-border px-6 pt-5 pb-10 animate-in slide-in-from-bottom duration-300"
          role="dialog"
          aria-modal
          aria-label={term.term}
        >
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border" />
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="font-heading text-2xl font-semibold text-foreground">{term.term}</h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 mt-0.5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {content}
        </div>
      </div>

      {/* ── DESKTOP: tooltip popover ── */}
      <div className="hidden md:block">
        <div
          className="fixed inset-0 z-40"
          onClick={onClose}
          aria-hidden
        />
        <div
          ref={tooltipRef}
          role="tooltip"
          className="fixed z-50 w-80 rounded-2xl bg-background border border-border shadow-xl px-5 py-4 animate-in fade-in zoom-in-95 duration-150"
          style={{
            top: anchorRef?.current
              ? Math.min(
                  anchorRef.current.getBoundingClientRect().bottom + 8,
                  window.innerHeight - 320
                )
              : '50%',
            left: anchorRef?.current
              ? Math.min(
                  anchorRef.current.getBoundingClientRect().left,
                  window.innerWidth - 340
                )
              : '50%',
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-heading text-lg font-semibold text-foreground">{term.term}</h3>
            <button
              type="button"
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          {content}
        </div>
      </div>
    </>
  )
}
