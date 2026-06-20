'use client'

import { ArrowUpRight, BookOpen, ScrollText, Headphones, Play, type LucideIcon } from 'lucide-react'
import { resourceGroups, type ResourceGroup, type ResourceItem } from '@/lib/content'

const groupIcons: Record<ResourceGroup['kind'], LucideIcon> = {
  watch: Play,
  listen: Headphones,
  read: BookOpen,
  learn: ScrollText,
}

function HeroCard({ item }: { item: ResourceItem }) {
  const inner = (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '16/9' }}>
      <img
        src={item.image}
        alt={item.name}
        className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '65% center' }}
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* text */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-heading text-xl font-semibold text-white leading-tight">{item.name}</p>
        <p className="mt-1 text-sm text-white/80 leading-snug">{item.note}</p>
      </div>
      {/* link indicator */}
      {item.href && (
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
          <ArrowUpRight className="h-4 w-4 text-white" aria-hidden />
        </div>
      )}
    </div>
  )

  return item.href ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  )
}

function AppIcon({ item }: { item: ResourceItem }) {
  return item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition-colors hover:border-primary/40"
    >
      <AppIconInner item={item} />
    </a>
  ) : (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center">
      <AppIconInner item={item} />
    </div>
  )
}

function AppIconInner({ item }: { item: ResourceItem }) {
  return (
    <>
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="h-16 w-16 rounded-2xl object-cover shadow-sm"
          onError={(e) => {
            const el = e.currentTarget
            el.style.display = 'none'
            const fallback = el.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'flex'
          }}
        />
      ) : null}
      <div
        className="h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-xl font-bold text-foreground"
        style={{ display: item.image ? 'none' : 'flex' }}
      >
        {item.name[0]}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground leading-tight">{item.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-2">{item.note}</p>
      </div>
    </>
  )
}

function BookCard({ item }: { item: ResourceItem }) {
  const inner = (
    <div className="flex flex-col gap-2">
      <div className="aspect-[2/3] overflow-hidden rounded-xl bg-secondary">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4">
            <p className="text-xs font-medium text-muted-foreground text-center leading-snug">{item.name}</p>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground leading-tight">{item.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{item.note}</p>
      </div>
    </div>
  )

  return item.href ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <div>{inner}</div>
  )
}

function SiteCard({ item }: { item: ResourceItem }) {
  const inner = (
    <div className="flex items-center gap-3 px-4 py-3.5">
      {item.image && (
        <img
          src={item.image}
          alt=""
          aria-hidden="true"
          className="h-9 w-9 rounded-lg object-cover flex-shrink-0"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )}
      <span className="flex-1 min-w-0">
        <span className="flex items-center gap-1 font-heading text-base font-semibold text-foreground">
          {item.name}
          {item.href && <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{item.note}</span>
      </span>
    </div>
  )

  return item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
    >
      {inner}
    </a>
  ) : (
    <div className="rounded-2xl border border-border bg-card">{inner}</div>
  )
}

export function ResourcesTab() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="font-heading text-3xl font-semibold text-balance text-foreground">
          Resources
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A few trusted things to watch, listen to, read, and explore as you grow in the faith.
        </p>
      </section>

      {resourceGroups.map((group) => {
        const Icon = groupIcons[group.kind]
        const heroItems = group.items.filter(i => i.display === 'hero')
        const appItems = group.items.filter(i => i.display === 'app')
        const bookItems = group.items.filter(i => i.display === 'book')
        const siteItems = group.items.filter(i => !i.display)

        return (
          <section key={group.id} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-foreground">
              <Icon className="h-4 w-4" aria-hidden />
              <h2 className="text-xs font-semibold uppercase tracking-wide">{group.label}</h2>
            </div>

            {/* Hero banner — full-width cinematic card */}
            {heroItems.length > 0 && (
              <div className="flex flex-col gap-2.5">
                {heroItems.map(item => <HeroCard key={item.name} item={item} />)}
              </div>
            )}

            {/* App icon grid — watch, listen, learn */}
            {appItems.length > 0 && (
              <div className="grid grid-cols-2 gap-2.5">
                {appItems.map(item => <AppIcon key={item.name} item={item} />)}
              </div>
            )}

            {/* Book cover grid */}
            {bookItems.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {bookItems.map(item => <BookCard key={item.name} item={item} />)}
              </div>
            )}

            {/* Website / text list */}
            {siteItems.length > 0 && (
              <div className="flex flex-col gap-2.5">
                {siteItems.map(item => <SiteCard key={item.name} item={item} />)}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
