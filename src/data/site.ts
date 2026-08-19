/** Datos del negocio. Única fuente de verdad para contacto y marca. */
export const SITE = {
  nombre: 'MetalMind Studios',
  // Misma lógica que `site` en astro.config.mjs: la URL del deploy actual si
  // está definida, el dominio final como fallback.
  url: (import.meta.env.PUBLIC_SITE_URL ?? 'https://metalmindstudios.com').replace(/\/$/, ''),
  descripcion:
    'Sitios web rápidos y bien hechos para negocios panameños. Precios visibles, entrega en 2 semanas y una persona real que te contesta el WhatsApp.',
  whatsappNumero: '50763888475',
  whatsappDisplay: '+507 6388-8475',
  telefonoE164: '+50763888475',
  // TODO: cambiar a hola@metalmindstudios.com cuando se compre el dominio de correo
  correo: 'renandiazreyes@gmail.com',
  // TODO: confirmar handle de Instagram y activar el link en el footer
  instagram: null as string | null,
  ubicacion: 'Panamá',
} as const;
