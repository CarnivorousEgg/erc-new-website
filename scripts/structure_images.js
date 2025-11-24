import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/team.json');
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGES_ROOT = path.join(PUBLIC_DIR, 'images');
const PEOPLE_DIR = path.join(IMAGES_ROOT, 'people');
const PROJECTS_DIR = path.join(IMAGES_ROOT, 'projects');

// Ensure base directories exist
[IMAGES_ROOT, PEOPLE_DIR, PROJECTS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
});

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function main() {
    if (!fs.existsSync(DATA_FILE)) {
        console.error('Data file not found:', DATA_FILE);
        process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    let updated = false;

    // Process Current Team
    if (data.current) {
        const batchDir = path.join(PEOPLE_DIR, 'current');
        if (!fs.existsSync(batchDir)) fs.mkdirSync(batchDir, { recursive: true });

        data.current.forEach(person => {
            const slug = slugify(person.name);
            const newPath = `/images/people/current/${slug}.jpg`;

            if (person.image !== newPath) {
                person.image = newPath;
                updated = true;
                console.log(`Updated ${person.name} -> ${newPath}`);
            }
        });
    }

    // Process Alumni
    if (data.alumni) {
        data.alumni.forEach(person => {
            const batch = person.batch ? slugify(person.batch) : 'unknown';
            const batchDir = path.join(PEOPLE_DIR, batch);

            if (!fs.existsSync(batchDir)) {
                fs.mkdirSync(batchDir, { recursive: true });
                console.log(`Created batch directory: ${batchDir}`);
            }

            const slug = slugify(person.name);
            const newPath = `/images/people/${batch}/${slug}.jpg`;

            if (person.image !== newPath) {
                person.image = newPath;
                updated = true;
                console.log(`Updated ${person.name} -> ${newPath}`);
            }
        });
    }

    if (updated) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
        console.log('\n✅ team.json updated successfully!');
        console.log('👉 Please place the image files in the corresponding folders under public/images/people/');
    } else {
        console.log('\nNo changes needed.');
    }
}

main();
