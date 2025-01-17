/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'primary' : '#1D1F22',
        'secondary' : '#5ECE7B',
      },
      fontFamily: {
        raleway: ['Raleway', "sans-serif"],
      },
      screens: {
        'xl': '1440px',
      },
      fontSize: {
        'cat': '2.625rem',
      },
      lineHeight: {
        'extra': '4.25rem',
      },
      boxShadow: {
        all: '0 3px 10px 7px rgba(29, 31, 34, 0.1)', // Example for all directions
      },
      scrollbar: {
        hide: 'scrollbar-width: none; -ms-overflow-style: none;',
      },
    },
  },
  plugins: [],
};
