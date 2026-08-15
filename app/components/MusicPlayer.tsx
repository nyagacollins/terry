'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause() }
    else { audioRef.current.play() }
    setPlaying(!playing)
  }

  const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`

  return (
    <section className="py-20 md:py-28 section-mid relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">our song</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            The Song That&apos;s Us
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-card p-6 md:p-8"
        >
          {/* Vinyl */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: playing ? 360 : 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full relative overflow-hidden"
              style={{
                background: 'conic-gradient(from 0deg, #2a1050, #3d1a6e, #1a0533, #2a1050)',
                boxShadow: playing ? '0 0 30px rgba(200,168,233,0.4)' : '0 0 10px rgba(0,0,0,0.5)',
                border: '3px solid rgba(200,168,233,0.2)',
                transition: 'box-shadow 0.5s ease',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-purple-900"
                  style={{ border: '2px solid rgba(200,168,233,0.4)' }} />
              </div>
            </motion.div>
          </div>

          {/* Song info */}
          <div className="text-center mb-6">
            <h3 className="text-purple-100 font-bold text-lg mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Chai ya saa kumi
            </h3>
            <p className="text-purple-400/50 text-sm">Ywaya Tajiri</p>
          </div>

          <audio
            ref={audioRef}
            src="/music/CHAI YA SAA KUMI ( OFFICIAL VIDEO ) -YWAYA TAJIRI - Ywaya Tajiri.mp3"
            onTimeUpdate={() => setCurrent(audioRef.current?.currentTime ?? 0)}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
            onEnded={() => setPlaying(false)}
          />

          {/* Progress */}
          <div className="mb-5">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={current}
              onChange={e => {
                const t = parseFloat(e.target.value)
                if (audioRef.current) audioRef.current.currentTime = t
                setCurrent(t)
              }}
              className="player-range w-full mb-1"
            />
            <div className="flex justify-between text-purple-500/40 text-xs">
              <span>{fmt(current)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>

          {/* Play button */}
          <div className="flex justify-center">
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #9b6dbd, #f4845f)',
                boxShadow: '0 4px 20px rgba(155,109,189,0.5)',
              }}
            >
              <span className="text-white text-xl" style={{ marginLeft: playing ? 0 : '2px' }}>
                {playing ? '⏸' : '▶'}
              </span>
            </motion.button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-purple-400/40 mt-6 italic"
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.05rem' }}
        >
          This song reminds me of you every time I listen to it 💜
        </motion.p>
      </div>
    </section>
  )
}
