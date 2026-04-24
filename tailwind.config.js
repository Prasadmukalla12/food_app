/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        avocado: {
          100: "#f7f7f7",
          200: "#e6f4d7",
          300: "#cdebb0",
          400: "#a7d98b",
          500: "#7bc96f",
        },
      },
      fontFamily: {
        display: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [],
}