'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { ReadingsTab } from '@/components/readings/readings-tab'
import { FormationTab } from '@/components/formation/formation-tab'
import { JourneyTab } from '@/components/journey/journey-tab'
import { DiscoverTab } from '@/components/discover/discover-tab'
import { MusicPlayerContext } from '@/components/music-player-context'
import { MiniPlayer, MiniPlayerBar } from '@/components/music-player'
import { ListenTab } from '@/components/listen/listen-tab'
import { resourceGroups, type ResourceItem } from '@/lib/content'
import { toast, Toaster } from 'sonner'

const listenItems = resourceGroups.find(g => g.id === 'listen')?.items ?? []

type Tab = 'readings' | 'formation' | 'journey' | 'discover' | 'listen'

function IconBible({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="2" width="14" height="19" rx="2"/>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H18"/>
      <path d="M4 2.5A2.5 2.5 0 016.5 5H18"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  )
}


function IconDove({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 682.667 682.667" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" className={className}>
      <g transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
        <path d="M0 0h45" transform="translate(467 302)"/>
        <path d="m0 0-1.508-.725C-26.023 63.382-87.879 106.962-158.09 106.962h-138.63c0-101.147 78.706-184.83 179.662-191.025l38.575-2.368s-85.029-84.774-218.237-84.774c0 0 0-113.833 94.823-113.833l91.539 76.011S155.28-300.038 155.28-52.92v69.882c0 33.137-26.863 60-60 60-24.162 0-44.989-14.282-54.498-34.866C32.328 23.796 18.168 8.735 0 0Z" transform="translate(311.72 300.038)"/>
        <path d="M0 0c-14.346 26.879-22.452 57.54-22.452 90h108.63c73.733 0 138.251-48.062 159.986-117.485 3.393-10.838 7.383-21.478 11.731-31.969" transform="translate(97.452 407)"/>
        <path d="M0 0h30" transform="translate(392 302)"/>
      </g>
    </svg>
  )
}

function IconCompass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9"/>
      <polygon points="16.5,7.5 13.5,13.5 7.5,16.5 10.5,10.5"/>
    </svg>
  )
}

function IconLibrary({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="3" width="5" height="18" rx="1"/>
      <rect x="11" y="3" width="5" height="18" rx="1"/>
      <path d="M18 5.5l2.6.7a1 1 0 01.7 1.2L18 21"/>
    </svg>
  )
}

function IconHeadphones({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  )
}

const tabs: { id: Tab; label: string; icon: ({ className }: { className?: string }) => React.ReactNode }[] = [
  { id: 'journey', label: 'Guide', icon: IconCompass },
  { id: 'formation', label: 'Formation', icon: IconDove },
  { id: 'readings', label: 'Readings', icon: IconBible },
  { id: 'discover', label: 'Discover', icon: IconLibrary },
  { id: 'listen', label: 'Music', icon: IconHeadphones },
]

export function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>('readings')
  const [tabKeys, setTabKeys] = useState<Record<Tab, number>>({
    journey: 0, formation: 0, readings: 0, discover: 0, listen: 0,
  })
  const [barsVisible, setBarsVisible] = useState(true)
  const [guideDetailOpen, setGuideDetailOpen] = useState(false)
  const [formationLessonOpen, setFormationLessonOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    setGuideDetailOpen(false)
    setFormationLessonOpen(false)
  }, [activeTab])

  // Music player state
  const [nowPlaying, setNowPlayingRaw] = useState<ResourceItem | null>(null)
  const [playerExpanded, setPlayerExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set())
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Load liked tracks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('likedTracks')
      if (stored) setLikedTracks(new Set(JSON.parse(stored)))
    } catch {}
  }, [])

  // Create audio element once
  useEffect(() => {
    const el = new Audio()
    el.preload = 'metadata'
    audioRef.current = el

    const onTimeUpdate = () => setCurrentTime(el.currentTime)
    const onDurationChange = () => setDuration(isFinite(el.duration) ? el.duration : 0)
    const onEnded = () => { setIsPlaying(false); setCurrentTime(0) }
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('durationchange', onDurationChange)
    el.addEventListener('ended', onEnded)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)

    return () => {
      el.pause()
      el.src = ''
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('durationchange', onDurationChange)
      el.removeEventListener('ended', onEnded)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
    }
  }, [])

  const loadAndPlay = useCallback((item: ResourceItem) => {
    const el = audioRef.current
    if (!el) return
    el.src = item.audioSrc!
    el.currentTime = 0
    setCurrentTime(0)
    setDuration(0)
    el.play().catch(() => {})
  }, [])

  const setNowPlaying = useCallback((item: ResourceItem | null) => {
    setNowPlayingRaw(item)
    setPlayerExpanded(false)
    const el = audioRef.current
    if (!el) return
    if (item?.audioSrc) {
      loadAndPlay(item)
    } else {
      el.pause()
      el.src = ''
      setIsPlaying(false)
      setCurrentTime(0)
      setDuration(0)
    }
  }, [loadAndPlay])

  const togglePlay = useCallback(() => {
    const el = audioRef.current
    if (!el || !nowPlaying?.audioSrc) return
    if (isPlaying) el.pause()
    else el.play().catch(() => {})
  }, [isPlaying, nowPlaying])

  const seek = useCallback((time: number) => {
    const el = audioRef.current
    if (!el) return
    el.currentTime = time
    setCurrentTime(time)
  }, [])

  const skipBack = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    el.currentTime = Math.max(0, el.currentTime - 15)
  }, [])

  const skipForward = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    el.currentTime = Math.min(el.duration || 0, el.currentTime + 15)
  }, [])

  const nextTrack = useCallback(() => {
    if (!nowPlaying || listenItems.length < 2) return
    const idx = listenItems.findIndex(i => i.name === nowPlaying.name)
    const next = listenItems[(idx + 1) % listenItems.length]
    if (next) { setNowPlayingRaw(next); loadAndPlay(next) }
  }, [nowPlaying, loadAndPlay])

  const prevTrack = useCallback(() => {
    if (!nowPlaying || listenItems.length < 2) return
    const idx = listenItems.findIndex(i => i.name === nowPlaying.name)
    const prev = listenItems[(idx - 1 + listenItems.length) % listenItems.length]
    if (prev) { setNowPlayingRaw(prev); loadAndPlay(prev) }
  }, [nowPlaying, loadAndPlay])

  const toggleLike = useCallback((trackName: string) => {
    setLikedTracks(prev => {
      const next = new Set(prev)
      const adding = !next.has(trackName)
      if (adding) {
        next.add(trackName)
        toast(`Added to your collection`, {
          description: 'Find it under Liked Songs in the Music tab.',
          duration: 3000,
        })
      } else {
        next.delete(trackName)
        toast(`Removed from your collection`, { duration: 2000 })
      }
      try { localStorage.setItem('likedTracks', JSON.stringify([...next])) } catch {}
      return next
    })
  }, [])

  // Read #tab hash from URL on load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Tab
    if (hash && ['readings', 'mass', 'formation', 'journey', 'discover'].includes(hash)) {
      setActiveTab(hash)
    }
  }, [])

  // Hide header + nav on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      if (current > lastScrollY.current && current > 60) {
        setBarsVisible(false)
      } else {
        setBarsVisible(true)
      }
      lastScrollY.current = current
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <MusicPlayerContext.Provider value={{
      nowPlaying,
      setNowPlaying,
      playerExpanded,
      setPlayerExpanded,
      isPlaying,
      currentTime,
      duration,
      togglePlay,
      seek,
      skipBack,
      skipForward,
      nextTrack,
      prevTrack,
      likedTracks,
      toggleLike,
    }}>
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col bg-background">

        <header className={cn(
          'fixed top-0 left-0 right-0 z-20 bg-background transition-transform duration-300',
          (!barsVisible || guideDetailOpen || formationLessonOpen) && '-translate-y-full'
        )}>
          <div style={{ height: 'env(safe-area-inset-top)' }} className="bg-background" />
          <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-[18px]">
            <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-foreground flex-shrink-0">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-background" aria-hidden>
                <rect x="10.5" y="2" width="3" height="20" rx="0.75" fill="currentColor"/>
                <rect x="3" y="7.5" width="18" height="3" rx="0.75" fill="currentColor"/>
              </svg>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div
          className="flex-shrink-0 bg-background transition-[height] duration-300"
          style={{ height: (guideDetailOpen || formationLessonOpen) ? '0px' : 'calc(env(safe-area-inset-top) + 72px)' }}
        />

        <main id="main-content" className={cn(
          'flex-1',
          formationLessonOpen ? 'px-0 pt-0 pb-0' : 'px-5',
          (!formationLessonOpen && guideDetailOpen) ? 'pt-0' : !formationLessonOpen ? 'pt-4' : '',
          !formationLessonOpen && (nowPlaying?.audioSrc ? 'pb-48' : 'pb-32')
        )}>
          {activeTab === 'readings' && <ReadingsTab key={tabKeys.readings} />}
          {activeTab === 'formation' && <FormationTab key={tabKeys.formation} onLessonChange={setFormationLessonOpen} />}
          {activeTab === 'journey' && <JourneyTab key={tabKeys.journey} onDetailChange={setGuideDetailOpen} />}
          {activeTab === 'discover' && <DiscoverTab key={tabKeys.discover} />}
          {activeTab === 'listen' && <ListenTab key={tabKeys.listen} />}
        </main>

        <MiniPlayer />

        <nav
          aria-label="Primary"
          className={cn(
            'fixed inset-x-0 bottom-0 z-20 bg-background border-t border-border transition-transform duration-300',
            (!barsVisible || formationLessonOpen) && 'translate-y-full'
          )}
        >
          <MiniPlayerBar />

          <div
            className="mx-auto flex max-w-2xl items-stretch justify-around px-2 pt-2"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (tab.id === activeTab) {
                      setTabKeys(k => ({ ...k, [tab.id]: k[tab.id] + 1 }))
                    } else {
                      setActiveTab(tab.id)
                    }
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium leading-tight transition-colors active:opacity-60',
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon className={cn('h-5 w-5', active ? 'opacity-100' : 'opacity-50')} aria-hidden="true" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </nav>

      </div>
      <Toaster
        position="bottom-center"
        offset={nowPlaying?.audioSrc && !playerExpanded ? 148 : 96}
        toastOptions={{ style: { fontFamily: 'var(--font-sans)' } }}
      />
    </MusicPlayerContext.Provider>
  )
}
