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
  icon: string
  iconSize?: number
  lessonCount: number
  lessons: Lesson[]
}

export const learningPaths: LearningPath[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'A gentle introduction to the Catholic faith for those beginning or exploring their journey.',
    icon: '/getting-started.png',
    iconSize: 32,
    lessonCount: 8,
    lessons: [
      {
        id: 'who-is-jesus',
        title: 'Who Is Jesus?',
        minutes: 4,
        intro: 'Meet the person at the center of the Christian faith and discover why everything in Catholicism begins with Him.',
        body: [
          'Jesus of Nazareth was born in Bethlehem around 4 BC, lived and taught in first-century Judea, and was crucified under the Roman governor Pontius Pilate. Three days later, his followers encountered him risen from the dead — an event that changed the course of human history.',
          'But Catholics don\'t simply remember Jesus as a historical figure. They believe he is the Son of God — fully divine and fully human — who came not to establish a religion, but to restore a relationship. Everything in the Catholic faith flows from this: the sacraments, the Scriptures, the Mass, the Church itself.',
          'When Catholics gather for Mass each Sunday, they are not merely commemorating someone who lived two thousand years ago. They believe they are encountering him, truly present, in the Word proclaimed and in the Eucharist shared.',
          'If you\'re just beginning, you don\'t need to have this figured out. Most people who found their way to faith started with a question, a quiet curiosity, or simply a feeling that there was something more. Jesus meets people where they are — he always has.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-ocia',
        title: 'What Is OCIA?',
        minutes: 4,
        intro: 'Learn what OCIA is, who it\'s for, and what to expect as you explore becoming Catholic.',
        body: [
          'OCIA stands for the Order of Christian Initiation of Adults. It\'s the formal process through which adults explore and enter the Catholic faith, and it\'s been part of the Church in various forms since the earliest centuries of Christianity.',
          'In the early Church, becoming a Christian was a serious, communal commitment. Candidates spent months — sometimes years — learning the faith alongside a community before being baptized at Easter. OCIA today reflects that ancient practice: a gradual journey of formation, prayer, learning, and belonging.',
          'OCIA is for anyone curious about becoming Catholic — whether you\'ve never been baptized, were baptized in another Christian tradition, or were baptized Catholic as a child but never completed your initiation. The process looks different depending on where you\'re starting.',
          'Most OCIA programs meet weekly, beginning in the fall and culminating at the Easter Vigil — the holiest night of the Catholic year — when candidates receive the sacraments of initiation: Baptism, Confirmation, and the Eucharist.',
          'You don\'t need to know if Catholicism is right for you before you begin. OCIA is a space to ask, learn, and discern. The Church is not asking you to arrive with all the answers.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'can-i-go-to-mass',
        title: 'Can I Go to Mass If I\'m Not Catholic?',
        minutes: 3,
        intro: 'Wondering if you\'re welcome? Learn what to expect, how to participate, and why simply showing up is an important first step.',
        body: [
          'Yes — and not just as a visitor. You are genuinely welcome.',
          'The Catholic Mass is the central act of worship in the Church, and it has always drawn people in from the outside. Historically, even in the early centuries, non-Christians were invited to attend the first part of the Mass — what was called the Liturgy of the Word — where Scripture is read and a homily is given.',
          'You are welcome to sit, stand, and kneel with the congregation. You\'re welcome to listen to the readings, sing if you feel moved, and take in everything around you. The one thing reserved for practicing Catholics in a state of grace is receiving Communion — but even then, you\'re warmly invited to come forward with your arms crossed over your chest to receive a blessing instead.',
          'Many people find that attending Mass before fully understanding it is part of how understanding eventually comes. Something settles in the repetition of the prayers, the silence, the ancient rhythms. You don\'t have to have it figured out before you walk through the door.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-happens-at-mass',
        title: 'What Happens at Mass?',
        minutes: 5,
        intro: 'From the opening procession to the final blessing, discover the purpose behind each part of the Mass.',
        body: [
          'The Mass follows a pattern that has remained largely the same for nearly two thousand years. It\'s organized around two central movements: the Liturgy of the Word and the Liturgy of the Eucharist.',
          'The Mass begins with the Introductory Rites — a procession, the Sign of the Cross, and a communal acknowledgment of God\'s mercy. Then comes the Liturgy of the Word: readings from the Old Testament, a responsorial Psalm, a New Testament letter, and finally the Gospel. The priest or deacon gives a homily, and the congregation prays together.',
          'The second half is the Liturgy of the Eucharist. Bread and wine are brought forward, and the great Eucharistic Prayer begins — an ancient prayer of thanksgiving rooted in the Jewish Passover meal Jesus shared with his disciples the night before he died. At the Consecration, Catholics believe the bread and wine truly become the body and blood of Christ. Communion follows for those prepared to receive it.',
          'Mass ends with a blessing and a sending. The word "Mass" itself comes from the Latin missa, meaning "to be sent." Every Mass ends with a commission to carry what you\'ve received out into the world.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-bible-should-i-buy',
        title: 'What Bible Should I Buy?',
        minutes: 4,
        intro: 'Learn why Catholic Bibles are different, which translations are recommended, and where to begin reading.',
        body: [
          'Catholic Bibles contain 73 books — seven more than most Protestant Bibles. These additional books, known as the deuterocanonical books, include texts like Sirach, Tobit, and Maccabees. They\'ve been part of the Christian Old Testament since the earliest centuries of the Church, preserved in the Greek translation of Scripture used by the first Christians.',
          'Two translations are widely recommended for Catholics: the New American Bible Revised Edition — which is what you\'ll hear proclaimed at Mass in the United States — and the Revised Standard Version Catholic Edition, which many find especially clear for personal study.',
          'If you\'re just beginning, don\'t worry about reading the Bible from cover to cover. Start with the Gospel of Mark — it\'s the shortest of the four Gospels, written with a sense of urgency, and it takes you directly into who Jesus is and what he did. From there, follow your curiosity.',
          'The Bible wasn\'t meant to be read alone. Catholics read it alongside the Church\'s Tradition, in community, and in light of two thousand years of reflection. That doesn\'t make it complicated — it makes it richer.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'how-catholics-read-bible',
        title: 'How Do Catholics Read the Bible?',
        minutes: 4,
        intro: 'Discover how Catholics read Scripture alongside Sacred Tradition and within the life of the Church.',
        body: [
          'Catholics believe the Bible is the inspired Word of God — but they also believe it was written by human authors, in specific times and places, for specific communities. Reading it well means paying attention to both dimensions: what God is communicating and the human context in which it was written.',
          'Catholics don\'t approach Scripture alone. The Church reads it alongside Sacred Tradition — the living faith handed down from the Apostles — and under the guidance of the Magisterium, the Church\'s teaching authority. This is sometimes misunderstood as the Church replacing Scripture, but it\'s the opposite: the Church serves Scripture, protects its meaning, and draws from it in every generation.',
          'In practice, this means that when you hear a passage at Mass, you\'re receiving something that has been prayed over, interpreted, and lived for two thousand years. The homily is an invitation to encounter that living tradition — not just what the text says, but what it means now, in your life, today.',
          'The Catholic approach to Scripture is ancient and still unfolding. You don\'t need to know everything before you begin reading. Start somewhere, read slowly, and let the questions come naturally.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'catholic-words',
        title: 'Catholic Words You\'ll Hear',
        minutes: 5,
        intro: 'Become familiar with common words and phrases like Eucharist, parish, sacrament, tabernacle, liturgy, diocese, and more.',
        body: [
          'The Catholic Church has a vocabulary of its own — words drawn from Greek, Latin, and Hebrew that can feel unfamiliar at first but carry deep meaning once you know them.',
          'Eucharist comes from the Greek word for "thanksgiving." It refers to the central sacrament of the Mass — the consecrated bread and wine that Catholics believe is truly the body and blood of Christ.',
          'Parish is the local Catholic community you belong to — your home church and the people who gather there with you each week.',
          'Sacrament refers to the seven sacred rites of the Church — Baptism, Confirmation, Eucharist, Reconciliation, Anointing of the Sick, Holy Orders, and Marriage — through which Catholics believe God\'s grace is made present and effective.',
          'Tabernacle is the sacred vessel, often gold, in which the consecrated Eucharist is reserved after Mass. A burning candle or lamp nearby indicates that Christ is present.',
          'Liturgy means the public, communal worship of the Church — the formal prayer that follows a set order and has been celebrated in some form since the earliest Christians gathered together.',
          'Diocese is a regional grouping of parishes, led by a bishop.',
          'You don\'t need to memorize these before your first visit. Most of them will begin to make sense simply by showing up and paying attention.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'beginning-your-journey',
        title: 'Beginning Your Journey',
        minutes: 4,
        intro: 'It\'s normal to have questions, feel uncertain, or wonder if you\'re doing everything correctly. Every Catholic begins somewhere, and every journey starts with a single step.',
        body: [
          'If you\'ve made it this far, you\'re already on your way.',
          'It\'s completely normal to feel uncertain — to wonder if you believe enough, know enough, or are ready enough. The honest truth is that no one who has ever joined the Catholic Church arrived feeling fully certain. Faith is not a feeling you achieve; it\'s a relationship you step into.',
          'The Catholic tradition is ancient, wide, and deep — two thousand years of theology, saints, art, music, prayer, and ordinary people trying to live faithfully in an imperfect world. You will not understand all of it before Easter. You may not understand all of it in a lifetime. That\'s not a problem. The Church doesn\'t ask you to arrive with all the answers; it asks you to show up and walk with those who have walked before you.',
          'Give yourself permission to have questions without rushing toward conclusions. Give yourself permission to be moved by something beautiful before you understand it theologically. Give yourself permission to begin.',
          'Every Catholic you know began somewhere. Most of them began exactly where you are — curious, a little unsure, and willing to take a single step forward. That step is enough.',
        ],
        takeaways: [],
        reflection: '',
      },
    ],
  },
  {
    id: 'scripture',
    title: 'Scripture',
    description: 'Learn how Catholics read and understand the Bible.',
    icon: '/scripture.png',
    lessonCount: 10,
    lessons: [],
  },
  {
    id: 'prayer',
    title: 'Prayer',
    description: 'Simple, time-tested ways to talk and listen to God.',
    icon: '/pray-icon.png',
    lessonCount: 12,
    lessons: [],
  },
  {
    id: 'core-beliefs',
    title: 'Core Beliefs',
    description: 'The heart of what Catholics believe, explained plainly.',
    icon: '/core-beliefs.png',
    lessonCount: 15,
    lessons: [],
  },
  {
    id: 'sacraments',
    title: 'Sacraments',
    description: 'Understand the seven sacraments and what they mean.',
    icon: '/sacraments.png',
    lessonCount: 10,
    lessons: [],
  },
  {
    id: 'christian-living',
    title: 'Christian Living',
    description: 'How the faith shapes everyday life and relationships.',
    icon: '/christian-living.png',
    lessonCount: 12,
    lessons: [],
  },
  {
    id: 'church-history',
    title: 'Church History',
    description: 'Two thousand years of the Catholic Church, briefly told.',
    icon: '/church-history.png',
    lessonCount: 8,
    lessons: [],
  },
  {
    id: 'catholic-life',
    title: 'Catholic Life',
    description: 'Practices, seasons, and rhythms of the Catholic year.',
    icon: '/catholic-life.png',
    lessonCount: 12,
    lessons: [],
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
  noteLink?: { text: string; href: string }
}

export const journeyTopics: JourneyTopic[] = [
  {
    id: 'do-i-need-ocia',
    title: 'Do I Need OCIA?',
    summary: 'How adults come into the Church — and who the process is for.',
    intro:
      'OCIA (the Order of Christian Initiation of Adults, formerly called RCIA) is the Catholic Church\'s process for helping adults learn about the faith and prepare for the sacraments.',
    body: [
      'In many parishes, everyone enters the same formation process regardless of where they are starting. Some participants have never been baptized, some were baptized in another Christian church, and others are Catholics who have not yet received all of their sacraments.',
      'The goal of OCIA is not simply to attend classes, but to learn about the Catholic faith, ask questions, and discern whether God is calling you into full communion with the Church.',
      'Most programs meet weekly and include teaching, discussion, prayer, and opportunities to build relationships with others on a similar journey. Programs often begin in late summer or early fall and continue through Easter, though schedules vary by parish.',
      'Every person\'s situation is unique. Previous marriages, civil marriages, divorce, annulments, missing sacramental records, and other circumstances can affect the process and may require additional conversations with your parish.',
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
      'Marriage is one of the most common topics discussed during OCIA because every person\'s story is unique.',
      'You may be single, married, divorced, remarried, widowed, or married outside of the Catholic Church. Depending on your circumstances, your parish may need to have additional conversations with you as part of your sacramental preparation.',
      'An annulment, sometimes called a declaration of nullity, is not the same as a civil divorce. It is a process the Church uses to better understand the circumstances surrounding a marriage and determine whether a valid marriage existed from the beginning.',
      'If an annulment is needed before receiving certain sacraments, your parish will guide you through the process. Depending on your situation, you may be asked to provide documents such as marriage records, divorce decrees, baptismal records, or other supporting information.',
      'The process is typically handled through your parish and submitted to the diocese for review. While every case is unique, your parish can explain the requirements, help gather the necessary paperwork, and answer questions along the way.',
    ],
    note:
      'These situations are personal and specific. A priest or deacon can walk you through your own case confidentially and explain any next steps.',
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
    id: 'sponsors',
    title: 'Sponsors',
    summary: 'Who a sponsor is, what they do, and what to do if you don\'t have one yet.',
    intro:
      'A sponsor is a practicing Catholic who walks alongside you during OCIA — someone who has already made the journey of faith and can support you as you make yours.',
    body: [
      'Every person preparing for the sacraments through OCIA is asked to have a sponsor. This is not just a formality. Your sponsor is someone who knows you, prays for you, and accompanies you through the process — from the weekly sessions all the way to the Easter Vigil.',
      'The role of a sponsor is to be a witness and a companion. They attend sessions and rites with you when possible, answer questions from their own lived experience of the faith, and serve as a living example of what it looks like to be Catholic. They are not expected to have all the answers — that is what the formation process is for.',
      'A sponsor must be a fully initiated Catholic — baptized, confirmed, and receiving the Eucharist — and in good standing with the Church. A spouse who is not yet Catholic cannot serve as a sponsor, though they are always welcome to attend and participate.',
      'When choosing a sponsor, think of someone whose faith you admire and who you feel comfortable being honest with. It might be a friend, a family member, a coworker, or someone you know from your parish community. All you need to do is ask.',
    ],
    note:
      'If you are not able to find a sponsor on your own, do not worry. The parish will help assign one for you as you get closer to the Easter Vigil. You will not go through this without support.',
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
        a: 'Many parishes follow a yearly OCIA schedule that leads to the Easter Vigil. Depending on your background and circumstances, additional preparation may be needed before receiving certain sacraments.\n\nWhile the program has a schedule, faith is a lifelong journey.',
      },
      {
        q: 'Do I need to go to Confession before I\'m received?',
        a: 'During OCIA, you\'ll learn about the Sacrament of Reconciliation, how to prepare for it, and when it is received as part of your journey into the Church. If you feel called to go to Confession, most parishes offer regular times for Reconciliation throughout the week.\n\nIn the Catholic faith, priests serve in the person of Christ and have been entrusted by the Church to hear confessions and offer God\'s forgiveness through this sacrament.',
      },
      {
        q: 'What if I\'m not sure I believe in God yet?',
        a: 'That\'s okay, and you\'re not alone. Plenty of people begin by exploring honestly. Talk with a priest or someone in your parish — curiosity is a fine place to start.',
      },
    ],
    note:
      'Have a question that isn\'t covered here? This guide was built from real questions asked during OCIA, and your question may help someone else on the same journey.',
    noteLink: { text: 'Send it our way.', href: 'https://biblestudylovesyou.com/contact.html' },
  },
]

/* ----------------------------------------------------------------
   Resources — curated things to watch, listen to, read, and learn.
------------------------------------------------------------------*/

export type ResourceItem = {
  name: string
  note: string
  href?: string
  image?: string
  display?: 'app' | 'book' | 'hero'
  category?: string
  description?: string | string[]
  details?: string[]
  pageNote?: string
  spotifyEmbedSrc?: string
  creator?: string
}

export type ResourceGroup = {
  id: string
  label: string
  kind: 'watch' | 'listen' | 'read' | 'explore'
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
        href: 'https://watch.thechosen.tv/',
        image: '/the-chosen.jpg',
        display: 'hero',
        category: 'Series',
        description: [
          'A place to start.',
          'For many people, *The Chosen* is where the Gospels begin to feel a little more familiar. By imagining the everyday lives of Jesus, his disciples, and those they encountered, the series invites viewers to see Scripture through a more human lens—one that encourages empathy, curiosity, and reflection.',
          'For those beginning their faith journey, it can provide meaningful context that makes returning to the Bible feel both familiar and inviting. As new names, places, and events unfold throughout Scripture, the series offers a visual framework that helps connect them together. Seeing the people behind the pages can make the story feel less overwhelming and easier to follow, especially when so much is new.',
          'While the series includes creative storytelling, it is best experienced alongside Scripture. Let it spark your curiosity, then return to the Gospels and encounter the story for yourself.',
        ],
        details: [
          'Seasons 1–5 available now',
          'Season 6 starting November 15, 2026',
          'Free to watch on The Chosen app',
        ],
      },
      {
        name: 'King of Kings',
        note: 'An animated film on the life and ministry of Jesus.',
        href: 'https://www.amazon.com/gp/video/detail/B0H34TG19G',
        image: '/king-of-kings.jpg',
        display: 'hero',
        category: 'Film',
        description:
          'King of Kings is an animated feature film that brings the life, ministry, and Sermon on the Mount of Jesus Christ to the screen with a rich and distinctive visual style. Accessible to viewers of all ages, it draws directly from the Gospels.',
        details: [
          'Available on Amazon Prime Video',
          'Animated feature film',
          'Suitable for all ages',
        ],
      },
    ],
  },
  {
    id: 'read',
    label: 'Read',
    kind: 'read',
    items: [
      {
        name: 'Catechism of the Catholic Church',
        note: 'The official summary of Catholic belief — a reference for the whole faith.',
        href: 'https://www.vatican.va/archive/ENG0015/_INDEX.HTM',
        image: '/catechism.png',
        category: 'Book',
        description:
          'The official summary of Catholic doctrine, promulgated by Pope John Paul II in 1992. Organized around four pillars — the Creed, the Sacraments, the Moral Life, and Prayer — it is the definitive reference for the whole of the faith.',
        details: [
          'Full text available free at the Vatican website',
          'Translated into dozens of languages',
          'Organized in four parts: Creed, Sacraments, Moral Life, Prayer',
        ],
      },
      {
        name: 'Compendium of the Catechism',
        note: 'A shorter, question-and-answer companion to the full Catechism.',
        href: 'https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_en.html',
        image: '/compendium.png',
        category: 'Book',
        description:
          'A question-and-answer format companion to the full Catechism, prepared under Pope Benedict XVI in 2005. Covering the same four pillars in 598 concise questions, it is a practical starting point for anyone exploring Catholic teaching.',
        details: [
          '598 questions covering the full scope of the faith',
          'Full text available free at the Vatican website',
          'Easier to read in daily portions than the full Catechism',
        ],
      },
      {
        name: 'Theology of Home',
        note: 'On finding the sacred in ordinary domestic life and the rhythms of the home.',
        href: 'https://theologyofhome.com/',
        image: '/theology-of-home.png',
        category: 'Book',
        description:
          'Written by Carrie Gress and Noelle Mering, this book explores how Catholic life in the home — beauty, order, hospitality, and the rhythms of the domestic church — reflects eternal truths. The first in a series that has grown into a broader community and resource hub.',
        details: [
          'Part of a growing book series',
          'Website includes essays, a podcast, and more resources',
          'Focused on femininity, home life, and the sacred',
        ],
      },
      {
        name: 'USCCB',
        note: 'The U.S. bishops\' site — daily readings, Church teaching, and official documents.',
        href: 'https://www.usccb.org/',
        image: '/usccb.png',
        category: 'Website',
        description:
          'The official site of the United States Conference of Catholic Bishops — the central hub for daily Mass readings, the text of Church documents and encyclicals, pastoral letters, and guidance on Catholic social teaching and moral theology.',
        details: [
          'Daily Mass readings and prayers',
          'Full text of Church documents and encyclicals',
          'Resources for OCIA, parish life, and Catholic education',
        ],
      },
    ],
  },
  {
    id: 'explore',
    label: 'Explore',
    kind: 'explore',
    items: [
      {
        name: 'Bible App',
        note: 'Read, listen to, and study the Bible — with reading plans, devotionals, and audio.',
        href: 'https://www.youversion.com/bible-app',
        image: '/bible-app.png',
        display: 'app',
        category: 'App',
        description:
          'The world\'s most-downloaded Bible app, with over 2,000 Bible versions in 1,500+ languages. Includes audio Bible, reading plans, devotionals, and a verse of the day — all free to use.',
        details: [
          'Free to download and use',
          'Available on iOS and Android',
          'Thousands of reading plans for every level',
        ],
        pageNote:
          'When selecting a Bible version, choose the NABRE (New American Bible, Revised Edition) — it is the translation used at Catholic Mass in the United States.',
      },
      {
        name: 'Hallow',
        note: 'A Catholic prayer and meditation app — rosaries, examens, and sleep prayers.',
        href: 'https://hallow.com/',
        image: '/hallow.png',
        display: 'app',
        category: 'App',
        description:
          'A Catholic prayer and meditation app with thousands of hours of content — guided rosaries, examens, Lectio Divina, morning and evening prayer, novenas, and sleep meditations. Used by millions of Catholics around the world.',
        details: [
          'Available on iOS and Android',
          'Free tier available with premium subscription options',
          'Audio narrated by Catholic speakers including Fr. Mike Schmitz',
        ],
      },
      {
        name: 'Laudate',
        note: 'A free, all-in-one Catholic app — prayers, readings, rosary, and more.',
        href: 'https://apps.apple.com/us/app/laudate-1-catholic-app/id499428207',
        image: '/laudate.png',
        display: 'app',
        category: 'App',
        description:
          'A free, all-in-one Catholic app covering daily Mass readings, Liturgy of the Hours, the rosary, Divine Mercy chaplet, morning and evening prayer, lives of the saints, and more. No subscription required.',
        details: [
          'Completely free — no in-app purchases or subscription',
          'Available on iOS and Android',
          'Includes Scripture, the Catechism, and hundreds of prayers',
        ],
      },
      {
        name: 'Magisterium AI',
        note: 'Ask questions and get answers grounded in Church teaching, with citations.',
        href: 'https://www.magisterium.com/',
        image: '/magisterium-ai.png',
        display: 'app',
        category: 'App',
        description:
          'An AI assistant trained exclusively on the body of Catholic teaching — Scripture, the Catechism, papal encyclicals, council documents, and the Church Fathers. Every response includes citations so you can read the source yourself.',
        details: [
          'Grounded in primary Church documents with citations',
          'Available on web and mobile',
          'Useful for exploring theology, doctrine, and moral questions',
        ],
      },
      {
        name: 'The Pillar Podcast',
        note: 'Smart, candid conversation on news and life in the Catholic Church.',
        href: 'https://www.pillarcatholic.com/s/the-pillar-podcast',
        image: '/pillar-podcast.png',
        display: 'app',
        category: 'Podcast',
        description:
          'A weekly podcast from The Pillar, a Catholic journalism outlet known for serious, independent reporting. Hosts J.D. Flynn and Ed Condon offer candid, informed conversation on Church news, Vatican affairs, and Catholic life.',
        details: [
          'New episodes released weekly',
          'Hosted by veteran Catholic journalists',
          'Available on Apple Podcasts, Spotify, and wherever you listen',
        ],
      },
      {
        name: 'The Catholic Channel',
        note: 'Catholic talk, news, and conversation — available on SiriusXM.',
        href: 'https://www.siriusxm.com/channels/the-catholic-channel',
        image: '/catholic-channel.png',
        display: 'app',
        category: 'Radio',
        description:
          'SiriusXM\'s dedicated Catholic channel featuring talk shows, news, call-ins, and programming from a range of Catholic voices. A good way to stay connected to Catholic conversation throughout the day.',
        details: [
          'Available on SiriusXM and the SiriusXM app',
          'Requires SiriusXM subscription',
          'Mix of live programming and on-demand shows',
        ],
      },
    ],
  },
  {
    id: 'listen',
    label: 'Listen',
    kind: 'listen',
    items: [
      {
        name: 'Catholic Instrumental Music',
        note: 'Curated by The O\'Neill Brothers — perfect for prayer, study, or quiet reflection.',
        image: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84364240bc1c6534574307c30d',
        display: 'app',
        category: 'Public Playlist',
        creator: 'The O\'Neill Brothers',
        description:
          '"The aim and final end of all music should be none other than the glory of God and the refreshment of the soul." — J.S. Bach',
        details: [
          'Available on Spotify',
          'No lyrics — ideal for focused prayer or study',
          '348 songs, over 20 hours of music',
        ],
        spotifyEmbedSrc: 'https://open.spotify.com/embed/playlist/6BgguFfzqSlE8FJ2SmvdPv?utm_source=generator&theme=0&si=2d10c99ea1f44b64',
      },
      {
        name: 'Gregorian Chant',
        note: 'Ancient sacred music of the Church — meditative, prayerful, and timeless.',
        image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02d4d27bdaead278e0ceb3cacd',
        display: 'app',
        category: 'Music',
        description:
          'Gregorian chant is the ancient liturgical music of the Western Church, developed over centuries of monastic prayer. Its unaccompanied, melodic character creates a contemplative atmosphere unlike anything in modern music. The Benedictine Monks of Santo Domingo de Silos — whose 1994 album became an unexpected worldwide sensation — are one of the finest places to start.',
        details: [
          'Available on Spotify, Apple Music, and YouTube',
          'Ideal for prayer, Adoration, and quiet reflection',
        ],
        spotifyEmbedSrc: 'https://open.spotify.com/embed/album/3z2Bf8Ao1OXneiqQzX8acG?utm_source=generator&theme=0&si=3bf486790b444ad4',
      },
      {
        name: 'The Chosen Soundtrack',
        note: 'The official score from the series — cinematic, moving, and deeply prayerful.',
        image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02ea7c6eb2e35030538177416d',
        display: 'app',
        category: 'Music',
        description:
          'The official soundtrack from The Chosen series, composed to match the emotional and spiritual depth of the show. Moving and cinematic, it works just as well as a companion to prayer or quiet reflection as it does to the series itself.',
        details: [
          'Available on Spotify and Apple Music',
          'Multiple volumes available as the series grows',
          'A natural companion to watching the series',
        ],
        spotifyEmbedSrc: 'https://open.spotify.com/embed/album/0zGDFDQoP4LAmkoDtRKj1P?utm_source=generator&theme=0&si=748500268e20487c',
      },
      {
        name: 'Catholic Mass Music',
        note: 'Curated by Saint Claudia — hymns, choral pieces, and sacred song for Mass.',
        image: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da846efc0f30d39248f801a1c3f1',
        display: 'app',
        category: 'Playlist',
        creator: 'Saint Claudia',
        description:
          'A curated playlist of music for the Catholic Mass — drawing from traditional hymns, choral settings, and sacred song spanning centuries of worship. Well suited for listening before Mass, during Adoration, or any moment of quiet prayer.',
        details: [
          'Available on Spotify',
          'Includes traditional hymns and choral pieces',
          'Ideal for preparation before Mass or quiet prayer',
        ],
        spotifyEmbedSrc: 'https://open.spotify.com/embed/playlist/691JeYVWPilNVgJ5I9CHh4?utm_source=generator&theme=0&si=1f4d007a29864817',
      },
    ],
  },
]
