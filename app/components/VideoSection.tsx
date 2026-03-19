'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            A Message for You 🎥
          </h2>
          <p className="text-gray-600 text-lg">
            Watch my heart speak to you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Video placeholder - replace src with your video */}
          <video
            ref={videoRef}
            className="w-full aspect-video bg-gray-900"
            poster="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=450&fit=crop"
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/video/WhatsApp Video 2026-03-19 at 03.47.17.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Custom play button overlay */}
          {!isPlaying && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 group"
            >
              <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                <span className="text-5xl ml-1">▶️</span>
              </div>
            </motion.button>
          )}

          {/* Video controls */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <button
                onClick={togglePlay}
                className="text-white text-lg hover:scale-110 transition-transform"
              >
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
            </div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mt-6"
        >
          💡 Tip: Put on your headphones for the best experience!
        </motion.p>
      </div>
    </section>
  )
}
