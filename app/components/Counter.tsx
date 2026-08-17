'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const START_DATE = new Date('2026-06-14T00:00:00')

export default function Counter() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const prevRef = useRef({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = Date.now() - START_DATE.getTime()
      const next = {
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      }
      prevRef.current = next
      setTime(next)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { key: 'days',    value: time.days,    label: 'Days' },
    { key: 'hours',   value: time.hours,   label: 'Hours' },
    { key: 'minutes', value: time.minutes, label: 'Min' },
    { key: 'seconds', value: time.seconds, label: 'Sec' },
  ] as const

  return (
    <section id="counter" className="py-16 md:py-28 section-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 opacity-[0.07] blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #c8a8e9, transparent)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-5 relative z-10">
        {/* Left-aligned header — different from centered pattern */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">
            counting every moment
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Time We&apos;ve Been Us
          </h2>
          <p className="text-purple-400/50 text-sm mt-3">Every second is a gift I never take for granted</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {units.map((unit, i) => (
            <motion.div
              key={unit.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="border-card rounded-2xl p-5 md:p-6 text-center relative overflow-hidden group"
            >
              {/* Subtle top accent */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,233,0.4), transparent)' }} />

              <motion.div
                key={`${unit.key}-${unit.value}`}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tabular-nums leading-none mb-2 gradient-text"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {String(unit.value).padStart(2, '0')}
              </motion.div>

              <p className="text-purple-400/50 text-[10px] tracking-[0.35em] uppercase font-semibold">
                {unit.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-purple-400/40 text-sm mt-8 text-center italic"
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}
        >
          And every single second is worth it 💜
        </motion.p>
      </div>
    </section>
  )
}
