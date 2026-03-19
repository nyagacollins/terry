'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const loveLetterText = `Dear, Gummy bear 🐻❤️ ,

Today means so much more than just a date on the calendar📅 It marks one beautiful year of us being together🥹 but also five amazing years of friendship🤞 memories✨ and a bond that has only grown stronger with time❤️. And honestly, that makes what we have even more special💫

We didn’t just start as lovers,we started as friends. We learned each other, laughed together, supported each other and built something real long before we even became a couple🥹❤️and I think that’s why loving you feels so natural, so easy, and so right🫶❤️‍🔥
This past year with you has been nothing short of amazing✨💞 You’ve shown me a kind of love that’s genuine, comforting, and full of peace💖. You’ve been my happiness on my good days and my strength on my bad ones🫂Being with you feels like home, and that’s something I’ll never take for granted💯🤞
When I think about everything we’ve been through over these five years....from friendship to love💘I can’t help but feel proud of us🥹 Proud of how far we’ve come, how we’ve grown, and how we’ve chosen each other through it all🤗💝
You’re not just my girlfriend, you’re my best friend🤞, my safe place🏡, and the person I trust with my heart completely❤️‍🔥❤and I wouldn’t trade what we have for anything in this world📌🩷
As we celebrate today, I just want you to know how deeply I appreciate you🥰 and how much you truly mean to me🤲 Thank you for being part of my life, for loving me, and for walking this journey with me🫶💋🥂Here’s to our first year of love❤️ five years of friendship🩵🤞, and many more years of us building something even more beautiful together🫂💓
I love you, always and forever ❤️.

Forever yours,
Carlos 💕`

export default function LoveLetter() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < loveLetterText.length) {
        setDisplayedText(loveLetterText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        setIsTypingComplete(true)
      }
    }, 40)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            A Letter for You 💌
          </h2>
          <p className="text-gray-600 text-lg">
            Words from my heart to yours
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border-2 border-pink-100 relative"
        >
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-4xl">💕</div>
          <div className="absolute top-4 right-4 text-4xl">💕</div>
          <div className="absolute bottom-4 left-4 text-4xl">💕</div>
          <div className="absolute bottom-4 right-4 text-4xl">💕</div>

          {/* Letter content */}
          <div className="font-serif text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
            <span className="typing-cursor">{displayedText}</span>
            {isTypingComplete && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-2"
              >
                💖
              </motion.span>
            )}
          </div>

          {/* Restart typing button */}
          {!isTypingComplete && (
            <div className="mt-6 text-center">
              <span className="text-pink-400 text-sm">
                Typing...
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

