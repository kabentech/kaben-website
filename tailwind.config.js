/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050506',
        surface: '#0D0D11',
        line: '#1E1E24',
        muted: '#8B8B96',
        'accent-from': '#5EE7FF',
        'accent-to': '#8A5CFF',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(90deg, #5EE7FF 0%, #8A5CFF 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
