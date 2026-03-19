'use client'

import { motion } from 'framer-motion'

interface Promise {
  id: number
  title: string
  description: string
  emoji: string
  color: string
}

const promises: Promise[] = [
  {
    id: 1,
    title: 'Travel the World',
    description: 'Visit at least 10 countries together - from beaches to mountains, city lights to rural countryside.',
    emoji: '✈️',
    color: 'bg-pink-100'
  },
  {
    id: 2,
    title: 'Grow Old Together',
    description: 'Be that cute old couple holding hands at the park, still laughing at each other\'s jokes.',
    emoji: '👵👴',
    color: 'bg-purple-100'
  },
  {
    id: 3,
    title: 'Build Our Dream Home',
    description: 'Create a cozy space filled with love, photos of our adventures, and memories waiting to be made.',
    emoji: '🏠',
    color: 'bg-rose-100'
  },
  {
    id: 4,
    title: 'Learn Together',
    description: 'Pick up new hobbies, take dance lessons, learn a new language - never stop growing.',
    emoji: '📚',
    color: 'bg-indigo-100'
  },
  {
    id: 5,
    title: 'Support Each Other',
    description: 'Be each other\'s biggest cheerleader through every dream, challenge, and victory.',
    emoji: '💪',
    color: 'bg-pink-100'
  },
  {
    id: 6,
    title: 'Create Traditions',
    description: 'Our weekly movie nights, annual trips, holiday traditions - building our unique story.',
    emoji: '🎄',
    color: 'bg-purple-100'
  }
]

export default function Future() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Future Together 🌟
          </h2>
          <p className="text-gray-600 text-lg">
            Promises I'm making to you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promises.map((promise, index) => (
            <motion.div
              key={promise.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`${promise.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="text-4xl mb-4">{promise.emoji}</div>
              <h3 className="text-xl font-bold text-purple-800 mb-2">
                {promise.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {promise.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl p-8 shadow-xl">
            <p className="text-white text-2xl md:text-3xl font-medium">
              "Whatever our souls are made of, yours and mine are the same."
            </p>
            <p className="text-white/80 mt-4">
              — Emily Brontë
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-3xl mt-12"
        >
          I love you, gummy bear❤️
        </motion.p>
      </div>
    </section>
  )
}
