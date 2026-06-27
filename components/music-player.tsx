'use client'

import { useMusicPlayer } from '@/components/music-player-context'
import {
  IconChecked, IconDownArrow, IconFastForward,
  IconList, IconNextTrack, IconPause,
  IconPlay, IconPlus, IconPrevTrack, IconRewind,
} from '@/components/player-icons'
import { Music2, Volume2 } from 'lucide-react'

function fmt(secs: number) {
  if (!isFinite(secs) || isNaN(secs)) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// ── Shared seek bar ─────────────────────────────────────────────

function SeekBar({ currentTime, duration, seek }: { currentTime: number; duration: number; seek: (t: number) => void }) {
  const pct = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0
  return (
    <div className="relative w-full py-2">
      <div className="relative h-1 rounded-full bg-border">
        <div className="absolute left-0 top-0 h-full rounded-full bg-foreground" style={{ width: `${pct}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-foreground shadow" style={{ left: `calc(${pct}% - 7px)` }} />
      </div>
      <input
        type="range" min={0} max={duration || 1} step={0.1} value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Seek"
      />
    </div>
  )
}

// ── Mini player bar ─────────────────────────────────────────────

export function MiniPlayerBar() {
  const {
    nowPlaying, playerExpanded, setPlayerExpanded,
    isPlaying, togglePlay,
    currentTime, duration, seek,
    likedTracks, toggleLike,
    navigateToListen,
  } = useMusicPlayer()

  if (!nowPlaying?.audioSrc || playerExpanded) return null

  const isLiked = likedTracks.has(nowPlaying.name)
  const pct = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0

  return (
    <div className="bg-background">
      {/* Progress bar — full width, sits above the controls row */}
      <div className="relative h-1 bg-border/40">
        <div className="absolute left-0 top-0 h-full bg-foreground/60 transition-none" style={{ width: `${pct}%` }} />
        <input
          type="range" min={0} max={duration || 1} step={0.1} value={currentTime}
          onChange={(e) => seek(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Seek"
        />
      </div>

      {/* Main row */}
      <div className="mx-auto max-w-2xl flex items-center px-4 py-3 gap-3">

        {/* Album art — tap to expand */}
        <button
          type="button"
          onClick={() => setPlayerExpanded(true)}
          className="flex-shrink-0 active:opacity-60"
          aria-label="Open player"
        >
          {nowPlaying.image ? (
            <img src={nowPlaying.image} alt="" className="h-12 w-12 rounded-[10px] object-cover shadow-sm" />
          ) : (
            <div className="h-12 w-12 rounded-[10px] bg-secondary flex items-center justify-center">
              <Music2 className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </button>

        {/* Track info — tap to expand */}
        <button
          type="button"
          onClick={() => setPlayerExpanded(true)}
          className="min-w-0 flex-1 text-left active:opacity-60"
          aria-label="Open player"
        >
          <p className="text-sm font-bold text-foreground truncate leading-snug">{nowPlaying.name}</p>
          <p className="text-xs text-muted-foreground truncate leading-snug">
            {nowPlaying.creator ?? nowPlaying.category ?? 'Music'}
          </p>
        </button>

        {/* Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={navigateToListen}
            className="text-foreground active:opacity-60"
            aria-label="Go to track"
          >
            <IconList className="h-8 w-8" />
          </button>

          <button
            type="button"
            onClick={() => toggleLike(nowPlaying.name)}
            className="text-foreground active:opacity-60"
            aria-label={isLiked ? 'Remove from collection' : 'Add to collection'}
          >
            {isLiked ? <IconChecked className="h-8 w-8" /> : <IconPlus className="h-8 w-8" />}
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="text-foreground active:opacity-60"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <IconPause className="h-8 w-8" /> : <IconPlay className="h-8 w-8" />}
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
    volume, setVolume,
  } = useMusicPlayer()

  if (!nowPlaying?.audioSrc || !playerExpanded) return null

  const isLiked = likedTracks.has(nowPlaying.name)
  const hasMultipleTracks = listenItemCount > 1

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
          <IconDownArrow className="h-7 w-7" />
        </button>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Now Playing</p>
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6 overflow-hidden">

        {/* Album art */}
        {nowPlaying.image ? (
          <img src={nowPlaying.image} alt="" className="w-full max-w-[280px] aspect-square rounded-2xl object-cover shadow-2xl" />
        ) : (
          <div className="w-full max-w-[280px] aspect-square rounded-2xl bg-secondary flex items-center justify-center">
            <Music2 className="h-20 w-20 text-muted-foreground" />
          </div>
        )}

        {/* Track info + add */}
        <div className="w-full max-w-[280px] flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xl font-semibold text-foreground leading-tight">{nowPlaying.name}</p>
            <p className="mt-0.5 text-sm text-muted-foreground truncate">{nowPlaying.creator ?? nowPlaying.category}</p>
          </div>
          <button
            type="button"
            onClick={() => toggleLike(nowPlaying.name)}
            className="mt-0.5 text-muted-foreground hover:text-foreground active:scale-90 transition-transform flex-shrink-0"
            aria-label={isLiked ? 'Remove from collection' : 'Add to collection'}
          >
            {isLiked ? <IconChecked className="h-7 w-7" /> : <IconPlus className="h-7 w-7" />}
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
          <button type="button" onClick={skipBack}
            className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground active:opacity-60"
            aria-label="Skip back 15 seconds">
            <IconRewind className="h-7 w-7" />
            <span className="text-[9px] font-medium tracking-widest text-muted-foreground">15</span>
          </button>

          <button type="button" onClick={prevTrack} disabled={!hasMultipleTracks}
            className="text-muted-foreground hover:text-foreground active:opacity-60 disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="Previous track">
            <IconPrevTrack className="h-9 w-9" />
          </button>

          {/* Main play/pause — circular container for visual anchor */}
          <button type="button" onClick={togglePlay}
            className="h-16 w-16 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 active:scale-95 transition-transform shadow-md"
            aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying
              ? <IconPause className="h-7 w-7" />
              : <IconPlay className="h-7 w-7 translate-x-0.5" />}
          </button>

          <button type="button" onClick={nextTrack} disabled={!hasMultipleTracks}
            className="text-muted-foreground hover:text-foreground active:opacity-60 disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="Next track">
            <IconNextTrack className="h-9 w-9" />
          </button>

          <button type="button" onClick={skipForward}
            className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground active:opacity-60"
            aria-label="Skip forward 15 seconds">
            <IconFastForward className="h-7 w-7" />
            <span className="text-[9px] font-medium tracking-widest text-muted-foreground">15</span>
          </button>
        </div>

        {/* Volume */}
        <div className="w-full max-w-[280px] flex items-center gap-3">
          <Volume2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div className="relative flex-1 py-2">
            <div className="relative h-1 rounded-full bg-border">
              <div className="absolute left-0 top-0 h-full rounded-full bg-foreground" style={{ width: `${volume * 100}%` }} />
            </div>
            <input
              type="range" min={0} max={1} step={0.01} value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>

      <div style={{ height: 'max(env(safe-area-inset-bottom), 32px)' }} />
    </div>
  )
}

// Module-level count so hasMultipleTracks works without importing content
import { resourceGroups } from '@/lib/content'
const listenItemCount = resourceGroups.find(g => g.id === 'listen')?.items.length ?? 0
