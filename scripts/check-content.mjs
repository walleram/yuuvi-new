import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT = resolve(fileURLToPath(new URL('../src/content/articles/', import.meta.url)));

/**
 * Detecta texto corrupto en artículos: caracteres de alfabetos que no
 * corresponden al idioma del documento, o mojibake típico de LLM.
 *
 * Es un guardarraíl: los modelos de lenguaje Occasionally emiten caracteres
 * CJK, cirílicos o Ñs al final de un párrafo en español.
 */
const ALLOWED = {
  es: {
    latin: /[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ¿¡]/,
    punct: /[—–·“”‘’…]/,
    other: new Set(['\n', '\t']),
  },
  en: {
    latin: /[a-zA-Z]/,
    punct: /[—–·“”‘’…]/,
    other: new Set(['\n', '\t']),
  },
};

// Rangos que nunca deberían aparecer en un artículo de Yuuvi
const FORBIDDEN = [
  { name: 'CJK', re: /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g },
  { name: 'Cirílico', re: /[\u0400-\u04ff]/g },
  { name: 'Griego', re: /[\u0370-\u03ff]/g },
  { name: 'Árabe/Hebreo', re: /[\u0600-\u06ff\u0590-\u05ff]/g },
  { name: 'Devanagari', re: /[\u0900-\u097f]/g },
  { name: 'Tamil/Telugu', re: /[\u0b80-\u0dff]/g },
  // Mojibake: "Ã±" y similares (texto UTF-8 leído como latin-1)
  { name: 'Mojibake', re: /[ÃÂ][\u0080-\u00ff]{1,2}/g },
];

function stripFrontmatter(text) {
  const m = text.match(/^---\n[\s\S]*?\n---\n/);
  return { frontmatter: m ? m[0] : '', body: m ? text.slice(m[0].length) : text };
}

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('._') || e.name.startsWith('.')) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full, out);
    else if (e.name.endsWith('.md')) out.push(full);
  }
  return out;
}

const files = (await walk(CONTENT)).sort();
let problems = 0;

for (const file of files) {
  const raw = await readFile(file, 'utf8');
  const { body } = stripFrontmatter(raw);
  const lang = raw.match(/^lang:\s*["']?(\w+)/m)?.[1] ?? 'es';

  for (const { name, re } of FORBIDDEN) {
    const hits = body.match(re);
    if (hits) {
      problems++;
      const unique = [...new Set(hits)].slice(0, 8).join(' ');
      console.log(`  CORRUPTO  ${file.replace(CONTENT, '')}  [${name}]  ${unique}`);
    }
  }

  // Emoji y flechas están permitidos; el resto de no-latino en ES solo si es emoji
  if (lang === 'es') {
    const odd = [...body].filter(
      (c) => c.codePointAt(0) > 0x2100 && !/\p{Extended_Pictographic}/u.test(c) && !/[→←↑↓•●★♥]/u.test(c)
    );
    if (odd.length > 0) {
      problems++;
      const uniq = [...new Set(odd)].slice(0, 10);
      console.log(`  REVISAR   ${file.replace(CONTENT, '')}  ${uniq.map((c) => c + ' U+' + c.codePointAt(0).toString(16)).join(' ')}`);
    }
  }

  const words = body.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 800) {
    console.log(`  CORTO     ${file.replace(CONTENT, '')}  ${words} palabras`);
  }
}

console.log(problems === 0 ? '\n  Sin corrupción detectada.\n' : `\n  ${problems} avisos.\n`);

/**
 * Imágenes de origen demasiado pesadas.
 *
 * Astro sirve variantes webp, pero además copia el archivo original a dist/,
 * así que un PNG de 3 MB son 3 MB de hosting en cada despliegue sin que nadie
 * lo descargue. El límite cubre.portadas e ilustraciones de artículo.
 */
const ASSET_DIRS = ['src/assets/covers', 'src/content/articles/images'];
const MAX_KB = 400;
const heavy = [];

for (const dir of ASSET_DIRS) {
  const abs = resolve(fileURLToPath(new URL(`../${dir}/`, import.meta.url)));
  let entries = [];
  try {
    entries = await readdir(abs, { withFileTypes: true });
  } catch {
    continue;
  }
  for (const entry of entries) {
    if (!entry.isFile() || entry.name.startsWith('._')) continue;
    if (!/\.(png|jpe?g|webp|avif)$/i.test(entry.name)) continue;
    const { size } = await stat(join(abs, entry.name));
    if (size / 1024 > MAX_KB) {
      heavy.push(`  PESADA    ${dir}/${entry.name}  ${Math.round(size / 1024)} KB (máx ${MAX_KB} KB)`);
    }
  }
}

if (heavy.length > 0) {
  console.log(heavy.join('\n'));
  console.log(`\n  ${heavy.length} imagen(es) por encima de ${MAX_KB} KB. Optimízalas: webp a 1200x675 suele bastar.\n`);
} else {
  console.log(`  Sin imágenes pesadas (> ${MAX_KB} KB).\n`);
}
