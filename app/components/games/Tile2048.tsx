'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SIZE = 4
const BEST_KEY = 'game_2048_best'

type Grid = number[][]
type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

function createGrid(): Grid {
  const g = Array.from({ length: SIZE }, () => Array(SIZE).fill(0))
  addRandom(g)
  addRandom(g)
  return g
}

function addRandom(grid: Grid) {
  const empty: [number, number][] = []
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (grid[r][c] === 0) empty.push([r, c])
  if (empty.length === 0) return
  const [r, c] = empty[Math.floor(Math.random() * empty.length)]
  grid[r][c] = Math.random() < 0.9 ? 2 : 4
}

function slideLeft(grid: Grid): { grid: Grid; score: number } {
  let score = 0
  const newGrid = grid.map(row => {
    const arr = row.filter(v => v > 0)
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2
        score += arr[i]
        arr.splice(i + 1, 1)
      }
    }
    while (arr.length < SIZE) arr.push(0)
    return arr
  })
  return { grid: newGrid, score }
}

function rotate(grid: Grid): Grid {
  const n = grid.length
  const result = Array.from({ length: n }, () => Array(n).fill(0))
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      result[c][n - 1 - r] = grid[r][c]
  return result
}

function move(grid: Grid, dir: Direction): { grid: Grid; score: number; moved: boolean } {
  let g = grid
  if (dir === 'ArrowRight') g = rotate(rotate(rotate(g)))
  else if (dir === 'ArrowDown') g = rotate(rotate(g))
  else if (dir === 'ArrowUp') g = rotate(g)

  const { grid: newG, score } = slideLeft(g)
  let result = newG

  if (dir === 'ArrowRight') result = rotate(result)
  else if (dir === 'ArrowDown') result = rotate(rotate(result))
  else if (dir === 'ArrowUp') result = rotate(rotate(rotate(result)))

  const moved = JSON.stringify(grid) !== JSON.stringify(result)
  return { grid: result, score, moved }
}

function hasWon(grid: Grid): boolean {
  return grid.some(row => row.some(v => v === 2048))
}

function lost(grid: Grid): boolean {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === 0) return false
      if (c + 1 < SIZE && grid[r][c] === grid[r][c + 1]) return false
      if (r + 1 < SIZE && grid[r][c] === grid[r + 1][c]) return false
    }
  return true
}

function tileColor(v: number): string {
  const colors: Record<number, string> = {
    2: '#f7b8c8', 4: '#f1a8d4', 8: '#f4845f', 16: '#e05c5c',
    32: '#ff6b9d', 64: '#ff4757', 128: '#c8a8e9', 256: '#9b6dbd',
    512: '#7a4ed2', 1024: '#5b3a9e', 2048: '#2ecc71',
  }
  return colors[v] || '#888'
}

export default function Tile2048() {
  const [grid, setGrid] = useState<Grid>(createGrid())
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [won, setWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [moved, setMoved] = useState(false)

  useEffect(() => {
    const saved = parseInt(localStorage.getItem(BEST_KEY) ?? '0', 10)
    if (!isNaN(saved)) setBest(saved)
  }, [])

  const handleKey = (e: KeyboardEvent) => {
    if (gameOver || won) return
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return

    const { grid: newGrid, score: sc, moved: m } = move(grid, e.key as Direction)
    if (!m) return
    setMoved(true)
    setTimeout(() => setMoved(false), 120)

    addRandom(newGrid)
    setGrid(newGrid)
    setScore(s => s + sc)

    if (hasWon(newGrid)) {
      setWon(true)
      setTimeout(() => setWon(false), 3000)
    }
    if (lost(newGrid)) setGameOver(true)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [grid, gameOver, won, score])

  useEffect(() => {
    if (score > best) {
      setBest(score)
      localStorage.setItem(BEST_KEY, String(score))
    }
  }, [score, best])

  const restart = () => {
    setGrid(createGrid)
    setScore(0)
    setGameOver(false)
    setWon(false)
  }

  const swipeDir = (e: React.TouchEvent, startX: number, startY: number, endX: number, endY: number) => {
    const dx = endX - startX
    const dy = endY - startY
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 30) return 'ArrowRight'
      if (dx < -30) return 'ArrowLeft'
    } else {
      if (dy > 30) return 'ArrowDown'
      if (dy < -30) return 'ArrowUp'
    }
    return null
  }

  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">
        <div className="text-center mb-8">
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">puzzle</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>2048</h2>
          <p className="text-purple-400/50 text-sm mt-2">Swipe / Arrow keys to merge tiles</p>
        </div>

        <div className="flex justify-center gap-6 mb-6 text-sm">
          <div className="text-center">
            <div className="text-purple-400/40 text-[10px] uppercase">Score</div>
            <div className="text-xl font-bold gradient-text">{score}</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400/40 text-[10px] uppercase">Best</div>
            <div className="text-xl font-bold text-yellow-400/60">{best}</div>
          </div>
        </div>

        <div
          className="relative touch-none mx-auto"
          style={{
            width: SIZE * 70,
            height: SIZE * 70,
            background: '#0e0120',
            borderRadius: '12px',
            padding: '8px',
            border: '1px solid rgba(200,168,233,0.15)',
          }}
          onTouchStart={e => {
            const t = e.touches[0]
            ;(e.currentTarget as any)._startX = t.clientX
            ;(e.currentTarget as any)._startY = t.clientY
          }}
          onTouchEnd={e => {
            const startX = (e.currentTarget as any)._startX
            const startY = (e.currentTarget as any)._startY
            if (startX === undefined) return
            const touch = e.changedTouches[0]
            const dir = swipeDir(e, startX, startY, touch.clientX, touch.clientY)
            if (dir) handleKey({ key: dir } as KeyboardEvent)
          }}
        >
          {grid.map((row, r) =>
            row.map((v, c) => (
              <div
                key={`${r}-${c}`}
                className="absolute rounded-lg flex items-center justify-center font-bold transition-all"
                style={{
                  left: c * 70 + 8,
                  top: r * 70 + 8,
                  width: 62,
                  height: 62,
                  background: v > 0 ? tileColor(v) : 'rgba(200,168,233,0.05)',
                  border: v > 0 ? 'none' : '1px dashed rgba(200,168,233,0.1)',
                  color: v > 0 && v < 8 ? '#1a0533' : v > 0 ? 'white' : 'transparent',
                  fontSize: v > 0 ? `${v < 100 ? '22px' : v < 1000 ? '18px' : '14px'}` : '12px',
                  fontFamily: "'Playfair Display', serif",
                  transform: moved && v > 0 ? 'scale(1.05)' : 'scale(1)',
                  animation: moved && v > 0 ? 'none' : 'none',
                }}
              >
                {v > 0 ? v : ''}
              </div>
            ))
          )}
        </div>

        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-6"
          >
            <div className="text-2xl mb-2">💥</div>
            <p className="text-white font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Game Over
            </p>
            <p className="text-purple-300/60 text-sm mb-3">Score: {score}</p>
            <button onClick={restart} className="btn-love text-xs px-8 py-2">
              Restart
            </button>
          </motion.div>
        )}

        {!gameOver && (
          <div className="mt-4 text-center">
            <button onClick={restart} className="text-purple-400/40 text-xs hover:text-purple-300 transition-colors">
              Restart Game
            </button>
          </div>
        )}

        <div className="mt-4 text-center text-purple-400/40 text-xs">
          Reach 2048 tile to win
        </div>
      </div>
    </section>
  )
}
