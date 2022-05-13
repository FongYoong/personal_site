const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Quicksand', ...defaultTheme.fontFamily.sans]
      },
      screens: {
        'xs': '480px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
}
