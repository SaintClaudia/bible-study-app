'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { ResourceItem } from '@/lib/content'

type MusicPlayerCtx = {
  nowPlaying: ResourceItem | null
  setNowPlaying: (item: ResourceItem | null) => void
}

export const MusicPlayerContext = createContext<MusicPlayerCtx>({
  nowPlaying: null,
  setNowPlaying: () => {},
})

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [nowPlaying, setNowPlaying] = useState<ResourceItem | null>(null)
  return (
    <MusicPlayerContext.Provider value={{ nowPlaying, setNowPlaying }}>
      {children}
    </MusicPlayerContext.Provider>
  )
}

export function useMusicPlayer() {
  return useContext(MusicPlayerContext)
}
