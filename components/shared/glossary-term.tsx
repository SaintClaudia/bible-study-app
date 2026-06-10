'use client'

import { useState, useRef } from 'react'
import { getGlossaryTerm } from '@/lib/glossary'
import { GlossarySheet } from './glossary-sheet'

interface GlossaryTermProps {
  id: string
  children: React.ReactNode
}

export function GlossaryTerm({ id, children }: GlossaryTermProps) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const term = getGlossaryTerm(id)

  if (!term) return <>{children}</>

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        className="underline decoration-dotted underline-offset-2 text-inherit font-inherit cursor-pointer hover:opacity-70 transition-opacity"
      >
        {children}
      </button>
      <GlossarySheet
        term={open ? term : null}
        onClose={() => setOpen(false)}
        anchorRef={buttonRef}
      />
    </>
  )
}
