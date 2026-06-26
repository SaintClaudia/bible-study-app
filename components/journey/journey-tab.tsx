'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocalStorage } from '@/hooks/use-local-storage'
import {
  quickAnswers,
  startHereItems,
  goodToKnowItems,
} from '@/lib/guide-data'

type View =
  | { kind: 'list' }
  | { kind: 'qa'; id: string }
  | { kind: 'sh'; id: string }
  | { kind: 'gtk'; id: string }

export function JourneyTab({ onDetailChange }: { onDetailChange?: (open: boolean) => void }) {
  const [view, setView] = useState<View>({ kind: 'list' })
  const [explored, setExplored] = useLocalStorage<string[]>('bs.guideExplored', [])

  const go = useCallback(
    (v: View) => {
      if (v.kind === 'qa') {
        setExplored((prev) => (prev.includes(v.id) ? prev : [...prev, v.id]))
      }
      setView(v)
      onDetailChange?.(v.kind !== 'list')
      window.scrollTo({ top: 0, behavior: 'instant' })
    },
    [setExplored, onDetailChange],
  )

  const back = useCallback(() => {
    setView({ kind: 'list' })
    onDetailChange?.(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [onDetailChange])

  // Ensure masthead is restored whenever this component unmounts
  // (covers both tab-switch and tab-key-reset remounts)
  useEffect(() => {
    return () => { onDetailChange?.(false) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Quick Answer Detail ────────────────────────────────────────────────────
  if (view.kind === 'qa') {
    const qa = quickAnswers.find((q) => q.id === view.id)
    if (!qa) return null
    const idx = quickAnswers.indexOf(qa)
    const exploredCount = explored.length
    const allExplored = exploredCount >= quickAnswers.length
    const unexplored = quickAnswers.filter((q) => q.id !== qa.id && !explored.includes(q.id))
    const nextQa = unexplored.length > 0
      ? unexplored[0]
      : quickAnswers[(idx + 1) % quickAnswers.length]
    const othersQa = quickAnswers.filter((q) => q.id !== qa.id && q.id !== nextQa.id).slice(0, 3)

    return (
      <div className="-mx-5 -mt-4">
        {/* Hero */}
        <div className="relative h-64 overflow-hidden bg-neutral-900">
          <Image src={qa.image} alt="" fill className="object-cover" style={{ objectPosition: qa.imagePosition ?? 'center' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
          <button
            type="button"
            onClick={back}
            className="absolute left-4 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1.5 text-white backdrop-blur-sm"
            style={{ top: 'calc(env(safe-area-inset-top) + 16px)' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="text-[10px] tracking-[0.2em] opacity-60">···</span>
          </button>
          <div
            className="absolute right-4 whitespace-nowrap rounded-full bg-black/40 px-3.5 py-1.5 text-xs text-white backdrop-blur-sm"
            style={{ top: 'calc(env(safe-area-inset-top) + 16px)' }}
          >
            {exploredCount} of {quickAnswers.length} explored
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5 px-5 py-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Quick Answer
            </p>
            <h1 className="mt-2 font-heading text-3xl font-semibold leading-tight text-foreground">
              {qa.question}
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-heading text-xl font-semibold text-foreground">{qa.boldAnswer}</p>
            {qa.body.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/80">
                {para}
              </p>
            ))}
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ backgroundColor: '#FEAE86', width: `${(exploredCount / quickAnswers.length) * 100}%` }}
            />
          </div>

          {/* UP NEXT card / Completed state */}
          {allExplored ? (
            <div className="rounded-2xl bg-neutral-900 p-5 dark:bg-neutral-800">
              <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#EF8960' }}>
                All explored
              </p>
              <p className="mt-2.5 font-heading text-xl font-semibold leading-snug text-white">
                You've read every Quick Answer.
              </p>
              <p className="mt-1 text-sm text-white/50">
                Head back to explore Start Here or Good to Know.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-2xl bg-neutral-900 p-5 dark:bg-neutral-800">
                <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#EF8960' }}>
                  Up Next · Quick Answer
                </p>
                <div className="mt-2.5 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-heading text-xl font-semibold leading-snug text-white">
                      {nextQa.question}
                    </p>
                    <p className="mt-1 text-sm text-white/50">{nextQa.shortAnswer}.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => go({ kind: 'qa', id: nextQa.id })}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:opacity-60"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  You&apos;ve explored {exploredCount} of {quickAnswers.length}
                </p>
                <button
                  type="button"
                  onClick={() => go({ kind: 'qa', id: nextQa.id })}
                  className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: '#FEAE86' }}
                >
                  keep going →
                </button>
              </div>
            </>
          )}

          <div className="h-px bg-border" />

          {/* More questions */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              More Questions
            </p>
            <div className="flex flex-col gap-2">
              {othersQa.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => go({ kind: 'qa', id: q.id })}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3.5 text-left transition-colors hover:bg-secondary/40 active:opacity-60"
                >
                  <span className="font-heading text-base text-foreground">{q.question}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          {/* Back link */}
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="text-[10px] tracking-[0.2em] opacity-50">···</span>
            Back to all topics
          </button>
        </div>
      </div>
    )
  }

  // ── Start Here Detail ──────────────────────────────────────────────────────
  if (view.kind === 'sh') {
    const item = startHereItems.find((s) => s.id === view.id)
    if (!item) return null
    return (
      <div className="-mx-5 -mt-4">
        <div className="relative h-56 overflow-hidden bg-neutral-900">
          <Image src={item.image} alt="" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/30" />
          <button
            type="button"
            onClick={back}
            className="absolute left-4 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1.5 text-white backdrop-blur-sm"
            style={{ top: 'calc(env(safe-area-inset-top) + 16px)' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="text-[10px] tracking-[0.2em] opacity-60">···</span>
          </button>
        </div>
        <div className="flex flex-col gap-5 px-5 py-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {item.label}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-semibold leading-tight text-foreground">
              {item.title}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">{item.subtitle}</p>
          </div>
          <div className="flex flex-col gap-4">
            {item.body.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/80">
                {para}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="text-[10px] tracking-[0.2em] opacity-50">···</span>
            Back to all topics
          </button>
        </div>
      </div>
    )
  }

  // ── Good to Know Detail ────────────────────────────────────────────────────
  if (view.kind === 'gtk') {
    const item = goodToKnowItems.find((g) => g.id === view.id)
    if (!item) return null
    return (
      <div className="flex flex-col gap-5" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 16px)' }}>
        <button
          type="button"
          onClick={back}
          className="inline-flex self-start items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="text-[10px] tracking-[0.2em] opacity-50">···</span>
        </button>
        {item.icon && (
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-secondary p-2">
            <Image
              src={item.icon}
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-contain dark:invert"
            />
          </div>
        )}
        <div>
          <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground">
            {item.title}
          </h1>
          <p className="mt-1.5 text-base text-muted-foreground">{item.subtitle}</p>
        </div>
        <div className="flex flex-col gap-4">
          {item.body.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-foreground/80">
              {para}
            </p>
          ))}
        </div>
      </div>
    )
  }

  // ── List View ──────────────────────────────────────────────────────────────
  const heroItem = startHereItems[0]
  const subItems = startHereItems.slice(1)

  return (
    <div className="flex flex-col gap-8 pb-4">

      {/* Title */}
      <section className="pt-12">
        <h1 className="font-heading text-[3.25rem] font-normal leading-[1.05] tracking-[-0.01em] text-foreground">
          Your guide to OCIA
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          From what to expect to what you need to know about OCIA.
        </p>
      </section>

      {/* Quick Answers */}
      <section>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Quick Answers
        </p>
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quickAnswers.map((qa) => (
            <button
              key={qa.id}
              type="button"
              onClick={() => go({ kind: 'qa', id: qa.id })}
              className="flex w-52 shrink-0 flex-col justify-between rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-secondary/40 active:opacity-60"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {qa.category}
                </p>
                <p className="mt-2 font-heading text-lg font-normal leading-snug text-foreground">
                  {qa.question}
                </p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{qa.shortAnswer} →</p>
            </button>
          ))}
        </div>
      </section>

      {/* Start Here */}
      <section>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Start Here
        </p>

        {/* Hero card */}
        <button
          type="button"
          onClick={() => go({ kind: 'sh', id: heroItem.id })}
          className="relative w-full overflow-hidden rounded-2xl bg-neutral-900 p-5 text-left dark:bg-neutral-800"
        >
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
              {heroItem.label}
            </p>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <ArrowRight className="h-4 w-4 text-neutral-900" />
            </div>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-normal leading-snug text-white">
            {heroItem.title}
          </h2>
          <p className="mt-1.5 text-sm text-white/55">{heroItem.subtitle}</p>
        </button>

        {/* Sub cards */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          {subItems.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go({ kind: 'sh', id: item.id })}
              className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left active:opacity-60"
            >
              <div className="relative h-36 w-full overflow-hidden sm:h-48">
                <Image
                  src={i === 0 ? '/communion.png' : '/christ.png'}
                  alt=""
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-heading text-xl font-normal leading-tight text-foreground">
                  {item.title}
                </p>
                <p className="mt-auto pt-3 text-sm leading-relaxed text-muted-foreground">{item.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Good to Know */}
      <section>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Good to Know
        </p>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          The things people quietly assume you already know.
        </p>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {goodToKnowItems.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go({ kind: 'gtk', id: item.id })}
              className={cn(
                'flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-secondary/40 active:opacity-60',
                i < goodToKnowItems.length - 1 && 'border-b border-border',
              )}
            >
              {item.icon ? (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary p-2">
                  <Image
                    src={item.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="h-full w-full object-contain dark:invert"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-secondary" />
              )}
              <div className="flex-1">
                <p className="font-heading text-xl font-normal leading-tight text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.subtitle}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>

    </div>
  )
}
