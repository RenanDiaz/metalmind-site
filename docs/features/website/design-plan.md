# Plan de diseño — MetalMind Studios

> Estado: **borrador para aprobación**. Compañero de `spec.md`; ahí viven el copy y
> los contratos. Aquí: tokens finales, escala tipográfica, wireframes y la firma
> visual. Al final está la auto-revisión contra el brief con lo que cambié.

---

## 1. Tokens finales (`@theme` en `src/styles/global.css`)

```css
@theme {
  /* Color — paleta del brief */
  --color-ink:          #191412;  /* fondo base */
  --color-ink-raised:   #221B18;  /* tarjetas y superficies sobre ink */
  --color-bone:         #EAE6E2;  /* texto sobre oscuro; fondo de secciones claras */
  --color-steel:        #CFCBC7;  /* trazos, bordes, texto secundario sobre ink */
  --color-graphite:     #8A8481;  /* terciario sobre ink; aristas "traseras" */
  --color-coral:        #F04E68;  /* acento único — SVGs de marca alineados a este valor */

  /* Derivados (necesarios, no decorativos) */
  --color-graphite-deep:#5E5852;  /* terciario sobre bone — graphite puro falla AA en claro */
  --color-coral-deep:   #D93A55;  /* hover/active del CTA */
  --color-coral-texto:  #B02540;  /* texto coral sobre bone (coral y coral-deep fallan AA en claro) */
  --color-bone-raised:  #F2EFEC;  /* tarjetas sobre bone (un paso más claro, sin sombras) */
  --color-line-dark:    #3A322E;  /* borde 1px sobre ink (steel al ~20% aplanado) */
  --color-line-light:   #D8D3CE;  /* borde 1px sobre bone */

  /* Tipografía */
  --font-display: 'Archivo Variable', 'Archivo', system-ui, sans-serif;
  --font-body:    'Instrument Sans Variable', 'Instrument Sans', system-ui, sans-serif;
  --font-mono:    'IBM Plex Mono', ui-monospace, monospace;

  /* Radios: la regla es 0 o 4px, nada más */
  --radius-none: 0;
  --radius-sm:   4px;   /* inputs y capturas; los botones van en 0 */

  /* Geometría 30°/60° (ver §4) */
  --cut-x: 14px;        /* esquina cortada: cateto horizontal */
  --cut-y: 24.25px;     /* 14 × √3 → arista a 60° de la horizontal */
}
```

Reglas de aplicación de color (las del brief, operacionalizadas):

- **Coral**: un CTA primario por pantalla, los nodos del eje/hexágono, el subrayado
  del link activo del header y el `focus ring`. Nunca como fondo de sección, nunca
  en texto corrido sobre `bone` (2.8:1 — falla AA; sobre `ink` da 5.2:1 y sí puede
  ser texto).
- **Texto sobre `ink`**: principal `bone`, secundario `steel`, terciario `graphite`
  (4.9:1, pasa AA — no usarlo por debajo de 12px).
- **Texto sobre `bone`**: principal `ink`, secundario/terciario `graphite-deep`
  (5.7:1). `graphite` puro sobre `bone` queda prohibido (2.9:1).
- **Botón primario**: fondo `coral`, texto `ink` (5.2:1, pasa AA). Hover:
  `coral-deep`, mismo texto.
- Cero degradados, cero sombras difusas, cero blur. La elevación se hace con
  `ink-raised`/`bone-raised` + borde de 1px.

## 2. Escala tipográfica (tamaños concretos)

| Token | Fuente/peso | Tamaño | line-height | tracking | Uso |
|---|---|---|---|---|---|
| `display-1` | Archivo 700 | `clamp(2.375rem, 1.1rem + 5.7vw, 4.25rem)` (38→68px) | 1.03 | −0.02em | H1 del hero |
| `display-2` | Archivo 650 | `clamp(1.75rem, 1.15rem + 2.7vw, 2.75rem)` (28→44px) | 1.08 | −0.02em | H2 de sección |
| `display-3` | Archivo 600 | 1.375rem (22px) | 1.25 | −0.01em | H3, nombres de plan/caso |
| `precio` | Archivo 700 | 2.25rem (36px) | 1 | −0.02em | cifras de planes |
| `body-lg` | Instrument Sans 400 | 1.125rem (18px) | 1.6 | 0 | subtítulo del hero, intros |
| `body` | Instrument Sans 400 | 1rem (16px) | 1.6 | 0 | texto corrido |
| `body-strong` | Instrument Sans 600 | 1rem | 1.5 | 0 | afirmaciones del "problema", labels |
| `small` | Instrument Sans 400 | 0.875rem (14px) | 1.5 | 0 | notas, footer |
| `eyebrow` | IBM Plex Mono 500 | 0.75rem (12px) | 1 | +0.18em, uppercase | eyebrows, etiquetas, numeración |

Ritmo: grid base de 4px. Padding vertical de sección: 72px móvil / 128px desktop.
Contenedor: max 1120px, gutter 20px móvil / 32px tablet+. Medida de texto corrido:
máx. ~65ch.

## 3. Componentes base (comportamiento visual)

- **Botón primario**: coral, texto `ink` 600, radio 0, padding 14px 24px. Hover
  `coral-deep`; active baja 1px; focus `outline: 2px solid` (coral sobre claro,
  `bone` sobre coral) con offset 2px.
- **Botón/link secundario**: texto del color de la sección con subrayado de 1px en
  `coral` a 4px de offset; hover engrosa a 2px. Sin caja.
- **Tarjeta**: fondo `-raised`, borde 1px, radio 0, **esquina superior derecha
  cortada a 60°** (`clip-path` con `--cut-x/--cut-y`). La tarjeta destacada del plan
  Negocio: mismo tamaño que las demás, borde 1px `ink`, un nodo coral de 8px en el
  vértice del corte y etiqueta eyebrow "MÁS PEDIDO". No se escala ni cambia de fondo.
- **Marco de navegador** (capturas): barra superior de 28px en el color `-raised`,
  tres puntos de 6px en `steel`, borde 1px, radio 4px. Nada más — ni URL falsa ni
  botones.
- **Acordeón FAQ**: `<details>` con borde inferior 1px; el marcador es un `+` en
  mono que rota a `×` (transición 150ms, anulada con reduced-motion).
- **Header**: 72px → 56px al hacer scroll (transición 200ms de `height` y del
  tamaño del lockup). Fondo `ink` sólido, borde inferior 1px `line-dark`. Link
  activo: subrayado coral 2px.
- **Separador de sección "arista"** (transición ink↔bone): no es una diagonal a lo
  ancho (a 30° sobre 1440px mediría ~830px de alto — imposible); es una línea de
  1px que corre horizontal, baja un tramo corto a 30° (168px de ancho × 97px de
  alto) y sigue horizontal en el nivel inferior — exactamente el perfil de una
  arista del cubo. SVG inline, `preserveAspectRatio` fijo para que el ángulo nunca
  se deforme.

## 4. Geometría 30°/60° — inventario cerrado

Toda diagonal del sitio sale de esta lista; cualquier otra es un bug:

1. **Hexágono del hero y del cierre** — el propio logo (aristas a 30° de la
   horizontal, verticales a 90°).
2. **Eje isométrico del proceso** (la firma, ver §6).
3. **Separadores "arista"** entre secciones ink/bone — tramo a 30°.
4. **Esquinas cortadas** de tarjetas y capturas — corte a 60°
   (`--cut-x: 14px` / `--cut-y: 24.25px = 14·√3`).

Nada de diagonales a 45°, chevrons, ni flechas rotadas. Las flechas de los links
son `→` tipográficas, horizontales.

## 5. Wireframes ASCII — home

### Móvil (360px)

```
┌──────────────────────────────┐
│ [lockup]                  ≡  │ header sticky, ink
├──────────────────────────────┤
│ DESARROLLO WEB ·             │ eyebrow mono
│ DESDE PANAMÁ                 │
│                              │
│ Tu negocio                   │ display-1, bone
│ existe.                      │
│ Tu sitio web, no.            │
│                              │
│ Hago sitios web rápidos y    │ body-lg, steel
│ bien hechos para negocios    │
│ que ya funcionan...          │
│                              │
│ ┌──────────────────────────┐ │
│ │  Cotizar por WhatsApp    │ │ CTA coral (único)
│ └──────────────────────────┘ │
│  Ver trabajos                │ link subrayado coral
│         ⬡                    │ hexágono tenue, se dibuja
│        (nodo)                │ detrás/debajo del texto
├─── (sigue fondo ink) ────────┤
│ EL PROBLEMA                  │
│ Esto ya te está              │ display-2
│ costando clientes.           │
│                              │
│ 01                           │ mono, graphite
│ Tus clientes te buscan en    │ body-strong, bone
│ Google y encuentran a tu     │
│ competencia.                 │
│ La llamada se la lleva...    │ body, steel
│                              │
│ 02 ...                       │
│ 03 ...                       │
├──── separador "arista" ──────┤ 1px, baja a 30°
│░░░░░░░░ fondo BONE ░░░░░░░░░░│
│ QUÉ HAGO                     │
│ Diseño, desarrollo y         │ display-2, ink
│ mantenimiento. ...           │
│ 01 · Diseño                  │ columnas apiladas
│ ...                          │
│ 02 · Desarrollo ...          │
│ 03 · Mantenimiento ...       │
├──────────────────────────────┤
│ PLANES  (sigue bone)         │
│ Precios claros desde el      │
│ principio.                   │
│ ┌───────────────────────╲──┐ │ esquina cortada 60°
│ │ BASE                     │ │
│ │ $450 desde               │ │ precio, Archivo 700
│ │ + $25/mes mantenimiento  │ │
│ │ · viñetas...             │ │
│ │ [ Cotizar este plan ]    │ │ CTA coral
│ └──────────────────────────┘ │
│ ┌─── MÁS PEDIDO ────────●──┐ │ nodo coral en el corte
│ │ NEGOCIO  $900 ...        │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ A MEDIDA  Cotización ... │ │
│ └──────────────────────────┘ │
│ ¿Qué es la mensualidad? ...  │ bloque mantenimiento
├──── separador "arista" ──────┤
│▓▓▓▓▓▓▓▓ fondo INK ▓▓▓▓▓▓▓▓▓▓│
│ PROCESO                      │
│ De la primera conversación   │
│ a publicado: 2 a 3 semanas.  │
│                              │
│  ●  Conversamos              │ eje: línea 1px graphite
│   ╲   30 min, sin costo      │ que baja en zigzag a 30°,
│    ╲  (día 1)                │ nodo coral por paso
│     ●  Propuesta y anticipo  │
│    ╱   (días 2–3)            │
│   ╱                          │
│  ●  Construyo y revisas      │
│   ╲   (semanas 1–2)          │
│    ●  Publicamos (1 día)     │
├──── separador "arista" ──────┤
│░░░░░░░░ fondo BONE ░░░░░░░░░░│
│ TRABAJOS                     │
│ ┌──────────────────────────┐ │
│ │ ○○○  [marco navegador]   │ │ captura
│ │  (captura del demo)      │ │
│ └──────────────────────────┘ │
│ Clínica Dental Altamira      │ display-3
│ Problema: ...  →             │ una línea c/u
│ (× 3, apiladas)              │
│ Ver los tres casos →         │
├──────────────────────────────┤
│ PREGUNTAS  (sigue bone)      │
│ ┌ ¿Cuánto tarda?         + ┐ │ <details> nativos
│ ├ ¿Quién escribe...?     + ┤ │
│ └ (× 6)                    ┘ │
├──── separador "arista" ──────┤
│▓▓▓▓▓▓▓▓ fondo INK ▓▓▓▓▓▓▓▓▓▓│
│        ⬡ (grande, tenue)     │ hexágono de fondo, trazo
│ Cuéntame de tu negocio.      │ display-2
│ Cotizar toma cinco minutos   │
│ y no te compromete a nada.   │
│ ┌──────────────────────────┐ │
│ │  Cotizar por WhatsApp    │ │
│ └──────────────────────────┘ │
├──────────────────────────────┤
│ [lockup]  WhatsApp · correo  │ footer
│ · Instagram                  │
│ Desde Panamá · 2026          │
├══════════════════════════════┤
│ ▐ Cotizar por WhatsApp ▌     │ barra fija inferior, coral
└──────────────────────────────┘
```

### Desktop (≥1024px, contenedor 1120px)

```
┌────────────────────────────────────────────────────────────────────┐
│ [lockup]              Trabajos   Planes   Contacto      [Cotizar]  │ sticky
├────────────────────────────────────────────────────────────────────┤
│ DESARROLLO WEB · DESDE PANAMÁ                                      │
│                                                                    │
│ Tu negocio existe.                              ⬡                  │
│ Tu sitio web, no.                            (hexágono 1.5px       │
│                                               se dibuja, nodo      │
│ Hago sitios web rápidos y bien                coral al final)      │
│ hechos para negocios que ya funcionan...                           │
│                                                                    │
│ [ Cotizar por WhatsApp ]   Ver trabajos                            │
├────────────────────────────────────────────────────────────────────┤
│ EL PROBLEMA                                                        │
│ Esto ya te está costando clientes.                                 │
│                                                                    │
│ 01                    02                    03                     │
│ Tus clientes te       Instagram no es      El sitio que te        │
│ buscan en Google...   un sitio web...      hicieron carga en 8s...│
├──────────────────── separador arista (baja a 30°) ─────────────────┤
│░░ BONE ░░  QUÉ HAGO                                                │
│ Diseño, desarrollo y mantenimiento. Los tres, una persona.         │
│ 01 · Diseño           02 · Desarrollo       03 · Mantenimiento     │
│ ...                   ...                   ...                    │
│                                                                    │
│ PLANES — Precios claros desde el principio.                        │
│ ┌────────────╲─┐  ┌─ MÁS PEDIDO ─●┐  ┌────────────╲─┐             │
│ │ BASE         │  │ NEGOCIO       │  │ A MEDIDA     │             │
│ │ desde $450   │  │ desde $900    │  │ Cotización   │             │
│ │ +$25/mes     │  │ +$40/mes      │  │ cerrada      │             │
│ │ · · ·        │  │ · · ·         │  │ · · ·        │             │
│ │ [Cotizar]    │  │ [Cotizar]     │  │ [Contarme…]  │             │ 1 CTA coral
│ └──────────────┘  └───────────────┘  └──────────────┘             │ por tarjeta*
│ ¿Qué es la mensualidad? ...                                        │
├──────────────────── separador arista ──────────────────────────────┤
│▓▓ INK ▓▓  PROCESO — De la primera conversación a publicado.        │
│                                                                    │
│   ●─ Conversamos (día 1)                                           │
│    ╲                                                               │
│     ●─ Propuesta y anticipo (días 2–3)          [eje 1px graphite  │
│      ╲                                           zigzag a 30°,     │
│       ●─ Construyo y revisas (sem. 1–2)          nodos coral]      │
│        ╲                                                           │
│         ●─ Publicamos (1 día)                                      │
├──────────────────── separador arista ──────────────────────────────┤
│░░ BONE ░░  TRABAJOS                                                │
│ ┌ ○○○ ────────┐   ┌ ○○○ ────────┐   ┌ ○○○ ────────┐               │
│ │  captura    │   │  captura    │   │  captura    │               │
│ └─────────────┘   └─────────────┘   └─────────────┘               │
│ Clínica Dental…   Fonda Doña…       Taller Herrera                 │
│ problema/result…  …                 …                              │
│                                                                    │
│ PREGUNTAS — acordeón a un ancho de ~720px, centrado a la izquierda │
├──────────────────── separador arista ──────────────────────────────┤
│▓▓ INK ▓▓            ⬡ (hexágono grande, trazo tenue, de fondo)     │
│            Cuéntame de tu negocio.                                 │
│            Cotizar toma cinco minutos y no te compromete a nada.   │
│                    [ Cotizar por WhatsApp ]                        │
├────────────────────────────────────────────────────────────────────┤
│ [lockup]        wa · correo · instagram     Desde Panamá · 2026    │
└────────────────────────────────────────────────────────────────────┘
```

\* Nota sobre "un CTA coral por pantalla": en la sección de planes hay tres botones
de tarjeta visibles a la vez en desktop. Para respetar la regla, solo el del plan
destacado (Negocio) es coral; Base y A medida usan el estilo secundario (borde 1px
`ink`, texto `ink`). En móvil, apiladas, cada tarjeta ocupa su pantalla y el coral
del destacado no compite.

## 6. El elemento firma (una línea)

**El cubo del logo, desdoblado en el tiempo:** una línea de 1px en `graphite` que
baja en zigzag a 30° por la sección de proceso, con un nodo coral en cada paso —
la única sección donde el sitio se permite audacia; todo lo demás queda callado.

Implementación: SVG inline generado con las coordenadas exactas (tramos a 30° de
la horizontal, verticales donde haga falta en móvil), `vector-effect:
non-scaling-stroke` para que el trazo sea 1px siempre. Estático — la animación del
sitio se gasta una sola vez, en el hexágono del hero.

## 7. Motion (inventario completo)

| Qué | Cómo | reduced-motion |
|---|---|---|
| Hexágono del hero se dibuja | CSS `stroke-dashoffset`, ~700ms `ease-out`, nodo coral aparece al final (150ms) | estático, visible desde el inicio |
| Header se compacta | transición 200ms | sin transición (salta) |
| Hover de botones/links | 120–150ms color/underline | sin transición |
| Marcador del acordeón `+`→`×` | rotación 150ms | sin transición |

Nada más se mueve. Sin parallax, sin fade-in por scroll, sin contadores.

---

## 8. Auto-revisión contra el brief — qué cambié y por qué

Revisé el borrador de este plan preguntando: "¿qué parte produciría igual para
cualquier landing de agencia?" Esto es lo que cambié:

1. **Hero centrado → alineado a la izquierda con el hexágono a la derecha.** El
   primer borrador tenía el clásico hero centrado con el visual arriba. Centrado es
   el default de toda landing; la marca es "ingeniería silenciosa" y el texto a la
   izquierda con el objeto técnico al lado se lee como plano de taller, no como
   póster.
2. **Iconos fuera.** Las columnas de "Qué hago" llevaban iconos lineales
   (lápiz/código/llave). Cualquier set de iconos ahí termina siendo genérico —
   exactamente lo que el brief prohíbe. Los reemplacé por la numeración en IBM Plex
   Mono (01/02/03), que además conecta con la numeración del proceso.
3. **Plan destacado sin inflarse.** El borrador escalaba la tarjeta de Negocio y le
   ponía un velo coral de fondo. Coral en bloque grande está prohibido y la tarjeta
   agrandada es el cliché #1 de pricing. Ahora: mismo tamaño, borde `ink`, un nodo
   coral de 8px en el vértice cortado y la etiqueta mono "MÁS PEDIDO". El nodo *es*
   el lenguaje del logo señalando "aquí" — más on-brand y más quieto.
4. **Tres CTAs coral en pricing → uno.** Con un botón coral por tarjeta, la vista de
   desktop violaba la regla de "un coral por pantalla". Solo el plan destacado lleva
   coral; los otros dos usan el botón secundario.
5. **Separadores diagonales honestos.** El borrador decía "secciones con corte
   diagonal a 30°" a lo ancho. Hice la trigonometría: a 30° sobre 1440px el corte
   mediría ~830px de alto. En vez de bajar el ángulo a uno arbitrario (rompería la
   regla), el separador es una **arista**: horizontal → tramo corto a 30° → horizontal,
   el perfil exacto de una arista del cubo. La regla se respeta y el elemento deja
   de ser el "diagonal divider" de plantilla.
6. **`graphite-deep` añadido.** `graphite` sobre `bone` da 2.9:1 — falla AA. En vez
   de "usarlo con cuidado" (que es como se cuelan los fallos), agregué un token
   explícito para terciario sobre claro (5.7:1) y prohibí `graphite` sobre `bone`.
7. **Radio de botones 8px → 0.** El borrador heredaba el radio "amable" por defecto.
   El wordmark es squarish y la regla es ≤4px; los botones en 0 con la esquina
   cortada solo en tarjetas mantiene la geometría como firma, no como decoración.
8. **Animaciones por scroll eliminadas.** Había fade-ins al entrar cada sección.
   Es el tic de agencia más reconocible y además pediría JS (IntersectionObserver)
   que el brief no autoriza. El presupuesto de motion se gasta una vez: el hexágono
   del hero.

Lo que se parece a una landing "normal" y se queda así a propósito: header con
logo-links-botón, pricing en tres tarjetas, FAQ en acordeón. El usuario objetivo
(dueño de negocio, 35–60, en el celular) necesita patrones reconocibles para
orientarse; la diferenciación va en el tono del copy, la geometría y la restricción
de color, no en reinventar la navegación.
