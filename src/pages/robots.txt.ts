import type { APIRoute } from 'astro';

// robots.txt se genera en el build para que el Sitemap apunte al mismo dominio
// que el resto de URLs absolutas (ver `site` en astro.config.mjs).
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site);
  const cuerpo = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
