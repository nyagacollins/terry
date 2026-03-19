'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// CONFIGURABLE: Your anniversary start date
const START_DATE = new Date('2025-03-20T00:00:00')

export default function Counter() {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const diff = now.getTime() - START_DATE.getTime()

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeTogether({ days, hours, minutes, seconds })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeUnits = [
    { value: timeTogether.days, label: 'Days', emoji: '📅' },
    { value: timeTogether.hours, label: 'Hours', emoji: '⏰' },
    { value: timeTogether.minutes, label: 'Minutes', emoji: '✨' },
    { value: timeTogether.seconds, label: 'Seconds', emoji: '💫' }
  ]

  return (
    <section id="counter" className="py-20 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Time Together 💕
          </h2>
          <p className="text-gray-700 text-lg">
            Every second with you is precious
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg"
            >
              <motion.div
                key={unit.value}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
                className="text-4xl md:text-5xl font-bold gradient-text mb-2"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.div>
              <div className="text-2xl mb-1">{unit.emoji}</div>
              <p className="text-gray-600 font-medium">{unit.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 mt-8 text-lg"
        >
          And counting... ❤️
        </motion.p>
      </div>
    </section>
  )
}
