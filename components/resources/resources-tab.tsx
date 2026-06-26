'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, BookOpen, Check, Compass, ExternalLink, Headphones, Info, Play, Share2, type LucideIcon } from 'lucide-react'
import { resourceGroups, type ResourceGroup, type ResourceItem } from '@/lib/content'
import { useMusicPlayer, embedUrlToUri } from '@/components/music-player-context'
import { FilterChips, type FilterChip } from '@/components/discover/filter-chips'
import { FullBleedSeriesCard } from '@/components/discover/full-bleed-series-card'
import { EditorialCard } from '@/components/discover/editorial-card'

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
  const { setNowPlaying, isSpotifyReady, isPremium, playSpotify } = useMusicPlayer()

  const handleSDKPlay = () => {
    setNowPlaying(item)
    const uri = item.spotifyEmbedSrc ? embedUrlToUri(item.spotifyEmbedSrc) : null
    if (uri) playSpotify(uri)
  }

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

      {/* Spotify — SDK play button (Premium) or inline embed (everyone else) */}
      {item.spotifyEmbedSrc && isSpotifyReady && isPremium === true && (
        <button
          type="button"
          onClick={handleSDKPlay}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
        >
          <Play className="h-4 w-4" fill="currentColor" aria-hidden />
          Play
        </button>
      )}

      {item.spotifyEmbedSrc && !(isSpotifyReady && isPremium === true) && (
        <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <iframe
            src={item.spotifyEmbedSrc}
            width="100%"
            height="352"
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            allowFullScreen
            style={{ display: 'block', width: '100%' }}
          />
        </div>
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
      <div className="relative w-full overflow-hidden rounded-2xl bg-secondary" style={{ aspectRatio: '16/9' }}>
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: 'center' }}
          />
        )}
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

// ── Discover list item (recommended section) ──────────────────

function DiscoverListItem({
  item,
  groupLabel,
  onSelect,
}: {
  item: ResourceItem
  groupLabel?: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-secondary/40 active:opacity-60"
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="h-12 w-12 flex-shrink-0 rounded-lg object-cover shadow-sm"
          onError={(e) => {
            const el = e.currentTarget
            el.style.display = 'none'
            const fallback = el.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'flex'
          }}
        />
      ) : null}
      <div
        className="h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-base font-bold text-foreground"
        style={{ display: item.image ? 'none' : 'flex' }}
      >
        {item.name[0]}
      </div>
      <div className="min-w-0 flex-1">
        {groupLabel && (
          <span className="mb-1 inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {groupLabel}
          </span>
        )}
        <p className="text-sm font-semibold leading-tight text-foreground">{item.name}</p>
        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground">{item.note}</p>
      </div>
    </button>
  )
}

// ── Main tab ───────────────────────────────────────────────────

type FilterId = 'all' | 'watch' | 'explore' | 'read'

const FILTER_CHIPS: FilterChip[] = [
  { id: 'all', label: 'All' },
  { id: 'watch', label: 'Watch', icon: <Play className="h-3.5 w-3.5" aria-hidden /> },
  { id: 'explore', label: 'Explore', icon: <Compass className="h-3.5 w-3.5" aria-hidden /> },
  { id: 'read', label: 'Read', icon: <BookOpen className="h-3.5 w-3.5" aria-hidden /> },
]

export function ResourcesTab() {
  const [activeItem, setActiveItem] = useState<ResourceItem | null>(null)
  const [filter, setFilter] = useState<FilterId>('all')
  const { setNowPlaying } = useMusicPlayer()

  const activeItemRef = useRef(activeItem)
  const setNowPlayingRef = useRef(setNowPlaying)
  useEffect(() => { activeItemRef.current = activeItem }, [activeItem])
  useEffect(() => { setNowPlayingRef.current = setNowPlaying }, [setNowPlaying])

  useEffect(() => {
    return () => {
      if (activeItemRef.current?.spotifyEmbedSrc) {
        setNowPlayingRef.current(activeItemRef.current)
      }
    }
  }, [])

  const openItem = useCallback((item: ResourceItem) => {
    if (item.spotifyEmbedSrc) setNowPlaying(null)
    setActiveItem(item)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setNowPlaying])

  const closeItem = useCallback(() => {
    if (activeItem?.spotifyEmbedSrc) setNowPlaying(activeItem)
    setActiveItem(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeItem, setNowPlaying])

  if (activeItem) {
    return <ResourceDetail item={activeItem} onBack={closeItem} />
  }

  // Derive filtered item sets from existing data
  const nonListenGroups = resourceGroups.filter(g => g.kind !== 'listen')
  const watchGroup = resourceGroups.find(g => g.kind === 'watch')
  const exploreGroup = resourceGroups.find(g => g.kind === 'explore')
  const readGroup = resourceGroups.find(g => g.kind === 'read')

  // Featured: first hero item from watch group (The Chosen)
  const featuredItem = watchGroup?.items.find(i => i.display === 'hero') ?? null

  // Editorial: first book item from read group with editorial treatment (Theology of Home)
  const editorialItem = readGroup?.items.find(i => i.name === 'Theology of Home') ?? null

  // Recommended: all explore apps + USCCB from read group
  const usccb = readGroup?.items.find(i => i.name === 'USCCB') ?? null
  const recommendedItems: ResourceItem[] = filter === 'all'
    ? [
        ...(exploreGroup?.items.filter(i => i.display === 'app') ?? []),
        ...(usccb ? [usccb] : []),
      ]
    : filter === 'watch'
      ? (watchGroup?.items ?? [])
      : filter === 'explore'
        ? (exploreGroup?.items ?? [])
        : (readGroup?.items ?? [])

  const totalItems = nonListenGroups.reduce((acc, g) => acc + g.items.length, 0)

  return (
    <div className="flex flex-col gap-8">
      {/* Heading — matches Guide tab pattern exactly */}
      <section className="flex flex-col gap-4 pt-12">
        <h1 className="font-heading text-[3.25rem] font-normal leading-[1.05] tracking-[-0.01em] text-foreground">
          Deepen your faith
        </h1>
      </section>

      {/* Featured series card */}
      {featuredItem && (filter === 'all' || filter === 'watch') && (
        <FullBleedSeriesCard item={featuredItem} categoryLabel="Watch" onSelect={() => openItem(featuredItem)} />
      )}

      <FilterChips
        chips={FILTER_CHIPS}
        active={filter}
        onChange={(id) => setFilter(id as FilterId)}
      />

      {/* Recommended section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {filter === 'all' ? 'Recommended' : FILTER_CHIPS.find(c => c.id === filter)?.label ?? 'Recommended'}
          </p>
          <span className="text-xs text-muted-foreground">
            {filter === 'all' ? `${totalItems} items` : `${recommendedItems.length} items`}
          </span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card divide-y divide-border">
          {recommendedItems.map(item => {
            const group = resourceGroups.find(g => g.items.some(i => i.name === item.name))
            return (
              <DiscoverListItem
                key={item.name}
                item={item}
                groupLabel={group?.label}
                onSelect={() => openItem(item)}
              />
            )
          })}
        </div>
      </section>

      {/* Editorial card */}
      {editorialItem && (filter === 'all' || filter === 'read') && (
        <EditorialCard
          item={editorialItem}
          onSelect={() => openItem(editorialItem)}
          bgGradient="linear-gradient(160deg, #1e3a8a 0%, #2563eb 100%)"
        />
      )}

      {/* Remaining read items (non-editorial) when filter is read */}
      {filter === 'read' && (
        <>
          {(readGroup?.items.filter(i => i.display === 'book' && i.name !== 'Theology of Home') ?? []).length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {(readGroup?.items.filter(i => i.display === 'book' && i.name !== 'Theology of Home') ?? []).map(item => (
                <BookCard key={item.name} item={item} onSelect={() => openItem(item)} />
              ))}
            </div>
          )}
          {(readGroup?.items.filter(i => !i.display) ?? []).map(item => (
            <SiteCard key={item.name} item={item} onSelect={() => openItem(item)} />
          ))}
        </>
      )}
    </div>
  )
}
