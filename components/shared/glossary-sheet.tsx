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

          {/* Secondary name / etymology */}
          {term.also && (
            <p className="mt-4 text-sm text-muted-foreground italic border-t border-border pt-4">
              {term.also}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
