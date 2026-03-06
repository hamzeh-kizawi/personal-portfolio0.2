/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0B0F19',
        'brand-light': '#F8FAFC',
        'brand-border-dark': '#1E293B',
        'brand-border-light': '#E2E8F0',
        'cyan-brand': '#06B6D4',
        lavender: '#8B5CF6',
        coral: '#FB923C',
        accent: {
          DEFAULT: '#6366f1',
          hover: '#818cf8',
          light: '#c7d2fe',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
