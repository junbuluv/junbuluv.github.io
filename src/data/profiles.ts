// Scholarly + professional profiles. Single source of truth for the
// homepage rel="me" links, JSON-LD `sameAs`, and the contact page listing.
// To add a profile (Google Scholar, ORCID, GitHub, etc.) drop another entry.

export type Profile = {
  label: string;
  url: string;
  /** Short display string for the contact page, e.g. "ssrn.com/author=...". */
  display: string;
};

export const profiles: Profile[] = [
  {
    label: 'SSRN',
    url: 'https://papers.ssrn.com/Sol3/Cf_Dev/AbsByAuth.cfm?per_id=6460686',
    display: 'papers.ssrn.com/author=6460686',
  },
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
