// Scholarly + professional profiles. Single source of truth for the
// homepage rel="me" links, JSON-LD `sameAs`, and the contact page listing.
// To add a profile (Google Scholar, ORCID, GitHub, etc.) drop another entry.

export type Profile = {
  label: string;
  url: string;
  /** Short display string for the contact page, e.g. "github.com/junbuluv". */
  display: string;
};

export const profiles: Profile[] = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jun-yoo-91ba14155',
    display: 'linkedin.com/in/jun-yoo',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/junbuluv',
    display: 'github.com/junbuluv',
  },
];

// Hosted job market paper (public/jmp.pdf). Listed first on the contact page,
// but kept out of `profiles`: it is a file, not an identity, so it must not
// feed rel="me" or JSON-LD `sameAs`.
export const jmpLink: Profile = {
  label: 'JMP',
  url: 'https://junbuluv.github.io/jmp.pdf',
  display: 'junbuluv.github.io/jmp.pdf',
};
