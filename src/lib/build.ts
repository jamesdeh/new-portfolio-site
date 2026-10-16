// the commit this build came from, for the footer readout
// git first, then the ci variables, and only ever a real hex sha
import { execSync } from 'node:child_process';
import { site } from '../config/site';

const isSha = (s = '') => /^[0-9a-f]{7,40}$/i.test(s.trim());

let sha = '';
try {
  sha = execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
} catch {
  sha = '';
}
if (!isSha(sha)) sha = [process.env.WORKERS_CI_COMMIT_SHA, process.env.GITHUB_SHA].find((s) => isSha(s)) ?? '';

export const commit = sha ? { short: sha.slice(0, 7), url: `${site.repo}/commit/${sha}` } : null;
