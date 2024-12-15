module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'dark-bg': '#0A0A0A',
        'darker-bg': '#050505',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #39FF14, 0 0 15px #39FF14' },
          '100%': { textShadow: '0 0 10px #39FF14, 0 0 30px #39FF14' },
        },
      },
    },
  },
  plugins: [],
}
