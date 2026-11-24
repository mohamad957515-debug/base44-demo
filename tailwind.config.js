/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#62C4FF',
          deep: '#269FE8',
          ink: '#0E7CC0',
          light: '#E8F7FF',
        },
        ink: {
          DEFAULT: '#172B3A',
          soft: '#667784',
        },
        cloud: {
          DEFAULT: '#FFFFFF',
          gray: '#EAF2F6',
          soft: '#F6FBFE',
        },
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 40px 90px -50px rgba(23, 43, 58, 0.45)',
        card: '0 22px 60px -34px rgba(23, 43, 58, 0.4)',
        lift: '0 30px 70px -30px rgba(23, 43, 58, 0.28)',
      },
      maxWidth: {
        shell: '1240px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
