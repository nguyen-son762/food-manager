module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#ea7c69',
        dark: '#252836',
        'dark-second': '#1f1d2b',
      },
      colors: {
        primary: '#ea7c69',
        'red-main':'#9D0505',
        dark: '#252836',
        'dark-second': '#1f1d2b',
      },
      gridTemplateColumns: {
        192: 'repeat(auto-fill, 12rem)',
      },
    },
  },
  plugins: [],
};
