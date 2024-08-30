/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { keyframes: {
      'loading-bar': {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(100%)' },
      }},
      animation: {
        'loading-bar': 'loading-bar 1.5s linear infinite',
      },
    },
  },
  plugins: [],
}

