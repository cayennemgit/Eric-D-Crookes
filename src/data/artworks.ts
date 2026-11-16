// Replace draft labels and add confirmed details before enabling sales.
export const artworks = [
  { id: 'landscape', label: 'Landscape study', year: '', image: '/images/image6.JPG', alt: 'Expressive green hills and blue water beneath a broad blue sky', medium: 'Medium and dimensions to be confirmed', description: '', originalPrice: '', printPrice: '', originalLink: '', printLink: '', mugPrice: '', mugLink: '', shirtPrice: '', shirtLink: '', originalDetails: 'Dimensions, materials, and framing details to be confirmed.', printDetails: 'Print size, paper, and finish to be confirmed.', mugDetails: 'Mug capacity, material, and care instructions to be confirmed.', shirtDetails: 'T-shirt sizes, fabric, colours, and care instructions to be confirmed.' },
  { id: 'figures', label: 'Figures & flowers', year: '', image: '/images/image7.png', alt: 'Colourful abstract faces, birds and flowers above a patchwork of painted rectangles', medium: 'Medium and dimensions to be confirmed', description: '', originalPrice: '', printPrice: '', originalLink: '', printLink: '', mugPrice: '', mugLink: '', shirtPrice: '', shirtLink: '', originalDetails: 'Dimensions, materials, and framing details to be confirmed.', printDetails: 'Print size, paper, and finish to be confirmed.', mugDetails: 'Mug capacity, material, and care instructions to be confirmed.', shirtDetails: 'T-shirt sizes, fabric, colours, and care instructions to be confirmed.' },
];

export function stripeLink(value: string) {
  try { const url = new URL(value); return url.protocol === 'https:' && ['buy.stripe.com', 'checkout.stripe.com'].includes(url.hostname) ? url.href : null; }
  catch { return null; }
}
