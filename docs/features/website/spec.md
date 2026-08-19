# Especificación — Sitio web de MetalMind Studios

> Estado: **borrador para aprobación**. No se escribe código hasta que este documento
> y `design-plan.md` estén aprobados.
>
> Convenciones de este documento:
> - `⚠️ CONFIRMAR` marca datos que necesitan confirmación del dueño antes de publicar.
> - El copy que aparece entre comillas o en bloques es **el texto final propuesto**, no placeholder.

---

## 0. Decisiones tomadas (2026-08-19, confirmadas por Renan)

1. **Coral:** `#F04E68` en todo — tokens y SVGs de marca (editados para coincidir).
2. **Lockups con `<text>`:** pendiente re-exportar con el texto en curvas. Mientras
   tanto, el header usa lockup en HTML (símbolo SVG + wordmark en Archivo/Plex Mono);
   los SVG de lockup quedan con `TODO` para uso externo.
3. **Nombres de archivo:** renombrados al estándar del brief —
   `metalmind-mark.svg`, `metalmind-lockup.svg` (para fondos oscuros),
   `metalmind-lockup-dark.svg` (trazo oscuro, para fondos claros),
   `metalmind-favicon.svg`.
4. **Contacto:** WhatsApp `+507 6388-8475` (`wa.me/50763888475`). Correo temporal
   `renandiazreyes@gmail.com` hasta comprar el dominio
   (`TODO: cambiar a hola@metalmindstudios.com`). Instagram: sin handle confirmado —
   no se publica link hasta tenerlo (`TODO` en footer).
5. **Precios:** confirmados tal como están en §3.4.
6. **Etiqueta "demo" visible:** aprobada — cada caso lleva "Proyecto demo" visible
   además del `TODO` en código.
7. **Titular del hero:** se mantiene "Tu negocio existe. Tu sitio web, no."

---

## 1. Sitemap

```
/                    Home — todo el argumento de venta
/trabajos            Índice de casos (3 demos)
/trabajos/[slug]     Caso individual
/planes              Precios en detalle + mantenimiento + FAQ
/contacto            Formulario + WhatsApp directo
/contacto/gracias    Confirmación post-envío (también destino del POST sin JS)
/404                 Error simple con CTA a home
```

Sin blog, sin página "sobre mí" separada: el "quién soy" vive en una línea del
footer y en el registro de primera persona de todo el copy.

---

## 2. Elementos globales

### Header (todas las páginas)
- Lockup horizontal a la izquierda, construido en HTML: `metalmind-mark.svg` +
  wordmark en Archivo 700 / "STUDIOS" en Plex Mono (los SVG de lockup tienen texto
  sin convertir a curvas; ver decisión #2 del §0).
- Links: **Trabajos · Planes · Contacto**.
- Botón coral **"Cotizar"** → `wa.me` (mensaje origen `header`).
- Sticky; se compacta al hacer scroll (72px → 56px). Fondo sólido `ink`,
  borde inferior 1px `steel` al 20%. Sin blur.
- Móvil: lockup + botón hamburguesa (único JS #1) que abre panel con los 3 links.
  El botón "Cotizar" del header se omite en móvil porque la barra inferior ya lo cubre.

### Barra inferior móvil (< 768px, todas las páginas)
- Fija abajo, fondo `ink`, borde superior 1px, un solo botón coral a lo ancho:
  **"Cotizar por WhatsApp"** (mensaje origen `barra-movil`).
- `padding-bottom: env(safe-area-inset-bottom)`.

### Footer (todas las páginas)
- Fondo `ink`. Lockup, y en una línea: WhatsApp (link) y `renandiazreyes@gmail.com`
  (`TODO: cambiar a hola@metalmindstudios.com` al comprar dominio). Instagram queda
  como `TODO` comentado hasta confirmar el handle.
- Línea legal-humana: "MetalMind Studios · Panamá · 2026" (año en build).
- Micro-línea de identidad: "Diseñado y construido por una persona. Esa persona te
  contesta el WhatsApp."

### Enlaces de WhatsApp (mensajes precargados por origen)

Formato: `https://wa.me/50763888475?text=<encoded>`.
Centralizado en `src/lib/whatsapp.ts` — un helper `waLink(origen)`:

| Origen | Mensaje precargado |
|---|---|
| `header` / `barra-movil` | "Hola, vengo de metalmindstudios.com y quiero cotizar un sitio para mi negocio." |
| `hero` | "Hola, quiero cotizar un sitio web para mi negocio." |
| `plan-base` | "Hola, me interesa el plan Base. Mi negocio es: " |
| `plan-negocio` | "Hola, vengo del plan Negocio. Mi negocio es: " |
| `plan-a-medida` | "Hola, necesito algo a medida. Lo que busco es: " |
| `trabajos` | "Hola, vi los trabajos en la página y quiero algo parecido para mi negocio." |
| `cierre` | "Hola, quiero conversar sobre un sitio para mi negocio." |
| `contacto` | "Hola, prefiero cotizar por aquí. Mi negocio es: " |
| `footer` | "Hola, vengo de metalmindstudios.com." |

---

## 3. Home — mapa de contenido con copy final

### 3.1 Hero (fondo `ink`)

- Eyebrow (mono): `DESARROLLO WEB · PANAMÁ`
- H1: **Tu negocio existe. Tu sitio web, no.**
- Subtítulo: "Hago sitios web rápidos y bien hechos para negocios panameños.
  Diseño, desarrollo y mantenimiento — una sola persona que te contesta el WhatsApp."
- CTA primario (coral): **Cotizar por WhatsApp** (origen `hero`)
- CTA secundario (link con subrayado): **Ver trabajos** → `/trabajos`
- Visual: hexágono SVG inline, trazo 1.5px `steel`, aristas internas `graphite`,
  que se dibuja al cargar (~700ms, `stroke-dashoffset`, CSS puro); el nodo coral
  aparece al final (~150ms extra). Con `prefers-reduced-motion: reduce` no hay
  animación: aparece completo y estático.

### 3.2 El problema (fondo `ink`)

- Eyebrow: `EL PROBLEMA`
- H2: **Esto ya te está costando clientes.**
- Tres afirmaciones, numeradas en mono (01–03), cada una con su consecuencia:

1. **Tus clientes te buscan en Google y encuentran a tu competencia.**
   "La llamada se la lleva el que aparece, no el que hace mejor el trabajo."
2. **Instagram no es un sitio web.**
   "No sale en Google, el algoritmo decide quién te ve, y la cuenta no es tuya:
   es de Meta. Si te la cierran mañana, no te llevas nada."
3. **El sitio que te hicieron carga en 8 segundos.**
   "En el celular, más de la mitad de la gente abandona una página que tarda más
   de 3 en abrir. Nunca sabes cuántos clientes fueron."

### 3.3 Qué hago (fondo `bone` — primera sección clara)

- Eyebrow: `QUÉ HAGO`
- H2: **Diseño, desarrollo y mantenimiento. Los tres, una persona.**
- Tres columnas, numeradas en mono, sin iconos:

**01 · Diseño** — "Un sitio que se entiende en cinco segundos: qué vendes, dónde
estás y cómo contactarte. Pensado para el celular primero, porque ahí te van a ver."

**02 · Desarrollo** — "Carga rápido, sale en Google y el botón de WhatsApp está
siempre a la vista. Nada de plantillas recicladas que se ven igual que las de todos."

**03 · Mantenimiento** — "Hosting, dominio, respaldos y los cambios menores del mes,
todo en una mensualidad fija. ¿Cambió un precio o un horario? Me escribes y lo
actualizo."

*(La palabra "Astro" — ni ninguna tecnología — aparece en el sitio. Verificado en el
checklist de aceptación.)*

### 3.4 Planes (fondo `bone`)

- Eyebrow: `PLANES`
- H2: **Precios claros desde el principio.**
- Intro: "Sin 'consultar precio'. Estos son los puntos de partida; si tu caso cuesta
  distinto, te lo digo antes de empezar, no después."

⚠️ CONFIRMAR CIFRAS ANTES DE PUBLICAR. Tres tarjetas (contenido completo en la
collection `planes`, ver §6):

**Base — desde $450 · mantenimiento $25/mes**
- Para quién: "Para el negocio que necesita existir en Google ya."
- Incluye: landing de una página · textos redactados contigo · botón de WhatsApp y
  mapa · aparece en Google · dominio el primer año
- Entrega: 2 semanas
- CTA: "Cotizar este plan" (origen `plan-base`)

**Negocio — desde $900 · mantenimiento $40/mes** *(destacado: etiqueta mono "MÁS PEDIDO" + nodo coral)*
- Para quién: "Para el negocio con más que contar: menú, catálogo, servicios, equipo."
- Incluye: hasta 5 secciones · blog o catálogo · perfil de Google Business
  configurado · formulario de contacto · todo lo del plan Base
- Entrega: 3 semanas
- CTA: "Cotizar este plan" (origen `plan-negocio`)

**A medida — cotización cerrada**
- Para quién: "Para cuando necesitas que el sitio haga algo: reservas, pagos con
  Yappy, portales de clientes, integraciones."
- Incluye: "Lo conversamos, defino alcance contigo y te doy un precio cerrado.
  Sin sorpresas a mitad de camino."
- Entrega: según alcance, con fechas por escrito
- CTA: "Contarme qué necesitas" (origen `plan-a-medida`)

Bloque bajo las tarjetas — **el mantenimiento, explicado de frente:**
"¿Qué es la mensualidad? Tu sitio necesita un lugar donde vivir (hosting), un nombre
(dominio), copias de seguridad y alguien que haga los cambios pequeños del mes. Eso
es. Si prefieres administrarlo tú, también se puede: te entrego todo y te explico
cómo."

### 3.5 Proceso (fondo `ink` — aquí vive el eje isométrico)

- Eyebrow: `PROCESO`
- H2: **De la primera conversación a publicado: 2 a 3 semanas.**
- Cuatro pasos sobre el eje en zigzag a 30°, nodo coral por paso:

1. **Conversamos** — "Me cuentas de tu negocio por WhatsApp o en una llamada.
   Treinta minutos, sin costo y sin compromiso." *(día 1)*
2. **Propuesta y anticipo** — "Te mando una propuesta con precio cerrado y fechas.
   Si te sirve, arrancamos con el 50%." *(días 2–3)*
3. **Construyo y revisas** — "Te voy mostrando el sitio real en tu celular, no
   dibujos. Dos rondas de ajustes incluidas." *(semanas 1–2)*
4. **Publicamos** — "El sitio queda en tu dominio y dado de alta en Google. Te
   enseño a leer las visitas. Pagas el 50% restante." *(1 día)*

### 3.6 Trabajos (fondo `bone`)

- Eyebrow: `TRABAJOS`
- H2: **Casos**
- Tres tarjetas: captura en marco de navegador mínimo (barra 1px + tres puntos en
  `steel`), nombre, problema en una línea, resultado en una línea, link al caso.
- Cada caso lleva etiqueta visible "Proyecto demo" y
  `TODO: reemplazar por cliente real` en el código.
- Link final: "Ver los tres casos →" `/trabajos`

Casos (ficticios, sin métricas inventadas — detalle completo en §5):

| Slug | Negocio | Problema (una línea) | Resultado (una línea) |
|---|---|---|---|
| `clinica-dental-altamira` | Clínica Dental Altamira | "Las citas entraban por DM de Instagram y se perdían entre los mensajes." | "Ahora cada cita llega por WhatsApp con nombre, motivo y horario preferido." |
| `fonda-dona-mirna` | Fonda Doña Mirna | "El menú vivía en fotos de Facebook que nadie actualizaba." | "Menú al día, horarios y cómo llegar — en un link que cabe en la bio." |
| `taller-herrera` | Taller Herrera | "Veinte años de clientes fieles, pero invisible para cualquiera que buscara 'taller cerca de mí'." | "Aparece en Google con sus servicios y las cotizaciones llegan por WhatsApp." |

### 3.7 FAQ (fondo `bone`)

- Eyebrow: `PREGUNTAS`
- H2: **Lo que todos preguntan**
- Acordeón nativo `<details>/<summary>`, sin JS. Seis preguntas:

1. **¿Cuánto tarda?** — "Una landing, dos semanas desde el anticipo. Un sitio del
   plan Negocio, tres. Si los textos y fotos que te toca aportar llegan a tiempo,
   la fecha se cumple: el cronograma va por escrito en la propuesta."
2. **¿Quién escribe los textos?** — "Los trabajamos juntos: tú me cuentas del negocio,
   yo redacto y tú apruebas. No necesitas llegar con nada escrito."
3. **¿Quién pone las fotos?** — "Las tuyas, primero: fotos reales venden más que las
   perfectas. Si no tienes, te digo exactamente cuáles hacen falta y cómo tomarlas
   con el celular. No uso fotos de stock."
4. **¿Y si quiero cambios después de publicar?** — "Los cambios menores — precios,
   horarios, fotos, un texto — entran en el mantenimiento mensual. Algo más grande
   (una sección nueva, una función nueva) te lo cotizo aparte, con precio antes de
   tocar nada."
5. **¿El precio incluye dominio y hosting?** — "El proyecto incluye el dominio el
   primer año. De ahí en adelante, dominio y hosting van dentro de la mensualidad
   de mantenimiento."
6. **¿Cómo se paga?** — "Yappy, ACH o efectivo. 50% para arrancar y 50% cuando el
   sitio está publicado y aprobado por ti."

### 3.8 Cierre (fondo `ink`, hexágono grande y tenue de fondo)

- H2: **Cuéntame de tu negocio.**
- Línea: "Cotizar toma cinco minutos y no te compromete a nada."
- CTA (coral, único en pantalla): **Cotizar por WhatsApp** (origen `cierre`)

---

## 4. Páginas interiores

### /trabajos
- H1: **Trabajos** · intro de una línea: "Tres casos. En cada uno: cuál era el
  problema y qué cambió."
- Grid de las 3 tarjetas (mismo componente del home) + cierre con CTA
  (origen `trabajos`).

### /trabajos/[slug]
Estructura por caso (campos en la collection, §6):
1. Eyebrow con sector y ubicación (`CLÍNICA DENTAL · BELLA VISTA, PANAMÁ`)
2. H1 = nombre del negocio · etiqueta "Proyecto demo"
3. Captura grande en marco de navegador
4. **El problema** — 2–3 frases
5. **Qué hice** — viñetas de entregables (en lenguaje de cliente, sin tecnologías)
6. **El resultado** — 2–3 frases cualitativas; prohibido inventar números
7. Ficha: plan usado · tiempo de entrega
8. CTA: "¿Tu negocio necesita algo así?" → WhatsApp (origen `trabajos`)
9. Navegación anterior/siguiente caso

Copy completo de los tres casos se redacta en los archivos de contenido siguiendo
las líneas de la tabla en §3.6; cada archivo abre con
`# TODO: reemplazar por cliente real`.

### /planes
- H1: **Planes y precios**
- Las 3 tarjetas (mismo componente, versión extendida: viñetas completas).
- Sección **"Qué cubre el mantenimiento"**: hosting, dominio, respaldos, cambios
  menores (con ejemplos concretos), monitoreo de que el sitio esté arriba.
- Sección **"Lo que te toca a ti"** (honestidad operativa): responder mensajes a
  tiempo, aportar fotos e información del negocio, revisar los avances.
- FAQ (las mismas 6 del home, mismo componente).
- Cierre con CTA (origen del plan correspondiente en cada tarjeta).

### /contacto
- H1: **Hablemos de tu negocio.**
- Línea: "Por WhatsApp es más rápido. Si prefieres el formulario, respondo el mismo
  día hábil."
- Bloque WhatsApp primero (CTA coral, origen `contacto`).
- Formulario (§7): nombre*, negocio, correo*, teléfono, "¿qué necesitas?"* (textarea),
  plan de interés (select opcional: Base / Negocio / A medida / No sé todavía).
- `/contacto/gracias`: "Recibido. Te respondo hoy mismo si es día hábil, o el lunes
  a primera hora." + link de WhatsApp por si prefiere no esperar.

---

## 5. Reglas de contenido (resumen ejecutable)

- Primera persona del singular, siempre. Se prohíbe "nosotros".
- Prohibido: "soluciones innovadoras", "siguiente nivel", "pasión", "transformación
  digital", contadores animados, badges de tecnologías, fotos de stock, iconos de
  cohete/bombilla/engranaje, chatbots, popups.
- Ningún resultado numérico inventado en los casos demo.
- Capturas de los demos: se generan de los propios sitios demo construidos como
  parte del proyecto (páginas estáticas simples) o mockups en HTML renderizados y
  capturados — nunca fotos de stock. `TODO` en código en los tres.

---

## 6. Content Collections (Astro 5, `src/content.config.ts`)

Todo el copy vive en contenido/datos, nada hardcodeado en componentes:

- `src/content/trabajos/*.md` — casos (collection `trabajos`)
- `src/content/planes/*.md` — planes (collection `planes`)
- `src/content/faq/*.md` — preguntas (collection `faq`)
- `src/data/site.ts` — constantes tipadas: nombre, dominio, WhatsApp, correo,
  Instagram, mensajes de WhatsApp por origen
- `src/data/home.ts` — copy de hero, problema, qué hago, proceso, cierre
  (objetos tipados con `as const` + tipos exportados)

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const trabajos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trabajos' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),                    // "Clínica Dental Altamira"
      sector: z.string(),                    // "Clínica dental"
      ubicacion: z.string(),                 // "Bella Vista, Panamá"
      problema: z.string().max(140),         // una línea, para la tarjeta
      resultado: z.string().max(140),        // una línea, para la tarjeta
      plan: z.enum(['base', 'negocio', 'a-medida']),
      entrega: z.string(),                   // "2 semanas"
      captura: image(),                      // procesada por astro:assets
      capturaAlt: z.string(),
      esDemo: z.boolean().default(true),     // TODO: false al tener clientes reales
      orden: z.number().int(),
      publicado: z.boolean().default(true),
    }),
});
// El cuerpo del .md lleva: ## El problema / ## Qué hice / ## El resultado

const planes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/planes' }),
  schema: z.object({
    nombre: z.string(),                      // "Base" | "Negocio" | "A medida"
    id: z.enum(['base', 'negocio', 'a-medida']),
    precioDesde: z.number().int().nullable(),// null => "Cotización"
    mantenimiento: z.number().int().nullable(),
    paraQuien: z.string(),
    incluye: z.array(z.string()).min(3),
    entrega: z.string(),
    destacado: z.boolean().default(false),
    ctaTexto: z.string(),
    orden: z.number().int(),
  }),
});
// El cuerpo del .md lleva el detalle extendido que solo se muestra en /planes.

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    pregunta: z.string(),
    orden: z.number().int(),
  }),
});
// El cuerpo del .md es la respuesta.

export const collections = { trabajos, planes, faq };
```

---

## 7. Pages Function — contrato de `functions/api/contacto.ts`

### Request

`POST /api/contacto` — acepta `application/x-www-form-urlencoded` (POST nativo del
`<form>`, camino sin JS) y el mismo cuerpo enviado vía `fetch` (mejora progresiva).

| Campo | Regla server-side |
|---|---|
| `nombre` | requerido, 2–80 chars tras `trim` |
| `negocio` | opcional, ≤ 80 |
| `correo` | requerido, formato email, ≤ 120 |
| `telefono` | opcional, 6–20, dígitos/`+ - ( ) espacio` |
| `mensaje` | requerido, 10–1000 |
| `plan` | opcional, enum `base\|negocio\|a-medida\|no-se` |
| `sitio_web` | **honeypot** — debe llegar vacío |
| `_t` | timestamp de render (hidden); si `ahora - _t < 3s` ⇒ tratar como bot |

### Comportamiento

1. Honeypot lleno o `_t` demasiado rápido → responder **como éxito** (no avisar al bot).
2. Validación falla → ver respuestas abajo.
3. Éxito → email vía **Resend** (`POST https://api.resend.com/emails`):
   - `from: env.CONTACTO_FROM` — mientras no haya dominio verificado en Resend,
     `onboarding@resend.dev` (modo prueba: solo entrega al correo del dueño de la
     cuenta; suficiente porque el destino es `renandiazreyes@gmail.com`).
     `TODO: verificar metalmindstudios.com en Resend y cambiar el from`.
   - `to: env.CONTACTO_TO` (por ahora `renandiazreyes@gmail.com`)
   - `reply_to`: correo del remitente
   - `subject: "Contacto web: {nombre}" + (negocio ? " — {negocio}" : "")`
   - Cuerpo: texto plano con todos los campos + origen (`plan` si vino).
4. Resend falla → 500 / redirect a error; nunca se pierde silenciosamente
   (`console.error` queda en logs de Pages).

### Response

Detección de cliente: si el request trae `Accept: application/json`
(lo agrega el fetch del enhancement) → JSON; si no → redirect (camino sin JS).

| Caso | JSON | Sin JS |
|---|---|---|
| Éxito (y bots simulados) | `200 {"ok":true}` | `303 → /contacto/gracias` |
| Validación | `400 {"ok":false,"errores":{campo:"mensaje"}}` | `303 → /contacto?error=1#formulario` (la página muestra aviso genérico) |
| Error interno | `500 {"ok":false}` | `303 → /contacto?error=2#formulario` |

### Variables de entorno (Cloudflare Pages)

`RESEND_API_KEY` · `CONTACTO_TO` · `CONTACTO_FROM`

### Cliente

Script mínimo de mejora progresiva en `/contacto` (vanilla, ~30 líneas): intercepta
el submit, `fetch`, muestra confirmación/errores inline sin salir de la página,
deshabilita el botón mientras envía. **Justificación de este JS** (el brief pide
justificar cualquier extra): sin él, el POST nativo funciona igual (redirect a
`/contacto/gracias`) — el script solo evita la recarga y permite mensajes de error
por campo. Si prefieres cero JS aquí, se elimina y queda solo el camino nativo.

---

## 8. SEO

- `lang="es-PA"` en `<html>`. Canonical absoluto por página.
- Title pattern: `{Página} — MetalMind Studios` (home:
  `MetalMind Studios — Sitios web para negocios en Panamá`).
- Meta descripciones escritas a mano:
  - **Home:** "Sitios web rápidos y bien hechos para negocios panameños. Precios
    visibles, entrega en 2 semanas y una persona real que te contesta el WhatsApp."
  - **/trabajos:** "Casos de sitios web para negocios locales: el problema que
    tenían y qué cambió con la página nueva."
  - **/planes:** "Planes desde $450 con mantenimiento mensual que incluye hosting,
    dominio y cambios. Precios claros, sin 'consultar'."
  - **/contacto:** "Cotiza tu sitio web por WhatsApp o formulario. Respondo el mismo
    día hábil. Yappy, ACH o efectivo."
  - Cada `/trabajos/[slug]`: descripción manual en el frontmatter del caso.
- OG: imagen social 1200×630 por página (5 estáticas, diseñadas con la marca:
  fondo `ink`, hexágono, título de página en Archivo). `og:locale = es_PA`.
- JSON-LD: `ProfessionalService` (subtipo de LocalBusiness) en home — nombre,
  área servida (Panamá), teléfono +507 6388-8475, URL; `Service` + `Offer` por plan en
  `/planes`; `BreadcrumbList` en casos; `FAQPage` en `/planes` (donde vive el FAQ
  canónico para no duplicar el markup en home).
- `@astrojs/sitemap` + `robots.txt` estático apuntando al sitemap.
- Favicon: `metalmind-favicon.svg` + PNG fallback + `apple-touch-icon`.

---

## 9. Stack y estructura (resumen técnico)

- Astro 5, `output: 'static'`, TypeScript `strict`.
- Tailwind v4 vía `@tailwindcss/vite`; tokens en `@theme` (ver design-plan). Sin
  `tailwind.config.js`.
- Fuentes: `@fontsource-variable/archivo`, `@fontsource-variable/instrument-sans`,
  `@fontsource/ibm-plex-mono` (400/500). Subsets latin, `font-display: swap`,
  preload del woff2 de Archivo (único crítico para el hero).
- JS de cliente — inventario completo (3 scripts vanilla inline, sin framework):
  1. menú móvil (toggle + focus trap básico + `Escape`)
  2. compactación del header al hacer scroll (un `IntersectionObserver` de 10 líneas)
  3. mejora progresiva del formulario (solo en `/contacto`, ver §7)
  Nada más. La animación del hexágono y el acordeón son CSS/HTML nativos.
- Imágenes: `astro:assets`, AVIF + WebP + fallback, `loading="lazy"` +
  `decoding="async"` en todo salvo el hero (que es SVG inline, sin peso de imagen).
- Analítica: snippet de Cloudflare Web Analytics (beacon, sin cookies). Es el único
  script de terceros; va con `defer`.
- Deploy: Cloudflare Pages, build `astro build`, dominio `metalmindstudios.com`.

```
src/
  components/   Header, Footer, BarraMovil, Boton, Tarjeta*, MarcoNavegador,
                EjeIsometrico, Hexagono, Seo, ...
  layouts/      Base.astro
  pages/        index, trabajos/index, trabajos/[slug], planes, contacto,
                contacto/gracias, 404
  content/      trabajos/ planes/ faq/
  data/         site.ts home.ts
  styles/       global.css (tokens @theme + reset + utilidades propias)
  lib/          whatsapp.ts jsonld.ts
functions/
  api/contacto.ts
public/
  brand/ robots.txt og/
```

---

## 10. Checklist de aceptación

*Verificado el 2026-08-19 sobre el build local (Lighthouse CLI móvil + wrangler
pages dev + smoke tests con Chromium). Lo no marcado requiere el sitio publicado.*

**Rendimiento y calidad (sin anunciarlo en el sitio):**
- [x] Lighthouse ≥ 95 en las cuatro categorías, en móvil: `/` 100/100/100/100, `/planes` 100/100/100/100, caso 99/100/100/100, `/contacto` 100/100/100/100. CLS 0.
- [x] Cero JS de cliente fuera del inventario del §9 (dist sin chunks; solo scripts inline vanilla).
- [x] Fuentes autohospedadas con preload de las críticas; ninguna petición a CDN.
- [x] Imágenes AVIF/WebP (`<Picture>`) con dimensiones explícitas.

**Accesibilidad:**
- [x] Contraste AA en todos los pares (se agregaron `graphite-deep` y `coral-texto` para claro; etiqueta "Más pedido" en ink).
- [x] Foco de teclado visible (outline 2px `currentColor`, verificado en el CTA).
- [x] Navegable con teclado; menú móvil abre/cierra con Escape (smoke test).
- [x] `prefers-reduced-motion`: hexágono estático dibujado (dashoffset 0, smoke test).
- [x] Un solo `h1` por página; heading-order limpio (Lighthouse a11y 100 en las 4 páginas).
- [x] Skip link "Saltar al contenido".

**Layout:**
- [x] Correcto a 360px (screenshots de QA de home, planes, caso y contacto).
- [x] Barra inferior móvil no tapa contenido (`pb-24` en `main`) y se oculta mientras el CTA del hero está en pantalla.
- [x] Un solo CTA coral por pantalla (en pricing, solo el plan destacado lleva coral).

**Contenido:**
- [x] Grep limpio en dist: `nosotros|innovador|siguiente nivel|pasión|transformación digital` — 0 resultados; "astro" solo en atributos técnicos del build.
- [x] Los tres casos con `TODO: reemplazar por cliente real`, `esDemo: true` y etiqueta visible "Proyecto demo".
- [x] Ningún resultado numérico en los casos.
- [x] Precios visibles en home y /planes; A medida dice "cotización cerrada".

**Funcional:**
- [x] Formulario contra wrangler pages dev: honeypot → 303 gracias (éxito falso), inválido+JSON → 400 con errores por campo, válido+JSON sin API key → 500, válido sin JS → 303 `?error=2#aviso`.
- [x] Links `wa.me` generados desde un único helper (`waLink`) con mensaje por origen.
- [x] Sitemap y robots.txt en dist; JSON-LD emitido (ProfessionalService, Service+Offer, FAQPage, BreadcrumbList). Pendiente pasarlo por Rich Results Test ya publicado.
- [x] OG 1200×630 por página, generado con la marca.
- [x] 404 útil con CTA al inicio.

**Pre-lanzamiento (manual, con el dueño):**
- [x] Precios confirmados. WhatsApp +507 6388-8475. Correo temporal renandiazreyes@gmail.com.
- [ ] Comprar dominio metalmindstudios.com; cambiar correo público y from de Resend.
- [ ] Email de prueba del formulario recibido (RESEND_API_KEY configurada en Pages).
- [x] Coral #F04E68 aplicado en tokens y SVGs.
- [ ] Lockups re-exportados con texto en curvas.
- [ ] Confirmar handle de Instagram y activar el link del footer.
