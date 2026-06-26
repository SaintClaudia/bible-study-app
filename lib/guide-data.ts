export interface QuickAnswer {
  id: string
  category: string
  question: string
  shortAnswer: string
  boldAnswer: string
  body: string[]
  image: string
  imagePosition?: string
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
    imagePosition: 'center calc(50% + 80px)',
    body: [
      "There is no fee and no expectation to give anything. Parishes offer OCIA as part of their mission to welcome anyone who wants to learn about the Catholic faith.",
      "If a book or Bible is recommended, your parish can usually provide one. Many parishes also offer coffee, water, light snacks, or even a simple meal before class. It's a small way they help make the evening a little easier for those coming straight from work, school, or home.",
      "Never let cost be the reason you stay home.",
    ],
  },
  {
    id: 'bring',
    category: 'PREPARATION',
    question: 'What should I bring?',
    shortAnswer: 'Just yourself',
    boldAnswer: 'Just yourself and whatever helps you feel comfortable.',
    image: '/glass.png',
    body: [
      "You do not need to bring anything to your first session. No materials, no Bible, and no prior knowledge. Just showing up is all you need.",
      "As you continue, you may want to bring a notebook to take notes or a water bottle to stay hydrated. Many parishes also offer coffee, water, light snacks, or even a simple meal to make it a little easier for those coming straight from work, school, or home.",
      "If your parish uses a specific book or Bible, they will let you know. When in doubt, ask your coordinator.",
    ],
  },
  {
    id: 'attendance',
    category: 'ATTENDANCE',
    question: 'Do I have to come every week?',
    shortAnswer: 'Come as you can',
    boldAnswer: 'Try to come regularly, but don't worry if you miss one.',
    image: '/angel.png',
    body: [
      "OCIA is designed to build on what you learn each week, so attending regularly will help you get the most from the experience and build relationships with others on the same journey.",
      "Life happens. If you miss a session because of work, travel, illness, or family commitments, just come back the following week. Your parish will help you catch up if there is anything important you missed.",
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
    id: 'marriage',
    category: 'MARRIAGE',
    question: "What if I've been married before?",
    shortAnswer: 'Get guidance',
    boldAnswer: "It's more common than you think.",
    image: '/michael.png',
    body: [
      "Many people entering OCIA have been married before. Depending on your circumstances, there may be additional steps before receiving certain sacraments, but this is not a barrier to becoming Catholic—it's simply part of the process.",
      "If you've been divorced or previously married, your parish will help determine what documentation is needed. This often includes copies of your baptism certificate (if you were baptized), marriage certificate, and divorce decree. These documents are reviewed by your parish and, when necessary, submitted to the diocesan tribunal for evaluation.",
      "Every situation is unique. Some cases are straightforward and can be resolved relatively quickly, while others require additional review and may take longer. Your parish will explain which process applies to your circumstances and guide you through each step.",
      "The good news is that you do not need to have everything resolved before beginning OCIA. You can attend classes, grow in your faith, and move forward in your formation while any required paperwork is being completed.",
      "Above all, remember that this process exists to help the Church understand your individual circumstances—not to judge your past. Your priest or deacon will discuss your situation privately, answer your questions, and walk with you every step of the way.",
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
    title: 'What actually is OCIA?',
    subtitle: 'A place to learn about the Catholic faith.',
    isHero: true,
    image: '/holy-bible.png',
    body: [
      "OCIA is a series of weekly classes for anyone interested in learning about the Catholic Church. Whether you're thinking about becoming Catholic or returning to the Church after being away, OCIA is where that journey begins.",
      "Classes typically meet once a week and last about an hour. You'll learn about Scripture, Catholic beliefs, prayer, the sacraments, and what it means to live the Catholic faith. There is plenty of time to ask questions, listen, and learn alongside others who are on a similar journey.",
      "Every parish is a little different, but one thing remains the same: you don't need to know anything before you begin. Just come with an open heart and a thirst for God.",
    ],
  },
  {
    id: 'typical-session',
    label: 'WHAT TO EXPECT',
    title: "What's a typical session like?",
    subtitle: 'Prayer, learning, and conversation.',
    isHero: false,
    image: '/communion.png',
    body: [
      "Every parish is a little different, but most OCIA sessions follow a similar rhythm.",
      "Many sessions begin with a prayer led by a priest, deacon, or another member of the parish team. Some parishes also introduce the Saint of the day before beginning the evening's topic.",
      "The main part of the session is usually a presentation or discussion. You might learn about Scripture, the sacraments, the Creed, prayer, the Mass, or another aspect of the Catholic faith. This is often followed by small group discussions where you'll have the opportunity to reflect on the topic and answer a few questions together.",
      "There is always time to ask questions, listen, and participate at your own pace. You never have to share anything you're uncomfortable sharing.",
      "Sessions usually end with prayer, and many people stay afterward to visit and get to know one another. Over time, those weekly conversations often become an important part of the journey.",
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
