'use client'

import { ChevronDown, ChevronUp, Music2, X } from 'lucide-react'
import { useMusicPlayer } from '@/components/music-player-context'

export function MiniPlayer() {
  const { nowPlaying, setNowPlaying, playerExpanded, setPlayerExpanded } = useMusicPlayer()

  if (!nowPlaying?.spotifyEmbedSrc) return null

  const close = () => { setNowPlaying(null); setPlayerExpanded(false) }

  return (
    <div
      className="fixed inset-x-0 z-40 bg-background border-t border-border flex flex-col"
      style={
        playerExpanded
          ? { top: 0, bottom: 0, borderTop: 'none' }
          : { bottom: 'calc(max(env(safe-area-inset-bottom), 8px) + 62px)' }
      }
    >
      {/* Safe-area fill — only when full-screen */}
      {playerExpanded && (
        <div className="flex-shrink-0 bg-background" style={{ height: 'env(safe-area-inset-top)' }} />
      )}

      {/* Header row */}
      <div className="mx-auto w-full max-w-2xl flex items-center gap-3 px-4 py-2 flex-shrink-0 border-b border-border">
        {nowPlaying.image && (
          <img
            src={nowPlaying.image}
            alt=""
            className="h-9 w-9 rounded-lg object-cover flex-shrink-0"
          />
        )}
        {!nowPlaying.image && (
          <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Music2 className="h-4 w-4 text-muted-foreground" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {nowPlaying.category && (
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground leading-none mb-0.5">
              {nowPlaying.category}
            </p>
          )}
          <p className="text-sm font-semibold text-foreground truncate">{nowPlaying.name}</p>
        </div>

        <button
          type="button"
          onClick={() => setPlayerExpanded(!playerExpanded)}
          className="p-2 -mr-1 text-muted-foreground hover:text-foreground"
          aria-label={playerExpanded ? 'Minimize player' : 'Expand player'}
        >
          {playerExpanded
            ? <ChevronDown className="h-5 w-5" />
            : <ChevronUp className="h-5 w-5" />}
        </button>

        <button
          type="button"
          onClick={close}
          className="p-2 text-muted-foreground hover:text-foreground"
          aria-label="Close player"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/*
        The iframe is ALWAYS mounted here — never conditionally rendered.
        Changing height via CSS resizes Spotify's UI without reloading the iframe,
        so playback continues uninterrupted when expanding or collapsing.
      */}
      <div className={playerExpanded ? 'flex-1 overflow-y-auto mx-auto w-full max-w-2xl px-5 py-5' : 'mx-auto w-full max-w-2xl'}>
        <iframe
          src={nowPlaying.spotifyEmbedSrc}
          width="100%"
          height={playerExpanded ? 352 : 80}
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          style={{
            borderRadius: playerExpanded ? 12 : 0,
            display: 'block',
            width: '100%',
          }}
        />
      </div>
    </div>
  )
}
