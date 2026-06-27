'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react'
import { learningPaths, type Lesson, type LearningPath } from '@/lib/content'

export function FormationTab() {
  const [activePath, setActivePath] = useState<LearningPath | null>(null)
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)

  // ── Lesson detail ──────────────────────────────────────────

  if (activeLesson && activePath) {
    const lessonIdx = activePath.lessons.findIndex(l => l.id === activeLesson.id)
    const prevLesson = lessonIdx > 0 ? activePath.lessons[lessonIdx - 1] : null
    const nextLesson = lessonIdx < activePath.lessons.length - 1 ? activePath.lessons[lessonIdx + 1] : null

    return (
      <article className="flex flex-col gap-6 pt-12">
        <button
          type="button"
          onClick={() => setActiveLesson(null)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          <span className="text-[10px] tracking-[0.2em] opacity-50">···</span>
          {activePath.title}
        </button>

        <header className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {activeLesson.minutes} min read
          </p>
          <h1 className="font-heading text-[2.5rem] font-normal leading-[1.08] tracking-[-0.01em] text-balance text-foreground">
            {activeLesson.title}
          </h1>
        </header>

        <div className="flex flex-col gap-4">
          {activeLesson.body.length > 0
            ? activeLesson.body.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-foreground/80">{para}</p>
              ))
            : <p className="text-base leading-relaxed text-foreground/80">{activeLesson.intro}</p>
          }
        </div>

        {/* Lesson navigation */}
        <div className="flex flex-col gap-3 border-t border-border pt-6 mt-2">
          {prevLesson && (
            <button
              type="button"
              onClick={() => setActiveLesson(prevLesson)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              <span className="text-[10px] tracking-[0.2em] opacity-50">···</span>
              {prevLesson.title}
            </button>
          )}

          {nextLesson && (
            <button
              type="button"
              onClick={() => setActiveLesson(nextLesson)}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card px-5 py-4 text-left transition-colors hover:bg-secondary/40"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Next Lesson
              </p>
              <p className="font-heading text-xl font-normal text-foreground">{nextLesson.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{nextLesson.intro}</p>
              <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                Continue <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </button>
          )}
        </div>
      </article>
    )
  }

  // ── Collection detail ──────────────────────────────────────

  if (activePath) {
    return (
      <div className="flex flex-col gap-6 pt-12">
        <button
          type="button"
          onClick={() => setActivePath(null)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          <span className="text-[10px] tracking-[0.2em] opacity-50">···</span>
          Formation
        </button>

        <header className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary">
            <Image src={activePath.icon} alt="" width={activePath.iconSize ?? 28} height={activePath.iconSize ?? 28} className="dark:invert" />
          </span>
          <div>
            <h1 className="font-heading text-3xl font-normal text-balance text-foreground">
              {activePath.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{activePath.lessonCount} essential lessons</p>
          </div>
        </header>

        <p className="text-base leading-relaxed text-foreground/80">{activePath.description}</p>

        <div className="flex flex-col gap-2.5">
          {activePath.lessons.map((lesson, i) => (
            <button
              key={lesson.id}
              type="button"
              onClick={() => setActiveLesson(lesson)}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left transition-colors hover:bg-secondary/40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-muted-foreground">
                {i + 1}
              </span>
              <span className="flex-1">
                <span className="block font-heading text-lg font-normal text-foreground">{lesson.title}</span>
                <span className="block text-sm text-muted-foreground">{lesson.minutes} min read</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── Overview ───────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-8">
      <section className="pt-12">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Formation
        </p>
        <h1 className="mt-3 font-heading text-[3.25rem] font-normal leading-[1.05] tracking-[-0.01em] text-balance text-foreground">
          Learn the Catholic faith one lesson at a time.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The Catholic faith is rich, beautiful, and sometimes overwhelming when you're just beginning. Formation brings together essential lessons that provide a strong foundation for your journey.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Every parish introduces topics differently during OCIA, so these lessons are not meant to follow a particular class schedule. Explore them whenever a question comes to mind, revisit them as often as you'd like, and grow one lesson at a time.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        {learningPaths.map((path) => (
          <button
            key={path.id}
            type="button"
            onClick={() => setActivePath(path)}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left transition-colors hover:bg-secondary/40"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary">
              <Image src={path.icon} alt="" width={path.iconSize ?? 28} height={path.iconSize ?? 28} className="dark:invert" />
            </span>
            <span className="flex-1">
              <span className="block font-heading text-xl font-normal text-foreground">{path.title}</span>
              <span className="block text-sm text-muted-foreground">{path.lessonCount} essential lessons</span>
              {path.lessons.length > 0 && (
                <span className="mt-1 block text-sm leading-snug text-muted-foreground/70">{path.description}</span>
              )}
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
          </button>
        ))}
      </section>
    </div>
  )
}
