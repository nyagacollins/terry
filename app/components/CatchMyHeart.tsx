'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── CONFIG ────────────────────────────────────────────────
const HER_NAME = 'Hope'

const LEVELS = [
  { speed: 1.6, interval: 1700, need: 8,  bombs: 0, label: 'Easy'         },
  { speed: 2.2, interval: 1450, need: 10, bombs: 0, label: 'Still Easy'   },
  { speed: 2.9, interval: 1250, need: 12, bombs: 1, label: 'Getting Warm' },
  { speed: 3.6, interval: 1050, need: 14, bombs: 2, label: 'Warming Up'   },
  { speed: 4.4, interval: 880,  need: 16, bombs: 3, label: 'Spicy 🌶️'    },
  { speed: 5.3, interval: 720,  need: 18, bombs: 4, label: 'Hot 🔥'       },
  { speed: 6.3, interval: 580,  need: 20, bombs: 5, label: 'Chaos 💥'     },
  { speed: 7.5, interval: 460,  need: 22, bombs: 6, label: 'Impossible!'  },
]

const HEARTS = ['❤️','💜','💕','💖','💗','💓','🧡','💛']
const BOMBS  = ['💔','🖤']
const BEST_KEY = 'catchmyheart_best'

const END_MSGS = [
  { min: 0,  msg: `Aww ${HER_NAME}, you tried! My heart is still yours 💜` },
  { min: 40, msg: `Not bad gummy bear! You caught quite a few 💕` },
  { min: 65, msg: `Wow ${HER_NAME}! You're really good at this 💖` },
  { min: 85, msg: `Amazing!! You caught almost all of my love 💜✨` },
  { min: 95, msg: `PERFECT!! Every piece of my heart is yours ${HER_NAME} 💜💜💜` },
]

interface Item {
  id:        number
  x:         number
  y:         number
  speed:     number
  emoji:     string
  isBomb:    boolean
  isStar:    boolean
  size:      number
  sway:      number
  swaySpeed: number
  age:       number
}

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  color: string; size: number
}

type GameState = 'idle' | 'playing' | 'levelup' | 'gameover' | 'win'

let uid = 0

const BASKET_HALF  = 42
const BASKET_FLOOR = 52

export default function CatchMyHeart() {
  // ── React state — only for UI overlays ──────────────────
  const [screen,   setScreen]   = useState<GameState>('idle')
  const [uiScore,  setUiScore]  = useState(0)
  const [uiLives,  setUiLives]  = useState(3)
  const [uiLevel,  setUiLevel]  = useState(0)
  const [uiCaught, setUiCaught] = useState(0)
  const [uiNeed,   setUiNeed]   = useState(LEVELS[0].need)
  const [uiCombo,  setUiCombo]  = useState('')
  const [endMsg,   setEndMsg]   = useState('')
  const [bestScore, setBestScore] = useState(0)
  const [slowActive, setSlowActive] = useState(false)

  // ── Refs — game loop never touches React state ───────────
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const wrapRef     = useRef<HTMLDivElement>(null)
  const basketRef   = useRef(0)       // px center
  const itemsRef    = useRef<Item[]>([])
  const stateRef    = useRef<GameState>('idle')
  const levelRef    = useRef(0)
  const livesRef    = useRef(3)
  const scoreRef    = useRef(0)
  const caughtRef   = useRef(0)
  const comboRef    = useRef(0)
  const rafRef      = useRef(0)
  const spawnRef    = useRef<ReturnType<typeof setInterval>>()
  const comboTimer  = useRef<ReturnType<typeof setTimeout>>()
  const slowTimer   = useRef<ReturnType<typeof setTimeout>>()
  const shakeTimer  = useRef<ReturnType<typeof setTimeout>>()
  const slowRef     = useRef(false)
  const particlesRef = useRef<Particle[]>([])
  const W           = useRef(0)
  const H           = useRef(0)

  // ── Load best score ─────────────────────────────────────
  useEffect(() => {
    const saved = parseInt(localStorage.getItem(BEST_KEY) ?? '0', 10)
    if (!isNaN(saved)) setBestScore(saved)
  }, [])

  // ── Canvas setup & resize ────────────────────────────────
  const resize = useCallback(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return
    const r  = wrap.getBoundingClientRect()
    W.current = r.width
    H.current = r.height
    canvas.width  = r.width  * devicePixelRatio
    canvas.height = r.height * devicePixelRatio
    canvas.style.width  = `${r.width}px`
    canvas.style.height = `${r.height}px`
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(devicePixelRatio, devicePixelRatio)
    if (basketRef.current === 0) basketRef.current = r.width / 2
  }, [])

  useEffect(() => {
    resize()
    const ro = new ResizeObserver(resize)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [resize])

  // ── Basket control ───────────────────────────────────────
  useEffect(() => {
    const move = (cx: number) => {
      if (!wrapRef.current) return
      const r = wrapRef.current.getBoundingClientRect()
      basketRef.current = Math.max(24, Math.min(W.current - 24, cx - r.left))
    }
    const onMouse = (e: MouseEvent) => move(e.clientX)
    const onTouch = (e: TouchEvent) => {
      // Only hijack touch when the game is actively playing
      if (stateRef.current !== 'playing') return
      e.preventDefault()
      move(e.touches[0].clientX)
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: false })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  // ── Spawn ────────────────────────────────────────────────
  const spawnItem = useCallback(() => {
    if (stateRef.current !== 'playing') return
    const cfg    = LEVELS[levelRef.current]
    const isStar = Math.random() < 0.06
    const isBomb = !isStar && cfg.bombs > 0 && Math.random() < cfg.bombs / (cfg.bombs + 6)
    itemsRef.current.push({
      id:        uid++,
      x:         28 + Math.random() * (W.current - 56),
      y:         -36,
      speed:     cfg.speed * (0.78 + Math.random() * 0.44),
      emoji:     isStar ? '⭐' : isBomb ? BOMBS[Math.floor(Math.random() * BOMBS.length)]
                                        : HEARTS[Math.floor(Math.random() * HEARTS.length)],
      isBomb,
      isStar,
      size:      isStar ? 28 : isBomb ? 26 : 22 + Math.random() * 14,
      sway:      (Math.random() - 0.5) * 55,
      swaySpeed: 0.018 + Math.random() * 0.022,
      age:       0,
    })
  }, [])

  // ── Shake helper ─────────────────────────────────────────
  const triggerShake = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    wrap.style.transform = `translate(${(Math.random()-0.5)*10}px, ${(Math.random()-0.5)*6}px)`
    clearTimeout(shakeTimer.current)
    shakeTimer.current = setTimeout(() => { if (wrapRef.current) wrapRef.current.style.transform = '' }, 120)
  }, [])

  // ── Particle burst ───────────────────────────────────────
  const burstParticles = useCallback((x: number, y: number) => {
    const colors = ['#ff6b9d','#c084fc','#fde68a','#f9a8d4','#a78bfa']
    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.4
      const speed = 1.5 + Math.random() * 3
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 1, maxLife: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3,
      })
    }
  }, [])

  // ── End game helper ──────────────────────────────────────
  const endGame = useCallback((next: GameState) => {
    cancelAnimationFrame(rafRef.current)
    clearInterval(spawnRef.current)
    itemsRef.current = []
    particlesRef.current = []
    slowRef.current = false
    setSlowActive(false)
    stateRef.current = next
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, W.current, H.current)
    }
    setBestScore(prev => {
      const newBest = Math.max(prev, scoreRef.current)
      localStorage.setItem(BEST_KEY, String(newBest))
      return newBest
    })
    if (next === 'win') {
      const total = LEVELS.reduce((a, l) => a + l.need, 0)
      const pct   = Math.round((scoreRef.current / total) * 100)
      const msg   = [...END_MSGS].reverse().find(m => pct >= m.min)?.msg ?? END_MSGS[0].msg
      setEndMsg(msg)
    }
    setScreen(next)
  }, [])

  // ── Draw one frame ───────────────────────────────────────
  const drawFrame = useCallback(() => {    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = W.current, h = H.current

    // Clear
    ctx.clearRect(0, 0, w, h)

    const survived: Item[] = []

    for (const item of itemsRef.current) {
      item.y   += item.speed
      item.age += 1
      const drawX = item.x + item.sway * Math.sin(item.age * item.swaySpeed)

      // Collision zone
      if (item.y >= h - BASKET_FLOOR) {
        const bx  = basketRef.current
        const hit = Math.abs(drawX - bx) < BASKET_HALF + item.size * 0.28

        if (hit) {
          if (item.isStar) {
            // Power-up: 50% extra life, 50% slow time
            if (Math.random() < 0.5 && livesRef.current < 5) {
              livesRef.current += 1
              setUiLives(livesRef.current)
              setUiCombo('Extra Life! ❤️')
            } else {
              slowRef.current = true
              setSlowActive(true)
              setUiCombo('Slow Time! ⭐')
              clearTimeout(slowTimer.current)
              slowTimer.current = setTimeout(() => {
                slowRef.current = false
                setSlowActive(false)
              }, 3000)
            }
            clearTimeout(comboTimer.current)
            comboTimer.current = setTimeout(() => setUiCombo(''), 1000)
            burstParticles(basketRef.current, h - BASKET_FLOOR)
          } else if (item.isBomb) {
            const nl = Math.max(0, livesRef.current - 1)
            livesRef.current = nl
            comboRef.current = 0
            setUiLives(nl)
            setUiCombo('')
            triggerShake()
            if (nl <= 0) { endGame('gameover'); return }
          } else {
            comboRef.current += 1
            const pts = comboRef.current >= 5 ? 3 : comboRef.current >= 3 ? 2 : 1
            scoreRef.current += pts
            caughtRef.current += 1
            setUiScore(scoreRef.current)
            setUiCaught(caughtRef.current)
            burstParticles(basketRef.current, h - BASKET_FLOOR)
            if (comboRef.current >= 3) {
              clearTimeout(comboTimer.current)
              setUiCombo(`${comboRef.current}× COMBO! 🔥`)
              comboTimer.current = setTimeout(() => setUiCombo(''), 750)
            }
            if (caughtRef.current >= LEVELS[levelRef.current].need) {
              if (levelRef.current >= LEVELS.length - 1) { endGame('win'); return }
              else { endGame('levelup'); return }
            }
          }
        } else {
          if (!item.isBomb && !item.isStar) {
            const nl = Math.max(0, livesRef.current - 1)
            livesRef.current = nl
            comboRef.current = 0
            setUiLives(nl)
            setUiCombo('')
            triggerShake()
            if (nl <= 0) { endGame('gameover'); return }
          }
        }
        continue
      }

      if (item.y < h + 20) {
        // Apply slow-mo to falling speed
        if (slowRef.current) { item.y -= item.speed * 0.6 }
        ctx.font      = `${item.size}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = item.isBomb ? 'rgba(224,92,92,0.85)' : item.isStar ? 'rgba(253,230,138,0.95)' : 'rgba(200,168,233,0.75)'
        ctx.shadowBlur  = item.isStar ? 18 : 10
        ctx.fillText(item.emoji, drawX, item.y)
        ctx.shadowBlur  = 0
        survived.push(item)
      }
    }

    // Draw particles
    particlesRef.current = particlesRef.current.filter(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.life -= 0.045
      if (p.life <= 0) return false
      ctx.globalAlpha = p.life
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      return true
    })
    ctx.globalAlpha = 1

    // Draw basket
    const bx = basketRef.current
    ctx.font         = '38px serif'
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor  = 'rgba(200,168,233,0.5)'
    ctx.shadowBlur   = 14
    ctx.fillText('🧺', bx, h - 22)
    ctx.shadowBlur   = 0

    itemsRef.current = survived
  }, [burstParticles, triggerShake, endGame]) // eslint-disable-line

  // ── RAF loop ─────────────────────────────────────────────
  const loop = useCallback(() => {
    if (stateRef.current !== 'playing') return
    drawFrame()
    rafRef.current = requestAnimationFrame(loop)
  }, [drawFrame])

  // ── Start game ───────────────────────────────────────────
  const startGame = useCallback(() => {
    resize()
    cancelAnimationFrame(rafRef.current)
    clearInterval(spawnRef.current)
    itemsRef.current  = []
    uid               = 0
    livesRef.current  = 3
    scoreRef.current  = 0
    caughtRef.current = 0
    comboRef.current  = 0
    levelRef.current  = 0
    basketRef.current = W.current / 2 || 180
    setUiLives(3); setUiScore(0); setUiCaught(0)
    setUiLevel(0); setUiNeed(LEVELS[0].need)
    setUiCombo(''); setEndMsg('')
    stateRef.current = 'playing'
    setScreen('playing')
    rafRef.current   = requestAnimationFrame(loop)
    spawnRef.current = setInterval(spawnItem, LEVELS[0].interval)
  }, [resize, loop, spawnItem])

  // ── Next level ───────────────────────────────────────────
  const nextLevel = useCallback(() => {
    const nl = levelRef.current + 1
    levelRef.current  = nl
    caughtRef.current = 0
    comboRef.current  = 0
    itemsRef.current  = []
    setUiLevel(nl); setUiCaught(0); setUiNeed(LEVELS[nl].need); setUiCombo('')
    stateRef.current = 'playing'
    setScreen('playing')
    rafRef.current   = requestAnimationFrame(loop)
    spawnRef.current = setInterval(spawnItem, LEVELS[nl].interval)
  }, [loop, spawnItem])

  // ── Cleanup on unmount ───────────────────────────────────
  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current)
    clearInterval(spawnRef.current)
    clearTimeout(slowTimer.current)
    clearTimeout(shakeTimer.current)
  }, [])

  const cfg = LEVELS[Math.min(uiLevel, LEVELS.length - 1)]

  // ── Render ───────────────────────────────────────────────
  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">mini game</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Catch My Heart
          </h2>
          <p className="text-purple-400/50 text-sm mt-2">Catch the hearts · Dodge the broken ones</p>
        </motion.div>

        {/* Game wrapper */}
        <div
          ref={wrapRef}
          className="relative rounded-2xl overflow-hidden w-full"
          style={{
            height: '460px',
            background: 'linear-gradient(180deg, #080112 0%, #120228 50%, #1a0840 100%)',
            border: '1px solid rgba(200,168,233,0.1)',
            boxShadow: '0 0 50px rgba(155,109,189,0.1)',
            touchAction: screen === 'playing' ? 'none' : 'auto',
            userSelect: 'none',
          }}
        >
          {/* Static star dots */}
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white pointer-events-none"
              style={{
                left:    `${(i * 11 + 3) % 96}%`,
                top:     `${(i * 17 + 6) % 90}%`,
                width:   `${0.5 + (i % 5) * 0.3}px`,
                height:  `${0.5 + (i % 5) * 0.3}px`,
                opacity: 0.1 + (i % 6) * 0.06,
              }}
            />
          ))}

          {/* Canvas — full size, all game drawing happens here */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          />

          {/* ── HUD — only shown while playing ── */}
          {screen === 'playing' && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Top bar */}
              <div className="flex items-center justify-between px-3 pt-2.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: Math.max(3, uiLives) }).map((_, i) => (
                    <span key={i} style={{ fontSize: '13px', opacity: i < uiLives ? 1 : 0.15 }}>❤️</span>
                  ))}
                </div>
                <div className="text-center">
                  <div className="text-purple-400/50 text-[8px] tracking-widest uppercase">Lv {uiLevel + 1}</div>
                  <div className="text-purple-200/70 text-[10px] font-semibold">{cfg.label}</div>
                </div>
                <div className="text-right">
                  <div className="text-purple-400/50 text-[8px] tracking-widest uppercase">Score</div>
                  <div className="text-purple-200/85 text-sm font-bold">{uiScore}</div>
                  {bestScore > 0 && <div className="text-yellow-400/50 text-[7px]">best {bestScore}</div>}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mx-3 mt-1.5 h-[3px] rounded-full"
                style={{ background: 'rgba(200,168,233,0.07)' }}>
                <div className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${(uiCaught / uiNeed) * 100}%`,
                    background: 'linear-gradient(90deg, #9b6dbd, #f4845f)',
                  }} />
              </div>
              <div className="text-right pr-3 mt-0.5 text-purple-400/30 text-[8px]">
                {uiCaught}/{uiNeed}
              </div>

              {/* Combo */}
              <AnimatePresence>
                {uiCombo && (
                  <motion.div
                    key={uiCombo}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1,   y: 0   }}
                    exit={{    opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                    style={{
                      color: uiCombo.includes('⭐') || uiCombo.includes('❤️') ? '#86efac' : '#fde68a',
                      fontWeight: 800,
                      fontSize: '14px',
                      textShadow: '0 0 18px rgba(253,230,138,0.95)',
                    }}
                  >
                    {uiCombo}
                  </motion.div>
                )}
              {slowActive && (
                  <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-yellow-300/70 text-[9px] tracking-widest uppercase pointer-events-none">
                    ⭐ slow time
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* ── IDLE ── */}
          <AnimatePresence>
            {screen === 'idle' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-20"
              >
                <motion.div
                  animate={{ y: [0, -11, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ fontSize: '50px', lineHeight: 1 }}
                  className="mb-5"
                >
                  💜
                </motion.div>
                <h3 className="text-white text-lg font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Catch My Heart, {HER_NAME}!
                </h3>
                <p className="text-purple-300/55 text-xs leading-relaxed mb-1">
                  Slide your finger or mouse to move the basket
                </p>
                <p className="text-purple-400/40 text-xs leading-relaxed mb-7">
                  Catch ❤️ hearts &nbsp;·&nbsp; Dodge 💔 broken hearts &nbsp;·&nbsp; {LEVELS.length} levels
                </p>
                <motion.button
                  onClick={startGame}
                  className="btn-love px-10 py-3"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Start Playing 💕
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── LEVEL UP ── */}
          <AnimatePresence>
            {screen === 'levelup' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-20"
                style={{ background: 'rgba(8,1,18,0.93)' }}
              >
                <motion.div
                  animate={{ rotate: [0, 14, -14, 0], scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  style={{ fontSize: '46px' }} className="mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-white text-xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Level {uiLevel + 1} Complete!
                </h3>
                <p className="text-purple-300/60 text-sm mb-1">
                  Score: <span className="text-purple-100 font-bold">{uiScore}</span>
                </p>
                <p className="text-orange-400/75 text-xs mb-7 font-medium">
                  Next: <span className="font-bold">{LEVELS[uiLevel + 1]?.label}</span> — getting harder 😈
                </p>
                <motion.button
                  onClick={nextLevel}
                  className="btn-love px-10 py-3"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Level {uiLevel + 2} →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── GAME OVER ── */}
          <AnimatePresence>
            {screen === 'gameover' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-20"
                style={{ background: 'rgba(8,1,18,0.95)' }}
              >
                <div style={{ fontSize: '46px' }} className="mb-4">💔</div>
                <h3 className="text-white text-xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Game Over
                </h3>
                <p className="text-purple-300/60 text-sm mb-0.5">
                  Level {uiLevel + 1} · Score: <span className="text-purple-100 font-bold">{uiScore}</span>
                </p>
                {uiScore >= bestScore && bestScore > 0 && (
                  <p className="text-yellow-400/80 text-xs font-bold">🏆 New Best Score!</p>
                )}
                <p className="text-purple-300/50 text-sm italic mt-3 mb-7"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.05rem' }}>
                  Don&apos;t worry {HER_NAME}, my heart is still yours 💜
                </p>
                <motion.button
                  onClick={startGame}
                  className="btn-love px-10 py-3"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Try Again 💕
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── WIN ── */}
          <AnimatePresence>
            {screen === 'win' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-20 overflow-hidden"
                style={{ background: 'rgba(8,1,18,0.93)' }}
              >
                {HEARTS.map((h, i) => (
                  <motion.div key={i} className="absolute pointer-events-none"
                    style={{ left: `${(i * 12 + 4) % 90}%`, fontSize: '18px' }}
                    initial={{ top: '-8%', opacity: 1 }}
                    animate={{ top: '108%', opacity: [1, 1, 0] }}
                    transition={{ duration: 2 + (i % 4) * 0.5, delay: i * 0.2, ease: 'linear', repeat: Infinity }}
                  >{h}</motion.div>
                ))}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  style={{ fontSize: '50px' }} className="mb-4 relative z-10"
                >💜</motion.div>
                <h3 className="text-white text-xl font-bold mb-1 relative z-10"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  You Won, {HER_NAME}! 🎉
                </h3>
                <p className="text-purple-200/80 text-sm mb-1 relative z-10">
                  Final Score: <span className="font-bold text-purple-100">{uiScore}</span>
                </p>
                {uiScore >= bestScore && bestScore > 0 && (
                  <p className="text-yellow-400/80 text-xs font-bold mb-1 relative z-10">🏆 New Best Score!</p>
                )}
                {bestScore > 0 && (
                  <p className="text-purple-400/50 text-[10px] mb-1 relative z-10">Best: {bestScore}</p>
                )}
                <p className="text-purple-300/65 text-sm italic mb-7 max-w-xs leading-relaxed relative z-10"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.05rem' }}>
                  {endMsg}
                </p>
                <motion.button
                  onClick={startGame}
                  className="btn-love px-10 py-3 relative z-10"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Play Again 💕
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <AnimatePresence>
          {screen === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-5 mt-4 text-purple-400/35 text-xs"
            >
              <span>❤️ catch = +1 pt</span>
              <span>🔥 combo = bonus</span>
              <span>⭐ power-up!</span>
              <span>💔 dodge it!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
