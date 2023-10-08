import { colors } from "./src/constants/colors"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: "Kadwa",
    },
    extend: {
      colors: colors,
    },
  },
  darkMode: "class",
  plugins: ["prettier-plugin-tailwindcss"],
}
