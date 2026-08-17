'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const loveLetterText = `Dear Hope, my love 💕

I just wanted to take a moment to tell you how much you mean to me. Every day, you bring something beautiful into my life — whether it's your smile, your kindness, your laughter, or simply your presence.

You have a way of making even the ordinary moments feel special, and for that, I am endlessly grateful 😘.

I love you more than I can put into words, and I will never stop being grateful that our paths crossed.

Forever yours,
Collins 💕`

export default function LoveLetter() {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return
    let i = 0
    const timer = setInterval(() => {
      if (i < loveLetterText.length) {
        setDisplayed(loveLetterText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setDone(true)
      }
    }, 22)
    return () => clearInterval(timer)
  }, [started])

  return (
    <section className="py-20 md:py-28 section-mid relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.05] blur-3xl"
          style={{ background: 'radial-gradient(circle, #9b6dbd, transparent)' }} />
      </div>

      <div className="max-w-2xl mx-auto px-5 relative z-10">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">words from my heart</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            A Letter for You
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Top gradient line */}
          <div className="absolute top-0 left-12 right-12 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,233,0.5), rgba(244,132,95,0.5), transparent)' }} />

          <div className="border-card rounded-2xl p-5 md:p-10 relative overflow-hidden"
            style={{ borderColor: 'rgba(200,168,233,0.15)' }}>

            <AnimatePresence mode="wait">
              {!started ? (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-8 md:py-12"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-5xl mb-6"
                  >
                    💌
                  </motion.div>
                  <p className="text-purple-400/60 text-sm mb-6 italic">
                    Open your letter when you&apos;re ready...
                  </p>
                  <motion.button
                    onClick={() => setStarted(true)}
                    className="btn-love"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Open My Letter
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="letter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <pre
                    className="text-purple-100/85 leading-loose whitespace-pre-wrap text-sm md:text-base font-sans"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <span className={done ? '' : 'typing-cursor'}>{displayed}</span>
                  </pre>
                  {done && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', delay: 0.3 }}
                      className="text-center mt-6 text-2xl"
                    >
                      💖
                    </motion.div>
                  )}
                  {!done && (
                    <motion.p
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-purple-500/40 text-xs mt-4 italic"
                    >
                      writing...
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-0 left-12 right-12 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,233,0.5), rgba(244,132,95,0.5), transparent)' }} />
        </motion.div>
      </div>
    </section>
  )
}
