'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COLS = 20
const ROWS = 20
const CELL = 22
const WIDTH = COLS * CELL
const HEIGHT = ROWS * CELL
const BEST_KEY = 'snake_best'

type Dir = { x: number; y: number }
type Cell = { x: number; y: number }

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [screen, setScreen] = useState<'idle' | 'playing' | 'gameover'>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [movesMade, setMovesMade] = useState(0)

  const gameRef = useRef<{
    snake: Cell[]
    dir: Dir
    food: Cell
    nextDir: Dir
    speed: number
    lastUpdate: number
    rafId: number
    gameOver: boolean
  }>({
    snake: [{ x: 9, y: 9 }, { x: 8, y: 9 }, { x: 7, y: 9 }],
    dir: { x: 1, y: 0 },
    food: { x: 5, y: 5 },
    nextDir: { x: 1, y: 0 },
    speed: 150,
    lastUpdate: 0,
    rafId: 0,
    gameOver: false,
  })

  useEffect(() => {
    const saved = parseInt(localStorage.getItem(BEST_KEY) ?? '0', 10)
    if (!isNaN(saved)) setBest(saved)
  }, [])

  const randomFood = useCallback((snake: Cell[]): Cell => {
    const empty: Cell[] = []
    for (let y = 0; y < ROWS; y++)
      for (let x = 0; x < COLS; x++)
        if (!snake.some(s => s.x === x && s.y === y)) empty.push({ x, y })
    if (empty.length === 0) return { x: 0, y: 0 }
    return empty[Math.floor(Math.random() * empty.length)]
  }, [])

  const draw = useCallback((t: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    const g = gameRef.current

    if (g.gameOver) return

    if (!g.lastUpdate) g.lastUpdate = t
    const dt = t - g.lastUpdate

    if (dt >= g.speed) {
      g.lastUpdate = t

      g.dir = g.nextDir
      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y }

      if (head.x < 0) head.x = COLS - 1
      if (head.x >= COLS) head.x = 0
      if (head.y < 0) head.y = ROWS - 1
      if (head.y >= ROWS) head.y = 0

      if (g.snake.some(s => s.x === head.x && s.y === head.y)) {
        g.gameOver = true
        setScore(g.snake.length - 3)
        setBest(prev => {
          const nb = Math.max(prev, g.snake.length - 3)
          localStorage.setItem(BEST_KEY, String(nb))
          return nb
        })
        setScreen('gameover')
        cancelAnimationFrame(g.rafId)
        return
      }

      g.snake.unshift(head)

      if (head.x === g.food.x && head.y === g.food.y) {
        g.food = randomFood(g.snake)
        g.speed = Math.max(60, g.speed - 5)
        setScore(g.snake.length - 2)
      } else {
        g.snake.pop()
      }
    }

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT)
    grad.addColorStop(0, '#0e0120')
    grad.addColorStop(1, '#1a0840')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    ctx.fillStyle = '#e05c5c'
    ctx.beginPath()
    ctx.arc(g.food.x * CELL + CELL / 2, g.food.y * CELL + CELL / 2, CELL / 3, 0, Math.PI * 2)
    ctx.fill()

    g.snake.forEach((seg, i) => {
      const hue = 260 - (i / g.snake.length) * 60
      ctx.fillStyle = `hsl(${hue}, 70%, 60%)`
      ctx.strokeStyle = 'rgba(200,168,233,0.2)'
      ctx.lineWidth = 0.5
      ctx.fillRect(seg.x * CELL, seg.y * CELL, CELL - 1, CELL - 1)
      ctx.strokeRect(seg.x * CELL, seg.y * CELL, CELL - 1, CELL - 1)
    })

    g.rafId = requestAnimationFrame(draw)
  }, [best, randomFood])

  // Touch control: swipe detection
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const d = gameRef.current.nextDir
      switch (e.key) {
        case 'ArrowUp':    if (d.y !== 1) gameRef.current.nextDir = { x: 0, y: -1 }; break
        case 'ArrowDown':  if (d.y !== -1) gameRef.current.nextDir = { x: 0, y: 1 }; break
        case 'ArrowLeft':  if (d.x !== 1) gameRef.current.nextDir = { x: -1, y: 0 }; break
        case 'ArrowRight': if (d.x !== -1) gameRef.current.nextDir = { x: 1, y: 0 }; break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const start = () => {
    const g = gameRef.current
    g.snake = [{ x: 9, y: 9 }, { x: 8, y: 9 }, { x: 7, y: 9 }]
    g.dir = { x: 1, y: 0 }
    g.nextDir = { x: 1, y: 0 }
    g.food = randomFood(g.snake)
    g.speed = 150
    g.lastUpdate = 0
    g.gameOver = false
    setScore(0)
    setMovesMade(0)
    setScreen('playing')
    g.rafId = requestAnimationFrame(draw)
  }

  const reset = () => {
    cancelAnimationFrame(gameRef.current.rafId)
    gameRef.current.gameOver = true
    setScreen('idle')
  }

  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">
        <div className="text-center mb-8">
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">arcade classic</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>Snake</h2>
           <p className="text-purple-400/50 text-sm mt-2">Eat the red dots · Don't hit yourself</p>
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
          ref={wrapRef}
          className="relative rounded-2xl overflow-hidden w-full mx-auto"
          style={{
            width: WIDTH,
            height: HEIGHT,
            maxWidth: '100%',
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
            onClick={() => {
              if (screen === 'idle') start()
              else if (screen === 'gameover') start()
            }}
            style={{ cursor: 'pointer' }}
          />

          <AnimatePresence>
            {screen === 'idle' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70"
              >
                <div className="text-4xl mb-4">🐍</div>
                <h3 className="text-white text-lg font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}>Feed the Snake</h3>
                <p className="text-purple-300/60 text-xs mb-4">Arrow keys to steer · Tap to start</p>
                <div className="flex gap-4 text-xs text-purple-400/50">
                  <span>🎮 Arrow keys</span>
                  <span>📱 Swipe</span>
                </div>
              </motion.div>
            )}

            {screen === 'gameover' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70"
              >
                <div className="text-3xl mb-2">💀</div>
                <h3 className="text-white text-xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>Game Over</h3>
                <p className="text-purple-300/60 text-sm mb-1">Score: {score}</p>
                {best > 0 && <p className="text-yellow-400/50 text-xs mb-3">Best: {best}</p>}
                <button onClick={start} className="btn-love text-xs px-8 py-2.5">
                  Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 text-center text-purple-400/40 text-xs">
          Eat dots to grow · Avoid walls wrap around · Get longer for more points
        </div>
      </div>
    </section>
  )
}
