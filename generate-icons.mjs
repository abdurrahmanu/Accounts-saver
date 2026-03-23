import sharp from 'sharp';
import { readFileSync } from 'fs';

// 1. Read your source SVG
// Make sure this path points to your actual SVG file
const svgBuffer = readFileSync('./assets/icons/account-manager.svg');

console.log('Generating PWA icons...');

// 2. Generate the 192x192 PNG
sharp(svgBuffer)
  .resize(192, 192)
  .png()
  .toFile('./public/pwa-192x192.png')
  .then(() => console.log('✅ Successfully created public/pwa-192x192.png'))
  .catch(err => console.error('❌ Error generating 192x192:', err));

// 3. Generate the 512x512 PNG
sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile('./public/pwa-512x512.png')
  .then(() => console.log('✅ Successfully created public/pwa-512x512.png'))
  .catch(err => console.error('❌ Error generating 512x512:', err));