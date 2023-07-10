/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      orange: "#ef6a01",
      transparent: 'transparent',
      black: '#000',
      white: '#cfcfcf',
      gray: {
        100: '#f7fafc',
        500: "rgb(17, 17, 17);",
        900: '#1a202c',
      },
    },
    extend: {},
  },
  plugins: [],
};

