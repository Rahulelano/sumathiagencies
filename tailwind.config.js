/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#e0f2fe',
          DEFAULT: '#0284c7',
          dark: '#0369a1',
          navy: '#0c2340',
        },
      },
    },
  },
  plugins: [],
};
