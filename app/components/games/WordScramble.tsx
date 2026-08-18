'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Word {
  word: string
  clue: string
}

const WORDS: Word[] = [
  { word: 'KABHAJIA', clue: 'How Collins calls you 💘' },
  { word: 'LOVE', clue: 'Four letters that mean everything' },
  { word: 'MEMORIES', clue: 'What photos capture' },
  { word: 'ADVENTURE', clue: 'What you bring to life' },
  { word: 'SUNSHINE', clue: 'What you are to me' },
  { word: 'DANCE',   clue: 'Something we should do together' },
  { word: 'FIRE', clue: 'What our love burns as' },
  { word: 'STARS', clue: 'What light up the night sky' },
  { word: 'HONEY',   clue: 'Endearment we use' },
  { word: 'SMILE',   clue: 'Your best feature' },
]

const MAX_ROUNDS = 15

function scramble(word: string): string {
  const arr = word.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('')
}

export default function WordScramble() {
  const [screen, setScreen] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle')
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [currentWord, setCurrentWord] = useState<{ scrambled: string; word: string; clue: string } | null>(null)
  const [guess, setGuess] = useState('')
  const [shake, setShake] = useState(false)
  const [message, setMessage] = useState('')
  const [best, setBest] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval>>()
  const scoreRef = useRef(0)
  scoreRef.current = score

  const WORDS_LIST = WORDS.filter(w => typeof w === 'object' && 'word' in w) as Word[]

  useEffect(() => {
    const saved = parseInt(localStorage.getItem('word_best') ?? '0', 10)
    if (!isNaN(saved)) setBest(saved)
  }, [])

  useEffect(() => {
    if (score > best) {
      localStorage.setItem('word_best', String(score))
      setBest(score)
    }
  }, [score, best])

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  const nextWord = (prevScore: number, time: number) => {
    if (round + 1 >= MAX_ROUNDS) {
      setScreen('won')
      setBest(prev => {
        const nb = Math.max(prev, prevScore)
        localStorage.setItem('word_best', String(nb))
        return nb
      })
      return
    }
    const w = WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)]
    let scrambled = scramble(w.word)
    while (scrambled === w.word) scrambled = scramble(w.word)
    setCurrentWord({ scrambled, word: w.word, clue: w.clue })
    setGuess('')
    setTimeLeft(time)
    setRound(r => r + 1)
    setShake(false)
    setMessage('')
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (screen !== 'playing' || !currentWord) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setScreen('lost')
          setBest(prev => {
            const nb = Math.max(prev, scoreRef.current)
            localStorage.setItem('word_best', String(nb))
            return nb
          })
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen, currentWord])

  const start = () => {
    setScore(0)
    setScreen('playing')
    setTimeLeft(30)
    setRound(0)
    scoreRef.current = 0
    nextWord(0, 30)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentWord || screen !== 'playing') return
    if (guess.trim().toUpperCase() === currentWord.word) {
      const pts = 10 + Math.max(0, timeLeft) * 2
      const newScore = score + pts
      setScore(newScore)
      setMessage(`+${pts} points!`)
      clearInterval(timerRef.current)
      setTimeout(() => nextWord(newScore, timeLeft), 800)
    } else {
      setShake(true)
      setMessage('Not quite right...')
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <section className="py-20 md:py-28 section-mid relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">
        <div className="text-center mb-8">
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">puzzle</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>Word Scramble</h2>
          <p className="text-purple-400/50 text-sm mt-2">Unscramble the word before time runs out</p>
        </div>

        <AnimatePresence>
          {!currentWord && screen !== 'playing' && screen !== 'won' && screen !== 'lost' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="text-center py-8">
              <div className="text-4xl mb-4">🔤</div>
              <p className="text-purple-300/60 text-sm mb-6">Unscramble words related to us!</p>
              <motion.button onClick={start} className="btn-love text-xs px-10 py-3"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Start Solving
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {currentWord && screen === 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="flex justify-between items-center mb-4 text-sm">
              <div>
                <span className="text-purple-400/40 text-[10px] uppercase">Round</span>
                <span className="text-purple-200 font-bold ml-1">{round}</span>
              </div>
              <div>
                <span className="text-purple-400/40 text-[10px] uppercase">Score</span>
                <span className="text-purple-200 font-bold ml-1">{score}</span>
              </div>
              <div>
                <span className="text-purple-400/40 text-[10px] uppercase">Best</span>
                <span className="text-yellow-400/60 font-bold ml-1">{best}</span>
              </div>
            </div>

            <div className="text-purple-400/40 text-xs italic mb-3 min-h-[16px]"
              style={{ fontFamily: "'Dancing Script', cursive" }}>
              Clue: {currentWord.clue}
            </div>

            <div className="text-3xl sm:text-4xl font-bold mb-4 gradient-text tracking-[0.3em]"
              style={{ fontFamily: "'Playfair Display', serif", minHeight: '48px' }}>
              {currentWord.scrambled}
            </div>

            <motion.div
              animate={{ scale: shake ? [1, 1.03, 0.97, 1.03, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={submit} className="flex justify-center">
                <input
                  ref={inputRef}
                  value={guess}
                  onChange={e => setGuess(e.target.value)}
                  onClick={() => setGuess('')}
                  maxLength={currentWord.word.length}
                  className="w-48 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-purple-400/20 text-center text-white text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-400/20 uppercase"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  autoComplete="off"
                />
              </form>
            </motion.div>

            <AnimatePresence>
              {message && (
                <motion.p
                  key={message}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-xs mt-2 font-medium ${guess.trim().toUpperCase() === currentWord.word ? 'text-green-400/80' : 'text-red-400/60'}`}
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-6">
              <div className="h-1.5 rounded-full" style={{ background: 'rgba(200,168,233,0.1)' }}>
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-purple-400 to-f4845f"
                  style={{ background: 'linear-gradient(90deg, #c8a8e9, #f4845f)' }}
                  animate={{ width: `${(timeLeft / 30) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-purple-300/50 text-xs mt-1">{timeLeft}s left</div>
            </div>
          </motion.div>
        )}

        {(screen === 'won' || screen === 'lost') && currentWord && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="text-3xl mb-2">{screen === 'won' ? '🏆' : '💀'}</div>
            <h3 className="text-white text-xl font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {screen === 'won' ? 'You Win!' : 'Time\'s Up!'}
            </h3>
            <p className="text-purple-300/60 text-sm mb-1">Score: {score}</p>
            {best > score && <p className="text-yellow-400/50 text-xs mb-3">Best: {best}</p>}
            <motion.button onClick={start} className="btn-love text-xs px-10 py-3"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Play Again
            </motion.button>
          </motion.div>
        )}

        <div className="mt-6 text-center text-purple-400/40 text-xs">
          Type your answer · Press Enter to submit
        </div>
      </div>
    </section>
  )
}
