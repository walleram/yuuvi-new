import type { Lang } from '../lib/site';

export type VideoCategory = 'cultura' | 'estetica' | 'gaming' | 'tecnologia' | 'musica';

export interface VideoItem {
  id: string;
  title: string;
  channel: string;
  category: VideoCategory;
  duration: string;
  views: string;
  description: Record<Lang, string>;
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'ebRqRblozpE',
    title: 'LAS BATALLAS DE FARMEAR AURA DEBEN PARAR',
    channel: 'Jexs',
    category: 'cultura',
    duration: '8:01',
    views: '4,3 M',
    description: {
      es: 'El fenómeno viral que ha sacado las batallas de «aura» de TikTok a la calle. Jexs analiza por qué todos hablan de ellas.',
      en: 'The viral phenomenon that took «aura» battles from TikTok to the streets. Jexs breaks down why everyone is talking about them.',
      ca: 'El fenomen viral que ha tret les batalles d’«aura» de TikTok al carrer. Jexs analitza per què tothom en parla.',
    },
  },
  {
    id: 'keLhvuk9BZA',
    title: 'TENDENCIAS DE MODA OTOÑO/INVIERNO 26-27 Y LO QUE MÁS NOS VAMOS A PONER',
    channel: 'Chincha Rabiña',
    category: 'estetica',
    duration: '24:48',
    views: '1 M',
    description: {
      es: 'Las prendas, colores y siluetas que van a dominar la temporada, explicadas para llevarlas en la vida real.',
      en: 'The pieces, colours and silhouettes set to dominate the season, explained so you can wear them in real life.',
      ca: 'Les peces, colors i siluetes que dominaran la temporada, explicades per portar-les a la vida real.',
    },
  },
  {
    id: 'D7MhOI70CMw',
    title: 'TOP 10 JUEGOS QUE VALE LA PENA COMPRAR EN 2026',
    channel: 'ReviewMe Oficial',
    category: 'gaming',
    duration: '19:24',
    views: '240 K',
    description: {
      es: 'Los lanzamientos que de verdad merecen la pena este año, con notas y comparativas para no gastar de más.',
      en: 'The releases actually worth your money this year, with scores and comparisons so you don’t overspend.',
      ca: 'Els llançaments que de veritat valen la pena aquest any, amb notes i comparatives per no gastar de més.',
    },
  },
  {
    id: 'RQ4dV-2p93A',
    title: '10 Gadgets que DEBERÍAS conocer (2026)',
    channel: 'Domingo Gomes',
    category: 'tecnologia',
    duration: '10:23',
    views: '479 K',
    description: {
      es: 'Gadgets útiles que están petándolo este año: del setup al día a día, sin compras impulsivas.',
      en: 'Useful gadgets blowing up this year, from desk setups to everyday life, without impulse buys.',
      ca: 'Gadgets útils que estan petant aquest any: de l’escriptori al dia a dia, sense compres impulsives.',
    },
  },
];
