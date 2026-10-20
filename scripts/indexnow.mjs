/**
 * Avisa a IndexNow (Bing, Yandex, Seznam) de las URL del sitemap.
 *
 * Uso (CI, tras el deploy, porque keyLocation tiene que estar ya en vivo):
 *   INDEXNOW_KEY=<clave> node scripts/indexnow.mjs [--dry-run]
 *
 * La clave vive en el secreto INDEXNOW_KEY y el workflow publica
 * public/<clave>.txt antes del build; no va al repositorio.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const KEY = process.env.INDEXNOW_KEY;
const DRY_RUN = process.argv.includes('--dry-run');

function fail(msg) {
  console.error(`  IndexNow: ${msg}`);
  process.exit(1);
}

if (!KEY) fail('falta la variable INDEXNOW_KEY');
if (!/^[a-zA-Z0-9]{8,128}$/.test(KEY)) {
  fail('INDEXNOW_KEY debe tener 8-128 letras o números (openssl rand -hex 16)');
}

// Recogemos las <loc> de los sitemaps de URL (no del índice, que solo lista sitemaps)
const maps = (await readdir(DIST)).filter((f) => f.startsWith('sitemap') && f.endsWith('.xml'));
if (maps.length === 0) fail(`no hay sitemaps en dist/ — ¿se ha hecho el build?`);

const urls = new Set();
for (const map of maps) {
  const xml = await readFile(join(DIST, map), 'utf8');
  if (xml.includes('<sitemapindex')) continue;
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
}

if (urls.size === 0) fail('los sitemaps no contienen ninguna URL');
if (urls.size > 10_000) fail(`IndexNow admite un máximo de 10.000 URL por envío (hay ${urls.size})`);

const origin = new URL([...urls][0]).origin;
const payload = {
  host: new URL(origin).host,
  key: KEY,
  keyLocation: `${origin}/${KEY}.txt`,
  urlList: [...urls],
};

if (DRY_RUN) {
  const { key, ...rest } = payload;
  console.log(`  IndexNow dry-run: ${payload.urlList.length} URL`);
  console.log(`  keyLocation: ${payload.keyLocation}`);
  console.log(JSON.stringify({ key: `${key.slice(0, 4)}…`, ...rest }, null, 2));
  process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

const body = (await res.text()).slice(0, 300);
if (res.status === 200 || res.status === 202) {
  console.log(`  IndexNow: ${res.status} — ${payload.urlList.length} URL enviadas a ${payload.host}`);
} else {
  console.error(`  IndexNow: HTTP ${res.status} — ${body}`);
  process.exit(1);
}
