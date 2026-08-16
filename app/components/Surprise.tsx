'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'

const surprises = [
  { title: 'Surprises & Gifts',        body: "I can't wait to keep surprising you on random days just to see that smile I fell in love with 😘❤️",                                                                                                                                  emoji: '🎁' },
  { title: 'Surprise Birthday Dinner', body: "Your next birthday will be extra special! I'm planning something you'll never forget.",                                                                                                                                              emoji: '🎂' },
  { title: 'Many More Adventures',     body: "This is just the beginning. I promise to create countless more memories with you, travel to new places, and grow old together.",                                                                                                     emoji: '💝' },
  { title: 'Future Date Promises',     body: "More late-night dates where we talk about life and laugh for no reason ❤️ More movie nights where you fall asleep on me 🥹 More surprise dates where you trust me completely 🤗",                                                   emoji: '🌙' },
]

export default function Surprise() {
  const [revealed, setRevealed] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const reveal = () => {
    setRevealed(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 6000)
  }

  return (
    <section className="py-20 md:py-28 section-mid relative overflow-hidden">
      {confetti && (
        <Confetti
          numberOfPieces={isMobile ? 80 : 220}
          recycle={false}
          gravity={0.16}
          colors={['#c8a8e9', '#9b6dbd', '#f4845f', '#e05c5c', '#f7b8c8', '#ffffff']}
        />
      )}

      <div className="max-w-4xl mx-auto px-5 relative z-10">
        {/* Right-aligned header */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-right mb-12 md:mb-16"
        >
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">just for you</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            A Surprise for You
          </h2>
          <p className="text-purple-400/50 text-sm mt-2">Something special is waiting...</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="btn"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88, y: -10 }}
              transition={{ duration: 0.45 }}
              className="text-center py-8"
            >
              <motion.button
                onClick={reveal}
                className="btn-love text-base md:text-lg px-10 md:px-16 py-4"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Open Your Surprise 🎁
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 150, damping: 14 }}
                className="text-center mb-10"
              >
                <p className="text-4xl mb-3">🎉</p>
                <h3 className="gradient-text text-xl md:text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our Next Adventures Await!
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {surprises.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 + 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="border-card p-5 md:p-6"
                  >
                    <div className="text-3xl mb-3">{s.emoji}</div>
                    <h4 className="text-purple-100 font-bold text-base mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      {s.title}
                    </h4>
                    <p className="text-purple-400/60 text-sm leading-relaxed">{s.body}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-10 text-purple-400/50 italic"
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.3rem' }}
              >
                I love you more than words can express! ❤️
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
