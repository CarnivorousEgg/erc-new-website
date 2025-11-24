import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Replicate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if puppeteer is installed using dynamic import
let puppeteer;
try {
    const puppeteerModule = await import('puppeteer');
    puppeteer = puppeteerModule.default;
} catch (e) {
    console.error('Puppeteer is not installed. Please run "npm install puppeteer" to use this script.');
    process.exit(1);
}

const DATA_FILE = path.join(__dirname, '../src/data/team.json');
const USER_DATA_DIR = path.join(__dirname, '../.puppeteer_data');
const IMAGES_DIR = path.join(__dirname, '../public/alumni');

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

async function main() {
    if (!fs.existsSync(DATA_FILE)) {
        console.error('Data file not found:', DATA_FILE);
        process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    console.log('\n=== LinkedIn Scraper for ERC Website ===');
    console.log(`Session data: ${USER_DATA_DIR}`);
    console.log(`Images will be saved to: ${IMAGES_DIR}`);

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: USER_DATA_DIR
    });

    const page = await browser.newPage();

    // Check login status
    console.log('Checking login status...');
    await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'domcontentloaded' });

    const isLoggedIn = await page.evaluate(() => {
        return !!document.querySelector('.global-nav__content') || window.location.href.includes('/feed');
    });

    if (isLoggedIn) {
        console.log('✅ Detected active session. Starting scrape automatically...');
    } else {
        console.log('⚠️  You are NOT logged in.');
        console.log('1. Please log in to LinkedIn in the browser window.');
        console.log('2. Return to this terminal and press ENTER once you are logged in.');

        await new Promise(resolve => {
            process.stdin.resume();
            process.stdin.once('data', () => {
                process.stdin.pause();
                resolve();
            });
        });
    }

    console.log('Starting scrape...');
    const forceUpdate = process.argv.includes('--force');

    for (const person of data.alumni) {
        if (!person.linkedin) {
            console.log(`Skipping ${person.name} (no LinkedIn URL)`);
            continue;
        }

        // Check if already scraped (has local image path)
        const hasLocalImage = person.image && person.image.startsWith('/alumni/');
        const hasValidWork = person.currentWork && person.currentWork !== 'TBD';

        if (hasLocalImage && hasValidWork && !forceUpdate) {
            console.log(`Skipping ${person.name} (already scraped). Use --force to update.`);
            continue;
        }

        console.log(`Processing ${person.name}...`);

        let retries = 1;
        while (retries >= 0) {
            try {
                await page.goto(person.linkedin, { waitUntil: 'domcontentloaded', timeout: 45000 });
                await new Promise(r => setTimeout(r, 5000)); // Wait for dynamic content

                // Scrape Headline/Current Work
                const headline = await page.evaluate(() => {
                    const selectors = [
                        '.text-body-medium.break-words',
                        'div.text-body-medium',
                        'h2.top-card-layout__headline',
                        '.pv-text-details__left-panel .text-body-medium'
                    ];

                    for (const selector of selectors) {
                        const el = document.querySelector(selector);
                        if (el && el.innerText.trim()) {
                            return el.innerText.trim();
                        }
                    }
                    return null;
                });

                if (headline) {
                    person.currentWork = headline;
                    console.log(`  -> Found current work: ${headline}`);
                } else {
                    console.log(`  -> ⚠️ No headline found`);
                }

                // Scrape Image
                const imageResult = await page.evaluate((name) => {
                    const selectors = [
                        'img.pv-top-card-profile-picture__image',
                        '.profile-photo-edit__preview',
                        `img[alt="${name}"]`,
                        'div.pv-top-card__photo img',
                        'section.artdeco-card img.pv-top-card-profile-picture__image'
                    ];

                    let img = null;
                    let foundSelector = '';

                    for (const selector of selectors) {
                        img = document.querySelector(selector);
                        if (img) {
                            foundSelector = selector;
                            break;
                        }
                    }

                    if (!img) return { error: 'No image element found' };

                    const src = img.src;
                    if (!src) return { error: 'Image element has no src' };

                    // Ignore placeholder
                    if (src === 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' ||
                        src.includes('ghost-person')) {
                        return { error: 'Image is a placeholder/ghost' };
                    }

                    return { src, foundSelector };
                }, person.name);

                if (imageResult.src) {
                    console.log(`  -> Found image URL using '${imageResult.foundSelector}', downloading...`);

                    const imageBuffer = await page.evaluate(async (url) => {
                        const response = await fetch(url);
                        const buffer = await response.arrayBuffer();
                        return Array.from(new Uint8Array(buffer));
                    }, imageResult.src);

                    const slug = person.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    const filename = `${slug}.jpg`;
                    const filePath = path.join(IMAGES_DIR, filename);

                    fs.writeFileSync(filePath, Buffer.from(imageBuffer));

                    person.image = `/alumni/${filename}`;
                    console.log(`  -> Saved to /alumni/${filename}`);
                } else {
                    console.log(`  -> ⚠️ Could not get image: ${imageResult.error}`);
                }

                break; // Success

            } catch (e) {
                if (e.message.includes('detached Frame') && retries > 0) {
                    console.log(`  -> Detached frame detected. Retrying ${person.name}...`);
                    retries--;
                    await new Promise(r => setTimeout(r, 2000));
                } else {
                    console.error(`  -> Failed to scrape: ${e.message}`);
                    break;
                }
            }
        }

        // Random delay
        await new Promise(r => setTimeout(r, 2000 + Math.random() * 3000));
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
    console.log('\nDone! Updated team.json');
    await browser.close();
    process.exit(0);
}

main();
