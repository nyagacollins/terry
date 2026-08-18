'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SnakeGame from './games/SnakeGame'
import FlappyBird from './games/FlappyBird'
import WhackAMole from './games/WhackAMole'
import BubblePop from './games/BubblePop'
import BrickBreaker from './games/BrickBreaker'
import Tile2048 from './games/Tile2048'
import WordScramble from './games/WordScramble'
import TriviaQuiz from './games/TriviaQuiz'
import ClickerGame from './games/ClickerGame'
import ReactionTest from './games/ReactionTest'
import CatchMyHeart from './CatchMyHeart'

type GameKey = 'hub' | 'snake' | 'flappy' | 'whack' | 'bubble' | 'brick' | '2048' | 'word' | 'trivia' | 'clicker' | 'reaction' | 'catch'

interface GameInfo {
  key: GameKey
  name: string
  emoji: string
  desc: string
  category: string
  component: React.ReactNode
}

const GAMES: GameInfo[] = [
  { key: 'snake',     name: 'Snake',        emoji: '🐍', desc: 'Eat dots · Don\'t hit yourself',        category: 'Arcade', component: <SnakeGame /> },
  { key: 'flappy',    name: 'Flappy Bird',  emoji: '🐦', desc: 'Tap to fly through pipes',              category: 'Arcade', component: <FlappyBird /> },
  { key: 'whack',     name: 'Whack a Mole', emoji: '🐹', desc: 'Tap moles before they hide',            category: 'Arcade', component: <WhackAMole /> },
  { key: 'bubble',    name: 'Bubble Pop',   emoji: '🫧', desc: 'Pop floating bubbles',                  category: 'Tap',     component: <BubblePop /> },
  { key: 'brick',     name: 'Brick Breaker', emoji: '🧱', desc: 'Break all the bricks',                 category: 'Arcade', component: <BrickBreaker /> },
  { key: '2048',      name: '2048',         emoji: '2️⃣', desc: 'Merge tiles to 2048',                   category: 'Puzzle',  component: <Tile2048 /> },
  { key: 'word',      name: 'Word Scramble', emoji: '🔤', desc: 'Unscramble the words',                  category: 'Puzzle',  component: <WordScramble /> },
  { key: 'trivia',    name: 'Trivia Quiz',  emoji: '❓', desc: '10 questions to test you',              category: 'Quiz',    component: <TriviaQuiz /> },
  { key: 'clicker',   name: 'Love Clicker', emoji: '💎', desc: 'Tap for love · Buy upgrades',           category: 'Idle',    component: <ClickerGame /> },
  { key: 'reaction',  name: 'Reaction Test', emoji: '⏱', desc: 'Test how fast you are',                 category: 'Reflex',  component: <ReactionTest /> },
  { key: 'catch',     name: 'Catch My Heart', emoji: '💜', desc: 'Catch hearts, dodge bombs (romance)',  category: 'Romance', component: <CatchMyHeart /> },
]

export default function GameSpace() {
  const [activeGame, setActiveGame] = useState<GameKey>('hub')

  const categories = Array.from(new Set(GAMES.map(g => g.category)))

  const activeGameInfo = GAMES.find(g => g.key === activeGame)

  return (
    <section className="py-20 md:py-28 section-dark relative overflow-hidden" id="fun-zone">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-72 h-72 opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #c8a8e9, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, #f4845f, transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <AnimatePresence mode="wait">
          {activeGame === 'hub' && (
            <motion.div
              key="hub"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center mb-4">
                <p className="text-purple-500/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">
                  fun zone
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Bored? Play a Game
                </h2>
                <p className="text-purple-400/50 text-sm mt-2">
                  Whenever you&apos;re bored, come here and pick a game 💜
                </p>
              </div>

              <div className="mb-10 flex flex-wrap justify-center gap-2">
                {categories.map(cat => (
                  <span key={cat}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: 'rgba(200,168,233,0.1)', color: 'rgba(200,168,233,0.6)' }}>
                    {cat}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {GAMES.map((game, i) => (
                  <motion.div
                    key={game.key}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.06, 0.4), duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveGame(game.key)}
                      className="border-card rounded-2xl p-4 md:p-6 cursor-pointer group h-full flex flex-col items-center text-center"
                    >
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, #9b6dbd, #f4845f)',
                          boxShadow: '0 4px 16px rgba(155,109,189,0.4)',
                        }}
                      >
                        <span className="text-2xl md:text-3xl">{game.emoji}</span>
                      </div>
                      <h3 className="text-white font-bold text-base mb-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        {game.name}
                      </h3>
                      <p className="text-purple-400/40 text-xs mb-2">{game.desc}</p>
                      <span className="text-[9px] text-purple-500/40 uppercase tracking-wider">
                        {game.category}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-10 text-purple-400/30 italic text-xs"
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}
              >
                I made all of these for you to enjoy whenever you want 💜
              </motion.p>
            </motion.div>
          )}

          {activeGame !== 'hub' && activeGame !== 'catch' && (
            <motion.div
              key={`game-${activeGame}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                onClick={() => setActiveGame('hub')}
                className="btn-love text-xs px-6 py-2 mb-6 relative inline-block"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                ← Back to Games
              </motion.button>

              {activeGameInfo?.component}
            </motion.div>
          )}

          {activeGame === 'catch' && (
            <motion.div
              key={`game-${activeGame}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                onClick={() => setActiveGame('hub')}
                className="btn-love text-xs px-6 py-2 mb-6 relative inline-block"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                ← Back to Games
              </motion.button>

              <CatchMyHeart />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
