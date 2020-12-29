module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Archivo Narrow', 'sans-serif'],
      serif: ['PT Serif', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
