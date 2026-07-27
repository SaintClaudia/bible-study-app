'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function PrayerRequestForm({ onExit }: { onExit: () => void }) {
  const [name, setName] = useState('')
  const [request, setRequest] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!request.trim()) return
    setStatus('submitting')
    try {
      const res = await fetch('/api/prayer-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, request }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="flex items-center justify-end px-5 py-4 border-b border-border">
        <button
          type="button"
          onClick={onExit}
          aria-label="Close"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="flex flex-col gap-6 max-w-md mx-auto">
          {status === 'success' ? (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
              <h1 className="font-heading text-3xl font-normal leading-tight text-foreground">
                Thank you
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground max-w-xs">
                Your request has been received. We will hold you in prayer.
              </p>
              <button
                type="button"
                onClick={onExit}
                className="mt-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:bg-neutral-800"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="font-heading text-3xl font-normal leading-tight text-foreground">
                  Prayer Request
                </h1>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Share what&apos;s on your heart. Our community will hold it in prayer.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="prayer-name" className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Name (optional)
                </label>
                <input
                  id="prayer-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-border bg-card p-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="prayer-request" className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Your request
                </label>
                <textarea
                  id="prayer-request"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  placeholder="Share what you'd like us to pray for"
                  rows={6}
                  required
                  className="w-full resize-none rounded-2xl border border-border bg-card p-4 text-base leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-destructive">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting' || !request.trim()}
                className="rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-neutral-800"
              >
                {status === 'submitting' ? 'Sending…' : 'Send Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
