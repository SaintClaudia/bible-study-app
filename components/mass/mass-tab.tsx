'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlossaryTerm } from '@/components/shared/glossary-term'

const massSections = [
  {
    id: 'intro',
    title: 'Introductory Rites',
    posture: 'Stand',
    description: 'Mass begins as the priest and ministers process in. We make the Sign of the Cross together, greet one another, and ask God for mercy before praising him in the Gloria.',
    why: 'We begin Mass by acknowledging who we are — people in need of mercy — before we do anything else. The Gloria is our first great act of praise, setting the tone for everything that follows.',
  },
  {
    id: 'word',
    title: 'Liturgy of the Word',
    posture: 'Sit',
    description: 'We listen to readings from Scripture — usually from the Old Testament, a Psalm sung in response, a New Testament letter, and then the Gospel. We sit and simply receive God\'s word.',
    why: 'God speaks first. Before we offer anything, we listen. The readings are not chosen randomly — they follow a three-year cycle that takes us through the whole of Scripture.',
  },
  {
    id: 'homily',
    title: 'Homily',
    posture: 'Sit',
    description: 'The priest or deacon reflects on the readings and connects them to daily life. This is a time to listen and let the message settle in.',
    why: 'The homily is not a lecture or a performance — it is an invitation to let Scripture speak into your actual life, right now, this week.',
  },
  {
    id: 'creed',
    title: 'The Creed',
    posture: 'Stand',
    description: 'Together we profess what we believe using the Nicene Creed — a summary of the Christian faith that Catholics around the world have prayed for almost 1,700 years.',
    why: 'After hearing God\'s word, we respond with our own. The Creed is not a checklist — it is a personal declaration of faith made together as a community.',
  },
  {
    id: 'faithful',
    title: 'Prayers of the Faithful',
    posture: 'Stand',
    description: 'We pray for the Church, the world, those in need, and our local community. After each intention, the congregation responds together.',
    why: 'This is one of the most human moments of Mass — we bring our real needs and the needs of the world before God. Nothing is too small or too large to bring here.',
  },
  {
    id: 'eucharist',
    title: 'Liturgy of the Eucharist',
    posture: 'Stand, then Kneel',
    description: 'Bread and wine are brought forward and the priest offers the great prayer of thanksgiving. At the Consecration — the most sacred moment of Mass — we kneel as the bread and wine become the body and blood of Christ.',
    why: 'This is why Catholics come to Mass. Everything before this moment has been preparation. The Eucharist is not a symbol — it is Christ himself, truly present.',
  },
  {
    id: 'communion',
    title: 'Communion Rite',
    posture: 'Stand',
    description: 'We pray the Our Father together, offer a sign of peace to those around us, and those who are prepared come forward to receive Communion. If you are not receiving, you are warmly welcome to come forward for a blessing — simply cross your arms over your chest.',
    why: 'Communion is the most intimate moment of Mass — receiving Christ himself into our bodies. If you are not yet Catholic or not in a state of grace, coming forward for a blessing is a beautiful and welcome participation.',
  },
  {
    id: 'concluding',
    title: 'Concluding Rites',
    posture: 'Stand',
    description: 'The priest blesses us and sends us out into the world. Mass ends not as a goodbye, but as a commissioning — go and live what you have received.',
    why: 'The word "Mass" comes from the Latin missa — meaning "sent." Every Mass ends with a sending. We are not meant to keep what we have received; we are meant to give it away.',
  },
]

const postureColors: Record<string, string> = {
  'Stand': 'bg-secondary text-foreground',
  'Sit': 'bg-secondary text-foreground',
  'Kneel': 'bg-secondary text-foreground',
  'Stand, then Kneel': 'bg-secondary text-foreground',
  'Stand or Kneel': 'bg-secondary text-foreground',
}

export function MassTab({ onEnterChurchMode }: { onEnterChurchMode: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <section>
        <h1 className="font-heading text-3xl font-semibold text-foreground">The Mass</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A simple guide to what happens during Mass and why. Tap any section to learn more.
        </p>
      </section>

      {/* Before Mass */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Before Mass begins
        </p>
        <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/80">
          <p>
            As you enter the church, you will find a small font of holy water near the doors. Dip your fingers and make the <GlossaryTerm id="genuflect">Sign of the Cross</GlossaryTerm> — a reminder of your baptism.
          </p>
          <p>
            Before entering your <GlossaryTerm id="pew">pew</GlossaryTerm>, look toward the altar. If you see a red light burning, that is the sanctuary lamp — it means Jesus is present in the <GlossaryTerm id="tabernacle">tabernacle</GlossaryTerm>. Catholics <GlossaryTerm id="genuflect">genuflect</GlossaryTerm> — briefly kneel on one knee — as a sign of reverence before taking their seat.
          </p>
          <p>
            Once seated, pull down the <GlossaryTerm id="kneeler">kneeler</GlossaryTerm> and take a moment for quiet prayer. There is no required prayer — simply be present. Ask God to open your heart to what he wants to say to you today.
          </p>
        </div>
      </section>

      {/* Mass sections */}
      <section className="flex flex-col gap-2.5">
        <h2 className="font-heading text-lg font-semibold text-foreground">The Order of Mass</h2>
        {massSections.map((section, i) => {
          const open = openSection === section.id
          return (
            <div key={section.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button
                type="button"
                onClick={() => setOpenSection(open ? null : section.id)}
                aria-expanded={open}
                className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">{i + 1}</span>
                    <span className="font-heading text-base font-semibold text-foreground">
                      {section.title}
                    </span>
                  </div>
                  <span className={cn(
                    'inline-flex items-center self-start rounded-full px-2.5 py-0.5 text-xs font-medium',
                    postureColors[section.posture] ?? 'bg-secondary text-foreground'
                  )}>
                    {section.posture}
                  </span>
                </div>
                <ChevronDown
                  className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 mt-1', open && 'rotate-180')}
                  aria-hidden
                />
              </button>

              {open && (
                <div className="border-t border-border px-4 py-4 flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {section.description}
                  </p>
                  <div className="rounded-xl bg-secondary/50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                      Why do Catholics do this?
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {section.why}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </section>

      {/* Enter Church Mode */}
      <button
        type="button"
        onClick={onEnterChurchMode}
        className="flex items-center justify-center gap-2.5 rounded-2xl bg-foreground px-6 py-4 text-base font-semibold text-background shadow-sm transition-opacity hover:opacity-80 active:scale-[0.99]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <line x1="12" y1="1" x2="12" y2="5"/>
          <line x1="10" y1="3" x2="14" y2="3"/>
          <polyline points="3,11 12,5 21,11"/>
          <line x1="3" y1="11" x2="3" y2="21"/>
          <line x1="21" y1="11" x2="21" y2="21"/>
          <line x1="3" y1="21" x2="21" y2="21"/>
          <path d="M9 21v-6a3 3 0 016 0v6"/>
          <circle cx="12" cy="13" r="2"/>
        </svg>
        Enter Church Mode
      </button>

    </div>
  )
}
