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

// Sample photos - replace with your own in /public/images
const photos: Photo[] = [
  {
    id: 1,
    src: '/images/IMG-20250216-WA0014 (2).jpg',
    caption: 'Our first photo together 💕',
    alt: 'Couple photo'
  },
  {
    id: 2,
    src: '/images/Snapchat-135884773.jpg',
    caption: 'Date night vibes 🌙',
    alt: 'Date night'
  },
  {
    id: 3,
    src: '/images/IMG-20251019-WA0038.jpg',
    caption: 'Adventures together 🌍',
    alt: 'Adventure'
  },
  {
    id: 4,
    src: '/images/Snapchat-426634323.jpg',
    caption: 'Silly moments 😂',
    alt: 'Fun moment'
  },
  {
    id: 5,
    src: '/images/Snapchat-456417540.jpg',
    caption: 'Silly moments 😂',
    alt: 'Fun moment'
  },
  {
    id: 6,
    src: '/images/Snapchat-997336239.jpg',
    caption: 'Silly moments 😂',
    alt: 'Fun moment'
  },
  {
    id: 7,
    src: '/images/Snapchat-576422069.jpg',
    caption: 'Silly moments 😂',
    alt: 'Fun moment'
  },
  {
    id: 8,
    src: '/images/Snapchat-509728396.jpg',
    caption: 'Silly moments 😂',
    alt: 'Fun moment'
  },
  {
    id: 9,
    src: '/images/Snapchat-553331733.jpg',
    caption: 'Silly moments 😂',
    alt: 'Fun moment'
  },
  {
    id: 10,
    src: '/images/Snapchat-1416918439.jpg',
    caption: 'selfie adventure 📷',
    alt: 'fun moment'
  },
  {
    id: 11,
    src: '/images/Snapchat-1590975146.jpg',
    caption: 'Just us 💑',
    alt: 'Us together'
  },
  {
    id: 12,
    src: '/images/Snapchat-345680701.jpg',
    caption: 'Just us 💑',
    alt: 'Us together'
  },
  {id: 13,
    src: '/images/Snapchat-91958403.jpg',
    caption: 'Just us 💑',
    alt: 'Us together'
  },
  {id: 14,
    src: '/images/Snapchat-57405438.jpg',
    caption: 'Just us 💑',
    alt: 'Us together'
  },
  {id: 15,
    src: '/images/Snapchat-90511789.jpg',
    caption: 'Just us 💑',
    alt: 'Us together'
  },
  {id: 16,
    src: '/images/Snapchat-1416918439.jpg',
    caption: 'Just us 💑',
    alt: 'fun moment'
  },
  {id: 17,
    src: '/images/Snapchat-869646459.jpg',
    caption: 'Just us 💑',
    alt: 'Us together'
  },
  {id: 18,
    src: '/images/Snapchat-226676256.jpg',
    caption: 'Just us 💑',
    alt: 'Us together'
  },
  {id: 19,
    src: '/images/Snapchat-1607880644.jpg',
    caption: 'Just us 💑',
    alt: 'Us together'
  },
  {id: 20,
    src: '/images/Snapchat-1388046398.jpg',
    caption: 'Just us 💑',
    alt: 'Us together'
  },
  {id: 21,
    src: '/images/IMG-20250525-WA0004.jpg',
    caption: 'Just you 💑',
    alt: 'my love'
  }

]

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Memories 📸
          </h2>
          <p className="text-gray-600 text-lg">
            Every moment with you is precious
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedPhoto(photo)}
              className="cursor-pointer group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium text-center">
                      {photo.caption}
                    </p>
                  </div>
                </div>
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
              className="lightbox-overlay"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[4/3] md:aspect-video">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <p className="text-white text-center mt-4 text-xl font-medium">
                  {selectedPhoto.caption}
                </p>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute -top-12 right-0 text-white text-3xl hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
