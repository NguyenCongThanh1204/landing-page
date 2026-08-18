import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'aqf7h9ms',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2026-01-01',
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}