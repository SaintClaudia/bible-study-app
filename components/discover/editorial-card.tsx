'use client'

import type { ResourceItem } from '@/lib/content'

interface EditorialCardProps {
  item: ResourceItem
  onSelect: () => void
  /** CSS gradient string for the full-bleed background */
  bgGradient?: string
}

export function EditorialCard({
  item,
  onSelect,
  bgGradient = 'linear-gradient(160deg, #1e3a8a 0%, #2563eb 100%)',
}: EditorialCardProps) {
  return (
    <button type="button" onClick={onSelect} className="block w-full text-left">
      {/* Full-bleed gradient with book cover centered inside */}
      <div
        className="-mx-5 flex items-center justify-center px-12 py-10 md:rounded-2xl"
        style={{ background: bgGradient }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-48 rounded-lg object-cover"
            style={{
              aspectRatio: '2/3',
              boxShadow: '0 12px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)',
            }}
          />
        ) : (
          <div
            className="w-48 rounded-lg bg-white/10"
            style={{ aspectRatio: '2/3' }}
          />
        )}
      </div>

      {/* Content below */}
      <div className="mt-4 flex flex-col gap-1">
        {item.category && (
          <span className="inline-flex w-fit items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {item.category}
          </span>
        )}
        <h2 className="font-heading text-2xl font-semibold leading-tight text-foreground">
          {item.name}
        </h2>
        {item.note && (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
        )}
      </div>
    </button>
  )
}
