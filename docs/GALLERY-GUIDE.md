# Updating the gallery

## Add an artwork

1. Add the image to `public/gallery-items/`. Existing images in that folder can also be used. Supported extensions: jpg, jpeg, png, webp, avif, gif. Prefer short lowercase filenames with hyphens; existing names with spaces work too.
2. Copy `docs/artwork-template.json` into `src/content/artworks/` and give it a unique filename such as `sunset.json`. Keep the template itself in `docs/` so it never appears in the gallery.
3. Edit the new JSON file. Set a unique `id`, the confirmed `title`, the exact image filename including capitalization, and a helpful `alt` description of the image. Do not include a folder path in `image`.
4. Fill in any known details. Leave unknown text fields as `""`. Keep years and prices in quotes: `"2024"`, `"CA$150"`.
5. Set `order` to a number. Lower numbers appear first; gaps such as 10, 20, 30 make room for later additions. Equal numbers are sorted by id.
6. Change `published` from `false` to `true` when ready.
7. Run `npm run validate:gallery`, then `npm run dev` to review locally. JSON edits, additions, and removals automatically refresh the gallery in the dev server.
8. Run `npm run build` and deploy the resulting `dist/` folder using the project's hosting workflow. If hosting is configured to deploy from Git, commit and push the JSON and image together to trigger a rebuild.

Saving files on your computer does not update the live site by itself.

## Fields and defaults

`id`, `title`, `image`, and `alt` are required. Keep the id stable when changing a title. `year`, `medium`, `dimensions`, and `description` are optional strings. Medium and dimensions appear together in the artwork information.

`order` defaults to 0. `published` defaults to true, so explicitly use false for drafts. Drafts are hidden from the gallery but are still validated. Draft JSON and images in public folders are not private storage: public images can be accessed by URL after deployment.

`products` is optional. It can contain `original`, `print`, `mug`, and `shirt`. Each accepts optional `price`, `purchaseUrl`, and `details` strings. Remove unused product entries or leave their values empty; the current design keeps product placeholders visible. A Buy button appears only when both a price and a valid HTTPS Stripe Payment Link are present. Use display prices with a currency and ensure they match Stripe. Never put secret keys here.

## Edit, hide, or remove an artwork

Edit its JSON to change text, ordering, or prices. To replace a photo, upload the replacement and update `image`. To hide a work, set `published` to false. To remove it entirely, delete its JSON; only delete its image if no other entry uses it. Rebuild and redeploy after each update.

## Fix validation errors

Errors identify the artwork filename and the problem. Check commas, double quotes, unique ids, exact image spelling, and field names. JSON does not allow comments or trailing commas. Validation checks all entries, including drafts, and runs automatically during a production build. Images without JSON entries do not appear in the gallery.
