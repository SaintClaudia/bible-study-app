'use client'

import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ListChecks,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { learningPaths, type Lesson, type LearningPath } from '@/lib/content'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { GlossaryTerm } from '@/components/shared/glossary-term'

// ── Order of Mass data (previously in mass-tab.tsx) ────────────

const arrivingContent = [
  'As Catholics, we joyfully welcome people of all faiths and backgrounds to the Mass. You are not a guest on the outside looking in — you are a welcome part of what happens here.',
  <>As you enter, you will find a small font of holy water near the doors. Dip your fingers and make the <GlossaryTerm id="sign-of-the-cross">Sign of the Cross</GlossaryTerm> — a reminder of baptism.</>,
  <>Before entering your <GlossaryTerm id="pew">pew</GlossaryTerm>, look toward the front of the church. If you see a red lamp burning near the <GlossaryTerm id="altar">altar</GlossaryTerm>, Jesus is present in the <GlossaryTerm id="tabernacle">tabernacle</GlossaryTerm>. Catholics <GlossaryTerm id="genuflect">genuflect</GlossaryTerm> — briefly kneel on one knee — as a sign of reverence before sitting.</>,
  'Once seated, pull down the kneeler and take a moment in quiet prayer. There is no required prayer — simply be present and open.',
]

const massOrder = [
  { id: 'intro', title: 'Introductory Rites', posture: 'Stand', description: 'Mass begins as the priest and ministers process in. We make the Sign of the Cross together, greet one another, and ask God for mercy before praising him in the Gloria.', why: 'We begin Mass by acknowledging who we are — people in need of mercy — before we do anything else. The Gloria is our first great act of praise, setting the tone for everything that follows.' },
  { id: 'word', title: 'Liturgy of the Word', posture: 'Sit', description: 'We listen to readings from Scripture — usually from the Old Testament, a Psalm sung in response, a New Testament letter, and then the Gospel. We sit and simply receive God\'s word.', why: 'God speaks first. Before we offer anything, we listen. The readings are not chosen randomly — they follow a three-year cycle that takes us through the whole of Scripture.' },
  { id: 'homily', title: 'Homily', posture: 'Sit', description: 'The priest or deacon reflects on the readings and connects them to daily life. This is a time to listen and let the message settle in.', why: 'The homily is not a lecture or a performance — it is an invitation to let Scripture speak into your actual life, right now, this week.' },
  { id: 'creed', title: 'The Creed', posture: 'Stand', description: 'Together we profess what we believe using the Nicene Creed — a summary of the Christian faith that Catholics around the world have prayed for almost 1,700 years.', why: 'After hearing God\'s word, we respond with our own. The Creed is not a checklist — it is a personal declaration of faith made together as a community.' },
  { id: 'faithful', title: 'Prayers of the Faithful', posture: 'Stand', description: 'We pray for the Church, the world, those in need, and our local community. After each intention, the congregation responds together.', why: 'This is one of the most human moments of Mass — we bring our real needs and the needs of the world before God. Nothing is too small or too large to bring here.' },
  { id: 'eucharist', title: 'Liturgy of the Eucharist', posture: 'Stand, then Kneel', description: 'Bread and wine are brought forward and the priest offers the great prayer of thanksgiving. At the Consecration — the most sacred moment of Mass — we kneel as the bread and wine become the body and blood of Christ.', why: 'This is why Catholics come to Mass. Everything before this moment has been preparation. The Eucharist is not a symbol — it is Christ himself, truly present.' },
  { id: 'communion', title: 'Communion Rite', posture: 'Stand', description: 'We pray the Our Father together, offer a sign of peace to those around us, and those who are prepared come forward to receive Communion. If you are not receiving, you are warmly welcome to come forward for a blessing — simply cross your arms over your chest.', why: 'Communion is the most intimate moment of Mass — receiving Christ himself into our bodies. If you are not yet Catholic or not in a state of grace, coming forward for a blessing is a beautiful and welcome participation.' },
  { id: 'concluding', title: 'Concluding Rites', posture: 'Stand', description: 'The priest blesses us and sends us out into the world. Mass ends not as a goodbye, but as a commissioning — go and live what you have received.', why: 'The word "Mass" comes from the Latin missa — meaning "sent." Every Mass ends with a sending. We are not meant to keep what we have received; we are meant to give it away.' },
]

// ── Church icon (previously only in app-shell) ─────────────────

function IconChurch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="1" x2="12" y2="5"/>
      <line x1="10" y1="3" x2="14" y2="3"/>
      <polyline points="3,11 12,5 21,11"/>
      <line x1="3" y1="11" x2="3" y2="21"/>
      <line x1="21" y1="11" x2="21" y2="21"/>
      <line x1="3" y1="21" x2="21" y2="21"/>
      <path d="M9 21v-6a3 3 0 016 0v6"/>
      <circle cx="12" cy="13" r="2"/>
    </svg>
  )
}

// ── Formation tab ──────────────────────────────────────────────

export function FormationTab({ onEnterChurchMode }: { onEnterChurchMode?: () => void }) {
  const [completed, setCompleted, hydrated] = useLocalStorage<string[]>('bs.completedLessons', [])
  const [activePath, setActivePath] = useState<LearningPath | null>(null)
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)
  const [openMassSection, setOpenMassSection] = useState<string | null>(null)

  const totalLessons = useMemo(() => learningPaths.reduce((sum, p) => sum + p.lessons.length, 0), [])
  const doneCount = hydrated ? completed.length : 0

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
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {activePath.title}
        </button>

        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
            {activeLesson.minutes} min read
          </p>
          <h1 className="mt-1.5 font-heading text-3xl font-semibold text-balance text-foreground">
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
            <h2 className="font-heading text-lg font-semibold">Key takeaways</h2>
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
            <h2 className="text-xs font-semibold uppercase tracking-wide">Reflect</h2>
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
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All paths
        </button>

        <header>
          <h1 className="font-heading text-3xl font-semibold text-balance text-foreground">
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
                className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left transition-colors hover:border-primary/40"
              >
                <span className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                  isDone ? 'bg-primary text-foreground-foreground' : 'bg-secondary text-secondary-foreground',
                )}>
                  {isDone ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-foreground">{lesson.title}</span>
                  <span className="block text-xs text-muted-foreground">{lesson.minutes} min read</span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              </button>
            )
          })}
        </div>

        {/* Order of Mass — shown only inside the Attending Mass path */}
        {activePath.id === 'attending-mass' && (
          <>
            <div className="pt-2">
              <h2 className="font-heading text-xl font-semibold text-foreground">Order of Mass</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                A simple guide to what happens during Mass and why. Tap any section to learn more.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Arriving at Mass */}
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpenMassSection(openMassSection === 'arriving' ? null : 'arriving')}
                  aria-expanded={openMassSection === 'arriving'}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                >
                  <span className="font-heading text-base font-semibold text-foreground">Arriving at Mass</span>
                  <ChevronDown className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200', openMassSection === 'arriving' && 'rotate-180')} aria-hidden />
                </button>
                {openMassSection === 'arriving' && (
                  <div className="border-t border-border px-4 py-4 flex flex-col gap-3 text-sm leading-relaxed text-foreground/80">
                    {arrivingContent.map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                )}
              </div>

              {/* Ordered Mass sections */}
              {massOrder.map((section, i) => {
                const open = openMassSection === section.id
                return (
                  <div key={section.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                    <button
                      type="button"
                      onClick={() => setOpenMassSection(open ? null : section.id)}
                      aria-expanded={open}
                      className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-muted-foreground">{i + 1}</span>
                          <span className="font-heading text-base font-semibold text-foreground">{section.title}</span>
                        </div>
                        <span className="inline-flex items-center self-start rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground">
                          {section.posture}
                        </span>
                      </div>
                      <ChevronDown className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 mt-1', open && 'rotate-180')} aria-hidden />
                    </button>
                    {open && (
                      <div className="border-t border-border px-4 py-4 flex flex-col gap-4">
                        <p className="text-sm leading-relaxed text-foreground/80">{section.description}</p>
                        <div className="rounded-xl bg-secondary/50 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">Why do Catholics do this?</p>
                          <p className="text-sm leading-relaxed text-muted-foreground">{section.why}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Church Mode */}
            {onEnterChurchMode && (
              <button
                type="button"
                onClick={onEnterChurchMode}
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-foreground px-6 py-4 text-base font-semibold text-background shadow-sm transition-opacity hover:opacity-80 active:scale-[0.99]"
              >
                <IconChurch className="h-5 w-5" />
                Enter Church Mode
              </button>
            )}
          </>
        )}
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

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <p className="font-heading text-lg font-semibold text-foreground">Your progress</p>
          <p className="text-sm font-medium text-muted-foreground">{doneCount} / {totalLessons}</p>
        </div>
        <div
          className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={doneCount}
          aria-valuemin={0}
          aria-valuemax={totalLessons}
        >
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(doneCount / totalLessons) * 100}%` }}
          />
        </div>
      </section>

      <section className="flex flex-col gap-2.5">
        {learningPaths.map((path, i) => {
          const done = path.lessons.filter(l => completed.includes(l.id)).length
          return (
            <button
              key={path.id}
              type="button"
              onClick={() => setActivePath(path)}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left transition-colors hover:border-primary/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary font-heading text-lg font-semibold text-foreground">
                {i + 1}
              </span>
              <span className="flex-1">
                <span className="block font-heading text-base font-semibold text-foreground">{path.title}</span>
                <span className="block text-xs text-muted-foreground">{path.description}</span>
                <span className="mt-1 block text-xs font-medium text-foreground">{done} of {path.lessons.length} complete</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
            </button>
          )
        })}
      </section>
    </div>
  )
}
