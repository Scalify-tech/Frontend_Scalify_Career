/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#080808',
        s1: '#0f0f0f',
        s2: '#161616',
        s3: '#1e1e1e',
        border: '#222',
        orange: '#ff5210',
        'orange-d': '#cc4010',
        cream: '#ede8dc',
        muted: '#737373',
        muted2: '#3a3a3a',
      },
      fontFamily: {
        sans: ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        dm: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        r: '8px',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        grow: {
          from: { height: '0px' },
          to: { height: '56px' },
        },
        slideUp: {
          from: { transform: 'translateY(40px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        pop: {
          from: { transform: 'scale(0.4)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        scrollHintPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        menuBackdrop: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        menuPanelSlide: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        menuItemIn: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        menuPanelSlideOut: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        menuBackdropOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        logoReveal: {
          '0%': { opacity: '0', transform: 'scale(0.97) translateY(4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        tickerShimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        stepSlideNext: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        stepSlidePrev: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease both',
        'fadeUp-1': 'fadeUp 0.65s 0.1s ease both',
        'fadeUp-2': 'fadeUp 0.65s 0.2s ease both',
        fadeIn: 'fadeIn 1.2s 1s ease both',
        pulse: 'pulse 2s infinite',
        ticker: 'ticker 20s linear infinite',
        grow: 'grow 1.4s 1.5s ease both',
        slideUp: 'slideUp 0.4s ease both',
        pop: 'pop 0.5s ease',
        spin: 'spin 0.6s linear infinite',
        scrollHintPulse: 'scrollHintPulse 2s ease-in-out infinite',
        menuBackdrop: 'menuBackdrop 0.3s ease-out forwards',
        menuPanelSlide: 'menuPanelSlide 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        menuItemIn: 'menuItemIn 0.4s ease-out both',
        menuPanelSlideOut: 'menuPanelSlideOut 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        menuBackdropOut: 'menuBackdropOut 0.28s ease-out forwards',
        tickerShimmer: 'tickerShimmer 4s ease-in-out infinite',
        logoReveal: 'logoReveal 0.6s 0.15s ease-out forwards',
        stepSlideNext: 'stepSlideNext 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        stepSlidePrev: 'stepSlidePrev 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards',
      },
    },
  },
  plugins: [],
};
