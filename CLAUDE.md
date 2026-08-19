# MetalMind Studios — sitio web

Sitio de venta de un estudio de desarrollo web unipersonal en Panamá. El trabajo
de la página: convertir una visita en una conversación de WhatsApp. Especificación
completa en `docs/features/website/spec.md` y `docs/features/website/design-plan.md`.

## Stack

- Astro 5 (`output: 'static'`), TypeScript strict, Tailwind v4 vía `@tailwindcss/vite`
  (tokens en `@theme` dentro de `src/styles/global.css`; **no hay** `tailwind.config.js`).
- Contenido en Content Collections (`src/content/{trabajos,planes,faq}`) y datos
  tipados en `src/data/`. **Cero copy hardcodeado en componentes.**
- Formulario → Cloudflare Pages Function (`functions/api/contacto.ts`) + Resend.
- Deploy: Cloudflare Pages, dominio `metalmindstudios.com`.
- JS de cliente permitido (inventario cerrado): menú móvil, compactación del header,
  ocultar/mostrar barra móvil, mejora progresiva del formulario. Nada más; cualquier
  isla nueva se justifica antes.

## Paleta (no inventar colores)

| Token | Hex | Uso |
|---|---|---|
| `ink` | `#191412` | fondo base |
| `ink-raised` | `#221B18` | tarjetas sobre ink |
| `bone` | `#EAE6E2` | texto sobre oscuro; fondo de secciones claras |
| `steel` | `#CFCBC7` | trazos, bordes, secundario sobre ink |
| `graphite` | `#8A8481` | terciario sobre ink — **prohibido sobre bone** (falla AA) |
| `coral` | `#F04E68` | acento único |
| `graphite-deep` | `#5E5852` | terciario sobre bone (derivado, por AA) |
| `coral-deep` | `#D93A55` | hover del CTA |
| `coral-texto` | `#B02540` | texto coral sobre bone (coral/coral-deep fallan AA en claro) |
| `bone-raised` / `line-dark` / `line-light` | ver global.css | superficies y bordes 1px |

Reglas de color:
- **Coral = el nodo del logo: escaso y significa "aquí".** Un CTA primario por
  pantalla. Nunca en bloques grandes, degradados ni texto corrido sobre bone.
- Sin degradados, sin sombras difusas, sin glassmorphism. Elevación = superficie
  `-raised` + borde 1px.
- El sitio alterna secciones `ink` y `bone`; precios y portafolio van en claro.

## Tipografía

- Display: **Archivo** (variable, 600–700, `letter-spacing: -0.02em`).
- Cuerpo: **Instrument Sans**, 16–18px, `line-height: 1.6`.
- Utilitaria: **IBM Plex Mono** 12px uppercase `letter-spacing: 0.18em`
  (clase `.eyebrow`) — viene del "S T U D I O S" del lockup.
- Autohospedadas con `@fontsource`; **nunca** CDN de Google.
- Escala completa en `design-plan.md` §2 (clases `.display-1/2/3`, `.precio`).

## La regla de los 30°/60°

Las aristas del hexágono del logo están a 30° y 60° de la horizontal (y hay
verticales). **Toda diagonal del sitio sale de este inventario cerrado:**

1. El hexágono del hero y del cierre (`Hexagono.astro`).
2. El eje isométrico del proceso (`EjeProceso.astro`) — la firma del sitio.
3. Los separadores "arista" entre secciones (`SeparadorArista.astro`) — tramo a 30°.
4. Las esquinas cortadas de tarjetas (`.corner-cut`) — corte a 60° (`--cut-x`/`--cut-y`, dy = dx·√3).

Nada de diagonales a 45°, chevrons ni flechas rotadas (las flechas son `→`
tipográficas). Radios de esquina: 0 o 4px (`rounded-sm`), nada más.

## Qué NO hacer (del brief, no negociable)

- Nada de "soluciones innovadoras", "siguiente nivel", "pasión por la tecnología",
  "transformación digital".
- Nada de fotos de stock (gente sonriendo, laptops en escritorios de madera).
- Nada de iconos genéricos (cohete, bombilla, engranaje). Se numera con mono (01/02/03).
- Sin contadores animados de clientes/proyectos.
- Sin chatbot, popup de newsletter ni "🔥 3 personas viendo esto".
- Sin badges de tecnologías. **La palabra "Astro" no aparece en el sitio renderizado.**
- **Nunca "nosotros": primera persona del singular.** Es una persona y es parte del ángulo.
- Los casos demo no llevan resultados numéricos inventados; están marcados
  `esDemo: true`, con etiqueta visible "Proyecto demo" y `TODO: reemplazar por
  cliente real`.

## Piso de calidad (sin anunciarlo en el sitio)

Lighthouse ≥95 ×4 en móvil · contraste AA · foco visible (`:focus-visible` con
`currentColor`) · navegable con teclado · `prefers-reduced-motion` respetado (el
estado base de toda animación es el estado final) · correcto desde 360px.

## Motion

Inventario cerrado: el hexágono del hero se dibuja una vez al cargar (~700ms, CSS);
hovers de 120–150ms; el acordeón rota su `+`. Nada más se mueve — sin fade-ins por
scroll, sin parallax.

## Pendientes conocidos (TODOs en código)

- Comprar dominio → cambiar `correo` en `src/data/site.ts` y `CONTACTO_FROM`
  (Resend con dominio verificado) en `functions/api/contacto.ts`.
- Confirmar handle de Instagram → activar link en `Footer.astro`.
- Re-exportar lockups SVG con texto en curvas (hoy el header usa `Lockup.astro` en HTML).
- Configurar `PUBLIC_CF_BEACON_TOKEN` (Cloudflare Web Analytics) en Pages.
- Reemplazar los tres casos demo por clientes reales.
