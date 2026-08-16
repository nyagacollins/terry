'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CORRECT_PASSWORD = 'kabhajia'

export default function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const [shake, setShake] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; dur: number }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    setStars(Array.from({ length: isMobile ? 8 : 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.4,
      delay: Math.random() * 5,
      dur: Math.random() * 3 + 2,
    })))
    setMounted(true)
    setTimeout(() => inputRef.current?.focus(), 600)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.trim() === CORRECT_PASSWORD) {
      setUnlocking(true)
      setTimeout(() => onUnlock(), 1100)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => { setError(false); setShake(false) }, 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center morph-bg relative overflow-hidden">
      {mounted && stars.map(s => (
        <span key={s.id} className="star" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: `${s.size}px`, height: `${s.size}px`,
          animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`,
        }} />
      ))}

      {/* Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-[0.08] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />

      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm mx-5"
      >
        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.45 }}
          className="rounded-3xl p-7 md:p-10 relative"
          style={{
            background: 'rgba(18, 2, 40, 0.95)',
            border: '1px solid rgba(200,168,233,0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          {/* Top line */}
          <div className="absolute top-0 left-10 right-10 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,233,0.5), transparent)' }} />

          <div className="text-center mb-8">
            {/* Minimal heart mark instead of big emoji */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 220 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
              style={{ background: 'linear-gradient(135deg, #9b6dbd, #f4845f)', boxShadow: '0 0 24px rgba(155,109,189,0.4)' }}
            >
              <span className="text-white text-2xl">♡</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-2xl md:text-3xl text-white mb-2"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Just for you...
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-purple-400/60 text-xs tracking-wide"
            >
              This is our special place
            </motion.p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <motion.input
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              ref={inputRef}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter the magic word..."
              className={`w-full px-5 py-3.5 rounded-xl border bg-white/[0.06] text-white placeholder-purple-400/40 focus:outline-none focus:ring-2 transition-all duration-300 text-center text-sm tracking-widest backdrop-blur-sm
                ${error
                  ? 'border-red-400/60 focus:ring-red-400/20'
                  : 'border-purple-400/20 focus:border-purple-400/50 focus:ring-purple-400/15'
                }`}
            />

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400/80 text-xs text-center"
                >
                  That&apos;s not it, my love 😅
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              type="submit"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-love py-3.5"
            >
              {unlocking ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}>
                    ✦
                  </motion.span>
                  Opening...
                </span>
              ) : 'Enter Our World'}
            </motion.button>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-purple-500/40 text-xs mt-5 italic"
          >
            Hint: How mechanic will call you 💘
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}
