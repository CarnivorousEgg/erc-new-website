import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const QUALITY = 80;
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

/**
 * Recursively find all image files matching given extensions.
 */
function findImages(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findImages(fullPath));
    } else if (EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Check if the cached WebP file is still valid (exists and is newer than source).
 */
function isCached(sourcePath, webpPath) {
  if (!fs.existsSync(webpPath)) return false;
  const srcStat = fs.statSync(sourcePath);
  const webpStat = fs.statSync(webpPath);
  return webpStat.mtimeMs >= srcStat.mtimeMs;
}

async function main() {
  const forceAll = process.argv.includes('--force');
  
  console.log('\n🖼️  WebP Pre-Conversion');
  console.log(`   Source: ${PUBLIC_DIR}`);
  console.log(`   Quality: ${QUALITY}`);
  console.log(`   Mode: ${forceAll ? 'Force re-convert all' : 'Incremental (skip cached)'}\n`);

  const startTime = Date.now();
  const imageFiles = findImages(PUBLIC_DIR);

  if (imageFiles.length === 0) {
    console.log('   No images found to convert.');
    return;
  }

  console.log(`   Found ${imageFiles.length} source images.\n`);

  let converted = 0;
  let skipped = 0;
  let errors = 0;
  let totalOriginalSize = 0;
  let totalWebpSize = 0;

  for (const imagePath of imageFiles) {
    const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const relativePath = path.relative(PUBLIC_DIR, imagePath);

    // Skip if cached WebP is up-to-date
    if (!forceAll && isCached(imagePath, webpPath)) {
      skipped++;
      continue;
    }

    try {
      const originalBuffer = fs.readFileSync(imagePath);

      // Skip empty files
      if (originalBuffer.length === 0) {
        console.log(`   ⊘ ${relativePath} (empty, skipped)`);
        skipped++;
        continue;
      }

      totalOriginalSize += originalBuffer.length;

      const webpBuffer = await sharp(originalBuffer)
        .webp({ quality: QUALITY, effort: 4 })
        .toBuffer();

      totalWebpSize += webpBuffer.length;
      fs.writeFileSync(webpPath, webpBuffer);
      converted++;

      const savings = ((1 - webpBuffer.length / originalBuffer.length) * 100).toFixed(1);
      console.log(`   ✓ ${relativePath} → .webp (${savings}% smaller)`);
    } catch (err) {
      errors++;
      console.error(`   ✗ ${relativePath}: ${err.message}`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n   📊 Summary:`);
  console.log(`   • Converted: ${converted}`);
  console.log(`   • Skipped (cached): ${skipped}`);
  if (errors > 0) console.log(`   • Errors: ${errors}`);
  if (totalOriginalSize > 0) {
    const savedMB = ((totalOriginalSize - totalWebpSize) / 1024 / 1024).toFixed(2);
    const savedPct = ((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(1);
    console.log(`   • Saved: ${savedMB} MB (${savedPct}%)`);
  }
  console.log(`   • Time: ${elapsed}s\n`);
}

main().catch(err => {
  console.error('WebP conversion failed:', err);
  process.exit(1);
});
