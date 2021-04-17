module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#67ea94',
      },
    },
  },
  // variants: {
  //   extend: {},
  // },
  plugins: [],
};
