'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const FIRST_PHOTO = '/images/WhatsApp Image 2026-06-19 at 23.33.54.jpeg'
const HER_NAME = 'Hope Wangari'
const FIRST_DATE = 'February 9, 2025'

export default function FirstPhotoReveal() {
  const [revealed, setRevealed] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <section className="py-24 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3">✦ where it all began ✦</p>
          <h2 className="text-3xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Our First Photo
          </h2>
          <p className="text-purple-300/70 text-sm md:text-lg">The moment I knew you were everything</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                className="glass-card rounded-3xl p-8 md:p-12 mx-auto max-w-sm relative overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setRevealed(true)}
                style={{ boxShadow: '0 0 60px rgba(155,109,189,0.25)' }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                    className="absolute inset-y-0 w-1/3 opacity-20"
                    style={{ background: 'linear-gradient(90deg, transparent, white, transparent)' }}
                  />
                </div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-7xl mb-6"
                >
                  📸
                </motion.div>
                <p className="text-purple-200 text-lg font-medium mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our very first photo together
                </p>
                <p className="text-purple-400/60 text-sm italic mb-6">
                  {FIRST_DATE}
                </p>
                <div className="btn-love inline-block text-sm px-6 py-3">
                  ✨ Reveal the moment
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.div
                className="relative rounded-3xl overflow-hidden cursor-pointer group"
                onClick={() => setFullscreen(true)}
                whileHover={{ scale: 1.01 }}
                style={{
                  boxShadow: '0 0 80px rgba(155,109,189,0.4), 0 30px 60px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(200,168,233,0.3)'
                }}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={FIRST_PHOTO}
                    alt="Our first photo"
                    fill
                    className="object-cover"
                  />
                  {/* Cinematic overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(to top, rgba(26,5,51,0.8) 0%, transparent 50%)' }} />
                </div>

                {/* Name + date overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-8"
                  style={{ background: 'linear-gradient(to top, rgba(26,5,51,0.95) 0%, rgba(26,5,51,0.6) 60%, transparent 100%)' }}
                >
                  <p className="text-purple-300/70 text-xs tracking-[0.3em] uppercase mb-2">✦ the beginning ✦</p>
                  <h3 className="text-white text-xl md:text-4xl font-bold mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {HER_NAME}
                  </h3>
                  <p className="text-purple-300/80 text-sm italic"
                    style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1rem' }}>
                    {FIRST_DATE} — the day my world changed 💜
                  </p>
                </motion.div>

                {/* Expand hint */}
                <div className="absolute top-4 right-4 glass-card rounded-full px-3 py-1 text-xs text-purple-300/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  tap to expand ✦
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(10,0,20,0.97)' }}
            onClick={() => setFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 18 }}
              className="relative max-w-2xl w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 0 100px rgba(155,109,189,0.4)' }}>
                <Image
                  src={FIRST_PHOTO}
                  alt="Our first photo"
                  width={800}
                  height={600}
                  className="w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center"
                  style={{ background: 'linear-gradient(to top, rgba(26,5,51,0.95), transparent)' }}>
                  <p className="text-white text-2xl font-bold mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}>{HER_NAME}</p>
                  <p className="text-purple-300/80 italic"
                    style={{ fontFamily: "'Dancing Script', cursive" }}>
                    {FIRST_DATE} 💜
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFullscreen(false)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white text-2xl transition-colors"
              >✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
