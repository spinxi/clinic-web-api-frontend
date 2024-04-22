/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        customred: {
          50: '#FF93A6',
          100: '#FF2C52',
        },
        maincolor: {
          50: '#18A4E1',
          100: '#053354',
        },
      }
    },
  },
  plugins: [],
}

