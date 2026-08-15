'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── CONFIGURE HERE ──────────────────────────────────────
const NAME_1 = 'Collins'
const NAME_2 = 'Hope'
const TAGLINE = 'a love story, written just for you...'
// ────────────────────────────────────────────────────────

const FLOWERS = [
  // [emoji, x%, y%, size, delay, rotation]
  ['🌸', 50,  18, 2.2,  0,    0  ],
  ['🌺', 38,  28, 1.8,  0.15, -18],
  ['🌸', 62,  28, 1.6,  0.25,  20],
  ['🌷', 28,  42, 1.9,  0.35, -30],
  ['🌸', 72,  42, 1.7,  0.4,   28],
  ['🌼', 44,  50, 1.5,  0.5,  -10],
  ['🌺', 56,  50, 1.6,  0.55,  12],
  ['🌸', 20,  58, 1.4,  0.6,  -40],
  ['🌷', 80,  58, 1.5,  0.65,  38],
  ['🌼', 34,  64, 1.3,  0.7,  -20],
  ['🌸', 66,  64, 1.4,  0.75,  22],
  ['🌺', 12,  72, 1.2,  0.8,  -50],
  ['🌸', 88,  72, 1.3,  0.85,  48],
  ['🌷', 42,  76, 1.2,  0.9,  -15],
  ['🌼', 58,  76, 1.1,  0.95,  18],
  ['🌸', 25,  82, 1.0,  1.0,  -35],
  ['🌺', 75,  82, 1.1,  1.05,  32],
  // Stem leaves
  ['🍃', 46,  60, 1.3,  0.45, -25],
  ['🍃', 54,  60, 1.2,  0.5,   30],
  ['🍃', 40,  70, 1.1,  0.65, -40],
  ['🍃', 60,  70, 1.0,  0.7,   38],
] as const

export default function IntroScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'bouquet' | 'names' | 'tagline' | 'fade'>('bouquet')
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; dur: number }[]>([])
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; delay: number }[]>([])

  useEffect(() => {
    setStars(Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.4,
      delay: Math.random() * 5,
      dur: Math.random() * 3 + 2,
    })))
    setSparkles(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 30 + Math.random() * 40,
      y: 15 + Math.random() * 70,
      delay: Math.random() * 2,
    })))
  }, [])

  // Phase transitions
  useEffect(() => {
    const timings: Record<typeof phase, number> = {
      bouquet: 1800,
      names:   1600,
      tagline: 2200,
      fade:    0,
    }
    if (phase === 'fade') { setTimeout(() => onDone(), 900); return }
    const t = setTimeout(() => {
      setPhase(p =>
        p === 'bouquet' ? 'names' :
        p === 'names'   ? 'tagline' :
        'fade'
      )
    }, timings[phase])
    return () => clearTimeout(t)
  }, [phase, onDone])

  return (
    <AnimatePresence>
      {phase !== 'fade' && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #0e0120 0%, #1a0533 40%, #2d1054 70%, #1a0533 100%)' }}
        >
          {/* Stars */}
          {stars.map(s => (
            <span key={s.id} className="star" style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: `${s.size}px`, height: `${s.size}px`,
              animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`,
            }} />
          ))}

          {/* Ambient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.08] blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #f7b8c8, transparent)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.07] blur-[80px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />

          {/* Main container */}
          <div className="relative w-full max-w-sm mx-auto flex flex-col items-center px-6" style={{ minHeight: '380px' }}>

            {/* ── BOUQUET ── */}
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto">
              {FLOWERS.map(([emoji, x, y, size, delay], i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: delay as number,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    type: 'spring',
                    stiffness: 180,
                    damping: 14,
                  }}
                  className="absolute select-none"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    fontSize: `${size as number}rem`,
                    transform: `translate(-50%, -50%) rotate(${FLOWERS[i][5]}deg)`,
                    filter: 'drop-shadow(0 2px 8px rgba(247,184,200,0.4))',
                  }}
                >
                  {emoji}
                </motion.span>
              ))}

              {/* Sparkles around bouquet */}
              {sparkles.map(sp => (
                <motion.span
                  key={sp.id}
                  className="absolute text-yellow-200/60 text-xs select-none pointer-events-none"
                  style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: sp.delay, ease: 'easeInOut' }}
                >
                  ✦
                </motion.span>
              ))}

              {/* Ribbon at base */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl select-none"
              >
                🎀
              </motion.div>
            </div>

            {/* ── NAMES ── */}
            <AnimatePresence>
              {(phase === 'names' || phase === 'tagline') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center mt-6"
                >
                  {/* Thin line above */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px w-32 mx-auto mb-5 origin-center"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(247,184,200,0.5), transparent)' }}
                  />

                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    {/* Name 1 */}
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="text-3xl sm:text-4xl md:text-5xl font-bold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        background: 'linear-gradient(135deg, #ff6b6b, #e05c5c, #c0392b)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {NAME_1}
                    </motion.span>

                    {/* Ampersand */}
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25, duration: 0.6, type: 'spring', stiffness: 200 }}
                      className="text-2xl md:text-3xl"
                      style={{
                        fontFamily: "'Dancing Script', cursive",
                        color: 'rgba(200,168,233,0.7)',
                      }}
                    >
                      &amp;
                    </motion.span>

                    {/* Name 2 */}
                    <motion.span
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="text-3xl sm:text-4xl md:text-5xl font-bold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        background: 'linear-gradient(135deg, #c8a8e9, #9b6dbd)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {NAME_2}
                    </motion.span>
                  </div>

                  {/* Thin line below */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px w-32 mx-auto mt-5 origin-center"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,233,0.5), transparent)' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── TAGLINE ── */}
            <AnimatePresence>
              {phase === 'tagline' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center mt-5 text-purple-300/50 italic"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}
                >
                  {TAGLINE}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom gradient line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 h-px origin-left"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(247,184,200,0.3), rgba(200,168,233,0.3), transparent)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
