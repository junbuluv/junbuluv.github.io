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
          DEFAULT: '#2b3441', // body text (V2 slate)
          soft: '#66707d',    // secondary text
          accent: '#4c596a',  // legacy taupe slot (non-accent borders)
          hover: '#7c8899',   // legacy hover
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
          DEFAULT: '#f5f7fa', // page background (V2 oxford)
          alt: '#e9edf2',     // chip / panel background
          card: '#ffffff',    // card surface
        },
        rule: '#d9dfe7',      // borders, dividers
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
