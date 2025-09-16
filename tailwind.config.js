/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2B59C3',
        'primary-green': '#5FAD56',
        'accent-teal': '#4CB9E7',
        'accent-orange': '#F7B733',
        'dark-navy': '#1A237E',
        'off-white': '#F8F9FA',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
