import { loadArtworks } from '../src/data/artwork-loader.mjs';

const artworks = loadArtworks();
console.log(`Gallery valid: ${artworks.length} published artworks. Draft files were also validated.`);
