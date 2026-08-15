'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HER_NAME = 'Hope Wangari'

export default function Hero() {
  const [showContent, setShowContent] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; dur: number }[]>([])

  useEffect(() => {
    setStars(Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.4,
      delay: Math.random() * 6,
      dur: Math.random() * 4 + 2,
    })))
    setMounted(true)
    const t = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(t)
  }, [])

  const scrollToNext = () => document.getElementById('counter')?.scrollIntoView({ behavior: 'smooth' })

  const items = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center morph-bg relative overflow-hidden">

      {/* Stars */}
      {mounted && stars.map(s => (
        <span key={s.id} className="star" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: `${s.size}px`, height: `${s.size}px`,
          animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`,
        }} />
      ))}

      {/* Soft drifting orbs — hidden on mobile for perf */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div className="orb-drift absolute top-[15%] left-[10%] w-[380px] h-[380px] rounded-full opacity-[0.07] blur-[80px]"
          style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
        <div className="orb-drift absolute bottom-[20%] right-[8%] w-[300px] h-[300px] rounded-full opacity-[0.06] blur-[70px]"
          style={{ background: 'radial-gradient(circle, #f4845f, transparent)', animationDelay: '6s' }} />
        <div className="orb-drift absolute top-[55%] left-[55%] w-[250px] h-[250px] rounded-full opacity-[0.05] blur-[60px]"
          style={{ background: 'radial-gradient(circle, #9b6dbd, transparent)', animationDelay: '12s' }} />
      </div>

      {/* Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            variants={items}
            initial="hidden"
            animate="show"
            className="text-center px-5 relative z-10 w-full max-w-2xl mx-auto"
          >
            {/* Eyebrow */}
            <motion.p variants={item}
              className="text-purple-400/70 text-[10px] md:text-xs tracking-[0.45em] uppercase mb-8 font-medium"
            >
              a love story
            </motion.p>

            {/* Main heading */}
            <motion.h1 variants={item}
              className="text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="shimmer-text">You&apos;re My</span>
              <br />
              <span className="gradient-text-soft">Everything</span>
            </motion.h1>

            {/* Name line */}
            <motion.p variants={item}
              className="text-base sm:text-xl md:text-2xl mb-6"
              style={{ fontFamily: "'Dancing Script', cursive", color: 'rgba(200,168,233,0.85)' }}
            >
              Made just for you, {HER_NAME} 💜
            </motion.p>

            {/* Thin divider */}
            <motion.div variants={item} className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50" />
              <div className="w-1 h-1 rounded-full bg-purple-400/60" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50" />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={item}
              className="text-purple-300/60 text-sm md:text-base mb-8 max-w-xs mx-auto leading-relaxed"
            >
              Every heartbeat, every breath — I choose you, over and over again.
            </motion.p>

            {/* CTA */}
            <motion.div variants={item}>
              <motion.button
                onClick={scrollToNext}
                className="btn-love"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Begin our journey
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToNext}
      >
        <span className="text-purple-500/40 text-[9px] tracking-[0.4em] uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-purple-500/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
