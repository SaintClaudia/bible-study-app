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
  count?: number
}

export function FilterChips({ chips, active, onChange, count }: FilterChipsProps) {
  return (
    <div className="-mx-5 flex items-center gap-3">
      <div className="flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 pl-5 pr-3 pb-1" style={{ width: 'max-content' }}>
          {chips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => onChange(chip.id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors active:opacity-60',
                active === chip.id
                  ? 'border border-foreground/40 bg-card text-foreground'
                  : 'border border-border bg-secondary text-muted-foreground hover:bg-secondary/80',
              )}
            >
              {chip.icon}
              {chip.label}
            </button>
          ))}
        </div>
      </div>
      {count !== undefined && (
        <span className="shrink-0 pr-5 text-xs text-muted-foreground">{count} items</span>
      )}
    </div>
  )
}
