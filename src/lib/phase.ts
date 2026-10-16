// before, during or after the internship, worked out at build time
// SITE_NOW=2026-11-26 previews another phase locally
import { site } from '../config/site';

const DAY = 86400000;
const nzst = (d: string, end = false) => new Date(d + (end ? 'T23:59:59+11:00' : 'T00:00:00+11:00'));

export type Phase = 'before' | 'during' | 'after';

export const buildNow = (): Date => (process.env.SITE_NOW ? new Date(process.env.SITE_NOW + 'T12:00:00+11:00') : new Date());

export const start = nzst(site.internship.start);
export const end = nzst(site.internship.end, true);

export function phaseInfo(now = buildNow()) {
  const phase: Phase = now < start ? 'before' : now <= end ? 'during' : 'after';
  const week = phase === 'during' ? Math.min(12, Math.floor((+now - +start) / (7 * DAY)) + 1) : phase === 'after' ? 12 : 0;
  const month = start.toLocaleString('en-NZ', { month: 'short', timeZone: 'Pacific/Auckland' });
  const monthLong = start.toLocaleString('en-NZ', { month: 'long', timeZone: 'Pacific/Auckland' });
  return { phase, week, month, monthLong, overridden: Boolean(process.env.SITE_NOW) };
}

export const pad2 = (n: number) => String(n).padStart(2, '0');

// posts land on the tuesday of each week
export const dueDate = (week: number) => {
  const d = new Date(+start + (1 + 7 * (week - 1)) * DAY);
  return d.toLocaleDateString('en-CA', { timeZone: 'Pacific/Auckland' });
};
