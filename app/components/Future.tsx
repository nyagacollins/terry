'use client'

import { motion } from 'framer-motion'

interface Promise {
  id: number
  title: string
  description: string
  emoji: string
  accent: string
}

const promises: Promise[] = [
  {
    id: 1,
    title: 'Travel the World',
    description: 'Visit at least 10 countries together — from beaches to mountains, city lights to rural countryside.',
    emoji: '✈️',
    accent: 'from-violet-600/30 to-purple-800/30'
  },
  {
    id: 2,
    title: 'Grow Old Together',
    description: "Be that cute old couple holding hands at the park, still laughing at each other's jokes.",
    emoji: '👵👴',
    accent: 'from-orange-600/30 to-red-800/30'
  },
  {
    id: 3,
    title: 'Build Our Dream Home',
    description: 'Create a cozy space filled with love, photos of our adventures, and memories waiting to be made.',
    emoji: '🏠',
    accent: 'from-purple-600/30 to-violet-800/30'
  },
  {
    id: 4,
    title: 'Learn Together',
    description: 'Pick up new hobbies, take dance lessons, learn a new language — never stop growing.',
    emoji: '📚',
    accent: 'from-red-600/30 to-orange-800/30'
  },
  {
    id: 5,
    title: 'Support Each Other',
    description: "Be each other's biggest cheerleader through every dream, challenge, and victory.",
    emoji: '💪',
    accent: 'from-violet-600/30 to-orange-800/30'
  },
  {
    id: 6,
    title: 'Create Traditions',
    description: 'Our weekly movie nights, annual trips, holiday traditions — building our unique story.',
    emoji: '🎄',
    accent: 'from-purple-600/30 to-red-800/30'
  }
]

export default function Future() {
  return (
    <section className="py-24 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3">✦ what awaits us ✦</p>
          <h2 className="text-3xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Future Together
          </h2>
          <p className="text-purple-300/70 text-sm md:text-lg">Promises I&apos;m making to you, always</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {promises.map((promise, index) => (
            <motion.div
              key={promise.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04, y: -6 }}
              className="glass-card rounded-3xl p-6 relative overflow-hidden group"
            >
              {/* Gradient bg on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${promise.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <motion.div
                  className="text-5xl mb-4 float-anim inline-block"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {promise.emoji}
                </motion.div>
                <h3 className="text-lg font-bold text-purple-100 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {promise.title}
                </h3>
                <p className="text-purple-300/70 text-sm leading-relaxed">
                  {promise.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote banner */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-14 glass-card rounded-3xl p-5 md:p-8 text-center relative overflow-hidden"
          style={{ boxShadow: '0 0 60px rgba(155,109,189,0.2)' }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{ background: 'linear-gradient(135deg, #9b6dbd, #f4845f)' }} />
          <div className="absolute top-0 left-8 right-8 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #c8a8e9, #f4845f, #c8a8e9, transparent)' }} />
          <p className="text-purple-100 text-base md:text-2xl font-medium italic relative z-10 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            &quot;Whatever our souls are made of, yours and mine are the same.&quot;
          </p>
          <p className="text-purple-400/70 text-sm relative z-10">— Emily Brontë</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-3xl mt-12"
          style={{ fontFamily: "'Dancing Script', cursive", color: '#c8a8e9', fontSize: '2rem' }}
        >
          I love you, gummy bear ❤️
        </motion.p>
      </div>
    </section>
  )
}
