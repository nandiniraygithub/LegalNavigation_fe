/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#800020', // Maroon
          light: '#9a1a3c',
          dark: '#660019',
        },
        secondary: {
          DEFAULT: '#4a4a4a', // Grey
          light: '#666666',
          dark: '#333333',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
