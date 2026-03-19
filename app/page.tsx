'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PasswordGate from './components/PasswordGate'
import Hero from './components/Hero'
import Counter from './components/Counter'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import LoveLetter from './components/LoveLetter'
import VideoSection from './components/VideoSection'
import MusicPlayer from './components/MusicPlayer'
import Reasons from './components/Reasons'
import Surprise from './components/Surprise'
import Future from './components/Future'

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleUnlock = () => {
    setIsUnlocked(true)
  }

  // Play music when content is unlocked
  useEffect(() => {
    if (isUnlocked) {
      const audio = document.getElementById('bg-music') as HTMLAudioElement
      if (audio) {
        audio.play().catch(() => {})
        setIsMusicPlaying(true)
      }
    }
  }, [isUnlocked])

  const toggleMusic = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    if (audio) {
      if (isMusicPlaying) {
        audio.pause()
      } else {
        audio.play().catch(() => {})
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Background Music - placed outside so it's always available */}
      <audio
        id="bg-music"
        ref={audioRef}
        src="/music/Billie Eilish - BIRDS OF A FEATHER (Official Music Video) - BillieEilishVEVO.mp3"
        loop
      />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="password-gate"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <PasswordGate onUnlock={handleUnlock} />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Floating hearts background for main content */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-200"
                  style={{
                    left: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 20 + 10}px`,
                  }}
                  animate={{
                    y: [0, window.innerHeight + 100],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>

            {/* Music Toggle Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              onClick={toggleMusic}
              className="fixed top-4 right-4 z-50 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="text-white text-xl">
                {isMusicPlaying ? '🔊' : '🔇'}
              </span>
            </motion.button>

            <Hero />
            <Counter />
            <Timeline />
            <Gallery />
            <LoveLetter />
            <VideoSection />
            <MusicPlayer />
            <Reasons />
            <Surprise />
            <Future />

            {/* Footer */}
            <footer className="py-8 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-center">
              <p className="text-lg font-medium">
                Made with ❤️ for the love of my life
              </p>
              <p className="text-white/80 mt-2">
                Happy Anniversary! 💕
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
