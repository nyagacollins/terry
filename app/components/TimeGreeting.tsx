'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HER_NAME = 'Hope'

const MESSAGES = {
  morning:   [
    { text: `Good morning, ${HER_NAME}`, sub: "I hope your day is as beautiful as your smile 💜" },
    { text: `Rise and shine, my love`, sub: `Thinking of you the moment I wake up 💕` },
  ],
  afternoon: [
    { text: `Hey beautiful`, sub: `Just checking in — hope your afternoon is going well, ${HER_NAME} 💜` },
    { text: `Thinking of you`, sub: "In the middle of the day, you still cross my mind 💕" },
  ],
  evening:   [
    { text: `Good evening, my love`, sub: `How was your day, ${HER_NAME}? I hope it was amazing 💜` },
    { text: `Hey you`, sub: "The evening is prettier knowing you exist in it 💕" },
  ],
  night:     [
    { text: `Good night, ${HER_NAME}`, sub: "Sweet dreams, my love. I'll be thinking of you 💜" },
    { text: `Sleep well, gummy bear`, sub: "Close your eyes knowing you are so deeply loved ✨" },
  ],
}

const ACCENTS = {
  morning:   '#f4845f',
  afternoon: '#c8a8e9',
  evening:   '#f4845f',
  night:     '#c8a8e9',
}

function tod(): keyof typeof MESSAGES {
  const h = new Date().getHours()
  if (h >= 5  && h < 12) return 'morning'
  if (h >= 12 && h < 17) return 'afternoon'
  if (h >= 17 && h < 21) return 'evening'
  return 'night'
}

export default function TimeGreeting() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [msg, setMsg] = useState<{ text: string; sub: string } | null>(null)
  const [timeOfDay, setTimeOfDay] = useState<keyof typeof MESSAGES>('night')

  useEffect(() => {
    const t = tod()
    setTimeOfDay(t)
    const msgs = MESSAGES[t]
    setMsg(msgs[Math.floor(Math.random() * msgs.length)])
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const accent = ACCENTS[timeOfDay]

  return (
    <AnimatePresence>
      {visible && !dismissed && msg && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 130, damping: 18 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-5 md:w-80 z-50"
        >
          <div
            className="glass-card rounded-2xl px-5 py-4 relative overflow-hidden"
            style={{ borderColor: `${accent}25` }}
          >
            <div className="absolute top-0 left-6 right-6 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }} />

            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-snug mb-0.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {msg.text}
                </p>
                <p className="text-purple-300/60 text-xs leading-relaxed italic"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.88rem' }}>
                  {msg.sub}
                </p>
              </div>
              <button
                onClick={() => setDismissed(true)}
                className="text-purple-400/30 hover:text-purple-300/60 transition-colors text-base flex-shrink-0 mt-0.5"
              >
                ✕
              </button>
            </div>

            {/* Auto-dismiss bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 10, ease: 'linear' }}
              onAnimationComplete={() => setDismissed(true)}
              className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
              style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
