/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-text-color': '#515b5d',
        'light-accent-color': '#ff7c7c',
      }
    },
  },
  plugins: [],
}
