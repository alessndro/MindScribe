/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightPurple': '#A598FF',
        'mediumPurple': "#7D6BFE",
        'hardPurple': "#5E47F8",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
