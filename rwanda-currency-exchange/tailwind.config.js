/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'cstm': '0 0 2px 1px rgb(0 0 0 / 0.1)'
      }
    },
  },
  plugins: [],
}

