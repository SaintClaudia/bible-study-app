'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type FilterChip = {
  id: string
  label: string
  icon?: ReactNode
}

interface FilterChipsProps {
  chips: FilterChip[]
  active: string
  onChange: (id: string) => void
}

export function FilterChips({ chips, active, onChange }: FilterChipsProps) {
  return (
    <div className="-mx-5 overflow-x-auto">
      <div className="flex gap-2 px-5 pb-1" style={{ width: 'max-content' }}>
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => onChange(chip.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors active:opacity-60',
              active === chip.id
                ? 'bg-foreground text-background'
                : 'border border-border bg-secondary text-muted-foreground hover:border-primary/40',
            )}
          >
            {chip.icon}
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  )
}
