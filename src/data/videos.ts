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
  {
    id: 'RCcY8NMVUJI',
    title: '10 Minutes Of Brainrot Memes V5',
    channel: 'AlienMedia',
    category: 'cultura',
    duration: '10:09',
    views: '380 K',
    description: {
      es: 'Diez minutos de memes de brainrot para entender el humor de internet este año. El formato que todos imitan, en versión recopilatoria.',
      en: 'Ten minutes of brainrot memes to understand this year’s internet humour. The format everyone copies, in compilation form.',
      ca: 'Deu minuts de memes de brainrot per entendre l’humor d’internet aquest any. El format que tothom imita, en versió recopilatòria.',
    },
  },
  {
    id: 'v03W44QJRx0',
    title: 'Estas Son Las Tendencias De La Temporada Otoño-Invierno 2026',
    channel: 'Natalia Osona',
    category: 'estetica',
    duration: '22:58',
    views: '345 K',
    description: {
      es: 'La guía de la temporada con las prendas y combinaciones que están triunfando en la calle y en redes.',
      en: 'The season guide with the pieces and combinations winning on the street and on social media.',
      ca: 'La guia de la temporada amb les peces i combinacions que triomfen al carrer i a les xarxes.',
    },
  },
  {
    id: 'BbuxTJCa0kw',
    title: 'Los 25 VIDEOJUEGOS MÁS ESPERADOS de 2026',
    channel: '3DJuegos',
    category: 'gaming',
    duration: '22:57',
    views: '601 K',
    description: {
      es: 'El repaso a los lanzamientos que más expectación están generando este año, con fechas y detalles.',
      en: 'A rundown of the releases generating the most buzz this year, with dates and details.',
      ca: 'El repàs als llançaments que més expectació estan generant aquest any, amb dates i detalls.',
    },
  },
  {
    id: 'nQdXp6HKKik',
    title: 'I tested the most Futuristic Tech - it scared me.',
    channel: 'Mrwhosetheboss',
    category: 'tecnologia',
    duration: '24:32',
    views: '23,8 M',
    description: {
      es: 'Una de las pruebas tecnológicas más virales del año: los prototipos que parecen ciencia ficción y lo que dan de sí en la vida real.',
      en: 'One of the most viral tech tests of the year: prototypes that look like science fiction and how they hold up in real life.',
      ca: 'Una de les proves tecnològiques més virals de l’any: els prototips que semblen ciència-ficció i què donen de si a la vida real.',
    },
  },
  {
    id: 'xCkf2L7gFnI',
    title: 'Jay Wheeler, Omar Courtz - De Lejitos (Remix) (Video Oficial)',
    channel: 'JayWheelerVEVO',
    category: 'musica',
    duration: '4:39',
    views: '137 M',
    description: {
      es: 'El remix que está sonando en todas las playlists y feeds de baile. Uno de los lanzamientos más reproducidos del año.',
      en: 'The remix playing on every playlist and dance feed. One of the most-streamed releases of the year.',
      ca: 'El remix que sona a totes les playlists i feeds de ball. Un dels llançaments més reproduïts de l’any.',
    },
  },
];
