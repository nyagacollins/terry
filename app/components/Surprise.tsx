'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'

const surprises = [
  {
    icon: '🎁',
    title: 'Surprises & Gifts',
    body: "I can't wait to keep surprising you on random days just to see that smile I fell in love with 😘❤️.",
    accent: 'from-violet-900/60 to-purple-900/60'
  },
  {
    icon: '🎂',
    title: 'Surprise Birthday Dinner',
    body: "Your next birthday will be extra special! I'm planning something you'll never forget.",
    accent: 'from-orange-900/60 to-red-900/60'
  },
  {
    icon: '💝',
    title: 'Many More Adventures',
    body: "This is just the beginning. I promise to create countless more memories with you, travel to new places, and grow old together.",
    accent: 'from-purple-900/60 to-violet-900/60'
  },
  {
    icon: '🌙',
    title: 'Future Date Promises',
    body: "More late-night dates where we talk about life and laugh for no reason ❤️ More movie nights where you fall asleep on me 🥹 More surprise dates where you trust me completely 🤗.",
    accent: 'from-red-900/60 to-orange-900/60'
  },
]

export default function Surprise() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const reveal = () => {
    setIsRevealed(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 6000)
  }

  return (
    <section className="py-24 section-dark relative overflow-hidden">
      {showConfetti && (
        <Confetti
          numberOfPieces={250}
          recycle={false}
          gravity={0.18}
          colors={['#c8a8e9', '#9b6dbd', '#f4845f', '#e05c5c', '#f7b8c8', '#ffffff']}
        />
      )}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, #9b6dbd, transparent)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3">✦ just for you ✦</p>
          <h2 className="font-serif-elegant text-4xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            A Surprise for You
          </h2>
          <p className="text-purple-300/70 text-lg">Something special is waiting...</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.button
                onClick={reveal}
                className="btn-love text-xl px-14 py-5"
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                🎁 Open Your Surprise
              </motion.button>

              <div className="mt-12 flex justify-center gap-5">
                {['🎀', '💝', '🎁', '💜', '🎀'].map((e, i) => (
                  <motion.span
                    key={i}
                    className="text-4xl"
                    animate={{ y: [0, -18, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            >
              <div className="text-center mb-10">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.8, repeat: 3 }}
                  className="text-7xl mb-4"
                >
                  ✨🎉✨
                </motion.div>
                <h3 className="gradient-text text-3xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our Next Adventures Await!
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {surprises.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`glass-card rounded-3xl p-6 relative overflow-hidden`}
                  >
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${s.accent}`} />
                    <div className="relative z-10">
                      <div className="text-4xl mb-3">{s.icon}</div>
                      <h4 className="text-purple-100 font-bold text-lg mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        {s.title}
                      </h4>
                      <p className="text-purple-300/80 text-sm leading-relaxed">{s.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-center mt-10"
              >
                <p className="text-2xl" style={{ fontFamily: "'Dancing Script', cursive", color: '#f4845f' }}>
                  I love you more than words can express! ❤️
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
