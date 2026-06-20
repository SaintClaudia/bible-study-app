'use client'

import { useState, useCallback } from 'react'
import { ArrowLeft, ChevronRight, CircleHelp, Info } from 'lucide-react'
import { journeyTopics, type JourneyTopic } from '@/lib/content'

export function JourneyTab() {
  const [activeTopic, setActiveTopic] = useState<JourneyTopic | null>(null)

  const openTopic = useCallback((topic: JourneyTopic) => {
    setActiveTopic(topic)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const closeTopic = useCallback(() => {
    setActiveTopic(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  if (activeTopic) {
    return (
      <article className="flex flex-col gap-5">
        <button
          type="button"
          onClick={closeTopic}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Journey
        </button>

        <header>
          <h1 className="font-heading text-3xl font-semibold text-balance text-foreground">
            {activeTopic.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {activeTopic.intro}
          </p>
        </header>

        {/* Paragraph-style body */}
        {activeTopic.body && (
          <div className="flex flex-col gap-4">
            {activeTopic.body.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/90">
                {para}
              </p>
            ))}
          </div>
        )}

        {/* FAQ-style body */}
        {activeTopic.faqs && (
          <div className="flex flex-col gap-3">
            {activeTopic.faqs.map((faq, i) => (
              <section
                key={i}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start gap-2.5">
                  <CircleHelp
                    className="mt-0.5 h-4 w-4 shrink-0 text-foreground"
                    aria-hidden
                  />
                  <h2 className="font-heading text-base font-semibold text-foreground">
                    {faq.q}
                  </h2>
                </div>
                <div className="mt-2 pl-[26px] flex flex-col gap-2">
                  {faq.a.split('\n\n').map((para, j) => (
                    <p key={j} className="text-sm leading-relaxed text-foreground/90">{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {activeTopic.note && (
          <section className="rounded-2xl border border-border bg-secondary/60 p-5">
            <div className="flex items-start gap-2.5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden />
              <p className="text-sm leading-relaxed text-foreground/90">
                {activeTopic.note}{' '}
                {activeTopic.noteLink && (
                  <a
                    href={activeTopic.noteLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                  >
                    {activeTopic.noteLink.text}
                  </a>
                )}
              </p>
            </div>
          </section>
        )}
      </article>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="font-heading text-3xl font-semibold text-balance text-foreground">
          Journey
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Guidance for the questions that don't always get answered in class.
        </p>
      </section>

      <section className="flex flex-col gap-2.5">
        {journeyTopics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => openTopic(topic)}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left transition-colors hover:border-primary/40"
          >
            <span className="flex-1">
              <span className="block font-heading text-base font-semibold text-foreground">
                {topic.title}
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                {topic.summary}
              </span>
            </span>
            <ChevronRight
              className="h-5 w-5 shrink-0 text-muted-foreground"
              aria-hidden
            />
          </button>
        ))}
      </section>
    </div>
  )
}
