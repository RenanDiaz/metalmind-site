/** Copy de las páginas interiores (spec §4). */

export const PAGINA_TRABAJOS = {
  titulo: 'Trabajos',
  intro: 'Tres casos. En cada uno: cuál era el problema y qué cambió.',
  ctaTitulo: '¿Tu negocio necesita algo así?',
  cta: 'Cotizar por WhatsApp',
  metaTitle: 'Trabajos — MetalMind Studios',
  metaDescription:
    'Casos de sitios web para negocios locales: el problema que tenían y qué cambió con la página nueva.',
} as const;

export const PAGINA_PLANES = {
  titulo: 'Planes y precios',
  intro:
    'Sin «consultar precio». Estos son los puntos de partida; si tu caso cuesta distinto, te lo digo antes de empezar, no después.',
  mantenimiento: {
    titulo: 'Qué cubre el mantenimiento',
    items: [
      'Hosting: tu sitio en línea, rápido, con certificado de seguridad al día.',
      'Dominio: la renovación anual de tu .com va incluida.',
      'Respaldos: copia de todo, por si algo se rompe o se borra.',
      'Cambios menores: precios, horarios, fotos, un texto — me escribes y lo actualizo.',
      'Vigilancia: si el sitio se cae, me entero yo antes que tus clientes.',
    ],
  },
  teToca: {
    titulo: 'Lo que te toca a ti',
    intro: 'Para que la fecha de entrega se cumpla, hay tres cosas que dependen de ti:',
    items: [
      'Responder mensajes a tiempo: hay decisiones que solo tú puedes tomar.',
      'Aportar la información del negocio: servicios, precios, horarios, fotos.',
      'Revisar los avances cuando te los mande, no la semana siguiente.',
    ],
  },
  metaTitle: 'Planes y precios — MetalMind Studios',
  metaDescription:
    'Planes desde $450 con mantenimiento mensual que incluye hosting, dominio y cambios. Precios claros, sin «consultar».',
} as const;

export const PAGINA_CONTACTO = {
  titulo: 'Hablemos de tu negocio.',
  intro: 'Por WhatsApp es más rápido. Si prefieres el formulario, respondo el mismo día hábil.',
  whatsappCta: 'Cotizar por WhatsApp',
  form: {
    titulo: 'O escríbeme por aquí',
    nombre: 'Tu nombre',
    negocio: 'Tu negocio (opcional)',
    correo: 'Tu correo',
    telefono: 'Tu teléfono (opcional)',
    mensaje: '¿Qué necesitas?',
    mensajePlaceholder: 'Cuéntame del negocio y qué buscas. Dos líneas bastan.',
    plan: 'Plan que te interesa (opcional)',
    planOpciones: [
      { valor: 'base', texto: 'Base' },
      { valor: 'negocio', texto: 'Negocio' },
      { valor: 'a-medida', texto: 'A medida' },
      { valor: 'no-se', texto: 'No sé todavía' },
    ],
    enviar: 'Enviar',
    enviando: 'Enviando…',
    errorGenerico: 'No se pudo enviar. Intenta de nuevo, o escríbeme directo por WhatsApp.',
    exito: 'Recibido. Te respondo hoy mismo si es día hábil.',
  },
  metaTitle: 'Contacto — MetalMind Studios',
  metaDescription:
    'Cotiza tu sitio web por WhatsApp o formulario. Respondo el mismo día hábil. Yappy, ACH o efectivo.',
} as const;

export const PAGINA_GRACIAS = {
  titulo: 'Recibido.',
  texto: 'Te respondo hoy mismo si es día hábil, o el lunes a primera hora.',
  whatsappNota: '¿Prefieres no esperar?',
  whatsappCta: 'Escríbeme por WhatsApp',
  metaTitle: 'Mensaje recibido — MetalMind Studios',
  metaDescription: 'Tu mensaje llegó. Respondo el mismo día hábil.',
} as const;

export const PAGINA_404 = {
  titulo: 'Esta página no existe.',
  texto: 'El link está roto o la página se movió. Lo que buscas seguro está en el inicio.',
  cta: 'Ir al inicio',
  metaTitle: 'Página no encontrada — MetalMind Studios',
} as const;
