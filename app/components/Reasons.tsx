'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Reason {
  id: number
  reason: string
  emoji: string
}

const reasons: Reason[] = [
  { id: 1, reason: "I love how you make even boring things fun", emoji: "😂" },
  { id: 2, reason: "Your smile lights up my entire world", emoji: "☀️" },
  { id: 3, reason: "I love how you annoy me (just kidding... maybe) 😂", emoji: "💕" },
  { id: 4, reason: "Your kindness knows no bounds", emoji: "🤗" },
  { id: 5, reason: "You're the best hugger ever!", emoji: "🫂" },
  { id: 6, reason: "I love how we can be silly together", emoji: "🤪" },
  { id: 7, reason: "Your strength inspires me every day", emoji: "💪" },
  { id: 8, reason: "You're my favorite person to binge-watch with", emoji: "📺" },
  { id: 9, reason: "I love your unique sense of humor", emoji: "🤣" },
  { id: 10, reason: "Everything is better with you by my side", emoji: "🌟" },
  { id: 11, reason: "Your love is the greatest gift I've ever received", emoji: "🎁" },
  { id: 12, reason: "I fall in love with you more every day", emoji: "❤️" }
]

export default function Reasons() {
  const [revealed, setRevealed] = useState<number[]>([])

  const toggleReveal = (id: number) => {
    if (revealed.includes(id)) {
      setRevealed(revealed.filter(r => r !== id))
    } else {
      setRevealed([...revealed, id])
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Reasons I Love You 💕
          </h2>
          <p className="text-gray-600 text-lg">
            Click to reveal each reason
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => toggleReveal(item.id)}
              className={`flip-card h-48 cursor-pointer ${revealed.includes(item.id) ? 'flipped' : ''}`}
            >
              <div className="flip-card-inner w-full h-full">
                {/* Front of card */}
                <div className="flip-card-front absolute w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-6xl">{item.emoji}</span>
                </div>
                
                {/* Back of card */}
                <div className="flip-card-back absolute w-full h-full bg-white rounded-2xl flex items-center justify-center p-4 shadow-lg">
                  <AnimatePresence mode="wait">
                    {revealed.includes(item.id) ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-gray-700 text-center font-medium"
                      >
                        {item.reason}
                      </motion.p>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-pink-400 text-center"
                      >
                        Click to reveal 💖
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
          className="text-center text-gray-500 mt-12"
        >
          And there are infinitely more reasons where these came from... ❤️
        </motion.p>
      </div>
    </section>
  )
}
