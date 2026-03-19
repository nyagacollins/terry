'use client'

import { motion } from 'framer-motion'

interface TimelineItem {
  id: number
  date: string
  title: string
  description: string
  emoji: string
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: 'feb 09, 2025',
    title: 'How We Met',
    description: 'To this day that remains the day Ill always remember🫴how nervous you were🥹excited😍almost star struck🤭you looked cute with your glasses and you looked tiny i cant lie😅my heart was throbbing so fast but i had to hold my composure so that i dont look like a baby seeing some candy 😃🍬🍭😅but i was genuinely happy and scared at the same time cause i didnt know what you expected🥹🤧the vibez remained the same as they were on the phone and we were all smiles and giggles all night🤭that was the greatest moment of last year no cap🥹📌💯if we were to write a letter about the greatest time of 2025 that would be my first thought🥹and i will forever keep you in my heart darling❤️I Love you♥️,',
    emoji: '✨'
  },
  {
    id: 2,
    date: 'feb 09, 2025',
    title: 'First Conversation',
    description: 'It was as beautiful and amazing as we did on the phone🥹but this time it was more romantic cause i could see your actions and actually feel you in my presence🥺cracking jokes as we always do🤭hurting each others ribs with our jokes😂thats on the phone📱if its our first conversation on day one i cant lie i cant remember😂but i know it was all jokes and flirts🥰🤭.',
    emoji: '💬'
  },
  {
    id: 3,
    date: 'June 07, 2025',
    title: 'First Date',
    description: 'Remember it was just us going for chips and chicken for dinner🤭not planned just decided to go on the last minute⌛i hope you had fun and was happy cause you looked happy🥹i look at those pictures almost everyday,,my baby looked happy🥹❤️and beautiful of course😌more dates and outings are definitely on the way💯lets cherish the moments and show each other how much we appreciate each other❤️.',
    emoji: '🌅'
  },
  {
    id: 4,
    date: 'march 20, 2025',
    title: 'We Became Official',
    description: 'Best moment of my life🥹waited for it for so long that we cant even tell when it happened🤧💓that is how excited and eager we were to be each others partner🥹.',
    emoji: '💍'
  },
  {
    id: 5,
    date: 'Throughout Our Journey',
    title: 'Special Memories',
    description: 'The little laughs🤭late talks🥺the games we play with each other even though I am waaay stronger than you🤭the movie nights 🎬🍿🎥every second with you is a special moment🤞💯♥️and promise to create more memories together🫂💓.',
    emoji: '📸'
  },
  {
    id: 6,
    date: 'Now',
    title: 'Challenges We Overcame',
    description: 'We have faced a lot in this journey of ours🥹arguments, fights and a lot more have come to test our bond🤧but we stood our ground and chose to face them together and conquered some and some we will as we continue with out journey🤞❤️love is stronger if both parties value and trust each other🫂and i promise you no matter what happens or occurs that make you feel like i dont trust you just know that i trust you with all my heart ❤and if i had another life in another multi verse i would still choose you as my partner🫂♥️💍.There will he more challenges on the way and i promise to stand beside you to fight every one of them🤞💯you are not alone and will never be❤️🥹as long as we keep God in our relationship nothing can shake us🤞♥️.',
    emoji: '💪'
  }
]

export default function Timeline() {
  return (
    <section className="section-gradient py-20 relative">
      <div className="max-w-4xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Love Story 📖
          </h2>
          <p className="text-gray-600 text-lg">
            A timeline of our beautiful journey together
          </p>
        </motion.div>

        {/* Timeline line */}
        <div className="timeline-line hidden md:block" />

        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center md:justify-${index % 2 === 0 ? 'start' : 'end'}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-2xl z-10 shadow-lg">
                {item.emoji}
              </div>

              {/* Content card */}
              <div className={`ml-16 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <span className="text-pink-500 font-medium text-sm">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-bold text-purple-800 mt-1 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
