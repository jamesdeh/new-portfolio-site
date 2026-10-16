// copies the pinned sveltia cms bundle into public/admin before each build
// self-hosting keeps /admin off third-party script hosts
import fs from 'node:fs';
import path from 'node:path';

const from = 'node_modules/@sveltia/cms/dist';
const to = 'public/admin';
fs.mkdirSync(path.join(to, 'chunks'), { recursive: true });
fs.copyFileSync(path.join(from, 'sveltia-cms.js'), path.join(to, 'sveltia-cms.js'));
for (const f of fs.readdirSync(path.join(from, 'chunks')).filter((f) => f.endsWith('.js'))) {
  fs.copyFileSync(path.join(from, 'chunks', f), path.join(to, 'chunks', f));
}
console.log('copied sveltia cms into public/admin');
