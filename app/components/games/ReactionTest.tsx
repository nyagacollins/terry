'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ReactionTest() {
  const [screen, setScreen] = useState<'idle' | 'waiting' | 'ready' | 'clicked' | 'result'>('idle')
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [best, setBest] = useState<number | null>(null)
  const [tooEarly, setTooEarly] = useState(false)

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const startTimeRef = useRef<number>(0)

  const start = () => {
    setScreen('waiting')
    setReactionTime(null)
    setTooEarly(false)

    const delay = 800 + Math.random() * 2200
    timeoutRef.current = setTimeout(() => {
      setScreen('ready')
      startTimeRef.current = performance.now()
    }, delay)
  }

  const handleClick = () => {
    if (screen === 'waiting') {
      clearTimeout(timeoutRef.current)
      setTooEarly(true)
      setScreen('result')
    } else if (screen === 'ready') {
      const rt = Math.round(performance.now() - startTimeRef.current)
      setReactionTime(rt)
      setBest(prev => (prev === null ? rt : Math.min(prev, rt)))
      setScreen('result')
    }
  }

  const getMessage = () => {
    if (tooEarly) return { text: 'Too fast! 😂', sub: 'Wait for green...', emoji: '🚨' }
    if (reactionTime === null) return { text: '', sub: '', emoji: '' }
    if (reactionTime < 150) return { text: `${reactionTime}ms`, sub: 'Lightning fast! ⚡', emoji: '🌩' }
    if (reactionTime < 300) return { text: `${reactionTime}ms`, sub: 'Nice reaction!', emoji: '👍' }
    if (reactionTime < 500) return { text: `${reactionTime}ms`, sub: 'Decent 👍', emoji: '😐' }
    return { text: `${reactionTime}ms`, sub: 'Slowpoke 🦥', emoji: '🐌' }
  }

  const msg = getMessage()

  return (
    <section className="py-20 md:py-28 section-mid relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">
        <div className="text-center mb-8">
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">reflex test</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>Reaction Time</h2>
          <p className="text-purple-400/50 text-sm mt-2">How fast are your reflexes?</p>
        </div>

        <div className="text-center mb-6">
          {best !== null && (
            <div className="text-yellow-400/60 text-xs">Best: {best}ms</div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {screen === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 border-card"
            >
              <div className="text-5xl mb-6">⏱</div>
              <h3 className="text-white text-xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}>Test Your Reflexes</h3>
              <p className="text-purple-300/60 text-sm mb-6">
                Wait for the screen to turn green, then tap as fast as you can!
              </p>
              <motion.button
                onClick={start}
                className="btn-love text-xs px-10 py-3"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Test
              </motion.button>
            </motion.div>
          )}

          {screen === 'waiting' && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 border-card"
              style={{ background: 'rgba(178, 0, 0, 0.3)' }}
              onClick={() => {
                clearTimeout(timeoutRef.current)
                setTooEarly(true)
                setScreen('result')
              }}
            >
              <div className="text-5xl mb-4">🔴</div>
              <h3 className="text-white text-xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}>Wait...</h3>
              <p className="text-purple-300/60 text-sm">Get ready to tap</p>
            </motion.div>
          )}

          {screen === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [0.5, 1.1, 1] }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 border-card"
              style={{ background: 'rgba(39, 174, 96, 0.3)' }}
              onClick={handleClick}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                🟢
              </motion.div>
              <h3 className="text-white text-xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}>TAP NOW!</h3>
              <p className="text-purple-300/60 text-sm">Go!</p>
            </motion.div>
          )}

          {screen === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 border-card"
            >
              <div className="text-4xl mb-4">{msg.emoji}</div>
              <h3 className="text-white text-xl font-bold mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {tooEarly ? 'Too Early!' : msg.text}
              </h3>
              {!tooEarly && (
                <p className="text-purple-300/60 text-sm mb-4">{msg.sub}</p>
              )}
              {best !== null && (
                <p className="text-yellow-400/50 text-xs mb-4">Best: {best}ms</p>
              )}
              <motion.button
                onClick={start}
                className="btn-love text-xs px-10 py-3"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 text-center text-purple-400/40 text-xs">
          Reaction time under 150ms is exceptional · Human average is ~250-300ms
        </div>
      </div>
    </section>
  )
}
