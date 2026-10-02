# Banco de prompts — Yuuvi

Prompts reutilizables para el flujo de contenido. Adáptalos, no los copies a ciegas.

> Para retomar el trabajo en una sesión nueva, ver `HANDOFF.md`.

---

## 0. El contexto del proyecto (pegar siempre al principio)

```text
Soy el editor de Yuuvi, una revista de tendencias para público de 16-25 años
(es-ES y en-US). Stack: Astro 7 estático, contenido en Markdown con frontmatter
validado por Zod, Tailwind 4. Categorías: cultura, estetica, gaming,
tecnologia, musica.

Reglas de la casa:
- Tono directo, cercano, nada de purple prose ni relleno.
- Español de España cuando el destino es es; inglés natural (no literal) para en.
- Nada de invención: si un dato no lo sé, lo digo o lo omito.
- Ningún claim sin fuente. Nada de "es el mejor" sin criterio explícito.
```

---

## 1. Article de trending (el prompt principal)

```text
[CONTEXTO DEL PROYECTO]

Escribe un artículo para Yuuvi sobre: "{{TEMA}}"

Keyword principal: {{KEYWORD}}  ·  Intención: {{informativa|comparativa|transaccional}}
Categoría: {{categoria}}  ·  Autor: {{autor}}  ·  Idioma: {{es|en}}

Estructura:
1. H1 con la keyword, <=65 caracteres, con un beneficio o una respuesta clara.
2. Respuesta directa en las 2 primeras frases (85-95 caracteres). El lector
   debe quedar satisfecho sin seguir leyendo, pero DEBE seguir leyendo.
3. H2 "Qué es / Qué significa" — definición real, con el origen etimológico.
4. H2 "De dónde viene" — contexto, fechas, meme o persona que lo popularizó.
5. H2 "Cómo se usa" — 4-6 ejemplos reales de frases, con los que SÍ y los que NO.
6. H2 "Errores comunes" — lo que la gente hace mal al usarlo.
7. H2 "Palabras relacionadas" — 4-5 términos que el lector debería conocer después.
8. Cierre con una pregunta abierta que invite a comentar.

Requisitos:
- {{800|1200}} palabras de contenido real (sin contar H2 ni tablas).
- 2-3 ejemplos de frases que suenen naturales, no de manual.
- Al menos un dato verificable con fecha o fuente.
- Frontmatter YAML válido con: title, description (<=155 car.), lang, pubDate,
  category, tags (4-6), author, coverImage, coverAlt, published, translationKey.
- 2 imágenes inline con alt descriptivo, routes:
  src/content/articles/images/{{slug}}-{{tema1}}.png

Devuelve el Markdown completo con el frontmatter. Nada de explicaciones aparte.
```

---

## 2. Reescribir un artículo corto (para pasar AdSense)

```text
[CONTEXTO DEL PROYECTO]

Este artículo tiene solo {{N}} palabras y Google lo va a tratar como thin
content. Reescríbelo a 900-1100 palabras SIN perder la claridad de los datos
actuales. Amplía, no rellenes.

Para llegar a la extensión, añade en este orden de valor:
1. Ejemplos Extra: 3-4 casos reales o hipotéticos, con el resultado.
2. Contexto histórico: cuándo apareció el término y por qué se popularizó.
3. Matices: cuándo NO usar la palabra, qué confusiona a la gente.
4. Sección de preguntas frecuentes (4 preguntas, respuestas de 40-60 palabras).

Prohibido:
- Repetir lo que ya dice el texto original con otras palabras.
- Frases de relleno ("en el mundo actual", "es importante recordar").
- Listados de 15 puntos sin substance.

Mantén el mismo H1, la misma categoría y los mismos tags.
Devuelve solo el Markdown completo.
```

---

## 3. Portada / imagen de artículo

```text
Imagen para la portada de un artículo de Yuuvi: "{{TEMA}}"

Estilo de la casa: fondo oscuro (#0a0a0a), acentos en la paleta de marca
(rosa #ff2d78, morado #a855f7, cian #22d3ee, amarillo #facc15), estética
internet/Cyberpunk suave, tipografía grande y legible, composición con
espacio para el badge de categoría en la esquina superior izquierda.

Formato: 16:9, 1200x675 px, sin texto pequeño, sin texto inventado que no
sea el término clave.

Uso: {{categoria}} · {{idioma}}
```

---

## 4. Revisión editorial / SEO

```text
[CONTEXTO DEL PROYECTO]

Revisa este artículo y devuelve SOLO un informe, sin reescribirlo todavía:

CONTENIDO
- ¿Hay afirmaciones sin fuente? Señálalas.
- ¿Falta algún caso práctico o ejemplo real?
- ¿Alguna frase es relleno? Cítala literalmente.

SEO
- ¿La keyword está en H1, primer párrafo, un H2 y el cierre?
- ¿El H1 es <=65 caracteres? ¿La meta description <=155?
- Longitud actual: {{N}} palabras (objetivo 800+).

LECTURA
- ¿Hay párrafos de más de 4 líneas?
- ¿Los H2 parecen un índice razonado, no una lista de etiquetas?
- ¿El cierre invita a comentar?

Dame una nota de 1 a 10 y los 5 cambios con más impacto, ordenados.
```

---

## 5. Auditoría de la web entera

```text
[CONTEXTO DEL PROYECTO]

Audita mi sitio como lo haría un revisor de AdSense y un consultant SEO.
Tengo {{N}} artículos publicados.

Prioriza los hallazgos por (impacto en ingresos) / (esfuerzo). No me des
una lista de 50 buenas prácticas: dime las 5 cosas que arreglarían primero.

Para cada hallazgo: qué pasa, por qué cuesta dinero o tráfico, y el cambio
concreto con el fichero donde tocarlo.
```

---

## 6. Ideas de contenido desde una keyword

```text
[CONTEXTO DEL PROYECTO]

Keyword: {{KEYWORD}}

Dame 10 ideas de artículos para Yuuvi que compitan con esta keyword pero
enAngles distintos: definicion, comparativa, errores, trending, opinion,
tutorial, historia.

Para cada una:
- H1 propuesto (<=65 caracteres)
- Intención de búsqueda
- Categoría y autor
- Por qué no lo cubre ya el top 10 de Google
- Dificultad (baja/media/alta)

Ordena por probabilidad de posicionar en 3 meses.
```

---

## 7. Traducción ES → EN

```text
Traduce este artículo de Yuuvi al inglés para un lector de 16-25 años
de Estados Unidos. Inglés natural, no literal: si una expresión española no
tiene equivalente idiomatico, reescribela.

Conserva:
- El Markdown y la estructura de H2/H3.
- Los emojis y su posición.
- El tono: cercano y directo.

Cambia:
- Fechas a formato US (agosto 10, 2026).
- "móvil" -> "phone", "ordenador" -> "laptop".
- Expresiones que suenan Valle del Guadalquivir en inglés.

Añade al frontmatter: lang: "en" y el MISMO translationKey que el original.

Devuelve solo el Markdown.
```

---

## 8. Meta de AdSense: qué cambia un artículo

```text
[CONTEXTO DEL PROYECTO]

Este artículo es candidato a rechazo por thin content. Dime qué le falta
para pasar la revisión, en este orden de prioridad:

1. Secciones que añadirías, con el titulo exacto y qué va en cada una.
2. Preguntas frecuentes que respondería un lector real, con la respuesta
   corta de cada una (para poder marcarlas con FAQPage schema).
3. Datos verificables que puedo añadir (con la fuente que debería buscar).
4. Lo que debería quitar porque resta credibilidad.

No me reescribas el artículo todavía.
```

---

## Reglas para todos los prompts

- **Nunca** pegues el contexto del proyecto y el contenido en el mismo bloque
  grande: separa con `---` para que el modelo no mezcle instrucciones.
- **Siempre** pide que devuelva solo el Markdown, sin commentary. Es más fácil
  de pegar en el fichero.
- **Verifica** con `npm run check:seo` lo que produzca el modelo. Es gratis.
- **No** le pidas a un modelo que investigue fuentes reales si no tiene
  acceso a web: preferirá inventarlas.
