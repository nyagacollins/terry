'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HER_NAME = 'Hope Wangari'

interface IntroScreenProps {
  onDone: () => void
}

export default function IntroScreen({ onDone }: IntroScreenProps) {
  const [phase, setPhase] = useState<'name' | 'tagline' | 'fade'>('name')
  const [visibleLetters, setVisibleLetters] = useState(0)
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([])

  useEffect(() => {
    setStars(Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    })))
  }, [])

  // Letter by letter reveal
  useEffect(() => {
    if (phase !== 'name') return
    if (visibleLetters < HER_NAME.length) {
      const t = setTimeout(() => setVisibleLetters(v => v + 1), 120)
      return () => clearTimeout(t)
    } else {
      // All letters shown — move to tagline
      const t = setTimeout(() => setPhase('tagline'), 600)
      return () => clearTimeout(t)
    }
  }, [visibleLetters, phase])

  // After tagline, fade out
  useEffect(() => {
    if (phase !== 'tagline') return
    const t = setTimeout(() => setPhase('fade'), 2200)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'fade') return
    const t = setTimeout(() => onDone(), 900)
    return () => clearTimeout(t)
  }, [phase, onDone])

  return (
    <AnimatePresence>
      {phase !== 'fade' ? (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center morph-bg overflow-hidden"
        >
          {/* Stars */}
          {stars.map(s => (
            <span key={s.id} className="star" style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: `${s.size}px`, height: `${s.size}px`,
              animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
            }} />
          ))}

          {/* Glow orbs */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />

          <div className="text-center px-6 relative z-10">
            {/* Small label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-purple-400 text-xs tracking-[0.4em] uppercase mb-8"
            >
              ✦ this is for ✦
            </motion.p>

            {/* Name letter by letter */}
            <div
              className="text-5xl md:text-8xl font-bold mb-4 md:mb-6 leading-tight px-2"
              style={{ fontFamily: "'Playfair Display', serif", minHeight: '1.2em' }}
            >
              {HER_NAME.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={i < visibleLetters
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 30, filter: 'blur(8px)' }
                  }
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={char === ' ' ? 'inline-block w-4 md:w-6' : 'inline-block shimmer-text'}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <AnimatePresence>
              {phase === 'tagline' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-5xl mb-4"
                  >
                    💜
                  </motion.div>
                  <p
                    className="text-purple-300/80 text-lg md:text-2xl italic px-4"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    Something special was made just for you...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 h-px origin-left"
            style={{ background: 'linear-gradient(90deg, transparent, #c8a8e9, #f4845f, transparent)' }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
