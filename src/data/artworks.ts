import { loadArtworks } from './artwork-loader.mjs';

// Register JSON files with Vite so edits, additions, and removals refresh the gallery.
const files = import.meta.glob('../content/artworks/*.json', {
  eager: true,
  query: '?raw',
  import: 'default',
});
export const artworks = loadArtworks(files);

export function stripeLink(value: string) {
  try { const url = new URL(value); return url.protocol === 'https:' && ['buy.stripe.com', 'checkout.stripe.com'].includes(url.hostname) ? url.href : null; }
  catch { return null; }
}
