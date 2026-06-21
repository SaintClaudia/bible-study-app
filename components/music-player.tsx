'use client'

import { ChevronDown, ChevronUp, Music2, Pause, Play, SkipBack, SkipForward, X } from 'lucide-react'
import { useMusicPlayer } from '@/components/music-player-context'

// ── Shared: iframe wrapped to clip corners properly ─────────────

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

// ── SDK-powered player (Spotify Premium) ───────────────────────

function SDKPlayer() {
  const {
    nowPlaying, setNowPlaying,
    playerExpanded, setPlayerExpanded,
    currentTrack, isPaused,
    togglePlay, nextTrack, prevTrack,
  } = useMusicPlayer()

  if (!nowPlaying) return null

  const albumArt = currentTrack?.album.images[0]?.url ?? nowPlaying.image
  const trackName = currentTrack?.name ?? nowPlaying.name
  const artistName = currentTrack?.artists.map(a => a.name).join(', ') ?? nowPlaying.category
  const close = () => setNowPlaying(null)

  if (playerExpanded) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col bg-background">
        <div className="flex-shrink-0 bg-background" style={{ height: 'env(safe-area-inset-top)' }} />

        <div className="mx-auto w-full max-w-2xl flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <button type="button" onClick={() => setPlayerExpanded(false)} className="p-2 -ml-2 text-muted-foreground hover:text-foreground">
            <ChevronDown className="h-5 w-5" />
          </button>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Now Playing</p>
          <button type="button" onClick={close} className="p-2 -mr-2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

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
            <button type="button" onClick={prevTrack} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <SkipBack className="h-7 w-7" />
            </button>
            <button type="button" onClick={togglePlay} className="h-16 w-16 rounded-full bg-foreground flex items-center justify-center text-background hover:opacity-80 transition-opacity">
              {isPaused
                ? <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
                : <Pause className="h-7 w-7" fill="currentColor" />}
            </button>
            <button type="button" onClick={nextTrack} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <SkipForward className="h-7 w-7" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">{nowPlaying.name}</p>
        </div>

        <div style={{ height: 'max(env(safe-area-inset-bottom), 24px)' }} />
      </div>
    )
  }

  return (
    <div
      className="fixed inset-x-0 z-30 bg-background border-t border-border"
      style={{ bottom: 'calc(max(env(safe-area-inset-bottom), 8px) + 62px)' }}
    >
      <div className="mx-auto max-w-2xl flex items-center gap-3 px-4 py-2.5">
        {albumArt ? (
          <img src={albumArt} alt="" className="h-10 w-10 rounded-lg object-cover flex-shrink-0" />
        ) : (
          <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Music2 className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        <button type="button" onClick={() => setPlayerExpanded(true)} className="flex-1 min-w-0 text-left">
          <p className="text-sm font-semibold text-foreground truncate">{trackName}</p>
          <p className="text-xs text-muted-foreground truncate">{artistName}</p>
        </button>
        <button type="button" onClick={togglePlay} className="p-2 text-foreground hover:opacity-70">
          {isPaused ? <Play className="h-5 w-5" fill="currentColor" /> : <Pause className="h-5 w-5" fill="currentColor" />}
        </button>
        <button type="button" onClick={nextTrack} className="p-2 text-muted-foreground hover:text-foreground">
          <SkipForward className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => setPlayerExpanded(true)} className="p-2 text-muted-foreground hover:text-foreground">
          <ChevronUp className="h-4 w-4" />
        </button>
        <button type="button" onClick={close} className="p-2 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ── Iframe fallback player ──────────────────────────────────────

function IframePlayer() {
  const {
    nowPlaying, setNowPlaying,
    playerExpanded, setPlayerExpanded,
    isSpotifyAuthenticated, isPremium,
  } = useMusicPlayer()

  if (!nowPlaying?.spotifyEmbedSrc) return null

  const close = () => { setNowPlaying(null); setPlayerExpanded(false) }

  // ── Expanded: full-screen with iframe ──
  if (playerExpanded) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col bg-background">
        <div className="flex-shrink-0 bg-background" style={{ height: 'env(safe-area-inset-top)' }} />

        <div className="mx-auto w-full max-w-2xl flex items-center gap-3 px-4 py-4 border-b border-border flex-shrink-0">
          {nowPlaying.image && (
            <img src={nowPlaying.image} alt="" className="h-10 w-10 rounded-lg object-cover flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            {nowPlaying.category && (
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground leading-none mb-0.5">
                {nowPlaying.category}
              </p>
            )}
            <p className="text-sm font-semibold text-foreground truncate">{nowPlaying.name}</p>
          </div>
          <button type="button" onClick={() => setPlayerExpanded(false)} className="p-2 -mr-1 text-muted-foreground hover:text-foreground" aria-label="Minimize">
            <ChevronDown className="h-5 w-5" />
          </button>
          <button type="button" onClick={close} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mx-auto w-full max-w-2xl px-5 py-5 flex flex-col gap-4">
          <SpotifyEmbed src={nowPlaying.spotifyEmbedSrc} height={352} />

          {!isSpotifyAuthenticated && (
            <a
              href="/api/auth/login"
              className="flex items-center justify-center w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
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

  // ── Collapsed: our own bar, no iframe ──
  return (
    <div
      className="fixed inset-x-0 z-30 bg-background border-t border-border"
      style={{ bottom: 'calc(max(env(safe-area-inset-bottom), 8px) + 62px)' }}
    >
      <div className="mx-auto max-w-2xl flex items-center gap-3 px-4 py-3">
        {nowPlaying.image ? (
          <img src={nowPlaying.image} alt="" className="h-10 w-10 rounded-lg object-cover flex-shrink-0" />
        ) : (
          <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Music2 className="h-4 w-4 text-muted-foreground" />
          </div>
        )}

        <button type="button" onClick={() => setPlayerExpanded(true)} className="flex-1 min-w-0 text-left">
          <p className="text-sm font-semibold text-foreground truncate">{nowPlaying.name}</p>
          <p className="text-xs text-muted-foreground">
            {!isSpotifyAuthenticated ? 'Tap to connect Spotify for full playback' : (nowPlaying.category ?? 'Music')}
          </p>
        </button>

        <button type="button" onClick={() => setPlayerExpanded(true)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Open player">
          <ChevronUp className="h-5 w-5" />
        </button>
        <button type="button" onClick={close} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ── Main export ─────────────────────────────────────────────────

export function MiniPlayer() {
  const { nowPlaying, isSpotifyReady, isPremium } = useMusicPlayer()
  if (!nowPlaying?.spotifyEmbedSrc) return null
  if (isSpotifyReady && isPremium === true) return <SDKPlayer />
  return <IframePlayer />
}
