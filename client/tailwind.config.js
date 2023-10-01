/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        normal: "#A8A878",
        fire: "#F08030",
        water: "#6890f0",
        grass: "#78c850",
        electric: "#f8d030",
        ice: "#98d8d8",
        fighting: "#c03028",
        poison: "#a040a0",
        ground: "#e0c068",
        flying: "#a890f0",
        psychic: "#f85888",
        bug: "#a8b820",
        rock: "#b8a038",
        ghost: "#705898",
        dark: "#705848",
        dragon: "#7038f8",
        steel: "#b8b8d0",
        fairy: "#f0b6bc",
        default: "#F8F7E5",
        primary: "#FE6D7A",
        secondary: "#F1F0CC",
        "primary--darker": "#3F0D12",
        "secondary--darker": "#75624E",
        "secondary--lighter": "#F8F7E5",
      },
    },
  },
  plugins: [],
}
