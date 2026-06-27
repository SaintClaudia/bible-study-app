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
  iconPad?: number
  lessonCount: number
  lessons: Lesson[]
}

export const learningPaths: LearningPath[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'A gentle introduction to the Catholic faith for those beginning or exploring their journey.',
    icon: '/getting-started.png',
    iconPad: 12,
    lessonCount: 8,
    lessons: [
      {
        id: 'who-is-jesus',
        title: 'Who Is Jesus?',
        minutes: 4,
        intro: 'You may hear Jesus described in many ways — teacher, prophet, healer, savior. All of those are true. But the Catholic faith rests on something more specific.',
        body: [
          'You may hear Jesus described in many ways — teacher, prophet, healer, savior. All of those are true. But the Catholic faith rests on something more specific: the conviction that Jesus of Nazareth was not simply a great man, but God himself stepping into history as one of us.',
          'He was born in Bethlehem, raised in Galilee, and baptized in the Jordan River. He spent three years teaching, healing, and gathering a small community around him. Then he was arrested, tried, and crucified under the Roman governor Pontius Pilate. Three days later, his disciples encountered him alive again — not as a ghost or a memory, but as someone who could be seen, touched, and recognized.',
          'That resurrection is the center of everything. It is why people gather each Sunday, why there is a Church at all, why the sacraments matter. Without it, Jesus is a remarkable moral teacher. With it, he is something altogether different.',
          'If you are just beginning to explore the faith, you do not need to arrive with a settled belief about who Jesus is. Most people who have found their way to faith started exactly where you are — with a question, a quiet curiosity, or a feeling that there was something more. Jesus has a long history of meeting people precisely at that point.',
          'Start with the Gospel of John. Read slowly. The questions will come naturally — and so, in time, will something like an answer.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-ocia',
        title: 'What Is OCIA?',
        minutes: 4,
        intro: 'OCIA stands for the Order of Christian Initiation of Adults. It is the process through which adults explore and enter the Catholic faith — and it is older than you might expect.',
        body: [
          'OCIA stands for the Order of Christian Initiation of Adults. It is the process through which adults explore and enter the Catholic faith — and it is older than you might expect.',
          'In the early Church, becoming a Christian was never a private matter. New believers were welcomed into a community and walked alongside seasoned members for months, sometimes years, learning the faith, praying together, and being formed before they were baptized at Easter. OCIA today is a recovery of that ancient practice.',
          'The process is for anyone who is genuinely curious about becoming Catholic — whether you have never been baptized, were baptized in another Christian tradition, or were baptized Catholic as a child but never completed your initiation. Where you start depends on where you are.',
          'Most OCIA programs meet weekly, beginning in autumn and moving through Advent, Christmas, Lent, and Holy Week toward the Easter Vigil — the most sacred night of the Catholic year — when candidates receive the sacraments of Baptism, Confirmation, and the Eucharist.',
          'You do not need to know whether Catholicism is right for you before you begin. OCIA is a space to ask, learn, and discern. It is not a test. The Church is not waiting for you to arrive with all the answers — it is inviting you to come and see.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'can-i-go-to-mass',
        title: 'Can I Go to Mass If I\'m Not Catholic?',
        minutes: 3,
        intro: 'You may be wondering if you\'re actually welcome. The answer is yes — and not just as a visitor.',
        body: [
          'You may be wondering if you\'re actually welcome at Mass. The answer is yes — and not just as a visitor. You are genuinely welcome.',
          'Mass is the central act of Catholic worship, and it has always drawn people in from the outside. In the early centuries of the Church, inquirers were invited to attend the first portion of the Mass — the readings and the homily — before being dismissed for further formation. That instinct toward openness never went away.',
          'When you arrive, you may sit, stand, and kneel with everyone else. Follow along in a worship aid, listen to the readings, and take in the rhythm of what is happening around you. If something moves you, sing. If something confuses you, let it sit — that is part of the process.',
          'The one thing reserved for practicing Catholics in a state of grace is receiving Communion. If you would like to come forward during that part of the Mass, you are warmly welcome to do so with your arms crossed over your chest — a simple gesture that signals you are asking for a blessing.',
          'Many people find that attending Mass before fully understanding it is part of how understanding eventually comes. Something settles in the repetition of the prayers, the silence, the ancient rhythms. You do not need to have it figured out before you walk through the door.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-happens-at-mass',
        title: 'What Happens at Mass?',
        minutes: 5,
        intro: 'Mass can feel like a lot to take in the first time you attend. There are responses to follow, postures to navigate, and a sense that everyone around you knows something you don\'t quite know yet. A little context helps.',
        body: [
          'Mass can feel like a lot to take in the first time you attend. There are responses to follow, postures to navigate, and a sense that everyone around you knows something you don\'t quite know yet. That feeling usually fades — but in the meantime, a little context helps.',
          'The Mass follows a pattern that has remained largely the same for nearly two thousand years. It moves through two central movements.',
          'The first is the Liturgy of the Word. After an opening rite of prayer and praise, three Scripture readings are proclaimed — typically from the Old Testament, one of Paul\'s letters, and then the Gospel. A homily follows, connecting what was heard to the life of the congregation. The Mass does not rush past Scripture; it dwells there.',
          'The second is the Liturgy of the Eucharist. Bread and wine are brought to the altar, and the great prayer of thanksgiving begins — rooted in the Passover meal Jesus shared with his disciples the night before he died. At the Consecration, the bread and wine become something more than they appear. Communion follows for those prepared to receive it.',
          'Then comes a blessing and a sending. The word "Mass" comes from the Latin missa — to be sent. Every Mass ends as a commission: go and live this.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-bible-should-i-buy',
        title: 'What Bible Should I Buy?',
        minutes: 4,
        intro: 'Walking into a bookstore looking for a Catholic Bible can feel unexpectedly complicated. There are dozens of translations, and the Bibles themselves vary in size, layout, and which books they include. Here is what you need to know.',
        body: [
          'Walking into a bookstore looking for a Catholic Bible can feel unexpectedly complicated. There are dozens of translations, and the Bibles themselves vary in size, layout, and which books they include. Here is what you need to know.',
          'A Catholic Bible contains 73 books — seven more than most Protestant Bibles. These additional books, called the deuterocanonical texts, include Sirach, Tobit, Wisdom, and the books of Maccabees. They have been part of the Christian Old Testament since the earliest centuries of the Church.',
          'For translation, two are widely trusted. The New American Bible Revised Edition is what you will hear proclaimed at Mass in the United States — so if you want your reading to connect with what you hear on Sundays, this is a natural choice. The Revised Standard Version Catholic Edition is another strong option, and many find it especially clear for slower, more careful reading.',
          'If you are just beginning, do not feel pressure to start at page one and read straight through. Start with the Gospel of Mark — it is the shortest of the four Gospels, written with pace and urgency, and it takes you directly into who Jesus is and what he did. From there, follow your curiosity.',
          'The Bible was never meant to be read in isolation. Two thousand years of prayer, commentary, and lived experience surround every page. That context does not make Scripture harder to approach — it makes it richer.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'how-catholics-read-bible',
        title: 'How Do Catholics Read the Bible?',
        minutes: 4,
        intro: 'The Bible can feel like an overwhelming place to begin. But Catholics have been reading it — carefully, slowly, together — for two millennia, and there is a particular way they approach it that is worth understanding.',
        body: [
          'The Bible can feel like an overwhelming place to begin. It is long, it spans thousands of years, and parts of it seem distant from anything resembling ordinary life. But Catholics have been reading it — carefully, slowly, together — for two millennia, and there is a particular way they approach it that is worth understanding.',
          'Scripture is the Word of God. That is the starting point. But it is also a collection of texts written by human beings, in particular times and places, with particular audiences in mind. Reading it well means holding both truths at once: what God communicates, and the human context through which he communicated it.',
          'This is why the Church reads Scripture alongside Sacred Tradition — the living faith handed down from the Apostles — and with the guidance of the Magisterium, the Church\'s teaching authority. This is sometimes misunderstood as the Church controlling Scripture. It is the opposite. The Church serves Scripture, protects its meaning across generations, and draws from it in ways that remain alive in each age.',
          'In practice, this means something beautiful: when you hear a passage proclaimed at Mass, you are receiving something that has been prayed over, lived, and interpreted for two thousand years. The homily is an invitation to encounter that living tradition — not just what the text says, but what it means now, in your life, today.',
          'You do not need to understand all of this before you begin reading. Start somewhere. Read slowly. The questions will arrive on their own, and that is exactly the point.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'catholic-words',
        title: 'Catholic Words You\'ll Hear',
        minutes: 5,
        intro: 'The first time you attend Mass or sit in an OCIA session, you may notice that the Catholic faith has a vocabulary of its own. Many of these words come from Greek or Latin, and they carry meanings that are richer than they first appear.',
        body: [
          'The first time you attend Mass or sit in an OCIA session, you may notice that the Catholic faith has a vocabulary of its own. Many of these words come from Greek or Latin, and they carry meanings that are richer than they first appear. Here are the ones you are most likely to encounter.',
          'Eucharist comes from the Greek word for thanksgiving. It refers to the central act of the Mass — the consecrated bread and wine — and to the broader celebration itself. For Catholics, the Eucharist is not a symbol. It is a real encounter with Christ.',
          'Parish is the local Catholic community you belong to — the church building, yes, but more importantly the people who gather there with you each week. It is your home in the Church.',
          'Sacrament refers to seven sacred rites through which grace is given: Baptism, Confirmation, Eucharist, Reconciliation, Anointing of the Sick, Holy Orders, and Marriage. They are not ceremonies alone — they are moments in which something real happens.',
          'Tabernacle is the vessel, often gold, in which the consecrated Eucharist is reserved after Mass. A candle burning nearby indicates that Christ is present there.',
          'Liturgy means the public, communal worship of the Church — the formal prayer that follows a set order and has been celebrated in some form since the first Christians gathered together.',
          'Diocese is a region of the Church led by a bishop, made up of many parishes.',
          'You do not need to memorize these before your first visit. Most of them will begin to make sense simply by showing up and paying attention.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'beginning-your-journey',
        title: 'Beginning Your Journey',
        minutes: 4,
        intro: 'It is okay not to have this figured out yet. Most people sitting where you are now are carrying a version of the same quiet worry.',
        body: [
          'It is okay not to have this figured out yet.',
          'Most people who are sitting where you are now — curious, exploring, a little unsure — are carrying a version of the same quiet worry: Am I ready? Do I believe enough? Do I even know what I believe?',
          'The honest answer is that no one who has entered the Catholic faith arrived feeling fully certain. Faith is not a feeling you achieve before you begin. It is a relationship you step into, and it deepens from there.',
          'The Catholic tradition is ancient, wide, and astonishingly deep — two thousand years of theology, saints, art, music, and ordinary people trying to live faithfully in an imperfect world. You will not understand all of it before Easter. You may not understand all of it in a lifetime. That is not a problem. The Church does not ask you to arrive with all the answers. It asks you to walk with those who have walked before you.',
          'Give yourself permission to have questions without rushing toward conclusions. Give yourself permission to be moved by something before you understand it. Give yourself permission to begin.',
          'Every Catholic you know started somewhere. Many of them started exactly here — with a question, a curiosity, and a single step forward. That step is more than enough.',
        ],
        takeaways: [],
        reflection: '',
      },
    ],
  },
  {
    id: 'scripture',
    title: 'Scripture',
    description: 'Discover how the Bible came to be, why Catholics read it the way they do, and how Scripture continues to guide the life of the Church.',
    icon: '/scripture.png',
    lessonCount: 10,
    lessons: [
      {
        id: 'what-is-the-bible',
        title: 'What Is the Bible?',
        minutes: 3,
        intro: 'You may have heard the Bible described as God\'s word, or a collection of ancient texts, or the most influential book in human history. All of those things are true. But none of them quite captures what it actually is.',
        body: [
          'You may have heard the Bible described as God\'s word, or a collection of ancient texts, or the most influential book in human history. All of those things are true. But none of them quite captures what it actually is.',
          'The Bible is a library more than a single book. It contains 73 texts — written over roughly fifteen hundred years, by dozens of authors, in three different languages, across three continents. There are poems, laws, letters, prophecies, songs, histories, and Gospels. It is one of the most remarkable collections in human history.',
          'What makes it sacred is not simply its age or its influence, but its origin. God, working through human authors — with their particular personalities, languages, and moments in history — communicated something true, good, and lasting. This is called divine inspiration. It doesn\'t mean God dictated the Bible word for word. It means the Holy Spirit guided the writers, so that what they wrote carries something more than what they alone could have offered.',
          'Underneath the diversity of genre and voice, there is one unified story: the story of God\'s relationship with humanity. It begins with creation and the break that sin causes, and it moves slowly — through patriarchs, prophets, covenants, and kings — toward the moment when God himself enters the story in Jesus of Nazareth. Everything before Christ anticipates him; everything after reflects on what his life, death, and resurrection mean.',
          'If you are beginning to read the Bible for the first time, you don\'t need to understand all of it to receive something from it. A single verse, read slowly, can open a door.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'how-did-we-get-the-bible',
        title: 'How Did We Get the Bible?',
        minutes: 4,
        intro: 'The Bible did not arrive in the world already bound and labeled. It came together over centuries — through oral storytelling, written records, prayerful discernment, and the steady work of communities trying to preserve what they believed God had given them.',
        body: [
          'The Bible did not arrive in the world already bound and labeled. It came together over centuries — through oral storytelling, written records, prayerful discernment, and the steady work of communities trying to preserve what they believed God had given them.',
          'The earliest books of the Old Testament were passed down orally for generations before being written. Over time, scrolls circulated among Jewish communities. By the time of Jesus, a collection of Hebrew texts — the Torah, the Prophets, and the Writings — was widely recognized as sacred Scripture.',
          'The New Testament came together in the decades following the Resurrection. Paul\'s letters, written in the 50s AD, are among the earliest Christian texts we have. The Gospels were composed between roughly 65 and 100 AD — not as journalism, but as testimonies, shaped by communities that had been living and praying through the story of Jesus for years.',
          'By the late 300s, Church councils — including gatherings at Hippo in 393 and Carthage in 397 — formally recognized which books belonged to Scripture. This process is called the formation of the biblical canon. It wasn\'t a political decision. It was a careful sifting of what the Church had already been reading, praying, and treating as authoritative for generations.',
          'The Bible you hold today is the product of centuries of lived faith, careful transmission, and an enduring confidence that God speaks through these texts — and keeps speaking.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-different-bibles',
        title: 'Why Are There Different Bibles?',
        minutes: 4,
        intro: 'If you\'ve ever compared a Catholic Bible to one from a bookstore, you may have noticed something: Catholic Bibles are slightly thicker. There\'s a reason for that — and it\'s worth understanding.',
        body: [
          'If you\'ve ever compared a Catholic Bible to one from a bookstore, you may have noticed something: Catholic Bibles are slightly thicker. That\'s because they contain seven books — and parts of two others — that most Protestant Bibles don\'t include.',
          'These are called the deuterocanonical books: Tobit, Judith, 1 and 2 Maccabees, Wisdom, Sirach, and Baruch. The Catholic Church, along with Orthodox Christians, has always included them as part of the Old Testament. Most Protestant traditions do not.',
          'Here is why the difference exists. In the first centuries of Christianity, many Jews used a Greek translation of the Hebrew Scriptures called the Septuagint — and this translation included these additional books. The earliest Christians, including the authors of the New Testament, quoted from it frequently. The Church carried those texts forward as Scripture.',
          'During the Protestant Reformation in the sixteenth century, Martin Luther and others questioned the authority of these books. They were placed in a separate section called the "Apocrypha" and eventually removed from many Protestant editions of the Bible.',
          'These books are not footnotes. Sirach and Wisdom are proclaimed at Mass. Second Maccabees contains the earliest biblical reference to praying for the dead. They have always been part of the story — and they still are.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'who-wrote-the-bible',
        title: 'Who Wrote the Bible?',
        minutes: 3,
        intro: 'The short answer: many people, across many centuries, in many languages and forms. The longer answer is one of the most interesting in all of human history.',
        body: [
          'The short answer: many people, across many centuries, in many languages and forms.',
          'The Old Testament includes the work of anonymous scribes, royal historians, temple priests, poets, and prophets — most of whom didn\'t think of themselves as writing a "Bible." They were recording what God had done, what he had commanded, and what they hoped for. Over time, the community gathered these writings and recognized in them something lasting.',
          'The New Testament was written by a smaller group over a shorter span of time — roughly sixty years. Paul wrote letters to early Christian communities. Matthew, Mark, Luke, and John each shaped a Gospel account of Jesus\' life. Luke also wrote Acts. John wrote letters and the book of Revelation.',
          'God worked through all of these human authors — not by overriding their personalities or bypassing their cultural context, but by inspiring them. This is called divine inspiration. The Bible has two authors in a real sense: the human writer, and the Holy Spirit guiding them.',
          'This is why you can read the Psalms and hear grief, joy, and confusion — fully human emotions — while still trusting that something true is being communicated. The humanity of the Bible is not a problem to explain away. It is part of how God chose to speak.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'scripture-how-catholics-read',
        title: 'How Do Catholics Read the Bible?',
        minutes: 4,
        intro: 'You might wonder if there is a right way to read the Bible. There is — and it is simpler, and richer, than you might expect.',
        body: [
          'You might wonder if there is a right way to read the Bible. There is — and it is simpler, and richer, than you might expect.',
          'Scripture is the Word of God. That is the starting point. But it is also a collection of texts written by human beings, in particular times and places, with particular audiences in mind. Reading it well means holding both truths at once: what God communicates, and the human context through which he communicated it.',
          'This is why Scripture was never meant to be read alone — not as a rule, but because it wasn\'t written that way. It was produced within a community of faith, preserved by that community, and handed down through centuries of prayer, liturgy, and teaching. When you read a passage today, you are receiving something that has been reflected on for two thousand years.',
          'This is where Sacred Tradition comes in. Tradition, in the Catholic sense, doesn\'t mean customs or habits. It means the living transmission of the faith that began with the Apostles. Scripture and Tradition are not two competing sources — they flow from the same origin and illuminate each other.',
          'The Church\'s teaching authority, the Magisterium, has the responsibility of interpreting Scripture faithfully across generations. This isn\'t the Church placing itself above Scripture. It is the Church serving Scripture — ensuring that the text\'s meaning is not reduced to private interpretation alone.',
          'When you sit with a passage from the Gospel of John, you are reading something prayed over by Augustine in the fifth century, by Thomas Aquinas in the thirteenth, by millions of ordinary people at Mass every Sunday. That inheritance enriches the text. It doesn\'t limit it.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'where-should-i-begin',
        title: 'Where Should I Begin?',
        minutes: 4,
        intro: 'The Bible is not meant to be read the way you\'d read a novel — cover to cover, in order, in one sitting. If you try that, you\'ll make it through Genesis, get bogged down somewhere in Leviticus, and quietly set it down. Almost everyone does.',
        body: [
          'The Bible is not meant to be read the way you\'d read a novel — cover to cover, in order, in one sitting. If you try that, you\'ll make it through Genesis, get bogged down somewhere in Leviticus, and quietly set it down. Almost everyone does.',
          'A better approach: start with the Gospels. Mark is the shortest. It moves quickly, almost impatiently — the word "immediately" appears over forty times. It takes you directly to who Jesus is and what he does. Start there. Read it in a single sitting if you can.',
          'From Mark, move to Luke, which gives the most narrative texture and includes stories found nowhere else: the Good Samaritan, the Prodigal Son, the Road to Emmaus. Then Matthew, which draws heavily on Old Testament prophecy. Then John — slower, more theological, deeply prayerful.',
          'After the Gospels, read Acts. It\'s the story of what happened after the Resurrection — how the early Church spread across the known world in a single generation. It reads like an adventure.',
          'From there, follow your curiosity. If you want to understand Paul\'s theology, start with Romans. If you want poetry, read the Psalms — they are meant to be prayed, not just read. One verse, prayed over slowly, is worth more than ten chapters skimmed.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'understanding-the-gospels',
        title: 'Understanding the Gospels',
        minutes: 4,
        intro: 'There are four Gospels, and it is worth knowing why. No single account could contain everything.',
        body: [
          'There are four Gospels, and it is worth knowing why.',
          'No single account could contain everything. Matthew, Mark, Luke, and John each approached the story of Jesus from a different vantage point, for a different audience, with different emphases. Together, they give us a portrait that is richer than any one of them could offer alone.',
          'Mark, written first, is brief and urgent. Likely composed for a Roman audience — people who valued action over argument — it shows. Jesus heals, calls, rebukes, and moves forward with barely a pause.',
          'Matthew wrote for a Jewish community that knew its Scripture. His Gospel is saturated with Old Testament quotations and fulfilled prophecies. He organizes Jesus\' teaching into five great discourses, likely echoing the five books of Moses.',
          'Luke, a physician and traveling companion of Paul, is the most literary of the four. He writes with particular care for the poor, for women, for outsiders. His Gospel begins with Mary and Elizabeth, and ends with a risen Jesus breaking bread with strangers on a road.',
          'John is the outlier — written later, more theologically developed, and different in tone. Where the other three are largely narrative, John is meditative. His Gospel opens not with a birth but with a hymn: "In the beginning was the Word." He is writing for people who want to understand not just what Jesus did, but who he is.',
          'The four Gospels don\'t contradict each other. They illuminate each other. Reading all four is like walking around a great sculpture — each angle reveals something the others don\'t.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'story-of-salvation',
        title: 'The Story of Salvation',
        minutes: 5,
        intro: 'The Bible is long, complex, and sometimes confusing. But underneath all of it — the genealogies and the laws, the letters and the laments — there is one story being told.',
        body: [
          'The Bible is long, complex, and sometimes confusing. But underneath all of it — the genealogies and the laws, the letters and the laments — there is one story being told.',
          'It begins with creation: God makes everything good, and into that goodness he places human beings made in his own image, with the capacity to know and love him freely. That freedom is real, which means it can be turned away from God. And it is. The break that results — what the tradition calls the Fall — sets the whole story in motion.',
          'What follows is not abandonment but pursuit. God calls Abraham and makes a covenant — a sacred bond — with him and his descendants. Through Moses, he rescues the people of Israel from slavery and gives them the Law. Through the prophets, he speaks across centuries to a people who keep wandering, calling them back, promising something new.',
          'All of it points forward. The sacrifice of lambs, the temple, the priesthood, the kingdom of David — these are foreshadowings of something greater that is coming. That something is Jesus.',
          'In the New Testament, the promises are kept. Jesus fulfills the Law, embodies the temple, becomes the final sacrifice, and rises from the dead — defeating the death that sin had brought into the world. The Church carries that story forward. And Scripture ends with a vision of everything made new.',
          'Once you see this arc, the Bible changes. Individual passages that once seemed strange start to make sense as pieces of a much larger story. And that story is still being written — in you, in your parish, in every person who turns toward God and takes a single step forward.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'scripture-and-daily-life',
        title: 'Scripture and Daily Life',
        minutes: 3,
        intro: 'You don\'t need a theology degree to let the Bible shape your life. You just need to show up.',
        body: [
          'You don\'t need a theology degree to let the Bible shape your life. You just need to show up.',
          'The simplest way to begin is to read the Sunday Mass readings before you go to Mass. They\'re available through apps like Laudate and Hallow, or on the USCCB website. Reading them ahead of time — even just once — gives the homily a different texture. You\'ve already sat with the words. Something in them has started to settle.',
          'Another practice with ancient roots is Lectio Divina — Latin for "sacred reading." It is simpler than it sounds: choose a short passage, read it slowly, notice what word or phrase catches your attention, sit with it in prayer, and let it move toward a response. Many people do it in five minutes with their morning coffee.',
          'The key is slowness. Scripture is not meant to be consumed at the pace of a news feed. A single verse, returned to over days or weeks, can open more than a chapter skimmed in passing.',
          'Over time, you\'ll find that Scripture starts to surface in unexpected moments — a line from the Psalms when you\'re anxious, a phrase from the Beatitudes when you\'re trying to decide something. That is not coincidence. That is the Word doing what it was always meant to do.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'bible-common-questions',
        title: 'Common Questions About the Bible',
        minutes: 5,
        intro: 'A few questions come up again and again for people beginning to read the Bible. Here are some honest answers.',
        body: [
          'A few questions come up again and again for people beginning to read the Bible. Here are some honest answers.',
          'Which translation should I use? For Mass in the United States, the Church uses the New American Bible Revised Edition. For personal reading and study, many find the Revised Standard Version Catholic Edition especially clear and close to the original languages. Either is a good starting point.',
          'Why are there footnotes? Most Catholic Bibles include footnotes that provide historical context, note variations in ancient manuscripts, or point to related passages. They\'re not required reading, but they reward the curious.',
          'Do Catholics interpret the Bible literally? Not in a rigid sense. The tradition speaks of four ways a passage can communicate meaning — the literal sense, the allegorical, the moral, and the anagogical. Simply put: a passage can tell us what happened, what it points to beyond itself, how we should live, and what it reveals about eternity — sometimes all at once.',
          'What is a parable? A parable is a short story that uses everyday images to reveal a deeper truth. Jesus told them constantly. They aren\'t puzzles to be solved — they\'re invitations to see the world differently.',
          'Why does God seem different in the Old Testament? This is one of the most common questions newcomers ask. The tradition speaks of progressive revelation — the idea that God revealed himself gradually, meeting humanity where it was at different points in history. The fullest picture of God is in Jesus. Reading the Old Testament through that lens changes how the earlier texts feel.',
          'These questions don\'t have to be settled before you begin. Open the Gospel of Mark. Read a few chapters. Let the text ask its own questions of you — that is often where the real conversation starts.',
        ],
        takeaways: [],
        reflection: '',
      },
    ],
  },
  {
    id: 'prayer',
    title: 'Prayer',
    description: 'Prayer is the heart of a relationship with God. These lessons introduce the Catholic tradition of prayer, helping you discover different ways to pray, grow through every season, and build a lifelong conversation with God.',
    icon: '/pray-icon.png',
    lessonCount: 12,
    lessons: [
      {
        id: 'what-is-prayer',
        title: 'What Is Prayer?',
        minutes: 3,
        intro: 'Prayer is one of those words everyone recognizes but few people pause to define. At its simplest, it is a conversation — not a monologue of requests sent upward into the dark, but a relationship with a God who is already present and already listening.',
        body: [
          'Prayer is one of those words everyone recognizes but few people pause to define. At its simplest, it is a conversation — not a monologue of requests sent upward into the dark, but a relationship with a God who is already present and already listening.',
          'The Catechism of the Catholic Church describes prayer as "the raising of one\'s mind and heart to God." That phrase does something important: it shifts the emphasis from words to attention. Prayer isn\'t primarily about what you say. It\'s about who you\'re turning toward.',
          'There are four classical forms of prayer. Adoration — simply acknowledging who God is, the greatness and goodness at the center of everything. Contrition — bringing honesty about the ways we\'ve fallen short. Thanksgiving — recognizing that all good things are gift. And petition — yes, asking. Asking for ourselves, asking for others. God invites this. Jesus himself said, "Ask and you shall receive."',
          'But what most people discover, as prayer deepens, is that asking becomes less central than they expected. The conversation becomes less about getting things and more about knowing someone. That\'s the movement prayer is always inviting you toward.',
          'You don\'t need to understand all of this before you begin. The most important thing about prayer is that it starts.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'how-do-i-pray',
        title: 'How Do I Pray?',
        minutes: 3,
        intro: 'There is no wrong way to begin. That\'s the most important thing to say first.',
        body: [
          'There is no wrong way to begin. That\'s the most important thing to say first.',
          'Some people find it easier to speak out loud. Others pray silently. Some write in a journal. Some sit still; some walk. The tradition offers rich structures and forms — and we\'ll explore many of them — but the foundation is always the same: a person turning, honestly, toward God.',
          'A simple place to start: find a few minutes of quiet. That\'s harder than it sounds. Our lives are full of sound, and silence can feel uncomfortable until you get used to it. Start small — five minutes is enough. Sit, and begin.',
          'Use your own words. Tell God how you\'re actually feeling. If you\'re grateful, say so. If you\'re confused, say that too. If you don\'t know what to say, say that. "I don\'t know how to do this" is as honest a prayer as any.',
          'If your mind wanders — and it will — don\'t be discouraged. Gently bring it back. Every time you do, that\'s an act of prayer in itself. St. Thérèse of Lisieux once said that she fell asleep during prayer and trusted that God loved her like a Father loves a child who falls asleep in his arms.',
          'Start with honesty. Everything else follows from there.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'traditional-prayers',
        title: 'Learning Traditional Prayers',
        minutes: 4,
        intro: 'When you say the Our Father at Mass, you are praying the same words spoken at every Mass for two thousand years, in every language, on every continent. You are joining something much larger than yourself.',
        body: [
          'When you say the Our Father at Mass, you are praying the same words spoken at every Mass for two thousand years, in every language, on every continent. Something shifts when you realize that. You are not praying alone.',
          'The Our Father — also called the Lord\'s Prayer — was taught by Jesus himself when his disciples asked him how to pray. It covers everything: acknowledging who God is, asking for daily provision, seeking forgiveness while committing to forgive others, and asking for protection from evil. It is, in every sense, a complete prayer.',
          'The Hail Mary draws almost entirely from Scripture. The first half comes directly from the Gospel of Luke — the angel Gabriel\'s greeting to Mary, and Elizabeth\'s greeting when Mary visits her. The second half is the Church\'s addition: a request for Mary\'s intercession, now and at the hour of death.',
          'The Glory Be — "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen" — is ancient and brief. It\'s a short act of praise, a way of returning to the Trinity again and again throughout the day.',
          'These prayers aren\'t meant to replace personal conversation with God. They\'re a foundation — words worn smooth by centuries of use, always ready when your own words run out.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-repeat-prayers',
        title: 'Why Do Catholics Repeat Prayers?',
        minutes: 3,
        intro: 'One of the first things people notice about Catholic prayer is repetition. The same prayers, said again and again. To someone unfamiliar with the tradition, it can seem mechanical. But there is something deeper happening.',
        body: [
          'One of the first things people notice about Catholic prayer is repetition. The same prayers, said again and again — at Mass, in the Rosary, in the Liturgy of the Hours. To someone unfamiliar with the tradition, it can seem mechanical. Jesus himself warned against "vain repetitions." So why repeat?',
          'The distinction Jesus was making was not between repeated prayer and spontaneous prayer. It was between sincere prayer and empty performance. The same words, said with genuine attention and love, are not "vain." Only words said without heart are.',
          'Think of other meaningful repetitions in a life: "I love you," said to a spouse over decades. "Thank you," offered at every meal. These don\'t become empty through repetition. They deepen. They form the person who says them.',
          'The same is true of liturgical prayer. When you say the Our Father every Sunday at Mass, you\'re not simply reciting words. You\'re being shaped by them — trained to acknowledge that God is Father, that you depend on him daily, that forgiveness is something you both need and owe.',
          'Over time, the prayer begins to pray itself in you. That\'s the goal — not efficiency, but formation.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'praying-with-scripture',
        title: 'Praying with Scripture',
        minutes: 3,
        intro: 'Most people who read the Bible approach it the way they\'d approach any text: they read to understand. That\'s good. But there\'s another way to engage Scripture — one in which you read not only to understand, but to listen.',
        body: [
          'Most people who read the Bible approach it the way they\'d approach any text: they read to understand. That\'s good. But there\'s another way to engage Scripture — one in which you read not only to understand, but to listen.',
          'The difference is subtle but significant. Reading to understand asks: what does this mean? Reading to listen asks: what is God saying to me, through this, right now? The first is intellectual. The second is prayerful. Both matter, but they\'re different postures.',
          'One simple way to pray with Scripture: choose a short passage — a single verse or a few lines from the Gospels. Read it once slowly. Then read it again. Notice what catches your attention. It might be a word, an image, a phrase that seems to press on something in your life. Stay there. Don\'t rush past it.',
          'Then respond. You might thank God for what the passage revealed. You might ask for help with what it called you toward. You might simply sit with it in silence. The conversation is yours to shape.',
          'Scripture is not a static text. The same Spirit who inspired the human authors is present when the text is read and prayed. That\'s why a passage you\'ve heard many times can suddenly say something entirely new.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'lectio-divina',
        title: 'What Is Lectio Divina?',
        minutes: 4,
        intro: 'Lectio Divina is Latin for "sacred reading," and it\'s one of the oldest prayer practices in the Christian tradition — going back to the early monks who made prayerful engagement with Scripture the center of their daily lives.',
        body: [
          'Lectio Divina is Latin for "sacred reading," and it\'s one of the oldest prayer practices in the Christian tradition — going back to the early monks who made prayerful engagement with Scripture the center of their daily lives.',
          'At its heart, Lectio Divina is simply the practice of reading Scripture in a way that opens space for God to speak. It isn\'t complicated, and it doesn\'t require a retreat or a spiritual director. It can happen in fifteen minutes on a Tuesday morning.',
          'The practice moves through four movements. Lectio — reading. Take a short passage and read it slowly, more slowly than you think you need to. Meditatio — meditation. Read it again and notice what surfaces. What word or phrase draws your attention? Don\'t analyze it; just notice. Oratio — prayer. Respond to what you noticed. Speak honestly to God about what the passage stirred. Contemplatio — contemplation. Rest. Let go of words and simply be present.',
          'You don\'t need to get all four movements "right." Sometimes a passage holds you in the second one for a long time. Sometimes the fourth comes unexpectedly. The structure is a guide, not a formula.',
          'What Lectio Divina teaches, over time, is that Scripture isn\'t just a book about God. It\'s a place where God meets you.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'understanding-the-rosary',
        title: 'Understanding the Rosary',
        minutes: 4,
        intro: 'The Rosary can look, from the outside, like repetition without meaning — the same words said fifty times, beads counted in a circle. But people who pray it regularly will tell you something different: the prayers are not the point. The mysteries are.',
        body: [
          'The Rosary can look, from the outside, like repetition without meaning — the same words said fifty times, beads counted in a circle. But people who pray it regularly will tell you something different: the prayers are not the point. The mysteries are.',
          'The Rosary is a meditation on the life of Jesus, told through the eyes of Mary. As you pray the familiar words — Hail Mary after Hail Mary — your mind is invited to rest on a scene from the Gospel: the angel appearing to Mary, Jesus walking on water, the Crucifixion, the Resurrection. The beads mark the rhythm of the prayer while the imagination enters the story.',
          'Pope St. John Paul II described the Rosary as a "contemplative prayer." You\'re not just reciting words — you\'re dwelling in the mystery. The repeated prayers create a kind of stillness, a slowing down, that makes space for genuine encounter with the Gospel.',
          'The Rosary developed gradually over many centuries. Its earliest forms were medieval — groups of laypeople who couldn\'t read the Latin Psalms developed their own cycle of 150 prayers to mirror the Psalter. The full form we know today was largely shaped by the Dominican tradition and has been encouraged repeatedly as a simple, powerful way to pray.',
          'You don\'t have to pray all twenty mysteries in one sitting. Many people pray one set — five decades — as part of a daily rhythm. Starting once is enough to see why it has endured.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'eucharistic-adoration',
        title: 'Eucharistic Adoration',
        minutes: 3,
        intro: 'In many Catholic churches, you\'ll find a chapel where the consecrated Eucharist is displayed in a vessel called a monstrance, a lamp burning nearby. People come and go throughout the day, kneeling or sitting quietly.',
        body: [
          'In many Catholic churches, you\'ll find a chapel where the consecrated Eucharist is displayed in a vessel called a monstrance, a lamp burning nearby. People come and go throughout the day, kneeling or sitting quietly, sometimes for only a few minutes.',
          'This is Adoration, and its logic is simple. The Eucharist is not a symbol — it is the real presence of Jesus Christ. Spending time in his presence — without agenda, without words, without anything to accomplish — is one of the most natural things a person of faith can do.',
          'The practice of reserving the Eucharist for prayer dates back centuries. The lamp that burns near the tabernacle is one of the most ancient signs in Catholic churches — a quiet signal that Christ is present, waiting.',
          'You don\'t need to say anything during Adoration. You don\'t need to feel anything in particular. Many people who visit for the first time report feeling awkward — they don\'t know what to do with the silence. That\'s fine. Bring your worries, your gratitude, your confusion. Or bring nothing. Simply be present to the One who is present to you.',
          'St. John Vianney once asked a peasant who sat for hours before the Blessed Sacrament what he was doing. The man replied: "I look at him, and he looks at me." That\'s enough.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'when-prayer-feels-dry',
        title: 'When Prayer Feels Dry',
        minutes: 4,
        intro: 'If you have been praying for any length of time, you may have already encountered a season when it feels empty. The words feel hollow. The silence feels like nothing more than silence.',
        body: [
          'If you have been praying for any length of time, you may have already encountered a season when it feels empty. The words feel hollow. The silence feels like nothing more than silence. The sense of God\'s nearness that once felt real seems to have quietly gone.',
          'This is not a sign that something has gone wrong. It is, in fact, one of the most commonly described experiences in the entire history of Christian prayer. The great mystics called it "aridity" — a season in which the consolations of prayer are withdrawn, not as punishment, but as an invitation to mature.',
          'St. John of the Cross wrote about what he called the "dark night of the soul" — a period in which God seems absent, but in which the soul is actually being drawn into a deeper, less emotional, more purely faithful kind of love. The feelings were the scaffolding; when they\'re removed, what remains is the building.',
          'When prayer feels dry, the most important thing is to keep showing up. Not because consistency produces feeling — it may not for a long time — but because faithfulness in the dry seasons is itself a form of love. You\'re saying, by your presence, that your prayer is not contingent on how it feels.',
          'The testimony of the tradition is remarkably consistent: the dryness, endured faithfully, eventually gives way. You are not the first person to sit in this silence — and you will not be the last.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'does-god-answer-prayer',
        title: 'Does God Always Answer Prayer?',
        minutes: 4,
        intro: 'The short answer is yes. But the longer answer is that the response isn\'t always what we expected, and sometimes it\'s very hard to receive.',
        body: [
          'The short answer is yes. But the longer answer is that the response isn\'t always what we expected, and sometimes it\'s very hard to receive.',
          'God always hears prayer and always responds — but the response comes in one of three forms: yes, not yet, or something better. That last one is the hardest to accept, especially in the middle of real suffering, when what you asked for seemed not just desired but necessary.',
          'The Gospels don\'t shy away from this tension. Jesus himself prayed in the garden of Gethsemane: "Father, if it is possible, let this cup pass from me." The cup did not pass. And what came through that suffering was the Resurrection — something that could not have come any other way.',
          'This is not a comfortable teaching. But it is a consistent one. The whole tradition of prayer insists that God\'s knowledge of what we need is more complete than our own — and that asking, even when the answer is painful, forms us in the posture of trust.',
          'St. Monica prayed for seventeen years for the conversion of her son Augustine. When he left for Rome, she prayed desperately that he would not go. He went. And Rome is where he encountered the community that changed his life. The prayer she wept over was answered in a way she never would have chosen.',
          'Ask boldly. Trust deeply. Hold the outcome with open hands.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'building-habit-of-prayer',
        title: 'Building a Habit of Prayer',
        minutes: 3,
        intro: 'Habits form by repetition, not by inspiration. Most people wait until they feel ready to pray. That day rarely comes.',
        body: [
          'Habits form by repetition, not by inspiration. Most people wait until they feel ready to pray — spiritually prepared, emotionally open, not too tired. That day rarely comes. The most effective way to build a habit of prayer is to decide on a time and protect it, regardless of how you feel.',
          'Many spiritual directors suggest praying at the same time each day, in the same place if possible. The external consistency creates an internal one. Over time, sitting down at that place at that time begins to feel like prayer before you\'ve said a word.',
          'Morning is the time most commonly recommended — not because God is more present in the morning, but because it sets the posture of the day before anything else has claimed it. But if evening works better for your life, use evening. The most important variable is consistency, not hour.',
          'Start small. Five minutes of genuine attention is worth more than an hour of distracted obligation. As the habit forms, the time naturally expands — not as a rule, but because the conversation becomes something you want rather than something you feel you should do.',
          'The tradition also gives us rhythms throughout the day: grace before meals, a brief prayer at noon, an Examen in the evening. These brief moments don\'t require scheduling. They\'re already woven into the shape of a faithful day, waiting to be inhabited.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'growing-in-prayer',
        title: 'Growing in Prayer',
        minutes: 4,
        intro: 'Prayer changes. What it looks like at the beginning of your faith is not what it looks like ten years in — or forty. The forms may shift. The feelings come and go. What deepens is the relationship itself.',
        body: [
          'Prayer changes. What it looks like at the beginning of your faith is not what it looks like ten years in — or forty. The forms may shift. The feelings come and go. What deepens is the relationship itself.',
          'In the early stages, prayer often feels like effort. You\'re learning the vocabulary, finding the time, figuring out how to quiet your mind. Much of the tradition\'s guidance at this stage is practical: pray at the same time each day, use the traditional forms, don\'t give up when it feels dry.',
          'Over time, something begins to shift. The effort gives way, gradually, to something more like ease. Not that prayer becomes effortless — the mystics would say that real prayer always involves a kind of dying to self — but that the resistance softens. You begin to pray not because you feel you should but because you want to. God becomes less of a concept and more of a presence.',
          'The tradition identifies stages and forms of deeper prayer: meditation, affective prayer, contemplation. These aren\'t achievements to unlock — they\'re gifts that come in their own time. The movement toward them is not something you engineer; it\'s something you receive by staying faithful.',
          'And here is what matters most: no matter where you are in your journey, prayer is always possible. The simplest "Lord, help me" and the deepest contemplative silence arise from the same place. Both are heard. Both are received.',
          'The invitation is always the same: turn toward God, honestly, and stay.',
        ],
        takeaways: [],
        reflection: '',
      },
    ],
  },
  {
    id: 'core-beliefs',
    title: 'Core Beliefs',
    description: 'Every journey begins with understanding the essentials. These lessons explore the beliefs that shape the Catholic faith, answering some of the most common questions people ask as they begin discovering God, the Church, and the life He invites us to live.',
    icon: '/core-beliefs.png',
    iconPad: 12,
    lessonCount: 15,
    lessons: [
      {
        id: 'who-is-god',
        title: 'Who Is God?',
        minutes: 4,
        intro: 'The word "God" is everywhere — in blessings, in art, in the quiet moments when life feels too large to hold alone. But what does the word actually mean?',
        body: [
          'The word "God" is everywhere — in blessings, in art, in the quiet moments when life feels too large to hold alone. But what does the word actually mean?',
          'God is not a force or an energy or a cosmic principle. He is a Person — or more precisely, a communion of Persons: Father, Son, and Holy Spirit. He is the source of everything that exists, including you. He did not have to create the world. He chose to — out of love, not need.',
          'The earliest name God gives himself in Scripture is "I AM" — a name that means he is not contingent on anything else. He doesn\'t come into being; he simply is. Everything else that exists does so because of him and in relation to him.',
          'But this God is not distant. The whole story of Scripture is the story of a God who pursues, who calls, who speaks, who enters history. When Jesus prays, he calls God "Abba" — the Aramaic word for Father, intimate and familiar. That is the relationship being offered to you.',
          'You may not yet have a vivid sense of who God is. That is all right. The faith begins not with certainty but with turning — with the quiet act of saying, even tentatively, "I want to know." God has a long history of meeting people exactly there.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-the-trinity',
        title: 'What Is the Trinity?',
        minutes: 4,
        intro: 'The Trinity is the central mystery of the Christian faith — and one of the first things that can feel confusing when you begin exploring Catholicism. One God. Three Persons. It is worth spending a moment with this.',
        body: [
          'The Trinity is the central mystery of the Christian faith — and one of the first things that can feel confusing when you begin exploring Catholicism. One God. Three Persons. How does that work?',
          'The honest answer is that the Trinity is not fully understandable by human reason alone. It is a mystery — not in the sense of a puzzle waiting to be solved, but in the sense of a reality deeper than any single mind can contain. Every analogy eventually fails. A shamrock, a triangle, water in three states — all of them say something true and leave out something essential.',
          'What the Church has always affirmed is this: God is Father, Son, and Holy Spirit — three distinct Persons, each fully God, united as one. Not three gods. Not one God wearing three masks. One God, eternally existing as a communion of love.',
          'The doctrine of the Trinity didn\'t come from human philosophy. It came from the experience of the first Christians, who encountered Jesus, witnessed his resurrection, and received the Holy Spirit at Pentecost. They had to make sense of what had happened to them. Slowly, carefully, over centuries of prayer and reflection, the Church arrived at language that honored the mystery without reducing it.',
          'What matters most is not mastering the theology, but sensing what it reveals: at the very center of reality is not a solitary power, but a relationship of perfect love. And that love is what you are being invited into.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'who-is-jesus-christ',
        title: 'Who Is Jesus Christ?',
        minutes: 4,
        intro: 'You may wonder why the Catholic faith centers so completely on one person. Every sacrament points to him. Every Sunday, the Church gathers to remember what he did and encounter him again. Everything begins and ends with Jesus.',
        body: [
          'You may wonder why the Catholic faith centers so completely on one person. Every sacrament points to him. Every Sunday, the Church gathers to remember what he did and encounter him again. Everything begins and ends with Jesus.',
          'He was born in Bethlehem, raised in Galilee, baptized in the Jordan, and crucified outside Jerusalem under the Roman governor Pontius Pilate. These are historical facts — more attested in ancient sources than most figures of his era.',
          'But the faith rests on something more than history. Jesus was not simply a remarkable man. He was, and is, the Son of God — fully divine and fully human — who entered creation not to observe it from the outside but to become part of it from the inside. He took on flesh, lived an ordinary human life, suffered, died, and rose again.',
          'That resurrection is everything. Without it, Jesus would be a compelling moral teacher whose movement collapsed when he was executed. With it, he is who he claimed to be — the way, the truth, and the life.',
          'If you are still figuring out what you believe about Jesus, that is exactly where many people begin. The invitation is simply this: look at him. Read the Gospels slowly. See what he does, who he welcomes, what he says about the Father. His life makes a claim on you. Take your time with it.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'who-is-the-holy-spirit',
        title: 'Who Is the Holy Spirit?',
        minutes: 4,
        intro: 'The Holy Spirit can feel like the hardest Person of the Trinity to grasp. The Father brings a certain clarity — a creator, a provider. Jesus is tangible — a life recorded in history, a story in the Gospels. But the Spirit? He is presence, movement, breath.',
        body: [
          'The Holy Spirit can feel like the hardest Person of the Trinity to grasp. The Father brings a certain clarity — a creator, a provider. Jesus is tangible — a life recorded in history, a story in the Gospels. But the Spirit? He is presence, movement, breath.',
          'Scripture uses several images to describe him. Wind — invisible but unmistakable in its effects. Fire — transforming what it touches. A dove — gentle, descending. Breath — the original act of God\'s life given to humanity at creation.',
          'He was present at the beginning. He hovered over the waters in Genesis. He came upon the prophets, prompting them to speak. He overshadowed Mary at the Annunciation. At Jesus\' baptism, he descended as a dove. And at Pentecost, he came with wind and fire, transforming a frightened group of disciples into witnesses who turned the ancient world upside down.',
          'He is not a force or an energy — he is a Person, the third Person of the Trinity, who continues to guide, strengthen, and sanctify the Church. When you receive the sacraments, it is the Spirit who is at work. When Scripture feels alive as you read it, that is his presence. When a homily lands on something you needed to hear, when peace arrives in the middle of uncertainty — those are his movements.',
          'You don\'t have to fully understand the Spirit to receive him. That has always been the way he works.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-did-god-create-us',
        title: 'Why Did God Create Us?',
        minutes: 3,
        intro: 'It is a question that sounds simple and turns out to be enormous: why are we here?',
        body: [
          'It is a question that sounds simple and turns out to be enormous: why are we here?',
          'The answer at the heart of the Catholic faith is disarmingly direct. God created us to know him, to love him, and to live with him forever. Not because he was lonely or needed something from us — God lacks nothing. He created out of the overflow of love, inviting us to share in the communion that he himself is.',
          'You were not an accident. The Psalmist writes that God knit him together in his mother\'s womb, that all his days were written before one of them came to be. That is the faith\'s claim about every human being — that each person is wanted, known, and made for something.',
          'That something is relationship. Not a vague spiritual feeling, but a real, particular, personal communion with a God who calls you by name. Everything in the Catholic faith — the sacraments, the prayer life, the moral teaching — exists to make that relationship possible and to deepen it.',
          'If you have carried a sense that your life should mean something more than it currently does, that is not wishful thinking. It is an accurate perception. You were made for more. And the invitation is still open.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-sin',
        title: 'What Is Sin?',
        minutes: 4,
        intro: 'Sin is one of those words that can feel heavy before you even understand what it means. It\'s worth setting aside whatever the word carries for you and looking at what it actually is.',
        body: [
          'Sin is one of those words that can feel heavy and judgmental before you even understand what it means. It\'s worth setting aside whatever the word carries for you and looking at what it actually is.',
          'At its simplest, sin is a turning away from God. Not because God is offended in the way a wounded pride is offended, but because turning away from the source of all life and love has real consequences — for us, for others, and for the world.',
          'The story of the Fall in Genesis — the garden, the serpent, the fruit — is not primarily about a piece of fruit. It is about a choice: the choice to trust our own judgment over God\'s, to decide for ourselves what is good and what is evil. Every sin, in some form, repeats that original movement. We turn toward ourselves and away from God.',
          'The tradition distinguishes between mortal sin — which severs the relationship with God entirely and is healed through the sacrament of Reconciliation — and venial sin, which wounds the relationship without breaking it. Both matter. Neither is beyond God\'s mercy.',
          'And that is what the tradition always wants to say alongside any teaching on sin: God\'s mercy is always greater. The point of naming sin clearly is not to produce shame, but to make space for healing. The sacrament of Reconciliation exists precisely because the Church knows that people fail — and that failure does not have the last word.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-grace',
        title: 'What Is Grace?',
        minutes: 3,
        intro: 'You may hear the word grace often during OCIA — in prayers, in homilies, in the sacramental rites. It is worth pausing on it, because it is one of the most important words in the Catholic vocabulary.',
        body: [
          'You may hear the word grace often during OCIA — in prayers, in homilies, in the sacramental rites. It is worth pausing on it, because it is one of the most important words in the Catholic vocabulary.',
          'Grace is God\'s free gift. Not something earned, not something deserved, not something you work your way up to. It is the divine life itself, offered to us — the presence of God dwelling in the soul, drawing it toward him.',
          'The tradition speaks of different kinds of grace. Sanctifying grace is received in Baptism, making us children of God and restoring the relationship that sin had broken. Actual grace refers to the specific helps God gives in particular moments — the prompting to be honest, the strength to forgive, the courage to begin again after failure.',
          'Grace doesn\'t override freedom. It works through it. God offers; we respond. But even the capacity to respond is itself a gift — without grace, we could not turn toward God at all.',
          'What this means practically is that your spiritual life is not something you are building alone. The desire to know God better, the fact that you are in an OCIA class or reading these words — that too is grace, already at work before you noticed it.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-does-it-mean-to-be-saved',
        title: 'What Does It Mean to Be Saved?',
        minutes: 4,
        intro: 'Salvation is a word that can carry a lot of weight, depending on where you\'re coming from. It\'s worth asking simply: what does the faith actually mean by it?',
        body: [
          'Salvation is a word that can carry a lot of weight, depending on where you\'re coming from. It\'s worth asking simply: what does the faith actually mean by it?',
          'To be saved is to be healed — restored to the relationship with God that sin disrupted. It is not primarily about escaping punishment. It is about being brought home.',
          'The need for salvation is real. Something went wrong at the beginning of human history — a break in the relationship between humanity and God that we cannot repair by our own effort. No amount of good behavior, spiritual discipline, or moral achievement can restore what sin destroyed. We need something from outside ourselves.',
          'That is what Jesus offers. His death on the cross was not a legal transaction performed to satisfy an angry God. It was God himself entering into the depth of human suffering and death, to transform it from the inside. The Resurrection is the sign that death does not have the final word — that the wound sin made in creation has been healed, and will be healed in full.',
          'Salvation is not only something that happens after death. It begins now — in Baptism, in the sacraments, in the gradual healing of a life oriented toward God. And it is complete in eternal life, when we see God face to face. The consistent note through all of this is hope.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-did-jesus-establish-a-church',
        title: 'Why Did Jesus Establish a Church?',
        minutes: 4,
        intro: 'One question people ask early on is a fair one: why a Church? Why couldn\'t Jesus simply teach, save us, and leave us to live the faith individually? Why an institution?',
        body: [
          'One question people ask early on is a fair one: why a Church? Why couldn\'t Jesus simply teach, save us, and leave us to live the faith individually?',
          'The answer begins with how Jesus actually behaved. He didn\'t just preach to crowds. He called twelve specific men, gave them authority to teach and to forgive sins and to baptize, and sent them out in his name. He promised that the gates of hell would not prevail against what he was building. He breathed the Holy Spirit on them and said, "As the Father has sent me, so I send you."',
          'That sending was not a suggestion. The Church is not a later addition to the faith — something human beings invented to organize Jesus\' followers after he was gone. It is something Jesus himself established, with intention, as the way his mission would continue in the world.',
          'This doesn\'t mean the Church is perfect. Every Catholic knows she is made up of imperfect people, and history carries the weight of genuine failures. But imperfect doesn\'t mean invalid. A hospital is still a hospital even when the patients — and sometimes the doctors — are unwell.',
          'The Church is the body of Christ, continuing his presence in the world through the sacraments, the Scriptures, and the community of believers gathered in his name. You are not joining a building or an institution. You are being grafted into a living body that stretches back two thousand years and extends across every continent.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-is-the-pope-important',
        title: 'Why Is the Pope Important?',
        minutes: 4,
        intro: 'The papacy is one of the features of Catholicism that most often surprises people from outside the tradition. Why does one person hold such a prominent role in a faith that spans more than a billion people?',
        body: [
          'The papacy is one of the features of Catholicism that most often surprises people from outside the tradition — and sometimes people inside it too. Why does one person hold such a prominent role in a faith that spans more than a billion people?',
          'The answer begins with Jesus and Simon Peter. In Matthew\'s Gospel, Jesus turns to Simon — impulsive, inconsistent, not the most obvious candidate — and says: "You are Peter, and on this rock I will build my Church." He gives him the keys of the kingdom and a responsibility to feed and tend the flock.',
          'The Church understands this not as a one-time appointment but as an enduring office. Peter led the early Church in Rome and was martyred there. His successors — the bishops of Rome — have continued his ministry across the centuries. The Pope is the successor of Peter, the visible head of the Church, charged with preserving and teaching the faith in its fullness.',
          'This doesn\'t mean the Pope is sinless or incapable of error in his personal life. History makes that clear. What the Church teaches is that when the Pope speaks formally on matters of faith and morals, intending to bind the whole Church, the Holy Spirit protects him from teaching error. This is called papal infallibility — and it has been invoked formally only twice.',
          'More than a doctrinal function, the Pope serves as a sign of unity. In a Church that is genuinely worldwide — spanning every culture, language, and century — the papacy is the thread that holds it together as one.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-is-mary-so-important',
        title: 'Why Is Mary So Important?',
        minutes: 4,
        intro: 'If you are coming to Catholicism from outside the tradition, the place of Mary in Catholic life can seem surprising. People pray the Rosary. Churches are dedicated to her. She appears in art across every century of Christian history. Why?',
        body: [
          'If you are coming to Catholicism from outside the tradition, the place of Mary in Catholic life can seem surprising. People pray the Rosary. Churches are dedicated to her. She appears in art across every century of Christian history. What is the reason for all of this?',
          'The reason begins not with devotion but with history. Mary said yes. At the Annunciation, when the angel Gabriel told her that the Son of God would be conceived in her womb, she could have said no. She was young, unmarried, and the news would have upended her life. She said yes — and through that yes, God entered the world in human flesh.',
          'The Church has called her Theotokos since the Council of Ephesus in 431 — a Greek word meaning "God-bearer" or "Mother of God." Not because she created God, but because the child she bore was God incarnate. That title is first and foremost a statement about Jesus. It is only because of who he is that she holds the place she does.',
          'Mary is not worshipped. The distinction matters: worship belongs to God alone. What the Church offers Mary is honor — the highest honor given to any human being — because of her unique role in salvation history. She is the model disciple, the one who heard the Word of God and kept it, who stayed at the foot of the cross when others fled.',
          'She points always toward Jesus. Every Marian prayer, every feast, every Rosary mystery is, at its heart, a meditation on her Son.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-do-catholics-pray-to-saints',
        title: 'Why Do Catholics Pray to the Saints?',
        minutes: 4,
        intro: 'One of the most common questions people ask when exploring Catholicism is about the saints. Why pray to them? Isn\'t praying directly to God enough?',
        body: [
          'One of the most common questions people ask when exploring Catholicism is about the saints. Why pray to them? Isn\'t praying directly to God enough? And who decides who is a saint?',
          'Start with what asking a saint for prayer actually is — and isn\'t. It isn\'t worship. Worship belongs to God alone. Asking a saint to pray for you is not different in kind from asking a friend to pray for you. You believe the friend is alive, in relationship with God, and capable of interceding on your behalf. The Church believes the same about those who have died in God\'s grace.',
          'Death, in this understanding, does not end the relationship. The saints are not gone — they are more fully alive. They have entered into the presence of God, and from that place, they intercede for those still on the journey.',
          'The Church canonizes saints through a careful process that includes the examination of their lives, their writings, and verified miracles attributed to their intercession. Canonization is not a declaration that someone is in heaven based on a committee vote. It is the Church\'s confident affirmation that this particular person lived a life of heroic virtue and is certainly with God.',
          'The saints are not competitors with Christ. They are witnesses to what his grace makes possible. Their lives are evidence that the faith actually works.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-happens-after-we-die',
        title: 'What Happens After We Die?',
        minutes: 5,
        intro: 'Sooner or later, everyone asks this question. The Catholic faith has a clear, hopeful answer — though not a simple one.',
        body: [
          'Sooner or later, everyone asks this question. What happens after we die? It is one of the oldest questions in human history, and the faith has a clear, hopeful answer — though not a simple one.',
          'The tradition speaks of four realities: death, judgment, heaven, and hell. These are called the Four Last Things, and they have shaped Christian moral and spiritual life for two thousand years.',
          'At death, the soul separates from the body. This is not the end — the body will be raised at the resurrection of the dead, reunited with the soul at the Last Judgment. In the meantime, the soul faces what the tradition calls the particular judgment: an encounter with the truth of one\'s own life, seen in the full light of God\'s love.',
          'Heaven is the full, direct vision of God — not a place in the clouds with harps, but a state of complete union with the source of all love, beauty, and joy. It is what human beings were made for. Hell is real, and the Church teaches this clearly — not to frighten people, but out of respect for human freedom. God does not force anyone to love him. Hell is the state of those who have, by their own choices, definitively rejected that love.',
          'Purgatory is the process of purification for those who die in God\'s grace but are not yet fully ready to see him face to face. It is not a second chance at salvation — it is the final preparation of a soul that has chosen God but still carries the residue of sin. The consistent note through all of this is hope: the Church proclaims the resurrection of the dead and the life of the world to come.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-the-communion-of-saints',
        title: 'What Is the Communion of Saints?',
        minutes: 3,
        intro: 'Every time you say the Apostles\' Creed, you profess belief in "the communion of saints." It\'s a phrase worth pausing on, because it points to something larger than most people realize.',
        body: [
          'Every time you say the Apostles\' Creed, you profess belief in "the communion of saints." It\'s a phrase worth pausing on, because it points to something larger than most people realize.',
          'The communion of saints is the entire family of God — those who have died and are now with God in heaven, those in the process of purification in purgatory, and those of us still on earth. Three groups, one family, united in Christ.',
          'This means that when you sit in Mass on a Sunday morning, you are not alone. You are surrounded by a cloud of witnesses who have walked this road before you — every person who has ever prayed the Our Father, received the Eucharist, or turned toward God in the dark. They are not absent from your life. They are interceding for you.',
          'It also means that death changes a relationship but does not end it. You can ask those who have died in faith to pray for you, just as you would ask a living friend. The bond of love that holds the Church together is not broken by death — it is deepened.',
          'The communion of saints is not a beautiful metaphor. It is a description of reality. You are already part of something ancient, wide, and eternal. You were never beginning alone.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-is-the-eucharist-so-important',
        title: 'Why Is the Eucharist So Important?',
        minutes: 4,
        intro: 'Everything in the Catholic faith leads toward the Eucharist. The sacraments prepare us for it, the Scriptures point toward it, the Mass culminates in it. The Second Vatican Council called it "the source and summit of the Christian life." Why?',
        body: [
          'Everything in the Catholic faith leads toward the Eucharist. The sacraments prepare us for it, the Scriptures point toward it, the Mass culminates in it. The Second Vatican Council called it "the source and summit of the Christian life." Why?',
          'At the Last Supper, the night before his death, Jesus took bread, gave thanks, and said: "This is my body." He took a cup of wine and said: "This is my blood." He told his disciples to do this in memory of him — and they have, in every generation, in every corner of the world, ever since.',
          'The Eucharist is not a symbol or a memorial in the ordinary sense. At the Consecration of the Mass, the bread and wine truly become the body and blood of Christ. The tradition calls this transubstantiation — the substance is changed, even as the outward appearances remain. Christ is truly present.',
          'This means that every Mass is not merely a commemoration of something that happened two thousand years ago. It is an encounter with the living Christ — the same sacrifice of Calvary, made present again, offered to the Father on behalf of the whole world.',
          'If you are not yet receiving Communion, you are still welcome to come forward with arms crossed for a blessing. And as you continue your journey toward the sacraments, the Eucharist is what is waiting at the other end — not as a reward, but as the beginning of a deeper life.',
        ],
        takeaways: [],
        reflection: '',
      },
    ],
  },
  {
    id: 'sacraments',
    title: 'Sacraments',
    description: 'God meets us through ordinary things — water, bread, wine, oil, words, and the people around us. The sacraments are visible signs of God\'s grace, accompanying us through every stage of life and drawing us closer to Him.',
    icon: '/sacraments.png',
    iconPad: 6,
    lessonCount: 10,
    lessons: [
      {
        id: 'what-is-a-sacrament',
        title: 'What Is a Sacrament?',
        minutes: 4,
        intro: 'You may have heard that the Catholic Church has seven sacraments. But before exploring each one, it\'s worth asking the simpler question: what is a sacrament?',
        body: [
          'You may have heard that the Catholic Church has seven sacraments — Baptism, Confirmation, Eucharist, Reconciliation, Anointing of the Sick, Holy Orders, and Marriage. But before exploring each one, it\'s worth asking the simpler question: what is a sacrament?',
          'A sacrament is a visible sign of invisible grace. God uses ordinary, physical things — water, oil, bread, wine, words spoken aloud, the touch of a human hand — to convey something spiritual and real. This is not an arbitrary choice. It reflects the logic of the Incarnation. God did not save the world through an idea or a feeling. He took on flesh — physical, particular, visible human flesh — and entered history. The sacraments continue that logic.',
          'Jesus himself instituted the sacraments, either by performing them or by commanding his disciples to continue them. He baptized. He broke bread and said "do this in memory of me." He breathed on his disciples and gave them authority to forgive sins. Each sacrament carries the shape of something Jesus said or did.',
          'The sacraments are not magic — they are not mechanical rites that work automatically regardless of the heart. They require faith and intention. But they are also genuinely effective: the grace offered in them is real, and the Church\'s confidence in that grace has not wavered in two thousand years.',
          'What makes the sacraments remarkable is their scope. They accompany a person from birth to death — marking not just moments in life, but transformations. The person who passes through each sacrament is genuinely changed by it.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-seven-sacraments',
        title: 'Why Are There Seven Sacraments?',
        minutes: 3,
        intro: 'The number seven might seem arbitrary at first. Why not five sacraments, or twelve? The answer is less about counting and more about completeness.',
        body: [
          'The number seven might seem arbitrary at first. Why not five sacraments, or twelve? The answer is less about counting and more about completeness.',
          'The seven sacraments were not chosen because of a number. They were recognized by the Church over time as the specific moments Jesus himself instituted to convey grace — rites he either performed or explicitly commanded. The Council of Trent, in the sixteenth century, formally defined them as seven, clarifying a question that had been debated. But the sacraments themselves predate any council — they grew from the life and teaching of Jesus.',
          'What is striking about the seven is how naturally they map onto the arc of a human life. Baptism is new birth. Confirmation is coming of age in faith. The Eucharist is the ongoing nourishment that sustains the journey. Reconciliation addresses failure and restores what is broken. Anointing of the Sick accompanies suffering and death. Holy Orders and Marriage both consecrate a vocation — the public, lifelong gift of oneself in service of others.',
          'Taken together, the sacraments are not occasional encounters with God. They are a way of living — a structure of grace woven through an entire life. From the first breath of Baptism to the last anointing, they are present at every threshold, offering what each moment needs.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-baptism',
        title: 'What Is Baptism?',
        minutes: 4,
        intro: 'Every Christian story begins here. Whatever else will come — Confirmation, Eucharist, the whole long practice of faith — begins with the waters of Baptism.',
        body: [
          'Every Christian story begins here. Whatever else will come — Confirmation, Eucharist, the whole long practice of faith — begins with the waters of Baptism.',
          'Baptism is the first and foundational sacrament. In it, a person is cleansed of original sin, born into new life, incorporated into the Body of Christ, and made a child of God. These are not metaphors. Something real happens — a transformation at the level of the soul that no subsequent event can undo.',
          'Water is the central sign, and its symbolism is ancient. In Genesis, the Spirit of God hovered over the waters at creation. In Exodus, the Israelites passed through the Red Sea from slavery to freedom. Jesus himself was baptized in the Jordan River, marking the beginning of his public ministry. In each case, water is the boundary between one kind of life and another.',
          'In Baptism, the same movement happens for you. Paul writes in his letter to the Romans: "We were buried with him through baptism into death, in order that, just as Christ was raised from the dead through the glory of the Father, we too might walk in newness of life." The person who enters the water and the person who emerges are, in a real sense, not the same person.',
          'Adults entering the Church receive Baptism at the Easter Vigil — the holiest night of the Catholic year — in the midst of the entire community. That context is not incidental. Baptism is not a private transaction. It is a welcome into a family.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-confirmation',
        title: 'What Is Confirmation?',
        minutes: 4,
        intro: 'Confirmation is sometimes described as the sacrament of Christian maturity — the moment when a person takes personal ownership of the faith first received in Baptism.',
        body: [
          'Confirmation is sometimes described as the sacrament of Christian maturity — the moment when a person takes personal ownership of the faith first received in Baptism.',
          'In Baptism, someone else — parents, godparents, the Church — said yes on your behalf. In Confirmation, you say yes for yourself. The sacrament strengthens the gifts of the Holy Spirit already given in Baptism, sealing them more deeply into the soul and equipping the person for the full life of the Church.',
          'The central sign of Confirmation is the anointing with sacred chrism oil on the forehead, accompanied by the words: "Be sealed with the Gift of the Holy Spirit." This anointing echoes the anointing of kings and prophets in the Old Testament — an outpouring of the Spirit for a specific purpose and mission. The person being confirmed is not simply receiving a reward for completing a class. They are being sent.',
          'This is why Confirmation is connected in the tradition to the Day of Pentecost, when the Holy Spirit descended on the disciples in the upper room and sent them out to change the world. The gifts given then — wisdom, understanding, counsel, fortitude, knowledge, piety, and fear of the Lord — are the same gifts deepened in every person who receives Confirmation.',
          'Adults entering the Church typically receive Confirmation together with Baptism and the Eucharist at the Easter Vigil, receiving all three sacraments of initiation in one night. That sequence reflects the Church\'s ancient understanding that these three belong together.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-the-eucharist',
        title: 'What Is the Eucharist?',
        minutes: 4,
        intro: 'Everything in the Catholic faith leads here. The sacraments prepare us for it, the Scriptures point toward it, the Mass culminates in it. It is at once the simplest and the most extraordinary thing the Church does.',
        body: [
          'Everything in the Catholic faith leads here. The sacraments prepare us for it, the Scriptures point toward it, the Mass culminates in it. It is at once the simplest and the most extraordinary thing the Church does.',
          'At the Last Supper, on the night before his death, Jesus took bread, gave thanks, broke it, and said: "This is my body." He took a cup of wine and said: "This is my blood of the covenant, poured out for many." Then he said: "Do this in memory of me." The Church has done so ever since — in every language, on every continent, for two thousand years.',
          'What happens at the Consecration of the Mass is not a symbol or a re-enactment. The bread and wine truly become the body and blood of Christ. The tradition calls this transubstantiation: the substance of the elements is changed, even while the outward appearances remain. This is not philosophy for its own sake — it is the Church\'s effort to say, with precision, that the presence is real.',
          'The Eucharist is therefore not a commemoration of something that happened. It is an encounter with the living Christ, here and now. The same sacrifice of Calvary is made present again, offered to the Father for the life of the world. Time collapses. What happened once becomes present again.',
          'This is why a candle burns near the tabernacle. This is why people genuflect. This is why entering an empty Catholic church can feel like entering a place where someone is home. Because someone is.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-do-catholics-go-to-confession',
        title: 'Why Do Catholics Go to Confession?',
        minutes: 4,
        intro: 'Confession — more formally called the Sacrament of Reconciliation — is the sacrament many people feel most uncertain about, and the one that many who have returned to the Church describe as the most transformative.',
        body: [
          'Confession — more formally called the Sacrament of Reconciliation or the Sacrament of Penance — is the sacrament many people feel most uncertain about, and the one that many who have returned to the Church describe as the most transformative.',
          'The logic of Confession begins with a simple reality: we fail. We turn away from what we know is good. We harm others and ourselves. Something in the relationship with God is wounded or broken. Confession is how it is healed.',
          'On the evening of the Resurrection, Jesus appeared to his disciples and breathed on them. "Receive the Holy Spirit," he said. "Whose sins you forgive are forgiven them; whose sins you retain are retained." That act — breathing, the first act of creation repeated — was the giving of the sacrament. The authority to forgive sins in Christ\'s name was given to the apostles and passed on through their successors.',
          'The process is simple. You speak your sins honestly to a priest, who acts not in his own name but in the person of Christ. You express genuine contrition. The priest offers counsel and a penance — usually a prayer or an act of service — and then pronounces the words of absolution. The sins are forgiven. Not moved to a file or deferred — forgiven.',
          'The grace of this sacrament is not just the removal of guilt. It is the healing of the relationship, the strength to do better, and the encounter with a mercy that turns out to be larger than the failure.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-marriage',
        title: 'What Is Marriage?',
        minutes: 4,
        intro: 'Marriage is the one sacrament not administered by a priest. The couple administer it to each other, before God and the Church, in the exchange of consent. That detail says something important about what marriage is.',
        body: [
          'Marriage is the one sacrament not administered by a priest. The couple administer it to each other, before God and the Church, in the exchange of consent. That detail says something important about what marriage is.',
          'The Church recognizes marriage as a sacrament because it is a covenant — not a contract, a covenant. A contract is an exchange of services with defined terms. A covenant is a total gift of self, with no limit and no expiration. "I give myself to you, and I receive you, for life." That is what the vows say. That is what the Church believes they accomplish.',
          'This understanding goes back to the beginning. In Genesis, God creates the human being in his own image — "male and female he created them" — and they become "one flesh." Jesus quotes this text when asked about divorce, calling it the original design. What God has joined together, no human authority separates.',
          'The grace of the sacrament is real and ongoing. It is not a one-time blessing on the wedding day. It is a living grace that accompanies the couple throughout their life together — strengthening them, healing the inevitable wounds, equipping them for the particular demands of self-giving love.',
          'Marriage is not easy. Every honest Catholic married couple will tell you that. But within the difficulty is something sacred — a daily practice of love that, lived faithfully, is one of the most powerful ways human beings encounter God.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-holy-orders',
        title: 'What Is Holy Orders?',
        minutes: 4,
        intro: 'Every time a priest celebrates Mass, hears a confession, or anoints someone who is sick, he does so not in his own name but in the name and person of Christ. Holy Orders is the sacrament that makes this possible.',
        body: [
          'Every time a priest celebrates Mass, hears a confession, or anoints someone who is sick, he does so not in his own name but in the name and person of Christ. Holy Orders is the sacrament that makes this possible.',
          'Holy Orders is the sacrament by which men are ordained to serve the Church as deacons, priests, or bishops. These are not simply job titles. They are orders — specific ways of participating in the priesthood of Christ, each with its own character and mission.',
          'The deacon serves — he can baptize, witness marriages, proclaim the Gospel, and preach, but he does not celebrate Mass or hear confessions. Some deacons are unmarried and may go on to ordination as priests. Permanent deacons are often married men who serve their parishes while maintaining careers and family life.',
          'The priest presides at the Eucharist, hears confessions, anoints the sick, and shepherds a community. He acts "in persona Christi" — in the person of Christ — in a way inseparable from his ordination. The priesthood is not a role he performs. It is something he has become.',
          'The bishop holds the fullness of Holy Orders and is the successor of the apostles, responsible for the life of an entire diocese. Like Baptism and Confirmation, Holy Orders imprints a permanent character on the soul — something that cannot be removed, only set aside. What the sacrament does cannot be undone.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-anointing-of-the-sick',
        title: 'What Is the Anointing of the Sick?',
        minutes: 4,
        intro: 'There is a moment in the Letter of James — one of the earliest letters in the New Testament — that gives this instruction: "Is anyone among you sick? He should summon the presbyters of the Church, and they should pray over him and anoint him with oil in the name of the Lord."',
        body: [
          'There is a moment in the Letter of James — one of the earliest letters in the New Testament — that gives this instruction: "Is anyone among you sick? He should summon the presbyters of the Church, and they should pray over him and anoint him with oil in the name of the Lord, and the prayer of faith will save the sick person." That instruction is the scriptural foundation for the Anointing of the Sick — a sacrament that has accompanied the suffering and dying of Christians for two thousand years.',
          'The sacrament is not reserved for those who are about to die, as was sometimes believed in an older era. It is for anyone facing serious illness, surgery, the frailty of old age, or any condition that significantly threatens health or life. It can be received more than once — whenever the situation calls for it.',
          'The grace of the Anointing is multifaceted. It brings spiritual strength against anxiety and fear. It can bring physical healing, if that is God\'s will. It forgives sins. And it unites the person\'s suffering to the suffering of Christ — not to glorify pain, but to ensure that no suffering is meaningless. What Christ endured, he now shares with those who suffer in his name.',
          'The priest anoints the forehead and hands with the Oil of the Sick and prays over the person. It is a quiet sacrament, often received in a hospital room or at home. The setting is ordinary. The grace is anything but.',
          'If you have a loved one facing illness or surgery, do not hesitate to ask a priest to come. The sacrament is not a last resort. It is a gift meant to be received while it can still be received with full awareness and peace.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-do-the-sacraments-matter',
        title: 'Why Do the Sacraments Matter?',
        minutes: 4,
        intro: 'You have now encountered all seven sacraments — what they are, where they come from, and what they offer. It is worth stepping back and asking the larger question: why do they matter?',
        body: [
          'You have now encountered all seven sacraments — what they are, where they come from, and what they offer. It is worth stepping back and asking the larger question: why do they matter?',
          'The sacraments matter because God chose to meet us in the physical world — not above it, not despite it, but through it. Water really washes. Bread really nourishes. Oil really heals. Words spoken by the right person in the right context really do what they say. The Catholic faith does not separate spirit from matter or grace from the everyday. It insists that the ordinary world is the place where the sacred comes to meet us.',
          'This has practical consequences. Your encounter with God is not limited to moments of intense feeling or private spiritual experience. It happens in the gathered assembly, in the waters of Baptism, at the table where bread and wine are consecrated, in the quiet of a confessional, in the anointing of a forehead. It happens whether you feel it or not. The sacraments do not depend on your emotional state.',
          'The sacraments also form a complete picture of a life. From the Baptism that begins it to the Anointing that may accompany its end, they are present at every threshold. They mark not just moments but transformations — the person who passes through each sacrament is genuinely changed by it.',
          'The invitation behind all of them is the same: come and be met. God is not waiting for you to reach a certain level of understanding or holiness. He is coming toward you, through the most ordinary things in the world, asking you to receive him.',
        ],
        takeaways: [],
        reflection: '',
      },
    ],
  },
  {
    id: 'christian-living',
    title: 'Christian Living',
    description: 'Faith isn\'t meant to stay in the classroom or only on Sunday. It becomes part of the way we think, love, forgive, serve, and live each day. These lessons explore what it looks like to follow Christ in everyday life.',
    icon: '/christian-living.png',
    iconPad: 8,
    lessonCount: 12,
    lessons: [
      {
        id: 'what-is-sin-cl',
        title: 'What Is Sin?',
        minutes: 4,
        intro: 'You may have already encountered a definition of sin. But understanding it theologically is different from recognizing it in your own life, in real time, in the middle of an ordinary day.',
        body: [
          'You may have already encountered a definition of sin — as a turning away from God, as a moral failing. But understanding it theologically is different from recognizing it in your own life, in real time, in the middle of an ordinary day.',
          'Sin has a way of disguising itself. Pride looks like confidence. Envy looks like ambition. Dishonesty can look like kindness when we tell someone what they want to hear rather than what they need to hear. Part of the work of Christian living is learning to see clearly — to name things honestly, without excessive guilt and without easy excuses.',
          'The tradition speaks of sins of commission — things we actively did that we shouldn\'t have — and sins of omission — good things we failed to do when we had the chance. Both matter. The person who harms someone through anger and the person who stood by and said nothing are both implicated in what happened.',
          'The tradition also identifies the capital sins — pride, greed, envy, wrath, gluttony, lust, and sloth — not as a list of worst offenses but as root tendencies. Most of our failures trace back to one of them. Getting to know your own patterns is part of growing.',
          'The purpose of all this honesty is not shame. It is freedom. You cannot be healed from something you haven\'t named, and you cannot be forgiven for something you haven\'t brought forward. God\'s mercy is always greater — but it meets us where we actually are.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'mortal-vs-venial-sin',
        title: 'What\'s the Difference Between Mortal and Venial Sin?',
        minutes: 3,
        intro: 'Not every failure has the same weight. That is not a convenient rationalization — it is a genuine distinction the tradition makes, and it is worth understanding.',
        body: [
          'Not every failure has the same weight. That is not a convenient rationalization — it is a genuine distinction the tradition makes, and it is worth understanding.',
          'Mortal sin is the most serious kind. Three conditions must be present: the matter must be gravely serious, the person must know it is seriously wrong, and they must choose it freely and deliberately. When all three come together, the result is a complete rupture in the relationship with God — not a wound, but a severing. The ordinary remedy is the sacrament of Reconciliation.',
          'Venial sin is a real failing — a weakening of the relationship with God, a disordering of one\'s inner life — but it does not sever that relationship. Venial sins are healed through prayer, reception of the Eucharist, acts of charity, and genuine contrition. They do not require Confession, though confessing them is encouraged because of the particular grace the sacrament offers.',
          'The distinction matters for several reasons. It takes seriously the reality that some choices are more destructive than others — that there is a difference between a thoughtless word and a deliberate betrayal. It also protects against scrupulosity: the anxious, exhausting tendency to treat every minor fault as a catastrophe.',
          'What the tradition does not do is use this distinction as permission to be careless about venial sin. Small things, repeated, form the person. Each act of selfishness or dishonesty leaves a trace. The goal is not simply to avoid mortal sin and leave everything else unexamined. The goal is to grow.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'the-prodigal-son',
        title: 'The Prodigal Son',
        minutes: 4,
        intro: 'Of all the parables Jesus told, this is perhaps the one that has given the most people permission to come home.',
        body: [
          'Of all the parables Jesus told, this is perhaps the one that has given the most people permission to come home.',
          'You likely know the outline. A young man demands his inheritance early — essentially telling his father he wishes he were dead — takes the money, squanders everything in a distant country, and ends up feeding pigs with nothing left to eat. He comes to his senses, rehearses a speech, and starts walking home.',
          'The father sees him "while he was still a long way off." He doesn\'t wait at the door. He runs. He throws his arms around his son before a single word of the rehearsed speech is delivered. He calls for a robe, a ring, sandals, a feast. "This son of mine was lost and is found."',
          'There are at least three portraits in this story. The son, who returns. The father, who runs. And the older son, who stands outside the feast, keeping careful accounts of his own faithfulness while his brother is welcomed back without conditions. The parable ends without telling us whether the older son ever came inside.',
          'Jesus told this parable to people who were certain God preferred the righteous. He told it to explain why he ate with sinners. The mercy he described was not sentimentality. It was the actual character of the Father — running toward us before we\'ve finished the speech, restoring what we thought we had forfeited beyond recovery.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-are-the-beatitudes',
        title: 'What Are the Beatitudes?',
        minutes: 4,
        intro: 'The Sermon on the Mount begins with eight statements that most people would not recognize as a path to happiness. Blessed are the poor in spirit. The mourning. The meek. The persecuted.',
        body: [
          'The Sermon on the Mount begins with eight statements that most people would not recognize as a path to happiness. Blessed are the poor in spirit. The mourning. The meek. The persecuted.',
          'These are the Beatitudes — from the Latin beatus, meaning happy or blessed — and they are among the most challenging and most beautiful words in the Gospels. They are not a list of commandments. They do not say "do these things." They say "blessed are those who are this." Jesus is not giving instructions for earning happiness; he is describing what genuine human flourishing actually looks like when God\'s kingdom is the context.',
          'The poor in spirit are those who know they need God — who have released the illusion of self-sufficiency. The mourning are those who take the world\'s brokenness seriously enough to grieve it. The meek are not the weak but the strong who have learned to hold their strength lightly. The pure in heart are those whose interior life has been simplified so that they can actually see God.',
          'What Jesus is sketching is not a personality type. It is a posture of the soul — one that runs counter to most of what the world considers successful. The Beatitudes describe the person who is genuinely free: free from the compulsive need for wealth, status, revenge, and control.',
          'Reading them slowly is enough to begin with. One at a time, across a week. Ask honestly: which of these do I find hardest to believe? That is usually where the growth is.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-ten-commandments-matter',
        title: 'Why Do the Ten Commandments Still Matter?',
        minutes: 4,
        intro: 'The Ten Commandments are sometimes imagined as an ancient list of restrictions that belonged to a different age. That is exactly backwards.',
        body: [
          'The Ten Commandments are sometimes imagined as an ancient list of restrictions that belonged to a different age — useful for their time, but not quite relevant to a modern person trying to live a decent life. That is exactly backwards.',
          'The commandments were given at Sinai not as a burden but as a gift. After centuries of slavery in Egypt, the people of Israel needed to learn how to be a people — how to live together, how to treat one another, what it meant to belong to God. The Law was the structure within which that life could be built. It was liberation, not constraint.',
          'The first three commandments concern the relationship with God: no other gods, no using God\'s name as a tool, keep the Sabbath. These address the deep human tendency to make something other than God the center of life — wealth, achievement, reputation — and to let every waking hour be consumed by work and striving.',
          'The remaining seven concern the relationship with other people: honor parents, do not kill, do not commit adultery, do not steal, do not lie, do not covet. Together they describe a community in which every person\'s life, marriage, property, reputation, and dignity are protected.',
          'Jesus did not abolish the commandments. He deepened them. "You have heard it said, \'You shall not kill,\' but I say to you that anyone who nurses anger against a brother is already in danger." The commandments name the outer boundaries. Jesus was concerned with the interior — with the heart from which all behavior flows.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-is-virtue',
        title: 'What Is Virtue?',
        minutes: 4,
        intro: 'Every choice we make, made again and again, forms a habit. And habits, over time, form a character. This is the insight at the heart of the tradition\'s understanding of virtue.',
        body: [
          'Every choice we make, made again and again, forms a habit. And habits, over time, form a character. This is the insight at the heart of the tradition\'s understanding of virtue.',
          'A virtue is a stable disposition toward what is good — a quality of character, built through repeated action, that makes it easier and more natural to choose well. The virtuous person is not someone who struggles heroically against their worst impulses every single day. It is someone whose impulses have been gradually shaped, through practice, toward the good.',
          'The tradition identifies four cardinal virtues, so called because all other virtues hinge on them. Prudence is the ability to discern what is truly good in a particular situation — not rule-following, but wisdom. Justice is the consistent will to give to God and neighbor what they are owed. Fortitude is the courage to do what is right even when it is costly. Temperance is the ordered management of pleasure and appetite.',
          'To these, the tradition adds the theological virtues — faith, hope, and charity — which are gifts of God rather than habits we build, though they still require cultivation and exercise.',
          'The point of virtue is not to become rigidly correct. It is to become free. The person enslaved to their temper, their appetites, or their fears is not free — they are at the mercy of whatever impulse is strongest in the moment. Virtue is the gradual recovery of the freedom to act as who you actually are, rather than who your worst habits have made you. Growth in it is slow. That is not a problem. It is the nature of the project.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-is-forgiveness-difficult',
        title: 'Why Is Forgiveness So Difficult?',
        minutes: 4,
        intro: 'Jesus tied our own forgiveness to our willingness to forgive others. And yet it remains, for many people, one of the hardest things the faith asks.',
        body: [
          'Jesus said it plainly: forgive us our trespasses, as we forgive those who trespass against us. He tied our forgiveness to our willingness to forgive. And yet it remains, for many people, one of the hardest things the faith asks. It is worth being honest about why.',
          'Forgiveness is hard partly because it is misunderstood. It is not the same as saying that what happened was acceptable. It is not reconciliation — the restoration of a relationship — though forgiveness can make reconciliation possible. It is not forgetting. And it is not a single decision that settles the matter. For serious injuries, forgiveness is often a long process that the will commits to before the feelings follow.',
          'What forgiveness actually is: the release of resentment, the relinquishment of the claim to exact a return for what was taken. This is done not primarily for the sake of the person who wronged you — they may never acknowledge it, may not deserve it — but for your own sake, and out of obedience to a God who has forgiven far more than we are ever asked to forgive.',
          '"Forgive us as we forgive others" is a sobering phrase. The channel through which we receive mercy and the channel through which we give it appear to be the same channel. A heart closed to forgiving becomes, by that very closure, less able to receive.',
          'This is not comfortable. But the testimony of the tradition — from the martyrs who prayed for their killers to the ordinary people who found their way out of decades of bitterness — is consistent: forgiveness is possible, and on the other side of it is something very much like freedom.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-do-catholics-fast',
        title: 'Why Do Catholics Fast?',
        minutes: 3,
        intro: 'Fasting can seem strange in a culture that treats eating as one of the primary sources of comfort and pleasure. But fasting is as old as the faith itself — and the reasons for it are not about punishment.',
        body: [
          'Fasting can seem strange in a culture that treats eating as one of the primary sources of comfort and pleasure. But fasting is as old as the faith itself — and the reasons for it are not about punishment.',
          'Jesus fasted. He fasted for forty days in the desert before his public ministry began. When his disciples asked why they couldn\'t cast out a particular demon, he told them: "This kind comes out only through prayer and fasting." Fasting, in his teaching, was not unusual. It was assumed. He said "when you fast," not "if you fast."',
          'The tradition connects fasting to two related purposes. The first is interior freedom. Hunger is uncomfortable, and sitting with discomfort trains the will. When you can say no to food — something the body insists it needs — it becomes easier to say no to other impulses and appetites that the soul knows it shouldn\'t follow. Fasting is practice for a kind of freedom that extends far beyond the dinner table.',
          'The second purpose is solidarity and prayer. To fast is to experience, in a small way, what millions of people experience without choosing it. The tradition links fasting to almsgiving — giving to the poor what you have denied yourself — so that the fast becomes not only a spiritual discipline but an act of love.',
          'Fasting on Ash Wednesday and Good Friday is required; abstaining from meat on Fridays throughout the year is encouraged. These are not rules to be minimally complied with. They are invitations into a way of living that the tradition knows actually works.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'what-does-it-mean-to-follow-christ',
        title: 'What Does It Mean to Follow Christ?',
        minutes: 4,
        intro: 'Following Christ is one of those phrases that can sound clear until you try to say precisely what it means.',
        body: [
          'Following Christ is one of those phrases that can sound clear until you try to say precisely what it means.',
          'It does not mean perfect behavior — the disciples misunderstood Jesus constantly, denied him, abandoned him, and argued about who was greatest, and they were still the ones he chose. It does not mean a particular feeling — the saints recorded stretches of spiritual dryness that lasted years. It does not mean having every question settled.',
          'What it does mean begins with a direction. The disciples were literally called to follow Jesus — to move when he moved, to learn from him as they went. The invitation is relational before it is doctrinal. Come and see. Be with me. Learn from what I do and say and am.',
          'From that primary orientation, things follow. Following Christ changes how we see other people — because he stopped for everyone, touched the untouchable, ate with people the respectable avoided. It changes how we hold our possessions — because he said "where your treasure is, there your heart will be also." It changes how we handle conflict — because he said to forgive not seven times but seventy times seven.',
          'In practice, following Christ looks like ordinary life — work, relationships, decisions, failures, small kindnesses, boring faithfulness — lived with a different center. It is less about extraordinary acts and more about the quality of attention brought to ordinary ones. The invitation is not to become someone else. It is to become more fully who you already are, formed in the image of the one who made you.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'forming-your-conscience',
        title: 'Forming Your Conscience',
        minutes: 4,
        intro: 'Conscience is sometimes described as the voice of God within us. That is a beautiful image — but a poorly formed conscience can sound very convincing while pointing in completely the wrong direction.',
        body: [
          'Conscience is sometimes described as the voice of God within us. That is a beautiful image. But it can also mislead — because a poorly formed conscience can sound very convincing while pointing in completely the wrong direction.',
          'The tradition is clear that conscience is to be followed — and also that it must be formed. A conscience that has never been educated, tested, or corrected is not necessarily reliable, no matter how sincerely it speaks. Sincerity is not the same as accuracy.',
          'Forming a conscience is an active project. It involves learning the moral teaching of the Church — not as arbitrary rules, but as the accumulated wisdom of two thousand years of reflection on what it means to live as a human being made in God\'s image. It involves reading Scripture and letting it challenge your assumptions. It involves prayer, in which God\'s light can clarify what the noise of daily life obscures.',
          'It also involves humility. One of the signs of a well-formed conscience is the willingness to question yourself — to ask not just "what do I feel is right?" but "what actually is right, and am I willing to see the difference?" The Church offers her teaching as a guide precisely for those moments when honest self-examination reaches its limits.',
          'Every person is ultimately responsible for their own choices. But genuine freedom — the freedom to choose what is truly good — is the fruit of exactly this kind of careful, humble, prayerful formation. It is one of the most important things OCIA invites you to do.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'finding-your-place-in-the-church',
        title: 'Finding Your Place in the Church',
        minutes: 3,
        intro: 'One of the things that can be surprising about entering the Catholic faith is discovering that you are not meant to be a passive recipient. The Church is not a service you attend. It is a body you belong to.',
        body: [
          'One of the things that can be surprising about entering the Catholic faith is discovering that you are not meant to be a passive recipient. The Church is not a service you attend. It is a body you belong to — and every body needs all of its parts.',
          'Paul\'s letter to the Corinthians makes this explicit. "Now you are the body of Christ, and each of you is a part of it." He lists the gifts: wisdom, knowledge, faith, healing, prophecy, discernment. No single gift is sufficient on its own. No person carries all of them. The diversity of gifts is not a problem to be managed — it is the design.',
          'Finding your place begins with an honest question: what has God given me? This is not always obvious from the outside. Some people are drawn to serve in practical ways — preparing the altar, welcoming newcomers, helping at the food pantry. Some are called to teach, to lead, or to pray in ways that sustain others. Some find their gifts most needed outside the building entirely — in the workplace, the neighborhood, the family.',
          'The tradition speaks of the lay faithful as called to sanctify the world from within — not by retreating from ordinary life, but by bringing the faith into every place they inhabit. The doctor, the teacher, the parent, the artist — each of these is a vocation, a place where the kingdom of God can take root.',
          'Start by showing up and paying attention. The needs will become visible. And so, often, will the particular thing only you are positioned to give.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'growing-in-holiness',
        title: 'Growing in Holiness',
        minutes: 4,
        intro: 'Holiness is a word that can feel remote — associated with figures in stained glass, with centuries of asceticism, with a kind of perfection that seems to have nothing to do with ordinary life. That is a misunderstanding worth clearing up.',
        body: [
          'Holiness is a word that can feel remote — associated with figures in stained glass, with centuries of asceticism, with a kind of perfection that seems to have nothing to do with ordinary life. That is a misunderstanding worth clearing up.',
          'Holiness is not the absence of struggle or the completion of virtue. It is the faithful direction of a life — the sustained orientation of the will and the heart toward God, through everything that ordinary life brings. The saints are not people who stopped sinning and then became holy. They are people who kept turning back, kept beginning again, and never stopped believing that the turning was worth it.',
          'The Second Vatican Council used a phrase worth holding onto: the "universal call to holiness." Every baptized person — not just priests, not just consecrated religious, not just the exceptional — is called to grow in holiness in the particular circumstances of their actual life. Not someone else\'s life. Theirs.',
          'This means the path toward holiness for most people runs directly through the ordinary. Through the faithful keeping of promises. Through patience with difficult people and difficult circumstances. Through small acts of charity that no one sees. Through prayer maintained in the dry seasons as much as the full ones. Through showing up for what has been entrusted to you, even when it is unglamorous.',
          'The goal is not a spiritual identity you achieve. It is a relationship you deepen — day by day, failure by failure, grace by grace. The invitation is always the same: not to become someone extraordinary, but to become, more and more, who you already are in the eyes of God.',
        ],
        takeaways: [],
        reflection: '',
      },
    ],
  },
  {
    id: 'church-history',
    title: 'Church History',
    description: 'The Catholic Church has a history that spans more than two thousand years. These lessons highlight the moments that shaped the Church, helping you understand not only where we\'ve been, but how those moments continue to influence the faith today.',
    icon: '/church-history.png',
    iconPad: 12,
    lessonCount: 10,
    lessons: [
      {
        id: 'the-early-church',
        title: 'The Early Church',
        minutes: 4,
        intro: 'The story of the Church begins not with a building or a council or an institution, but with a morning. The morning of the Resurrection.',
        body: [
          'The story of the Church begins not with a building or a council or an institution, but with a morning. The morning of the Resurrection.',
          'On that first Easter Sunday, a small group of frightened disciples encountered something that changed them forever. The man they had followed, who had been executed and buried, was alive. Over the following forty days, he appeared to them, opened the Scriptures to them, and prepared them for what would come next. Then, ten days after his Ascension, the Holy Spirit descended at Pentecost — and the disciples, who had been hiding behind locked doors, went out and preached.',
          'Peter stood in Jerusalem and addressed a crowd that included Jews from every corner of the known world. Three thousand were baptized that day. The Church had begun.',
          'The first Christian communities were small, poor, and scattered. They gathered in homes — there were no church buildings for centuries. They shared meals, prayed together, cared for widows and orphans, and proclaimed a crucified and risen Lord in a world that found the message either scandalous or absurd. And they grew. Within a generation, communities of believers existed in Jerusalem, Antioch, Corinth, Ephesus, and Rome.',
          'What bound them was not an institution but a Person — and a shared conviction that death had not had the last word. That conviction has never changed.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'the-apostles',
        title: 'The Apostles',
        minutes: 4,
        intro: 'Jesus could have written books. He could have carved teachings into stone or entrusted his message to a committee of scholars. Instead, he called twelve ordinary men and spent three years walking with them.',
        body: [
          'Jesus could have written books. He could have carved teachings into stone or entrusted his message to a carefully vetted committee of scholars. Instead, he called twelve ordinary men and spent three years walking with them.',
          'The Twelve were not impressive on paper. They included fishermen, a tax collector, a political zealot, and at least one person who would betray him. They misunderstood Jesus constantly, argued about their own status, and scattered when he was arrested. Peter, who would become the head of the Church, denied knowing him three times in a single night.',
          'And yet these are the men Jesus sent. "As the Father has sent me, so I send you." He breathed the Holy Spirit on them and gave them authority to baptize, to forgive sins, to teach in his name.',
          'After Pentecost, they became different people. Peter, who had wept over his betrayal, stood up and preached to thousands. Thomas, according to tradition, took the Gospel to India. James was the first to die for the faith. Paul — not one of the original Twelve but counted among the apostles — carried the Gospel across the Roman Empire with extraordinary determination.',
          'All but one of the apostles, by tradition, died as martyrs. They gave everything for something they had seen with their own eyes. The Church looks to apostolic succession as the unbroken thread linking every bishop today to those first twelve — the living chain of witnesses stretching from the upper room to the present.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'the-church-fathers',
        title: 'The Church Fathers',
        minutes: 4,
        intro: 'After the apostles, the faith needed defenders. The first centuries of Christianity were full of people asking hard questions and proposing convincing-sounding errors — and the Church needed thinkers capable of answering both.',
        body: [
          'After the apostles, the faith needed defenders. The first centuries of Christianity were full of people asking hard questions and proposing convincing-sounding errors — and the Church needed thinkers capable of answering both.',
          'The Church Fathers are the theologians, bishops, and writers of the first several centuries who shaped how the faith was understood, explained, and preserved. They wrote against heresies. They preached to newly baptized Christians. They crafted the creeds. They commented on Scripture. Their writings are still read today, and their influence runs through everything in the Catholic tradition.',
          'Some names stand out. Ignatius of Antioch, martyred around 108 A.D., wrote letters on his way to execution that remain some of the earliest clear expressions of Catholic teaching on the Eucharist and the episcopate. Justin Martyr explained the faith to Roman emperors, arguing that Christianity was not a threat to civilization but its fulfillment. Origen laid the groundwork for Scripture scholarship. Augustine of Hippo — whose Confessions remains one of the most widely read books in history — synthesized Christian theology with classical philosophy in ways that shaped the entire Western intellectual tradition.',
          'The patristic period is not a museum piece. When the Church grapples with a question today, theologians still reach for the Fathers. Their reasoning is not obsolete — it is part of the living tradition.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'how-the-bible-came-together',
        title: 'How the Bible Came Together',
        minutes: 4,
        intro: 'One of the questions people ask most often when exploring the Catholic faith: how did we get the Bible? Who decided which books belonged in it — and how did they know?',
        body: [
          'One of the questions people ask most often when exploring the Catholic faith is this: how did we get the Bible? Who decided which books belonged in it — and how did they know?',
          'The answer involves centuries of discernment, community, and the guidance of the Holy Spirit working through the life of the Church.',
          'The early Christians inherited what would become the Old Testament from Judaism — the Hebrew Scriptures that Jesus himself quoted, the Psalms he prayed, the Law and Prophets he said he came not to abolish but to fulfill. As for the New Testament: in the first decades after the Resurrection, the faith was primarily passed on through preaching and communal life. Then letters began circulating. Paul wrote to the Corinthians, the Romans, the Galatians. The Gospels were composed over the following decades. By the end of the first century, a collection of texts was already forming.',
          'But it took time to determine precisely which books carried the authority of the apostles. Local churches used different collections. Some books we now consider canonical were debated; others now excluded were occasionally used. The Church discerned, through councils and the lived experience of Christian communities, which texts were genuinely apostolic and fit for worship and teaching.',
          'The canon of the New Testament was effectively settled by the end of the fourth century — not by an individual decision or a single council, but by the ongoing life of the Church reading, praying, debating, and gradually recognizing which texts carried the weight of authentic witness. The Bible did not produce the Church. The Church, guided by the Holy Spirit, recognized the Bible.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'the-ecumenical-councils',
        title: 'The Ecumenical Councils',
        minutes: 4,
        intro: 'When serious questions arose about what Christians were to believe, the bishops of the Church did something remarkable: they gathered.',
        body: [
          'When serious questions arose about what Christians were to believe, the bishops of the Church did something remarkable: they gathered. From every corner of the Christian world, they traveled — sometimes at great cost — to sit together, argue, pray, and reach a common mind. These gatherings are called ecumenical councils, and they are one of the most distinctive features of how the Catholic Church has navigated disagreement across two thousand years.',
          'The first great council was held at Nicaea in 325 A.D. The presenting question was the teaching of Arius, a priest who claimed that Jesus the Son was a created being — subordinate to the Father, not equal to him. The Council of Nicaea rejected this teaching decisively. Jesus is "God from God, Light from Light, true God from true God, begotten not made, of the same substance as the Father." We still say those words today in the Nicene Creed.',
          'Other councils followed. Ephesus in 431 affirmed that Mary is the Theotokos — the Mother of God — defending against a teaching that would have separated the human and divine natures of Christ. Chalcedon in 451 clarified that Christ is one Person with two natures, fully divine and fully human, without confusion or separation. The Council of Trent responded to the Reformation. Vatican I defined papal infallibility. Vatican II, which ended in 1965, addressed the Church\'s relationship with the modern world.',
          'Twenty-one ecumenical councils over two millennia. Each one was called because something mattered enough to settle — and each one left the Church with clearer language for a faith that had not changed, only been better understood.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'the-great-schism',
        title: 'The Great Schism',
        minutes: 4,
        intro: 'For the first thousand years of Christianity, the Church was one. Not without tension — there were disagreements from the beginning — but one. In 1054, that unity broke.',
        body: [
          'For the first thousand years of Christianity, the Church was one. Not without tension — there were disagreements about authority, theology, and practice from the beginning — but one. In 1054, that unity broke.',
          'The event is called the Great Schism, and it divided Christianity into what we now call the Roman Catholic Church in the West and the Eastern Orthodox Churches in the East. The immediate cause was a mutual excommunication — the cardinal sent by the Pope of Rome and the Patriarch of Constantinople each placed the other under excommunication. Those excommunications were lifted in 1964, by Pope Paul VI and Patriarch Athenagoras in a historic gesture of reconciliation. But the separation has not fully healed.',
          'The deeper causes were centuries in the making. There were theological disagreements — most famously over the filioque, a Latin phrase added to the Creed in the West stating that the Holy Spirit proceeds from the Father "and the Son." The Eastern churches rejected this addition as inserted without the authority of an ecumenical council. There were also disputes about jurisdiction and about the cultural drift between a Greek-speaking East and a Latin-speaking West.',
          'The Eastern Orthodox tradition is not a lesser version of Christianity. It carries its own profound theological tradition, liturgical beauty, and spiritual depth. The separation is a wound in the Body of Christ that both traditions have lamented — and, in recent decades, have actively sought to heal.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'the-reformation',
        title: 'The Reformation',
        minutes: 4,
        intro: 'In 1517, a German monk and theology professor named Martin Luther circulated a list of ninety-five theses challenging certain practices of the Church. His concerns were specific at first. Then the world changed.',
        body: [
          'In 1517, a German monk and theology professor named Martin Luther circulated a list of ninety-five theses challenging certain practices of the Church. His original concern was specific: the sale of indulgences, by which people could pay to reduce the time their loved ones spent in purgatory. From that beginning, his critique expanded to encompass questions about the authority of Scripture, the nature of salvation, and the role of the Pope.',
          'The Reformation he sparked divided Western Christianity in ways that have never been fully repaired. Within a generation, Lutheran, Reformed, Anglican, and Anabaptist communities had all broken with Rome, each emphasizing different aspects of what they saw as necessary reform.',
          'The Catholic response came in the Council of Trent, which met in stages from 1545 to 1563. Trent did not simply defend the status quo. It addressed genuine corruption in the Church — reforming the training of priests, combating abuses in Church offices, clarifying doctrines that had been loosely taught. It also carefully defined Catholic teaching on Scripture and Tradition, justification, the sacraments, and purgatory — often in explicit contrast to Protestant teaching.',
          'The Catholic Church acknowledges that there were real failures that contributed to the Reformation. The abuses Luther identified were real. The reform that followed was necessary. What was not necessary — and what has wounded Christianity ever since — was the division. Healing it remains one of the great hopes of modern ecumenism.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'vatican-ii',
        title: 'Vatican II',
        minutes: 4,
        intro: 'In 1959, just three months after becoming Pope, John XXIII announced that he was convening a council. His word for what he hoped it would accomplish was aggiornamento — an Italian word meaning "updating" or "bringing up to date."',
        body: [
          'In 1959, just three months after becoming Pope, John XXIII announced that he was convening a council. His word for what he hoped it would accomplish was aggiornamento — an Italian word meaning "updating" or "bringing up to date." He wanted to open the windows of the Church and let in some fresh air.',
          'The Second Vatican Council met in four sessions between 1962 and 1965, gathering more than two thousand bishops from around the world. It produced sixteen documents — on the Church, on divine revelation, on the liturgy, on the Church\'s relationship with the modern world, on religious freedom, on ecumenism. Together they represent one of the most significant moments in the history of the Catholic Church.',
          'Some things changed visibly. The Mass, which had been celebrated in Latin since antiquity, was now permitted in the language of the people. The priest now faced the congregation rather than the altar. The role of the laity was explicitly affirmed and honored. The Church\'s relationship with other Christian traditions and with non-Christian religions was articulated with a new tone of respect and dialogue.',
          'What did not change was the faith itself. Vatican II was not a break from the tradition. Its documents are dense with Scripture and the writings of the Church Fathers. The council reaffirmed the authority of Scripture and Tradition, the real presence of Christ in the Eucharist, the structure of episcopal authority.',
          'What changed was how the Church spoke about itself and engaged with the world. That shift is still unfolding — and its full significance is still being understood.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'the-church-around-the-world',
        title: 'The Church Around the World',
        minutes: 4,
        intro: 'At Pentecost, the disciples spoke in languages they had never learned, and people from every nation heard them in their own tongue. That moment was the first sign of what the Church would become.',
        body: [
          'At Pentecost, the disciples spoke in languages they had never learned, and people from every nation heard them in their own tongue. That moment — bewildering, improbable, briefly mistaken for drunkenness — was the first sign of what the Church would become.',
          'The Gospel spread from Jerusalem outward with remarkable speed. Within the first decades, communities of believers existed in Syria, Asia Minor, Greece, Egypt, and Rome. Paul\'s missionary journeys stretched the faith across the Mediterranean world. Tradition holds that Thomas took it to India, Mark to Alexandria, and Peter and Paul to Rome.',
          'By the time the Roman Emperor Constantine converted in 312 A.D., Christianity was already present in every corner of the empire and beyond its borders. In subsequent centuries, missionaries carried the Gospel to Ireland, England, Central Europe, the Americas, Africa, and Asia. Each encounter raised new questions: how does the Gospel take root in a new culture? What is essential, and what can change? The faith is one, but it lives in human particularity.',
          'Today, the center of global Christianity is no longer Europe. The Church is growing with extraordinary energy in sub-Saharan Africa, Latin America, and parts of Asia. The Pentecost vision is not nostalgia. It is the present reality of the Church.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'a-living-church',
        title: 'A Living Church',
        minutes: 3,
        intro: 'History can feel like a closed book — events arranged in sequence, safely in the past. But the history of the Church is not like that. It is still being written.',
        body: [
          'History can feel like a closed book — events arranged in sequence, safely in the past, to be studied and summarized. But the history of the Church is not like that. It is still being written.',
          'Every council, schism, reformation, and missionary journey happened because real people, in real circumstances, had to respond to what God was doing in their time. They did not always respond well. The Church\'s history includes genuine heroism and genuine failure — saints and sinners in every century, often in the same person.',
          'What has persisted is not human achievement. It is the promise Jesus made to his disciples the night before he died: "I am with you always, to the end of the age." The Church that survived the Roman persecutions, the fall of the Western Empire, the Reformation, and two world wars is not merely a resilient institution. It is, by its own account, sustained by the presence of the one who promised never to leave.',
          'You are entering that story at a particular moment, in a particular place. The generation of Catholics being formed in OCIA today will face questions and challenges that previous generations could not have anticipated. They will need the same things every generation before them has needed: faith that is genuinely understood, prayer that is honestly practiced, and a community that holds them when they cannot hold themselves.',
          'The story continues. And the invitation is not simply to watch it unfold — it is to participate.',
        ],
        takeaways: [],
        reflection: '',
      },
    ],
  },
  {
    id: 'catholic-life',
    title: 'Catholic Life',
    description: 'From holy water to the liturgical seasons, the Catholic faith is filled with visible signs that point us toward God. These lessons explain the traditions, symbols, and practices you\'ll encounter throughout the life of the Church.',
    icon: '/catholic-life.png',
    iconPad: 8,
    lessonCount: 12,
    lessons: [
      {
        id: 'the-liturgical-year',
        title: 'The Liturgical Year',
        minutes: 4,
        intro: 'Most people mark time by the calendar on the wall — January through December, one year ticking into the next. The Church marks time differently.',
        body: [
          'Most people mark time by the calendar on the wall — January through December, one year ticking into the next. The Church marks time differently.',
          'The liturgical year is the Church\'s own calendar — a cycle of seasons and feasts that moves from Advent through Christmas, Ordinary Time, Lent, the Easter Triduum, Easter Season, and back to Ordinary Time again. Each year, the whole pattern repeats. Each year, the Church walks the entire life of Christ again.',
          'This is not merely commemoration. The liturgical year is designed to form people — to shape the imagination, deepen the memory, and align the rhythms of daily life with the great movements of salvation history. When you fast in Lent and feast at Easter, when you light a candle on an Advent wreath and sing Alleluia at the Vigil, you are not just observing a religious custom. You are being formed by a pattern that has shaped Christians for two thousand years.',
          'The year begins not on January 1 but on the First Sunday of Advent — typically the last Sunday of November or the first of December. It moves through seasons of waiting and preparation, celebration and feasting, long stretches of ordinary growth, and the high drama of Holy Week and Easter.',
          'Each season has its own color, its own prayers, its own character. Together they form a single story told in an annual cycle. Live inside that cycle long enough, and it begins to live inside you.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'advent',
        title: 'Advent',
        minutes: 3,
        intro: 'The first thing Advent asks of us is unusual: wait.',
        body: [
          'The first thing Advent asks of us is unusual: wait.',
          'Not because there is nothing yet — Christ has already come. But because there is something still to come, and the waiting is the point. Advent is a season of hope, which is different from optimism. Optimism is a feeling that things will probably turn out fine. Hope is a conviction about what God has promised — and it lives most authentically in people who know what it is to wait in the dark.',
          'Advent begins four Sundays before Christmas. The liturgical color is purple — worn also in Lent — the color of penitence and royal expectation. The Advent wreath, with its four candles lit progressively across the four weeks, is one of the most recognizable signs of the season. The readings draw from the prophets who longed for the Messiah, from John the Baptist who announced his arrival, and from texts that speak of his coming again in glory.',
          'Because Advent leads into the commercial Christmas season, it can easily get lost. Decorations go up in November, Christmas music starts before Thanksgiving, and by Christmas Day many people feel the season has already come and gone.',
          'The liturgical Advent invites a different movement — a deliberate slowing, a willingness to sit in the longing rather than rushing past it. Christmas is not the beginning of the season. It is the arrival at the end of a journey that is worth taking.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'lent',
        title: 'Lent',
        minutes: 4,
        intro: 'Forty days. That number is not an accident.',
        body: [
          'Forty days. That number is not an accident.',
          'Moses spent forty years leading Israel through the desert. Elijah walked forty days and nights to the mountain of God. Jesus fasted for forty days in the desert before his public ministry began. Each time, the forty days was a period of testing, preparation, and encounter with God. Lent carries all of that history.',
          'Lent begins on Ash Wednesday, when the priest traces the sign of the cross on the forehead with ashes and says: "Remember that you are dust, and to dust you shall return." It is one of the most stark gestures in the liturgical year. For a moment, everything else falls away and the essential fact is named: we are mortal, we are limited, we are not God.',
          'But that naming is not despair. It is clearing. Lent is not primarily about guilt — it is about preparation. Cleaning out what accumulates so that Easter can be received with an open heart. The traditional practices are prayer, fasting, and almsgiving: prayer to draw closer to God, fasting to recover interior freedom, almsgiving to turn toward the neighbor.',
          'The liturgical color shifts to purple. The Gloria is omitted at Mass. The tone becomes quieter and more inward. These are not arbitrary restrictions. They are a change of atmosphere designed to do something to the soul — to create space, over forty days, for something to grow. For those in OCIA, Lent is also a time of intensified preparation. Everything in it is moving toward Easter.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'holy-week',
        title: 'Holy Week',
        minutes: 4,
        intro: 'There is no week in the year quite like this one. The entire liturgical year has been building toward it, and once you have lived it, the rest of the year makes more sense.',
        body: [
          'There is no week in the year quite like this one. The entire liturgical year has been building toward it, and once you have lived it, the rest of the year makes more sense.',
          'Holy Week begins with Palm Sunday, when Jesus enters Jerusalem to the cheers of a crowd that will, by Friday, be calling for his death. The palms blessed at the beginning of Mass are the same palms that will be burned to make the ashes for Ash Wednesday next year. The cycle is complete from the start.',
          'Holy Thursday evening begins the Easter Triduum — three days that are technically a single liturgy spread across Thursday night, Friday, and Saturday night into Sunday. At the Mass of the Lord\'s Supper, the Church recalls the Last Supper and the washing of feet. At the end of Mass, the Blessed Sacrament is processed to an altar of repose and the faithful are invited to keep watch through the night.',
          'Good Friday is the only day of the year when Mass is not celebrated. The Liturgy of the Lord\'s Passion takes place instead — readings, intercessions, and the veneration of the cross, when people approach and bow before or kiss a large crucifix. The experience is stripped of everything decorative and profoundly serious.',
          'Holy Saturday is a day of silence. The Church waits. The tabernacle is empty. Then, after sundown, the Easter Vigil begins — and darkness gives way to light.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'easter',
        title: 'Easter',
        minutes: 4,
        intro: 'Every Sunday is a little Easter. Every year, one night is the Easter.',
        body: [
          'Every Sunday is a little Easter. Every year, one night is the Easter.',
          'The Easter Vigil begins in complete darkness. A fire is kindled outside the church, and from it, the Paschal candle is lit — a large candle representing Christ, the light of the world. The deacon or priest carries the candle into the darkened church, chanting "The Light of Christ" three times, and the darkness gradually gives way as the congregation lights their own candles from it.',
          'Then comes the Exsultet — one of the most ancient and beautiful hymns in the history of the Church, a proclamation of joy that moves through the whole story of salvation to arrive at its heart: "O happy fault, O necessary sin of Adam, which gained for us so great a Redeemer!" What had seemed like catastrophe turns out to have been the occasion for something beyond imagining.',
          'The Vigil continues with a series of readings that retell the story of salvation from Creation to the Resurrection. Then the Gloria erupts, bells ring, and the church is flooded with light. The Alleluia, silenced since Ash Wednesday, returns. Candidates for the sacraments are baptized, confirmed, and receive the Eucharist for the first time.',
          'The Easter Season lasts fifty days — from Easter Sunday to Pentecost. One day is not enough. The Church dwells in resurrection joy for seven weeks. Easter is not the end of the story. It is the moment that reveals what the story was always about.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-do-catholics-make-the-sign-of-the-cross',
        title: 'Why Do Catholics Make the Sign of the Cross?',
        minutes: 3,
        intro: 'It is often the first thing a Catholic does when entering a church and one of the last at the end of Mass. It accompanies blessings, prayers, and the reception of the sacraments. It is one of the oldest gestures in Christian practice.',
        body: [
          'It is often the first thing a Catholic does when entering a church and one of the last at the end of Mass. It accompanies blessings, prayers, and the reception of the sacraments. It is one of the oldest gestures in Christian practice.',
          'The Sign of the Cross is made by touching the forehead, then the center of the chest, then the left shoulder, then the right, while saying: "In the name of the Father, and of the Son, and of the Holy Spirit." In four movements, the whole of Christian faith is expressed: the Trinity, the cross, and the claim that these are the name in whose power the Christian lives.',
          'The gesture is ancient. Tertullian, writing in the early third century, describes Christians making the sign of the cross "at every forward step and movement, at every going in and out, when we put on our clothes and shoes, when we bathe, when we sit at table, when we light our lamps." It was not only a formal liturgical gesture. It was a constant, habitual act of reclaiming every moment in the name of the one who redeemed it.',
          'When made with holy water — as when entering a church — it also recalls Baptism, in which the Sign of the Cross was traced on the forehead of the newly baptized as a sign that they belong to Christ.',
          'What the gesture does, done with intention, is reorient. It is a small prayer spoken with the body: I am not my own. I belong to the One who made me and saved me.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'holy-water',
        title: 'Holy Water',
        minutes: 3,
        intro: 'Near the entrance of every Catholic church, there is a small basin or font containing holy water. When Catholics enter, they dip their fingers and make the Sign of the Cross. It is one of the most common gestures in Catholic life — and one of the most layered with meaning.',
        body: [
          'Near the entrance of every Catholic church, there is a small basin or font containing holy water. When Catholics enter, they dip their fingers and make the Sign of the Cross. It is one of the most common gestures in Catholic life — and one of the most layered with meaning.',
          'Water has been a sign of God\'s presence and purifying power since the beginning of Scripture. The Spirit hovered over the waters of creation. The Israelites passed through the Red Sea. Jesus was baptized in the Jordan. In each case, water marks a threshold — a crossing from one kind of life to another.',
          'Holy water is water that has been blessed by a priest, set apart for sacred use. When you bless yourself with holy water upon entering a church, you are recalling your Baptism — the moment when the same water was poured over you and you were made a child of God. The gesture is a renewal of that identity.',
          'This is why holy water fonts are placed at the entrances of churches rather than at the altar. Crossing the threshold, you remember who you are. You enter not as a stranger but as someone who has already been claimed.',
          'During the Easter Vigil, water is blessed in a particularly solemn rite and used for the baptisms of those entering the Church. The font and the threshold are connected to the same story: you have been washed. You are clean. Come in.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'incense-candles-and-bells',
        title: 'Incense, Candles, and Bells',
        minutes: 3,
        intro: 'The Catholic faith has never been a purely intellectual religion. It reaches for the senses — smell, sight, sound, movement — as ways of drawing the whole person into the presence of God.',
        body: [
          'The Catholic faith has never been a purely intellectual religion. It reaches for the senses — smell, sight, sound, movement — as ways of drawing the whole person into the presence of God.',
          'Incense is one of the oldest signs in the history of religion. In the Old Testament, incense was burned in the Temple as an offering to God, and the Psalmist prays: "Let my prayer rise before you as incense, the lifting up of my hands as an evening offering." In the Mass, incense is used to honor the Gospel, the altar, the priest, and the faithful — because each carries the presence of Christ in a specific way.',
          'Candles serve a similar function. Light has been a symbol of the divine across every culture in human history. In the liturgy, candles are lit on the altar, near the tabernacle, and at the ambo when the Gospel is proclaimed. The Paschal candle that burns throughout the Easter Season is the most visible single sign of the Risen Christ in the church building.',
          'Bells have traditionally been rung at the Consecration of the Mass — the moment the bread and wine become the body and blood of Christ. The sound signals to the congregation: something is happening here. Pay attention. In an earlier era, when the altar was distant and the words inaudible, the bells were the signal for the faithful to raise their eyes. Even now, the sound carries that same invitation.',
          'None of this is decoration. Each element of the Catholic liturgy was chosen because it does something — something that words alone cannot accomplish.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'sacred-art-and-statues',
        title: 'Sacred Art and Statues',
        minutes: 4,
        intro: 'Walk into almost any Catholic church and you will find images — Christ on the cross, Mary with her hands extended, the saints in glass and stone and paint. It is worth understanding why the images are there.',
        body: [
          'Walk into almost any Catholic church and you will find images — Christ on the cross, Mary with her hands extended, the saints in glass and stone and paint. For people accustomed to simpler worship spaces, this can feel unfamiliar or even unsettling. It is worth understanding why the images are there.',
          'The use of images in worship has been debated throughout Christian history. In the eighth century, a controversy over iconoclasm — the destruction of sacred images — divided the Church for decades. The Second Council of Nicaea, in 787 A.D., settled the matter: images are to be honored, not worshipped. The honor given to an image passes to its prototype. Venerating an image of Christ is not worshipping the image — it is directing the heart toward the One the image represents.',
          'The theological basis goes back to the Incarnation. God became visible. He took on a human face. Before the Incarnation, depicting God in images was forbidden — how could you image the formless? After the Incarnation, depicting the human face of Christ is not only permitted but fitting. He showed himself. We respond by showing him back.',
          'Sacred art has served the Church for centuries not only as decoration but as catechesis. In an era when most people could not read, the images in a church were the Bible in visual form. The cycle of scenes carved into a medieval cathedral portal or painted across a church ceiling told the whole story of salvation to people who might never read a word of it.',
          'The images remain for the same reason. They are not obstacles to prayer. They are aids to it.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'relics-and-sacramentals',
        title: 'Relics and Sacramentals',
        minutes: 4,
        intro: 'Two words you may encounter early in Catholic life are sacramentals and relics. They sound antiquated. But both point to something the Catholic faith takes seriously: the physical world matters, and God uses it.',
        body: [
          'Two words you may encounter early in Catholic life are sacramentals and relics. They sound antiquated. But both point to something the Catholic faith takes seriously: the physical world matters, and God uses it.',
          'A sacramental is a sacred sign — an object, gesture, or prayer — set apart by the Church to prepare us to receive grace and dispose us to cooperate with it. Sacramentals are not sacraments; they do not confer grace the way Baptism or the Eucharist does. But they are not empty gestures either. They prepare the soul, focus attention, and invoke God\'s blessing in the ordinary moments of daily life.',
          'Common sacramentals include holy water, crucifixes, rosaries, medals, scapulars, blessed palms, and the Sign of the Cross itself. Each is a physical sign that points beyond itself. A crucifix on the wall of a bedroom is not decoration — it is a reminder of what love looks like when pressed to its limit. A rosary in a pocket is not jewelry — it is a thread of prayer kept close at hand.',
          'Relics are the physical remains of saints — a fragment of bone, a piece of clothing, an object they used — kept and venerated by the Church. This practice is ancient. The early Christians gathered at the tombs of martyrs to pray, convinced that the holy person remained connected to the community even in death.',
          'The veneration of relics is not superstition. It is a physical expression of the communion of saints — the conviction that death does not end relationship, that holiness leaves a trace, and that the bodies of the saints, which were temples of the Holy Spirit, retain a dignity that deserves honor.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'why-do-catholics-kneel',
        title: 'Why Do Catholics Kneel?',
        minutes: 3,
        intro: 'Anyone who has attended Mass for the first time has probably wondered about the postures — when to stand, when to sit, when to kneel, and why. The movements are not random. They are a language.',
        body: [
          'Anyone who has attended Mass for the first time has probably wondered about the postures — when to stand, when to sit, when to kneel, and why. The movements are not random. They are a language, and like any language, they take time to learn.',
          'Standing is the posture of the resurrection. The early Church prayed standing, especially on Sundays and throughout Easter, because standing is the posture of the risen. To stand is to say: we are an Easter people. Death has not had the last word.',
          'Kneeling is the posture of adoration and penitence. The Church kneels at the Consecration of the Mass — the moment the bread and wine become the body and blood of Christ — because kneeling is what the body does when it recognizes it is in the presence of something greater than itself. To kneel is to make the truth of a moment visible with the whole body.',
          'Sitting is the posture of the student. During the readings and the homily, the congregation sits to listen and receive. Something is being given; the posture of the body says: I am here to receive it.',
          'Bowing, genuflecting, striking the breast, making the Sign of the Cross — each gesture has a meaning. The Catholic tradition has always believed that prayer involves the whole person, not just the mind. The body prays too. Over time, these postures stop being something you think about and start being something you simply do — a way of orienting the whole self toward God.',
        ],
        takeaways: [],
        reflection: '',
      },
      {
        id: 'living-the-liturgical-life',
        title: 'Living the Liturgical Life',
        minutes: 3,
        intro: 'The liturgical year does not live only in the church building. It is designed to come home with you.',
        body: [
          'The liturgical year does not live only in the church building. It is designed to come home with you.',
          'The great seasons of the Church have always had domestic expressions — ways the rhythms of the liturgy could be carried into the ordinary life of a household. An Advent wreath on a kitchen table. Fasting on Fridays. Palm branches tucked behind a crucifix. Candles lit on the feast of the Presentation. These are not merely customs. They are the liturgical year taking root in daily life.',
          'The principle behind all of it is simple: time can be sacred. Not every moment is the same. Some days are feasts, marked by joy and abundance. Some are fast days, marked by quiet and restraint. The rhythm of feasting and fasting, celebration and preparation, is not an interruption of ordinary life. It is a way of living that forms the soul over years and decades.',
          'As you move through your first liturgical year as a Catholic — or your first year exploring the faith — pay attention to the seasons as they come. Notice what Advent does to your sense of time. Notice what Lent opens in you. Notice what Easter feels like after forty days of preparation.',
          'The liturgy works slowly. It is not a one-time experience. It is a way of life. The Church\'s wisdom is old. And it still works.',
        ],
        takeaways: [],
        reflection: '',
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
  audioSrc?: string
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
        name: 'Sicut Cervus',
        note: "Palestrina's setting of Psalm 42 — timeless Renaissance polyphony for prayer and reflection.",
        image: '/sicut-cervus-cover.png',
        category: 'Sacred Choral',
        creator: 'Giovanni Pierluigi da Palestrina',
        description:
          '"As the deer longs for streams of water, so my soul longs for you, O God." — Psalm 42. Palestrina\'s four-voice setting of this psalm is among the most beloved pieces of sacred choral music ever written, a staple of Catholic liturgy for over four centuries.',
        details: [
          'Part 1 of a two-part motet',
          'Text from Psalm 42',
          'Renaissance polyphony, c. 1604',
        ],
        audioSrc: '/audio/sicut-cervus-part-1.mp3',
      },
    ],
  },
]
