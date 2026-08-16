'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const play = () => { videoRef.current?.play(); setPlaying(true); setStarted(true) }
  const pause = () => { videoRef.current?.pause(); setPlaying(false) }

  const toggleFS = () => {
    if (!document.fullscreenElement && containerRef.current) containerRef.current.requestFullscreen()
    else document.exitFullscreen()
  }

  return (
    <section className="py-20 md:py-28 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 opacity-[0.07] blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #9b6dbd, transparent)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-5 relative z-10">
        {/* Left-aligned header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-12"
        >
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">watch this</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            A Message for You
          </h2>
          <p className="text-purple-400/50 text-sm mt-2">Put on your headphones and press play</p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 0 60px rgba(155,109,189,0.2), 0 24px 48px rgba(0,0,0,0.5)',
            border: '1px solid rgba(200,168,233,0.12)',
          }}
        >
          <video
            ref={videoRef}
            className="w-full aspect-video bg-black"
            onEnded={() => { setPlaying(false); setStarted(false) }}
            playsInline
            webkit-playsinline="true"
            preload="metadata"
          >
            <source src="/video/WhatsApp Video 2026-03-19 at 03.47.17.mp4" type="video/mp4" />
          </video>

          {/* Pre-play overlay */}
          <AnimatePresence>
            {!started && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(14,1,32,0.93), rgba(42,16,80,0.88))' }}
              >
                {/* Pulsing rings */}
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-purple-400/15"
                    animate={{ scale: [1, 1.6 + i * 0.25], opacity: [0.3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.55, ease: 'easeOut' }}
                    style={{ width: `${70 + i * 35}px`, height: `${70 + i * 35}px` }}
                  />
                ))}

                <motion.button
                  onClick={play}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-5"
                  style={{
                    background: 'linear-gradient(135deg, #9b6dbd, #f4845f)',
                    boxShadow: '0 0 30px rgba(155,109,189,0.5)',
                  }}
                >
                  <span className="text-white text-2xl md:text-3xl" style={{ marginLeft: '3px' }}>▶</span>
                </motion.button>

                <p className="text-purple-300/50 text-xs tracking-[0.3em] uppercase">
                  a message from my heart
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <AnimatePresence>
            {started && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
              >
                <button onClick={playing ? pause : play}
                  className="text-white/80 hover:text-white text-xl transition-colors">
                  {playing ? '⏸' : '▶'}
                </button>
                <button onClick={toggleFS}
                  className="text-white/50 hover:text-white/80 text-sm transition-colors">
                  ⛶
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
