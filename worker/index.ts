/**
 * Entry-point del Worker. El sitio es estático (`astro build` → `dist/`) y
 * Cloudflare lo sirve desde los assets; este script solo existe para la única
 * ruta dinámica: `POST /api/contacto` (ver `wrangler.jsonc`, `run_worker_first`).
 *
 * Cualquier otra petición que no calce con un asset se delega al binding ASSETS
 * para que responda la 404 del sitio (`src/pages/404.astro`).
 */
import { manejarContacto } from './contacto';

export interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY: string;
  CONTACTO_TO?: string;
  CONTACTO_FROM?: string;
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contacto') {
      if (request.method !== 'POST') {
        return new Response('Método no permitido.', {
          status: 405,
          headers: { Allow: 'POST' },
        });
      }
      return manejarContacto(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
