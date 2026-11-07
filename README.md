# MetalMind Studios — sitio web

Sitio de venta de MetalMind Studios, un estudio de desarrollo web unipersonal
(Panamá, trabajo remoto con negocios de habla hispana). El trabajo de la página:
convertir una visita en una conversación de WhatsApp.

- Producción: <https://metalmindstudios.com> (mientras el dominio no esté activo,
  la URL `workers.dev` del deploy)
- Reglas de marca, paleta, tipografía y lo que no se hace: [`CLAUDE.md`](./CLAUDE.md)
- Especificación y plan de diseño: [`docs/features/website/spec.md`](./docs/features/website/spec.md)
  y [`docs/features/website/design-plan.md`](./docs/features/website/design-plan.md)

## Stack

- [Astro 5](https://astro.build) con `output: 'static'` y TypeScript estricto.
- Tailwind v4 vía `@tailwindcss/vite`; los tokens viven en `@theme` dentro de
  `src/styles/global.css` (no hay `tailwind.config.js`).
- Tipografías autohospedadas con `@fontsource` (Archivo, Instrument Sans, IBM Plex Mono).
- Formulario de contacto: Worker de Cloudflare (`worker/`) + [Resend](https://resend.com).
- Deploy: Cloudflare Workers con static assets.

## Requisitos

- Node.js 20 o superior (Astro 5 y Wrangler 4 lo piden).
- npm (el repo usa `package-lock.json`).

## Empezar

```bash
npm install
npm run dev        # http://localhost:4321
```

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo de Astro. |
| `npm run build` | Compila el sitio estático a `dist/`. |
| `npm run preview` | Sirve `dist/` con el preview de Astro (sin el Worker). |
| `npm run check` | `astro check`: tipos de TypeScript, Astro y Content Collections. |
| `npm run og` | Regenera las imágenes OG de `public/og/` (ver abajo). |
| `npm run cf:dev` | Compila y corre el sitio **con** el Worker en local (`wrangler dev`); úsalo para probar el formulario. |
| `npm run cf:check` | Compila y valida el deploy sin publicar (`wrangler deploy --dry-run`). |
| `npm run deploy` | Compila y publica con Wrangler. |

## Estructura

```
src/
  content/        Content Collections: trabajos/, planes/, faq/ (un .md por entrada)
  data/           Datos tipados: site.ts (contacto, URL), home.ts, paginas.ts
  components/     Componentes Astro (Hexagono, EjeProceso, SeparadorArista, …)
  layouts/        Base.astro (head, SEO, JSON-LD, analítica)
  pages/          Rutas: index, planes, trabajos/, contacto, 404, robots.txt
  styles/         global.css (tokens, tipografía, utilidades)
  assets/         Capturas de trabajos
worker/           Entry del Worker: index.ts (ruteo) y contacto.ts (POST /api/contacto)
scripts/og.mjs    Generador de imágenes OG
public/           Marca (SVG) e imágenes OG
docs/features/website/   spec.md y design-plan.md
wrangler.jsonc    Config del deploy
```

**Todo el copy vive en `src/content/` y `src/data/`**, nunca hardcodeado en
componentes. Para cambiar un texto, un plan, una pregunta frecuente o un trabajo,
edita ahí.

## Variables de entorno

Ver `.env.example`.

| Variable | Dónde | Para qué |
|---|---|---|
| `PUBLIC_SITE_URL` | Build (Cloudflare) | URL base de `og:image`, canonical y sitemap. Hoy debe ser la URL real del deploy (`workers.dev`); si no, WhatsApp no puede descargar la imagen de la vista previa. Se elimina al activar el dominio. |
| `PUBLIC_CF_BEACON_TOKEN` | Build | Token de Cloudflare Web Analytics (sin cookies). Opcional. |
| `RESEND_API_KEY` | Worker (secreto) | Envío del formulario. Obligatoria. |
| `CONTACTO_TO` | Worker | Destino de los mensajes del formulario. Opcional (tiene valor por defecto). |
| `CONTACTO_FROM` | Worker | Remitente. Opcional; con dominio verificado en Resend, usar `hola@metalmindstudios.com`. |

Las variables del Worker se configuran en el dashboard de Cloudflare
(Settings → Variables and Secrets), no hacen falta para el build.
Para probar el formulario en local con `npm run cf:dev`, ponlas en un `.dev.vars`
(ignorado por git) en la raíz.

## Imágenes OG

Las de `public/og/*.png` (1200×630) **no se editan a mano**: `npm run og` las
genera con Chromium y las mismas fuentes y geometría del sitio. Si cambia el
título o el eyebrow de una página, se actualiza la tarjeta correspondiente en
`scripts/og.mjs` y se vuelve a correr el script. Requiere un Chromium disponible
para `playwright-core`.

## Deploy

Cloudflare Workers Builds compila el repo en cada push y lee `wrangler.jsonc`:

- `assets.directory = ./dist`: el sitio estático se sirve primero.
- `run_worker_first: ["/api/*"]`: el Worker solo responde `POST /api/contacto`.
- `name` debe coincidir con el nombre del Worker en el dashboard; si no, se
  publica un Worker distinto.

Los comandos del dashboard pueden quedar en `npx wrangler deploy` y
`npx wrangler versions upload`, sin argumentos.

## Convenciones

- Colores solo de la paleta de `CLAUDE.md`; coral escaso (un CTA primario por pantalla).
- Diagonales solo a 30°/60° (hexágono, eje del proceso, separadores arista, esquinas cortadas).
- Voz en primera persona del singular, nunca "nosotros"; el público se define por
  tipo de negocio, nunca por país.
- JS de cliente: inventario cerrado (menú móvil, header, barra móvil, mejora del formulario).
- Piso de calidad: Lighthouse ≥95 en las cuatro categorías en móvil, contraste AA,
  foco visible, teclado, `prefers-reduced-motion`, correcto desde 360px.

## Pendientes

Los `TODO` conocidos (dominio, `correo`, analítica, lockups en curvas, portafolio)
están listados al final de [`CLAUDE.md`](./CLAUDE.md).
