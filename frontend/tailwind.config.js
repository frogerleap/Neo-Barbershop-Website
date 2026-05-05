/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          yellow:  '#FFE44D',
          orange:  '#FF7A00',
          blue:    '#00C2FF',
          pink:    '#FF2E63',
          green:   '#00D26A',
          purple:  '#9B5DE5',
          light:   '#FFF7E8',
          black:   '#0A0A0A',
          white:   '#FFFFFF',
          gray:    '#F0F0F0',
        }
      },
      fontFamily: {
        sans:    ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
        display: ['Oswald', 'Arial Black', 'sans-serif'],
      },
      boxShadow: {
        'neo-xs':     '2px 2px 0px #0A0A0A',
        'neo-sm':     '4px 4px 0px #0A0A0A',
        'neo':        '6px 6px 0px #0A0A0A',
        'neo-md':     '8px 8px 0px #0A0A0A',
        'neo-lg':     '12px 12px 0px #0A0A0A',
        'neo-pink':   '6px 6px 0px #FF2E63',
        'neo-blue':   '6px 6px 0px #00C2FF',
        'neo-orange': '6px 6px 0px #FF7A00',
        'neo-yellow': '6px 6px 0px #FFE44D',
        'neo-green':  '6px 6px 0px #00D26A',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
      },
      borderRadius: {
        'neo': '4px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'rotate(3deg) translateY(0px)' },
          '50%':       { transform: 'rotate(3deg) translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'rotate(-2deg) translateY(0px)' },
          '50%':       { transform: 'rotate(-2deg) translateY(-8px)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%':       { transform: 'rotate(3deg)' },
        },
        pulse2: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':       { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'float':         'float 3s ease-in-out infinite',
        'float-reverse': 'floatReverse 3.5s ease-in-out infinite',
        'slide-up':      'slideUp 0.4s ease-out forwards',
        'slide-down':    'slideDown 0.2s ease-out forwards',
        'fade-in':       'fadeIn 0.5s ease-out forwards',
        'marquee':       'marquee 25s linear infinite',
        'wiggle':        'wiggle 2s ease-in-out infinite',
        'pulse2':        'pulse2 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
