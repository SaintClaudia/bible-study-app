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
    description: 'Understand the seven sacraments and what they mean.',
    icon: '/sacraments.png',
    iconPad: 6,
    lessonCount: 10,
    lessons: [],
  },
  {
    id: 'christian-living',
    title: 'Christian Living',
    description: 'How the faith shapes everyday life and relationships.',
    icon: '/christian-living.png',
    iconPad: 8,
    lessonCount: 12,
    lessons: [],
  },
  {
    id: 'church-history',
    title: 'Church History',
    description: 'Two thousand years of the Catholic Church, briefly told.',
    icon: '/church-history.png',
    iconPad: 12,
    lessonCount: 8,
    lessons: [],
  },
  {
    id: 'catholic-life',
    title: 'Catholic Life',
    description: 'Practices, seasons, and rhythms of the Catholic year.',
    icon: '/catholic-life.png',
    iconPad: 8,
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
