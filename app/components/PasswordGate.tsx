'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// CONFIGURABLE PASSWORD - Change this to your desired password
const CORRECT_PASSWORD = 'butterflies'

interface PasswordGateProps {
  onUnlock: () => void
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      setIsUnlocking(true)
      setTimeout(() => {
        onUnlock()
      }, 1000)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 relative z-10"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            💖
          </motion.div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            You Know this , Dont over think it.
          </h1>
          <p className="text-gray-500 mb-8">
            This is our special place 💕
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className={`w-full px-6 py-4 rounded-full border-2 focus:outline-none focus:ring-4 transition-all text-center text-lg
                ${error 
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                  : 'border-purple-200 focus:border-purple-400 focus:ring-purple-200'
                }`}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-center font-medium"
              >
                ❌ That's probably right but wrong!😅 .
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-love text-lg py-4"
          >
            {isUnlocking ? 'Unlocking...' : '🔓 Unlock'}
          </motion.button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Hint: Think about the first day we met,What did you feel. 💘
        </p>
      </motion.div>
    </div>
  )
}
