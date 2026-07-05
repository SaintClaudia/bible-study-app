'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { learningPaths, type Lesson, type LearningPath } from '@/lib/content'

interface FormationTabProps {
  onLessonChange?: (open: boolean) => void
}

export function FormationTab({ onLessonChange }: FormationTabProps) {
  const [activePath, setActivePath] = useState<LearningPath | null>(null)
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    onLessonChange?.(activeLesson !== null)
  }, [activeLesson, onLessonChange])

  function openLesson(lesson: Lesson) {
    setActiveLesson(lesson)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function closeLesson() {
    setActiveLesson(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // ── Lesson detail (full-screen) ────────────────────────────

  if (activeLesson && activePath) {
    const lessonIdx = activePath.lessons.findIndex(l => l.id === activeLesson.id)
    const prevLesson = lessonIdx > 0 ? activePath.lessons[lessonIdx - 1] : null
    const nextLesson = lessonIdx < activePath.lessons.length - 1 ? activePath.lessons[lessonIdx + 1] : null

    return (
      <>
        {/* Fixed top header */}
        <div
          className="fixed inset-x-0 top-0 z-30 bg-background border-b border-border"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="mx-auto flex max-w-2xl items-start justify-between px-5 py-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {activePath.title}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {lessonIdx + 1} of {activePath.lessons.length}
              </p>
            </div>
            <button
              type="button"
              onClick={closeLesson}
              aria-label="Close lesson"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <article
          className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-5"
          style={{
            paddingTop: 'calc(env(safe-area-inset-top) + 72px)',
            paddingBottom: 'calc(env(safe-area-inset-bottom) + 88px)',
          }}
        >
          <header className="flex flex-col gap-2 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {activeLesson.minutes} min read
            </p>
            <h1 className="font-heading text-[2.5rem] font-normal leading-[1.08] tracking-[-0.01em] text-balance text-foreground">
              {activeLesson.title}
            </h1>
          </header>

          {activeLesson.image && (
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '1/1' }}>
              <Image
                src={activeLesson.image}
                alt={activeLesson.title}
                fill
                sizes="(max-width: 672px) 100vw, 672px"
                className="object-cover object-top"
              />
            </div>
          )}

          <div className="flex flex-col gap-4">
            {activeLesson.body.length > 0
              ? activeLesson.body.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-foreground/80">{para}</p>
                ))
              : <p className="text-base leading-relaxed text-foreground/80">{activeLesson.intro}</p>
            }
          </div>
        </article>

        {/* Fixed bottom navigation */}
        <div
          className="fixed inset-x-0 bottom-0 z-30 bg-background border-t border-border"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}
        >
          <div className="mx-auto flex max-w-2xl items-center gap-3 px-5 pt-3">
            <button
              type="button"
              onClick={() => prevLesson ? openLesson(prevLesson) : closeLesson()}
              aria-label={prevLesson ? 'Previous lesson' : 'Back to collection'}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            {nextLesson ? (
              <button
                type="button"
                onClick={() => openLesson(nextLesson)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button
                type="button"
                onClick={closeLesson}
                className="flex flex-1 items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </>
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
          <span className="relative h-14 w-14 shrink-0 rounded-2xl bg-secondary overflow-hidden">
            <Image src={activePath.icon} alt="" fill sizes="56px" className="dark:invert object-contain mix-blend-multiply dark:mix-blend-normal" style={{ padding: activePath.iconPad ?? 10 }} />
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
              onClick={() => openLesson(lesson)}
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
            <span className="relative h-12 w-12 shrink-0 rounded-2xl bg-secondary overflow-hidden">
              <Image src={path.icon} alt="" fill sizes="48px" className="dark:invert object-contain mix-blend-multiply dark:mix-blend-normal" style={{ padding: path.iconPad ?? 10 }} />
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
