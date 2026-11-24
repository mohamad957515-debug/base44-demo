/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#05070C',
        night: '#080B12',
        panel: '#0B1119',
        azure: {
          DEFAULT: '#0A5CFF',
          400: '#3D82FF',
          300: '#6FA6FF',
          200: '#A9C8FF',
          soft: '#EAF1FF',
        },
        muted: '#8C9AAB',
      },
      fontFamily: {
        sans: ['Vazirmatn', 'Tahoma', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 80px -24px rgba(10, 92, 255, 0.55)',
        card: '0 30px 80px -40px rgba(0, 0, 0, 0.9)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '72px 72px',
      },
    },
  },
  plugins: [],
}
