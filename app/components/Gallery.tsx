'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const photos = [
  { id: 1,  src: '/images/WhatsApp Image 2026-06-19 at 23.33.54.jpeg',    caption: 'Our first photo together' },
  { id: 2,  src: '/images/WhatsApp Image 2026-06-19 at 23.39.55.jpeg',    caption: 'Date night vibes' },
  { id: 3,  src: '/images/WhatsApp Image 2026-06-30 at 23.15.10.jpeg',    caption: 'Adventures together' },
  { id: 4,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.14.jpeg',    caption: 'Silly moments' },
  { id: 5,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.15.jpeg',    caption: 'Silly moments' },
  { id: 6,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.16.jpeg',    caption: 'Silly moments' },
  { id: 7,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.17.jpeg',    caption: 'Silly moments' },
  { id: 8,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.18.jpeg',    caption: 'Silly moments' },
  { id: 9,  src: '/images/WhatsApp Image 2026-07-01 at 01.09.19.jpeg',    caption: 'Silly moments' },
  { id: 10, src: '/images/WhatsApp Image 2026-07-01 at 01.09.20.jpeg',    caption: 'Selfie adventure' },
  { id: 11, src: '/images/WhatsApp Image 2026-07-01 at 01.09.24.jpeg',    caption: 'Just us' },
  { id: 12, src: '/images/WhatsApp Image 2026-07-01 at 01.09.25.jpeg',    caption: 'Just us' },
  { id: 13, src: '/images/WhatsApp Image 2026-07-01 at 01.09.23.jpeg',    caption: 'Just us' },
  { id: 14, src: '/images/WhatsApp Image 2026-07-01 at 01.09.26.jpeg',    caption: 'Just us' },
  { id: 15, src: '/images/WhatsApp Image 2026-07-01 at 01.09.27.jpeg',    caption: 'Just us' },
  { id: 16, src: '/images/WhatsApp Image 2026-07-01 at 01.09.28.jpeg',    caption: 'Just us' },
  { id: 17, src: '/images/WhatsApp Image 2026-07-01 at 01.09.28.jpeg',    caption: 'Just us' },
  { id: 18, src: '/images/WhatsApp Image 2026-07-01 at 01.09.30.jpeg',    caption: 'Just you' },
  { id: 19, src: '/images/WhatsApp Image 2026-07-03 at 21.26.24 (1).jpeg', caption: 'My everything' },
  { id: 20, src: '/images/WhatsApp Image 2026-07-03 at 21.26.24 (2).jpeg', caption: 'My everything' },
  { id: 21, src: '/images/WhatsApp Image 2026-07-03 at 21.26.24 (3).jpeg', caption: 'My everything' },
  { id: 22, src: '/images/WhatsApp Image 2026-07-03 at 21.26.24 (4).jpeg', caption: 'My everything' },
  { id: 23, src: '/images/WhatsApp Image 2026-07-03 at 21.26.24.jpeg',     caption: 'My everything' },
  { id: 24, src: '/images/WhatsApp Image 2026-07-03 at 21.26.25 (1).jpeg', caption: 'My everything' },
  { id: 25, src: '/images/WhatsApp Image 2026-07-03 at 21.26.25 (2).jpeg', caption: 'My everything' },
  { id: 26, src: '/images/WhatsApp Image 2026-07-03 at 21.26.25 (3).jpeg', caption: 'My everything' },
  { id: 27, src: '/images/WhatsApp Image 2026-07-03 at 21.26.25 (4).jpeg', caption: 'My everything' },
  { id: 28, src: '/images/WhatsApp Image 2026-07-03 at 21.26.25 (5).jpeg', caption: 'My everything' },
  { id: 29, src: '/images/WhatsApp Image 2026-07-03 at 21.26.25.jpeg',     caption: 'My everything' },
  { id: 30, src: '/images/WhatsApp Image 2026-07-03 at 21.26.26 (1).jpeg', caption: 'My everything' },
  { id: 31, src: '/images/WhatsApp Image 2026-07-03 at 21.26.26 (2).jpeg', caption: 'My everything' },
  { id: 32, src: '/images/WhatsApp Image 2026-07-03 at 21.26.26 (3).jpeg', caption: 'My everything' },
  { id: 33, src: '/images/WhatsApp Image 2026-07-03 at 21.26.26 (4).jpeg', caption: 'My everything' },
  { id: 34, src: '/images/WhatsApp Image 2026-07-03 at 21.26.26.jpeg',     caption: 'My everything' },
]

type Photo = typeof photos[0]

export default function Gallery() {
  const [selected, setSelected] = useState<Photo | null>(null)

  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-72 h-72 opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        {/* Right-aligned header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">our moments</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Memories
          </h2>
          <p className="text-purple-400/50 text-sm mt-2">Every moment with you is a treasure</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-3">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.4) }}
              onClick={() => setSelected(photo)}
              className="cursor-pointer group relative overflow-hidden rounded-xl"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}
            >
              <div className="aspect-square relative">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(14,1,32,0.85) 0%, transparent 55%)' }}>
                  <p className="absolute bottom-2 left-0 right-0 text-center text-white/90 text-xs font-medium px-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lightbox-overlay"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="relative w-full mx-4"
              style={{ maxWidth: 'min(90vw, 500px)' }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={selected.src}
                alt={selected.caption}
                width={800}
                height={800}
                className="w-full object-contain rounded-2xl"
                style={{ maxHeight: '78vh' }}
              />
              <p className="text-white/70 text-center mt-3 text-sm"
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}>
                {selected.caption} 💜
              </p>
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-10 right-0 text-white/50 hover:text-white text-2xl transition-colors"
              >✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
