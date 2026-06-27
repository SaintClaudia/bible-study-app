'use client'

import { useCallback, useState } from 'react'
import { ArrowLeft, Check, Music2, Share2 } from 'lucide-react'
import { resourceGroups, type ResourceItem } from '@/lib/content'

const listenItems = resourceGroups.find(g => g.id === 'listen')?.items ?? []

// ── Share button ───────────────────────────────────────────────

function ShareButton({ item }: { item: ResourceItem }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const m = item.spotifyEmbedSrc?.match(/embed\/(album|playlist)\/([A-Za-z0-9]+)/)
    const url = m ? `https://open.spotify.com/${m[1]}/${m[2]}` : window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: item.name, text: item.note, url }) } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {}
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-80"
    >
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}

// ── Detail view ────────────────────────────────────────────────

function ListenDetail({ item, onBack }: { item: ResourceItem; onBack: () => void }) {
  return (
    <article className="flex flex-col gap-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex self-start items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span className="text-[10px] tracking-[0.2em] opacity-50">···</span>
      </button>

      {/* Header */}
      <header>
        {item.category && (
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {item.category}
          </p>
        )}
        <h1 className="mt-1 font-heading text-3xl font-semibold text-balance text-foreground">
          {item.name}
        </h1>
        {item.creator ? (
          <p className="mt-1.5 text-sm text-muted-foreground">
            By <span className="font-semibold text-foreground">{item.creator}</span>
          </p>
        ) : (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
        )}
      </header>

      {/* Spotify embed — shows full track list so the user can browse and skip */}
      {item.spotifyEmbedSrc ? (
        <div style={{ borderRadius: 12, overflow: 'hidden' }}>
          <iframe
            src={item.spotifyEmbedSrc}
            width="100%"
            height={380}
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ display: 'block', width: '100%' }}
          />
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-2xl bg-secondary">
          <Music2 className="h-10 w-10 text-muted-foreground" />
        </div>
      )}

      {/* Description */}
      {item.description && (
        <blockquote className="border-l-2 border-border pl-4">
          <p className="text-sm italic leading-relaxed text-foreground/80">
            {Array.isArray(item.description) ? item.description.join(' ') : item.description}
          </p>
        </blockquote>
      )}

      {/* Details */}
      {item.details && item.details.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-5">
          <ul className="flex flex-col gap-2.5">
            {item.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden />
                <span className="text-sm leading-relaxed text-foreground/90">{detail}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ShareButton item={item} />
    </article>
  )
}

// ── Main tab ───────────────────────────────────────────────────

export function ListenTab() {
  const [activeItem, setActiveItem] = useState<ResourceItem | null>(null)

  const openItem = useCallback((item: ResourceItem) => {
    setActiveItem(item)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const closeItem = useCallback(() => {
    setActiveItem(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  if (activeItem) {
    return <ListenDetail item={activeItem} onBack={closeItem} />
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="pt-12">
        <h1 className="font-heading text-[3.25rem] font-normal leading-[1.05] tracking-[-0.01em] text-balance text-foreground">Songs for the Soul</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Sacred music for prayer, study, and quiet reflection.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {listenItems.map(item => (
          <div
            key={item.name}
            role="button"
            tabIndex={0}
            onClick={() => openItem(item)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openItem(item) }}
            className="flex w-full flex-col cursor-pointer overflow-hidden rounded-2xl border border-border bg-card text-left transition-colors hover:bg-secondary/40 active:opacity-60"
          >
            <div className="relative w-full bg-secondary" style={{ aspectRatio: '4/3' }}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Music2 className="h-10 w-10 text-muted-foreground" aria-hidden />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="font-heading text-xl font-normal leading-tight text-foreground">{item.name}</p>
              <p className="mt-auto pt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
