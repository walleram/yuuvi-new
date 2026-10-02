/**
 * Genera imágenes de sección para los artículos (estilo editorial Yuuvi).
 * Uso: node scripts/generate-article-images.mjs [--only <slug>] [--dry-run]
 *
 * Cada configuración describe una imagen: gradiente del pilar + emoji + texto.
 * Las imágenes se guardan en src/content/articles/images/ y se insertan
 * en los .md justo después de cada encabezado ## (en el mismo orden).
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = join(ROOT, 'src/content/articles/images');
const ES_DIR = join(ROOT, 'src/content/articles/es');
mkdirSync(OUT_DIR, { recursive: true });

// Paleta por pilar (coincide con el tema del sitio)
const PILLAR_COLORS = {
  cultura: { from: '#22d3ee', to: '#3b82f6', bg: 0.18 },
  estetica: { from: '#ff2d78', to: '#ec4899', bg: 0.18 },
  gaming: { from: '#a855f7', to: '#6366f1', bg: 0.18 },
  tecnologia: { from: '#a3e635', to: '#22c55e', bg: 0.18 },
  musica: { from: '#facc15', to: '#f59e0b', bg: 0.18 },
};

const CONFIG = [
  {
    slug: 'que-significa-delulu-tiktok',
    pillar: 'cultura',
    sections: [
      { emoji: '🕰️', text: 'De dónde viene', file: 'delulu-origen' },
      { emoji: '🗣️', text: 'Cómo usarlo bien', file: 'delulu-como-usarlo' },
      { emoji: '🧠', text: 'Significados similares', file: 'delulu-slangs' },
    ],
  },
  {
    slug: 'zapatillas-combinan-con-todo-y2k',
    pillar: 'estetica',
    sections: [
      { emoji: '👟', text: 'Por qué estas zapatillas', file: 'y2k-por-que' },
      { emoji: '🏆', text: 'El Top 10 definitivo', file: 'y2k-top10' },
      { emoji: '✨', text: 'Cómo combinarlas', file: 'y2k-combinar' },
    ],
  },
  {
    slug: 'mejores-juegos-movil-amigos-distancia',
    pillar: 'gaming',
    sections: [
      { emoji: '😱', text: 'Juegos de terror', file: 'gaming-terror' },
      { emoji: '🤣', text: 'Juegos para reírse', file: 'gaming-risas' },
      { emoji: '🏁', text: 'Juegos para jugar en serio', file: 'gaming-serio' },
      { emoji: '🛋️', text: 'Juegos para jugar tumbado', file: 'gaming-cozy' },
    ],
  },
  {
    slug: 'mejores-apps-gratis-apuntes',
    pillar: 'tecnologia',
    sections: [
      { emoji: '🆚', text: 'La comparativa', file: 'apuntes-comparativa' },
      { emoji: '📲', text: 'Qué app usar según el caso', file: 'apuntes-por-caso' },
      { emoji: '💡', text: 'Trucos que nadie te cuenta', file: 'apuntes-trucos' },
    ],
  },
  {
    slug: 'setlist-concierto-espana',
    pillar: 'musica',
    sections: [
      { emoji: '🔮', text: 'Cómo se predice un setlist', file: 'setlist-predecir' },
      { emoji: '🎢', text: 'La estructura típica', file: 'setlist-estructura' },
      { emoji: '⚠️', text: 'El error de todo el mundo', file: 'setlist-error' },
    ],
  },
];

function svgFor({ emoji, text, colors, brand }) {
  const { from, to, bg } = colors;
  return Buffer.from(`
  <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'>
    <rect width='1200' height='675' fill='#0a0a0a'/>
    <rect width='1200' height='675' fill='url(#g)' opacity='${bg}'/>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${from}'/>
        <stop offset='1' stop-color='${to}'/>
      </linearGradient>
      <radialGradient id='r' cx='50%' cy='38%' r='60%'>
        <stop offset='0' stop-color='#ffffff' stop-opacity='0.12'/>
        <stop offset='1' stop-color='#ffffff' stop-opacity='0'/>
      </radialGradient>
    </defs>
    <rect width='1200' height='675' fill='url(#r)'/>
    <circle cx='180' cy='560' r='180' fill='${from}' opacity='0.25'/>
    <circle cx='1040' cy='120' r='200' fill='${to}' opacity='0.25'/>
    <text x='600' y='340' font-family='Arial, Helvetica' font-size='200' text-anchor='middle'>${emoji}</text>
    <text x='600' y='520' font-family='Arial, Helvetica' font-weight='bold' font-size='56' fill='#ffffff' text-anchor='middle'>${text.toUpperCase()}</text>
    <text x='600' y='577' font-family='Arial, Helvetica' font-weight='bold' font-size='24' fill='#a3a3a3' text-anchor='middle'>${brand}</text>
  </svg>
  `);
}

const args = process.argv.slice(2);
const onlyIdx = args.indexOf('--only');
const only = onlyIdx !== -1 ? args[onlyIdx + 1] : null;
const dryRun = args.includes('--dry-run');

(async () => {
  const sharpResolved = await import.meta.resolve('sharp');
  const sharp = (await import(sharpResolved)).default;

  const targets = CONFIG.filter((c) => !only || c.slug === only);

  for (const cfg of targets) {
    const mdPath = join(ES_DIR, `${cfg.slug}.md`);
    if (!existsSync(mdPath)) {
      console.warn(`⚠️  No existe ${mdPath}`);
      continue;
    }
    const colors = PILLAR_COLORS[cfg.pillar];
    let md = readFileSync(mdPath, 'utf8');

    const h2s = [...md.matchAll(/^## (.+)$/gm)].map((m) => m[1]);

    for (let i = 0; i < cfg.sections.length; i++) {
      const sec = cfg.sections[i];
      const heading = h2s[i] ?? sec.text;
      const fname = `${cfg.slug}-${sec.file}.png`;
      const relForMd = `src/content/articles/images/${fname}`;

      if (!md.includes(relForMd)) {
        const svg = svgFor({ emoji: sec.emoji, text: heading, colors, brand: 'yuuvi.' });
        if (!dryRun) {
          await sharp(svg).resize(1200, 675).png().toFile(join(OUT_DIR, fname));
          console.log(`🖼️  ${fname} <- "${heading}"`);
        }
        // Insertar justo después de la línea del H2 (de esa sección)
        const insert = `\n![${heading}](${relForMd})\n`;
        md = md.replace(`## ${heading}`, `## ${heading}` + insert);
      } else {
        console.log(`↩️  ${fname} ya presente en el md, se omite`);
      }
    }

    if (!dryRun) writeFileSync(mdPath, md);
  }

  console.log(dryRun ? 'Simulación completada.' : `Hecho. Imágenes en ${OUT_DIR}`);
})();