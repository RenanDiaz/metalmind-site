import { SITE, instagramUrl } from '../data/site';

/**
 * A quién le sirvo. El domicilio del negocio es Panamá (ver `address`), pero el
 * trabajo es remoto: el área servida no se acota al país.
 */
const AREA_SERVIDA = [
  { '@type': 'Country', name: 'Panamá' },
  { '@type': 'Place', name: 'Latinoamérica' },
];

/** JSON-LD del negocio (home). ProfessionalService es subtipo de LocalBusiness. */
export function negocioJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#negocio`,
    name: SITE.nombre,
    description: SITE.descripcion,
    url: SITE.url,
    telephone: SITE.telefonoE164,
    email: SITE.correo,
    image: `${SITE.url}/brand/metalmind-mark.svg`,
    priceRange: 'Desde $450',
    address: {
      '@type': 'PostalAddress',
      addressCountry: SITE.paisISO,
    },
    areaServed: AREA_SERVIDA,
    sameAs: [instagramUrl],
  };
}

/** JSON-LD de servicios con oferta, para /planes. */
export function serviciosJsonLd(
  planes: Array<{ nombre: string; paraQuien: string; precioDesde: number | null }>
) {
  return {
    '@context': 'https://schema.org',
    '@graph': planes.map((plan) => ({
      '@type': 'Service',
      name: `Sitio web — Plan ${plan.nombre}`,
      description: plan.paraQuien,
      provider: { '@id': `${SITE.url}/#negocio` },
      areaServed: AREA_SERVIDA,
      ...(plan.precioDesde !== null && {
        offers: {
          '@type': 'Offer',
          price: plan.precioDesde,
          priceCurrency: 'USD',
        },
      }),
    })),
  };
}

/** JSON-LD de FAQ, para /planes (donde vive el FAQ canónico). */
export function faqJsonLd(preguntas: Array<{ pregunta: string; respuesta: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map(({ pregunta, respuesta }) => ({
      '@type': 'Question',
      name: pregunta,
      acceptedAnswer: { '@type': 'Answer', text: respuesta },
    })),
  };
}

/** JSON-LD de migas, para /trabajos/[slug]. */
export function migasJsonLd(migas: Array<{ nombre: string; ruta: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: migas.map((miga, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: miga.nombre,
      item: `${SITE.url}${miga.ruta}`,
    })),
  };
}
