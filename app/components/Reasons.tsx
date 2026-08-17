'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reasons = [
  { id: 1,  reason: "I love how you make even boring things fun",           emoji: "😂" },
  { id: 2,  reason: "Your smile lights up my entire world",                 emoji: "☀️" },
  { id: 3,  reason: "I love how you annoy me (just kidding... maybe)",      emoji: "💕" },
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

const frontV = {
  visible: { opacity: 1, scale: 1,    rotateY: 0,   transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] } },
  hidden:  { opacity: 0, scale: 0.88, rotateY: -90, transition: { duration: 0.28, ease: [0.55, 0, 1, 0.45] } },
}
const backV = {
  hidden:  { opacity: 0, scale: 0.88, rotateY: 90,  transition: { duration: 0.28, ease: [0.55, 0, 1, 0.45] } },
  visible: { opacity: 1, scale: 1,    rotateY: 0,   transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.04 } },
}

export default function Reasons() {
  const [revealed, setRevealed] = useState<number[]>([])
  const toggle = (id: number) =>
    setRevealed(p => p.includes(id) ? p.filter(r => r !== id) : [...p, id])

  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #c8a8e9, transparent)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-5 relative z-10">
        {/* Left-aligned header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">let me count the ways</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Reasons I Love You
          </h2>
          <p className="text-purple-400/50 text-sm mt-2">Tap each card to reveal a reason</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {reasons.map((item, index) => {
            const flipped = revealed.includes(item.id)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => toggle(item.id)}
                className="relative h-36 sm:h-40 md:h-48 cursor-pointer select-none"
                style={{ perspective: '800px' }}
              >
                <AnimatePresence initial={false} mode="wait">
                  {!flipped ? (
                    <motion.div
                      key="front"
                      variants={frontV}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, #2a1050, #3d1a6e)',
                        border: '1px solid rgba(200,168,233,0.15)',
                      }}
                    >
                      <div className="absolute inset-0 opacity-[0.12]"
                        style={{ background: 'radial-gradient(circle at 50% 25%, #c8a8e9, transparent 65%)' }} />
                      <span className="text-3xl md:text-5xl mb-2 relative z-10">{item.emoji}</span>
                      <span className="text-purple-400/50 text-[9px] tracking-[0.35em] uppercase relative z-10">tap to reveal</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      variants={backV}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute inset-0 rounded-2xl flex items-center justify-center p-4 overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, #f5eeff, #fff2f5)',
                        border: '1px solid rgba(200,168,233,0.3)',
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                        style={{ background: 'linear-gradient(90deg, #9b6dbd, #f4845f)' }} />
                      <p className="text-violet-800 text-center font-semibold text-xs md:text-sm leading-relaxed relative z-10"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
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
          transition={{ delay: 0.4 }}
          className="text-center text-purple-400/40 mt-10 italic"
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.15rem' }}
        >
          And there are infinitely more reasons where these came from... ❤️
        </motion.p>
      </div>
    </section>
  )
}
