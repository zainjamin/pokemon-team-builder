/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-background-hover': '#FFF2F2',
        'light-background-pressed': '#FFCACA',
        'light-text-color': '#323c3e',
        'light-text-color-hover': '#1f282a',
        'light-text-color-pressed': '#000b0e',
        'light-accent-color': '#ff7c7c',
        'light-accent-color-hover': '#E26767',
        'light-accent-color-pressed': '#C55454',
      },
    },
  },
  plugins: [],
};
