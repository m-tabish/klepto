/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/popup/**/*.{html,tsx,ts}',
    './src/options/**/*.{html,tsx,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"DM Mono"', '"IBM Plex Mono"', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        serif: ['"Instrument Serif"', 'serif'],
      },
      colors: {
        Klepto: {
          bg: '#141416',
          surface: '#1F1F1F',
          elevated: '#28282b',
          input: '#1a1a1c',
          primary: '#FFB900',
          secondary: '#F78200',
          accent: '#F78200',
          text: '#f4f7fb',
          'text-secondary': '#d9dee7',
          muted: '#9ca3af',
          dim: '#6b7280',
          border: 'rgba(255, 255, 255, 0.12)',
          'border-hover': 'rgba(255, 185, 0, 0.4)',
          success: '#5EBD3E',
          warning: '#FFB900',
          error: '#E24A4A',
        },
      },
      boxShadow: {
        'glow-primary': '0 0 16px rgba(255, 185, 0, 0.25)',
        'glow-accent': '0 0 16px rgba(247, 130, 0, 0.25)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
