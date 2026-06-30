'use client'

import { motion } from 'framer-motion'

interface TimelineItem {
  id: number
  date: string
  title: string
  description: string
  emoji: string
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: 'Nov 30, 2025',
    title: 'How We Met',
    description: 'Ile siku tulimeet love  🥹 I wasn’t interested at first but vile tulikaanisha with u at bazaar plaza talk alittle bit .. i was impressed and started seeing you as a different person u were kind , honest, funny still vibe daamn😂 i still remember vibing the ariel thing 😂😂💔 and now i was interested the walk to uhuru part and back u just proved me that u were that gem i was looking for years🥹🥲 ',
    emoji: '✨'
  },
  {
    id: 2,
    date: 'Dec 01, 2025',
    title: 'First Conversation',
    description: 'It was beautiful and amazing 🤩 i remember straggling how to dm you on instagram I swear it wasn’t easy😩😂 but kwani mi hudoo nikajipea nguvu and sent my first hi☺️ the flow , the vibe 😍 u were giving me made me even to really want to know you better my love 😍',
    emoji: '💬'
  },
  {
    id: 3,
    date: 'Dec 03, 2025',
    title: 'We Became Official',
    description: 'Best moment of my life 🥹  it was fast but worth it 😍 waited for it for so long (3days) but looked centuries to me🤭thats how excited and eager  to be with you baby🥹',
    emoji: '💍'
  },
  {
    id: 4,
    date: 'MM/DATE/YEAR',
    title: 'First Date',
    description: 'Coming soon my love 🥰',
    emoji: '🌅'
  },
  {
    id: 5,
    date: 'Throughout Our Journey',
    title: 'Special Memories',
    description: 'The little laughs 🤭 late talks 🌝 the ludo and snake game😂 even though i am waaaaay stronger than you 🤭 …every second with you is a special moment 🤞🏽😍🥰 and promise to create more memories together love 😍',
    emoji: '📸'
  },
  {
    id: 6,
    date: 'Now & Always',
    title: 'Challenges We Overcame',
    description: 'We have faced a lot in this journey of ours 🥹 arguments,fight and alot more even came a point we ended things but fate brought us back together baby 🤭 and i know or hope we are ready not to fall again but to stand and face our challenges together 🤞🏽❤️ love is  stronger if both parties value and trust each other 🫂 and i promise you jo matter what happens or occur that make you feel like i dont trust you just know that i trust you with all my heart 💜 and if i had another life in another multiverse i would still choose you my khabajia🤭❤️❤️',
    emoji: '💪'
  }
]

export default function Timeline() {
  return (
    <section className="section-gradient py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-96 opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
        <div className="absolute top-1/3 right-0 w-64 h-96 opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3">✦ our beautiful journey ✦</p>
          <h2 className="font-serif-elegant text-4xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Love Story
          </h2>
          <p className="text-purple-300/70 text-lg">Written in the stars, lived in our hearts</p>
        </motion.div>

        {/* Timeline line */}
        <div className="timeline-line hidden md:block" />

        <div className="space-y-14">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-center md:justify-${index % 2 === 0 ? 'start' : 'end'}`}
            >
              {/* Glowing dot */}
              <motion.div
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 + 0.3 }}
                className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center text-2xl z-10 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #9b6dbd, #f4845f)',
                  boxShadow: '0 0 20px rgba(200,168,233,0.6), 0 0 40px rgba(200,168,233,0.2)'
                }}
              >
                {item.emoji}
              </motion.div>

              {/* Card */}
              <div className={`ml-20 md:ml-0 md:w-[44%] ${index % 2 === 0 ? 'md:mr-auto md:pr-14' : 'md:ml-auto md:pl-14'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card-light rounded-3xl p-6 relative overflow-hidden"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: 'linear-gradient(90deg, #9b6dbd, #f4845f)' }} />

                  <span className="text-orange-500 font-semibold text-xs tracking-wider uppercase">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-bold text-violet-800 mt-2 mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
