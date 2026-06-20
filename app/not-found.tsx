import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center px-5 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
        404
      </p>
      <h1 className="font-heading text-5xl font-normal tracking-tight text-foreground mb-4">
        Page not found.
      </h1>
      <p className="text-[15px] leading-relaxed text-muted-foreground mb-10 max-w-sm">
        The page you're looking for doesn't exist. Head back and keep exploring.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-full bg-foreground px-7 py-3 text-[15px] font-medium text-background transition-opacity hover:opacity-75"
      >
        Back to home
      </Link>
    </div>
  )
}
