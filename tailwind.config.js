module.exports = {
  purge: [
    `./components/**/*.{vue,js}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./plugins/**/*.{js,ts}`,
    `./nuxt.config.{js,ts}`,
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
