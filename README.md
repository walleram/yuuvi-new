# Yuuvi

Revista digital de tendencias juveniles. Bilingüe (ES/EN), mobile-first, modo oscuro por defecto, optimizada para SEO y pensada para monetizar con Google AdSense.

## Stack

- **Astro 7** (estático, SSG) — velocidad y SEO
- **Tailwind CSS 4** — estilos con tema juvenil personalizado
- **Content Collections + glob loader** — artículos en Markdown
- **@astrojs/sitemap** — generación automática del sitemap
- Despliegue: cualquier hosting estático (Cloudflare Pages, Netlify, Vercel)

## Estructura

```text
/
├── public/                # Estáticos (robots.txt, favicon)
├── src/
│   ├── assets/covers/     # Imágenes de portada
│   ├── components/        # Header, Footer, BottomNav, ArticleCard, etc.
│   ├── content/articles/  # Artículos en Markdown (es/ y en/)
│   ├── layouts/           # Layout base con SEO
│   ├── lib/               # Config del sitio, utilidades
│   ├── pages/             # Rutas
│   │   ├── index.astro          # Home ES
│   │   ├── en/index.astro       # Home EN
│   │   ├── [...lang]/categoria/[slug].astro  # Categorías
│   │   └── [...slug].astro      # Artículo individual
│   └── styles/global.css  # Tailwind + tema
└── package.json
```

## Comandos

| Comando               | Acción                                 |
| :-------------------- | :------------------------------------- |
| `npm install`         | Instala dependencias                   |
| `npm run dev`         | Dev server en `localhost:4321`         |
| `npm run build`       | Build de producción a `./dist/`        |
| `npm run preview`     | Previsualiza el build localmente       |
| `astro dev --background` | Dev server en modo background        |

## Crear un artículo

Copia un ejemplo en `src/content/articles/es/` o `en/` y edita el frontmatter:

```md
---
title: "Título llamativo"
description: "Resumen de 150-160 caracteres para SEO"
lang: "es"
pubDate: 2026-09-01
category: "cultura | estetica | gaming | tecnologia | musica"
tags: ["tag1", "tag2"]
author: "Tu nombre"
coverImage: "src/assets/covers/tu-imagen.png"
coverAlt: "Descripción de la imagen"
featured: true
published: true
---

Contenido del artículo en Markdown.
```

## SEO implementado

- Meta tags + Open Graph + Twitter Cards por página
- Meta de artículo (`article:published_time`, `article:section`, `article:tag`, `article:author`)
- Hreflang ES ⇄ EN + x-default
- JSON-LD: `Article`, `BreadcrumbList`, `WebSite`, `Organization`
- Sitemap XML automático
- Robots.txt
- Imágenes optimizadas a WebP con `width`/`height`
- `loading="lazy"` en tarjetas, `eager` en el Hero
- URL canónicas
- Imagen Open Graph por defecto (`public/og-default.png`)

## Monetización (Google AdSense + RGPD)

AdSense **Auto Ads**: la red coloca los bloques sola, así que el sitio solo carga
el script con el ID de editor. Configura en `src/lib/adsense.ts`:

```ts
export const ADSENSE = {
  clientId: 'ca-pub-XXXXXXXXXXXXXXXX', // ID de tu cuenta AdSense
  ...
};
```

Componentes incluidos:

- **`ConsentBanner.astro`** — banner RGPD con **Consent Mode v2** (`denied` por defecto → `granted` al aceptar). Almacena la decisión en `localStorage`, solo carga el script de AdSense si el usuario acepta (anuncios no personalizados en caso contrario). Aceptar / Rechazar / Más info.

Legal incluido:

- `/privacidad/` — política con tabla de cookies y base legal RGPD.
- `/avisolegal/` — aviso legal con LSSI-CE.
- `/terminos/` — términos de uso.
- Enlaces en el footer.

## Estrategia de contenido (target 13-22)

La web está organizada en **5 pilares temáticos** que mapean lo que el público joven busca a diario. Esto construye autoridad tópica en Google y facilita la navegación.

| # | Pilar | Slug | Qué cubre |
|---|---|---|---|
| 1 | Cultura de Internet y Lenguaje | `cultura` | Slang, memes, significados de los virales. **Tráfico rápido** |
| 2 | Estéticas y "Cores" | `estetica` | Microtendencias de moda (Y2K, coquette...), outfits, dupes |
| 3 | Gaming y Cultura Streamer | `gaming` | Juegos, guías rápidas, setups de streamers |
| 4 | Tecnología, Apps e IA | `tecnologia` | Apps para estudiar, edición, trucos, IA para el día a día |
| 5 | Música, Fandoms y entretenimiento | `musica` | Setlists, lanzamientos, fandoms, series |

### Reglas de escritura (formato "snackable")

- **Párrafos de máximo 2-3 líneas.** La audiencia escanea, no lee.
- **Responder la keyword en el primer párrafo** (la respuesta corta en negrita).
- **Listas (listicles) siempre que se pueda.**
- **Negritas para lo importante**, emojis con moderación para acompañar.
- **Bloques con el > (cita)** para la "respuesta corta".

### Tabla de keywords de entrada (first articles)

| Pilar | Keyword long-tail | Intención | Tipo de artículo |
|---|---|---|---|
| Cultura | qué significa [slang] en TikTok | Informativa directa | Diccionario rápido / explicación del meme |
| Cultura | cómo hacer el trend de [canción] paso a paso | Tutorial | Guía con vídeos incrustados |
| Estética | zapatillas que combinan con todo estilo [Y2K/streetwear] | Comercial / Inspiracional | Lista Top 10 con imágenes |
| Estética | dónde comprar ropa estilo [core] barata | Transaccional (afiliación) | Guía de tiendas y dupes |
| Gaming | mejores juegos de móvil para jugar con amigos a distancia | Descubrimiento | Lista por categorías (terror, risas, cooperativos) |
| Gaming | qué setup usa [streamer] en 2026 | Informativa / Aspiracional | Desglose de componentes y accesorios |
| Tecnología | mejores apps gratis para organizar apuntes | Solución de problemas | Reseña de herramientas y comparativas |
| Música | posible setlist concierto [artista] España | Expectativa / Evento | Actualidad + playlist Spotify |

### Artículos de ejemplo ya creados (ES)

Cada uno demuestra el formato y ataca una keyword de la tabla:

1. `que-significa-delulu-tiktok` → Cultura (diccionario de slang)
2. `zapatillas-combinan-con-todo-y2k` → Estética (listicle Top 10)
3. `mejores-juegos-movil-amigos-distancia` → Gaming (lista por categorías)
4. `mejores-apps-gratis-apuntes` → Tecnología (comparativa)
5. `setlist-concierto-espana` → Música (actualidad + estructura de show)

## Siguientes fases

- Registrar la web en Google Search Console + analytics
- Despliegue (Cloudflare Pages/Netlify)
- Publicación de AdSense y ajuste de bloques