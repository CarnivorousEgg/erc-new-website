import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Vite plugin that converts all JPG/JPEG/PNG images to WebP during build.
 * 
 * After the build completes, it:
 * 1. Scans the output directory for .jpg/.jpeg/.png files
 * 2. Converts each to .webp using sharp
 * 3. Deletes the original files
 * 4. Rewrites all references in .js, .css, and .html files
 * 
 * @param {Object} options
 * @param {number} options.quality - WebP quality (1-100, default 80)
 * @param {boolean} options.keepOriginals - Keep original files (default false)
 * @param {boolean} options.verbose - Log detailed info (default true)
 */
export default function webpConvert(options = {}) {
  const {
    quality = 80,
    keepOriginals = false,
    verbose = true,
  } = options;

  let outDir;
  let root;

  /**
   * Recursively find all files matching given extensions in a directory.
   */
  function findFiles(dir, extensions) {
    const results = [];
    if (!fs.existsSync(dir)) return results;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...findFiles(fullPath, extensions));
      } else if (extensions.some(ext => entry.name.toLowerCase().endsWith(ext))) {
        results.push(fullPath);
      }
    }
    return results;
  }

  return {
    name: 'vite-plugin-webp-convert',
    apply: 'build',

    configResolved(config) {
      root = config.root;
      outDir = path.resolve(root, config.build.outDir);
    },

    async closeBundle() {
      console.log('\n🖼️  WebP Conversion: Starting...');
      const startTime = Date.now();

      // 1. Find all image files in the output directory
      const imageFiles = findFiles(outDir, ['.jpg', '.jpeg', '.png']);

      if (imageFiles.length === 0) {
        console.log('   No JPG/PNG images found to convert.');
        return;
      }

      console.log(`   Found ${imageFiles.length} images to convert.`);

      let converted = 0;
      let totalOriginalSize = 0;
      let totalWebpSize = 0;
      const errors = [];

      // 2. Convert each image to WebP
      for (const imagePath of imageFiles) {
        try {
          const ext = path.extname(imagePath).toLowerCase();
          const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

          const originalBuffer = fs.readFileSync(imagePath);
          
          // Skip empty files
          if (originalBuffer.length === 0) {
            if (verbose) {
              console.log(`   ⊘ ${path.relative(outDir, imagePath)} (empty file, skipped)`);
            }
            continue;
          }
          
          totalOriginalSize += originalBuffer.length;

          let sharpInstance = sharp(originalBuffer);

          // Convert to WebP
          const webpBuffer = await sharpInstance
            .webp({ quality, effort: 4 })
            .toBuffer();

          totalWebpSize += webpBuffer.length;

          // Only use WebP if it's actually smaller (or roughly same size)
          if (webpBuffer.length < originalBuffer.length * 1.1) {
            fs.writeFileSync(webpPath, webpBuffer);
            
            if (!keepOriginals) {
              fs.unlinkSync(imagePath);
            }
            converted++;

            if (verbose) {
              const savings = ((1 - webpBuffer.length / originalBuffer.length) * 100).toFixed(1);
              const relativePath = path.relative(outDir, imagePath);
              console.log(`   ✓ ${relativePath} → .webp (${savings}% smaller)`);
            }
          } else {
            // WebP is larger - keep original and create a .webp copy anyway
            // so references still work, but use a re-encoded version
            fs.writeFileSync(webpPath, webpBuffer);
            if (!keepOriginals) {
              fs.unlinkSync(imagePath);
            }
            converted++;

            if (verbose) {
              const relativePath = path.relative(outDir, imagePath);
              console.log(`   ~ ${relativePath} → .webp (WebP was larger, converted anyway)`);
            }
          }
        } catch (err) {
          errors.push({ file: imagePath, error: err.message });
          if (verbose) {
            console.error(`   ✗ ${path.relative(outDir, imagePath)}: ${err.message}`);
          }
        }
      }

      // 3. Rewrite references in JS, CSS, and HTML files
      if (!keepOriginals && converted > 0) {
        console.log('   Rewriting image references in build output...');
        
        const textFiles = [
          ...findFiles(outDir, ['.js', '.mjs']),
          ...findFiles(outDir, ['.css']),
          ...findFiles(outDir, ['.html']),
        ];

        let rewrittenFiles = 0;

        for (const textFile of textFiles) {
          try {
            let content = fs.readFileSync(textFile, 'utf-8');
            const original = content;

            // Replace image extensions in references
            // Match patterns like: /images/foo.jpg, ./images/foo.png, images/bar.jpeg
            // Also handle hashed assets like: assets/image-abc123.jpg
            content = content.replace(
              /(\/?(?:images|assets|public|Home-Videos|spons|people|projects|events|blog|handbook)[^\s"'`)]*?)\.(jpg|jpeg|png)/gi,
              '$1.webp'
            );
            
            // Also handle encoded paths (e.g., in JSON strings within JS bundles)
            // where / might be encoded or paths use different separators
            content = content.replace(
              /(["'](?:[^"']*?))\.(jpg|jpeg|png)(?=["'])/gi,
              (match, prefix, ext) => {
                // Only replace if it looks like an image path
                if (/(?:images|assets|public|\/img|\.\/|\/)/i.test(prefix)) {
                  return `${prefix}.webp`;
                }
                return match;
              }
            );

            if (content !== original) {
              fs.writeFileSync(textFile, content, 'utf-8');
              rewrittenFiles++;
              if (verbose) {
                console.log(`   ↻ Rewrote references in ${path.relative(outDir, textFile)}`);
              }
            }
          } catch (err) {
            errors.push({ file: textFile, error: `Rewrite failed: ${err.message}` });
          }
        }

        console.log(`   Rewrote ${rewrittenFiles} files with updated references.`);
      }

      // 4. Summary
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const savedMB = ((totalOriginalSize - totalWebpSize) / 1024 / 1024).toFixed(2);
      const savedPct = totalOriginalSize > 0
        ? ((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(1)
        : 0;

      console.log(`\n   📊 WebP Conversion Summary:`);
      console.log(`   • Converted: ${converted}/${imageFiles.length} images`);
      console.log(`   • Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   • WebP size: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   • Saved: ${savedMB} MB (${savedPct}%)`);
      console.log(`   • Time: ${elapsed}s`);

      if (errors.length > 0) {
        console.log(`   • Errors: ${errors.length}`);
      }

      console.log('');
    },
  };
}
