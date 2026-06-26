'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, BookOpen, Check, ChevronRight, Compass, ExternalLink, Info, Play, Share2, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { resourceGroups, type ResourceItem } from '@/lib/content'
import { useMusicPlayer, embedUrlToUri } from '@/components/music-player-context'
import { FilterChips, type FilterChip } from '@/components/discover/filter-chips'

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

function renderInline(text: string) {
  const parts = text.split(/\*([^*]+)\*/)
  return parts.map((part, i) => i % 2 === 1 ? <em key={i}>{part}</em> : part)
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
        className="inline-flex self-start items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span className="text-[10px] tracking-[0.2em] opacity-50">···</span>
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
        ) : Array.isArray(item.description) ? (
          <div className="flex flex-col gap-4">
            {item.description.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/90">{renderInline(para)}</p>
            ))}
          </div>
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

// ── Discover card ─────────────────────────────────────────────

function DiscoverListItem({
  item,
  groupLabel,
  onSelect,
  layout = 'row',
}: {
  item: ResourceItem
  groupLabel?: string
  onSelect: () => void
  layout?: 'row' | 'card'
}) {
  const isHero = item.display === 'hero'
  const isBook = item.display === 'book'

  if (layout === 'card') {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect() }}
        className="w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card text-left transition-colors hover:border-primary/40 active:opacity-60"
      >
        {/* Image area */}
        <div className="relative w-full bg-secondary" style={{ aspectRatio: '4/3' }}>
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className={cn(
                'absolute inset-0 h-full w-full',
                isBook ? 'object-contain p-3' : 'object-cover',
              )}
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-foreground/20">{item.name[0]}</span>
            </div>
          )}
        </div>
        {/* Content — overlaps image for books, stacks below for others */}
        <div className={cn('flex flex-col gap-3 p-5', isBook && 'relative z-10 -mt-16 bg-card')}>
          {groupLabel && (
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {groupLabel}
            </p>
          )}
          <p className="font-heading text-2xl font-normal leading-tight text-foreground">{item.name}</p>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
        </div>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full overflow-hidden rounded-2xl border border-border bg-card text-left transition-colors hover:border-primary/40 active:opacity-60"
    >
      {/* Full-width image for hero items */}
      {item.image && isHero && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-3.5 p-4">
        {item.image && !isHero && (
          <img
            src={item.image}
            alt={item.name}
            className={cn(
              'flex-shrink-0 object-cover',
              isBook ? 'h-16 w-11 rounded-md' : 'h-14 w-14 rounded-xl',
            )}
            style={isBook ? { boxShadow: '0 2px 8px rgba(0,0,0,0.15)' } : undefined}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        )}
        {!item.image && (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-base font-bold text-foreground">
            {item.name[0]}
          </div>
        )}

        <div className="min-w-0 flex-1">
          {groupLabel && (
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {groupLabel}
            </p>
          )}
          <p className="font-heading text-2xl font-normal leading-tight text-foreground">{item.name}</p>
          <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
        </div>

        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
    </button>
  )
}

// ── Main tab ───────────────────────────────────────────────────

type FilterId = 'all' | 'trending' | 'watch' | 'explore' | 'read'

const TRENDING_NAMES = ['The Chosen', 'Theology of Home']

const FILTER_CHIPS: FilterChip[] = [
  { id: 'all', label: 'All' },
  { id: 'trending', label: 'Trending', icon: <TrendingUp className="h-3.5 w-3.5" aria-hidden /> },
  { id: 'watch', label: 'Watch', icon: <Play className="h-3.5 w-3.5" aria-hidden /> },
  { id: 'explore', label: 'Explore', icon: <Compass className="h-3.5 w-3.5" aria-hidden /> },
  { id: 'read', label: 'Read', icon: <BookOpen className="h-3.5 w-3.5" aria-hidden /> },
]

export function DiscoverTab() {
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

  const nonListenGroups = resourceGroups.filter(g => g.kind !== 'listen')
  const watchGroup = resourceGroups.find(g => g.kind === 'watch')
  const exploreGroup = resourceGroups.find(g => g.kind === 'explore')
  const readGroup = resourceGroups.find(g => g.kind === 'read')

  const allItems = nonListenGroups.flatMap(g => g.items)

  const visibleItems: ResourceItem[] = filter === 'all'
    ? allItems
    : filter === 'trending'
      ? allItems.filter(i => TRENDING_NAMES.includes(i.name))
      : filter === 'watch'
        ? (watchGroup?.items ?? [])
        : filter === 'explore'
          ? (exploreGroup?.items ?? [])
          : (readGroup?.items ?? [])

  return (
    <div className="flex flex-col gap-8">
      <section className="pt-12">
        <h1 className="font-heading text-[3.25rem] font-normal leading-[1.05] tracking-[-0.01em] text-foreground">
          Deepen your faith
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          See what Catholics are reading, watching, listening to, and talking about.
        </p>
      </section>

      <FilterChips
        chips={FILTER_CHIPS}
        active={filter}
        onChange={(id) => setFilter(id as FilterId)}
        count={visibleItems.length}
      />

      <section className="flex flex-col gap-3">
        {(() => {
          const getGroup = (item: ResourceItem) => resourceGroups.find(g => g.items.some(i => i.name === item.name))
          const rowItems = visibleItems.filter(i => getGroup(i)?.kind === 'watch')
          const gridItems = visibleItems.filter(i => getGroup(i)?.kind !== 'watch')
          return (
            <>
              {rowItems.map(item => {
                const group = filter === 'all' ? getGroup(item) : undefined
                return (
                  <DiscoverListItem
                    key={item.name}
                    item={item}
                    groupLabel={group?.label}
                    onSelect={() => openItem(item)}
                    layout="row"
                  />
                )
              })}
              {gridItems.length > 0 && (
                <div className="grid grid-cols-2 items-start gap-3">
                  {gridItems.map(item => {
                    const group = filter === 'all' ? getGroup(item) : undefined
                    return (
                      <DiscoverListItem
                        key={item.name}
                        item={item}
                        groupLabel={group?.label}
                        onSelect={() => openItem(item)}
                        layout="card"
                      />
                    )
                  })}
                </div>
              )}
            </>
          )
        })()}
      </section>
    </div>
  )
}
