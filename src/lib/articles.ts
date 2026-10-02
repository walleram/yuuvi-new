import type { CollectionEntry } from 'astro:content';
import { CATEGORIES, type Lang } from './site';

export type Article = CollectionEntry<'articles'>;

export const OTHER_LANG: Record<Lang, Lang> = { es: 'en', en: 'es' };

/** Quita el prefijo de idioma del id de la colección (`es/foo` -> `foo`). */
export function articleSlug(article: Article): string {
  return article.id.replace(/^\/?(es|en)\//, '');
}

/** Ruta pública de un artículo, respetando el prefijo de idioma. */
export function articleHref(slug: string, lang: Lang): string {
  return lang === 'es' ? `/${slug}/` : `/en/${slug}/`;
}

export function articleUrl(slug: string, lang: Lang, site: URL): string {
  return new URL(articleHref(slug, lang), site).toString();
}

export function categoryHref(category: string, lang: Lang): string {
  return lang === 'es' ? `/categoria/${category}/` : `/en/categoria/${category}/`;
}

export function tagHref(tag: string, lang: Lang): string {
  return lang === 'es' ? `/tag/${tagSlug(tag)}/` : `/en/tag/${tagSlug(tag)}/`;
}

export function authorHref(author: string, lang: Lang): string {
  return lang === 'es' ? `/autor/${authorSlug(author)}/` : `/en/autor/${authorSlug(author)}/`;
}

export function homeHref(lang: Lang): string {
  return lang === 'es' ? '/' : '/en/';
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
 * Índice de traducciones: `${lang}:${key}` -> artículo del otro idioma.
 * La clave es `translationKey` si existe; si no, se cae al slug.
 * Así "gadgets-adolescentes" (es) y "gadgets-teens" (en) se emparejan bien.
 */
export function buildTranslationIndex(articles: Article[]): Map<string, Article> {
  const index = new Map<string, Article>();
  for (const a of articles) {
    const key = a.data.translationKey ?? articleSlug(a);
    index.set(`${a.data.lang}:${key}`, a);
  }
  return index;
}

export function findTranslation(index: Map<string, Article>, article: Article): Article | undefined {
  const other = OTHER_LANG[article.data.lang];
  const key = article.data.translationKey ?? articleSlug(article);
  return index.get(`${other}:${key}`);
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
