'use client'

import { motion } from 'framer-motion'

const timelineData = [
  {
    id: 1,
    date: 'Nov 30, 2025',
    title: 'How We Met',
    description: "Ile siku tulimeet love 🥹 I wasn't interested at first but vile tulikaanisha with u at bazaar plaza talk alittle bit.. i was impressed and started seeing you as a different person. You were kind, honest, funny — still vibe daamn 😂 I still remember vibing the ariel thing 😂💔 and now i was interested. The walk to uhuru part and back — you just proved me that you were that gem i was looking for years 🥹",
    label: 'The beginning'
  },
  {
    id: 2,
    date: 'Dec 01, 2025',
    title: 'First Conversation',
    description: "It was beautiful and amazing 🤩 I remember struggling how to dm you on instagram — I swear it wasn't easy 😩😂 but kwani mi hudoo nikajipea nguvu and sent my first hi ☺️ The flow, the vibe you were giving me made me even more want to know you better my love 😍",
    label: 'First words'
  },
  {
    id: 3,
    date: 'Dec 03, 2025',
    title: 'We Became Official',
    description: "Best moment of my life 🥹 It was fast but worth it 😍 Waited for it for so long (3 days) but it looked like centuries to me 🤭 That's how excited and eager I was to be with you baby 🥹",
    label: 'Official'
  },
  {
    id: 4,
    date: 'Coming soon',
    title: 'First Date',
    description: "Coming soon my love 🥰 I'm already planning something special for us...",
    label: 'Next chapter'
  },
  {
    id: 5,
    date: 'Throughout our journey',
    title: 'Special Memories',
    description: "The little laughs 🤭 late talks 🌝 the ludo and snake game 😂 even though i am waaaaay stronger than you 🤭 — every second with you is a special moment 🤞🏽😍 and I promise to create more memories together love 😍",
    label: 'Memories'
  },
  {
    id: 6,
    date: 'Now & always',
    title: 'Challenges We Overcame',
    description: "We have faced a lot in this journey 🥹 arguments, fights and a lot more — even came a point we ended things but fate brought us back together baby 🤭 And I know we are ready not to fall again but to stand and face our challenges together 🤞🏽❤️ I promise you no matter what happens, I trust you with all my heart 💜 And if I had another life in another multiverse I would still choose you my khabajia 🤭❤️",
    label: 'Stronger together'
  },
]

export default function Timeline() {
  return (
    <section className="section-gradient py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-1/3 left-0 w-48 h-96 opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
        <div className="absolute bottom-1/3 right-0 w-48 h-96 opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-5 relative z-10">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold gradient-text mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Love Story
          </h2>
          <p className="text-purple-400/50 text-sm md:text-base">Written in the stars, lived in our hearts</p>
        </motion.div>

        {/* Timeline line */}
        <div className="timeline-line hidden md:block" />

        <div className="space-y-10 md:space-y-14">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-start md:justify-${index % 2 === 0 ? 'start' : 'end'}`}
            >
              {/* Dot */}
              <motion.div
                whileInView={{ scale: [0, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 + 0.2 }}
                className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 md:w-11 md:h-11 rounded-full z-10 flex-shrink-0 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #9b6dbd, #f4845f)',
                  boxShadow: '0 0 12px rgba(200,168,233,0.4)',
                  top: '6px'
                }}
              >
                <div className="w-2 h-2 rounded-full bg-white/80" />
              </motion.div>

              {/* Card */}
              <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                <div className="glass-card-light rounded-2xl p-4 md:p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                    style={{ background: 'linear-gradient(90deg, #9b6dbd, #f4845f)' }} />
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-semibold"
                      style={{ color: '#f4845f' }}>{item.date}</span>
                    <span className="text-[10px] text-purple-400/50 tracking-wider">· {item.label}</span>
                  </div>
                  <h3 className="text-sm md:text-lg font-bold text-violet-900 mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
