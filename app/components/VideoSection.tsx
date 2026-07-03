'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
      setHasStarted(true)
    }
  }

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <section className="py-24 section-dark relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #9b6dbd, transparent)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3">✦ watch this ✦</p>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            A Message for You
          </h2>
          <p className="text-purple-300/70 text-lg">Put on your headphones 🎧 and press play</p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden group"
          style={{
            boxShadow: '0 0 80px rgba(155,109,189,0.3), 0 30px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(200,168,233,0.2)'
          }}
        >
          <video
            ref={videoRef}
            className="w-full aspect-video bg-black"
            onEnded={() => { setIsPlaying(false); setHasStarted(false) }}
            playsInline
          >
            <source src="/video/WhatsApp Video 2026-03-19 at 03.47.17.mp4" type="video/mp4" />
          </video>

          {/* Cinematic overlay — shown before play */}
          <AnimatePresence>
            {!hasStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(26,5,51,0.92), rgba(59,31,94,0.85))' }}
              >
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border border-purple-400/20"
                      animate={{ scale: [1, 1.5 + i * 0.3], opacity: [0.4, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
                      style={{ width: `${80 + i * 40}px`, height: `${80 + i * 40}px` }}
                    />
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-purple-300/70 text-sm tracking-[0.3em] uppercase mb-8"
                >
                  ✦ a message from my heart ✦
                </motion.p>

                {/* Play button */}
                <motion.button
                  onClick={handlePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #9b6dbd, #f4845f)',
                    boxShadow: '0 0 40px rgba(155,109,189,0.6), 0 0 80px rgba(155,109,189,0.2)'
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-white text-4xl ml-2"
                  >
                    ▶
                  </motion.span>
                </motion.button>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-purple-300/60 text-sm mt-8 italic"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}
                >
                  Press play when you&apos;re ready 💜
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls bar — shown while playing */}
          <AnimatePresence>
            {hasStarted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
              >
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="text-white text-2xl hover:scale-110 transition-transform"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="text-white/70 text-lg hover:text-white transition-colors"
                >
                  {isFullscreen ? '⊠' : '⛶'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
