export const SITE = {
  name: 'Yuuvi',
  url: 'https://www.yuuvi.cat',
  tagline: 'Tu revista de tendencias',
  contactEmail: 'redaccion@yuuvi.cat',
  social: {
    x: { handle: '@YuuviCAT', url: 'https://x.com/YuuviCAT' },
  },
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
      sectionMedia: 'Tendencia viral',
      sectionMediaIntro:
        'Alternamos los vídeos que están petando en YouTube con artículos de nuestra redacción. Elige cómo enterarte.',
      sectionLatest: 'Últimas noticias',
      viewAll: 'Ver todo',
      readTime: 'min de lectura',
      saved: 'Guardo',
      share: 'Comparte',
      watchOnYouTube: 'Ver en YouTube',
      playVideo: 'Reproducir vídeo',
      videoViews: 'visualizaciones',
      expand: 'Desplegar',
      collapse: 'Contraer',
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
      followX: 'Síguenos en X',
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
      sectionMedia: 'Viral trend',
      sectionMediaIntro:
        'We alternate the videos blowing up on YouTube with articles from our newsroom. Pick how you catch up.',
      sectionLatest: 'Latest news',
      viewAll: 'View all',
      readTime: 'min read',
      saved: 'Saved',
      share: 'Share',
      watchOnYouTube: 'Watch on YouTube',
      playVideo: 'Play video',
      videoViews: 'views',
      expand: 'Expand',
      collapse: 'Collapse',
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
      followX: 'Follow us on X',
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
      sectionMedia: 'Tendència viral',
      sectionMediaIntro:
        'Alternem els vídeos que estan petant a YouTube amb articles de la nostra redacció. Tria com assabentar-te’n.',
      sectionLatest: 'Últimes notícies',
      viewAll: 'Veure-ho tot',
      readTime: 'min de lectura',
      saved: 'Desa',
      share: 'Comparteix',
      watchOnYouTube: 'Veure a YouTube',
      playVideo: 'Reproduir vídeo',
      videoViews: 'visualitzacions',
      expand: 'Desplega',
      collapse: 'Replega',
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
      followX: 'Segueix-nos a X',
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
    seoTitle: Record<Lang, string>;
    seoDescription: Record<Lang, string>;
    intro: Record<Lang, string>;
  }
> = {
  cultura: {
    label: { es: 'Cultura', en: 'Culture', ca: 'Cultura' },
    color: 'brand-cyan',
    seoTitle: {
      es: 'Memes y cultura de internet 2026 | Yuuvi',
      en: 'Memes and internet culture 2026 | Yuuvi',
      ca: 'Memes i cultura d’internet 2026 | Yuuvi',
    },
    seoDescription: {
      es: 'Memes, slang y cultura de internet para jóvenes: las tendencias de 2026 explicadas sin ruido.',
      en: 'Memes, slang and internet culture for young readers: the 2026 trends explained without the noise.',
      ca: 'Mems, slang i cultura d’internet per a joves: les tendències del 2026 explicades sense soroll.',
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
    seoTitle: {
      es: 'Estética y tendencias de moda 2026 | Yuuvi',
      en: 'Aesthetics and fashion trends 2026 | Yuuvi',
      ca: 'Estètica i tendències de moda 2026 | Yuuvi',
    },
    seoDescription: {
      es: 'Moda, cores, armario y estética para jóvenes: qué se lleva en 2026 y cómo llevarlo sin snobismo.',
      en: 'Fashion, colours, wardrobes and aesthetics for young readers: what to wear in 2026 and how to wear it.',
      ca: 'Moda, cores, armari i estètica per a joves: què es porta el 2026 i com portar-ho sense snobisme.',
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
    seoTitle: {
      es: 'Gaming y videojuegos 2026 | Yuuvi',
      en: 'Gaming and video games 2026 | Yuuvi',
      ca: 'Gaming i videojocs 2026 | Yuuvi',
    },
    seoDescription: {
      es: 'Videojuegos indie, guías y cultura de streamers: lo que vale la pena jugar en 2026.',
      en: 'Indie games, guides and streamer culture: what is actually worth playing in 2026.',
      ca: 'Videojocs indie, guies i cultura de streamers: el que val la pena jugar el 2026.',
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
    seoTitle: {
      es: 'Tecnología, apps y gadgets 2026 | Yuuvi',
      en: 'Tech, apps and gadgets 2026 | Yuuvi',
      ca: 'Tecnologia, apps i gadgets 2026 | Yuuvi',
    },
    seoDescription: {
      es: 'Apps, IA y gadgets para jóvenes: consejos de 2026 para usar la tecnología sin que te use.',
      en: 'Apps, AI and gadgets for young readers: 2026 tips to use technology without letting it use you.',
      ca: 'Apps, IA i gadgets per a joves: consells del 2026 per fer servir la tecnologia sense que et faci servir.',
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
    seoTitle: {
      es: 'Música, artistas y conciertos 2026 | Yuuvi',
      en: 'Music, artists and concerts 2026 | Yuuvi',
      ca: 'Música, artistes i concerts 2026 | Yuuvi',
    },
    seoDescription: {
      es: 'Artistas, festivales y cultura pop para jóvenes: la música que suena en 2026.',
      en: 'Artists, festivals and pop culture for young readers: the music playing in 2026.',
      ca: 'Artistes, festivals i cultura pop per a joves: la música que sona el 2026.',
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

// Nombres localizados del equipo editorial. Se usan como firma en los artículos.
export const TEAM_AUTHOR: Record<Lang, string> = {
  es: 'Redacción de Yuuvi',
  ca: 'Redacció de Yuuvi',
  en: 'Yuuvi Editorial',
};

const TEAM_ROLE: Record<Lang, string> = {
  es: 'Equipo editorial',
  ca: 'Equip editorial',
  en: 'Editorial team',
};

const TEAM_BIO: Record<Lang, string> = {
  es: 'Contenido firmado por el equipo editorial de Yuuvi, dirigido por Pablo García Valentín. Cubrimos cultura de internet, tendencias, gaming, tecnología, estética y música con contexto y sin relleno.',
  ca: "Contingut signat per l'equip editorial de Yuuvi, dirigit per Pablo García Valentín. Cobrim cultura d'internet, tendències, gaming, tecnologia, estètica i música amb context i sense farciment.",
  en: 'Content written by the Yuuvi editorial team, led by Pablo García Valentín. We cover internet culture, trends, gaming, tech, style and music with context and no filler.',
};

// Registro de autores. Es la fuente de verdad para las páginas /autor/[slug]
// y para el schema Organization (señal E-E-A-T que Google valora en las revisiones de AdSense).
export const AUTHORS: Author[] = [
  {
    name: TEAM_AUTHOR.es,
    role: TEAM_ROLE,
    bio: TEAM_BIO,
    initials: 'RY',
    color: 'brand-pink',
  },
  {
    name: TEAM_AUTHOR.ca,
    role: TEAM_ROLE,
    bio: TEAM_BIO,
    initials: 'RY',
    color: 'brand-pink',
  },
  {
    name: TEAM_AUTHOR.en,
    role: TEAM_ROLE,
    bio: TEAM_BIO,
    initials: 'YE',
    color: 'brand-pink',
  },
];

export function findAuthor(name: string): Author | undefined {
  return AUTHORS.find((a) => a.name === name);
}
