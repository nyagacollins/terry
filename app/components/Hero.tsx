'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// CONFIGURABLE: Her name
const HER_NAME = 'Sharon'

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Show content after mount
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const scrollToNext = () => {
    const counterSection = document.getElementById('counter')
    if (counterSection) {
      counterSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 relative overflow-hidden">
      {/* Background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 15}px`,
            }}
            animate={{
              y: [0, -150],
              opacity: [0, 0.8, 0],
              rotate: [0, Math.random() * 60 - 30],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {i % 3 === 0 ? '💕' : i % 3 === 1 ? '💖' : '💗'}
          </motion.div>
        ))}
      </div>

      {/* Music player */}
      <audio ref={audioRef} loop>
        <source src="/music/romantic.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMusic}
        className="absolute top-6 right-6 z-20 bg-white/30 backdrop-blur-sm p-3 rounded-full hover:bg-white/50 transition-all"
      >
        {isPlaying ? (
          <span className="text-2xl">🔊</span>
        ) : (
          <span className="text-2xl">🔇</span>
        )}
      </motion.button>

      {/* Main content */}
      <div className="text-center px-4 relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: showContent ? 1 : 0, opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            ❤️
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: showContent ? 0 : 50, opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold gradient-text mb-4"
        >
          Happy Anniversary
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: showContent ? 0 : 30, opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-2xl md:text-3xl text-purple-700 font-medium mb-8"
        >
          To my everything, {HER_NAME} 💜
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: showContent ? 0 : 30, opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <button onClick={scrollToNext} className="btn-love text-xl">
            Click to begin our journey 💕
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-purple-400 text-4xl"
        >
          ⬇️
        </motion.div>
      </motion.div>
    </section>
  )
}
