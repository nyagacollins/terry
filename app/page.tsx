'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion, LazyMotion, domAnimation } from 'framer-motion'
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
import CatchMyHeart from './components/CatchMyHeart'

type Stage = 'intro' | 'password' | 'main'

// Fewer stars on mobile for performance
const isMobileUA = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
const STAR_COUNT = isMobileUA ? 15 : 40

const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.8 + 0.4,
  delay: Math.random() * 6,
  dur: Math.random() * 4 + 2,
}))

function Divider() {
  return <div className="section-divider" />
}

export default function Home() {
  const [stage, setStage] = useState<Stage>('intro')
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => { setMounted(true) }, [])

  const handleUnlock = () => {
    setStage('main')
    setTimeout(() => {
      const audio = document.getElementById('bg-music') as HTMLAudioElement
      if (audio) { audio.play().catch(() => {}); setMusicPlaying(true) }
    }, 800)
  }

  const toggleMusic = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    if (!audio) return
    if (musicPlaying) { audio.pause() } else { audio.play().catch(() => {}) }
    setMusicPlaying(!musicPlaying)
  }

  return (
    <LazyMotion features={domAnimation}>
    <main className="min-h-screen" style={{ background: '#0e0120' }}>
      <audio
        id="bg-music"
        ref={audioRef}
        src="/music/CHAI YA SAA KUMI ( OFFICIAL VIDEO ) -YWAYA TAJIRI - Ywaya Tajiri.mp3"
        loop
      />

      <AnimatePresence>
        {stage === 'intro' && <IntroScreen onDone={() => setStage('password')} />}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'password' && (
          <motion.div
            key="pw"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7 }}
          >
            <PasswordGate onUnlock={handleUnlock} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Global stars */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              {mounted && STARS.map(s => (
                <span key={s.id} className="star" style={{
                  left: `${s.x}%`, top: `${s.y}%`,
                  width: `${s.size}px`, height: `${s.size}px`,
                  animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`,
                }} />
              ))}
            </div>

            <TimeGreeting />

            {/* Music toggle — minimal */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={toggleMusic}
              className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{
                background: 'rgba(30,10,60,0.85)',
                border: '1px solid rgba(200,168,233,0.2)',
              }}
              title={musicPlaying ? 'Pause music' : 'Play music'}
            >
              <span className="text-purple-300/70 text-sm">{musicPlaying ? '♫' : '♪'}</span>
            </motion.button>

            <Hero />
            <Divider />
            <Counter />
            <Divider />
            <FirstPhotoReveal />
            <Divider />
            <Timeline />
            <Divider />
            <Gallery />
            <Divider />
            <LoveLetter />
            <Divider />
            <VideoSection />
            <Divider />
            <MusicPlayer />
            <Divider />
            <Reasons />
            <Divider />
            <MilestoneCountdown />
            <Divider />
            <CatchMyHeart />
            <Divider />
            <Surprise />
            <Divider />
            <Future />

            {/* Footer */}
            <footer className="py-14 relative overflow-hidden"
              style={{ background: 'linear-gradient(180deg, #1a0533 0%, #0e0120 100%)' }}>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(200,168,233,0.25), rgba(244,132,95,0.2), transparent)' }} />
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-2xl mb-4 inline-block"
                >
                  💜
                </motion.div>
                <p className="text-purple-300/50 mb-1"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.3rem' }}>
                  Made with every bit of love I have
                </p>
                <p className="text-purple-500/30 text-xs tracking-[0.3em] uppercase">
                  — collins, forever yours
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
    </LazyMotion>
  )
}
