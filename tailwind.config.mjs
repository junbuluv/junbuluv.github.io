/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Burgundy/cream academic palette, matching the original style.css.
        ink: {
          DEFAULT: '#34302d', // body text
          soft: '#6e6862',    // secondary text
          accent: '#5c524a',  // links / borders
          hover: '#7a6e64',   // link hover
        },
        cream: {
          DEFAULT: '#f7f3e9', // page background
          alt: '#ede8da',     // chip / panel background
        },
        rule: '#ddd8d2',      // borders, dividers
      },
      fontFamily: {
        serif: ['"Palatino Linotype"', 'Palatino', '"Book Antiqua"', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '760px',
      },
    },
  },
  plugins: [],
};
