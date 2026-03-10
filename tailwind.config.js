/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        terminal: ['"VT323"', '"Courier New"', 'monospace'],
        mono: ['"Share Tech Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        platinum: {
          100: '#f5f5f0',
          200: '#e8e8e2',
          300: '#d4d4cc',
          400: '#b8b8ae',
          500: '#9c9c90',
          600: '#787872',
        },
        game: {
          bg: '#0a0a1a',
          primary: '#00ff88',
          secondary: '#ff6b35',
          accent: '#8b5cf6',
          gold: '#ffd700',
        },
      },
      boxShadow: {
        window: '0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)',
        dock: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      keyframes: {
        'spring-in': {
          '0%': { opacity: '0', transform: 'scale(0.6) translateY(20px)' },
          '60%': { opacity: '1', transform: 'scale(1.04) translateY(-4px)' },
          '80%': { transform: 'scale(0.98) translateY(2px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'spring-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.7) translateY(30px)' },
        },
        'crt-flicker': {
          '0%, 95%, 100%': { opacity: '1' },
          '96%': { opacity: '0.92' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.95' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'bar-grow': {
          'from': { width: '0%' },
        },
        'spinner-pulse': {
          '0%, 80%, 100%': { background: '#b0b0a8', transform: 'scale(0.85)' },
          '40%': { background: '#1a1a18', transform: 'scale(1.1)' },
        },
        'icon-bounce': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(0.88)' },
          '70%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'spring-in': 'spring-in 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'spring-out': 'spring-out 0.28s cubic-bezier(0.4,0,1,1) forwards',
        'crt-flicker': 'crt-flicker 8s infinite',
        'shimmer': 'shimmer 2s infinite',
        'icon-bounce': 'icon-bounce 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
}
