/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cool Anime Chibi Palette
        'anime-purple': '#667eea',
        'anime-violet': '#764ba2',
        'anime-pink': '#f093fb',
        'anime-coral': '#f5576c',
        'anime-blue': '#4facfe',
        'anime-cyan': '#00f2fe',
        'anime-mint': '#43e97b',
        'anime-yellow': '#ffeaa7',
        'anime-orange': '#fd79a8',

        // Vibrant accents
        'neon-pink': '#ff006e',
        'neon-purple': '#8338ec',
        'neon-blue': '#3a86ff',
        'neon-cyan': '#06ffa5',
        'neon-yellow': '#ffbe0b',

        // Soft backgrounds
        'soft-white': '#fefefe',
        'soft-gray': '#f8f9fa',
        'soft-purple': '#f3f0ff',
        'soft-pink': '#fff0f6',
        'soft-blue': '#f0f8ff',
      },
      fontFamily: {
        'anime': ['Bubblegum Sans', 'Kalam', 'Fredoka', 'sans-serif'],
        'chibi': ['Righteous', 'Bungee', 'Fredoka', 'sans-serif'],
        'kawaii': ['Kalam', 'Comfortaa', 'Quicksand', 'sans-serif'],
        'cute': ['Bubblegum Sans', 'Fredoka', 'Comfortaa', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'bounce-cute': 'bounce-cute 1s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heart-beat': 'heart-beat 1.5s ease-in-out infinite',
        'slide-in-cute': 'slide-in-cute 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        'bounce-cute': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.1)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'heart-beat': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'slide-in-cute': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'kawaii': '0 8px 32px rgba(255, 179, 217, 0.3)',
        'cute': '0 4px 20px rgba(167, 139, 250, 0.2)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
