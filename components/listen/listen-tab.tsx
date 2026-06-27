'use client'

import { useCallback, useState } from 'react'
import { ArrowLeft, Check, Heart, Music2, Pause, Play } from 'lucide-react'
import { resourceGroups, type ResourceItem } from '@/lib/content'
import { useMusicPlayer } from '@/components/music-player-context'
import { cn } from '@/lib/utils'

const listenItems = resourceGroups.find(g => g.id === 'listen')?.items ?? []

function fmt(secs: number) {
  if (!isFinite(secs) || isNaN(secs)) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// ── Custom seek bar ─────────────────────────────────────────────

function SeekBar({ currentTime, duration, seek }: { currentTime: number; duration: number; seek: (t: number) => void }) {
  const pct = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0
  return (
    <div className="relative w-full py-2">
      <div className="relative h-1 rounded-full bg-border">
        <div className="absolute left-0 top-0 h-full rounded-full bg-foreground" style={{ width: `${pct}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-foreground shadow" style={{ left: `calc(${pct}% - 7px)` }} />
      </div>
      <input
        type="range"
        min={0}
        max={duration || 1}
        step={0.1}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Seek"
      />
    </div>
  )
}

// ── Inline audio player (shown in detail view) ─────────────────

function InlineAudioPlayer({ item }: { item: ResourceItem }) {
  const { nowPlaying, setNowPlaying, isPlaying, togglePlay, currentTime, duration, seek, likedTracks, toggleLike } = useMusicPlayer()
  const isThis = nowPlaying?.name === item.name
  const playing = isThis && isPlaying
  const isLiked = likedTracks.has(item.name)

  const handlePlay = () => {
    if (isThis) togglePlay()
    else setNowPlaying(item)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handlePlay}
          className="h-12 w-12 rounded-full bg-foreground flex items-center justify-center text-background hover:opacity-80 active:scale-95 transition-transform flex-shrink-0 shadow"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing
            ? <Pause className="h-5 w-5" fill="currentColor" />
            : <Play className="h-5 w-5 translate-x-px" fill="currentColor" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {item.creator ?? item.category}
          </p>
        </div>
        <button
          type="button"
          onClick={() => toggleLike(item.name)}
          className="p-2 text-muted-foreground hover:text-foreground active:scale-90 transition-transform flex-shrink-0"
          aria-label={isLiked ? 'Unlike' : 'Add to Liked Songs'}
        >
          <Heart className={cn('h-5 w-5 transition-all', isLiked && 'fill-foreground text-foreground')} />
        </button>
      </div>

      {isThis && (
        <div className="flex flex-col gap-0.5">
          <SeekBar currentTime={currentTime} duration={duration} seek={seek} />
          <div className="flex justify-between text-xs text-muted-foreground px-0.5">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      )}
    </div>
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

      {item.image ? (
        <div className="flex justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-56 h-56 rounded-2xl object-cover shadow-lg"
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-2xl bg-secondary">
          <Music2 className="h-12 w-12 text-muted-foreground" />
        </div>
      )}

      {item.audioSrc && <InlineAudioPlayer item={item} />}

      {item.description && (
        <blockquote className="border-l-2 border-border pl-4">
          <p className="text-sm italic leading-relaxed text-foreground/80">
            {Array.isArray(item.description) ? item.description.join(' ') : item.description}
          </p>
        </blockquote>
      )}

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
    </article>
  )
}

// ── Main tab ───────────────────────────────────────────────────

export function ListenTab() {
  const [activeItem, setActiveItem] = useState<ResourceItem | null>(null)
  const { likedTracks } = useMusicPlayer()

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
              {/* Liked badge */}
              {likedTracks.has(item.name) && (
                <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
                  <Heart className="h-3.5 w-3.5 fill-foreground text-foreground" />
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
