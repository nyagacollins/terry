'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const MILESTONES = [
  { label: "Kababa's Birthday",   date: new Date('2026-11-04T00:00:00'), accent: '#c8a8e9' },
  { label: "Gummy Bear's Birthday", date: new Date('2026-11-08T00:00:00'), accent: '#f7b8c8' },
  { label: 'Our Next Date',       date: new Date('2025-08-01T00:00:00'), accent: '#f4845f' },
  { label: 'Our Anniversary',     date: new Date('2027-06-14T00:00:00'), accent: '#9b6dbd' },
]

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(0)
  useEffect(() => {
    const tick = () => setDiff(Math.max(0, target.getTime() - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    isPast:  diff === 0,
  }
}

function Card({ m, index }: { m: typeof MILESTONES[0]; index: number }) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(m.date)
  const units = [{ v: days, l: 'Days' }, { v: hours, l: 'Hrs' }, { v: minutes, l: 'Min' }, { v: seconds, l: 'Sec' }]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="border-card p-5 md:p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${m.accent}60, transparent)` }} />

      <p className="text-purple-400/50 text-[10px] tracking-[0.35em] uppercase mb-1 font-medium">{m.label}</p>
      <p className="text-purple-500/40 text-xs mb-4">
        {m.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>

      {isPast ? (
        <div className="text-center py-2">
          <p className="text-2xl mb-1">🎉</p>
          <p className="text-purple-200/70 text-sm font-medium">Today is the day!</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {units.map(({ v, l }) => (
            <div key={l} className="text-center">
              <motion.div
                key={v}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="text-xl md:text-2xl font-bold tabular-nums leading-none mb-1"
                style={{ color: m.accent, fontFamily: "'Playfair Display', serif" }}
              >
                {String(v).padStart(2, '0')}
              </motion.div>
              <p className="text-purple-500/40 text-[9px] tracking-wider uppercase">{l}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function MilestoneCountdown() {
  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-64 opacity-[0.05] blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #c8a8e9, transparent)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-5 relative z-10">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">things to look forward to</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Next Milestones
          </h2>
          <p className="text-purple-400/50 text-sm mt-2">Counting down to our special moments</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {MILESTONES.map((m, i) => <Card key={m.label} m={m} index={i} />)}
        </div>
      </div>
    </section>
  )
}
