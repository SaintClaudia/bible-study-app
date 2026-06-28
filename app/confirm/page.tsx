'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ConfirmContent() {
  const params = useSearchParams()
  const status = params.get('status')

  if (status === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-8">Bible Study</p>
        <p className="font-heading text-3xl sm:text-5xl font-normal text-foreground max-w-xl">
          You know who really loves you?
        </p>
        <p className="font-heading text-3xl sm:text-5xl font-normal text-foreground max-w-xl mt-2 mb-6">
          Jesus.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed max-w-sm mb-8">
          You're on the list. We'll be in touch.
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

  const content = {
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
      <h1 className="font-heading text-3xl sm:text-4xl font-normal text-foreground mb-4 max-w-xl">
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
