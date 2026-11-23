/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F9F9F7',
        ink: '#111111',
        gold: {
          DEFAULT: '#A68966',
          soft: '#C4AC8C',
          deep: '#8B7051',
        },
        linen: '#E2E2DE',
        stone: '#6E6E68',
        mist: '#F1F1EC',
      },
      fontFamily: {
        sans: ['Vazirmatn', 'Tahoma', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Times New Roman', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        shell: '1320px',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        soft: '0 24px 80px -32px rgba(17,17,17,0.22)',
        card: '0 40px 120px -60px rgba(17,17,17,0.35)',
      },
    },
  },
  plugins: [],
}
