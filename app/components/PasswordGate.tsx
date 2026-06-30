'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// CONFIGURABLE PASSWORD - Change this to your desired password
const CORRECT_PASSWORD = 'khabajia'

interface PasswordGateProps {
  onUnlock: () => void
}

const PETALS = ['🌸', '🌺', '💮', '🌷', '💐']

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [shake, setShake] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([])
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; duration: number; emoji: string }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      }))
    )
    setPetals(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 8 + 8,
        emoji: PETALS[Math.floor(Math.random() * PETALS.length)],
      }))
    )
    setMounted(true)
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.trim() === CORRECT_PASSWORD) {
      setIsUnlocking(true)
      setTimeout(() => onUnlock(), 1200)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => { setError(false); setShake(false) }, 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center morph-bg relative overflow-hidden">

      {/* Stars */}
      {mounted && stars.map(s => (
        <span
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* Falling petals */}
      {mounted && petals.map(p => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: '20px',
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <motion.div
          animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-block heartbeat text-7xl mb-5"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              💜
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl text-white mb-3"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Just for you...
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-purple-300 text-sm tracking-wide"
            >
              This is our special place 💕
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the magic word..."
                className={`w-full px-6 py-4 rounded-2xl border-2 bg-white/10 text-white placeholder-purple-300 focus:outline-none focus:ring-4 transition-all duration-300 text-center text-lg tracking-widest backdrop-blur-sm
                  ${error
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-purple-400/40 focus:border-purple-300 focus:ring-purple-300/20'
                  }`}
              />
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center"
                >
                  <span className="text-red-400 text-sm font-medium">
                    ❌ That&apos;s not it, my love 😅
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full btn-love text-lg py-4"
              >
                {isUnlocking ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    >
                      ✨
                    </motion.span>
                    Opening with love...
                  </motion.span>
                ) : (
                  '🔓 Enter Our World'
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center text-purple-400 text-xs mt-6 italic"
          >
            Hint: How mechanic will call you. 💘
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}
