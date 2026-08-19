// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Mientras metalmindstudios.com no esté comprado, el build de producción define
// PUBLIC_SITE_URL con la URL real del deploy (hoy workers.dev) para que og:image,
// canonical y sitemap apunten a un dominio vivo — WhatsApp no muestra la imagen
// de la vista previa si no puede descargarla. Al activar el dominio real,
// eliminar la variable y aplica el fallback.
const site = (process.env.PUBLIC_SITE_URL ?? 'https://metalmindstudios.com').replace(/\/$/, '');

export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
