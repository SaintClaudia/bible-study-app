'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { REFLECTION_RESPONSES_KEY, type Reading, type ReflectionResponses } from '@/lib/readings'

export function ReflectMode({
  date,
  readings,
  initialStep = 0,
  onExit,
}: {
  date: string
  readings: Reading[]
  initialStep?: number
  onExit: () => void
}) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [responses, setResponses] = useLocalStorage<ReflectionResponses>(REFLECTION_RESPONSES_KEY, {})
  const contentRef = useRef<HTMLDivElement>(null)
  const reading = readings[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === readings.length - 1
  const progress = ((currentStep + 1) / readings.length) * 100

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentStep])

  if (!reading?.reflection) return null

  const savedForReading = responses[date]?.[reading.reference] ?? []

  function updateResponse(promptIndex: number, text: string) {
    setResponses((prev) => {
      const dateEntry = { ...(prev[date] ?? {}) }
      const arr = [...(dateEntry[reading.reference] ?? [])]
      arr[promptIndex] = text
      dateEntry[reading.reference] = arr
      return { ...prev, [date]: dateEntry }
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {reading.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {currentStep + 1} of {readings.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onExit}
          aria-label="Close reflection"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Progress bar */}
      <div
        className="h-0.5 bg-border"
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={readings.length}
        aria-label={`Passage ${currentStep + 1} of ${readings.length}`}
      >
        <div
          className="h-full bg-foreground transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto px-5 py-6">
        <div className="flex flex-col gap-5 max-w-lg mx-auto">
          <p className="font-heading text-2xl font-normal leading-tight text-foreground">
            {reading.reference}
          </p>

          {reading.fullText && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-base leading-[1.85] text-foreground/90 whitespace-pre-wrap">
                {reading.fullText}
              </div>
              {reading.summary && (
                <div className="mt-4 rounded-xl bg-secondary/60 px-4 py-3">
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    In plain language
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {reading.summary}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-5 mt-2">
            {reading.reflection.prompts.map((prompt, i) => (
              <div key={i} className="flex flex-col gap-3">
                <p className="font-heading text-xl font-normal leading-snug text-foreground">
                  {prompt.question}
                </p>
                <textarea
                  value={savedForReading[i] ?? ''}
                  onChange={(e) => updateResponse(i, e.target.value)}
                  placeholder={prompt.starter ?? 'Write your reflection here…'}
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-border bg-card p-4 text-base leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-5 py-4 border-t border-border" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}>
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setCurrentStep(s => s - 1)}
            disabled={isFirst}
            aria-label="Previous passage"
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl border border-border transition-opacity flex-shrink-0',
              isFirst ? 'opacity-30 cursor-not-allowed' : 'hover:bg-secondary'
            )}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => isLast ? onExit() : setCurrentStep(s => s + 1)}
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-neutral-900 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 dark:bg-neutral-800"
          >
            {isLast ? (
              'Done'
            ) : (
              <>
                Next
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
