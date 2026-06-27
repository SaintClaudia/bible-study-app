'use client'

import { useMusicPlayer } from '@/components/music-player-context'
import {
  IconCancel, IconChecked, IconDownArrow,
  IconFastForward, IconNextTrack, IconPause,
  IconPlay, IconPlus, IconPrevTrack, IconRewind,
} from '@/components/player-icons'
import { Music2 } from 'lucide-react'

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

        {/* Album art + info — tap to open expanded */}
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

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => toggleLike(nowPlaying.name)}
            className="p-1 text-muted-foreground hover:text-foreground active:opacity-60"
            aria-label={isLiked ? 'Remove from collection' : 'Add to collection'}
          >
            {isLiked
              ? <IconChecked className="h-7 w-7" />
              : <IconPlus className="h-7 w-7" />}
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="text-foreground active:opacity-60"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying
              ? <IconPause className="h-8 w-8" />
              : <IconPlay className="h-8 w-8" />}
          </button>

          {/* Separator */}
          <div className="w-px h-5 bg-border mx-0.5" aria-hidden />

          <button
            type="button"
            onClick={() => setNowPlaying(null)}
            className="p-1 text-muted-foreground hover:text-foreground active:opacity-60"
            aria-label="Dismiss"
          >
            <IconCancel className="h-7 w-7" />
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
  const hasMultipleTracks = false

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      <div className="flex-shrink-0" style={{ height: 'env(safe-area-inset-top)' }} />

      {/* Header */}
      <div className="mx-auto w-full max-w-2xl flex items-center justify-between px-5 py-4 flex-shrink-0">
        <button
          type="button"
          onClick={() => setPlayerExpanded(false)}
          className="text-muted-foreground hover:text-foreground active:opacity-60"
          aria-label="Minimize"
        >
          <IconDownArrow className="h-9 w-9" />
        </button>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Now Playing
        </p>
        <div className="w-9" />
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

        {/* Track info + add button */}
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
            className="mt-0.5 text-muted-foreground hover:text-foreground active:scale-90 transition-transform flex-shrink-0"
            aria-label={isLiked ? 'Remove from collection' : 'Add to collection'}
          >
            {isLiked
              ? <IconChecked className="h-7 w-7" />
              : <IconPlus className="h-7 w-7" />}
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
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground active:opacity-60"
            aria-label="Skip back 15 seconds"
          >
            <IconRewind className="h-8 w-8" />
            <span className="text-[9px] font-medium tracking-wide">15</span>
          </button>

          {/* Previous track */}
          <button
            type="button"
            onClick={prevTrack}
            disabled={!hasMultipleTracks}
            className="text-muted-foreground hover:text-foreground active:opacity-60 disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="Previous track"
          >
            <IconPrevTrack className="h-10 w-10" />
          </button>

          {/* Play / Pause — icon already includes the circle */}
          <button
            type="button"
            onClick={togglePlay}
            className="text-foreground hover:opacity-80 active:scale-95 transition-transform"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying
              ? <IconPause className="h-16 w-16" />
              : <IconPlay className="h-16 w-16" />}
          </button>

          {/* Next track */}
          <button
            type="button"
            onClick={nextTrack}
            disabled={!hasMultipleTracks}
            className="text-muted-foreground hover:text-foreground active:opacity-60 disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="Next track"
          >
            <IconNextTrack className="h-10 w-10" />
          </button>

          {/* Skip forward 15s */}
          <button
            type="button"
            onClick={skipForward}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground active:opacity-60"
            aria-label="Skip forward 15 seconds"
          >
            <IconFastForward className="h-8 w-8" />
            <span className="text-[9px] font-medium tracking-wide">15</span>
          </button>
        </div>
      </div>

      <div style={{ height: 'max(env(safe-area-inset-bottom), 32px)' }} />
    </div>
  )
}
