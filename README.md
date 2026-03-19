# Romantic Anniversary Website 💕

A beautiful, interactive anniversary website built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🔐 **Password-Protected Landing Page** - Keep your surprise secret
- ❤️ **Hero Section** - With background music player
- ⏱️ **Love Counter** - Live countdown of time together
- 📖 **Story Timeline** - Animated scroll-through of your love story
- 📸 **Photo Gallery** - Lightbox-enabled image gallery
- 💌 **Love Letter** - Typing animation reveal
- 🎥 **Video Message** - Custom video player
- 💕 **Reasons I Love You** - Interactive card flip reveal
- 🎁 **Surprise Section** - Confetti celebration
- 🌟 **Future Promises** - Your journey ahead

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your content:**

   ### Password Configuration
   Edit `app/components/PasswordGate.tsx` and change:
   ```typescript
   const CORRECT_PASSWORD = 'iloveyou'
   ```

   ### Her Name
   Edit `app/components/Hero.tsx`:
   ```typescript
   const HER_NAME = 'Amara'
   ```

   ### Anniversary Start Date
   Edit `app/components/Counter.tsx`:
   ```typescript
   const START_DATE = new Date('2023-03-25T00:00:00')
   ```

   ### Love Letter Content
   Edit `app/components/LoveLetter.tsx` - update the `loveLetterText` variable

   ### Gallery Photos
   Edit `app/components/Gallery.tsx` - update the `photos` array with your image URLs

   ### Reasons
   Edit `app/components/Reasons.tsx` - update the `reasons` array

   ### Future Plans
   Edit `app/components/Future.tsx` - update the `promises` array

   ### Surprise
   Edit `app/components/Surprise.tsx` - update the surprise content

3. **Add media files (optional):**
   - Background music: `public/music/romantic.mp3`
   - Video message: `public/video/message.mp3`
   - Photos: Add to `public/images/` or use external URLs

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Visit `http://localhost:3000`

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
- `love-pink`: #ff6b9d
- `love-purple`: #9b59b6
- `love-rose`: #ffe4e9
- `love-dark`: #2d1b4e

### Fonts
The project uses Google Fonts:
- Playfair Display (headings)
- Quicksand (body text)

## Tech Stack

- **Next.js 14** - App Router
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Confetti** - Celebration effects

## Deployment

Build for production:
```bash
npm run build
npm start
```

Or deploy to Vercel:
```bash
vercel
```

---

Made with ❤️ for the love of my life
# carlos
