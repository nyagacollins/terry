'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const START_DATE = new Date('2026-06-12T00:00:00')

export default function Counter() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const prevRef = useRef({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [flipped, setFlipped] = useState({ days: false, hours: false, minutes: false, seconds: false })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const diff = now.getTime() - START_DATE.getTime()
      const next = {
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      }
      const prev = prevRef.current
      setFlipped({
        days:    next.days    !== prev.days,
        hours:   next.hours   !== prev.hours,
        minutes: next.minutes !== prev.minutes,
        seconds: next.seconds !== prev.seconds,
      })
      prevRef.current = next
      setTime(next)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { key: 'days',    value: time.days,    label: 'Days',    icon: '🌙' },
    { key: 'hours',   value: time.hours,   label: 'Hours',   icon: '☀️' },
    { key: 'minutes', value: time.minutes, label: 'Minutes', icon: '✨' },
    { key: 'seconds', value: time.seconds, label: 'Seconds', icon: '💫' },
  ] as const

  return (
    <section id="counter" className="py-24 section-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #c8a8e9, transparent)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3">✦ counting every moment ✦</p>
          <h2 className="font-serif-elegant text-4xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Time We&apos;ve Been Us
          </h2>
          <p className="text-purple-300/70 text-lg">
            Every second is a gift I never take for granted
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {units.map((unit, i) => (
            <motion.div
              key={unit.key}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06, y: -4 }}
              className="glass-card rounded-3xl p-6 text-center glow-card relative overflow-hidden"
            >
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(200,168,233,0.15), transparent 70%)' }} />

              <div className="text-3xl mb-3">{unit.icon}</div>

              <motion.div
                key={`${unit.key}-${unit.value}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-5xl md:text-6xl font-bold gradient-text mb-2 tabular-nums leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {String(unit.value).padStart(2, '0')}
              </motion.div>

              <p className="text-purple-300/80 text-sm font-semibold tracking-widest uppercase">
                {unit.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-8 py-4">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl"
            >
              ❤️
            </motion.span>
            <span className="text-purple-200 font-medium">
              And every single second is worth it
            </span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
              className="text-2xl"
            >
              ❤️
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
