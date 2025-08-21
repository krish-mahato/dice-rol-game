/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        secondary: '#00D1B2',
        surface: '#0B1021',
        card: '#11162A',
        accent: '#FFD166'
      },
        boxShadow: {
          soft: '0 10px 25px rgba(0,0,0,0.25)'
        }
    },
  },
  plugins: [],
}