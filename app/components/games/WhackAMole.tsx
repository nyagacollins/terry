'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HOLES = 4
const ROUND_TIME = 25
const MOLE_TIME = 800
const MOLE_VARIANCE = 400

const MOLES = ['🐹','🐭','🐰','🦝','🦊','🐱','🐶','🦝','🐹','🐭']

export default function WhackAMole() {
  const [screen, setScreen] = useState<'idle' | 'playing' | 'gameover'>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME)
  const [activeMole, setActiveMole] = useState<number | null>(null)

  const timerRef = useRef<NodeJS.Timeout>()
  const moleRef = useRef<NodeJS.Timeout>()
  const gameLoopRef = useRef<NodeJS.Timeout>()
  const playingRef = useRef(false)
  const scoreRef = useRef(0)

  useEffect(() => {
    const saved = parseInt(localStorage.getItem('whack_best') ?? '0', 10)
    if (!isNaN(saved)) setBest(saved)
  }, [])

  const popMole = () => {
    if (!playingRef.current) return
    const hole = Math.floor(Math.random() * HOLES)
    setActiveMole(hole)

    const duration = MOLE_TIME + Math.random() * MOLE_VARIANCE

    moleRef.current = setTimeout(() => {
      setActiveMole(null)
      if (playingRef.current) popMole()
    }, duration)
  }

  const start = () => {
    setScore(0)
    setTimeLeft(ROUND_TIME)
    setScreen('playing')
    playingRef.current = true
    scoreRef.current = 0

    gameLoopRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(gameLoopRef.current)
          clearTimeout(moleRef.current)
          playingRef.current = false
          setScreen('gameover')
          setBest(prev => {
            const nb = Math.max(prev, scoreRef.current)
            localStorage.setItem('whack_best', String(nb))
            return nb
          })
          setActiveMole(null)
          return 0
        }
        return t - 1
      })
    }, 1000)

    setTimeout(popMole, 500)
  }

  const whack = () => {
    if (!playingRef.current || activeMole === null) return
    const pts = 10 + Math.floor(Math.random() * 5)
    setScore(s => s + pts)
    scoreRef.current += pts
    setActiveMole(null)
    clearTimeout(moleRef.current)
    setTimeout(popMole, 300)
  }

  const reset = () => {
    clearInterval(gameLoopRef.current)
    clearTimeout(moleRef.current)
    playingRef.current = false
    setScreen('idle')
    setScore(0)
    setTimeLeft(ROUND_TIME)
    setActiveMole(null)
  }

  const gridCols = Math.ceil(Math.sqrt(HOLES))

  return (
    <section className="py-20 md:py-28 section-mid relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">
        <div className="text-center mb-8">
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">arcade game</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>Whack a Mole</h2>
          <p className="text-purple-400/50 text-sm mt-2">Tap the moles before they disappear</p>
        </div>

        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="text-center">
            <div className="text-purple-400/40 text-[10px] uppercase">Score</div>
            <div className="text-2xl font-bold gradient-text">{score}</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400/40 text-[10px] uppercase">Time</div>
            <div className="text-2xl font-bold text-purple-200">{timeLeft}s</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400/40 text-[10px] uppercase">Best</div>
            <div className="text-xl font-bold text-yellow-400/60">{best}</div>
          </div>
        </div>

        <div
          className={`grid gap-2 mx-auto border-card p-4 ${
            screen === 'playing' ? 'cursor-pointer' : ''
          }`}
          style={{
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            maxWidth: '280px',
          }}
          onClick={whack}
        >
          {Array.from({ length: HOLES }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-full flex items-center justify-center relative overflow-hidden transition-all"
              style={{
                background: 'radial-gradient(circle, #1a0840, #0e0120)',
                border: '2px solid rgba(200,168,233,0.15)',
              }}
            >
              {activeMole === i && (
                <motion.div
                  initial={{ scale: 0, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="text-3xl"
                >
                  {MOLES[i % MOLES.length]}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence>
          {screen === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mt-8"
            >
              <p className="text-purple-300/50 text-sm mb-4">
                {HOLES} holes · {ROUND_TIME}s · Tap to earn points
              </p>
              <motion.button
                onClick={start}
                className="btn-love text-xs px-10 py-3"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Whacking 🐹
              </motion.button>
            </motion.div>
          )}

          {screen === 'gameover' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-8"
            >
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-white text-xl font-bold mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}>Round Over!</h3>
              <p className="text-purple-300/60 text-sm mb-1">Final Score: {score}</p>
              {best > score && <p className="text-yellow-400/50 text-xs mb-3">Best: {best}</p>}
              <div className="flex gap-3 justify-center">
                <button onClick={start} className="btn-love text-xs px-6 py-2">
                  Play Again
                </button>
                <button onClick={reset} className="text-purple-400/50 text-xs hover:text-purple-300 transition-colors">
                  Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
