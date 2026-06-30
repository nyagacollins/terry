/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'love-lilac': '#c8a8e9',
        'love-purple': '#9b6dbd',
        'love-lavender': '#ede7f6',
        'love-dark': '#3b1f5e',
        'love-red': '#e05c5c',
        'love-orange': '#f4845f',
        'love-pink': '#f7b8c8',
      },
      fontFamily: {
        'romantic': ['Dancing Script', 'cursive'],
        'elegant': ['Quicksand', 'sans-serif'],
        'serif-elegant': ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
