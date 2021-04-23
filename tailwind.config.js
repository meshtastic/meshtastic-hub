module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#67ea94',
        'gray-100': '#F0F6FC',
        'gray-200': '#C9D1D9',
        'gray-300': '#B1BAC4',
        'gray-400': '#8B949E',
        'gray-500': '#6E7681',
        'gray-600': '#484F58',
        'gray-700': '#30363D',
        'gray-800': '#21262D',
        'gray-900': '#161B22',
        'gray-1000': '#0D1117',
      },
    },
  },
  // variants: {
  //   extend: {},
  // },
  plugins: [],
};
