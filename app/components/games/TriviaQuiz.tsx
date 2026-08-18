'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Question {
  q: string
  options: string[]
  answer: number
  category: string
}

const TRIVIA: Question[] = [
  { q: 'What is the capital of France?', options: ['Berlin', 'London', 'Paris', 'Madrid'], answer: 2, category: 'Geography' },
  { q: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 1, category: 'Science' },
  { q: 'Who wrote "Romeo and Juliet"?', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'], answer: 1, category: 'Literature' },
  { q: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 3, category: 'Geography' },
  { q: 'How many bones are in the adult human body?', options: ['206', '300', '150', '402'], answer: 0, category: 'Science' },
  { q: 'Which element has the chemical symbol "O"?', options: ['Oxygen', 'Gold', 'Osmium', 'Obsidian'], answer: 0, category: 'Science' },
  { q: 'What year did the Titanic sink?', options: ['1912', '1905', '1920', '1898'], answer: 0, category: 'History' },
  { q: 'Which color do you get by mixing red and white?', options: ['Pink', 'Purple', 'Orange', 'Brown'], answer: 0, category: 'Art' },
  { q: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], answer: 2, category: 'Science' },
  { q: 'Which planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], answer: 2, category: 'Science' },
  { q: 'What do you call a group of dolphins?', options: ['Flock', 'Herd', 'Pod', 'School'], answer: 2, category: 'Nature' },
  { q: 'In which country would you find the Eiffel Tower?', options: ['Italy', 'France', 'Spain', 'UK'], answer: 1, category: 'Geography' },
]

export default function TriviaQuiz() {
  const [screen, setScreen] = useState<'idle' | 'playing' | 'gameover'>('idle')
  const [questions] = useState<Question[]>(() => {
    const shuffled = [...TRIVIA].sort(() => Math.random() - 0.5).slice(0, 10)
    return shuffled
  })
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    const saved = parseInt(localStorage.getItem('trivia_best') ?? '0', 10)
    if (!isNaN(saved)) setBest(saved)
    return () => clearInterval(timerRef.current)
  }, [])

  const start = () => {
    setScore(0)
    setQIndex(0)
    setTimeLeft(15)
    setScreen('playing')
    setShowResult(false)
    setSelected(null)
  }

  const nextQuestion = (points: number) => {
    setScore(sc => sc + points)
    setShowResult(true)
    setTimeout(() => {
      if (qIndex + 1 >= questions.length) {
        setScreen('gameover')
        const final = score + points
        if (final > best) {
          localStorage.setItem('trivia_best', String(final))
          setBest(final)
        }
      } else {
        setQIndex(i => i + 1)
        setTimeLeft(15)
        setSelected(null)
        setShowResult(false)
      }
    }, 2000)
  }

  useEffect(() => {
    if (screen !== 'playing' || showResult) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          nextQuestion(0)
          return 15
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen, qIndex, showResult, questions, score, best])

  const handleAnswer = (idx: number) => {
    if (showResult || screen !== 'playing') return
    clearInterval(timerRef.current)
    setSelected(idx)
    const q = questions[qIndex]
    const correct = idx === q.answer
    nextQuestion(correct ? 10 + timeLeft * 3 : 0)
  }

  return (
    <section className="py-20 md:py-28 section-gradient relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 relative z-10">
        <div className="text-center mb-8">
          <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">quiz</p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>Trivia Quiz</h2>
          <p className="text-purple-400/50 text-sm mt-2">Test your knowledge in 10 questions</p>
        </div>

        <AnimatePresence>
          {screen === 'idle' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8">
              <div className="text-4xl mb-4">❓</div>
              <p className="text-purple-300/60 text-sm mb-2">10 questions · {questions.length} categories</p>
              <p className="text-purple-400/40 text-xs mb-6">Physics, Animals, Geography, Science, History...</p>
              <motion.button onClick={start} className="btn-love text-xs px-10 py-3"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Start Quiz
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {screen === 'playing' && !showResult && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border-card p-6">
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-purple-400/50 text-xs">Q{qIndex + 1}/10 · {questions[qIndex].category}</span>
              <span className="text-purple-400/50 text-xs">⏱ {timeLeft}s</span>
              <span className="text-yellow-400/60 text-xs font-bold">Score: {score}</span>
            </div>

            <h3 className="text-white text-lg font-bold mb-4 text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {questions[qIndex].q}
            </h3>

            <div className="grid gap-2">
              {questions[qIndex].options.map((opt, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="border-card text-left p-3 text-sm hover:bg-purple-900/30 transition-colors text-purple-100"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  whileTap={{ scale: 0.97 }}
                  disabled={showResult}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </motion.button>
              ))}
            </div>

            <div className="h-1.5 rounded-full mt-3" style={{ background: 'rgba(200,168,233,0.1)' }}>
              <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-f4845f"
                style={{ width: `${(timeLeft / 15) * 100}%` }} />
            </div>
          </motion.div>
        )}

        {screen === 'playing' && showResult && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 border-card p-6">
            <div className="text-4xl mb-3">
              {selected !== null && questions[qIndex] && (selected === questions[qIndex].answer ? '✅' : '❌')}
            </div>
            <h3 className="text-white text-xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {selected !== null && questions[qIndex] && selected === questions[qIndex].answer ? 'Correct!' : 'Wrong!'}
            </h3>
            <p className="text-purple-300/60 text-sm mb-4">
              Score: {score}
            </p>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <div className="text-2xl">⏳ Next question...</div>
            </motion.div>
          </motion.div>
        )}

        {screen === 'gameover' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 border-card p-6">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="text-white text-xl font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}>Quiz Complete!</h3>
            <p className="text-purple-300/60 text-sm mb-1">Final Score: {score}</p>
            {best > score && <p className="text-yellow-400/50 text-xs mb-3">Best: {best}</p>}
            {best <= score && score > 0 && (
              <p className="text-yellow-400/80 text-xs mb-3">🏆 New Best!</p>
            )}
            <motion.button onClick={start} className="btn-love text-xs px-10 py-3"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Play Again
            </motion.button>
          </motion.div>
        )}

        <div className="mt-4 text-center text-purple-400/40 text-xs">
          {timeLeft}s per question · {score > best ? 'Go for best!' : 'Try to beat your best!'}
        </div>
      </div>
    </section>
  )
}
