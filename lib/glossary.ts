export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  also?: string // secondary name / Latin / etymology
}

export const glossary: GlossaryTerm[] = [
  {
    id: 'sign-of-the-cross',
    term: 'Sign of the Cross',
    definition: 'A gesture of prayer made by tracing a cross over your body. It is one of the most fundamental acts of Catholic prayer — a physical profession of faith in the Trinity.',
    also: 'How to make it: Touch your forehead and say "In the name of the Father." Touch your chest and say "and of the Son." Touch your left shoulder then right shoulder and say "and of the Holy Spirit. Amen."',
  },
    term: 'Tabernacle',
    definition: 'The ornate box or container — often golden, sometimes in a side chapel — where Jesus remains truly present after Mass in the form of the consecrated Eucharist. Look for the red sanctuary lamp burning nearby. If the light is on, Jesus is present.',
  },
  {
    id: 'genuflect',
    term: 'Genuflect',
    definition: 'To briefly kneel on one knee as an act of reverence toward the tabernacle. Catholics genuflect when entering or leaving a pew as a sign of acknowledgment that Christ is present.',
    also: 'From the Latin genu (knee) + flectere (to bend).',
  },
  {
    id: 'sanctuary',
    term: 'Sanctuary',
    definition: 'The area around the altar at the front of the church, reserved for the priest and ministers during Mass. The word comes from the Latin sanctus — holy.',
  },
  {
    id: 'altar',
    term: 'Altar',
    definition: 'The table at the center of the sanctuary where the bread and wine become the body and blood of Christ during Mass. It is the most sacred furnishing in the church.',
  },
  {
    id: 'eucharist',
    term: 'Eucharist',
    definition: 'The body and blood of Jesus Christ, truly present under the form of bread and wine. The Eucharist is the center and summit of every Mass. Receiving it is called Communion.',
    also: 'From the Greek eucharistia — thanksgiving.',
  },
  {
    id: 'consecration',
    term: 'Consecration',
    definition: 'The sacred moment during the Liturgy of the Eucharist when, through the priest\'s words and the power of the Holy Spirit, the bread and wine truly become the body and blood of Christ. Catholics kneel during this moment.',
  },
  {
    id: 'homily',
    term: 'Homily',
    definition: 'The priest\'s or deacon\'s reflection on the Scripture readings, given after the Gospel. Its purpose is to connect the word of God to daily life — not a lecture, but an invitation.',
  },
  {
    id: 'liturgy',
    term: 'Liturgy',
    definition: 'The Church\'s formal public worship. Mass is the highest form of liturgy — the official prayer of the whole Church, not just a private devotion.',
    also: 'From the Greek leitourgia — public service or work of the people.',
  },
  {
    id: 'penitential-act',
    term: 'Penitential Act',
    definition: 'The moment near the start of Mass when we pause, acknowledge our faults, and ask God and one another for mercy. It prepares our hearts to receive the word of God and the Eucharist.',
  },
  {
    id: 'nicene-creed',
    term: 'Nicene Creed',
    definition: 'The ancient statement of what Catholics believe, prayed together every Sunday after the homily. It was written in 325 AD at the Council of Nicaea and has been the faith of the Church ever since.',
  },
  {
    id: 'chalice',
    term: 'Chalice',
    definition: 'The cup used at Mass to hold the consecrated wine — the blood of Christ. It is one of the most sacred vessels in the church.',
  },
  {
    id: 'adoration',
    term: 'Adoration',
    definition: 'A time of quiet prayer in the presence of Jesus in the Eucharist, usually displayed in a vessel called a monstrance in a chapel or the main church. Many parishes offer Adoration outside of Mass hours — it is simply being with Christ.',
  },
  {
    id: 'kneeler',
    term: 'Kneeler',
    definition: 'The padded bar attached to the pew in front of you that you pull down to kneel on during prayer. You will kneel at several moments during Mass, most importantly during the Consecration.',
    also: 'Also called a prie-dieu (pray-dyoo) — French for "pray God."',
  },
  {
    id: 'pew',
    term: 'Pew',
    definition: 'The long wooden bench where the congregation sits during Mass. When you arrive, find a pew, genuflect toward the tabernacle, and take a moment for quiet prayer before Mass begins.',
  },
  {
    id: 'sign-of-peace',
    term: 'Sign of Peace',
    definition: 'A moment during the Communion Rite when the priest invites everyone to offer a sign of peace to those around them — usually a handshake, nod, or brief greeting. It is a reminder that we cannot truly receive Christ while holding resentment toward others.',
  },
]

export function getGlossaryTerm(id: string): GlossaryTerm | undefined {
  return glossary.find(t => t.id === id)
}
