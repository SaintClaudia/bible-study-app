'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { ChevronRight, ExternalLink, Heart, Laptop, Moon, Sun, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMusicPlayer } from '@/components/music-player-context'

function SettingsRow({
  icon,
  label,
  detail,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  detail?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="flex w-full items-center gap-3.5 rounded-2xl border border-border bg-card p-4 text-left transition-colors enabled:hover:bg-secondary/40 enabled:active:opacity-60 disabled:opacity-100"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-medium leading-tight text-foreground">{label}</p>
        {detail && <p className="mt-0.5 text-sm text-muted-foreground">{detail}</p>}
      </div>
      {onClick && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />}
    </button>
  )
}

function ThemeSection() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const options = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Laptop },
  ] as const

  return (
    <section>
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Appearance
      </p>
      <div className="flex gap-2 rounded-2xl border border-border bg-card p-1.5">
        {options.map((option) => {
          const active = mounted && theme === option.id
          const Icon = option.icon
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setTheme(option.id)}
              aria-pressed={active}
              className={cn(
                'flex flex-1 flex-col items-center gap-1.5 rounded-xl py-2.5 text-xs font-medium transition-colors',
                active ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {option.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export function AccountTab() {
  const { likedTracks, navigateToListen } = useMusicPlayer()

  return (
    <div className="flex flex-col gap-8">
      <section className="pt-12">
        <h1 className="font-heading text-[3.25rem] font-normal leading-[1.05] tracking-[-0.01em] text-foreground">
          Account
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Manage your preferences. Sign-in is on the way so your account can follow you across devices.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
            <User className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold leading-tight text-foreground">Sign in</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Right now, your liked songs and settings are saved only on this device. Account
              sign-in is coming soon so they can sync everywhere you use the app.
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled
          className="mt-4 w-full cursor-not-allowed rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-muted-foreground"
        >
          Coming soon
        </button>
      </section>

      <ThemeSection />

      <section>
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Your data
        </p>
        <SettingsRow
          icon={<Heart className="h-4 w-4" aria-hidden />}
          label="Liked Songs"
          detail={`${likedTracks.size} ${likedTracks.size === 1 ? 'track' : 'tracks'} saved on this device`}
          onClick={navigateToListen}
        />
      </section>

      <section>
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          About
        </p>
        <SettingsRow
          icon={<ExternalLink className="h-4 w-4" aria-hidden />}
          label="biblestudylovesyou.com"
          detail="Visit the main site"
          onClick={() => window.open('https://biblestudylovesyou.com', '_blank', 'noopener,noreferrer')}
        />
      </section>
    </div>
  )
}
