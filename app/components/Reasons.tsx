'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Reason {
  id: number
  reason: string
  emoji: string
}

const reasons: Reason[] = [
  { id: 1,  reason: "I love how you make even boring things fun",           emoji: "😂" },
  { id: 2,  reason: "Your smile lights up my entire world",                 emoji: "☀️" },
  { id: 3,  reason: "I love how you annoy me (just kidding... maybe) 😂",  emoji: "💕" },
  { id: 4,  reason: "Your kindness knows no bounds",                        emoji: "🤗" },
  { id: 5,  reason: "You're the best hugger ever!",                         emoji: "🫂" },
  { id: 6,  reason: "I love how we can be silly together",                  emoji: "🤪" },
  { id: 7,  reason: "Your strength inspires me every single day",           emoji: "💪" },
  { id: 8,  reason: "You're my favorite person to binge-watch with",        emoji: "📺" },
  { id: 9,  reason: "I love your unique sense of humor",                    emoji: "🤣" },
  { id: 10, reason: "Everything is better with you by my side",             emoji: "🌟" },
  { id: 11, reason: "Your love is the greatest gift I've ever received",    emoji: "🎁" },
  { id: 12, reason: "I fall in love with you more every single day",        emoji: "❤️" },
]

export default function Reasons() {
  const [revealed, setRevealed] = useState<number[]>([])

  const toggle = (id: number) => {
    setRevealed(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])
  }

  return (
    <section className="py-24 section-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-64 opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #c8a8e9, transparent)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3">✦ let me count the ways ✦</p>
          <h2 className="font-serif-elegant text-4xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Reasons I Love You
          </h2>
          <p className="text-purple-300/70 text-lg">Tap each card to reveal a reason 💕</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => toggle(item.id)}
              className={`flip-card h-52 cursor-pointer ${revealed.includes(item.id) ? 'flipped' : ''}`}
            >
              <div className="flip-card-inner w-full h-full">
                {/* Front */}
                <div className="flip-card-front absolute w-full h-full rounded-3xl flex flex-col items-center justify-center shadow-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #3b1f5e, #5c2d91)',
                    border: '1px solid rgba(200,168,233,0.25)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
                  }}
                >
                  <div className="absolute inset-0 opacity-20"
                    style={{ background: 'radial-gradient(circle at 50% 30%, #c8a8e9, transparent 60%)' }} />
                  <motion.span
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-6xl z-10 mb-3"
                  >
                    {item.emoji}
                  </motion.span>
                  <span className="text-purple-300/60 text-xs tracking-widest uppercase z-10">tap to reveal</span>
                </div>

                {/* Back */}
                <div className="flip-card-back absolute w-full h-full rounded-3xl flex items-center justify-center p-5 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #f9f0ff, #fff0f0)',
                    border: '1px solid rgba(200,168,233,0.4)',
                    boxShadow: '0 8px 32px rgba(155,109,189,0.3)'
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: 'linear-gradient(90deg, #9b6dbd, #f4845f)' }} />
                  <AnimatePresence mode="wait">
                    {revealed.includes(item.id) && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-violet-800 text-center font-semibold text-base leading-relaxed"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.reason}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-purple-400/70 mt-12 italic text-lg"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          And there are infinitely more reasons where these came from... ❤️
        </motion.p>
      </div>
    </section>
  )
}
