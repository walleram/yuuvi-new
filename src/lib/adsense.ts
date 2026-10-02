// Configuración de Google AdSense
// IMPORTANTE: Sustituye los valores de ejemplo por los reales de tu cuenta AdSense.
// clientId: https://www.google.com/adsense/ → Configuración → Cuenta → ID del editor (ca-pub-XXXXXXXXXXXX)
// defaultSlot: crea un "Bloque de anuncios" en AdSense y copia su ID (XXXXXXXXXXXX)

export const ADSENSE = {
  clientId: 'ca-pub-7001158068581267',
  defaultSlot: '4834638214',
  // Activar solo cuando clientId y defaultSlot sean reales
  get enabled() {
    return this.clientId !== 'ca-pub-0000000000000000' && this.clientId !== '';
  },
};

type AdFormat = 'auto' | 'fluid' | 'horizontal' | 'rectangle' | 'vertical';

/**
 * Densidad de anuncios dentro del texto.
 *
 * Los topes existen por política de AdSense, no por gusto: una página donde
 * los anuncios igualan o superan al contenido editorial se clasifica como
 * contenido de poco valor. Con los artículos actuales (993-1529 palabras)
 * salen 2 anuncios en línea en todos ellos, ni uno más por muy largo que sea.
 */
export const AD_DENSITY = {
  /** Palabras de texto editorial por anuncio en línea. */
  wordsPerInlineAd: 450,
  /** Tope duro de anuncios dentro del texto, por artículo. */
  maxInlineAds: 2,
  /** Fracción del texto entre la que se reparten. */
  firstAtPct: 30,
  lastAtPct: 75,
} as const;

/**
 * Posiciones del grid de la portada tras las que se intercala un anuncio.
 * La portada muestra hasta 8 tarjetas: 2 anuncios, uno de cada cuatro.
 */
export const AD_AFTER: readonly number[] = [2, 6];

/**
 * Mínimo de artículos publicados en un idioma para poner banners de sección en
 * su portada. Por debajo de esto los anuncios igualan al contenido, que es la
 * sanción de contenido de poco valor de AdSense. La portada EN tiene 4
 * artículos, así que se queda sin ellos.
 */
export const MIN_ARTICLES_FOR_SECTION_AD = 6;

/**
 * Posiciones, en porcentaje del texto, de los anuncios en línea.
 * El cliente las resuelve contra el número real de párrafos, que en build no
 * se conoce: por eso se pasa el porcentaje y no el índice de párrafo.
 */
export function inlineAdPlacements(wordCount: number): number[] {
  const wanted = Math.floor(wordCount / AD_DENSITY.wordsPerInlineAd);
  const total = Math.min(wanted, AD_DENSITY.maxInlineAds);
  if (total < 1) return [];
  if (total === 1) {
    return [Math.round((AD_DENSITY.firstAtPct + AD_DENSITY.lastAtPct) / 2)];
  }
  const span = AD_DENSITY.lastAtPct - AD_DENSITY.firstAtPct;
  return Array.from(
    { length: total },
    (_, i) => Math.round(AD_DENSITY.firstAtPct + (i * span) / (total - 1)),
  );
}

export interface AdSlotProps {
  slot?: string;
  format?: AdFormat;
  /** Clases extra para el contenedor */
  className?: string;
  /** Fuerza altura mínima para evitar saltos de layout (Core Web Vitals) */
  minHeight?: string;
}

export function adsenseScriptSrc(): string {
  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE.clientId}`;
}