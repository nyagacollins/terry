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
    <section className="py-20 md:py-28 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />
      </div>

      <div className="max-w-2xl mx-auto px-5 relative z-10">
        {/* Right-aligned header */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-right mb-12"
        >
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">where it all began</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Our First Photo
          </h2>
          <p className="text-purple-400/50 text-sm mt-2">The moment I knew you were everything</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                onClick={() => setRevealed(true)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="border-card rounded-2xl p-10 md:p-14 mx-auto max-w-xs cursor-pointer relative overflow-hidden"
              >
                {/* Shimmer sweep */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
                  className="absolute inset-y-0 w-1/3 opacity-[0.08]"
                  style={{ background: 'linear-gradient(90deg, transparent, white, transparent)' }}
                />
                <div className="text-4xl mb-5">📸</div>
                <p className="text-purple-200/70 text-base font-medium mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our very first photo
                </p>
                <p className="text-purple-400/40 text-xs italic mb-6">{FIRST_DATE}</p>
                <span className="btn-love text-xs px-5 py-2.5">Reveal the moment</span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                onClick={() => setFullscreen(true)}
                whileHover={{ scale: 1.005 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                  boxShadow: '0 0 60px rgba(155,109,189,0.25), 0 24px 48px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(200,168,233,0.15)',
                }}
              >
                <div className="aspect-[4/3] relative">
                  <Image src={FIRST_PHOTO} alt="Our first photo" fill className="object-cover" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'linear-gradient(to top, rgba(14,1,32,0.7) 0%, transparent 50%)' }} />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  className="absolute bottom-0 left-0 right-0 p-5 md:p-7"
                  style={{ background: 'linear-gradient(to top, rgba(14,1,32,0.92) 0%, rgba(14,1,32,0.5) 60%, transparent 100%)' }}
                >
                  <p className="text-purple-400/60 text-[9px] tracking-[0.35em] uppercase mb-1">the beginning</p>
                  <h3 className="text-white text-lg md:text-2xl font-bold mb-0.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {HER_NAME}
                  </h3>
                  <p className="text-purple-300/60 text-xs italic"
                    style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.95rem' }}>
                    {FIRST_DATE} — the day my world changed 💜
                  </p>
                </motion.div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white/50 text-xs bg-black/30 rounded-full px-2.5 py-1 backdrop-blur-sm">
                    tap to expand
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fullscreen */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(5,0,15,0.97)' }}
            onClick={() => setFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              className="relative max-w-xl w-full mx-5"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={FIRST_PHOTO}
                alt="Our first photo"
                width={800}
                height={600}
                className="w-full object-cover rounded-2xl"
                style={{ boxShadow: '0 0 80px rgba(155,109,189,0.3)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-center rounded-b-2xl"
                style={{ background: 'linear-gradient(to top, rgba(14,1,32,0.92), transparent)' }}>
                <p className="text-white font-bold text-lg mb-0.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}>{HER_NAME}</p>
                <p className="text-purple-300/60 text-sm italic"
                  style={{ fontFamily: "'Dancing Script', cursive" }}>{FIRST_DATE} 💜</p>
              </div>
              <button onClick={() => setFullscreen(false)}
                className="absolute -top-9 right-0 text-white/40 hover:text-white/80 text-xl transition-colors">✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
