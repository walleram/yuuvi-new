export const SITE = {
  name: 'Yuuvi',
  url: 'https://yuuvi-new.pages.dev',
  tagline: 'Tu revista de tendencias',
  localeTags: {
    es: 'es-ES',
    en: 'en-US',
  },
};

export const UI_TEXT = {
  es: {
    nav: {
      home: 'Inicio',
      cultura: 'Cultura',
      estetica: 'Estética',
      gaming: 'Gaming',
      tecnologia: 'Tecnología',
      musica: 'Música',
    },
    home: {
      heroBadge: 'Tendencia viral',
      heroReadMore: 'Leer',
      sectionTrending: 'Lo más popular',
      sectionLatest: 'Últimas noticias',
      viewAll: 'Ver todo',
      readTime: 'min de lectura',
      saved: 'Guardo',
      share: 'Comparte',
    },
    footer: {
      rights: 'Yuuvi. Todos los derechos reservados.',
      categories: 'Categorías',
      legal: 'Legal',
      privacy: 'Privacidad',
      terms: 'Términos',
      cookies: 'Cookies',
      legalNotice: 'Aviso Legal',
      about: 'Sobre Yuuvi',
      contact: 'Contacto',
    },
    common: {
      by: 'Por',
      in: 'en',
      back: 'Volver',
    },
  },
  en: {
    nav: {
      home: 'Home',
      cultura: 'Culture',
      estetica: 'Aesthetics',
      gaming: 'Gaming',
      tecnologia: 'Tech',
      musica: 'Music',
    },
    home: {
      heroBadge: 'Viral trend',
      heroReadMore: 'Read',
      sectionTrending: 'Trending now',
      sectionLatest: 'Latest news',
      viewAll: 'View all',
      readTime: 'min read',
      saved: 'Saved',
      share: 'Share',
    },
    footer: {
      rights: 'Yuuvi. All rights reserved.',
      categories: 'Categories',
      legal: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
      legalNotice: 'Legal notice',
      about: 'About Yuuvi',
      contact: 'Contact',
    },
    common: {
      by: 'By',
      in: 'in',
      back: 'Back',
    },
  },
};

export type Lang = 'es' | 'en';

/**
 * Rutas de las páginas legales. Cada idioma usa un nombre distinto, así que no
 * se pueden derivar una de otra añadiendo o quitando el prefijo /en/.
 */
export const LEGAL_ROUTES = {
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
  terms: { es: '/terminos/', en: '/en/terms/' },
  legalNotice: { es: '/avisolegal/', en: '/en/legal-notice/' },
  cookies: { es: '/privacidad/#cookies', en: '/en/privacy/#cookies' },
} as const satisfies Record<string, Record<Lang, string>>;

export type LegalKey = 'privacy' | 'terms' | 'legalNotice';

/**
 * Alternates hreflang de una página legal. Ambas traducciones existen siempre,
 * así que se declaran sin comprobar nada. El ancla #cookies no es una página
 * propia: se canonicaliza contra la de privacidad.
 */
export function legalAlternates(key: LegalKey): { hreflang: string; href: string }[] {
  const es = new URL(LEGAL_ROUTES[key].es, SITE.url).toString();
  const en = new URL(LEGAL_ROUTES[key].en, SITE.url).toString();
  return [
    { hreflang: 'es', href: es },
    { hreflang: 'en', href: en },
    { hreflang: 'x-default', href: es },
  ];
}

// Mapeo de categorías con metadatos visuales
export const CATEGORIES: Record<string, { label: Record<Lang, string>; color: string }> = {
  cultura: { label: { es: 'Cultura', en: 'Culture' }, color: 'brand-cyan' },
  estetica: { label: { es: 'Estética', en: 'Aesthetics' }, color: 'brand-pink' },
  gaming: { label: { es: 'Gaming', en: 'Gaming' }, color: 'brand-purple' },
  tecnologia: { label: { es: 'Tecnología', en: 'Tech' }, color: 'brand-lime' },
  musica: { label: { es: 'Música', en: 'Music' }, color: 'brand-yellow' },
};

export interface Author {
  name: string;
  role: Record<Lang, string>;
  bio: Record<Lang, string>;
  initials: string;
  color: string;
}

// Registro de autores. Es la fuente de verdad para las páginas /autor/[slug]
// y para el schema Person (señal E-E-A-T que Google usa enYaml revisados de AdSense).
export const AUTHORS: Author[] = [
  {
    name: 'Valentina Ruiz',
    role: {
      es: 'Redactora jefe de Cultura y Slang',
      en: 'Culture & Slang Editor-in-Chief',
    },
    bio: {
      es: 'Llevo casi diez años cubriendo lo que se habla en internet antes de que llegue a los medios. Escribo sobre slang, memes y la cultura pop que nace en TikTok.',
      en: 'For nearly a decade I have covered what people say online before it reaches the mainstream. I write about slang, memes and the pop culture born on TikTok.',
    },
    initials: 'VR',
    color: 'brand-pink',
  },
  {
    name: 'Diego Morales',
    role: {
      es: 'Editor de Música',
      en: 'Music Editor',
    },
    bio: {
      es: 'Crítico musical. Escribo sobre artistas, consolidateduras y los giros estilísticos que nadie se esperaba.',
      en: 'Music critic. I write about artists, tours and the stylistic turns nobody saw coming.',
    },
    initials: 'DM',
    color: 'brand-yellow',
  },
  {
    name: 'Lucía Fernández',
    role: {
      es: 'Redactora de Estética',
      en: 'Aesthetics Editor',
    },
    bio: {
      es: 'Moda, calzado y estética. Analizo qué se lleva ahora mismo y por qué, con datos en lugar deBRES.',
      en: 'Fashion, footwear and aesthetics. I analyze what is trending right now and why, with data instead of vibes.',
    },
    initials: 'LF',
    color: 'brand-pink',
  },
  {
    name: 'Sofía Vargas',
    role: {
      es: 'Editora de Tecnología y Gaming',
      en: 'Tech & Gaming Editor',
    },
    bio: {
      es: 'Apps, gadgets y juegos. Pruebo todo para que tú no tengas que perder una tarde probándolo.',
      en: 'Apps, gadgets and games. I test everything so you do not lose an afternoon doing it.',
    },
    initials: 'SV',
    color: 'brand-purple',
  },
];

export function findAuthor(name: string): Author | undefined {
  return AUTHORS.find((a) => a.name === name);
}
