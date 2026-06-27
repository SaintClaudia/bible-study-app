// Custom player icons — designed to match the app's nav icon language.
// Action icons (play, pause, skip) use fills for visual weight.
// Utility icons (list, plus, check, cancel, minimize) use strokes to match the nav.

type IconProps = { className?: string }

// ── Action icons (filled) ────────────────────────────────────────

export function IconPlay({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M6 4.5C6 3.9 6.6 3.5 7.1 3.8l13 7.5c.5.3.5 1 0 1.3l-13 7.5C6.6 20.5 6 20.1 6 19.5V4.5z" fill="currentColor"/>
    </svg>
  )
}

export function IconPause({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="4" y="3" width="5" height="18" rx="2.5" fill="currentColor"/>
      <rect x="15" y="3" width="5" height="18" rx="2.5" fill="currentColor"/>
    </svg>
  )
}

export function IconPrevTrack({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="4" width="3.5" height="16" rx="1.75" fill="currentColor"/>
      <path d="M20.5 4.8C21 5.1 21 5.9 20.5 6.2L9 12l11.5 5.8c.5.3.5 1.1 0 1.4A1 1 0 0 1 19 19V5a1 1 0 0 1 1.5-.2z" fill="currentColor"/>
    </svg>
  )
}

export function IconNextTrack({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="17.5" y="4" width="3.5" height="16" rx="1.75" fill="currentColor"/>
      <path d="M3.5 4.8A1 1 0 0 0 3 5v14a1 1 0 0 0 1.5.9l11.5-6.8c.5-.3.5-1.1 0-1.4L4.5 4.8A1 1 0 0 0 3.5 4.8z" fill="currentColor"/>
    </svg>
  )
}

// ── Skip icons — curved arrows (stroke, heavier weight) ──────────

export function IconRewind({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M3 9l4-4-4-4"/>
      <path d="M7 5A10 10 0 1 1 3.6 14"/>
    </svg>
  )
}

export function IconFastForward({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M21 9l-4-4 4-4"/>
      <path d="M17 5A10 10 0 1 0 20.4 14"/>
    </svg>
  )
}

// ── Utility icons (stroke, matching nav style) ───────────────────

// Queue / list
export function IconList({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden>
      <line x1="3" y1="7" x2="21" y2="7"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="17" x2="15" y2="17"/>
    </svg>
  )
}

// Add to collection
export function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

// Already in collection
export function IconChecked({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

// Dismiss
export function IconCancel({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

// Minimize (chevron down)
export function IconDownArrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}
