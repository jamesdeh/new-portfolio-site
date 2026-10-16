// one place for facts the pages share
import { flag } from './flag.mjs';
// anything in [brackets] is a placeholder james still has to fill

export const site = {
  name: 'James de Hair',
  title: 'James de Hair · Cybersecurity engineering student',
  description:
    'Third-year cybersecurity engineering student at VUW. Security Engineering intern at Atlassian, Sydney, from November 2026.',
  // [PLACEHOLDER] no domain yet, swap both when it's bought
  domain: '[domain]',
  email: 'james@[domain]',
  accent: 'red',
  github: 'https://github.com/jamesdeh',
  githubLabel: 'github.com/jamesdeh',
  repo: 'https://github.com/jamesdeh/new-portfolio-site',
  linkedin: 'https://www.linkedin.com/in/jamesdehair/',
  linkedinLabel: 'linkedin.com/in/jamesdehair',
  // [PLACEHOLDER] 40 hex chars, grouped in fours
  pgpFingerprint: '',
  // confirmed by james on 2026-10-16
  internship: {
    start: '2026-11-23',
    end: '2027-02-13',
  },
  // hidden flag trail, set in flag.mjs
  flag,
  nowUpdated: '2026-10-16',
} as const;

export const pgpGroups = (fpr: string) =>
  fpr ? fpr.replace(/\s+/g, '').toUpperCase().match(/.{1,4}/g) ?? [] : Array(10).fill('XXXX');

// drafts and pending work show in dev, or in a build with SHOW_DRAFTS=1
export const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === '1';
