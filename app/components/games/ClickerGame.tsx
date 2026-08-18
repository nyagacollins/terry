'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CLICKS_KEY = 'clicker_clicks'
const AUTO_KEY = 'clicker_auto'

interface Upgrade {
  id: string
  name: string
  desc: string
  cost: number
  cps: number
  icon: string
}

const UPGRADES: Upgrade[] = [
  { id: 'click', name: 'Auto-Clicker',     desc: 'Automatically clicks every second',        cost: 50,  cps: 1, icon: '🤖' },
  { id: 'grandma', name: 'Grandma',        desc: 'Bakes love cookies while you chill',        cost: 100, cps: 3, icon: '👵' },
  { id: 'farm', name: 'Love Farm',         desc: 'Grows hearts that multiply on their own',   cost: 500, cps: 10, icon: '🌸' },
  { id: 'factory', name: 'Heart Factory',   desc: 'Mass-produces love points on a conveyor',   cost: 2000, cps: 50, icon: '🏭' },
  { id: 'rocket', name: 'Love Rocket',      desc: 'Launches love to the stars',                cost: 10000, cps: 250, icon: '🚀' },
]

export default function ClickerGame() {
  const [clicks, setClicks] = useState(0)
  const [autoCps, setAutoCps] = useState(0)
  const [owned, setOwned] = useState<Record<string, number>>({})
  const [level, setLevel] = useState(0)

  useEffect(() => {
    const savedClicks = parseInt(localStorage.getItem(CLICKS_KEY) ?? '0', 10)
    const savedAuto = parseInt(localStorage.getItem(AUTO_KEY) ?? '0', 10)
    if (!isNaN(savedClicks)) setClicks(savedClicks)
    if (!isNaN(savedAuto)) setAutoCps(savedAuto)

    const savedOwned = localStorage.getItem('clicker_owned')
    if (savedOwned) {
      try { setOwned(JSON.parse(savedOwned)) } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CLICKS_KEY, String(clicks))
  }, [clicks])

  useEffect(() => {
    localStorage.setItem(AUTO_KEY, String(autoCps))
  }, [autoCps])

  useEffect(() => {
    localStorage.setItem('clicker_owned', JSON.stringify(owned))
  }, [owned])

  useEffect(() => {
    if (autoCps <= 0) return
    const id = setInterval(() => {
      setClicks(c => c + autoCps)
    }, 1000)
    return () => clearInterval(id)
  }, [autoCps])

  useEffect(() => {
    const target = [10, 100, 1000, 10000, 100000]
    const lvl = target.findIndex(t => clicks < t)
    setLevel(lvl === -1 ? target.length - 1 : Math.max(0, lvl - 1))
  }, [clicks])

  const handleTap = () => {
    setClicks(c => c + 1 + level)
  }

  const buyUpgrade = (upg: Upgrade) => {
    if (clicks < upg.cost) return
    setClicks(c => c - upg.cost)
    setOwned(o => ({ ...o, [upg.id]: (o[upg.id] || 0) + 1 }))
    setAutoCps(a => a + upg.cps)
  }

  const reset = () => {
    if (!window.confirm('Reset all progress?')) return
    setClicks(0)
    setAutoCps(0)
    setOwned({})
    localStorage.removeItem(CLICKS_KEY)
    localStorage.removeItem(AUTO_KEY)
    localStorage.removeItem('clicker_owned')
  }

  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">
        <div className="text-center mb-8">
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">idle game</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>Love Clicker</h2>
          <p className="text-purple-400/50 text-sm mt-2">Tap for love · Buy upgrades</p>
        </div>

        <div className="text-center mb-6">
          <div className="text-5xl font-bold mb-1"
            style={{
              background: 'linear-gradient(135deg, #f7b8c8, #f4845f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Playfair Display', serif",
            }}>
            {Math.floor(clicks)}
          </div>
          <div className="text-purple-400/40 text-xs">
            💜 {autoCps}/sec · Level {level + 1}
          </div>
        </div>

        <motion.button
          onClick={handleTap}
          whileTap={{ scale: 0.92 }}
          className="w-full py-10 mb-6 rounded-2xl text-4xl font-bold transition-all relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #9b6dbd, #c8a8e9, #f4845f)',
            boxShadow: '0 8px 32px rgba(155,109,189,0.5)',
            border: 'none',
            color: 'white',
          }}
        >
          <span style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>💜 TAP! 💜</span>
        </motion.button>

        <div className="space-y-3">
          {UPGRADES.map(u => {
            const qty = owned[u.id] || 0
            const canAfford = clicks >= u.cost
            return (
              <motion.div
                key={u.id}
                className="border-card p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{u.icon}</span>
                  <div>
                    <div className="text-white font-bold text-sm"
                      style={{ fontFamily: "'Playfair Display', serif" }}>{u.name}</div>
                    <div className="text-purple-400/40 text-[10px]">{u.desc}</div>
                  </div>
                </div>
                <motion.button
                  onClick={() => buyUpgrade(u)}
                  disabled={!canAfford}
                  className="btn-love text-xs px-4 py-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-1">
                    {qty > 0 && <span className="text-xs">×{qty}</span>}
                    Buy {u.cost} 💎
                  </span>
                </motion.button>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={reset}
            className="text-purple-400/40 text-xs hover:text-purple-300 transition-colors"
          >
            Reset Progress
          </button>
        </div>

        <div className="mt-4 text-center text-purple-400/30 text-xs">
          Tap, buy upgrades · They auto-generate love points while you idle 💤
        </div>
      </div>
    </section>
  )
}
