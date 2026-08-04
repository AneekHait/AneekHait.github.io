export const site = {
  name: 'Aneek Hait',
  role: 'Data & BI Analyst',
  location: 'Kolkata, India',
  url: 'https://aneekhait.github.io',
  tagline: 'I do the analysis, and build the tool when the tool doesn\u2019t exist.',
  description:
    'Aneek Hait is a Data & BI Analyst who turns complex datasets into clear dashboards, rigorous analysis, and decisions teams can trust.',
  now: 'Building reporting systems at Accenture, shipping small tools that remove my own bottlenecks, and looking for work where an analyst is allowed to build.',
  // To enable the resume links: drop the PDF in public/ and set this to its path,
  // e.g. '/aneek-hait-resume.pdf'. While null, every resume link is hidden so the
  // site never ships a 404.
  resume: null as string | null,
  socials: {
    linkedin: 'https://www.linkedin.com/in/aneekhait/',
    github: 'https://github.com/AneekHait',
  },
} as const;

export const nav = [
  { href: '/work', label: 'Work' },
  { href: '/notes', label: 'Notes' },
  { href: '/about', label: 'About' },
] as const;
