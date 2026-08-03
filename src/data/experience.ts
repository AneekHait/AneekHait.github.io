export type Role = {
  period: string;
  title: string;
  qualifier?: string;
  org: string;
  points: string[];
};

export const experience: Role[] = [
  {
    period: '08/2023 — Present',
    title: 'Software Engineer',
    qualifier: 'Data Analyst',
    org: 'Accenture / Kolkata',
    points: [
      'Analyzed 100+ structured and unstructured datasets containing millions of data points.',
      'Built Tableau and Excel reporting that surfaces trends, outliers, and business priorities.',
      'Translated text analysis and descriptive findings for marketing, finance, product, and senior stakeholders.',
    ],
  },
  {
    period: '07/2022 — 08/2023',
    title: 'Associate Software Engineer',
    qualifier: 'BI Reporting',
    org: 'Accenture / Kolkata',
    points: [
      'Prepared and validated dashboard-ready datasets for recurring stakeholder reporting.',
      'Improved reporting quality through consistency checks, issue resolution, and cleaner preparation routines.',
    ],
  },
  {
    period: '03/2022 — 05/2022',
    title: 'Software Developer Intern',
    org: 'Accenture',
    points: ['Built software delivery foundations across Agile, testing, automation, Selenium, and Java.'],
  },
];

export const education = [
  {
    period: '2019 — 2022',
    title: 'B.Tech in Computer Science & Engineering',
    org: 'Techno International New Town',
  },
  {
    period: '2016 — 2019',
    title: 'Diploma in Computer Science & Technology',
    org: 'Budge Budge Institute of Technology',
  },
];
