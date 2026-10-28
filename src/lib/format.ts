import type { Lang } from './site';

const LOCALE_MAP: Record<Lang, string> = {
  es: 'es-ES',
  en: 'en-US',
  ca: 'ca-ES',
};

export function formatDate(date: Date | string, lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function timeAgo(date: Date | string, lang: Lang): string {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const ago: Record<Lang, string> = { es: 'hace', en: '', ca: 'fa' };
  const wrap = (n: number, unit: string) => (lang === 'en' ? `${n} ${unit} ago` : `${ago[lang]} ${n} ${unit}`);
  if (minutes < 60) return wrap(minutes, 'min');
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return wrap(hours, 'h');
  const days = Math.floor(hours / 24);
  return wrap(days, 'd');
}
