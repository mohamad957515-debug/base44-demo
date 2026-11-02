/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F2F5F9",
          100: "#E3EAF2",
          200: "#C5D2E1",
          300: "#9BB0C8",
          400: "#6C8AAD",
          500: "#486E97",
          600: "#345679",
          700: "#25425F",
          800: "#18324D",
          900: "#102842",
          950: "#081A30",
          DEFAULT: "#0A2342",
        },
        gold: {
          light: "#D9C08F",
          DEFAULT: "#C5A059",
          dark: "#A9853F",
        },
        ivory: "#F7F5F0",
        ink: "#101D33",
      },
      fontFamily: {
        // Iran Yekan: site-wide typeface (self-hosted @font-face in src/index.css).
        sans: ["IRANYekan", "Tahoma", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 20px 40px -20px rgba(10, 35, 66, 0.25)",
        elevated: "0 30px 60px -25px rgba(10, 35, 66, 0.35)",
      },
    },
  },
  plugins: [],
};
