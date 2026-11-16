import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Astro moves this module during prerendering; resolve source files from the project root.
const content = pathToFileURL(resolve('src/content/artworks') + '/');
const images = pathToFileURL(resolve('public/gallery-items') + '/');
const names = ['original', 'print', 'mug', 'shirt'];
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);

export function loadArtworks(sourceFiles) {
  const ids = new Set();
  const imageNames = readdirSync(images, { withFileTypes: true }).filter(entry => entry.isFile()).map(entry => entry.name);
  const files = sourceFiles ?? Object.fromEntries(readdirSync(content)
    .filter(file => file.endsWith('.json')).sort()
    .map(file => [file, readFileSync(new URL(file, content), 'utf8')]));
  return Object.entries(files).map(([file, raw]) => {
    const fail = message => { throw new Error(`Artwork ${file}: ${message}`); };
    let data;
    try { data = JSON.parse(raw); }
    catch (error) { fail(`Invalid JSON: ${error.message}`); }
    if (!object(data)) fail('Expected an object.');
    const allowed = ['id', 'title', 'image', 'alt', 'year', 'medium', 'dimensions', 'description', 'order', 'published', 'products'];
    for (const key of Object.keys(data)) if (!allowed.includes(key)) fail(`Unknown field "${key}".`);
    for (const key of ['id', 'title', 'image', 'alt']) {
      if (typeof data[key] !== 'string' || !data[key].trim()) fail(`"${key}" must be a nonempty string.`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.id)) fail('Use lowercase letters, numbers, and hyphens for id.');
    if (ids.has(data.id)) fail(`Duplicate id "${data.id}".`);
    ids.add(data.id);
    for (const key of ['year', 'medium', 'dimensions', 'description']) {
      if (data[key] !== undefined && typeof data[key] !== 'string') fail(`"${key}" must be a string.`);
    }
    if (data.order !== undefined && !Number.isFinite(data.order)) fail('order must be a number.');
    if (data.published !== undefined && typeof data.published !== 'boolean') fail('published must be true or false.');
    if (!/^[^/\\]+\.(jpe?g|png|webp|avif|gif)$/i.test(data.image) || !imageNames.includes(data.image)) fail(`Image "${data.image}" not found in public/gallery-items/ or unsupported format. Check exact capitalization.`);
    if (data.products !== undefined && !object(data.products)) fail('products must be an object.');
    const products = data.products ?? {};
    for (const key of Object.keys(products)) if (!names.includes(key)) fail(`Unknown product "${key}".`);
    const normalized = {};
    for (const name of names) {
      const product = products[name] ?? {};
      if (!object(product)) fail(`${name} must be an object.`);
      for (const key of Object.keys(product)) if (!['price', 'purchaseUrl', 'details'].includes(key)) fail(`Unknown ${name} field "${key}".`);
      for (const key of ['price', 'purchaseUrl', 'details']) if (product[key] !== undefined && typeof product[key] !== 'string') fail(`${name}.${key} must be a string.`);
      if (product.purchaseUrl) {
        let valid = false;
        try { const url = new URL(product.purchaseUrl); valid = url.protocol === 'https:' && ['buy.stripe.com', 'checkout.stripe.com'].includes(url.hostname); } catch {}
        if (!valid) fail(`${name}.purchaseUrl must be an HTTPS Stripe Payment Link.`);
      }
      normalized[`${name}Price`] = product.price ?? '';
      normalized[`${name}Link`] = product.purchaseUrl ?? '';
      normalized[`${name}Details`] = product.details ?? '';
    }
    return {
      id: data.id, label: data.title, image: `/gallery-items/${encodeURIComponent(data.image)}`,
      alt: data.alt, year: data.year ?? '', medium: [data.medium, data.dimensions].filter(Boolean).join(' · ') || 'To be confirmed',
      description: data.description ?? '', order: data.order ?? 0, published: data.published ?? true,
      ...normalized,
    };
  }).filter(work => work.published).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}
