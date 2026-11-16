# Eric D. Crookes — artist website

A static Astro website with Gallery, About, and FAQs, with product options directly in the gallery. No database, server, or monthly ecommerce subscription is required.

## Local development

Requires Node.js 22.12 or newer (Node 24 recommended).

```sh
npm install
npm run dev
```

Build with `npm run build`. The finished site is in `dist/`; `npm run preview` serves that build locally.

## Edit the collection

Each artwork is a JSON file in `src/content/artworks/`, with its image in `public/gallery-items/`. The gallery loads these files automatically. See [the client editing guide](docs/GALLERY-GUIDE.md) and copy [the artwork template](docs/artwork-template.json) to add a piece.

Run `npm run validate:gallery` to check content, or `npm run build` to validate and build the site. The gallery includes an entry for every artwork image in `public/gallery-items/`. Titles are derived from filenames; years, descriptions, prices, and product details can be filled in as they are confirmed.

## Enable purchases

1. Create the real products and prices in your own Stripe account.
2. Create a Payment Link for each product. Configure shipping address collection, delivery destinations, shipping rates, and any required product choices in Stripe.
3. For a one-of-a-kind original, configure a one-payment purchase limit in Stripe, then mark the work unavailable after a sale. Check this in test mode before launch.
4. Add the confirmed display price (including currency, e.g. `CA$150`) and the public Stripe URL to the corresponding `products.original.price` / `products.original.purchaseUrl` or `products.print.price` / `products.print.purchaseUrl` fields in the artwork JSON. The link's Stripe price must match the website.
5. Rebuild and redeploy. A buy button appears only when both a price and a valid HTTPS Stripe checkout URL are configured.

Payment Links are public URLs, not API secrets. Never put Stripe secret keys in this repository. Checkout happens on Stripe. Each button purchases its configured product; there is no shared shopping cart or automatic inventory sync. This site does not create merchandise or fulfill orders.

## Before launching

Confirm artwork titles, prices, dimensions, materials, product availability, and image permissions. Complete shipping, returns, framing, and certificate details in the FAQ and product descriptions. Add a contact address and any needed privacy or sales policies. Review the artist bio and statement. Replace the concept shirt image with actual product photography when merchandise is ready.

## Cloudflare Pages

Connect this repository to Cloudflare Pages, choose the Astro preset, and use:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `24`

No environment variables or backend services are needed. Connect a domain through the Pages dashboard when ready. Hosting setup and Stripe account configuration have not been performed by this project.

# Eric-D-Crookes
