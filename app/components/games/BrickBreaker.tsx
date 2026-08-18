'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WIDTH = 480
const HEIGHT = 320
const PADDLE_W = 90
const PADDLE_H = 16
const BALL_R = 10
const ROWS = 6
const COLS = 9
const BRICK_W = (WIDTH - 40) / COLS
const BRICK_H = 22

const COLORS = ['#e05c5c', '#f4845f', '#c8a8e9', '#9b6dbd', '#f7b8c8']

interface Ball { x: number; y: number; vx: number; vy: number }
interface Paddle { x: number; width: number }
interface Brick { x: number; y: number; w: number; h: number; hp: number; color: string }

export default function BrickBreaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [screen, setScreen] = useState<'idle' | 'playing' | 'gameover'>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [lives, setLives] = useState(3)

  const stateRef = useRef<{
    ball: Ball
    paddle: Paddle
    bricks: Brick[]
    rafId: number
    gameOver: boolean
  }>({
    ball: { x: WIDTH / 2, y: HEIGHT - 60, vx: 3, vy: -5 },
    paddle: { x: WIDTH / 2, width: PADDLE_W },
    bricks: [],
    rafId: 0,
    gameOver: false,
  })
  const scoreRef = useRef(0)
  const livesRef = useRef(3)
  const bestRef = useRef(0)

  useEffect(() => {
    const saved = parseInt(localStorage.getItem('breaker_best') ?? '0', 10)
    if (!isNaN(saved)) {
      setBest(saved)
      bestRef.current = saved
    }
  }, [])

  const setupBricks = useCallback(() => {
    const bricks: Brick[] = []
    const offsetX = 20
    const offsetY = 40
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        bricks.push({
          x: offsetX + c * BRICK_W,
          y: offsetY + r * (BRICK_H + 4),
          w: BRICK_W - 4,
          h: BRICK_H,
          hp: r < 2 ? 2 : 1,
          color: COLORS[r % COLORS.length],
        })
      }
    }
    return bricks
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    const s = stateRef.current

    if (s.gameOver) return

    s.ball.x += s.ball.vx
    s.ball.y += s.ball.vy

    if (s.ball.x < BALL_R) { s.ball.x = BALL_R; s.ball.vx *= -1 }
    if (s.ball.x > WIDTH - BALL_R) { s.ball.x = WIDTH - BALL_R; s.ball.vx *= -1 }
    if (s.ball.y < BALL_R) { s.ball.y = BALL_R; s.ball.vy *= -1 }

    if (s.ball.y > HEIGHT - BALL_R) {
      const px = s.paddle.x
      const pw = s.paddle.width
      if (s.ball.x > px - pw / 2 && s.ball.x < px + pw / 2) {
        s.ball.y = HEIGHT - BALL_R - PADDLE_H - 2
        s.ball.vy *= -1
        const offset = (s.ball.x - px) / (pw / 2)
        s.ball.vx = offset * 4
        s.ball.vx = Math.max(-5, Math.min(5, s.ball.vx))
      } else {
        setLives(l => {
          const nl = l - 1
          livesRef.current = nl
          if (nl <= 0) {
            setScreen('gameover')
            s.gameOver = true
            setBest(prev => {
              const nb = Math.max(prev, scoreRef.current)
              localStorage.setItem('breaker_best', String(nb))
              bestRef.current = nb
              return nb
            })
          } else {
            s.ball = { x: px, y: HEIGHT - 60, vx: 3 * (Math.random() > 0.5 ? 1 : -1), vy: -5 }
          }
          return nl
        })
        return
      }
    }

    s.bricks = s.bricks.filter(b => {
      const hit =
        s.ball.x + BALL_R > b.x &&
        s.ball.x - BALL_R < b.x + b.w &&
        s.ball.y + BALL_R > b.y &&
        s.ball.y - BALL_R < b.y + b.h
      if (hit) {
        b.hp--
        s.ball.vy *= -1
        setScore(sc => {
          const ns = sc + 10
          scoreRef.current = ns
          return ns
        })
        const angle = Math.atan2(s.ball.vy, s.ball.vx) + (Math.random() - 0.5) * 0.4
        const speed = Math.sqrt(s.ball.vx ** 2 + s.ball.vy ** 2) * 1.05
        s.ball.vx = Math.cos(angle) * speed
        s.ball.vy = Math.sin(angle) * speed
      }
      return b.hp > 0
    })

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    const bg = ctx.createLinearGradient(0, 0, 0, HEIGHT)
    bg.addColorStop(0, '#080112')
    bg.addColorStop(1, '#120228')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    s.bricks.forEach(b => {
      ctx.fillStyle = b.color
      ctx.fillRect(b.x, b.y, b.w, b.h)
      ctx.strokeStyle = 'rgba(0,0,0,0.3)'
      ctx.lineWidth = 1
      ctx.strokeRect(b.x, b.y, b.w, b.h)
      if (b.hp === 1) {
        ctx.strokeStyle = 'rgba(0,0,0,0.15)'
        ctx.lineWidth = 1
        ctx.setLineDash([3, 3])
        ctx.strokeRect(b.x, b.y, b.w, b.h)
        ctx.setLineDash([])
      }
    })

    ctx.fillStyle = '#2ecc71'
    ctx.fillRect(s.paddle.x - s.paddle.width / 2, HEIGHT - PADDLE_H - 4, s.paddle.width, PADDLE_H)
    ctx.strokeStyle = '#27ae60'
    ctx.strokeRect(s.paddle.x - s.paddle.width / 2, HEIGHT - PADDLE_H - 4, s.paddle.width, PADDLE_H)

    const grad = ctx.createRadialGradient(s.ball.x, s.ball.y, 0, s.ball.x, s.ball.y, BALL_R)
    grad.addColorStop(0, '#f4845f')
    grad.addColorStop(1, '#e05c5c')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(s.ball.x, s.ball.y, BALL_R, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#c8a8e9'
    ctx.font = '14px monospace'
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${scoreRef.current}`, 8, 20)
    ctx.fillText(`Best: ${bestRef.current}`, 8, 38)
    ctx.fillStyle = '#f7b8c8'
    ctx.fillText('❤️'.repeat(livesRef.current), WIDTH - 80, 20)

    s.rafId = requestAnimationFrame(draw)
  }, [])

  const followMouse = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    stateRef.current.paddle.x = Math.max(PADDLE_W / 2, Math.min(WIDTH - PADDLE_W / 2, x))
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (stateRef.current.gameOver) return
      followMouse(e)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [followMouse])

  const start = () => {
    const s = stateRef.current
    s.ball = { x: WIDTH / 2, y: HEIGHT - 60, vx: 3, vy: -5 }
    s.paddle = { x: WIDTH / 2, width: PADDLE_W }
    s.bricks = setupBricks()
    s.gameOver = false
    scoreRef.current = 0
    livesRef.current = 3
    setScore(0)
    setLives(3)
    setScreen('playing')
    s.rafId = requestAnimationFrame(draw)
  }

  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">
        <div className="text-center mb-8">
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">arcade classic</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>Brick Breaker</h2>
          <p className="text-purple-400/50 text-sm mt-2">Break all the bricks</p>
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
          <div className="text-center">
            <div className="text-purple-400/40 text-[10px] uppercase">Lives</div>
            <div className="text-2xl">{'❤️'.repeat(lives)}</div>
          </div>
        </div>

        <div
          ref={wrapRef}
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
            onClick={() => {
              if (screen === 'idle' || screen === 'gameover') start()
            }}
            style={{ cursor: 'pointer' }}
          />

          <AnimatePresence>
            {(screen === 'idle' || screen === 'gameover') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70"
              >
                {screen === 'gameover' ? (
                  <>
                    <div className="text-3xl mb-2">💥</div>
                    <h3 className="text-white text-xl font-bold mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}>Game Over</h3>
                    <p className="text-purple-300/60 text-sm mb-1">Score: {score}</p>
                    {best > score && <p className="text-yellow-400/50 text-xs mb-2">Best: {best}</p>}
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-4">🧱</div>
                    <h3 className="text-white text-xl font-bold mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}>Brick Breaker</h3>
                    <p className="text-purple-300/60 text-sm mb-4">Move your mouse to control the paddle</p>
                  </>
                )}
                <button onClick={start} className="btn-love text-xs px-10 py-3">
                  {screen === 'gameover' ? 'Play Again' : 'Start Breaking'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 text-center text-purple-400/40 text-xs">
          Move mouse to control paddle · Bricks with hearts take double hits
        </div>
      </div>
    </section>
  )
}
