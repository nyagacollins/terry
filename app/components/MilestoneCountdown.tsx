'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// CONFIGURABLE — update these dates
const MILESTONES = [
  {
    label: 'kababa Birthday',
    emoji: '🎂',
    date: new Date('2026-11-04T00:00:00'), // Change to her actual birthday
    color: 'from-violet-600/30 to-purple-800/30',
    accent: '#c8a8e9',
  },
  {
    label: 'Gummy bear Birthday',
    emoji: '🎂',
    date: new Date('2026-11-08T00:00:00'), // Change to her actual birthday
    color: 'from-violet-600/30 to-purple-800/30',
    accent: '#c8a8e9',
  },
  {
    label: 'Our Next Date',
    emoji: '🌹',
    date: new Date('2025-08-01T00:00:00'), // Change to your next planned date
    color: 'from-orange-600/30 to-red-800/30',
    accent: '#f4845f',
  },
  {
    label: 'Our Anniversary',
    emoji: '💍',
    date: new Date('2027-06-12T00:00:00'), // 1 year from when you became official
    color: 'from-purple-600/30 to-violet-800/30',
    accent: '#9b6dbd',
  },
]

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(0)

  useEffect(() => {
    const tick = () => setDiff(Math.max(0, target.getTime() - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  const isPast  = diff === 0

  return { days, hours, minutes, seconds, isPast }
}

function MilestoneCard({ milestone, index }: { milestone: typeof MILESTONES[0]; index: number }) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(milestone.date)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, y: -5 }}
      className={`glass-card rounded-3xl p-6 relative overflow-hidden`}
      style={{ boxShadow: `0 8px 40px rgba(0,0,0,0.3), 0 0 30px ${milestone.accent}20` }}
    >
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${milestone.color}`} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${milestone.accent}, transparent)` }} />

      <div className="relative z-10">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
          <motion.span
            animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
            className="text-4xl"
          >
            {milestone.emoji}
          </motion.span>
          <h3 className="text-purple-100 font-bold text-base md:text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {milestone.label}
          </h3>
        </div>

        {isPast ? (
          <div className="text-center py-4">
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-purple-200 font-medium">Today is the day!</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {[
              { v: days,    l: 'Days' },
              { v: hours,   l: 'Hrs' },
              { v: minutes, l: 'Min' },
              { v: seconds, l: 'Sec' },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <motion.div
                  key={v}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-2xl md:text-3xl font-bold tabular-nums leading-none mb-1"
                  style={{ color: milestone.accent, fontFamily: "'Playfair Display', serif" }}
                >
                  {String(v).padStart(2, '0')}
                </motion.div>
                <p className="text-purple-400/70 text-xs tracking-wider uppercase">{l}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-purple-400/50 text-xs mt-4 text-right">
          {milestone.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </motion.div>
  )
}

export default function MilestoneCountdown() {
  return (
    <section className="py-24 section-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #c8a8e9, transparent)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3">✦ things to look forward to ✦</p>
          <h2 className="text-3xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Next Milestones
          </h2>
          <p className="text-purple-300/70 text-sm md:text-lg">Counting down to our special moments</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {MILESTONES.map((m, i) => (
            <MilestoneCard key={m.label} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
