/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Burgundy accent over a warm cream/brown base. Burgundy drives links,
        // active nav, the CV button, badges, and 1px hairlines; ink/cream/rule
        // remain the neutral base.
        ink: {
          DEFAULT: '#34302d', // body text
          soft: '#6e6862',    // secondary text
          accent: '#5c524a',  // legacy taupe (kept for non-accent borders)
          hover: '#7a6e64',   // legacy hover
        },
        burgundy: {
          DEFAULT: '#7a2e3a', // links, active nav, CV button, badge text, hairlines
          hover: '#9a4452',   // link / interactive hover
          tint: '#f6e9eb',    // badge background, faint fills
          line: '#d8b6bc',    // soft burgundy border (badges, card hover)
        },
        cream: {
          DEFAULT: '#f7f3e9', // page background
          alt: '#ede8da',     // chip / panel background
          card: '#fffdf8',    // card surface (a hair lighter than the page)
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
