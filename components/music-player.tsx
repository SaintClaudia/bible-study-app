'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Music2, X } from 'lucide-react'
import { useMusicPlayer } from '@/components/music-player-context'

export function MiniPlayer() {
  const { nowPlaying, setNowPlaying } = useMusicPlayer()
  const [expanded, setExpanded] = useState(false)

  if (!nowPlaying?.spotifyEmbedSrc) return null

  if (expanded) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-background">
        {/* Safe area top fill */}
        <div style={{ height: 'env(safe-area-inset-top)' }} className="bg-background flex-shrink-0" />

        {/* Header */}
        <div className="flex-shrink-0 mx-auto w-full max-w-2xl px-5 border-b border-border">
          <div className="flex items-center gap-3 py-4">
            {nowPlaying.image && (
              <img
                src={nowPlaying.image}
                alt=""
                className="h-12 w-12 rounded-xl object-cover flex-shrink-0 shadow"
              />
            )}
            <div className="flex-1 min-w-0">
              {nowPlaying.category && (
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {nowPlaying.category}
                </p>
              )}
              <p className="font-semibold text-foreground truncate">{nowPlaying.name}</p>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="p-2 -mr-2 text-muted-foreground hover:text-foreground"
              aria-label="Minimize player"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Embed */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-5 py-5">
            <iframe
              key={nowPlaying.spotifyEmbedSrc}
              src={nowPlaying.spotifyEmbedSrc}
              width="100%"
              height="352"
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '12px' }}
            />
            <p className="mt-4 text-xs text-center text-muted-foreground">
              Sign in to Spotify for full playback
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-x-0 z-30 bg-background border-t border-border"
      style={{ bottom: 'calc(max(env(safe-area-inset-bottom), 8px) + 62px)' }}
    >
      <div className="mx-auto max-w-2xl flex items-center gap-3 px-4 py-2.5">
        {nowPlaying.image ? (
          <img
            src={nowPlaying.image}
            alt=""
            className="h-9 w-9 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Music2 className="h-4 w-4 text-muted-foreground" />
          </div>
        )}

        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex-1 min-w-0 text-left"
        >
          <p className="text-sm font-medium text-foreground truncate">{nowPlaying.name}</p>
          <p className="text-xs text-muted-foreground">
            {nowPlaying.category ?? 'Music'} · Tap to open
          </p>
        </button>

        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="p-2 text-muted-foreground hover:text-foreground"
          aria-label="Expand player"
        >
          <ChevronUp className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => setNowPlaying(null)}
          className="p-2 text-muted-foreground hover:text-foreground"
          aria-label="Close player"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
