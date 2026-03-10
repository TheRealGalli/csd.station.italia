import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC04',
          green: '#34A853',
          'blue-light': '#E8F0FE',
          'red-light': '#FCE8E6',
          'yellow-light': '#FEF7E0',
          'green-light': '#E6F4EA',
        },
        gray: {
          50: '#F8F9FA',
          100: '#F1F3F4',
          200: '#E8EAED',
          300: '#DADCE0',
          400: '#BDC1C6',
          500: '#9AA0A6',
          600: '#80868B',
          700: '#5F6368',
          800: '#3C4043',
          900: '#202124',
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(60, 64, 67, 0.15), 0 1px 2px rgba(60, 64, 67, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(60, 64, 67, 0.1), 0 4px 6px rgba(60, 64, 67, 0.05)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
