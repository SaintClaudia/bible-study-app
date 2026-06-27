'use client'

import { ChevronDown, Music2, Pause, Play, X } from 'lucide-react'
import { useMusicPlayer } from '@/components/music-player-context'

function fmt(secs: number) {
  if (!isFinite(secs) || isNaN(secs)) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// ── Collapsed bar (lives inside the nav) ───────────────────────

export function MiniPlayerBar() {
  const {
    nowPlaying, setNowPlaying,
    playerExpanded, setPlayerExpanded,
    isPlaying, togglePlay,
  } = useMusicPlayer()

  if (!nowPlaying?.audioSrc || playerExpanded) return null

  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-2xl flex items-center px-4 py-3 gap-2">
        <button
          type="button"
          onClick={() => setPlayerExpanded(true)}
          className="flex items-center gap-3 flex-1 min-w-0 text-left active:opacity-60"
          aria-label="Open player"
        >
          {nowPlaying.image ? (
            <img src={nowPlaying.image} alt="" className="h-10 w-10 rounded-lg object-cover flex-shrink-0" />
          ) : (
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <Music2 className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{nowPlaying.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {nowPlaying.creator ?? nowPlaying.category ?? 'Music'}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className="p-2.5 rounded-full bg-foreground text-background active:opacity-60 flex-shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying
            ? <Pause className="h-4 w-4" fill="currentColor" />
            : <Play className="h-4 w-4 translate-x-px" fill="currentColor" />}
        </button>

        <button
          type="button"
          onClick={() => setNowPlaying(null)}
          className="p-2.5 text-muted-foreground hover:text-foreground active:opacity-60 flex-shrink-0"
          aria-label="Dismiss player"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ── Expanded full-screen player ─────────────────────────────────

export function MiniPlayer() {
  const {
    nowPlaying, playerExpanded, setPlayerExpanded,
    isPlaying, togglePlay,
    currentTime, duration, seek,
  } = useMusicPlayer()

  if (!nowPlaying?.audioSrc || !playerExpanded) return null

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      <div className="flex-shrink-0 bg-background" style={{ height: 'env(safe-area-inset-top)' }} />

      <div className="mx-auto w-full max-w-2xl flex items-center px-5 py-4 border-b border-border flex-shrink-0">
        <button
          type="button"
          onClick={() => setPlayerExpanded(false)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground active:opacity-60"
          aria-label="Minimize player"
        >
          <ChevronDown className="h-5 w-5" />
          Minimize
        </button>
        <p className="flex-1 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground pr-20">
          Now Playing
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-10 gap-8">
        {nowPlaying.image ? (
          <img
            src={nowPlaying.image}
            alt=""
            className="w-full max-w-xs aspect-square rounded-2xl object-cover shadow-2xl"
          />
        ) : (
          <div className="w-full max-w-xs aspect-square rounded-2xl bg-secondary flex items-center justify-center">
            <Music2 className="h-20 w-20 text-muted-foreground" />
          </div>
        )}

        <div className="text-center w-full max-w-xs">
          <p className="text-xl font-semibold text-foreground">{nowPlaying.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {nowPlaying.creator ?? nowPlaying.category}
          </p>
        </div>

        <div className="w-full max-w-xs flex flex-col gap-2">
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.1}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full accent-foreground cursor-pointer"
            aria-label="Seek"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={togglePlay}
          className="h-16 w-16 rounded-full bg-foreground flex items-center justify-center text-background hover:opacity-80 active:opacity-60"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying
            ? <Pause className="h-7 w-7" fill="currentColor" />
            : <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />}
        </button>
      </div>

      <div style={{ height: 'max(env(safe-area-inset-bottom), 24px)' }} />
    </div>
  )
}
