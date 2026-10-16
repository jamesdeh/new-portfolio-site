// the commit this build came from, for the footer readout
// cloudflare workers builds sets WORKERS_CI_COMMIT_SHA, locally we ask git
import { execSync } from 'node:child_process';
import { site } from '../config/site';

let sha = process.env.WORKERS_CI_COMMIT_SHA || '';
if (!sha) {
  try {
    sha = execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    sha = '';
  }
}

export const commit = sha ? { short: sha.slice(0, 7), url: `${site.repo}/commit/${sha}` } : null;
