'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CircleHelp,
  ListChecks,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { learningPaths, type Lesson, type LearningPath } from '@/lib/content'
import { useLocalStorage } from '@/hooks/use-local-storage'

// ── Path icon map ──────────────────────────────────────────────

// ── Formation tab ──────────────────────────────────────────────

export function FormationTab() {
  const [completed, setCompleted] = useLocalStorage<string[]>('bs.completedLessons', [])
  const [activePath, setActivePath] = useState<LearningPath | null>(null)
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)

  function toggleComplete(id: string) {
    setCompleted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  // ── Lesson detail ──────────────────────────────────────────

  if (activeLesson && activePath) {
    const isDone = completed.includes(activeLesson.id)
    return (
      <article className="flex flex-col gap-5">
        <button
          type="button"
          onClick={() => setActiveLesson(null)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          <span className="text-[10px] tracking-[0.2em] opacity-50">···</span>
          {activePath.title}
        </button>

        <header>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {activeLesson.minutes} min read
          </p>
          <h1 className="mt-1.5 font-heading text-3xl font-normal text-balance text-foreground">
            {activeLesson.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {activeLesson.intro}
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {activeLesson.body.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-foreground/90">{para}</p>
          ))}
        </div>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-foreground">
            <ListChecks className="h-4 w-4 text-foreground" aria-hidden />
            <h2 className="font-heading text-xl font-normal">Key takeaways</h2>
          </div>
          <ul className="mt-3 flex flex-col gap-2.5">
            {activeLesson.takeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden />
                <span className="text-sm leading-relaxed text-foreground/90">{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-secondary/60 p-5">
          <div className="flex items-center gap-2 text-foreground">
            <CircleHelp className="h-4 w-4" aria-hidden />
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Reflect</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">{activeLesson.reflection}</p>
        </section>

        <button
          type="button"
          onClick={() => toggleComplete(activeLesson.id)}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors',
            isDone
              ? 'border border-border bg-secondary text-secondary-foreground'
              : 'bg-primary text-foreground-foreground',
          )}
        >
          <Check className="h-4 w-4" aria-hidden />
          {isDone ? 'Completed — mark as unread' : 'Mark as complete'}
        </button>
      </article>
    )
  }

  // ── Path detail ────────────────────────────────────────────

  if (activePath) {
    return (
      <div className="flex flex-col gap-5">
        <button
          type="button"
          onClick={() => setActivePath(null)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          <span className="text-[10px] tracking-[0.2em] opacity-50">···</span>
          All paths
        </button>

        <header>
          <h1 className="font-heading text-3xl font-normal text-balance text-foreground">
            {activePath.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {activePath.description}
          </p>
        </header>

        {/* Lessons */}
        <div className="flex flex-col gap-2.5">
          {activePath.lessons.map((lesson, i) => {
            const isDone = completed.includes(lesson.id)
            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => setActiveLesson(lesson)}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left transition-colors hover:bg-secondary/40"
              >
                <span className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-normal',
                  isDone ? 'bg-primary text-foreground-foreground' : 'bg-secondary text-secondary-foreground',
                )}>
                  {isDone ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-heading text-xl font-normal text-foreground">{lesson.title}</span>
                  <span className="block text-sm text-muted-foreground">{lesson.minutes} min read</span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              </button>
            )
          })}
        </div>

      </div>
    )
  }

  // ── Path list (overview) ───────────────────────────────────

  return (
    <div className="flex flex-col gap-8">
      <section className="pt-12">
        <h1 className="font-heading text-[3.25rem] font-normal leading-[1.05] tracking-[-0.01em] text-balance text-foreground">Formation</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Learn the Catholic faith before or while you're on your journey towards your sacraments. Short lessons, one step at a time.
        </p>
      </section>

      <section className="flex flex-col gap-2.5">
        {learningPaths.map((path) => (
          <button
            key={path.id}
            type="button"
            onClick={() => setActivePath(path)}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left transition-colors hover:bg-secondary/40"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-foreground">
              <Image src={path.icon} alt="" width={path.iconSize ?? 28} height={path.iconSize ?? 28} className="dark:invert" />
            </span>
            <span className="flex-1">
              <span className="block font-heading text-xl font-normal text-foreground">{path.title}</span>
              <span className="block text-sm leading-relaxed text-muted-foreground">{path.lessonCount} essential lessons</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
          </button>
        ))}
      </section>
    </div>
  )
}
