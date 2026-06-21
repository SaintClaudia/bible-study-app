'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { ReadingsTab } from '@/components/readings/readings-tab'
import { FormationTab } from '@/components/formation/formation-tab'
import { JourneyTab } from '@/components/journey/journey-tab'
import { ResourcesTab } from '@/components/resources/resources-tab'
import { ChurchMode } from '@/components/mass/church-mode'
import { MusicPlayerContext, embedUrlToUri } from '@/components/music-player-context'
import { MiniPlayer } from '@/components/music-player'
import { useSpotifySDK } from '@/hooks/use-spotify-sdk'
import type { ResourceItem } from '@/lib/content'

type Tab = 'readings' | 'formation' | 'journey' | 'resources'

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

const tabs: { id: Tab; label: string; icon: ({ className }: { className?: string }) => React.ReactNode }[] = [
  { id: 'journey', label: 'Journey', icon: IconCompass },
  { id: 'formation', label: 'Formation', icon: IconDove },
  { id: 'readings', label: 'Readings', icon: IconBible },
  { id: 'resources', label: 'Resources', icon: IconLibrary },
]

export function AppShell() {
  // Tab / UI state
  const [activeTab, setActiveTab] = useState<Tab>('readings')
  const [tabKeys, setTabKeys] = useState<Record<Tab, number>>({
    journey: 0, formation: 0, readings: 0, resources: 0,
  })
  const [churchMode, setChurchMode] = useState(false)
  const [barsVisible, setBarsVisible] = useState(true)
  const lastScrollY = useRef(0)

  // Music player state
  const [nowPlaying, setNowPlayingRaw] = useState<ResourceItem | null>(null)
  const [playerExpanded, setPlayerExpanded] = useState(false)

  // Spotify SDK
  const sdk = useSpotifySDK()

  const setNowPlaying = useCallback((item: ResourceItem | null) => {
    setNowPlayingRaw(item)
    setPlayerExpanded(false)
    if (item?.spotifyEmbedSrc && sdk.isReady && sdk.isPremium) {
      const uri = embedUrlToUri(item.spotifyEmbedSrc)
      if (uri) sdk.play(uri)
    }
  }, [sdk])

  // Read #tab hash from URL on load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Tab
    if (hash && ['readings', 'mass', 'formation', 'journey', 'resources'].includes(hash)) {
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

  if (churchMode) {
    return <ChurchMode onExit={() => setChurchMode(false)} />
  }

  return (
    <MusicPlayerContext.Provider value={{
      nowPlaying,
      setNowPlaying,
      playerExpanded,
      setPlayerExpanded,
      isSpotifyAuthenticated: sdk.isAuthenticated,
      isSpotifyReady: sdk.isReady,
      isPremium: sdk.isPremium,
      currentTrack: sdk.currentTrack,
      isPaused: sdk.isPaused,
      playSpotify: sdk.play,
      togglePlay: sdk.togglePlay,
      nextTrack: sdk.nextTrack,
      prevTrack: sdk.prevTrack,
    }}>
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col bg-background">

        {/* Fixed header */}
        <header className={cn(
          'fixed top-0 left-0 right-0 z-20 bg-background border-b border-border transition-transform duration-300',
          !barsVisible && '-translate-y-full'
        )}>
          <div style={{ height: 'env(safe-area-inset-top)' }} className="bg-background" />
          <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-[18px]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-foreground flex-shrink-0">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-background" aria-hidden>
                  <rect x="10.5" y="2" width="3" height="20" rx="0.75" fill="currentColor"/>
                  <rect x="3" y="7.5" width="18" height="3" rx="0.75" fill="currentColor"/>
                </svg>
              </div>
              <span className="font-sans text-[15px] font-medium tracking-[0.01em] text-foreground">
                Bible Study
              </span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Spacer below fixed header */}
        <div className="flex-shrink-0 bg-background" style={{ height: 'calc(env(safe-area-inset-top) + 72px)' }} />

        <main id="main-content" className={cn('flex-1 px-5 pt-4', nowPlaying?.spotifyEmbedSrc ? 'pb-56' : 'pb-32')}>
          {activeTab === 'readings' && <ReadingsTab key={tabKeys.readings} />}
          {activeTab === 'formation' && <FormationTab key={tabKeys.formation} onEnterChurchMode={() => setChurchMode(true)} />}
          {activeTab === 'journey' && <JourneyTab key={tabKeys.journey} />}
          {activeTab === 'resources' && <ResourcesTab key={tabKeys.resources} />}
        </main>

        <MiniPlayer />

        <nav
          aria-label="Primary"
          className={cn(
            'fixed inset-x-0 bottom-0 z-20 bg-background border-t border-border transition-transform duration-300',
            !barsVisible && 'translate-y-full'
          )}
        >
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
                      // Re-tapping the active tab resets it to the list view
                      setTabKeys(k => ({ ...k, [tab.id]: k[tab.id] + 1 }))
                    } else {
                      setActiveTab(tab.id)
                    }
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium leading-tight transition-colors',
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
    </MusicPlayerContext.Provider>
  )
}
