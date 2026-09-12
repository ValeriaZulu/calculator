/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          100: '#FAF6F0',
          200: '#F5EBE1',
          300: '#EADBC8',
        },
        pastelPink: {
          100: '#FFF0F5',
          200: '#FFD1DC',
          300: '#FFB6C1',
          400: '#FFA0B4',
        }
      },
      boxShadow: {
        'neu-pressed': 'inset 3px 3px 6px #d1c7bc, inset -3px -3px 6px #ffffff',
        'neu-flat': '5px 5px 10px #d1c7bc, -5px -5px 10px #ffffff',
        'neu-pink': '5px 5px 10px #e0a4b0, -5px -5px 10px #ffffff',
      }
    },
  },
  plugins: [],
}