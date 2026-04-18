/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['Sora', 'sans-serif'],
      },
      colors: {
        skybrand: {
          50: '#ebf8ff',
          100: '#d6f0ff',
          400: '#4ea6e8',
          500: '#2b88cf',
          700: '#1c5f94',
          900: '#103755',
        },
        ember: {
          300: '#f5b65f',
          400: '#eb9e35',
          500: '#d7871d',
        },
      },
      boxShadow: {
        soft: '0 14px 35px -18px rgba(16, 55, 85, 0.45)',
      },
    },
  },
  plugins: [],
}

