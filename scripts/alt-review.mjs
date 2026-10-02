#!/usr/bin/env node
/**
 * Genera _alt-review.html: las portadas con su coverAlt actual al lado.
 *
 * Es una herramienta de revisión, no parte del sitio: escribe en la raíz y
 * está en .gitignore, así que ni entra en git ni llega al build. Ábrelo con
 *   open _alt-review.html
 * y corrige el texto en src/content/articles/**.md, no aquí.
 *
 * Uso: node scripts/alt-review.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const COVERS = 'src/assets/covers';
const ARTICLES = 'src/content/articles';

const articles = [];
for (const lang of readdirSync(ARTICLES)) {
  for (const file of readdirSync(join(ARTICLES, lang))) {
    if (!file.endsWith('.md') || file.startsWith('.')) continue;
    const raw = readFileSync(join(ARTICLES, lang, file), 'utf8');
    const cover = raw.match(/^coverImage:\s*"(.+)"$/m)?.[1] ?? '';
    const alt = raw.match(/^coverAlt:\s*"(.+)"$/m)?.[1] ?? '';
    const title = raw.match(/^title:\s*"(.+)"$/m)?.[1] ?? file;
    if (cover) articles.push({ lang, slug: file.replace(/\.md$/, ''), title, cover, alt });
  }
}

const rows = articles
  .map(
    (a) => `
    <section class="card">
      <img src="${a.cover}" alt="" width="1200" height="675" loading="lazy">
      <div class="meta">
        <p class="lang">${a.lang.toUpperCase()} · ${a.slug}</p>
        <h2>${a.title.replace(/"/g, '&quot;')}</h2>
        <p class="file">${a.cover.split('/').pop()}</p>
        <p class="alt"><span>coverAlt actual</span>${a.alt}</p>
      </div>
    </section>`,
  )
  .join('\n');

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Revisión de coverAlt · Yuuvi</title>
<style>
  body{margin:0;padding:2rem 1.5rem;background:#0b0b12;color:#e5e5e5;
       font:16px/1.5 ui-sans-serif,system-ui,-apple-system,sans-serif}
  h1{font-size:1.4rem;margin:0 0 .3rem}
  p.lead{color:#a1a1aa;margin:0 0 2rem;max-width:70ch}
  .card{display:grid;grid-template-columns:320px 1fr;gap:1.5rem;align-items:start;
        padding:1.25rem;margin-bottom:1rem;border:1px solid #27272a;border-radius:1rem;
        background:#111118}
  .card img{width:100%;height:auto;display:block;border-radius:.5rem}
  h2{font-size:1.05rem;margin:.2rem 0 .35rem;color:#fff}
  .lang{color:#ff2d78;font-weight:700;font-size:.75rem;letter-spacing:.12em;
        text-transform:uppercase;margin:0}
  .file{color:#71717a;font-size:.8rem;margin:0 0 .8rem;font-family:ui-monospace,monospace}
  .alt{margin:0;font-size:.95rem}
  .alt span{display:block;color:#71717a;font-size:.7rem;letter-spacing:.12em;
            text-transform:uppercase;margin-bottom:.25rem}
  @media(max-width:700px){.card{grid-template-columns:1fr}}
</style></head>
<body>
  <h1>Revisión de coverAlt</h1>
  <p class="lead">${articles.length} artículos. Los <code>alt=""</code> de las imágenes de esta
  página están vacíos a propósito: si no, el navegador no te deja compararlos con el texto.
  Los alts se corrigen en <code>src/content/articles/&lt;lang&gt;/&lt;slug&gt;.md</code>.</p>
${rows}
</body></html>`;

writeFileSync('_alt-review.html', html);
console.log(`_alt-review.html generado con ${articles.length} artículos. Ábrelo con: open _alt-review.html`);
