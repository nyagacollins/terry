'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HER_NAME = 'Hope'

const MESSAGES = {
  morning: [
    { text: `Good morning, ${HER_NAME} ☀️`, sub: "I hope your day is as beautiful as your smile 💜" },
    { text: `Rise and shine, my love 🌅`, sub: `Thinking of you the moment I wake up, ${HER_NAME} 💕` },
    { text: `Good morning, gummy bear 🐻`, sub: "May today bring you all the joy you deserve ✨" },
  ],
  afternoon: [
    { text: `Hey beautiful 🌸`, sub: `Just checking in — I hope your afternoon is going well, ${HER_NAME} 💜` },
    { text: `Thinking of you 💭`, sub: "In the middle of the day, you still cross my mind 💕" },
  ],
  evening: [
    { text: `Good evening, my love 🌆`, sub: `How was your day, ${HER_NAME}? I hope it was amazing 💜` },
    { text: `Hey you 🌇`, sub: "The evening is prettier knowing you exist in it 💕" },
  ],
  night: [
    { text: `Good night, ${HER_NAME} 🌙`, sub: "Sweet dreams, my love. I'll be thinking of you 💜" },
    { text: `Sleep well, gummy bear 🐻`, sub: "Close your eyes knowing you are so deeply loved ✨" },
    { text: `Good night, my everything 🌟`, sub: "The stars are out — just like the light you bring to my life 💕" },
  ],
}

function getTimeOfDay(): keyof typeof MESSAGES {
  const h = new Date().getHours()
  if (h >= 5  && h < 12) return 'morning'
  if (h >= 12 && h < 17) return 'afternoon'
  if (h >= 17 && h < 21) return 'evening'
  return 'night'
}

const TIME_ICONS = {
  morning:   { bg: 'from-orange-900/80 to-yellow-900/80', accent: '#f4845f', icon: '🌅' },
  afternoon: { bg: 'from-violet-900/80 to-purple-900/80', accent: '#c8a8e9', icon: '☀️' },
  evening:   { bg: 'from-purple-900/80 to-orange-900/80', accent: '#f4845f', icon: '🌆' },
  night:     { bg: 'from-indigo-900/80 to-violet-900/80', accent: '#c8a8e9', icon: '🌙' },
}

export default function TimeGreeting() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [message, setMessage] = useState<{ text: string; sub: string } | null>(null)
  const [timeOfDay, setTimeOfDay] = useState<keyof typeof MESSAGES>('night')

  useEffect(() => {
    const tod = getTimeOfDay()
    setTimeOfDay(tod)
    const msgs = MESSAGES[tod]
    setMessage(msgs[Math.floor(Math.random() * msgs.length)])
    // Show after 2s
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const style = TIME_ICONS[timeOfDay]

  return (
    <AnimatePresence>
      {visible && !dismissed && message && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm mx-4"
          style={{ filter: `drop-shadow(0 0 30px ${style.accent}40)` }}
        >
          <div
            className={`glass-card rounded-3xl px-6 py-5 relative overflow-hidden bg-gradient-to-br ${style.bg}`}
            style={{ border: `1px solid ${style.accent}40` }}
          >
            {/* Top glow line */}
            <div className="absolute top-0 left-6 right-6 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${style.accent}, transparent)` }} />

            {/* Stars in background */}
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-white/10 text-xs"
                style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
                animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
              >
                ✦
              </motion.span>
            ))}

            <div className="flex items-start gap-4 relative z-10">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="text-4xl flex-shrink-0 mt-1"
              >
                {style.icon}
              </motion.span>

              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-lg leading-tight mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {message.text}
                </p>
                <p className="text-purple-300/80 text-sm leading-relaxed italic"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.95rem' }}>
                  {message.sub}
                </p>
              </div>

              <button
                onClick={() => setDismissed(true)}
                className="text-purple-400/50 hover:text-purple-300 transition-colors text-lg flex-shrink-0 mt-1"
              >
                ✕
              </button>
            </div>

            {/* Dismiss bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 12, ease: 'linear' }}
              onAnimationComplete={() => setDismissed(true)}
              className="absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full"
              style={{ background: `linear-gradient(90deg, ${style.accent}, transparent)` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
