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
        'emerald-brand': '#10B981',
        lavender: '#8B5CF6',
        coral: '#FB923C',
        accent: {
          DEFAULT: '#10B981',
          hover: '#34D399',
          light: '#d1fae5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
