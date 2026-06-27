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
})

export function useMusicPlayer() {
  return useContext(MusicPlayerContext)
}
