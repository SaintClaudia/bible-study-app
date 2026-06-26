export interface QuickAnswer {
  id: string
  category: string
  question: string
  shortAnswer: string
  boldAnswer: string
  body: string[]
  image: string
}

export interface StartHereItem {
  id: string
  label: string
  title: string
  subtitle: string
  body: string[]
  isHero: boolean
  image: string
}

export interface GoodToKnowItem {
  id: string
  icon?: string
  title: string
  subtitle: string
  body: string[]
  image: string
}

export const quickAnswers: QuickAnswer[] = [
  {
    id: 'cost',
    category: 'COST',
    question: 'Does it cost anything?',
    shortAnswer: "No, it's free",
    boldAnswer: 'No. OCIA is completely free.',
    image: '/holy-cross.png',
    body: [
      "There's no tuition, no fee, and no expectation to give anything. Parishes offer OCIA as part of their mission to welcome people.",
      "If a book or a Bible is suggested, the parish can usually provide one. Never let cost be the reason you stay home.",
    ],
  },
  {
    id: 'commitment',
    category: 'COMMITMENT',
    question: 'Do I have to become Catholic?',
    shortAnswer: 'No commitment',
    boldAnswer: 'No. Come to learn and do what feels right.',
    image: '/glass.png',
    body: [
      "OCIA is an open process. You are never required to become Catholic. Many people explore the faith, ask their questions, and decide what feels right for them.",
      "Some go on to receive the sacraments at Easter. Others take more time, or simply keep learning. Either path is welcomed.",
    ],
  },
  {
    id: 'time',
    category: 'TIME',
    question: 'How long does it take?',
    shortAnswer: 'About a year',
    boldAnswer: 'About nine months — but it varies.',
    image: '/mary.png',
    body: [
      "Most parishes follow the liturgical year, beginning in fall and leading to the Easter Vigil. The full journey is typically nine months to a year.",
      "Some people take longer, and that's perfectly fine. There is no pressure to match anyone else's timeline.",
    ],
  },
  {
    id: 'baptism',
    category: 'BAPTISM',
    question: 'Do I need to be baptized?',
    shortAnswer: 'It depends',
    boldAnswer: 'It depends on where you are starting.',
    image: '/holy-spirit.png',
    body: [
      "If you were never baptized, baptism will be the first sacrament you receive — usually at the Easter Vigil.",
      "If you were already baptized in another Christian tradition, that baptism is valid and won't be repeated. You'll make a Profession of Faith and be received into full communion.",
    ],
  },
  {
    id: 'attendance',
    category: 'ATTENDANCE',
    question: 'Do I have to come every week?',
    shortAnswer: 'Come as you can',
    boldAnswer: 'Try to come regularly, but it is flexible.',
    image: '/angel.png',
    body: [
      "Regular attendance helps you follow the formation arc and build relationships with others on the same journey. Most programs ask that you come as consistently as you can.",
      "If you miss a session, just come back. No one is keeping score.",
    ],
  },
  {
    id: 'family',
    category: 'FAMILY',
    question: 'Can I bring my family?',
    shortAnswer: 'Yes, bring them',
    boldAnswer: 'Yes. They are always welcome.',
    image: '/joseph.png',
    body: [
      "OCIA is not a private journey. Your spouse, partner, family member, or friend can sit with you at sessions.",
      "Many participants find it helpful to have someone they trust alongside them. Supporting family members often find their own faith deepened by simply being there.",
    ],
  },
  {
    id: 'marriage',
    category: 'MARRIAGE',
    question: "What if I've been married before?",
    shortAnswer: 'Get guidance',
    boldAnswer: "It's more common than you think.",
    image: '/michael.png',
    body: [
      "Situations involving previous marriages come up often in OCIA. Depending on your circumstances, there may be additional steps before receiving certain sacraments.",
      "This is not a barrier — it's a process. Your parish priest or deacon will walk through your situation with you, privately and without judgment.",
    ],
  },
  {
    id: 'confession',
    category: 'CONFESSION',
    question: 'Do I need to go to Confession?',
    shortAnswer: "You'll be guided",
    boldAnswer: "You'll be prepared for it during OCIA.",
    image: '/saint-benedict.png',
    body: [
      "The Sacrament of Reconciliation is part of Catholic life, and you'll learn about it during formation. For those being baptized, baptism itself forgives all sins — Confession comes later.",
      "Those already baptized who are entering full communion will receive the sacrament as part of their preparation. Your parish will guide you through the process.",
    ],
  },
  {
    id: 'test',
    category: 'EXAMS',
    question: 'Is there a test?',
    shortAnswer: 'No test, no grade',
    boldAnswer: 'No. There is no test, quiz, or grade.',
    image: '/saint-therese-of-lisieux.png',
    body: [
      "OCIA is not an academic program. There's no quiz at the end of each session and no final exam.",
      "What matters is that you come, ask questions, and engage honestly. You and your parish discern together when you feel ready to take the next step.",
    ],
  },
  {
    id: 'readiness',
    category: 'READINESS',
    question: "What if I'm not ready by Easter?",
    shortAnswer: 'You can wait',
    boldAnswer: 'You wait — and that is perfectly fine.',
    image: '/saint-vincent-de-paul.png',
    body: [
      "Easter is the traditional time for receiving the sacraments, but it is not the only time. If you need more time, you continue in formation and receive the sacraments when you and your parish discern you are ready.",
      "Faith cannot be rushed. The Church has been welcoming people for two thousand years and is in no hurry.",
    ],
  },
]

export const startHereItems: StartHereItem[] = [
  {
    id: 'what-happens',
    label: 'WHAT TO EXPECT',
    title: 'What actually happens at OCIA?',
    subtitle: 'A weekly conversation, not a test.',
    isHero: true,
    image: '/holy-bible.png',
    body: [
      "OCIA sessions are typically held once a week and last about an hour or two. You'll sit with a small group, hear a talk or a discussion, and have space to ask questions.",
      "There's no homework, no memorization required, and no performance expected. Sessions feel more like a guided conversation about faith than a lecture or a class.",
      "Different parishes run OCIA differently, but the spirit is the same everywhere: you are welcome to come and see.",
    ],
  },
  {
    id: 'typical-session',
    label: 'WHAT TO EXPECT',
    title: "What's a typical session like?",
    subtitle: 'Topic, talk, prayer.',
    isHero: false,
    image: '/communion.png',
    body: [
      "Most sessions begin with a prayer or a brief moment of quiet. A leader or priest introduces a topic — it might be a sacrament, part of the Creed, a Scripture passage, or something from the liturgy.",
      "There's time for questions, personal reflection, and conversation. You don't have to share anything you're not comfortable sharing.",
      "Sessions often close with prayer. Some parishes invite OCIA participants to attend the opening of Sunday Mass together before breaking into the formation group.",
    ],
  },
  {
    id: 'journey-steps',
    label: 'THE PATH',
    title: 'The journey, step by step',
    subtitle: 'From curiosity to the sacraments.',
    isHero: false,
    image: '/christ.png',
    body: [
      "The OCIA journey has a natural rhythm. It begins with a period of inquiry — you come, ask questions, and learn what the process involves.",
      "The Rite of Acceptance marks the point at which you formally join the catechumenate — the group preparing for the sacraments. From there, you move through periods of formation, purification, and finally, the Easter Vigil.",
      "After receiving the sacraments, there is a final period called mystagogy — a time to reflect on the experience and deepen your understanding of the life you have entered.",
    ],
  },
]

export const goodToKnowItems: GoodToKnowItem[] = [
  {
    id: 'sign-of-cross',
    icon: '/sun.png',
    title: 'The Sign of the Cross',
    subtitle: "The gesture you'll come to know.",
    image: '/holy-cross.png',
    body: [
      "The Sign of the Cross is one of the most fundamental gestures in Catholic prayer. Catholics make it at the beginning and end of prayer, when entering a church, and at the start and close of Mass.",
      'To make it, touch your forehead, then your chest, then your left shoulder, then your right, saying: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen."',
      "If you don't know how to do it yet, don't worry — you'll see it done dozens of times and it will become second nature.",
    ],
  },
  {
    id: 'our-father',
    icon: '/pray.png',
    title: 'The Our Father',
    subtitle: 'The prayer said at every class.',
    image: '/mary.png',
    body: [
      "The Our Father — also called the Lord's Prayer — is the prayer Jesus taught his disciples. It is prayed at every Mass and at most Catholic gatherings.",
      '"Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil."',
      "If you don't have it memorized yet, that's okay. Just listen along. You'll know it before you realize you've learned it.",
    ],
  },
  {
    id: 'which-bible',
    icon: '/bible.png',
    title: 'Which Bible to use?',
    subtitle: "(NABRE) — but it's not required.",
    image: '/joseph.png',
    body: [
      "The Catholic Church in the United States uses the New American Bible, Revised Edition (NABRE) for Mass readings. If you want to follow along with what's proclaimed at Mass, NABRE is the version to reach for.",
      "If you already have a Bible — or if someone gives you one — use it. Any Bible is better than no Bible. You can always compare translations later.",
      "Free digital versions of the NABRE are available through the USCCB website and apps like the Bible App and Laudate.",
    ],
  },
]
