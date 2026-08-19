/**
 * POST /api/contacto — recibe el formulario de /contacto (spec §7).
 *
 * Acepta el POST nativo del <form> (redirige) y el fetch del enhancement
 * (responde JSON, detectado por el header Accept). Honeypot y trampa de
 * tiempo responden como éxito para no avisarle al bot. Envío por Resend.
 *
 * Variables de entorno en Cloudflare Pages:
 * - RESEND_API_KEY (requerida)
 * - CONTACTO_TO   (opcional; por defecto el correo del dueño)
 * - CONTACTO_FROM (opcional; por defecto onboarding@resend.dev)
 *   TODO: verificar metalmindstudios.com en Resend y fijar CONTACTO_FROM
 */

interface Env {
  RESEND_API_KEY: string;
  CONTACTO_TO?: string;
  CONTACTO_FROM?: string;
}

// TODO: cambiar a hola@metalmindstudios.com cuando exista el dominio de correo
const DESTINO_POR_DEFECTO = 'renandiazreyes@gmail.com';
const REMITENTE_POR_DEFECTO = 'MetalMind Studios <onboarding@resend.dev>';

const PLANES_VALIDOS = new Set(['', 'base', 'negocio', 'a-medida', 'no-se']);
const MINIMO_MS_PARA_HUMANO = 3_000;

type Errores = Record<string, string>;

function validar(campos: Record<string, string>): Errores {
  const errores: Errores = {};
  const { nombre, negocio, correo, telefono, mensaje, plan } = campos;

  if (nombre.length < 2 || nombre.length > 80) {
    errores.nombre = 'Escribe tu nombre (2 a 80 caracteres).';
  }
  if (negocio.length > 80) {
    errores.negocio = 'El nombre del negocio es muy largo (máximo 80).';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo) || correo.length > 120) {
    errores.correo = 'Ese correo no se ve válido.';
  }
  if (telefono !== '' && !/^[\d+\-() ]{6,20}$/.test(telefono)) {
    errores.telefono = 'Ese teléfono no se ve válido.';
  }
  if (mensaje.length < 10 || mensaje.length > 1000) {
    errores.mensaje = 'Cuéntame un poco más (10 a 1000 caracteres).';
  }
  if (!PLANES_VALIDOS.has(plan)) {
    errores.plan = 'Plan no reconocido.';
  }
  return errores;
}

function esBot(campos: Record<string, string>): boolean {
  if (campos.sitio_web !== '') return true; // honeypot
  // Trampa de tiempo: el JS pone _t al cargar; sin JS llega vacía y se ignora
  if (campos._t !== '') {
    const t = Number(campos._t);
    if (Number.isFinite(t) && Date.now() - t < MINIMO_MS_PARA_HUMANO) return true;
  }
  return false;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const quiereJson = request.headers.get('accept')?.includes('application/json') ?? false;

  const responder = {
    exito: () =>
      quiereJson
        ? Response.json({ ok: true })
        : Response.redirect(new URL('/contacto/gracias', request.url).toString(), 303),
    validacion: (errores: Errores) =>
      quiereJson
        ? Response.json({ ok: false, errores }, { status: 400 })
        : Response.redirect(new URL('/contacto?error=1#aviso', request.url).toString(), 303),
    interno: () =>
      quiereJson
        ? Response.json({ ok: false }, { status: 500 })
        : Response.redirect(new URL('/contacto?error=2#aviso', request.url).toString(), 303),
  };

  let datos: FormData;
  try {
    datos = await request.formData();
  } catch {
    return responder.validacion({ mensaje: 'El envío llegó vacío. Intenta de nuevo.' });
  }

  const campo = (nombre: string) => {
    const valor = datos.get(nombre);
    return typeof valor === 'string' ? valor.trim() : '';
  };
  const campos = {
    nombre: campo('nombre'),
    negocio: campo('negocio'),
    correo: campo('correo'),
    telefono: campo('telefono'),
    mensaje: campo('mensaje'),
    plan: campo('plan'),
    sitio_web: campo('sitio_web'),
    _t: campo('_t'),
  };

  // A los bots se les responde como éxito, sin enviar nada
  if (esBot(campos)) return responder.exito();

  const errores = validar(campos);
  if (Object.keys(errores).length > 0) return responder.validacion(errores);

  const asunto =
    `Contacto web: ${campos.nombre}` + (campos.negocio ? ` — ${campos.negocio}` : '');
  const cuerpo = [
    `Nombre: ${campos.nombre}`,
    `Negocio: ${campos.negocio || '—'}`,
    `Correo: ${campos.correo}`,
    `Teléfono: ${campos.telefono || '—'}`,
    `Plan de interés: ${campos.plan || '—'}`,
    '',
    'Mensaje:',
    campos.mensaje,
  ].join('\n');

  try {
    const respuesta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACTO_FROM ?? REMITENTE_POR_DEFECTO,
        to: env.CONTACTO_TO ?? DESTINO_POR_DEFECTO,
        reply_to: campos.correo,
        subject: asunto,
        text: cuerpo,
      }),
    });

    if (!respuesta.ok) {
      console.error('Resend respondió', respuesta.status, await respuesta.text());
      return responder.interno();
    }
  } catch (error) {
    console.error('Error enviando el correo:', error);
    return responder.interno();
  }

  return responder.exito();
};
