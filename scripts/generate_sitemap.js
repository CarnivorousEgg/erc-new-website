/**
 * Generates sitemap.xml in the public/ directory.
 * Run: node scripts/generate_sitemap.js
 * 
 * Reads projects, events, blogs, and handbook data to produce URLs
 * for all static and dynamic pages.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://ercbpgc.in';

// Static routes
const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/projects', priority: '0.8', changefreq: 'monthly' },
    { path: '/events', priority: '0.8', changefreq: 'monthly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog', priority: '0.7', changefreq: 'weekly' },
    { path: '/handbook', priority: '0.7', changefreq: 'monthly' },
];

function loadJson(filename) {
    try {
        return JSON.parse(readFileSync(join(__dirname, '..', 'src', 'data', filename), 'utf-8'));
    } catch {
        console.warn(`Warning: Could not load ${filename}`);
        return [];
    }
}

function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];
    const urls = [];

    // Static pages
    for (const route of staticRoutes) {
        urls.push(`  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
    }

    // Dynamic: projects
    const projects = loadJson('projects.json');
    for (const project of projects) {
        if (project.id) {
            urls.push(`  <url>
    <loc>${SITE_URL}/projects/${project.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
        }
    }

    // Dynamic: events
    const events = loadJson('events.json');
    for (const event of events) {
        if (event.id) {
            urls.push(`  <url>
    <loc>${SITE_URL}/events/${event.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
        }
    }

    // Dynamic: blogs
    const blogs = loadJson('blogs.json');
    for (const blog of blogs) {
        if (blog.id) {
            urls.push(`  <url>
    <loc>${SITE_URL}/blog/${blog.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
        }
    }

    // Dynamic: handbook articles
    const handbookData = loadJson('handbook.json');
    const handbookArticles = Array.isArray(handbookData) ? handbookData : (handbookData.articles || []);
    for (const article of handbookArticles) {
        if (article.id) {
            urls.push(`  <url>
    <loc>${SITE_URL}/handbook/${article.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`);
        }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    const outPath = join(__dirname, '..', 'public', 'sitemap.xml');
    writeFileSync(outPath, sitemap, 'utf-8');
    console.log(`Sitemap generated with ${urls.length} URLs → ${outPath}`);
}

generateSitemap();
