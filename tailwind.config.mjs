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
          // MOCKUP: Baruch navy (#05336B) trial — token names kept for the
          // preview; rename to `navy`/`accent` if the theme ships.
          DEFAULT: '#05336B', // links, active nav, CV button, badge text, hairlines
          hover: '#1a4e94',   // link / interactive hover
          tint: '#e9eef6',    // badge background, faint fills
          line: '#b9c8dd',    // soft navy border (badges, card hover)
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
