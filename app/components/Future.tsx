'use client'

import { motion } from 'framer-motion'

const promises = [
  { id: 1, title: 'Travel the World',       description: 'Visit at least 10 countries together — beaches, mountains, city lights, and everything in between.',  emoji: '✈️' },
  { id: 2, title: 'Grow Old Together',      description: "Be that cute old couple holding hands at the park, still laughing at each other's jokes.",              emoji: '🤍' },
  { id: 3, title: 'Build Our Dream Home',   description: 'Create a cozy space filled with love, photos of our adventures, and memories waiting to be made.',      emoji: '🏠' },
  { id: 4, title: 'Learn Together',         description: 'Pick up new hobbies, take dance lessons, learn a new language — never stop growing.',                   emoji: '📚' },
  { id: 5, title: 'Support Each Other',     description: "Be each other's biggest cheerleader through every dream, challenge, and victory.",                       emoji: '🤝' },
  { id: 6, title: 'Create Traditions',      description: 'Our weekly movie nights, annual trips, holiday traditions — building our unique story together.',        emoji: '🎄' },
]

export default function Future() {
  return (
    <section className="py-20 md:py-28 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-5 relative z-10">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">what awaits us</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Future Together
          </h2>
          <p className="text-purple-400/50 text-sm mt-2">Promises I&apos;m making to you, always</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {promises.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="border-card p-5 md:p-6 group"
            >
              <div className="text-3xl mb-4 float-anim inline-block"
                style={{ animationDelay: `${i * 0.4}s` }}>
                {p.emoji}
              </div>
              <h3 className="text-purple-100 font-bold text-base mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {p.title}
              </h3>
              <p className="text-purple-400/60 text-sm leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-10 md:mt-14 text-center border-card p-6 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-16 right-16 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,233,0.4), rgba(244,132,95,0.4), transparent)' }} />
          <p className="text-purple-200/80 text-base md:text-xl italic mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            &quot;Whatever our souls are made of, yours and mine are the same.&quot;
          </p>
          <p className="text-purple-500/50 text-xs tracking-wider">— Emily Brontë</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 text-purple-400/50 italic"
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.4rem' }}
        >
          I love you, gummy bear ❤️
        </motion.p>
      </div>
    </section>
  )
}
