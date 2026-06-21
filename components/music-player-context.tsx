'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { ResourceItem } from '@/lib/content'

type MusicPlayerCtx = {
  nowPlaying: ResourceItem | null
  setNowPlaying: (item: ResourceItem | null) => void
  playerExpanded: boolean
  setPlayerExpanded: (expanded: boolean) => void
}

export const MusicPlayerContext = createContext<MusicPlayerCtx>({
  nowPlaying: null,
  setNowPlaying: () => {},
  playerExpanded: false,
  setPlayerExpanded: () => {},
})

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [nowPlaying, setNowPlayingRaw] = useState<ResourceItem | null>(null)
  const [playerExpanded, setPlayerExpanded] = useState(false)

  const setNowPlaying = useCallback((item: ResourceItem | null) => {
    setNowPlayingRaw(item)
    setPlayerExpanded(false)
  }, [])

  return (
    <MusicPlayerContext.Provider value={{ nowPlaying, setNowPlaying, playerExpanded, setPlayerExpanded }}>
      {children}
    </MusicPlayerContext.Provider>
  )
}

export function useMusicPlayer() {
  return useContext(MusicPlayerContext)
}
