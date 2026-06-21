'use client'

import { ChevronDown, Music2, Pause, Play, SkipBack, SkipForward, X } from 'lucide-react'
import { useMusicPlayer } from '@/components/music-player-context'

// ── Spotify iframe — clips corners correctly on WebKit ──────────

function SpotifyEmbed({ src, height }: { src: string; height: number }) {
  return (
    <div style={{ borderRadius: 12, overflow: 'hidden' }}>
      <iframe
        src={src}
        width="100%"
        height={height}
        frameBorder={0}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        style={{ display: 'block', width: '100%' }}
      />
    </div>
  )
}

// ── Collapsed bar (lives inside the nav in AppShell) ───────────
// Tap the content area to expand. × dismisses entirely.
// SDK users get a play/pause button so they never need to expand just to pause.

export function MiniPlayerBar() {
  const {
    nowPlaying, setNowPlaying,
    playerExpanded, setPlayerExpanded,
    isSpotifyAuthenticated,
    isSpotifyReady, isPremium, isPaused, togglePlay,
  } = useMusicPlayer()

  if (!nowPlaying?.spotifyEmbedSrc || playerExpanded) return null

  const canControl = isSpotifyReady && isPremium === true

  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-2xl flex items-center px-4 py-3 gap-2">

        {/* Tappable area — opens the full player */}
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
              {!isSpotifyAuthenticated
                ? 'Connect Spotify for full playback'
                : canControl
                  ? (isPaused ? 'Paused' : 'Playing')
                  : (nowPlaying.category ?? 'Music')}
            </p>
          </div>
        </button>

        {/* Play / pause — SDK Premium users only */}
        {canControl && (
          <button
            type="button"
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-foreground text-background active:opacity-60 flex-shrink-0"
            aria-label={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused
              ? <Play className="h-4 w-4 translate-x-px" fill="currentColor" />
              : <Pause className="h-4 w-4" fill="currentColor" />}
          </button>
        )}

        {/* Dismiss — separated visually from the play area */}
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

// ── Expanded SDK player (full-screen, Spotify Premium) ──────────
// ↓ collapses back to the bar. No × here — dismiss from the bar instead.

function SDKExpandedPlayer() {
  const {
    nowPlaying, setPlayerExpanded,
    currentTrack, isPaused, togglePlay, nextTrack, prevTrack,
  } = useMusicPlayer()

  if (!nowPlaying) return null

  const albumArt = currentTrack?.album.images[0]?.url ?? nowPlaying.image
  const trackName = currentTrack?.name ?? nowPlaying.name
  const artistName = currentTrack?.artists.map(a => a.name).join(', ') ?? nowPlaying.category

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      <div className="flex-shrink-0 bg-background" style={{ height: 'env(safe-area-inset-top)' }} />

      {/* Header — only minimize, no close */}
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
        <p className="flex-1 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground pr-16">
          Now Playing
        </p>
      </div>

      {/* Album art + track info + controls */}
      <div className="flex-1 flex flex-col items-center justify-center px-10 gap-8">
        {albumArt ? (
          <img src={albumArt} alt="" className="w-full max-w-xs aspect-square rounded-2xl object-cover shadow-2xl" />
        ) : (
          <div className="w-full max-w-xs aspect-square rounded-2xl bg-secondary flex items-center justify-center">
            <Music2 className="h-20 w-20 text-muted-foreground" />
          </div>
        )}

        <div className="text-center">
          <p className="text-xl font-semibold text-foreground">{trackName}</p>
          <p className="mt-1 text-sm text-muted-foreground">{artistName}</p>
        </div>

        <div className="flex items-center gap-8">
          <button type="button" onClick={prevTrack} className="p-3 text-muted-foreground hover:text-foreground active:opacity-60">
            <SkipBack className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="h-16 w-16 rounded-full bg-foreground flex items-center justify-center text-background hover:opacity-80 active:opacity-60"
          >
            {isPaused
              ? <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
              : <Pause className="h-7 w-7" fill="currentColor" />}
          </button>
          <button type="button" onClick={nextTrack} className="p-3 text-muted-foreground hover:text-foreground active:opacity-60">
            <SkipForward className="h-7 w-7" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground">{nowPlaying.name}</p>
      </div>

      <div style={{ height: 'max(env(safe-area-inset-bottom), 24px)' }} />
    </div>
  )
}

// ── Expanded iframe player (full-screen, non-Premium fallback) ──
// ↓ collapses back to the bar. No × here — dismiss from the bar instead.

function IframeExpandedPlayer() {
  const {
    nowPlaying, setPlayerExpanded,
    isSpotifyAuthenticated, isPremium,
  } = useMusicPlayer()

  if (!nowPlaying?.spotifyEmbedSrc) return null

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      <div className="flex-shrink-0 bg-background" style={{ height: 'env(safe-area-inset-top)' }} />

      {/* Header — only minimize, no close */}
      <div className="mx-auto w-full max-w-2xl flex items-center px-4 py-4 border-b border-border flex-shrink-0">
        <button
          type="button"
          onClick={() => setPlayerExpanded(false)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground active:opacity-60"
          aria-label="Minimize player"
        >
          <ChevronDown className="h-5 w-5" />
          Minimize
        </button>
        <div className="flex-1 min-w-0 text-center pr-20">
          {nowPlaying.category && (
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground leading-none mb-0.5">
              {nowPlaying.category}
            </p>
          )}
          <p className="text-sm font-semibold text-foreground truncate">{nowPlaying.name}</p>
        </div>
      </div>

      {/* Embed + connect prompt */}
      <div className="flex-1 overflow-y-auto mx-auto w-full max-w-2xl px-5 py-5 flex flex-col gap-4">
        <SpotifyEmbed src={nowPlaying.spotifyEmbedSrc} height={352} />

        {!isSpotifyAuthenticated && (
          <a
            href="/api/auth/login"
            className="flex items-center justify-center w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-80 active:opacity-60"
          >
            Connect Spotify for full playback
          </a>
        )}

        {isSpotifyAuthenticated && isPremium === false && (
          <p className="text-xs text-center text-muted-foreground">
            Spotify Premium is required for full in-app playback.
          </p>
        )}
      </div>
    </div>
  )
}

// ── Main export — expanded overlay only ────────────────────────

export function MiniPlayer() {
  const { nowPlaying, playerExpanded, isSpotifyReady, isPremium } = useMusicPlayer()
  if (!nowPlaying?.spotifyEmbedSrc || !playerExpanded) return null
  if (isSpotifyReady && isPremium === true) return <SDKExpandedPlayer />
  return <IframeExpandedPlayer />
}
