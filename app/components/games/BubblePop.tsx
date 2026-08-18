'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WIDTH = 360
const HEIGHT = 480
const POP_TIME = 1200

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  speed: number
  color: string
  vx: number
}

const COLORS = ['#c8a8e9', '#9b6dbd', '#f4845f', '#e05c5c', '#f7b8c8']

export default function BubblePop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [screen, setScreen] = useState<'idle' | 'playing' | 'gameover'>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const bubblesRef = useRef<Bubble[]>([])
  const rafRef = useRef(0)
  const spawnRef = useRef<ReturnType<typeof setInterval>>()
  const timerRef = useRef<ReturnType<typeof setInterval>>()
  const uidRef = useRef(0)
  const playingRef = useRef(false)
  const scoreRef = useRef(0)
  const bestRef = useRef(0)
  const timeLeftRef = useRef(30)

  useEffect(() => {
    const saved = parseInt(localStorage.getItem('bubble_best') ?? '0', 10)
    if (!isNaN(saved)) setBest(saved)
    bestRef.current = isNaN(saved) ? 0 : saved
    return () => {
      cancelAnimationFrame(rafRef.current)
      clearInterval(spawnRef.current)
      clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    scoreRef.current = score
  }, [score])

  useEffect(() => {
    timeLeftRef.current = timeLeft
  }, [timeLeft])

  const spawnBubble = useCallback(() => {
    if (!playingRef.current) return
    const size = 18 + Math.random() * 18
    bubblesRef.current.push({
      id: uidRef.current++,
      x: 10 + Math.random() * (WIDTH - 20),
      y: -size,
      size,
      speed: 0.6 + Math.random() * 1.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 0.8,
    })
  }, [])

  const draw = useCallback((t: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    if (!playingRef.current) return

    const w = WIDTH
    const h = HEIGHT
    ctx.clearRect(0, 0, w, h)

    const grad = ctx.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, '#080112')
    grad.addColorStop(1, '#120228')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    bubblesRef.current = bubblesRef.current.filter(b => b.y < h + b.size + 20)

    bubblesRef.current.forEach(b => {
      b.x += b.vx
      b.y += b.speed

      if (b.x < b.size / 2 || b.x > w - b.size / 2) b.vx *= -0.8

      ctx.globalAlpha = 0.15
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(b.x, b.y - b.size / 2 - 2, b.size * 0.6, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1

      ctx.fillStyle = b.color
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.size / 2, 0, Math.PI * 2)
      ctx.fill()

      const highlight = ctx.createRadialGradient(
        b.x - b.size * 0.15, b.y - b.size * 0.15, 1, b.x, b.y, b.size / 2
      )
      highlight.addColorStop(0, 'rgba(255,255,255,0.8)')
      highlight.addColorStop(1, b.color)
      ctx.fillStyle = highlight
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.size / 2, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'rgba(0,0,0,0.3)'
      ctx.lineWidth = 1
      ctx.stroke()
    })

    ctx.fillStyle = '#c8a8e9'
    ctx.font = '14px monospace'
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${scoreRef.current}`, 8, 20)
    ctx.fillText(`Best: ${bestRef.current}`, 8, 38)
    ctx.fillStyle = '#f4845f'
    ctx.fillText(`Time: ${timeLeftRef.current}s`, w - 80, 20)

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  const start = () => {
    bubblesRef.current = []
    setScore(0)
    setTimeLeft(30)
    setScreen('playing')
    playingRef.current = true
    scoreRef.current = 0
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          clearInterval(spawnRef.current!)
          cancelAnimationFrame(rafRef.current)
          bubblesRef.current = []
          playingRef.current = false
          setScreen('gameover')
          setBest(prev => {
            const nb = Math.max(prev, scoreRef.current)
            localStorage.setItem('bubble_best', String(nb))
            bestRef.current = nb
            return nb
          })
          return 0
        }
        return t - 1
      })
    }, 1000)
    spawnRef.current = setInterval(spawnBubble, 350)
    rafRef.current = requestAnimationFrame(draw)
  }

  const popAt = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!playingRef.current) return
    const rect = canvasRef.current!.getBoundingClientRect()
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top

    for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
      const b = bubblesRef.current[i]
      const dist = Math.hypot(b.x - cx, b.y - cy)
      if (dist < b.size / 2 + 2) {
        bubblesRef.current.splice(i, 1)
        const pts = Math.round(b.size)
        setScore(s => s + pts)
        scoreRef.current += pts
        break
      }
    }
  }

  return (
    <section className="py-20 md:py-28 section-gradient relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">
        <div className="text-center mb-8">
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">tap game</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>Bubble Pop</h2>
          <p className="text-purple-400/50 text-sm mt-2">Tap bubbles before they float away</p>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden w-full mx-auto"
          style={{
            maxWidth: WIDTH,
            height: HEIGHT,
            background: 'linear-gradient(180deg, #080112 0%, #120228 50%, #1a0840 100%)',
            border: '1px solid rgba(200,168,233,0.1)',
            boxShadow: '0 0 50px rgba(155,109,189,0.1)',
            touchAction: 'none',
          }}
        >
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            className="w-full h-full"
            onClick={popAt}
            onTouchStart={e => {
              if (!playingRef.current) return
              e.preventDefault()
              const touch = e.touches[0]
              const rect = canvasRef.current!.getBoundingClientRect()
              const cx = touch.clientX - rect.left
              const cy = touch.clientY - rect.top
              for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
                const b = bubblesRef.current[i]
                const dist = Math.hypot(b.x - cx, b.y - cy)
                if (dist < b.size / 2 + 2) {
                  bubblesRef.current.splice(i, 1)
                  const pts = Math.round(b.size)
                  setScore(s => s + pts)
                  scoreRef.current += pts
                  break
                }
              }
            }}
          />

          <AnimatePresence>
            {screen === 'idle' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/60"
              >
                <div className="text-4xl mb-4">🫧</div>
                <h3 className="text-white text-xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}>Bubble Pop</h3>
                <p className="text-purple-300/60 text-sm mb-4">Tap the bubbles to pop them</p>
                <button onClick={start} className="btn-love text-xs px-10 py-3">
                  Start Popping
                </button>
              </motion.div>
            )}

            {screen === 'gameover' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70"
              >
                <div className="text-3xl mb-2">⏰</div>
                <h3 className="text-white text-xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>Time's Up!</h3>
                <p className="text-purple-300/60 text-sm mb-1">Final Score: {score}</p>
                {best > score && <p className="text-yellow-400/50 text-xs mb-3">Best: {best}</p>}
                <button onClick={start} className="btn-love text-xs px-8 py-2.5">
                  Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 text-center text-purple-400/40 text-xs">
          Bigger bubbles are worth more points
        </div>
      </div>
    </section>
  )
}
