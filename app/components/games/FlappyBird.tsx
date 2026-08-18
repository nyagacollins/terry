'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WIDTH = 360
const HEIGHT = 520
const GRAVITY = 0.45
const FLAP = -8.5
const GAP = 110
const PIPE_W = 60
const PIPE_SPEED = 1.8

export default function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [screen, setScreen] = useState<'idle' | 'playing' | 'gameover'>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  const stateRef = useRef({
    bird: { y: HEIGHT / 2, vy: 0, x: 70 },
    pipes: [] as { x: number; gapY: number; passed: boolean }[],
    rafId: 0,
    lastPipe: 0,
    animFrame: 0,
    playing: false,
  })
  const scoreRef = useRef(0)

  useEffect(() => {
    const saved = parseInt(localStorage.getItem('flappy_best') ?? '0', 10)
    if (!isNaN(saved)) setBest(saved)
  }, [])

  const drawFrame = useCallback((t: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    const s = stateRef.current

    s.bird.vy += GRAVITY
    s.bird.y += s.bird.vy

    s.lastPipe += 1.6
    if (s.lastPipe > 1500 / PIPE_SPEED) {
      s.lastPipe = 0
      s.pipes.push({ x: WIDTH, gapY: 80 + Math.random() * (HEIGHT - 200), passed: false })
    }

    s.pipes.forEach(p => (p.x -= PIPE_SPEED))
    s.pipes = s.pipes.filter(p => p.x > -PIPE_W)

    s.pipes.forEach(p => {
      if (!p.passed && p.x + PIPE_W < s.bird.x) {
        p.passed = true
         setScore(prev => {
            const ns = prev + 1
            scoreRef.current = ns
            return ns
          })
      }
    })

    s.animFrame = t

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT)
    sky.addColorStop(0, '#87ceeb')
    sky.addColorStop(1, '#90e0f0')
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    s.pipes.forEach(p => {
      ctx.fillStyle = '#2ecc71'
      ctx.fillRect(p.x, 0, PIPE_W, p.gapY)
      ctx.fillRect(p.x, p.gapY + GAP, PIPE_W, HEIGHT)

      ctx.fillStyle = '#27ae60'
      ctx.fillRect(p.x, 0, PIPE_W, p.gapY)
      ctx.fillRect(p.x, p.gapY + GAP, PIPE_W, HEIGHT)
    })

    ctx.fillStyle = '#f1c40f'
    ctx.beginPath()
    ctx.ellipse(s.bird.x, s.bird.y, 14, 10, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#d4ac0d'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.fillStyle = '#e74c3c'
    ctx.beginPath()
    ctx.arc(s.bird.x + 5, s.bird.y - 2, 3, 0, Math.PI * 2)
    ctx.fill()

     ctx.fillStyle = '#2c3e50'
    ctx.font = '16px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(String(scoreRef.current), WIDTH / 2, 40)

    const hitPipe = s.pipes.some(p =>
      s.bird.x + 12 > p.x && s.bird.x - 12 < p.x + PIPE_W &&
      (s.bird.y - 10 < p.gapY || s.bird.y + 10 > p.gapY + GAP)
    )

     if (s.bird.y > HEIGHT - 10 || s.bird.y < 10 || hitPipe) {
      setBest(prev => {
        const nb = Math.max(prev, scoreRef.current)
        localStorage.setItem('flappy_best', String(nb))
        return nb
      })
      s.playing = false
      setScreen('gameover')
      return
    }

    s.rafId = requestAnimationFrame(drawFrame)
  }, [])

  const flap = () => {
    stateRef.current.bird.vy = FLAP
  }

  const start = () => {
    const s = stateRef.current
    s.bird = { y: HEIGHT / 2, vy: 0, x: 70 }
    s.pipes = []
    s.lastPipe = 0
    s.playing = true
    scoreRef.current = 0
    setScore(0)
    setScreen('playing')
    s.rafId = requestAnimationFrame(drawFrame)
  }

  const bind = () => {
    if (!stateRef.current.playing) return
    flap()
  }

  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">
        <div className="text-center mb-8">
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">arcade classic</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>Flappy Bird</h2>
          <p className="text-purple-400/50 text-sm mt-2">Tap to fly through the pipes</p>
        </div>

        <div className="flex justify-center gap-6 mb-4 text-sm">
          <div className="text-center">
            <div className="text-purple-400/40 text-[10px] uppercase">Score</div>
            <div className="text-2xl font-bold gradient-text">{score}</div>
          </div>
          {best > 0 && (
          <div className="text-center">
            <div className="text-purple-400/40 text-[10px] uppercase">Best</div>
            <div className="text-xl font-bold text-yellow-400/60">{best}</div>
          </div>
          )}
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
            onClick={bind}
            onTouchStart={e => { e.preventDefault(); bind(); }}
          />

          <AnimatePresence>
            {screen === 'idle' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/60"
              >
                <div className="text-5xl mb-4">🐦</div>
                <h3 className="text-white text-xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}>Flappy Bird</h3>
                <p className="text-purple-300/60 text-sm mb-4">Tap anywhere · Navigate the pipes</p>
                <button onClick={start} className="btn-love text-xs px-8 py-2.5">
                  Start Flying
                </button>
              </motion.div>
            )}

            {screen === 'gameover' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70"
              >
                <div className="text-3xl mb-2">💥</div>
                <h3 className="text-white text-xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>Game Over</h3>
                <p className="text-purple-300/60 text-sm mb-1">Pipes passed: {score}</p>
                {best > 0 && <p className="text-yellow-400/50 text-xs mb-3">Best: {best}</p>}
                <button onClick={start} className="btn-love text-xs px-8 py-2.5">
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 text-center text-purple-400/40 text-xs">
          One tap resets your momentum · Time your flaps perfectly
        </div>
      </div>
    </section>
  )
}
