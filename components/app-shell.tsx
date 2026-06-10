'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { ReadingsTab } from '@/components/readings/readings-tab'
import { MassTab } from '@/components/mass/mass-tab'
import { FormationTab } from '@/components/formation/formation-tab'
import { ChurchMode } from '@/components/mass/church-mode'

type Tab = 'readings' | 'mass' | 'formation'

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

function IconChurch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="1" x2="12" y2="5"/>
      <line x1="10" y1="3" x2="14" y2="3"/>
      <polyline points="3,11 12,5 21,11"/>
      <line x1="3" y1="11" x2="3" y2="21"/>
      <line x1="21" y1="11" x2="21" y2="21"/>
      <line x1="3" y1="21" x2="21" y2="21"/>
      <path d="M9 21v-6a3 3 0 016 0v6"/>
      <circle cx="12" cy="13" r="2"/>
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

const tabs: { id: Tab; label: string; icon: ({ className }: { className?: string }) => JSX.Element }[] = [
  { id: 'readings', label: 'Readings', icon: IconBible },
  { id: 'mass', label: 'Mass Mode', icon: IconChurch },
  { id: 'formation', label: 'Formation', icon: IconDove },
]

export function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>('readings')
  const [churchMode, setChurchMode] = useState(false)
  const [barsVisible, setBarsVisible] = useState(true)
  const lastScrollY = useRef(0)

  // Read #tab hash from URL on load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Tab
    if (hash && ['readings', 'mass', 'formation'].includes(hash)) {
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
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col bg-background">
      {/* Colored status bar area for mobile */}
      <div className="bg-background" style={{ paddingTop: 'env(safe-area-inset-top)' }} />

      <header className={cn(
        'sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-md transition-transform duration-300',
        !barsVisible && '-translate-y-full'
      )}>
        <div className="flex items-center justify-between px-5 py-[18px]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-foreground flex-shrink-0">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <rect x="10.5" y="2" width="3" height="20" rx="0.75" fill="white"/>
                <rect x="3" y="7.5" width="18" height="3" rx="0.75" fill="white"/>
              </svg>
            </div>
            <span className="font-sans text-[15px] font-medium tracking-[0.01em] text-foreground">
              Bible Study
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 px-5 pb-28 pt-6">
        {activeTab === 'readings' && <ReadingsTab onEnterChurchMode={() => setChurchMode(true)} />}
        {activeTab === 'mass' && <MassTab onEnterChurchMode={() => setChurchMode(true)} />}
        {activeTab === 'formation' && <FormationTab />}
      </main>

      <nav
        aria-label="Primary"
        className={cn(
          'fixed inset-x-0 bottom-0 z-20 bg-background/90 backdrop-blur-md transition-transform duration-300',
          !barsVisible && 'translate-y-full'
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-2xl items-stretch justify-around px-2 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition-colors',
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon className={cn('h-5 w-5', active ? 'opacity-100' : 'opacity-50')} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Bottom safe area fill */}
      <div className="fixed bottom-0 inset-x-0 bg-background/90" style={{ height: 'env(safe-area-inset-bottom)', zIndex: 19 }} />
    </div>
  )
}
