'use client'

import { ArrowRight } from 'lucide-react'
import type { ResourceItem } from '@/lib/content'

interface FullBleedSeriesCardProps {
  item: ResourceItem
  onSelect: () => void
  /** Label shown as a chip below the image (e.g. "Watch"). Overrides item.category. */
  categoryLabel?: string
}

export function FullBleedSeriesCard({ item, onSelect, categoryLabel }: FullBleedSeriesCardProps) {
  const label = categoryLabel ?? item.category

  return (
    <button type="button" onClick={onSelect} className="block w-full text-left">
      {/* Full-bleed image: -mx-5 counteracts the main px-5.
          Fixed pixel height so desktop width doesn't blow up the aspect-ratio. */}
      <div className="-mx-5 relative h-[335px] overflow-hidden bg-secondary md:rounded-2xl">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
          />
        )}
        <div className="absolute bottom-4 right-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
            <ArrowRight className="h-4 w-4 text-white" aria-hidden />
          </div>
        </div>
      </div>

      {/* Content below image */}
      <div className="mt-4 flex flex-col gap-1">
        {label && (
          <span className="inline-flex w-fit items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        )}
        <h2 className="mt-1 font-heading text-2xl font-semibold leading-tight text-foreground">
          {item.name}
        </h2>
        {item.note && (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
        )}
      </div>
    </button>
  )
}
