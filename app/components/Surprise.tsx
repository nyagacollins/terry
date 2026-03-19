'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'

export default function Surprise() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const revealSurprise = () => {
    setIsRevealed(true)
    setShowConfetti(true)
    // Stop confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          numberOfPieces={200}
          recycle={false}
          gravity={0.2}
          colors={['#ff6b9d', '#9b59b6', '#ff9ff3', '#feca57', '#ff6b6b']}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            A Surprise for You 🎁
          </h2>
          <p className="text-gray-600 text-lg">
            Something special awaits...
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={revealSurprise}
                className="btn-love text-xl px-12 py-6"
              >
                🎁 Click for a surprise
              </motion.button>

              {/* Floating gift boxes */}
              <div className="mt-12 flex justify-center gap-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="text-4xl"
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    🎀
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-pink-200"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-8xl mb-6"
                >
                  ✨🎉✨
                </motion.div>

                <h3 className="text-3xl font-bold gradient-text mb-6">
                  Our Next Adventure Awaits! 🌍
                </h3>

                <div className="space-y-6 text-left max-w-2xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-pink-50 rounded-2xl p-6"
                  >
                    <h4 className="text-xl font-bold text-purple-800 mb-2">
                      🌴 Bali Beach Trip
                    </h4>
                    <p className="text-gray-600">
                      Let's watch the sunset in Bali! I've always dreamed of exploring the beautiful temples and beaches with you.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-purple-50 rounded-2xl p-6"
                  >
                    <h4 className="text-xl font-bold text-purple-800 mb-2">
                      🎂 Surprise Birthday Dinner
                    </h4>
                    <p className="text-gray-600">
                      Your next birthday will be extra special! I'm planning something you'll never forget.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-rose-50 rounded-2xl p-6"
                  >
                    <h4 className="text-xl font-bold text-purple-800 mb-2">
                      💝 Many More Adventures
                    </h4>
                    <p className="text-gray-600">
                      This is just the beginning. I promise to create countless more memories with you, travel to new places, and grow old together.
                    </p>
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-2xl text-pink-500 mt-8 font-medium"
                >
                  I love you more than words can express! ❤️
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
