/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Alef"', 'sans-serif']
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    styled: false,
    themes: false,
    base: false,
    utils: false,
    logs: false,
    rtl: false,
  },
  darkMode: 'class',
}

