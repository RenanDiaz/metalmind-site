/** Datos del negocio. Única fuente de verdad para contacto y marca. */
export const SITE = {
  nombre: 'MetalMind Studios',
  // Misma lógica que `site` en astro.config.mjs: la URL del deploy actual si
  // está definida, el dominio final como fallback.
  url: (import.meta.env.PUBLIC_SITE_URL ?? 'https://metalmindstudios.com').replace(/\/$/, ''),
  descripcion:
    'Sitios web rápidos y bien hechos para negocios que ya funcionan. Precios visibles, entrega en 2 semanas y una persona real que te contesta el WhatsApp.',
  whatsappNumero: '50763888475',
  whatsappDisplay: '+507 6388-8475',
  telefonoE164: '+50763888475',
  // TODO: cambiar a hola@metalmindstudios.com cuando se compre el dominio de correo
  correo: 'renandiazreyes@gmail.com',
  instagram: 'metalmind.studios',
  // De dónde soy, no a quién le vendo: el trabajo es remoto y el público no se
  // acota por país. `origen` es la línea del footer; `paisISO` es el domicilio
  // del negocio para JSON-LD.
  origen: 'Desde Panamá',
  paisISO: 'PA',
} as const;

/** URL del perfil de Instagram. */
export const instagramUrl = `https://instagram.com/${SITE.instagram}`;
