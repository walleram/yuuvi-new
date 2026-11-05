/**
 * Calcula qué páginas de tag quedan fuera del sitemap por tener poco contenido.
 * Debe mantenerse alineado con el umbral de `src/pages/[...lang]/tag/[tag].astro`.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT_DIR = fileURLToPath(new URL('../src/content/articles/', import.meta.url));
const LANGS = ['en', 'es', 'ca'];
const LANG_PREFIX = { es: '', en: '/en', ca: '/ca' };
export const TAG_INDEX_THRESHOLD = 4;

function frontmatter(raw) {
  return raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
}

function isPublished(fm) {
  const match = fm.match(/^published:\s*(.+)$/m);
  return !match || /^true\b/i.test(match[1].trim());
}

function tagsOf(fm) {
  const inline = fm.match(/^tags:\s*\[(.*)\]\s*$/m);
  if (inline) {
    return [...inline[1].matchAll(/"([^"]+)"|'([^']+)'|([^,\s][^,]*)/g)]
      .map((m) => (m[1] ?? m[2] ?? m[3] ?? '').trim())
      .filter(Boolean);
  }

  const block = fm.match(/^tags:\s*\n((?:\s*-\s*.+\n?)+)/m);
  if (!block) return [];
  return [...block[1].matchAll(/^\s*-\s*(.+)$/gm)].map((m) => m[1].replace(/^["']|["']$/g, '').trim());
}

function tagSlug(tag) {
  return tag
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getNoindexTagPaths(threshold = TAG_INDEX_THRESHOLD) {
  const paths = new Set();

  for (const lang of LANGS) {
    let files = [];
    try {
      files = readdirSync(join(CONTENT_DIR, lang)).filter((file) => file.endsWith('.md'));
    } catch {
      continue;
    }

    const counts = new Map();
    for (const file of files) {
      const fm = frontmatter(readFileSync(join(CONTENT_DIR, lang, file), 'utf8'));
      if (!isPublished(fm)) continue;
      for (const tag of tagsOf(fm)) {
        const slug = tagSlug(tag);
        if (!slug) continue;
        counts.set(slug, (counts.get(slug) ?? 0) + 1);
      }
    }

    for (const [slug, count] of counts) {
      if (count < threshold) paths.add(`${LANG_PREFIX[lang]}/tag/${slug}/`);
    }
  }

  return paths;
}
