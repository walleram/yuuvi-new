export const SITE = {
  name: 'Yuuvi',
  url: 'https://www.yuuvi.cat',
  tagline: 'Tu revista de tendencias',
  localeTags: {
    es: 'es-ES',
    en: 'en-US',
    ca: 'ca-ES',
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
    related: 'Relacionados',
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
    articles: 'artículos',
    article: 'artículo',
    comingSoon: 'Próximamente: estamos preparando contenido de esta categoría.',
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
    related: 'Related',
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
    articles: 'articles',
    article: 'article',
    comingSoon: 'Coming soon: we are preparing content for this category.',
  },
  ca: {
    nav: {
      home: 'Inici',
      cultura: 'Cultura',
      estetica: 'Estètica',
      gaming: 'Gaming',
      tecnologia: 'Tecnologia',
      musica: 'Música',
    },
    home: {
      heroBadge: 'Tendència viral',
      heroReadMore: 'Llegeix',
      sectionTrending: 'El més popular',
      sectionLatest: 'Últimes notícies',
      viewAll: 'Veure-ho tot',
      readTime: 'min de lectura',
      saved: 'Desa',
      share: 'Comparteix',
    },
    related: 'Relacionats',
    footer: {
      rights: 'Yuuvi. Tots els drets reservats.',
      categories: 'Categories',
      legal: 'Legal',
      privacy: 'Privacitat',
      terms: 'Termes',
      cookies: 'Galetes',
      legalNotice: 'Avís legal',
      about: 'Sobre Yuuvi',
      contact: 'Contacte',
    },
    common: {
      by: 'Per',
      in: 'a',
      back: 'Torna',
    },
    articles: 'articles',
    article: 'article',
    comingSoon: 'Pròximament: estem preparant contingut d\'aquesta categoria.',
  },
};

export type Lang = 'es' | 'en' | 'ca';

/**
 * Rutas de las páginas legales. Cada idioma usa un nombre distinto, así que no
 * se pueden derivar una de otra añadiendo o quitando el prefijo /en/.
 */
export const LEGAL_ROUTES = {
  privacy: { es: '/privacidad/', en: '/en/privacy/', ca: '/ca/privacitat/' },
  terms: { es: '/terminos/', en: '/en/terms/', ca: '/ca/termes/' },
  legalNotice: { es: '/avisolegal/', en: '/en/legal-notice/', ca: '/ca/avis-legal/' },
  cookies: { es: '/privacidad/#cookies', en: '/en/privacy/#cookies', ca: '/ca/privacitat/#cookies' },
} as const satisfies Record<string, Record<Lang, string>>;

export type LegalKey = 'privacy' | 'terms' | 'legalNotice';

/**
 * Alternates hreflang de una página legal. Todas las traducciones existen siempre,
 * así que se declaran sin comprobar nada. El ancla #cookies no es una página
 * propia: se canonicaliza contra la de privacidad.
 */
export function legalAlternates(key: LegalKey): { hreflang: string; href: string }[] {
  const es = new URL(LEGAL_ROUTES[key].es, SITE.url).toString();
  const en = new URL(LEGAL_ROUTES[key].en, SITE.url).toString();
  const ca = new URL(LEGAL_ROUTES[key].ca, SITE.url).toString();
  return [
    { hreflang: 'es', href: es },
    { hreflang: 'en', href: en },
    { hreflang: 'ca', href: ca },
    { hreflang: 'x-default', href: es },
  ];
}

// Mapeo de categorías con metadatos visuales
export const CATEGORIES: Record<string, { label: Record<Lang, string>; color: string }> = {
  cultura: { label: { es: 'Cultura', en: 'Culture', ca: 'Cultura' }, color: 'brand-cyan' },
  estetica: { label: { es: 'Estética', en: 'Aesthetics', ca: 'Estètica' }, color: 'brand-pink' },
  gaming: { label: { es: 'Gaming', en: 'Gaming', ca: 'Gaming' }, color: 'brand-purple' },
  tecnologia: { label: { es: 'Tecnología', en: 'Tech', ca: 'Tecnologia' }, color: 'brand-lime' },
  musica: { label: { es: 'Música', en: 'Music', ca: 'Música' }, color: 'brand-yellow' },
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
      ca: 'Redactora en cap de Cultura i Slang',
    },
    bio: {
      es: 'Llevo casi diez años cubriendo lo que se habla en internet antes de que llegue a los medios. Escribo sobre slang, memes y la cultura pop que nace en TikTok.',
      en: 'For nearly a decade I have covered what people say online before it reaches the mainstream. I write about slang, memes and the pop culture born on TikTok.',
      ca: 'Fa gairebé deu anys que cobreixo allò que es diu a internet abans que arribi als mitjans. Escric sobre slang, mems i la cultura pop que neix a TikTok.',
    },
    initials: 'VR',
    color: 'brand-pink',
  },
  {
    name: 'Diego Morales',
    role: {
      es: 'Editor de Música',
      en: 'Music Editor',
      ca: 'Editor de Música',
    },
    bio: {
      es: 'Crítico musical. Escribo sobre artistas, consolidateduras y los giros estilísticos que nadie se esperaba.',
      en: 'Music critic. I write about artists, tours and the stylistic turns nobody saw coming.',
      ca: 'Crític musical. Escric sobre artistes, gires i els girs estilístics que ningú no s\'esperava.',
    },
    initials: 'DM',
    color: 'brand-yellow',
  },
  {
    name: 'Lucía Fernández',
    role: {
      es: 'Redactora de Estética',
      en: 'Aesthetics Editor',
      ca: 'Redactora d\'Estètica',
    },
    bio: {
      es: 'Moda, calzado y estética. Analizo qué se lleva ahora mismo y por qué, con datos en lugar deBRES.',
      en: 'Fashion, footwear and aesthetics. I analyze what is trending right now and why, with data instead of vibes.',
      ca: 'Moda, calçat i estètica. Analitzo què es porta ara mateix i per què, amb dades en lloc d\'impressions.',
    },
    initials: 'LF',
    color: 'brand-pink',
  },
  {
    name: 'Sofía Vargas',
    role: {
      es: 'Editora de Tecnología y Gaming',
      en: 'Tech & Gaming Editor',
      ca: 'Editora de Tecnologia i Gaming',
    },
    bio: {
      es: 'Apps, gadgets y juegos. Pruebo todo para que tú no tengas que perder una tarde probándolo.',
      en: 'Apps, gadgets and games. I test everything so you do not lose an afternoon doing it.',
      ca: 'Apps, gadgets i jocs. Ho provo tot perquè tu no hagis de perdre una tarda provant-ho.',
    },
    initials: 'SV',
    color: 'brand-purple',
  },
];

export function findAuthor(name: string): Author | undefined {
  return AUTHORS.find((a) => a.name === name);
}
