import type { Lang } from './site';

const LOCALE_MAP: Record<Lang, string> = {
  es: 'es-ES',
  en: 'en-US',
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
  if (minutes < 60) return lang === 'es' ? `hace ${minutes} min` : `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return lang === 'es' ? `hace ${hours} h` : `${hours} h ago`;
  const days = Math.floor(hours / 24);
  return lang === 'es' ? `hace ${days} d` : `${days} d ago`;
}
