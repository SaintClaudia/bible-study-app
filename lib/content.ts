export type Reading = {
  label: string
  reference: string
  summary: string
  excerpt: string
}

export type SundayReadings = {
  liturgicalDay: string
  date: string
  theme: string
  themeNote: string
  readings: Reading[]
  reflectionQuestion: string
}

export const sundayReadings: SundayReadings = {
  liturgicalDay: 'Sunday in Ordinary Time',
  date: 'This Sunday',
  theme: 'Trusting God in the small things',
  themeNote:
    'This week the readings gently remind us that faithfulness begins with the ordinary moments — and that God meets us right where we are.',
  readings: [
    {
      label: 'First Reading',
      reference: 'Isaiah 55:1–3',
      summary:
        'God invites everyone, even those with nothing to offer, to come and receive freely. It is a picture of generous welcome — no payment, no perfection required.',
      excerpt:
        '“Come to the water, all you who are thirsty; though you have no money, come, receive grain and eat.”',
    },
    {
      label: 'Responsorial Psalm',
      reference: 'Psalm 145',
      summary:
        'A song of praise for a God who is near, patient, and kind. The refrain reminds us that God opens his hand and satisfies our needs.',
      excerpt: '“The hand of the Lord feeds us; he answers all our needs.”',
    },
    {
      label: 'Second Reading',
      reference: 'Romans 8:35, 37–39',
      summary:
        'Paul assures us that nothing — not hardship, fear, or anything in all creation — can separate us from the love of God in Christ.',
      excerpt:
        '“Neither death, nor life… will be able to separate us from the love of God.”',
    },
    {
      label: 'Gospel',
      reference: 'Matthew 14:13–21',
      summary:
        'Jesus feeds a crowd of thousands with five loaves and two fish. A small offering, placed in his hands, becomes more than enough for everyone.',
      excerpt:
        '“They all ate and were satisfied, and they picked up the fragments left over.”',
    },
  ],
  reflectionQuestion:
    'Where in your life are you being invited to offer what feels small, and trust God to make it enough?',
}

export type MassSection = {
  id: string
  title: string
  posture: 'Stand' | 'Sit' | 'Kneel' | 'Stand or Kneel'
  description: string
  responses?: { prompt: string; response: string }[]
  whyCatholicsDoThis?: string
}

export const massSections: MassSection[] = [
  {
    id: 'introductory-rites',
    title: 'Introductory Rites',
    posture: 'Stand',
    description:
      'Mass begins as the priest processes in. We make the Sign of the Cross, greet one another, and ask God for mercy before praising him in the Gloria.',
    responses: [
      { prompt: 'The Lord be with you.', response: 'And with your spirit.' },
      { prompt: 'Lord, have mercy.', response: 'Lord, have mercy.' },
    ],
    whyCatholicsDoThis:
      'We begin by acknowledging God and asking for mercy so we can enter worship with a humble, ready heart.',
  },
  {
    id: 'liturgy-of-the-word',
    title: 'Liturgy of the Word',
    posture: 'Sit',
    description:
      'We listen to readings from Scripture — usually the Old Testament, a Psalm, and a New Testament letter. We sit and simply receive God’s word.',
    responses: [
      { prompt: 'The word of the Lord.', response: 'Thanks be to God.' },
      { prompt: 'A reading from the holy Gospel…', response: 'Glory to you, O Lord.' },
    ],
    whyCatholicsDoThis:
      'Catholics believe God truly speaks to us through Scripture. We stand for the Gospel to honor the words of Christ himself.',
  },
  {
    id: 'homily',
    title: 'Homily',
    posture: 'Sit',
    description:
      'The priest or deacon explains the readings and connects them to daily life. This is a time to listen and let the message settle in.',
    whyCatholicsDoThis:
      'The homily helps us understand Scripture and apply it — turning ancient words into something we can live this week.',
  },
  {
    id: 'creed',
    title: 'The Creed',
    posture: 'Stand',
    description:
      'Together we profess what we believe using the Nicene Creed — a summary of the Christian faith shared by Catholics around the world.',
    whyCatholicsDoThis:
      'Saying the Creed together connects us to Christians across the centuries who professed the same faith.',
  },
  {
    id: 'prayers-of-the-faithful',
    title: 'Prayers of the Faithful',
    posture: 'Stand',
    description:
      'We pray for the Church, the world, those in need, and our local community. After each intention, the congregation responds.',
    responses: [
      { prompt: 'Let us pray to the Lord.', response: 'Lord, hear our prayer.' },
    ],
    whyCatholicsDoThis:
      'As a community, we bring the needs of the whole world before God together.',
  },
  {
    id: 'liturgy-of-the-eucharist',
    title: 'Liturgy of the Eucharist',
    posture: 'Stand or Kneel',
    description:
      'Bread and wine are brought forward and the priest offers the great prayer of thanksgiving. We kneel as this most sacred part of the Mass unfolds.',
    responses: [
      { prompt: 'Lift up your hearts.', response: 'We lift them up to the Lord.' },
      {
        prompt: 'Let us give thanks to the Lord our God.',
        response: 'It is right and just.',
      },
    ],
    whyCatholicsDoThis:
      'Catholics believe the bread and wine become the Body and Blood of Christ. We kneel out of reverence for his presence.',
  },
  {
    id: 'communion',
    title: 'Communion',
    posture: 'Stand',
    description:
      'We pray the Our Father, share a sign of peace, and those prepared come forward to receive Communion. If you are not receiving, you are warmly welcome to come forward for a blessing.',
    responses: [
      { prompt: 'The Body of Christ.', response: 'Amen.' },
    ],
    whyCatholicsDoThis:
      'Communion is the heart of the Mass — a real, intimate union with Christ and with the whole Church.',
  },
  {
    id: 'concluding-rites',
    title: 'Concluding Rites',
    posture: 'Stand',
    description:
      'The priest blesses us and sends us out into the world. Mass ends not as a goodbye, but as a commissioning to live our faith.',
    responses: [
      {
        prompt: 'Go in peace, glorifying the Lord by your life.',
        response: 'Thanks be to God.',
      },
    ],
    whyCatholicsDoThis:
      'The word “Mass” comes from a Latin word meaning “to be sent.” We leave to bring Christ to others.',
  },
]

export type Lesson = {
  id: string
  title: string
  minutes: number
  intro: string
  body: string[]
  takeaways: string[]
  reflection: string
}

export type LearningPath = {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export const learningPaths: LearningPath[] = [
  {
    id: 'attending-mass',
    title: 'Attending Mass',
    description:
      'Walk into Mass knowing what to expect and why each part matters.',
    lessons: [
      {
        id: 'what-is-the-mass',
        title: 'What Is the Mass?',
        minutes: 4,
        intro:
          'Before the postures and responses, it helps to know what the Mass actually is.',
        body: [
          'The Mass is the central act of worship for Catholics. It has two main parts: the Liturgy of the Word, where we listen to Scripture, and the Liturgy of the Eucharist, where bread and wine are offered and received.',
          'It is both a memorial and a real participation — Catholics believe that at Mass we are united with the one sacrifice of Christ. It is not a performance to watch, but a prayer we enter together.',
          'You do not need to have everything memorized. Most parishes provide worship aids, and the rhythm becomes familiar quickly.',
        ],
        takeaways: [
          'The Mass has two main parts: Word and Eucharist.',
          'It is a shared prayer, not a performance.',
          'You can simply follow along — no memorization required.',
        ],
        reflection:
          'What is one thing about the Mass you would like to understand better?',
      },
      {
        id: 'when-to-sit-stand-kneel',
        title: 'When to Sit, Stand, and Kneel',
        minutes: 3,
        intro:
          'The postures of the Mass each carry meaning. Here is a simple guide.',
        body: [
          'We stand to show respect and readiness — for the Gospel, the Creed, and prayers. We sit to listen and reflect during the readings and homily. We kneel during the most sacred moments of the Eucharist as a sign of reverence and humility.',
          'If you are unable to kneel or stand, that is completely fine. The posture of your heart matters most.',
          'When in doubt, follow those around you. No one expects a newcomer to know every cue.',
        ],
        takeaways: [
          'Stand = respect and readiness.',
          'Sit = listen and reflect.',
          'Kneel = reverence during the Eucharist.',
        ],
        reflection:
          'How might paying attention to posture help you pray more fully?',
      },
    ],
  },
  {
    id: 'learning-to-pray',
    title: 'Learning to Pray',
    description: 'Simple, time-tested ways to talk and listen to God.',
    lessons: [
      {
        id: 'starting-to-pray',
        title: 'Starting to Pray',
        minutes: 3,
        intro: 'Prayer can feel intimidating. It does not need to be.',
        body: [
          'Prayer is simply turning your heart toward God. It can be words, silence, gratitude, or even a single honest sentence.',
          'A good place to begin is with the Our Father — the prayer Jesus himself taught. You can also speak to God in your own words, as you would a trusted friend.',
          'Consistency matters more than length. A minute each morning is a strong beginning.',
        ],
        takeaways: [
          'Prayer is turning your heart toward God.',
          'The Our Father is a perfect starting point.',
          'A short daily habit beats occasional long sessions.',
        ],
        reflection: 'When in your day could you set aside one quiet minute for God?',
      },
    ],
  },
  {
    id: 'understanding-beliefs',
    title: 'Understanding Catholic Beliefs',
    description: 'The core of the faith, explained plainly.',
    lessons: [
      {
        id: 'who-is-jesus',
        title: 'Who Is Jesus?',
        minutes: 4,
        intro: 'Everything in Catholic faith centers on one person.',
        body: [
          'Catholics believe Jesus is both fully God and fully human — God who entered the world to draw us back to himself.',
          'Through his life, death, and resurrection, he opened the way to reconciliation with God. This is the heart of what Christians call “the Gospel,” meaning good news.',
          'Knowing about Jesus and knowing Jesus are different things. The faith invites you into a relationship, not just a set of facts.',
        ],
        takeaways: [
          'Jesus is believed to be fully God and fully human.',
          'His resurrection is the center of the faith.',
          'Faith is an invitation to relationship.',
        ],
        reflection: 'What questions about Jesus would you most like answered?',
      },
    ],
  },
  {
    id: 'becoming-catholic',
    title: 'Becoming Catholic',
    description: 'What the journey looks like, step by step.',
    lessons: [
      {
        id: 'what-is-ocia',
        title: 'What Is OCIA?',
        minutes: 4,
        intro:
          'OCIA is the path most adults take to become Catholic. Here is what it involves.',
        body: [
          'OCIA (the Order of Christian Initiation of Adults) is a welcoming process of learning, prayer, and community for those exploring or joining the Catholic Church.',
          'There is no pressure and no quiz. It moves at the pace of your questions, usually meeting weekly at a local parish, often beginning in the fall.',
          'Many people start OCIA simply curious. You are free to explore without committing to anything until you are ready.',
        ],
        takeaways: [
          'OCIA is a guided process for adults joining the Church.',
          'It is built around your questions and pace.',
          'You can explore without any obligation.',
        ],
        reflection:
          'What would help you feel comfortable taking a first step like visiting a parish?',
      },
    ],
  },
  {
    id: 'living-the-faith',
    title: 'Living the Faith',
    description: 'Carrying your faith into everyday life.',
    lessons: [
      {
        id: 'faith-in-daily-life',
        title: 'Faith in Daily Life',
        minutes: 3,
        intro: 'Faith is not just for Sundays.',
        body: [
          'Living the faith means letting your beliefs shape ordinary moments — how you treat others, how you handle stress, how you spend your time.',
          'Small practices help: a short morning prayer, gratitude before meals, an act of kindness, or a moment of reflection at night.',
          'Growth is gradual. The goal is not perfection but a steady turning toward love.',
        ],
        takeaways: [
          'Faith shapes everyday moments, not just Sundays.',
          'Small, repeatable practices build a life of faith.',
          'Growth is gradual — aim for steadiness, not perfection.',
        ],
        reflection: 'What is one small practice you could add to your daily routine?',
      },
    ],
  },
]

/* ----------------------------------------------------------------
   Journey — orientation topics for those exploring or entering
   the Catholic faith. Read-through articles + an FAQ.
------------------------------------------------------------------*/

export type JourneyFaq = {
  q: string
  a: string
}

export type JourneyTopic = {
  id: string
  title: string
  summary: string
  intro: string
  body?: string[]
  faqs?: JourneyFaq[]
  note?: string
}

export const journeyTopics: JourneyTopic[] = [
  {
    id: 'do-i-need-ocia',
    title: 'Do I Need OCIA?',
    summary: 'How adults come into the Church — and who the process is for.',
    intro:
      'OCIA (the Order of Christian Initiation of Adults, formerly called RCIA) is the Church\'s process for welcoming adults into full communion. Whether you need it depends on where you are starting from.',
    body: [
      'OCIA is the usual path if you have never been baptized. Over a season of formation you prepare to receive Baptism, Confirmation, and First Communion — the three Sacraments of Initiation — typically at the Easter Vigil.',
      'If you were baptized in another Christian tradition (for example Protestant or Orthodox), you are already a Christian. You would not be re-baptized; instead you make a Profession of Faith and are received into full communion, usually with Confirmation and First Communion. Many parishes still walk you through OCIA-style formation first.',
      'If you were baptized Catholic as a child but never confirmed or never received First Communion, you do not need the full OCIA process either. Parishes often have a shorter track to complete the sacraments you are missing.',
      'The honest answer for most people is: talk to your parish. They will ask a few questions about your background and point you to the right path — which may be full OCIA, a shorter track, or simply meeting with a priest.',
    ],
    note:
      'Every diocese and parish runs this a little differently. Your local parish office is the best place to start.',
  },
  {
    id: 'marriage-and-annulments',
    title: 'Marriage & Annulments',
    summary: 'What the Church believes about marriage, and what an annulment actually is.',
    intro:
      'Marriage is one of the seven sacraments, and the Church takes it seriously as a lifelong, faithful, life-giving bond. Questions about past marriages come up often for people entering the Church.',
    body: [
      'The Church understands a valid marriage as permanent — "until death." Because of that, it does not recognize civil divorce as ending a sacramental marriage on its own.',
      'An annulment (more precisely, a "declaration of nullity") is not a "Catholic divorce." It is a finding by a Church tribunal that, despite everyone\'s good intentions, something essential was missing at the very beginning that prevented a binding marriage from forming.',
      'A declaration of nullity does not make children illegitimate, and it is not a judgment that the relationship had no value. It is a careful look back at what was — and wasn\'t — present on the wedding day.',
      'If you are divorced and wondering how it affects coming into the Church or receiving the sacraments, this is exactly the kind of thing your parish helps with. Many people are surprised by how workable their situation turns out to be.',
    ],
    note:
      'These situations are personal and specific. A priest or deacon can walk you through your own case confidentially — please don\'t let uncertainty here keep you away.',
  },
  {
    id: 'what-happens-at-easter',
    title: 'What Happens at Easter?',
    summary: 'The Easter Vigil and the sacraments that bring new members into the Church.',
    intro:
      'For those in OCIA, the journey points toward Easter. Understanding the Triduum — the three holiest days of the year — helps the whole season make sense.',
    body: [
      'The Easter Triduum begins on Holy Thursday evening, continues through Good Friday and Holy Saturday, and culminates at the Easter Vigil. It is a single great celebration of Christ\'s passion, death, and resurrection.',
      'The Easter Vigil, held on Saturday night, is the high point. It opens in darkness with the lighting of the Paschal candle, moves through a series of Scripture readings that retell salvation history, and then erupts into the joy of the Resurrection.',
      'It is at this Vigil that those preparing through OCIA are usually baptized, confirmed, and receive the Eucharist for the first time. Those already baptized make their Profession of Faith and are received into full communion.',
      'If you are preparing now, this is the destination — but there is no pressure to rush. People are welcomed at the Vigil when they and their parish discern they are ready, whether that is this Easter or a later one.',
    ],
  },
  {
    id: 'common-questions',
    title: 'Common Questions',
    summary: 'Quick answers to the things people most often wonder about.',
    intro:
      'A few of the questions that come up again and again when someone is exploring the Catholic faith.',
    faqs: [
      {
        q: 'Do I have to believe everything right away?',
        a: 'No. Formation is a journey. You are invited to keep learning and asking questions — sincere wrestling with the faith is welcomed, not penalized.',
      },
      {
        q: 'Can I attend Mass before I\'m Catholic?',
        a: 'Absolutely. Anyone is welcome at Mass. You simply don\'t receive Communion yet — you can come forward for a blessing or remain in your pew, and no one will think twice.',
      },
      {
        q: 'How long does becoming Catholic take?',
        a: 'It varies. Many parishes follow a roughly year-long rhythm pointing toward Easter, but the timeline flexes to where you actually are. There is no single deadline.',
      },
      {
        q: 'Do I need to go to Confession before I\'m received?',
        a: 'Those being baptized do not — Baptism washes away all sin. Those already baptized and coming into full communion usually make their first Confession before being received.',
      },
      {
        q: 'What if I\'m not sure I believe in God yet?',
        a: 'That\'s okay, and you\'re not alone. Plenty of people begin by exploring honestly. Talk with a priest or someone in your parish — curiosity is a fine place to start.',
      },
    ],
    note:
      'Have a question that isn\'t here? Bring it to your parish — they would much rather you ask than wonder.',
  },
]

/* ----------------------------------------------------------------
   Resources — curated things to watch, listen to, read, and learn.
------------------------------------------------------------------*/

export type ResourceItem = {
  name: string
  note: string
  href?: string
}

export type ResourceGroup = {
  id: string
  label: string
  kind: 'watch' | 'listen' | 'read' | 'learn'
  items: ResourceItem[]
}

export const resourceGroups: ResourceGroup[] = [
  {
    id: 'watch',
    label: 'Watch',
    kind: 'watch',
    items: [
      {
        name: 'The Chosen',
        note: 'A beautifully made series on the life of Christ and those who followed him.',
        href: 'https://www.thechosen.tv/',
      },
    ],
  },
  {
    id: 'listen',
    label: 'Listen',
    kind: 'listen',
    items: [
      {
        name: 'Hallow',
        note: 'A Catholic prayer and meditation app — rosaries, examens, and sleep prayers.',
        href: 'https://hallow.com/',
      },
      {
        name: 'Bible in a Year',
        note: 'Fr. Mike Schmitz reads and unpacks all of Scripture across a year of episodes.',
        href: 'https://ascensionpress.com/pages/biy-registration',
      },
      {
        name: 'Catechism in a Year',
        note: 'A companion podcast walking through the entire Catechism, day by day.',
        href: 'https://ascensionpress.com/pages/ciy-registration',
      },
    ],
  },
  {
    id: 'read',
    label: 'Read',
    kind: 'read',
    items: [
      {
        name: 'Why We\'re Catholic',
        note: 'Trent Horn\'s warm, accessible case for the core of the Catholic faith.',
      },
      {
        name: 'The Case for Jesus',
        note: 'Brant Pitre on the reliability of the Gospels and the identity of Christ.',
      },
      {
        name: 'USCCB',
        note: 'The U.S. bishops\' site — daily readings, Church teaching, and official documents.',
        href: 'https://www.usccb.org/',
      },
      {
        name: 'Theology of Home',
        note: 'On finding the sacred in ordinary domestic life and the rhythms of the home.',
        href: 'https://theologyofhome.com/',
      },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    kind: 'learn',
    items: [
      {
        name: 'Laudate',
        note: 'A free, all-in-one Catholic app — prayers, readings, rosary, and more.',
      },
      {
        name: 'Magisterium AI',
        note: 'Ask questions and get answers grounded in Church teaching, with citations.',
        href: 'https://www.magisterium.com/',
      },
      {
        name: 'The Pillar Podcast',
        note: 'Smart, candid conversation on news and life in the Catholic Church.',
        href: 'https://www.pillarcatholic.com/',
      },
    ],
  },
]
