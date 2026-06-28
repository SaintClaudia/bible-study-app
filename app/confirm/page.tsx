'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ConfirmContent() {
  const params = useSearchParams()
  const status = params.get('status')

  const content = {
    success: {
      heading: "You know who really loves you? Jesus.",
      body: "You're on the list. We'll be in touch when the season calls.",
    },
    invalid: {
      heading: 'This link has already been used or is invalid.',
      body: 'If you meant to subscribe, head back and try again.',
    },
    error: {
      heading: 'Something went wrong.',
      body: 'Please try subscribing again. If the problem persists, reach out at hello@biblestudylovesyou.com.',
    },
  }[status ?? 'invalid'] ?? {
    heading: 'Something went wrong.',
    body: 'Please try subscribing again.',
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background">
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">Bible Study</p>
      <h1 className="font-heading text-3xl sm:text-4xl font-normal text-foreground mb-4 max-w-md">
        {content.heading}
      </h1>
      <p className="text-muted-foreground text-base leading-relaxed max-w-sm mb-8">
        {content.body}
      </p>
      <a
        href="https://app.biblestudylovesyou.com"
        className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
      >
        Open the app
      </a>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense>
      <ConfirmContent />
    </Suspense>
  )
}
