'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reasons = [
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

const frontVariants = {
  visible: { opacity: 1, scale: 1,    rotateY: 0,    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  hidden:  { opacity: 0, scale: 0.85, rotateY: -90,  transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] } },
}

const backVariants = {
  hidden:  { opacity: 0, scale: 0.85, rotateY: 90,  transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] } },
  visible: { opacity: 1, scale: 1,    rotateY: 0,   transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 } },
}

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
          <h2 className="text-3xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Reasons I Love You
          </h2>
          <p className="text-purple-300/70 text-sm md:text-lg">Tap each card to reveal a reason 💕</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {reasons.map((item, index) => {
            const isFlipped = revealed.includes(item.id)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => toggle(item.id)}
                className="relative h-44 md:h-52 cursor-pointer select-none"
                style={{ perspective: '800px' }}
              >
                <AnimatePresence initial={false} mode="wait">
                  {!isFlipped ? (
                    <motion.div
                      key="front"
                      variants={frontVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center shadow-2xl overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #3b1f5e, #5c2d91)',
                        border: '1px solid rgba(200,168,233,0.25)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                      }}
                    >
                      <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{ background: 'radial-gradient(circle at 50% 30%, #c8a8e9, transparent 60%)' }} />
                      <span className="text-4xl md:text-6xl mb-2 md:mb-3 relative z-10">{item.emoji}</span>
                      <span className="text-purple-300/60 text-xs tracking-widest uppercase relative z-10">tap to reveal</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      variants={backVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute inset-0 rounded-3xl flex items-center justify-center p-5 overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #f9f0ff, #fff0f0)',
                        border: '1px solid rgba(200,168,233,0.4)',
                        boxShadow: '0 8px 32px rgba(155,109,189,0.3)',
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                        style={{ background: 'linear-gradient(90deg, #9b6dbd, #f4845f)' }} />
                      <p
                        className="text-violet-800 text-center font-semibold text-sm md:text-base leading-relaxed relative z-10"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.reason}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
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
