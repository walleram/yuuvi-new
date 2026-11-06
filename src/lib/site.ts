export const SITE = {
  name: 'Yuuvi',
  url: 'https://www.yuuvi.cat',
  tagline: 'Tu revista de tendencias',
  contactEmail: 'redaccion@yuuvi.cat',
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
 * Páginas de información del proyecto. Como las legales, cada idioma usa un
 * slug distinto, así que no se pueden derivar con el prefijo /en/ o /ca/.
 */
export const INFO_ROUTES = {
  about: { es: '/sobre-nosotros/', en: '/en/about/', ca: '/ca/sobre-nosaltres/' },
  contact: { es: '/contacto/', en: '/en/contact/', ca: '/ca/contacte/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type InfoKey = 'about' | 'contact';

/** Alternates hreflang de una página informativa. Las tres versiones existen siempre. */
export function infoAlternates(key: InfoKey): { hreflang: string; href: string }[] {
  const es = new URL(INFO_ROUTES[key].es, SITE.url).toString();
  const en = new URL(INFO_ROUTES[key].en, SITE.url).toString();
  const ca = new URL(INFO_ROUTES[key].ca, SITE.url).toString();
  return [
    { hreflang: 'es', href: es },
    { hreflang: 'en', href: en },
    { hreflang: 'ca', href: ca },
    { hreflang: 'x-default', href: es },
  ];
}

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

// Mapeo de categorías con metadatos visuales y textos propios para SEO
export const CATEGORIES: Record<
  string,
  {
    label: Record<Lang, string>;
    color: string;
    seoDescription: Record<Lang, string>;
    intro: Record<Lang, string>;
  }
> = {
  cultura: {
    label: { es: 'Cultura', en: 'Culture', ca: 'Cultura' },
    color: 'brand-cyan',
    seoDescription: {
      es: 'Cultura en Yuuvi: memes, slang, internet y las tendencias que marcan a la generación joven.',
      en: 'Culture at Yuuvi: memes, slang, internet and the trends shaping the younger generation.',
      ca: 'Cultura a Yuuvi: mems, slang, internet i les tendències que marquen la generació jove.',
    },
    intro: {
      es: 'Del meme que dura dos días al slang que acaba en el diccionario: aquí reunimos lo que se habla en internet antes de que llegue a los medios. Sin prisa y sin postureo.',
      en: 'From the meme that lasts two days to the slang that ends up in the dictionary: here we collect what people talk about online before it reaches the mainstream. No rush, no posturing.',
      ca: 'Del mem que dura dos dies al slang que acaba al diccionari: aquí recollim el que es diu a internet abans que arribi als mitjans. Sense presses i sense postureig.',
    },
  },
  estetica: {
    label: { es: 'Estética', en: 'Aesthetics', ca: 'Estètica' },
    color: 'brand-pink',
    seoDescription: {
      es: 'Estética en Yuuvi: moda, cores, armario y estilo explicados sin snobismo.',
      en: 'Aesthetics at Yuuvi: fashion, colours, wardrobes and style explained without snobbery.',
      ca: 'Estètica a Yuuvi: moda, cores, armari i estil explicats sense snobisme.',
    },
    intro: {
      es: 'Qué se lleva, por qué se lleva y cómo llevarlo sin parecer un disfraz. Moda, calzado y estéticas de internet con criterio, no solo con tendencias.',
      en: "What's trending, why it's trending and how to wear it without looking like a costume. Fashion, footwear and internet aesthetics with reasoning, not just trends.",
      ca: "Què es porta, per què es porta i com portar-ho sense semblar una disfressa. Moda, calçat i estètiques d'internet amb criteri, no només amb tendències.",
    },
  },
  gaming: {
    label: { es: 'Gaming', en: 'Gaming', ca: 'Gaming' },
    color: 'brand-purple',
    seoDescription: {
      es: 'Gaming en Yuuvi: juegos indie, guías, cultura de streamers y lo que vale la pena jugar.',
      en: "Gaming at Yuuvi: indie games, guides, streamer culture and what's actually worth playing.",
      ca: 'Gaming a Yuuvi: jocs indie, guies, cultura de streamers i el que val la pena jugar.',
    },
    intro: {
      es: 'Juegos que merecen tu tiempo, guías para no perderte y la cultura de streamers que los rodea. Sin hype vacío: lo que se juega y por qué.',
      en: "Games worth your time, guides so you don't get lost and the streamer culture around them. No empty hype: what people are playing and why.",
      ca: "Jocs que mereixen el teu temps, guies per no perdre't i la cultura de streamers que els envolta. Sense hype buit: què es juga i per què.",
    },
  },
  tecnologia: {
    label: { es: 'Tecnología', en: 'Tech', ca: 'Tecnologia' },
    color: 'brand-lime',
    seoDescription: {
      es: 'Tecnología en Yuuvi: apps, IA, gadgets y consejos para usar la tecnología sin que te use.',
      en: 'Tech at Yuuvi: apps, AI, gadgets and tips to use technology without letting it use you.',
      ca: 'Tecnologia a Yuuvi: apps, IA, gadgets i consells per fer servir la tecnologia sense que et faci servir.',
    },
    intro: {
      es: 'Apps, IA, gadgets y trucos para usar la tecnología sin que te use. Probamos, comparamos y te contamos lo que de verdad importa.',
      en: 'Apps, AI, gadgets and tricks to use technology without letting it use you. We test, compare and tell you what actually matters.',
      ca: "Apps, IA, gadgets i trucs per fer servir la tecnologia sense que et faci servir. Provem, comparem i t'expliquem el que de debò importa.",
    },
  },
  musica: {
    label: { es: 'Música', en: 'Music', ca: 'Música' },
    color: 'brand-yellow',
    seoDescription: {
      es: 'Música en Yuuvi: artistas, festivales, algoritmos y la cultura pop que suena.',
      en: "Music at Yuuvi: artists, festivals, algorithms and the pop culture that's playing.",
      ca: 'Música a Yuuvi: artistes, festivals, algoritmes i la cultura pop que sona.',
    },
    intro: {
      es: 'Artistas, discos, festivales y la cultura pop que suena. Del algoritmo que te repite canciones a los conciertos que merecen el viaje.',
      en: "Artists, albums, festivals and the pop culture that's playing. From the algorithm that repeats songs to the shows worth the trip.",
      ca: "Artistes, discs, festivals i la cultura pop que sona. De l'algoritme que et repeteix cançons als concerts que mereixen el viatge.",
    },
  },
};

export interface Author {
  name: string;
  role: Record<Lang, string>;
  bio: Record<Lang, string>;
  initials: string;
  color: string;
}

// Registro de autores. Es la fuente de verdad para las páginas /autor/[slug]
// y para el schema Person (señal E-E-A-T que Google valora en las revisiones de AdSense).
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
      es: 'Crítico musical. Escribo sobre artistas, giras y los giros estilísticos que nadie se esperaba.',
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
      es: 'Moda, calzado y estética. Analizo qué se lleva ahora mismo y por qué, con datos en lugar de impresiones.',
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
