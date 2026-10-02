import { readdir, readFile } from 'node:fs/promises';
import { join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pages = (await walk(DIST)).sort();
const site = 'https://yuuvi.com';

// Astro sirve /ruta/ desde /ruta.html, así que normalizamos igual que el canonical
const toRoute = (p) => '/' + relative(DIST, p).replace(/index\.html$/, '').replace(/\.html$/, '/');

// Rutas que existen en dist/
const existing = new Set(pages.map(toRoute));

let totalWords = 0;
let articlePages = 0;

for (const page of pages) {
  const route = toRoute(page);
  const html = await readFile(page, 'utf8');

  // 1. canonical
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonical) fail(`${route} — falta canonical`);
  else if (canonical !== site + route) warn(`${route} — canonical apunta a ${canonical}`);

  // 2. title y description
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (!title) fail(`${route} — sin title`);
  else if (title.length > 65) warn(`${route} — title largo (${title.length} car., ideal <=65)`);

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  if (!desc) fail(`${route} — sin meta description`);
  else if (desc.length > 165) warn(`${route} — description larga (${desc.length} car., ideal <=165)`);

  // 3. JSON-LD válido
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(m[1]);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      for (const obj of list) {
        // URLs absolutas en campos que schema.org exige
        for (const field of ['url', '@id']) {
          if (typeof obj[field] === 'string' && !obj[field].startsWith('http')) {
            fail(`${route} — JSON-LD ${obj['@type']}.${field} no es URL absoluta: ${obj[field]}`);
          }
        }
        for (const img of obj.image ?? []) {
          if (typeof img === 'string' && !img.startsWith('http')) {
            fail(`${route} — JSON-LD ${obj['@type']}.image no es URL absoluta: ${img}`);
          }
        }
      }
    } catch (e) {
      fail(`${route} — JSON-LD inválido: ${e.message}`);
    }
  }

  // 4. hreflang coherentes
  const alts = [...html.matchAll(/rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g)].map((m) => ({
    hreflang: m[1],
    href: m[2],
  }));
  const langs = alts.map((a) => a.hreflang);
  if (new Set(langs).size !== langs.length) {
    fail(`${route} — hreflang duplicado: ${langs.join(', ')}`);
  }
  for (const a of alts) {
    const path = new URL(a.href).pathname;
    if (!existing.has(path)) {
      fail(`${route} — hreflang ${a.hreflang} apunta a página inexistente: ${path}`);
    }
  }

  // 5. enlaces internos rotos
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (href.startsWith('//')) continue;
    if (existing.has(href)) continue;
    if (/\.(css|js|xml|png|svg|webp|ico|txt)$/.test(href) && !existing.has(href)) {
      // assets existen como fichero, no como directorio/index
      continue;
    }
    fail(`${route} — enlace interno roto: ${href}`);
  }

  // 6. recuento de palabras en artículos
  // Detectamos artículos por el contenedor article-content, no por la ruta:
  // así se cuentan también los de /en/ y se excluyen legales, 404 y listados.
  const body = html.match(/<div class="article-content[^"]*"[\s\S]*?<\/div>/)?.[0] ?? '';
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words > 0) {
    totalWords += words;
    articlePages++;
    if (words < 800) {
      warn(`${route} — solo ${words} palabras (AdSense pide 800+)`);
    }
  }
}

const articles = articlePages;

console.log(`\n  ${pages.length} páginas · ${articles} artículos · ${totalWords} palabras en artículos\n`);

for (const w of warnings) console.log(`  aviso  ${w}`);
for (const e of errors) console.log(`  ERROR  ${e}`);

console.log(`\n  ${errors.length} errores · ${warnings.length} avisos\n`);

process.exit(errors.length > 0 ? 1 : 0);
