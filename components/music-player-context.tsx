'use client'

import { createContext, useContext } from 'react'
import type { ResourceItem } from '@/lib/content'

export type MusicPlayerCtx = {
  nowPlaying: ResourceItem | null
  setNowPlaying: (item: ResourceItem | null) => void
  playerExpanded: boolean
  setPlayerExpanded: (expanded: boolean) => void
  isPlaying: boolean
  currentTime: number
  duration: number
  togglePlay: () => void
  seek: (time: number) => void
  skipBack: () => void
  skipForward: () => void
  nextTrack: () => void
  prevTrack: () => void
  likedTracks: Set<string>
  toggleLike: (trackName: string) => void
}

export const MusicPlayerContext = createContext<MusicPlayerCtx>({
  nowPlaying: null,
  setNowPlaying: () => {},
  playerExpanded: false,
  setPlayerExpanded: () => {},
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  togglePlay: () => {},
  seek: () => {},
  skipBack: () => {},
  skipForward: () => {},
  nextTrack: () => {},
  prevTrack: () => {},
  likedTracks: new Set(),
  toggleLike: () => {},
})

export function useMusicPlayer() {
  return useContext(MusicPlayerContext)
}
