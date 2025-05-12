/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-light': 'var(--color-primary-light)',
        secondary: 'var(--color-secondary)',
        'secondary-dark': 'var(--color-secondary-dark)',
        'secondary-light': 'var(--color-secondary-light)',
        tertiary: 'var(--color-tertiary)',
        'tertiary-dark': 'var(--color-tertiary-dark)',
        'tertiary-light': 'var(--color-tertiary-light)',
        'text-light': 'var(--color-text-light)',
        'text-muted': 'var(--color-text-muted)',
        'text-dark': 'var(--color-text-dark)',
        'background-light': 'var(--color-background-light)',
        'background-dark': 'var(--color-background-dark)',
        blue: 'var(--color-blue)',
        'blue-dark': 'var(--color-blue-dark)',
        'blue-light': 'var(--color-blue-light)',
        green: 'var(--color-green)',
        'green-dark': 'var(--color-green-dark)',
        'green-light': 'var(--color-green-light)',
      },
      backgroundColor: {
        primary: 'rgba(var(--color-primary-rgb), <alpha-value>)',
        'primary-dark': 'rgba(var(--color-primary-dark-rgb), <alpha-value>)',
        'primary-light': 'rgba(var(--color-primary-light-rgb), <alpha-value>)',
        secondary: 'rgba(var(--color-secondary-rgb), <alpha-value>)',
        'secondary-dark': 'rgba(var(--color-secondary-dark-rgb), <alpha-value>)',
        'secondary-light': 'rgba(var(--color-secondary-light-rgb), <alpha-value>)',
        tertiary: 'rgba(var(--color-tertiary-rgb), <alpha-value>)',
        'tertiary-dark': 'rgba(var(--color-tertiary-dark-rgb), <alpha-value>)',
        'tertiary-light': 'rgba(var(--color-tertiary-light-rgb), <alpha-value>)',
        blue: 'rgba(var(--color-blue-rgb), <alpha-value>)',
        'blue-dark': 'rgba(var(--color-blue-dark-rgb), <alpha-value>)',
        'blue-light': 'rgba(var(--color-blue-light-rgb), <alpha-value>)',
        green: 'rgba(var(--color-green-rgb), <alpha-value>)',
        'green-dark': 'rgba(var(--color-green-dark-rgb), <alpha-value>)',
        'green-light': 'rgba(var(--color-green-light-rgb), <alpha-value>)',
      },
      textColor: {
        primary: 'rgba(var(--color-primary-rgb), <alpha-value>)',
        'primary-dark': 'rgba(var(--color-primary-dark-rgb), <alpha-value>)',
        'primary-light': 'rgba(var(--color-primary-light-rgb), <alpha-value>)',
        secondary: 'rgba(var(--color-secondary-rgb), <alpha-value>)',
        'secondary-dark': 'rgba(var(--color-secondary-dark-rgb), <alpha-value>)',
        'secondary-light': 'rgba(var(--color-secondary-light-rgb), <alpha-value>)',
        tertiary: 'rgba(var(--color-tertiary-rgb), <alpha-value>)',
        'tertiary-dark': 'rgba(var(--color-tertiary-dark-rgb), <alpha-value>)',
        'tertiary-light': 'rgba(var(--color-tertiary-light-rgb), <alpha-value>)',
        blue: 'rgba(var(--color-blue-rgb), <alpha-value>)',
        'blue-dark': 'rgba(var(--color-blue-dark-rgb), <alpha-value>)',
        'blue-light': 'rgba(var(--color-blue-light-rgb), <alpha-value>)',
        green: 'rgba(var(--color-green-rgb), <alpha-value>)',
        'green-dark': 'rgba(var(--color-green-dark-rgb), <alpha-value>)',
        'green-light': 'rgba(var(--color-green-light-rgb), <alpha-value>)',
      },
      borderColor: {
        primary: 'rgba(var(--color-primary-rgb), <alpha-value>)',
        'primary-dark': 'rgba(var(--color-primary-dark-rgb), <alpha-value>)',
        'primary-light': 'rgba(var(--color-primary-light-rgb), <alpha-value>)',
        secondary: 'rgba(var(--color-secondary-rgb), <alpha-value>)',
        'secondary-dark': 'rgba(var(--color-secondary-dark-rgb), <alpha-value>)',
        'secondary-light': 'rgba(var(--color-secondary-light-rgb), <alpha-value>)',
        tertiary: 'rgba(var(--color-tertiary-rgb), <alpha-value>)',
        'tertiary-dark': 'rgba(var(--color-tertiary-dark-rgb), <alpha-value>)',
        'tertiary-light': 'rgba(var(--color-tertiary-light-rgb), <alpha-value>)',
        blue: 'rgba(var(--color-blue-rgb), <alpha-value>)',
        'blue-dark': 'rgba(var(--color-blue-dark-rgb), <alpha-value>)',
        'blue-light': 'rgba(var(--color-blue-light-rgb), <alpha-value>)',
        green: 'rgba(var(--color-green-rgb), <alpha-value>)',
        'green-dark': 'rgba(var(--color-green-dark-rgb), <alpha-value>)',
        'green-light': 'rgba(var(--color-green-light-rgb), <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-primary)'],
      },
      animation: {
        blob: 'blob 7s infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 2s infinite',
        'spin-slow': 'spin 6s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      transitionDelay: {
        '2000': '2000ms',
        '4000': '4000ms',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'inner-xl': 'inset 0 4px 6px 0 rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    {
      pattern: /bg-(primary|secondary|tertiary)\/\d+/,
    },
    {
      pattern: /text-(primary|secondary|tertiary)\/\d+/,
    },
    {
      pattern: /border-(primary|secondary|tertiary)\/\d+/,
    }
  ]
} 