import type { CollectionEntry } from 'astro:content';
import { CATEGORIES, type Lang } from './site';

export type Article = CollectionEntry<'articles'>;

export const LANGS: readonly Lang[] = ['en', 'es', 'ca'];

/** Prefijo de ruta por idioma. El español es el idioma raíz (sin prefijo). */
export const LANG_PREFIX: Record<Lang, string> = {
  es: '',
  en: '/en',
  ca: '/ca',
};

/** Quita el prefijo de idioma del id de la colección (`en/foo` -> `foo`). */
export function articleSlug(article: Article): string {
  return article.id.replace(/^\/?(es|en|ca)\//, '');
}

/** Ruta pública de un artículo, respetando el prefijo de idioma. */
export function articleHref(slug: string, lang: Lang): string {
  return `${LANG_PREFIX[lang]}/${slug}/`;
}

export function articleUrl(slug: string, lang: Lang, site: URL): string {
  return new URL(articleHref(slug, lang), site).toString();
}

export function categoryHref(category: string, lang: Lang): string {
  return `${LANG_PREFIX[lang]}/categoria/${category}/`;
}

export function tagHref(tag: string, lang: Lang): string {
  return `${LANG_PREFIX[lang]}/tag/${tagSlug(tag)}/`;
}

export function authorHref(author: string, lang: Lang): string {
  return `${LANG_PREFIX[lang]}/autor/${authorSlug(author)}/`;
}

export function homeHref(lang: Lang): string {
  return lang === 'es' ? '/' : `${LANG_PREFIX[lang]}/`;
}

/** Normaliza un tag libre a un slug estable para URLs. */
export function tagSlug(tag: string): string {
  return tag
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Slug de autor: mismo criterio que `tagSlug` pero conserva espacios internos como guiones. */
export function authorSlug(author: string): string {
  return author
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Índice de traducciones: `${lang}:${key}` -> artículo de ese idioma.
 * La clave es `translationKey` si existe; si no, se cae al slug.
 * Así "gadgets-adolescentes" (es) y "gadgets-teens" (en/ca) se emparejan bien.
 */
export function buildTranslationIndex(articles: Article[]): Map<string, Article> {
  const index = new Map<string, Article>();
  for (const a of articles) {
    const key = a.data.translationKey ?? articleSlug(a);
    index.set(`${a.data.lang}:${key}`, a);
  }
  return index;
}

/** Todas las traducciones de un artículo en los demás idiomas, por `translationKey`. */
export function findTranslations(
  index: Map<string, Article>,
  article: Article,
  languages: readonly Lang[] = LANGS,
): Partial<Record<Lang, Article>> {
  const key = article.data.translationKey ?? articleSlug(article);
  const out: Partial<Record<Lang, Article>> = {};
  for (const lang of languages) {
    if (lang === article.data.lang) continue;
    const found = index.get(`${lang}:${key}`);
    if (found) out[lang] = found;
  }
  return out;
}

/** Nº de palabras del cuerpo del artículo (solo prosa, ignora imágenes). */
export function countWords(article: Article): number {
  return (article.body ?? '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[#>*_`~\-[\]()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingTime(article: Article): number {
  return Math.max(1, Math.round(countWords(article) / 220));
}

export function categoryLabel(category: string, lang: Lang): string {
  return CATEGORIES[category]?.label[lang] ?? category;
}

export interface TagEntry {
  tag: string;
  slug: string;
  articles: Article[];
}

/** Agrupa los artículos por tag preservando el tag original para mostrarlo. */
export function collectTags(articles: Article[]): TagEntry[] {
  const map = new Map<string, TagEntry>();
  for (const article of articles) {
    for (const tag of article.data.tags) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      const entry = map.get(slug) ?? { tag, slug, articles: [] };
      entry.articles.push(article);
      map.set(slug, entry);
    }
  }
  return [...map.values()].sort((a, b) => b.articles.length - a.articles.length);
}

/** Agrupa los artículos por autor. */
export function collectAuthors(articles: Article[]): Map<string, Article[]> {
  const map = new Map<string, Article[]>();
  for (const article of articles) {
    const list = map.get(article.data.author) ?? [];
    list.push(article);
    map.set(article.data.author, list);
  }
  return map;
}

/**
 * Artículos relacionados: primero los que comparten más tags y, a igualdad,
 * los de la misma categoría y más recientes.
 */
export function rankRelated(articles: Article[], current: Article, limit = 3): Article[] {
  const currentTags = new Set(current.data.tags.map((tag) => tag.toLowerCase()));

  return articles
    .filter((article) => article.id !== current.id)
    .map((article) => {
      const shared = article.data.tags.filter((tag) => currentTags.has(tag.toLowerCase())).length;
      const sameCategory = article.data.category === current.data.category ? 1 : 0;
      return { article, shared, score: shared * 2 + sameCategory };
    })
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.shared - a.shared ||
        b.article.data.pubDate.valueOf() - a.article.data.pubDate.valueOf(),
    )
    .slice(0, limit)
    .map((entry) => entry.article);
}

export interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_HEADING = /^##\s+(Preguntas frecuentes|Preguntes freqüents|Frequently asked questions|FAQ)\s*$/im;

function cleanMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extrae las preguntas y respuestas de la sección "Preguntas frecuentes"
 * para generar el JSON-LD de tipo FAQPage a partir del contenido visible.
 */
export function extractFaq(article: Article): FaqItem[] {
  const body = article.body ?? '';
  const headingIndex = body.search(FAQ_HEADING);
  if (headingIndex === -1) return [];

  const afterHeading = body.indexOf('\n', headingIndex);
  const rest = body.slice(afterHeading === -1 ? body.length : afterHeading + 1);
  const end = rest.search(/^##\s+/m);
  const section = end === -1 ? rest : rest.slice(0, end);

  const items: FaqItem[] = [];
  let question: string | null = null;
  let answerLines: string[] = [];

  const flush = () => {
    if (question && answerLines.length > 0) {
      items.push({ question, answer: cleanMarkdown(answerLines.join(' ')) });
    }
  };

  for (const rawLine of section.split(/\r?\n/)) {
    const line = rawLine.trim();
    const match = line.match(/^\*\*(.+?\?)\*\*$/);
    if (match) {
      flush();
      question = cleanMarkdown(match[1]);
      answerLines = [];
    } else if (question && line) {
      answerLines.push(line);
    }
  }
  flush();

  return items.filter((item) => item.question && item.answer).slice(0, 8);
}
