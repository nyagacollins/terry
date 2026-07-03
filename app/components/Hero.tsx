'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HER_NAME = 'Hope Wangari 💜'

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; duration: number; size: number; emoji: string }[]>([])
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setHearts(Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 6,
      duration: Math.random() * 5 + 5,
      size: Math.random() * 24 + 12,
      emoji: ['💜', '💕', '✨', '🌸', '💫', '🌺'][Math.floor(Math.random() * 6)],
    })))
    setStars(Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    })))
    setMounted(true)
    const timer = setTimeout(() => setShowContent(true), 400)
    return () => clearTimeout(timer)
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.pause() }
      else { audioRef.current.play() }
      setIsPlaying(!isPlaying)
    }
  }

  const scrollToNext = () => {
    document.getElementById('counter')?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center morph-bg relative overflow-hidden">

      {/* Stars */}
      {mounted && stars.map(s => (
        <span key={s.id} className="star" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: `${s.size}px`, height: `${s.size}px`,
          animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
        }} />
      ))}

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && hearts.map(h => (
          <motion.div
            key={h.id}
            className="absolute"
            style={{ left: `${h.x}%`, bottom: '-10%', fontSize: `${h.size}px` }}
            animate={{ y: [0, -1800], opacity: [0, 0.9, 0] }}
            transition={{
              duration: h.duration,
              repeat: Infinity,
              delay: h.delay,
              ease: 'linear',
            }}
          >
            {h.emoji}
          </motion.div>
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/5 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />

      {/* Music button */}
      <audio ref={audioRef} loop>
        <source src="/music/romantic.mp3" type="audio/mpeg" />
      </audio>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        onClick={toggleMusic}
        className="absolute top-6 right-6 z-20 glass-card p-3 rounded-full hover:scale-110 transition-transform"
      >
        <span className="text-2xl">{isPlaying ? '🔊' : '🔇'}</span>
      </motion.button>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-center px-6 relative z-10 w-full max-w-3xl"
          >
            {/* Big heart */}
            <motion.div variants={itemVariants}>
              <motion.div
                className="heartbeat text-6xl md:text-9xl mb-4 md:mb-6 inline-block"
                whileHover={{ scale: 1.2, rotate: [-5, 5, -5, 0] }}
                transition={{ duration: 0.4 }}
              >
                💜
              </motion.div>
            </motion.div>

            {/* Small label */}
            <motion.div variants={itemVariants}>
              <span className="text-purple-300 text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-4 block">
                ✦ A love story ✦
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="shimmer-text">You&apos;re My Everything</span>
            </motion.h1>

            {/* Sub heading */}
            <motion.p variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl mb-3 px-2"
              style={{ fontFamily: "'Dancing Script', cursive", color: '#c8a8e9' }}
            >
              This was made just for you, {HER_NAME} 💜
            </motion.p>

            {/* Divider */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 my-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400" />
              <span className="text-purple-300 text-lg">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400" />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={itemVariants} className="text-purple-300/80 text-base md:text-xl mb-8 md:mb-10 max-w-md mx-auto leading-relaxed px-2">
              Every heartbeat, every breath — I choose you, over and over again.
            </motion.p>

            {/* CTA button */}
            <motion.div variants={itemVariants}>
              <motion.button
                onClick={scrollToNext}
                className="btn-love text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                Begin our journey 💕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToNext}
      >
        <span className="text-purple-400/60 text-xs tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-purple-400 text-2xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  )
}
