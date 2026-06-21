'use client'

import { createContext, useContext } from 'react'
import type { ResourceItem } from '@/lib/content'
import type { SpotifyTrack } from '@/hooks/use-spotify-sdk'

export type { SpotifyTrack }

export type MusicPlayerCtx = {
  // Content item selected from Resources
  nowPlaying: ResourceItem | null
  setNowPlaying: (item: ResourceItem | null) => void

  // Player UI state
  playerExpanded: boolean
  setPlayerExpanded: (expanded: boolean) => void

  // Spotify SDK state (null = not yet checked)
  isSpotifyAuthenticated: boolean
  isSpotifyReady: boolean
  isPremium: boolean | null
  currentTrack: SpotifyTrack | null
  isPaused: boolean

  // Playback controls
  playSpotify: (contextUri: string) => void
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
}

export const MusicPlayerContext = createContext<MusicPlayerCtx>({
  nowPlaying: null,
  setNowPlaying: () => {},
  playerExpanded: false,
  setPlayerExpanded: () => {},
  isSpotifyAuthenticated: false,
  isSpotifyReady: false,
  isPremium: null,
  currentTrack: null,
  isPaused: true,
  playSpotify: () => {},
  togglePlay: () => {},
  nextTrack: () => {},
  prevTrack: () => {},
})

export function useMusicPlayer() {
  return useContext(MusicPlayerContext)
}

// Helper: convert a Spotify embed URL to a playback context URI
// e.g. https://open.spotify.com/embed/playlist/abc → spotify:playlist:abc
export function embedUrlToUri(embedSrc: string): string | null {
  const m = embedSrc.match(/embed\/(album|playlist)\/([A-Za-z0-9]+)/)
  return m ? `spotify:${m[1]}:${m[2]}` : null
}
