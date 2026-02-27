/**
 * generate_thumbnails.js
 *
 * Generates 200x200 WebP thumbnails for all gallery images used in the DomeGallery.
 * Thumbnails are saved next to the originals as `<basename>.thumb.webp`.
 *
 * Usage: node scripts/generate_thumbnails.js
 *
 * Dependencies: sharp (already in devDependencies)
 */

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const galleryJsonPath = path.join(__dirname, '..', 'src', 'data', 'gallery.json');

const THUMB_SIZE = 200;
const THUMB_QUALITY = 72; // Good balance of quality vs size

const gallery = JSON.parse(fs.readFileSync(galleryJsonPath, 'utf-8'));

/**
 * Given a public-root-relative image path like /images/events/foo/bar.jpg
 * returns the absolute filesystem path.
 */
function publicPathToFs(publicRelPath) {
    // Remove leading slash
    const rel = publicRelPath.replace(/^\//, '');
    return path.join(publicDir, rel);
}

/**
 * Returns the thumbnail path for a given original public path.
 * e.g. /images/events/foo/bar.jpg → /images/events/foo/bar.thumb.webp
 */
function thumbPublicPath(originalPublicPath) {
    const ext = path.extname(originalPublicPath);
    return originalPublicPath.slice(0, -ext.length) + '.thumb.webp';
}

async function generateThumb(publicRelPath) {
    const srcPath = publicPathToFs(publicRelPath);
    const thumbFsPath = publicPathToFs(thumbPublicPath(publicRelPath));

    if (!fs.existsSync(srcPath)) {
        console.warn(`  ✗ Missing: ${publicRelPath}`);
        return null;
    }

    // Skip if thumbnail already exists and is newer than source
    if (fs.existsSync(thumbFsPath)) {
        const srcMtime = fs.statSync(srcPath).mtimeMs;
        const thumbMtime = fs.statSync(thumbFsPath).mtimeMs;
        if (thumbMtime >= srcMtime) {
            console.log(`  ↩ Skip (up-to-date): ${publicRelPath}`);
            return thumbPublicPath(publicRelPath);
        }
    }

    try {
        await sharp(srcPath)
            .resize(THUMB_SIZE, THUMB_SIZE, {
                fit: 'cover',
                position: 'attention' // smart cropping — focuses on faces/interesting areas
            })
            .webp({ quality: THUMB_QUALITY })
            .toFile(thumbFsPath);
        console.log(`  ✓ ${publicRelPath} → ${thumbPublicPath(publicRelPath)}`);
        return thumbPublicPath(publicRelPath);
    } catch (err) {
        console.warn(`  ✗ Error processing ${publicRelPath}: ${err.message}`);
        return null;
    }
}

async function main() {
    console.log('🖼  Generating DomeGallery thumbnails...\n');

    const allImages = [];

    // Collect all images from gallery.json
    ['events', 'projects'].forEach(category => {
        const items = gallery[category] || [];
        items.forEach(item => {
            if (item.image) {
                allImages.push(item.image);
            }
        });
    });

    // Also collect from galleryMedia.json for comprehensive coverage
    const galleryMediaPath = path.join(__dirname, '..', 'src', 'data', 'galleryMedia.json');
    if (fs.existsSync(galleryMediaPath)) {
        const galleryMedia = JSON.parse(fs.readFileSync(galleryMediaPath, 'utf-8'));

        const processSection = (section) => {
            if (!section) return;
            Object.values(section).forEach(items => {
                if (Array.isArray(items)) {
                    items.forEach(item => {
                        if (item.type === 'image' && item.img) {
                            allImages.push(item.img);
                        }
                    });
                }
            });
        };

        processSection(galleryMedia.events);
        processSection(galleryMedia.projects);
    }

    // Deduplicate
    const uniqueImages = [...new Set(allImages)];
    console.log(`Found ${uniqueImages.length} unique images to thumbnail.\n`);

    let success = 0;
    let skipped = 0;
    let errors = 0;

    // Process in batches of 8 for speed
    const batchSize = 8;
    for (let i = 0; i < uniqueImages.length; i += batchSize) {
        const batch = uniqueImages.slice(i, i + batchSize);
        const results = await Promise.all(batch.map(img => generateThumb(img)));
        results.forEach(r => {
            if (r === null) errors++;
            else if (r) success++;
        });
    }

    console.log(`\n✅ Done! ${success} generated, ${skipped} skipped, ${errors} errors.`);
    console.log('\nNext: thumbnails are at <original-path-without-ext>.thumb.webp');
    console.log('These are automatically used by DomeGallery for tiles, full-res images load on click.');
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
