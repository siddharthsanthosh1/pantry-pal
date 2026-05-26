/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#2D6A4F',
        primaryLight: '#40916C',
        primaryDark: '#1B4332',
        accent: '#D8F3DC',
        surface: '#FFFFFF',
        background: '#F8FAF9',
        muted: '#52796F',
        warning: '#E9C46A',
        danger: '#E76F51',
        safe: '#52B788',
        urgent: '#F4A261',
        critical: '#E76F51',
        darkBg: '#0F1419',
        darkSurface: '#1A2332',
        darkCard: '#243044',
      },
    },
  },
  plugins: [],
};
