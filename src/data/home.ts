/**
 * Copy de la home (spec §3). Todo el texto vive aquí, no en los componentes.
 * Registro: primera persona del singular, directo, sin marketinés.
 */

export const HERO = {
  eyebrow: 'Desarrollo web · Desde Panamá',
  titulo: ['Tu negocio existe.', 'Tu sitio web, no.'],
  subtitulo:
    'Hago sitios web rápidos y bien hechos para negocios que ya funcionan. Diseño, desarrollo y mantenimiento — una sola persona que te contesta el WhatsApp, estés donde estés.',
  ctaPrimario: 'Cotizar por WhatsApp',
  ctaSecundario: 'Ver trabajos',
} as const;

export const PROBLEMA = {
  eyebrow: 'El problema',
  titulo: 'Esto ya te está costando clientes.',
  items: [
    {
      afirmacion: 'Tus clientes te buscan en Google y encuentran a tu competencia.',
      consecuencia: 'La llamada se la lleva el que aparece, no el que hace mejor el trabajo.',
    },
    {
      afirmacion: 'Instagram no es un sitio web.',
      consecuencia:
        'No sale en Google, el algoritmo decide quién te ve, y la cuenta no es tuya: es de Meta. Si te la cierran mañana, no te llevas nada.',
    },
    {
      afirmacion: 'El sitio que te hicieron carga en 8 segundos.',
      consecuencia:
        'En el celular, más de la mitad de la gente abandona una página que tarda más de 3 en abrir. Nunca sabes cuántos clientes fueron.',
    },
  ],
} as const;

export const QUE_HAGO = {
  eyebrow: 'Qué hago',
  titulo: 'Diseño, desarrollo y mantenimiento. Los tres, una persona.',
  items: [
    {
      nombre: 'Diseño',
      texto:
        'Un sitio que se entiende en cinco segundos: qué vendes, dónde estás y cómo contactarte. Pensado para el celular primero, porque ahí te van a ver.',
    },
    {
      nombre: 'Desarrollo',
      texto:
        'Carga rápido, sale en Google y el botón de WhatsApp está siempre a la vista. Nada de plantillas recicladas que se ven igual que las de todos.',
    },
    {
      nombre: 'Mantenimiento',
      texto:
        'Hosting, dominio, respaldos y los cambios menores del mes, todo en una mensualidad fija. ¿Cambió un precio o un horario? Me escribes y lo actualizo.',
    },
  ],
} as const;

export const PLANES_INTRO = {
  eyebrow: 'Planes',
  titulo: 'Precios claros desde el principio.',
  intro:
    'Sin «consultar precio». Estos son los puntos de partida; si tu caso cuesta distinto, te lo digo antes de empezar, no después.',
  mantenimiento: {
    titulo: '¿Qué es la mensualidad?',
    texto:
      'Tu sitio necesita un lugar donde vivir (hosting), un nombre (dominio), copias de seguridad y alguien que haga los cambios pequeños del mes. Eso es. Si prefieres administrarlo tú, también se puede: te entrego todo y te explico cómo.',
  },
} as const;

export const PROCESO = {
  eyebrow: 'Proceso',
  titulo: 'De la primera conversación a publicado: 2 a 3 semanas.',
  pasos: [
    {
      nombre: 'Conversamos',
      texto:
        'Me cuentas de tu negocio por WhatsApp o en una videollamada. Treinta minutos, sin costo y sin compromiso — no hace falta que estemos en la misma ciudad.',
      tiempo: 'Día 1',
    },
    {
      nombre: 'Propuesta y anticipo',
      texto: 'Te mando una propuesta con precio cerrado y fechas. Si te sirve, arrancamos con el 50%.',
      tiempo: 'Días 2–3',
    },
    {
      nombre: 'Construyo y revisas',
      texto: 'Te voy mostrando el sitio real en tu celular, no dibujos. Dos rondas de ajustes incluidas.',
      tiempo: 'Semanas 1–2',
    },
    {
      nombre: 'Publicamos',
      texto: 'El sitio queda en tu dominio y dado de alta en Google. Te enseño a leer las visitas. Pagas el 50% restante.',
      tiempo: '1 día',
    },
  ],
} as const;

export const TRABAJOS_INTRO = {
  eyebrow: 'Trabajos',
  titulo: 'Casos',
  verTodos: 'Ver los tres casos',
} as const;

export const FAQ_INTRO = {
  eyebrow: 'Preguntas',
  titulo: 'Lo que todos preguntan',
} as const;

export const CIERRE = {
  titulo: 'Cuéntame de tu negocio.',
  linea: 'Cotizar toma cinco minutos y no te compromete a nada.',
  cta: 'Cotizar por WhatsApp',
} as const;
