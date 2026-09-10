/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'kaben-dark': '#08070A',
        'kaben-blue': '#0EA5E9',
        'kaben-orange': '#F97316',
        'kaben-purple': '#A855F7',
        'kaben-cyan': '#06B6D4',
      },
    },
  },
  plugins: [],
};
