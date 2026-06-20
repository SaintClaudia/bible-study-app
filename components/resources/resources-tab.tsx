'use client'

import { useCallback, useState } from 'react'
import { ArrowLeft, BookOpen, Check, Compass, ExternalLink, Headphones, Info, Play, Share2, type LucideIcon } from 'lucide-react'
import { resourceGroups, type ResourceGroup, type ResourceItem } from '@/lib/content'

const groupIcons: Record<ResourceGroup['kind'], LucideIcon> = {
  watch: Play,
  read: BookOpen,
  explore: Compass,
  listen: Headphones,
}

// ── Share button ───────────────────────────────────────────────

function ShareButton({ item }: { item: ResourceItem }) {
  const [copied, setCopied] = useState(false)

  const getShareUrl = (): string => {
    if (item.href) return item.href
    if (item.spotifyEmbedSrc) {
      const m = item.spotifyEmbedSrc.match(/embed\/(album|playlist)\/([A-Za-z0-9]+)/)
      if (m) return `https://open.spotify.com/${m[1]}/${m[2]}`
    }
    return typeof window !== 'undefined' ? window.location.href : ''
  }

  const handleShare = async () => {
    const url = getShareUrl()
    if (!url) return
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: item.name, text: item.note, url })
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // clipboard unavailable
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-80"
    >
      {copied
        ? <Check className="h-4 w-4" aria-hidden />
        : <Share2 className="h-4 w-4" aria-hidden />}
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}

// ── Detail view ────────────────────────────────────────────────

function ResourceDetail({ item, onBack }: { item: ResourceItem; onBack: () => void }) {
  const isBook = item.display === 'book'
  const isHero = item.display === 'hero'
  const isApp = item.display === 'app'

  return (
    <article className="flex flex-col gap-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Resources
      </button>

      {/* Image */}
      {item.image && isHero && (
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '16/9' }}>
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      )}

      {item.image && isBook && (
        <div className="flex justify-center">
          <div
            className="w-36 overflow-hidden rounded-lg bg-secondary"
            style={{
              aspectRatio: '2/3',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.12)',
            }}
          >
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          </div>
        </div>
      )}

      {item.image && isApp && item.spotifyEmbedSrc && (
        <div className="flex justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-56 h-56 rounded-2xl object-cover"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.14)' }}
          />
        </div>
      )}

      {item.image && isApp && !item.spotifyEmbedSrc && (
        <div className="flex justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="h-20 w-20 rounded-xl object-cover shadow-md"
          />
        </div>
      )}

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
          <p className="mt-2 text-sm text-muted-foreground">
            By <span className="font-semibold text-foreground">{item.creator}</span>
          </p>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {item.note}
          </p>
        )}
      </header>

      {/* Description */}
      {item.description && (
        item.creator ? (
          <blockquote className="border-l-2 border-border pl-4">
            <p className="text-sm italic leading-relaxed text-foreground/80">
              {item.description}
            </p>
          </blockquote>
        ) : (
          <p className="text-base leading-relaxed text-foreground/90">
            {item.description}
          </p>
        )
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

      {/* Spotify embed */}
      {item.spotifyEmbedSrc && (
        <iframe
          src={item.spotifyEmbedSrc}
          width="100%"
          height="152"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          allowFullScreen
          style={{ borderRadius: '12px' }}
        />
      )}

      {/* Page note */}
      {item.pageNote && (
        <section className="rounded-2xl border border-border bg-secondary/60 p-5">
          <div className="flex items-start gap-2.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden />
            <p className="text-sm leading-relaxed text-foreground/90">{item.pageNote}</p>
          </div>
        </section>
      )}

      {/* External link CTA */}
      {item.href && (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          {item.display === 'app' || item.category === 'Podcast'
            ? `Open ${item.name}`
            : `Visit ${item.name}`}
        </a>
      )}

      {/* Share */}
      <ShareButton item={item} />
    </article>
  )
}

// ── List cards (now buttons) ───────────────────────────────────

function HeroCard({ item, onSelect }: { item: ResourceItem; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className="block w-full text-left">
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '16/9' }}>
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-heading text-xl font-semibold text-white leading-tight">{item.name}</p>
          <p className="mt-1 text-sm text-white/80 leading-snug">{item.note}</p>
        </div>
      </div>
    </button>
  )
}

function AppIcon({ item, onSelect }: { item: ResourceItem; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="block w-full rounded-2xl border border-border bg-card text-left transition-colors hover:border-primary/40"
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-12 w-12 rounded-lg object-cover shadow-sm flex-shrink-0"
            onError={(e) => {
              const el = e.currentTarget
              el.style.display = 'none'
              const fallback = el.nextElementSibling as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className="h-12 w-12 items-center justify-center rounded-lg bg-secondary text-base font-bold text-foreground flex-shrink-0"
          style={{ display: item.image ? 'none' : 'flex' }}
        >
          {item.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">{item.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-2">{item.note}</p>
        </div>
      </div>
    </button>
  )
}

function BookCard({ item, onSelect }: { item: ResourceItem; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className="flex flex-col gap-2 text-left">
      <div
        className="aspect-[2/3] overflow-hidden rounded-lg bg-secondary"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.12)' }}
      >
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-3">
            <p className="text-xs font-medium text-muted-foreground text-center leading-snug">{item.name}</p>
          </div>
        )}
      </div>
      <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2">{item.name}</p>
    </button>
  )
}

function SiteCard({ item, onSelect }: { item: ResourceItem; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="block w-full rounded-2xl border border-border bg-card text-left transition-colors hover:border-primary/40"
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        {item.image && (
          <img
            src={item.image}
            alt=""
            aria-hidden="true"
            className="h-9 w-9 rounded-lg object-cover flex-shrink-0"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        )}
        <span className="flex-1 min-w-0">
          <span className="flex items-center gap-1 font-heading text-base font-semibold text-foreground">
            {item.name}
          </span>
          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{item.note}</span>
        </span>
      </div>
    </button>
  )
}

// ── Main tab ───────────────────────────────────────────────────

export function ResourcesTab() {
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
    return <ResourceDetail item={activeItem} onBack={closeItem} />
  }

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="font-heading text-3xl font-semibold text-balance text-foreground">
          Resources
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A few recommendations to watch, read, and explore as you grow in the faith.
        </p>
      </section>

      {resourceGroups.map((group) => {
        const Icon = groupIcons[group.kind]
        const heroItems = group.items.filter(i => i.display === 'hero')
        const appItems = group.items.filter(i => i.display === 'app')
        const bookItems = group.items.filter(i => i.display === 'book')
        const siteItems = group.items.filter(i => !i.display)

        return (
          <section key={group.id} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-foreground">
              <Icon className="h-4 w-4" aria-hidden />
              <h2 className="text-xs font-semibold uppercase tracking-wide">{group.label}</h2>
            </div>

            {heroItems.length > 0 && (
              <div className="flex flex-col gap-2.5">
                {heroItems.map(item => (
                  <HeroCard key={item.name} item={item} onSelect={() => openItem(item)} />
                ))}
              </div>
            )}

            {appItems.length > 0 && (
              <div className="flex flex-col gap-2">
                {appItems.map(item => (
                  <AppIcon key={item.name} item={item} onSelect={() => openItem(item)} />
                ))}
              </div>
            )}

            {bookItems.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {bookItems.map(item => (
                  <BookCard key={item.name} item={item} onSelect={() => openItem(item)} />
                ))}
              </div>
            )}

            {siteItems.length > 0 && (
              <div className={`flex flex-col gap-2.5 ${bookItems.length > 0 ? 'mt-1' : ''}`}>
                {siteItems.map(item => (
                  <SiteCard key={item.name} item={item} onSelect={() => openItem(item)} />
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
