# Estado de trabajo — Yuuvi

Instantánea para retomar en una sesión nueva. Escríbela a mano: si algo de aquí
ya no es cierto, gana el código.

Última actualización: 2026-10-01, commit base `1a1de34`, **nada commiteado**.

---

## Para continuar

```bash
npx astro dev --background     # astro NO está en el PATH, no uses "astro dev"
npm run check:all              # check + build + check:seo + check:content
```

Dos cosas que ya han costado tiempo:

1. `AGENTS.md` dice `astro dev --background`, pero **falla con command not found**.
   Usa siempre `npx astro`.
2. **No instales paquetes con el servidor levantado.** Al meter `@astrojs/check`,
   npm cambió el binario de Sharp en disco y el proceso en marcha se quedó sin
   poder cargar imágenes (MissingSharp, todo a 500). Secuencia correcta:
   `npx astro dev stop` → `npm install` → `npx astro dev --background`.

---

## Lo que hay hecho

- **87 páginas**, 13 artículos, 15.011 palabras, ES/EN con `translationKey` +
  hreflang recíproco. `npm run check:all` en verde: 0 errores de tipos, 0 errores
  SEO, sin corrupción, sin imágenes > 400 KB. La CI bloquea el deploy si falla.
- **9 portadas** en `src/assets/covers/`, todas `.webp` 1200×675, 155-250 KB. Los
  13 artículos usan webp; no queda ningún `.png` en `src/assets/covers`.
- Los **10 originales sin optimizar** están en `covers-originals/`, ignorada por
  git. Han de estar fuera de `src/assets` porque el check de CI rechaza > 400 KB.
- Negro de fondo `--color-ink: #0b0b12` (antes `neutral-950`, que valía `#0a0a0a`).
  Sustituirlo fueron 8 sitios, no uno.
- Legales EN (`src/pages/en/{privacy,terms,legal-notice}.astro`) con rutas
  centralizadas en `src/lib/site.ts:LEGAL_ROUTES`. El `LocaleSwitcher` antes las
  excluía a propósito y el `Footer` las tenía fijas en español. Ahora las 6 tienen
  selector de idioma y hreflang recíproco.
- Publicidad: se eliminaron los slots manuales (`AdSlot` / `InlineAd`) y su
  lógica de densidad. Ahora todo lo coloca **AdSense Auto Ads**; el sitio solo
  carga el script y mantiene el banner de consentimiento.

### Publicidad: decisiones que conviene no re-litigar

- `InlineAd` estaba roto: usaba `querySelector`, así que solo movía el primer
  anuncio. Ahora itera todos y recibe un **porcentaje**, no un índice de párrafo,
  porque en build no se sabe cuántos párrafos habrá.
- El banner que estaba **antes** del texto se quitó: bajo el titular y sin una
  línea de contenido delante es la peor posición para clics accidentales.
- Las **categorías no se tocaron**: música tiene 2 artículos ES. Un anuncio más
  ahí serían 2 anuncios sobre 2 artículos, que es la sanción de contenido de poco
  valor de AdSense.
- La portada EN tiene 4 artículos, así que los banners de sección están detrás
  de `MIN_ARTICLES_FOR_SECTION_AD = 6`. Al llegar a 6 artículos EN aparecen solos.
- La rejilla de la portada tiene 11 celdas (8 tarjetas + 3 anuncios) y queda en
  filas de 4/4/3. **No es un defecto**, es CSS grid normal: la última fila
  simplemente no se llena. Quitar el anuncio del índice 6 empeoraría el resultado
  (4/4/2), así que no se toca.`

---

## Los `coverAlt`: estado y cómo cerrarlos

**Este modelo no acepta imágenes.** No puede ver las portadas, así que todos los
alt se han escrito midiendo el color de los píxeles. Eso permite decir el tono
dominante y los acentos, pero **no qué se ve en la imagen**.

Se remedió lo remediable: los 13 alt se reescribieron con una medición única y
consistente de las 9 portadas (base dominante + acentos), y ya **ninguno afirma
cosa que la medición contradiga**. Quedan 3 que son correctos tal cual
(`cultura-alt`, `procrastinar-alt` ES, `tech-apps`) porque la medición confirma
lo que ya decían.

**Para el cierre humano:**

```bash
node scripts/alt-review.mjs && open _alt-review.html
```

Muestra las 9 portadas con su `coverAlt` actual al lado. Los `alt=""` de esa
página están vacíos a propósito para que el navegador no te los solape. Se
corrige en `src/content/articles/<lang>/<slug>.md`, nunca en el HTML.

Es un archivo generado, en `.gitignore`, no entra en git ni en el build.

### Trampa de la medición

Al principio filtraba los píxeles casi-blancos y casi-negros para ver los tonos
medios, y eso **descartaba los acentos de color**: por eso se llegó a decir que
`cultura-alt` era en gris puro, cuando tiene magenta al 13%. La versión buena
separa **base dominante** de **acento** (saturado y claro) y no descarta nada.
Si hay que volver a medir, ese es el método.

---

## Pendiente

### 1. Publicidad real (bloqueante para ingresos)

`src/lib/adsense.ts` tiene `clientId: 'ca-pub-0000000000000000'`, así que
`enabled` es **false** y no se carga el script de AdSense. Hay que poner el ID
real de la cuenta AdSense. Los slots manuales se eliminaron: AdSense Auto Ads
coloca los bloques por su cuenta.

### 2. Commit y publicación

Nada commiteado: ~25 ficheros nuevos, 7 modificados, 18 borrados (AppleDouble)
sobre `1a1de34`. **Falta crear el repo en GitHub** y no se puede hacer desde aquí
porque `gh` no está instalado en esta máquina. Con el repo creado:
`wrangler.toml` y `DEPLOY.md` ya están.

Ojo: `covers-originals/` **no está en git**. Si se clona el proyecto en otro
sitio, los 10 originales no vienen. Decidir si se versionan (10 MB) o se
re-exportan desde el originals.

### 3. Desbloquear los banners EN

La portada EN sigue con 1 anuncio hasta llegar a 6 artículos en inglés. Ahora hay
4 EN frente a 9 ES, y las categorías EN (cultura, gaming) tienen 0. Es el trabajo
de contenido más rentable, no de código.

### 4. Duda de mapeo sin resolver

`cover-lifestyle-alt` está en un artículo de moda (`tendencias-moda-temporada`)
y `cover-moda-alt` en unas zapatillas. Los nombres de fichero no cuadran con el
uso. Por color el emparejado actual es el que mejor encaja (moda = gris claro,
tendencias = claro con magenta), pero conviene confirmarlo mirando las imágenes.

---

## Cómo se procesa una portada nueva

Los originales llegan en 1536×1024 (3:2) y las portadas del sitio a 1200×675
(16:9), de ahí el recorte. Central, así que **se pierden 160 px de alto**; si en
alguna importa el borde, ajustar `position` a `north`/`south`.

```bash
# 1. convertir (sharp no resuelve fuera del proyecto: ejecutar desde la raíz)
node -e "require('sharp')('src/assets/covers/in.png')
  .resize(1200,675,{fit:'cover',position:'centre'})
  .webp({quality:82,effort:6}).toFile('src/assets/covers/out.webp')"
# 2. el original fuera de src/, o el CI lo rechaza por peso
mv src/assets/covers/in.png covers-originals/
# 3. apuntar el artículo al webp, en los dos idiomas si comparten translationKey
# 4. npm run check:all
```

`og:image` usa la imagen cruda: si se deja en 3:2, comparte en redes con otro
formato que el resto. Por eso hay que recortar siempre.
