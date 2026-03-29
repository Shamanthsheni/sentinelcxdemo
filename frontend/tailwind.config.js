/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unionBlue: '#003d6a',
        unionBlueLight: '#005b9f',
        unionRed: '#e31e24',
        unionRedLight: '#f53d43',
        grayBg: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'scale-fade': 'scaleFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'bounce-pulse': 'bouncePulse 1s ease-out forwards',
        'number-scale': 'numberScale 0.3s ease-out',
      },
      keyframes: {
        scaleFade: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        bouncePulse: {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(20px)' },
          '40%': { opacity: '1', transform: 'scale(1.05) translateY(-5px)' },
          '70%': { transform: 'scale(0.98) translateY(0)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        numberScale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
