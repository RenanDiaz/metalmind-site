import { SITE } from '../data/site';

/**
 * Mensajes precargados de WhatsApp según el origen del clic
 * (spec §2 — tabla de orígenes).
 */
export const MENSAJES_WHATSAPP = {
  header: 'Hola, vengo de metalmindstudios.com y quiero cotizar un sitio para mi negocio.',
  'barra-movil': 'Hola, vengo de metalmindstudios.com y quiero cotizar un sitio para mi negocio.',
  hero: 'Hola, quiero cotizar un sitio web para mi negocio.',
  'plan-base': 'Hola, me interesa el plan Base. Mi negocio es: ',
  'plan-negocio': 'Hola, vengo del plan Negocio. Mi negocio es: ',
  'plan-a-medida': 'Hola, necesito algo a medida. Lo que busco es: ',
  trabajos: 'Hola, vi los trabajos en la página y quiero algo parecido para mi negocio.',
  cierre: 'Hola, quiero conversar sobre un sitio para mi negocio.',
  contacto: 'Hola, prefiero cotizar por aquí. Mi negocio es: ',
  footer: 'Hola, vengo de metalmindstudios.com.',
} as const;

export type OrigenWhatsApp = keyof typeof MENSAJES_WHATSAPP;

/** Enlace wa.me con el mensaje del origen ya codificado. */
export function waLink(origen: OrigenWhatsApp): string {
  const texto = encodeURIComponent(MENSAJES_WHATSAPP[origen]);
  return `https://wa.me/${SITE.whatsappNumero}?text=${texto}`;
}
