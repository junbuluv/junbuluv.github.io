/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Baruch navy (#05336B, the college's official blue) over a cool
        // oxford paper base. Navy drives links, active nav, the solid header
        // band, the CV button, badges, and 1px hairlines; ink/paper/rule
        // remain the neutral base.
        ink: {
          DEFAULT: '#2b3441', // body text (slate)
          soft: '#66707d',    // secondary text
          accent: '#4c596a',  // legacy slot (non-accent borders)
          hover: '#7c8899',   // legacy hover
        },
        navy: {
          DEFAULT: '#05336B', // links, active nav, header band, badges, hairlines
          hover: '#1a4e94',   // link / interactive hover
          tint: '#e9eef6',    // badge background, faint fills
          line: '#b9c8dd',    // soft navy border (badges, card hover)
        },
        paper: {
          DEFAULT: '#f5f7fa', // page background (cool oxford)
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
