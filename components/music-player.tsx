'use client'

import { ChevronDown, Heart, Music2, Pause, Play, SkipBack, SkipForward, X } from 'lucide-react'
import { useMusicPlayer } from '@/components/music-player-context'
import { cn } from '@/lib/utils'

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
        <div className="absolute left-0 top-0 h-full rounded-full bg-foreground transition-none" style={{ width: `${pct}%` }} />
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

// ── Collapsed mini bar (lives inside the nav) ───────────────────

export function MiniPlayerBar() {
  const {
    nowPlaying, setNowPlaying,
    playerExpanded, setPlayerExpanded,
    isPlaying, togglePlay,
    likedTracks, toggleLike,
  } = useMusicPlayer()

  if (!nowPlaying?.audioSrc || playerExpanded) return null

  const isLiked = likedTracks.has(nowPlaying.name)

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-2xl flex items-center px-4 py-2.5 gap-3">

        {/* Album art + track info — tapping opens expanded player */}
        <button
          type="button"
          onClick={() => setPlayerExpanded(true)}
          className="flex items-center gap-3 flex-1 min-w-0 text-left active:opacity-60"
          aria-label="Open player"
        >
          {nowPlaying.image ? (
            <img src={nowPlaying.image} alt="" className="h-10 w-10 rounded-lg object-cover flex-shrink-0 shadow-sm" />
          ) : (
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <Music2 className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate leading-snug">{nowPlaying.name}</p>
            <p className="text-xs text-muted-foreground truncate leading-snug">
              {nowPlaying.creator ?? nowPlaying.category ?? 'Music'}
            </p>
          </div>
        </button>

        {/* Controls — heart, play/pause, divider, close */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={() => toggleLike(nowPlaying.name)}
            className="p-2 text-muted-foreground hover:text-foreground active:opacity-60"
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart className={cn('h-4 w-4', isLiked && 'fill-foreground text-foreground')} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="p-2 rounded-full bg-foreground text-background active:opacity-60"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying
              ? <Pause className="h-4 w-4" fill="currentColor" />
              : <Play className="h-4 w-4 translate-x-px" fill="currentColor" />}
          </button>

          {/* Visual separator */}
          <div className="w-px h-5 bg-border mx-1" aria-hidden />

          <button
            type="button"
            onClick={() => setNowPlaying(null)}
            className="p-2 text-muted-foreground hover:text-foreground active:opacity-60"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
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
    skipBack, skipForward, nextTrack, prevTrack,
    likedTracks, toggleLike,
  } = useMusicPlayer()

  if (!nowPlaying?.audioSrc || !playerExpanded) return null

  const isLiked = likedTracks.has(nowPlaying.name)
  const hasMultipleTracks = false // will be true when more tracks are added

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      <div className="flex-shrink-0" style={{ height: 'env(safe-area-inset-top)' }} />

      {/* Header */}
      <div className="mx-auto w-full max-w-2xl flex items-center justify-between px-5 py-4 flex-shrink-0">
        <button
          type="button"
          onClick={() => setPlayerExpanded(false)}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground active:opacity-60"
          aria-label="Minimize"
        >
          <ChevronDown className="h-5 w-5" />
          Minimize
        </button>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Now Playing
        </p>
        {/* Spacer to balance the header */}
        <div className="w-20" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-7 overflow-hidden">

        {/* Album art */}
        {nowPlaying.image ? (
          <img
            src={nowPlaying.image}
            alt=""
            className="w-full max-w-[280px] aspect-square rounded-2xl object-cover shadow-2xl"
          />
        ) : (
          <div className="w-full max-w-[280px] aspect-square rounded-2xl bg-secondary flex items-center justify-center">
            <Music2 className="h-20 w-20 text-muted-foreground" />
          </div>
        )}

        {/* Track info + like */}
        <div className="w-full max-w-[280px] flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xl font-semibold text-foreground leading-tight">{nowPlaying.name}</p>
            <p className="mt-0.5 text-sm text-muted-foreground truncate">
              {nowPlaying.creator ?? nowPlaying.category}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleLike(nowPlaying.name)}
            className="mt-0.5 p-1.5 text-muted-foreground hover:text-foreground active:scale-90 transition-transform flex-shrink-0"
            aria-label={isLiked ? 'Unlike' : 'Add to Liked Songs'}
          >
            <Heart className={cn('h-5 w-5 transition-all', isLiked && 'fill-foreground text-foreground scale-110')} />
          </button>
        </div>

        {/* Seek bar */}
        <div className="w-full max-w-[280px] flex flex-col gap-0.5">
          <SeekBar currentTime={currentTime} duration={duration} seek={seek} />
          <div className="flex justify-between text-xs text-muted-foreground px-0.5">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* Playback controls */}
        <div className="w-full max-w-[280px] flex items-center justify-between">

          {/* Skip back 15s */}
          <button
            type="button"
            onClick={skipBack}
            className="flex flex-col items-center gap-0.5 p-2 text-muted-foreground hover:text-foreground active:opacity-60"
            aria-label="Skip back 15 seconds"
          >
            <SkipBack className="h-5 w-5" />
            <span className="text-[9px] font-medium tracking-wide">15</span>
          </button>

          {/* Previous track */}
          <button
            type="button"
            onClick={prevTrack}
            disabled={!hasMultipleTracks}
            className="p-2 text-muted-foreground hover:text-foreground active:opacity-60 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous track"
          >
            <SkipBack className="h-6 w-6" fill="currentColor" />
          </button>

          {/* Play / Pause */}
          <button
            type="button"
            onClick={togglePlay}
            className="h-16 w-16 rounded-full bg-foreground flex items-center justify-center text-background hover:opacity-80 active:scale-95 transition-transform shadow-lg"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying
              ? <Pause className="h-7 w-7" fill="currentColor" />
              : <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />}
          </button>

          {/* Next track */}
          <button
            type="button"
            onClick={nextTrack}
            disabled={!hasMultipleTracks}
            className="p-2 text-muted-foreground hover:text-foreground active:opacity-60 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next track"
          >
            <SkipForward className="h-6 w-6" fill="currentColor" />
          </button>

          {/* Skip forward 15s */}
          <button
            type="button"
            onClick={skipForward}
            className="flex flex-col items-center gap-0.5 p-2 text-muted-foreground hover:text-foreground active:opacity-60"
            aria-label="Skip forward 15 seconds"
          >
            <SkipForward className="h-5 w-5" />
            <span className="text-[9px] font-medium tracking-wide">15</span>
          </button>
        </div>
      </div>

      <div style={{ height: 'max(env(safe-area-inset-bottom), 32px)' }} />
    </div>
  )
}
