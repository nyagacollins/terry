'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Photo {
  id: number
  src: string
  caption: string
  alt: string
}

const photos: Photo[] = [
  { id: 1,  src: '/images/WhatsApp Image 2026-06-19 at 23.33.54.jpeg',  caption: 'Our first photo together 💕',   alt: 'Couple photo' },
  { id: 2,  src: '/images/WhatsApp Image 2026-06-19 at 23.39.55.jpeg',        caption: 'Date night vibes 🌙',            alt: 'Date night' },
  { id: 3,  src: '/images/WhatsApp Image 2026-06-30 at 23.15.10.jpeg',       caption: 'Adventures together 🌍',         alt: 'Adventure' },
  { id: 4,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.14.jpeg',        caption: 'Silly moments 😂',               alt: 'Fun moment' },
  { id: 5,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.15.jpeg',        caption: 'Silly moments 😂',               alt: 'Fun moment' },
  { id: 6,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.16.jpeg',        caption: 'Silly moments 😂',               alt: 'Fun moment' },
  { id: 7,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.17.jpeg',        caption: 'Silly moments 😂',               alt: 'Fun moment' },
  { id: 8,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.18.jpeg',        caption: 'Silly moments 😂',               alt: 'Fun moment' },
  { id: 9,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.19.jpeg',        caption: 'Silly moments 😂',               alt: 'Fun moment' },
  { id: 10, src: '/images/WhatsApp Image 2026-07-01 at 01.09.20.jpeg',       caption: 'Selfie adventure 📷',            alt: 'Fun moment' },
  { id: 11, src: '/images/WhatsApp Image 2026-07-01 at 01.09.24.jpeg',       caption: 'Just us 💑',                    alt: 'Us together' },
  { id: 12, src: '/images/WhatsApp Image 2026-07-01 at 01.09.25.jpeg',        caption: 'Just us 💑',                    alt: 'Us together' },
  { id: 13, src: '/images/WhatsApp Image 2026-07-01 at 01.09.23.jpeg',         caption: 'Just us 💑',                    alt: 'Us together' },
  { id: 14, src: '/images/WhatsApp Image 2026-07-01 at 01.09.24.jpeg',         caption: 'Just us 💑',                    alt: 'Us together' },
  { id: 15, src: '/images/WhatsApp Image 2026-07-01 at 01.09.25.jpeg',         caption: 'Just us 💑',                    alt: 'Us together' },
  { id: 16, src: '/images/WhatsApp Image 2026-07-01 at 01.09.26.jpeg',        caption: 'Just us 💑',                    alt: 'Us together' },
  { id: 17, src: '/images/WhatsApp Image 2026-07-01 at 01.09.27.jpeg',        caption: 'Just us 💑',                    alt: 'Us together' },
  { id: 18, src: '/images/WhatsApp Image 2026-07-01 at 01.09.28.jpeg',        caption: 'Just us 💑',                    alt: 'Us together' },
  { id: 19, src: '/images/WhatsApp Image 2026-07-01 at 01.09.29.jpeg',       caption: 'Just us 💑',                    alt: 'Us together' },
  { id: 20, src: '/images/WhatsApp Image 2026-07-01 at 01.09.30.jpeg',       caption: 'Just you 💜',                   alt: 'My love' },
  { id: 21, src: '',       caption: 'My everything 💕',              alt: 'My love' },
]

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <section className="py-24 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3">✦ our moments ✦</p>
          <h2 className="font-serif-elegant text-4xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Memories
          </h2>
          <p className="text-purple-300/70 text-lg">Every moment with you is a treasure</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setSelectedPhoto(photo)}
              className="cursor-pointer group relative overflow-hidden rounded-2xl shadow-xl"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
            >
              <div className="aspect-square relative">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(59,31,94,0.9) 0%, rgba(59,31,94,0.3) 50%, transparent 100%)' }}>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs text-center font-medium">{photo.caption}</p>
                  </div>
                </div>
                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lightbox-overlay"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 150, damping: 18 }}
                className="relative max-w-2xl max-h-[85vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative" style={{ maxHeight: '75vh' }}>
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    width={800}
                    height={800}
                    className="object-contain rounded-2xl shadow-2xl"
                    style={{ maxHeight: '75vh', width: 'auto', margin: '0 auto' }}
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-center mt-4 text-lg font-medium"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {selectedPhoto.caption}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute -top-12 right-0 text-white/70 hover:text-white text-3xl transition-colors"
                >
                  ✕
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
