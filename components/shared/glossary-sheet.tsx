'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { type GlossaryTerm } from '@/lib/glossary'

interface GlossarySheetProps {
  term: GlossaryTerm | null
  onClose: () => void
}

export function GlossarySheet({ term, onClose }: GlossarySheetProps) {
  // Close on escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (term) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [term])

  if (!term) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Bottom sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-2xl animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-modal
        aria-label={term.term}
      >
        <div className="rounded-t-3xl bg-background border-t border-x border-border px-6 pt-5 pb-10">

          {/* Handle */}
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border" />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              {term.term}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 mt-0.5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Definition */}
          <p className="text-[15px] leading-relaxed text-foreground/80">
            {term.definition}
          </p>

          {/* Special: Sign of the Cross illustrated steps */}
          {term.id === 'sign-of-the-cross' && (
            <div className="mt-4 flex flex-col gap-3">
              {[
                { step: '1', gesture: 'Forehead', words: '"In the name of the Father…"', svg: (
                  <svg viewBox="0 0 60 60" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="30" cy="14" r="8"/>
                    <path d="M22 22c0 0-4 4-4 12h24c0-8-4-12-4-12"/>
                    <path d="M30 8 L30 2 M26 5 L34 5" strokeWidth="2.5" stroke="#1a1a18"/>
                    <circle cx="30" cy="4" r="2" fill="#1a1a18"/>
                  </svg>
                )},
                { step: '2', gesture: 'Chest', words: '"…and of the Son…"', svg: (
                  <svg viewBox="0 0 60 60" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="30" cy="14" r="8"/>
                    <path d="M22 22c0 0-4 4-4 12h24c0-8-4-12-4-12"/>
                    <circle cx="30" cy="28" r="2.5" fill="#1a1a18"/>
                  </svg>
                )},
                { step: '3', gesture: 'Left shoulder', words: '"…and of the Holy…"', svg: (
                  <svg viewBox="0 0 60 60" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="30" cy="14" r="8"/>
                    <path d="M22 22c0 0-4 4-4 12h24c0-8-4-12-4-12"/>
                    <circle cx="18" cy="26" r="2.5" fill="#1a1a18"/>
                  </svg>
                )},
                { step: '4', gesture: 'Right shoulder', words: '"…Spirit. Amen."', svg: (
                  <svg viewBox="0 0 60 60" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="30" cy="14" r="8"/>
                    <path d="M22 22c0 0-4 4-4 12h24c0-8-4-12-4-12"/>
                    <circle cx="42" cy="26" r="2.5" fill="#1a1a18"/>
                  </svg>
                )},
              ].map(({ step, gesture, words, svg }) => (
                <div key={step} className="flex items-center gap-4 rounded-xl bg-secondary/50 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{gesture}</p>
                    <p className="text-sm text-muted-foreground italic">{words}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Secondary name / etymology */}
          {term.also && term.id !== 'sign-of-the-cross' && (
            <p className="mt-4 text-sm text-muted-foreground italic border-t border-border pt-4">
              {term.also}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
