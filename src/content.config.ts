import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const trabajos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trabajos' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      sector: z.string(),
      ubicacion: z.string(),
      problema: z.string().max(140),
      resultado: z.string().max(140),
      plan: z.enum(['base', 'negocio', 'a-medida']),
      entrega: z.string(),
      captura: image(),
      capturaAlt: z.string(),
      descripcion: z.string().max(160),
      esDemo: z.boolean().default(true),
      orden: z.number().int(),
      publicado: z.boolean().default(true),
    }),
});

const planes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/planes' }),
  schema: z.object({
    nombre: z.string(),
    id: z.enum(['base', 'negocio', 'a-medida']),
    precioDesde: z.number().int().nullable(),
    mantenimiento: z.number().int().nullable(),
    paraQuien: z.string(),
    incluye: z.array(z.string()).min(3),
    entrega: z.string(),
    destacado: z.boolean().default(false),
    ctaTexto: z.string(),
    orden: z.number().int(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    pregunta: z.string(),
    orden: z.number().int(),
  }),
});

export const collections = { trabajos, planes, faq };
