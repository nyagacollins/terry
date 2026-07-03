'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IntroScreen from './components/IntroScreen'
import PasswordGate from './components/PasswordGate'
import Hero from './components/Hero'
import Counter from './components/Counter'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import FirstPhotoReveal from './components/FirstPhotoReveal'
import LoveLetter from './components/LoveLetter'
import VideoSection from './components/VideoSection'
import MusicPlayer from './components/MusicPlayer'
import Reasons from './components/Reasons'
import Surprise from './components/Surprise'
import Future from './components/Future'
import MilestoneCountdown from './components/MilestoneCountdown'
import TimeGreeting from './components/TimeGreeting'

type Stage = 'intro' | 'password' | 'main'

const STARS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.4,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 2,
}))

export default function Home() {
  const [stage, setStage] = useState<Stage>('intro')
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleIntroDone = () => setStage('password')
  const handleUnlock = () => {
    setStage('main')
    setTimeout(() => {
      const audio = document.getElementById('bg-music') as HTMLAudioElement
      if (audio) {
        audio.play().catch(() => {})
        setIsMusicPlaying(true)
      }
    }, 800)
  }

  const toggleMusic = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    if (audio) {
      if (isMusicPlaying) { audio.pause() }
      else { audio.play().catch(() => {}) }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  return (
    <main className="min-h-screen" style={{ background: '#1a0533' }}>
      <audio
        id="bg-music"
        ref={audioRef}
        src="/music/CHAI YA SAA KUMI ( OFFICIAL VIDEO ) -YWAYA TAJIRI - Ywaya Tajiri.mp3"
        loop
      />

      {/* Intro screen */}
      <AnimatePresence>
        {stage === 'intro' && (
          <IntroScreen onDone={handleIntroDone} />
        )}
      </AnimatePresence>

      {/* Password gate */}
      <AnimatePresence>
        {stage === 'password' && (
          <motion.div
            key="password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <PasswordGate onUnlock={handleUnlock} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {stage === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Global stars */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              {mounted && STARS.map(s => (
                <span key={s.id} className="star" style={{
                  left: `${s.x}%`, top: `${s.y}%`,
                  width: `${s.size}px`, height: `${s.size}px`,
                  animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
                }} />
              ))}
            </div>

            {/* Time-aware greeting */}
            <TimeGreeting />

            {/* Music toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring' }}
              onClick={toggleMusic}
              className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
              style={{
                background: 'linear-gradient(135deg, #9b6dbd, #f4845f)',
                boxShadow: '0 4px 20px rgba(155,109,189,0.5)'
              }}
            >
              <span className="text-white text-xl">{isMusicPlaying ? '🔊' : '🔇'}</span>
            </motion.button>

            <Hero />
            <Counter />
            <FirstPhotoReveal />
            <Timeline />
            <Gallery />
            <LoveLetter />
            <VideoSection />
            <MusicPlayer />
            <Reasons />
            <MilestoneCountdown />
            <Surprise />
            <Future />

            {/* Footer */}
            <footer className="py-12 relative overflow-hidden"
              style={{ background: 'linear-gradient(180deg, #2d1054 0%, #1a0533 100%)' }}>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #c8a8e9, #f4845f, #c8a8e9, transparent)' }} />
              <div className="text-center relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-4"
                >
                  💜
                </motion.div>
                <p className="text-purple-200 text-lg font-medium mb-2"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.4rem' }}>
                  Made with every bit of love ❤️ I have😘
                </p>
                <p className="text-purple-400/60 text-sm tracking-wider">
                  — collins, forever yours 🌹
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
