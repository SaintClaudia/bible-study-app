'use client'

import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Headphones,
  Play,
  type LucideIcon,
} from 'lucide-react'
import { resourceGroups, type ResourceGroup } from '@/lib/content'

const groupIcons: Record<ResourceGroup['kind'], LucideIcon> = {
  watch: Play,
  listen: Headphones,
  read: BookOpen,
  learn: GraduationCap,
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
        return (
          <section key={group.id} className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-foreground">
              <Icon className="h-4 w-4" aria-hidden />
              <h2 className="text-xs font-semibold uppercase tracking-wide">
                {group.label}
              </h2>
            </div>

            <div className="flex flex-col gap-2.5">
              {group.items.map((item) => {
                const inner = (
                  <>
                    <span className="flex-1">
                      <span className="flex items-center gap-1.5 font-heading text-base font-semibold text-foreground">
                        {item.name}
                        {item.href && (
                          <ArrowUpRight
                            className="h-4 w-4 shrink-0 text-muted-foreground"
                            aria-hidden
                          />
                        )}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                        {item.note}
                      </span>
                    </span>
                  </>
                )

                return item.href ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left transition-colors hover:border-primary/40"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={item.name}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left"
                  >
                    {inner}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
