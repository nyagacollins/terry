'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Song 🎵
          </h2>
          <p className="text-gray-600 text-lg">
            A melody that reminds me of us
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          {/* Album Art */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="w-full h-full rounded-full overflow-hidden border-4 border-pink-200 shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop" 
                alt="Album Art"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {isPlaying && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-xl">🎵</span>
              </motion.div>
            )}
          </div>

          {/* Song Info */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              Birds of a Feather
            </h3>
            <p className="text-gray-500">
              Billie Eilish
            </p>
          </div>

          {/* Audio Element */}
          <audio
            ref={audioRef}
            src="/music/Billie Eilish - BIRDS OF A FEATHER (Official Music Video) - BillieEilishVEVO.mp3"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-pink-500 transition-colors text-2xl"
            >
              ⏮️
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="text-white text-2xl ml-1">
                {isPlaying ? '⏸️' : '▶️'}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-pink-500 transition-colors text-2xl"
            >
              ⏭️
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="text-gray-400">🔈</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              defaultValue={0.7}
              className="w-24 h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <span className="text-gray-400">🔊</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mt-6"
        >
          💕 This song reminds me of you everytime i listen to it
        </motion.p>
      </div>
    </section>
  )
}
