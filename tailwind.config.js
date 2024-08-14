/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'source-sans': ['"Source Sans 3"', 'sans-serif'],
        'trykker': ['Trykker', 'serif'], 
      },
    },
  },
  plugins: [],
}

