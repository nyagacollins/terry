'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const loveLetterText = `Dear, My love 💕Hope😘 🐻❤️ ,

I just wanted to take a moment to tell you how much you mean to me.Every day, you bring something beautiful into my life whether it's your smile, your kindness, your laughter, or simply your presence. You have a way of making even the ordinary moments feel special, and for that, I am endlessly grateful😘.

I love you more than I can put into words, and I will never stop being grateful that our paths crossed.

Forever yours,
collins 💕💕 💕`

export default function LoveLetter() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return
    let index = 0
    const timer = setInterval(() => {
      if (index < loveLetterText.length) {
        setDisplayedText(loveLetterText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        setIsTypingComplete(true)
      }
    }, 28)
    return () => clearInterval(timer)
  }, [started])

  return (
    <section className="py-24 section-dark relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, #9b6dbd, transparent)' }} />
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3">✦ words from my heart ✦</p>
          <h2 className="font-serif-elegant text-4xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            A Letter for You
          </h2>
          <p className="text-purple-300/70 text-lg">Written with all the love I carry</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl p-6 md:p-12 relative overflow-hidden"
          style={{ boxShadow: '0 0 60px rgba(155,109,189,0.2), 0 0 120px rgba(155,109,189,0.05)' }}
        >
          {/* Top border glow */}
          <div className="absolute top-0 left-8 right-8 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #c8a8e9, #f4845f, #c8a8e9, transparent)' }} />

          {/* Corner decorations */}
          <div className="absolute top-4 left-6 text-purple-400/40 text-3xl">💜</div>
          <div className="absolute top-4 right-6 text-purple-400/40 text-3xl">💜</div>

          {!started ? (
            <div className="text-center py-8">
              <motion.p className="text-purple-300/70 mb-6 italic">
                Open your letter when you&apos;re ready...
              </motion.p>
              <motion.button
                onClick={() => setStarted(true)}
                className="btn-love"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                💌 Open My Letter
              </motion.button>
            </div>
          ) : (
            <div className="mt-6">
              <div
                className="text-purple-100/90 leading-loose whitespace-pre-wrap text-sm md:text-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <span className="typing-cursor">{displayedText}</span>
                {isTypingComplete && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
                    className="ml-2 text-2xl"
                  >
                    💖
                  </motion.span>
                )}
              </div>
              {!isTypingComplete && (
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-purple-400/60 text-sm mt-4 italic"
                >
                  ✦ writing...
                </motion.div>
              )}
            </div>
          )}

          {/* Bottom border glow */}
          <div className="absolute bottom-0 left-8 right-8 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #c8a8e9, #f4845f, #c8a8e9, transparent)' }} />
        </motion.div>
      </div>
    </section>
  )
}
