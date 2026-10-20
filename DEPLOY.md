# Publicar Yuuvi

Alojamiento: **Cloudflare Pages** (plan Free, open source, ancho de banda ilimitado).
Coste: **0 €/mes** de hosting. Solo el dominio (~10 €/año).

---

## 1. Una sola vez: crear el proyecto en Cloudflare

1. Entra en <https://dash.cloudflare.com> y crea una cuenta (gratis).
2. Sidebar → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Elige **GitHub**, instala la app de Cloudflare en tu cuenta.
4. Selecciona el repositorio de Yuuvi y acepta.

Cloudflare detecta los ajustes solos, pero **verifica**:

|Ajuste|Valor|
|---|---|
|Framework preset|Astro|
|Build command|`npm run build`|
|Build output directory|`dist`|
|Root directory|`/`|
|Node.js version|`22`|

5. Añade `www.yuuvi.cat` en **Custom domains** (la zona debe estar *Active* en
   Cloudflare). `yuuvi.cat` (apex) redirige 301 a `www` en
   `functions/_middleware.js`. Cloudflare emite el certificado TLS
   automáticamente.

## 2. Una sola vez: secrets en GitHub

En el repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

|Nombre|Valor|
|---|---|
|`CLOUDFLARE_ACCOUNT_ID`|Tu Account ID (panel de Cloudflare, sidebar inferior)|
|`CLOUDFLARE_API_TOKEN`|Token con permiso `Account > Cloudflare Pages > Edit`|
|`INDEXNOW_KEY`|Opcional. Clave de 8-128 caracteres (letras y números) para avisar a Bing/Yandex de cambios. Si no la creas, el paso se omite solo.|

Genera la clave de IndexNow con `openssl rand -hex 16`. El workflow publica
`public/<clave>.txt` durante el build y luego avisa a los buscadores; no la
introduzcas a mano en el repositorio.

### Qué comprueba el pipeline antes de publicar

| Paso|Qué falla si...|
|---|---|
|`npm run check`|`astro check` encuentra errores de tipos|
|`npm run check:content`|un artículo tiene caracteres corruptos o menos de 800 palabras|
|`npm run build`|el build de Astro falla|
|`npm run check:seo`|faltan canonical, hreflang, JSON-LD, o hay enlaces rotos|
|`node scripts/indexnow.mjs`|solo si hay `INDEXNOW_KEY`; avisa a Bing tras el deploy. Nunca bloquea (se omite si falla)|

> El chequeo **bloquea el deploy** solo si publica el workflow de GitHub Actions.
> Si Cloudflare sigue desplegando desde Git en paralelo, un push roto puede colarse
> (ver «Deploy con GitHub Actions»).

## 3. Publicar

Con el workflow activo (recomendado): `git push` a `main` y GitHub Actions
comprueba, construye y publica. Estado del pipeline:
<https://github.com/walleram/yuuvi-new/actions>

Manualmente (cualquier caso):

```bash
npm run check:all     # tipos + build + SEO + contenido
npm run deploy:prod
```

---

## Deploy con GitHub Actions

`.github/workflows/deploy.yml` ejecuta en cada push a `main`:
`check` → `check:content` → `build` → `check:seo` → **deploy con wrangler** →
aviso a IndexNow (si hay `INDEXNOW_KEY`). Si algo falla, **no publica**.

Para que sea el único que despliegue (y los checks realmente bloqueen):

1. Añade los secrets de la sección 2 (`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`).
2. En el dashboard de Cloudflare: **Workers & Pages → proyecto `yuuvi-new` →
   Build → Branch control → desactiva «Enable automatic production branch deployments»**
   y guarda.

Sin el paso 2 hay **builds duplicados** (Cloudflare construye desde Git *y*
Actions sube `dist/`), y un push con errores de tipos/SEO seguiría publicándose
desde el lado de Cloudflare. Un proyecto Git **no puede pasarse a Direct Upload**;
la única vía es desactivar los deploys automáticos de rama.

---

## Alternativas si no quieres Cloudflare

|Opción|Coste|Notas|
|---|---|---|
|Cloudflare Pages|0 €|Recomendado. CDN global, bandwidth ilimitado|
|Netlify|0 €|100 build/mes, 100 GB/mes|
|Vercel|0 €|100 GB/mes, límites de visitas en Hobby|
|GitHub Pages|0 €|Sin cabeceras personalizadas, sin `_headers`|
|Hetzner + Caddy|~4 €/mes|Autohospedado, control total, más mantenimiento|

---

## Dominio barato

- **Cloudflare Registrar**: precio de coste, sin comisión. `.com` ~10 €/año.
- **Porkbun / Namecheap**: ~9-12 €/año con WHOIS gratuito.
- **FreeDNS /eu.org**: gratis, pero TLD poco fiable para AdSense.

Evita los `.com` a 3 €/año de los registradores biodegradables: suelen meter
`precio de renovación` ×10 en el año 2.

---

## Después de publicar

1. **Google Search Console** → añadir `yuuvi.cat` (propiedad de dominio, cubre
   `www` y apex) → verificar por DNS.
2. Enviar `https://www.yuuvi.cat/sitemap-index.xml`.
3. **Bing Webmaster Tools** → importar desde Search Console.
4. **Google AdSense** → añadir el dominio (ver `ADSENSES.md`).
5. Comprobar `https://www.yuuvi.cat/robots.txt` y `/sitemap-index.xml` en vivo.

## Comandos útiles

```bash
npm run dev            # servidor local en :4321
npm run build          # build + limpieza de dist/
npm run check:seo      # canonical, hreflang, JSON-LD, enlaces, palabras
npm run deploy:prod    # build + deploy a Cloudflare Pages
npx wrangler pages deployment list   # historial de despliegues
```
