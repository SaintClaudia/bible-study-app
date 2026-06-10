'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlossaryTerm } from '@/components/shared/glossary-term'

interface Step {
  id: string
  phase: string
  title: string
  posture?: string
  body: React.ReactNode
  responses?: { priest: string; people: string }[]
}

const steps: Step[] = [
  {
    id: 'arrival',
    phase: 'Arriving',
    title: 'Entering the Church',
    body: (
      <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-foreground">
        <p>
          At the entrance, dip your fingers in the holy water font and make the <GlossaryTerm id="genuflect">Sign of the Cross</GlossaryTerm> — a reminder of your baptism.
        </p>
        <p>
          As you walk toward the <GlossaryTerm id="pew">pew</GlossaryTerm>, look for the red sanctuary lamp near the <GlossaryTerm id="altar">altar</GlossaryTerm>. If it is burning, Jesus is present in the <GlossaryTerm id="tabernacle">tabernacle</GlossaryTerm>.
        </p>
        <p>
          Before sitting, pause and <GlossaryTerm id="genuflect">genuflect</GlossaryTerm> — briefly kneel on one knee — toward the tabernacle as a sign of reverence.
        </p>
      </div>
    ),
  },
  {
    id: 'preparation',
    phase: 'Arriving',
    title: 'Before Mass Begins',
    body: (
      <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-foreground">
        <p>
          Once seated, pull down the <GlossaryTerm id="kneeler">kneeler</GlossaryTerm> and take a moment in quiet prayer.
        </p>
        <p>
          There is no required prayer. Simply be present. You might say:
        </p>
        <blockquote className="border-l-2 border-border pl-4 italic text-foreground/70 text-base">
          "Lord, I am here. Open my heart to hear what you want to say to me today."
        </blockquote>
      </div>
    ),
  },
  {
    id: 'introductory',
    phase: 'Introductory Rites',
    title: 'Sign of the Cross & Greeting',
    posture: 'Stand',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        Mass begins as the priest and ministers process in. When the priest reaches the altar, he bows, then greets the congregation.
      </p>
    ),
    responses: [
      { priest: 'In the name of the Father, and of the Son, and of the Holy Spirit.', people: 'Amen.' },
      { priest: 'The Lord be with you.', people: 'And with your spirit.' },
    ],
  },
  {
    id: 'penitential',
    phase: 'Introductory Rites',
    title: 'Penitential Act',
    posture: 'Stand',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        We pause to acknowledge our faults and ask for God's mercy before anything else. This is the <GlossaryTerm id="penitential-act">Penitential Act</GlossaryTerm>.
      </p>
    ),
    responses: [
      { priest: 'I confess to almighty God and to you my brothers and sisters…', people: '…through my fault, through my fault, through my most grievous fault.' },
      { priest: 'Lord, have mercy.', people: 'Lord, have mercy.' },
      { priest: 'Christ, have mercy.', people: 'Christ, have mercy.' },
      { priest: 'Lord, have mercy.', people: 'Lord, have mercy.' },
    ],
  },
  {
    id: 'gloria',
    phase: 'Introductory Rites',
    title: 'Gloria',
    posture: 'Stand',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        On Sundays and feast days, we sing or recite the Gloria — a great hymn of praise that echoes the song of the angels at the birth of Christ.
      </p>
    ),
    responses: [
      { priest: 'Glory to God in the highest,', people: 'and on earth peace to people of good will.' },
    ],
  },
  {
    id: 'readings',
    phase: 'Liturgy of the Word',
    title: 'The Readings',
    posture: 'Sit',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        We listen to two readings from Scripture — usually from the Old Testament and a New Testament letter — with a psalm sung or recited in between.
      </p>
    ),
    responses: [
      { priest: 'The word of the Lord.', people: 'Thanks be to God.' },
    ],
  },
  {
    id: 'gospel',
    phase: 'Liturgy of the Word',
    title: 'The Gospel',
    posture: 'Stand',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        We stand to honor the Gospel — the words and deeds of Jesus himself. The priest or deacon proclaims it, and we respond before and after.
      </p>
    ),
    responses: [
      { priest: 'A reading from the holy Gospel according to N.', people: 'Glory to you, O Lord.' },
      { priest: 'The Gospel of the Lord.', people: 'Praise to you, Lord Jesus Christ.' },
    ],
  },
  {
    id: 'homily',
    phase: 'Liturgy of the Word',
    title: 'Homily',
    posture: 'Sit',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        The priest or deacon reflects on the readings. This is a time to listen and let the message settle in. There is nothing to respond to — simply receive.
      </p>
    ),
  },
  {
    id: 'creed',
    phase: 'Liturgy of the Word',
    title: 'The Nicene Creed',
    posture: 'Stand',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        Together we profess our faith using the <GlossaryTerm id="nicene-creed">Nicene Creed</GlossaryTerm>. This is the same declaration of faith Catholics around the world have prayed for nearly 1,700 years.
      </p>
    ),
  },
  {
    id: 'faithful',
    phase: 'Liturgy of the Word',
    title: 'Prayers of the Faithful',
    posture: 'Stand',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        We pray for the Church, the world, those in need, and our local community. After each intention, we respond together.
      </p>
    ),
    responses: [
      { priest: 'Let us pray to the Lord.', people: 'Lord, hear our prayer.' },
    ],
  },
  {
    id: 'preparation-gifts',
    phase: 'Liturgy of the Eucharist',
    title: 'Preparation of the Gifts',
    posture: 'Sit',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        Bread and wine are brought to the <GlossaryTerm id="altar">altar</GlossaryTerm>. A collection may also be taken. This is a moment to quietly offer your own life along with the gifts.
      </p>
    ),
    responses: [
      { priest: 'Pray, brothers and sisters, that my sacrifice and yours may be acceptable…', people: 'May the Lord accept the sacrifice at your hands, for the praise and glory of his name, for our good and the good of all his holy Church.' },
    ],
  },
  {
    id: 'eucharistic-prayer',
    phase: 'Liturgy of the Eucharist',
    title: 'Eucharistic Prayer',
    posture: 'Stand, then Kneel',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        The great prayer of thanksgiving begins. We stand at first, then kneel at the <GlossaryTerm id="consecration">Consecration</GlossaryTerm> — the most sacred moment of the Mass — when the bread and wine truly become the body and blood of Christ.
      </p>
    ),
    responses: [
      { priest: 'Lift up your hearts.', people: 'We lift them up to the Lord.' },
      { priest: 'Let us give thanks to the Lord our God.', people: 'It is right and just.' },
      { priest: 'Holy, Holy, Holy Lord God of hosts…', people: 'Blessed is he who comes in the name of the Lord. Hosanna in the highest.' },
      { priest: 'The mystery of faith.', people: 'We proclaim your death, O Lord, and profess your resurrection until you come again.' },
    ],
  },
  {
    id: 'our-father',
    phase: 'Communion Rite',
    title: 'Our Father',
    posture: 'Stand',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        We pray the Our Father together — the prayer Jesus himself taught us. It is prayed aloud by the whole congregation.
      </p>
    ),
    responses: [
      { priest: 'Deliver us, Lord, we pray, from every evil…', people: 'For the kingdom, the power and the glory are yours, now and for ever.' },
    ],
  },
  {
    id: 'peace',
    phase: 'Communion Rite',
    title: 'Sign of Peace',
    posture: 'Stand',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        The priest invites us to offer a <GlossaryTerm id="sign-of-peace">sign of peace</GlossaryTerm> to those around us — a handshake, nod, or simple greeting. We cannot truly receive Christ while holding resentment toward others.
      </p>
    ),
    responses: [
      { priest: 'The peace of the Lord be with you always.', people: 'And with your spirit.' },
    ],
  },
  {
    id: 'lamb-of-god',
    phase: 'Communion Rite',
    title: 'Lamb of God',
    posture: 'Kneel',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        As the priest breaks the consecrated bread, we kneel and pray the Lamb of God — asking for mercy and peace before receiving Communion.
      </p>
    ),
    responses: [
      { priest: 'Lamb of God, you take away the sins of the world,', people: 'have mercy on us.' },
      { priest: 'Lamb of God, you take away the sins of the world,', people: 'grant us peace.' },
    ],
  },
  {
    id: 'communion',
    phase: 'Communion Rite',
    title: 'Communion',
    posture: 'Stand',
    body: (
      <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-foreground">
        <p>
          Those who are prepared come forward to receive the <GlossaryTerm id="eucharist">Eucharist</GlossaryTerm>. If you are not yet Catholic or not receiving, you are warmly welcome to come forward for a blessing — simply cross your arms over your chest.
        </p>
        <p>
          After receiving, return to your pew and spend a moment in quiet, personal prayer. This is the most intimate moment of the Mass.
        </p>
      </div>
    ),
    responses: [
      { priest: 'The Body of Christ.', people: 'Amen.' },
      { priest: 'The Blood of Christ.', people: 'Amen.' },
    ],
  },
  {
    id: 'concluding',
    phase: 'Concluding Rites',
    title: 'Blessing & Dismissal',
    posture: 'Stand',
    body: (
      <p className="text-[17px] leading-relaxed text-foreground">
        The priest blesses us and sends us out. Mass ends not as a goodbye but as a commissioning — go and live what you have received. The word "Mass" comes from the Latin <em>missa</em> — meaning sent.
      </p>
    ),
    responses: [
      { priest: 'Go in peace, glorifying the Lord by your life.', people: 'Thanks be to God.' },
    ],
  },
]

export function ChurchMode({ onExit }: { onExit: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {step.phase}
          </span>
          <span className="text-xs text-muted-foreground">
            {currentStep + 1} of {steps.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onExit}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-border">
        <div
          className="h-full bg-foreground transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="flex flex-col gap-5 max-w-lg mx-auto">

          {/* Posture badge */}
          {step.posture && (
            <span className="self-start inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
              {step.posture}
            </span>
          )}

          {/* Title */}
          <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground">
            {step.title}
          </h1>

          {/* Body */}
          {step.body}

          {/* Responses */}
          {step.responses && step.responses.length > 0 && (
            <div className="flex flex-col gap-3 mt-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Responses
              </p>
              {step.responses.map((r, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground italic mb-1.5">{r.priest}</p>
                  <p className="text-base font-semibold text-foreground">{r.people}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-5 py-4 border-t border-border" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}>
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setCurrentStep(s => s - 1)}
            disabled={isFirst}
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl border border-border transition-opacity flex-shrink-0',
              isFirst ? 'opacity-30 cursor-not-allowed' : 'hover:bg-secondary'
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => isLast ? onExit() : setCurrentStep(s => s + 1)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-foreground py-3.5 text-base font-semibold text-background transition-opacity hover:opacity-80"
          >
            {isLast ? (
              'End of Mass'
            ) : (
              <>
                Next
                <ChevronRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
