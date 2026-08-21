/**
 * Genera las imágenes OG (1200×630) de public/og/ desde una sola fuente.
 *
 * Antes se generaban a mano y no quedaba con qué rehacerlas cuando cambiaba el
 * copy. Ahora: `node scripts/og.mjs`.
 *
 * Reglas de marca que aplica (CLAUDE.md): fondo ink, un solo acento coral (el
 * nodo del hexágono), tipografía Archivo/IBM Plex Mono autohospedada, aristas
 * del hexágono a 30°/60°, sin degradados ni sombras.
 */
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fuente = (p) => `file://${resolve(raiz, 'node_modules', p)}`;

const ARCHIVO = fuente('@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2');
const PLEX = fuente('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2');

/** Una tarjeta por página del sitio. El eyebrow y el título son el copy real. */
const TARJETAS = [
  { archivo: 'home.png', eyebrow: 'Desarrollo web · Desde Panamá', titulo: ['Tu negocio existe.', 'Tu sitio web, no.'] },
  { archivo: 'planes.png', eyebrow: 'Planes y precios', titulo: ['Precios claros', 'desde el principio.'] },
  { archivo: 'trabajos.png', eyebrow: 'Trabajos', titulo: ['El problema que había', 'y qué cambió.'] },
  { archivo: 'contacto.png', eyebrow: 'Contacto', titulo: ['Hablemos', 'de tu negocio.'] },
];

/**
 * El cubo del logo, misma geometría que src/components/Hexagono.astro en su
 * variante `tenue`: trazo `line-dark` porque aquí es fondo, no protagonista.
 * El trazo escala con el viewBox (sin `non-scaling-stroke`), así que a 531px
 * queda en ~6.6px el exterior y ~4.4px las aristas internas.
 */
const HEXAGONO = `
<svg class="hex" viewBox="0 0 120 120" fill="none">
  <polygon points="60,8 105,34 105,86 60,112 15,86 15,34" stroke="#3A322E" stroke-width="1.5"></polygon>
  <g stroke="#3A322E" stroke-width="1">
    <line x1="60" y1="60" x2="60" y2="8"></line>
    <line x1="60" y1="60" x2="105" y2="86"></line>
    <line x1="60" y1="60" x2="15" y2="86"></line>
  </g>
  <circle cx="60" cy="60" r="5" fill="#F04E68"></circle>
</svg>`;

/** El mark del lockup, misma geometría que public/brand/metalmind-mark.svg. */
const MARK = `
<svg class="mark" viewBox="0 0 120 120" fill="none">
  <polygon points="60,8 105,34 105,86 60,112 15,86 15,34" stroke="#CFCBC7" stroke-width="8"></polygon>
  <g stroke="#8A8481" stroke-width="5">
    <line x1="60" y1="60" x2="60" y2="8"></line>
    <line x1="60" y1="60" x2="105" y2="86"></line>
    <line x1="60" y1="60" x2="15" y2="86"></line>
  </g>
  <circle cx="60" cy="8" r="8" fill="#CFCBC7"></circle>
  <circle cx="105" cy="86" r="8" fill="#CFCBC7"></circle>
  <circle cx="15" cy="86" r="8" fill="#CFCBC7"></circle>
  <circle cx="60" cy="60" r="12" fill="#F04E68"></circle>
</svg>`;

const html = ({ eyebrow, titulo }) => `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><style>
  @font-face { font-family: 'Archivo'; src: url('${ARCHIVO}') format('woff2-variations');
               font-weight: 100 900; font-display: block; }
  @font-face { font-family: 'IBM Plex Mono'; src: url('${PLEX}') format('woff2');
               font-weight: 500; font-display: block; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #191412; position: relative; overflow: hidden; }
  .hex { position: absolute; left: 769.5px; top: 240px; width: 520px; height: 520px; }
  .contenido { position: relative; padding: 77px 80px; }
  .eyebrow { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 22px;
             line-height: 1; letter-spacing: 0.18em; text-transform: uppercase; color: #8A8481; }
  h1 { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 83px; line-height: 1.03;
       letter-spacing: -0.02em; color: #EAE6E2; margin-top: 31px; }
  .lockup { position: absolute; left: 80px; bottom: 64px; display: flex; align-items: center; gap: 20px; }
  .mark { width: 52px; height: 52px; flex-shrink: 0; }
  .wordmark { font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 30.5px;
              line-height: 1; letter-spacing: -0.02em; color: #EAE6E2; }
  .studios { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 15px;
             line-height: 1; letter-spacing: 0.18em; text-transform: uppercase; color: #8A8481;
             margin-top: 11px; }
</style></head><body>
  ${HEXAGONO}
  <div class="contenido">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${titulo.join('<br>')}</h1>
  </div>
  <div class="lockup">${MARK}<div><div class="wordmark">MetalMind</div><div class="studios">Studios</div></div></div>
</body></html>`;

const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
for (const tarjeta of TARJETAS) {
  await pagina.setContent(html(tarjeta), { waitUntil: 'load' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.screenshot({ path: resolve(raiz, 'public/og', tarjeta.archivo), type: 'png' });
  console.log(`✓ public/og/${tarjeta.archivo}`);
}
await navegador.close();
