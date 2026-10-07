# Plan: 6 artículos nuevos (ES + EN)

## Lista propuesta de temas

Tras revisar los 15 artículos existentes (9 ES / 6 EN) y la tabla de keywords del README, esta es la lista para cerrar huecos —pilares desequilibrados: cultura 1, gaming 1— y atacar keywords pendientes:

| # | Pilar | Título ES (≈) | Slug ES | Slug EN | Autor | Keyword / origen |
|---|---|---|---|---|---|---|
| 1 | cultura | Cómo hacer el trend de TikTok del momento paso a paso | `hacer-trend-tiktok-paso-a-paso` | `how-to-do-tiktok-trend-step-by-step` | Valentina Ruiz | README: "cómo hacer el trend paso a paso" (tutorial) |
| 2 | cultura | Qué significa 'brainrot' en TikTok (y por qué ya lo dice todo el mundo) | `que-significa-brainrot-tiktok` | `what-brainrot-means-tiktok` | Valentina Ruiz | 2º diccionario de slang tras `delulu` |
| 3 | gaming | Qué setup usa un streamer en 2026 (y cómo montar el tuyo por menos) | `setup-streamer-2026` | `streamer-setup-2026` | Diego Morales | README: "qué setup usa [streamer] en 2026" |
| 4 | estetica | Dónde comprar ropa estilo core barata en España (tiendas, apps y dupes) | `donde-comprar-ropa-core-barata` | `where-to-buy-core-fashion-cheap` | Lucía Fernández | README: "dónde comprar ropa estilo [core] barata" (comercial) |
| 5 | gaming | Los mejores juegos indie de 2026 (gratuitos o por menos de 10 €) | `mejores-juegos-indie-2026` | `best-indie-games-2026` | Diego Morales | gaming es el pilar más flojo (1 art.) |
| 6 | musica | Cómo conseguir entradas de conciertos en España sin que te estafen | `conseguir-entradas-conciertos-espana` | `get-concert-tickets-spain-safely` | Diego Morales | alta intención de búsqueda; no pisa al setlist |

Resultado: cultura 1→3, gaming 1→3, musica 2→3, estetica 3→4, tecnologia 2 (sin tocar).

En la ejecución se usará **web search** para anclar el artículo 1 a un trend real y vigente y el 2 al slang realmente viral en octubre 2026 (si "brainrot" ya no lo es, se sustituye el término manteniendo el formato).

## Archivos a crear

- **12 markdown**: `src/content/articles/es/<slug>.md` × 6 y `src/content/articles/en/<slug>.md` × 6, emparejados por `translationKey` (ej. `trend-tiktok`, `brainrot`, `setup-streamer`, `ropa-core`, `juegos-indie`, `entradas-conciertos`). Los slugs EN pueden diferir, por eso existe la clave.
- **12 portadas** en `src/assets/covers/` (o 6 + copias con sufijo `-EN.webp` si solo subes 6 fotos).
- **~18 imágenes de sección** PNG (3 por artículo ES) vía `scripts/generate-article-images.mjs` (script local, gradiente del pilar + emoji + texto; solo se insertan en ES, igual que los artículos existentes).

## Portadas (las subes tú)

1. Suelta los originales en `covers-originals/` (está gitignored; los originales no pueden quedar en `src/assets` porque CI rechaza >400 KB). Nombres sugeridos: `trend-tiktok.png`, `brainrot.png`, `setup-streamer.png`, `ropa-core.png`, `juegos-indie.png`, `entradas-conciertos.png`.
2. Yo los convierto con sharp desde la raíz:
   `node -e "require('sharp')('covers-originals/X.png').resize(1200,675,{fit:'cover',position:'centre'}).webp({quality:82,effort:6}).toFile('src/assets/covers/cover-X.webp')"`
3. Para EN: copia con `-EN` en el nombre (la regla es que ES y EN no compartan URL de OG).
4. `coverAlt` descriptivo por artículo y revisión con `node scripts/alt-review.mjs && open _alt-review.html`.

Si las fotos no llegan antes de escribir, apunto los artículos a portadas existentes **como provisional** y te dejo la lista exacta de archivos a sustituir; `check:all` no pasa hasta que estén las definitivas.

## Fases de ejecución

1. Confirmar esta lista (o ajustar títulos).
2. Web search: trend real + slang real de octubre 2026; datos para setup y tiendas de ropa.
3. Escribir los 6 ES (900–1200 palabras cada uno).
4. Traducir a EN (misma estructura H2/H3 y posiciones de emoji, `lang: "en"`).
5. Añadir configs de secciones al script de imágenes y ejecutarlo.
6. Convertir portadas cuando subas las fotos + alt-review.
7. `npx astro dev stop` si el server está activo → `npm run check:all` en verde → parar.

## Reglas que respeta cada artículo (del house style)

- Frontmatter en orden de casa: `title` (≤65 chars o `seoTitle`), `description` 110–155 (hace de dek), `seoTitle`, `lang`, `pubDate` (escalón diario 2026-10-01 → 10-06), `category`, `tags` 4–6 minúsculas sin acentos, `author` (uno de los 4 de `AUTHORS` en `src/lib/site.ts`), `coverImage` string raíz, `coverAlt`, `published: true`; **sin** `featured` (solo delulu lo tiene).
- Cuerpo: primera línea con la respuesta en negrita → cita `> Respuesta corta:` → 6–10 `##` → FAQ `##` con 4–5 preguntas → cierre con pregunta abierta + 1 emoji. Párrafos de 2–3 líneas, listicles, negritas de arranque, **cero componentes Astro**.
- ES: español de España; EN: US English natural. Sin caracteres fuera de Latin salvo emoji y `→←↑↓•●★♥`.
- Portadas `.webp` 1200×675 ≤400 KB; ≥800 palabras (check-content emite "CORTO" por debajo).

## Notas / riesgos

- `check:seo` avisa hoy del desajuste de dominio (`astro.config.mjs:8` → `yuuvi-new.pages.dev` vs `check-seo.mjs:27` → `yuuvi.com`): **warning preexistente**, no sale de este trabajo y no bloquea (solo los errores cuentan para exit code).
- `canonicalURL` del schema está muerto: `src/pages/[...slug].astro:58` lo recalcula siempre; no rellenarlo.
- No copiar prosa literal de artículos existentes: varios tienen corrupción LLM que pasa los checks (`haworked`, `necesitaONEY un acentoSpanish`, `me ammonia`...). Usarlos solo como referencia de tono y estructura.
- `pubDate` de hoy o anteriores: si algún artículo nuevo lleva fecha futura, revisar si el listado lo filtra.
