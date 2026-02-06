/**
 * Image Optimization Script
 * Converts JPG/PNG images to WebP format for better performance
 * 
 * Usage: npm run optimize:images
 * 
 * Prerequisites: npm install sharp
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../public/images'),
  quality: 80, // WebP quality (0-100)
  skipExisting: true, // Skip if WebP already exists
  preserveOriginal: true, // Keep original files
  maxWidth: 1920, // Max width for resizing (null to disable)
  maxHeight: 1080, // Max height for resizing (null to disable)
  verbose: true
};

// Stats tracking
const stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  totalSaved: 0
};

// File extensions to process
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

/**
 * Convert a single image to WebP
 */
async function convertToWebP(inputPath) {
  const ext = path.extname(inputPath);
  const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Skip if WebP already exists
  if (CONFIG.skipExisting && fs.existsSync(outputPath)) {
    if (CONFIG.verbose) {
      console.log(`⏭️  Skipped (exists): ${path.basename(inputPath)}`);
    }
    stats.skipped++;
    return;
  }

  try {
    const inputStats = fs.statSync(inputPath);
    let pipeline = sharp(inputPath);

    // Resize if dimensions exceed max
    if (CONFIG.maxWidth || CONFIG.maxHeight) {
      pipeline = pipeline.resize(CONFIG.maxWidth, CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Convert to WebP
    await pipeline
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const savedBytes = inputStats.size - outputStats.size;
    const savedPercent = ((savedBytes / inputStats.size) * 100).toFixed(1);

    stats.totalSaved += savedBytes;
    stats.processed++;

    if (CONFIG.verbose) {
      const savedKB = (savedBytes / 1024).toFixed(1);
      console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (saved ${savedKB}KB, ${savedPercent}%)`);
    }

    // Optionally delete original
    if (!CONFIG.preserveOriginal) {
      fs.unlinkSync(inputPath);
    }

  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Recursively process all images in a directory
 */
async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        await convertToWebP(fullPath);
      }
    }
  }
}

/**
 * Also process Home-Videos directory for poster images
 */
async function processVideoPosters() {
  const videosDir = path.join(__dirname, '../public/Home-Videos');
  
  if (!fs.existsSync(videosDir)) {
    return;
  }

  console.log('\n📹 Processing video poster images...');
  
  const entries = fs.readdirSync(videosDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        await convertToWebP(path.join(videosDir, entry.name));
      }
    }
  }
}

/**
 * Generate poster images from videos using sharp
 * Note: This requires ffmpeg for video processing
 */
async function generateVideoPosters() {
  console.log('\n📹 To generate video posters, use FFmpeg:');
  console.log('   ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 poster.jpg');
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('================================\n');
  console.log(`📂 Input directory: ${CONFIG.inputDir}`);
  console.log(`📊 Quality: ${CONFIG.quality}%`);
  console.log(`📏 Max dimensions: ${CONFIG.maxWidth || 'none'}x${CONFIG.maxHeight || 'none'}\n`);

  const startTime = Date.now();

  // Process main images directory
  await processDirectory(CONFIG.inputDir);

  // Process video poster images
  await processVideoPosters();

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const savedMB = (stats.totalSaved / (1024 * 1024)).toFixed(2);

  console.log('\n================================');
  console.log('📊 Optimization Complete!');
  console.log(`   ✅ Processed: ${stats.processed} files`);
  console.log(`   ⏭️  Skipped: ${stats.skipped} files`);
  console.log(`   ❌ Errors: ${stats.errors} files`);
  console.log(`   💾 Total saved: ${savedMB} MB`);
  console.log(`   ⏱️  Duration: ${duration}s`);

  // Generate poster suggestion
  await generateVideoPosters();
}

main().catch(console.error);
