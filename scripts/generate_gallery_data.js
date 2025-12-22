/**
 * Gallery Data Generator Script
 * 
 * This script scans the public/images folder structure and generates
 * JSON data for events and projects galleries.
 * 
 * Run with: node scripts/generate_gallery_data.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data');

// Supported media extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];

// Event descriptions for hover overlay
const EVENT_MEDIA_DESCRIPTIONS = {
    'open-day': {
        default: 'ERC Open Day - Showcasing innovative projects and demonstrations',
        images: {
            'DSC_0788.JPG': 'Members demonstrating robot capabilities to visitors',
            'DSC_0810.JPG': 'Hands-on experience with electronics projects',
            'DSC_0906.JPG': 'Interactive session with freshers',
            'DSC_0968.JPG': 'Project display booth at Open Day',
            'IMG_7573.JPG': 'Crowd gathered around robot demonstration',
            'IMG_7592.JPG': 'Students learning about embedded systems',
            'IMG_7606.JPG': 'ERC team members explaining project details',
            'IMG_7607.JPG': 'Live robot demo in action',
            'WhatsApp Image 2025-12-14 at 12.29.36 AM.jpeg': 'Group photo with event participants'
        }
    },
    'quark': {
        default: 'Quark Technical Festival - BITS Goa\'s annual tech fest',
        images: {}
    },
    'cte-techweekend': {
        default: 'CTE Techweekend - Technical workshops and competitions',
        images: {}
    },
    'qstp': {
        default: 'QSTP - Quark Summer Technical Projects',
        images: {}
    },
    'inductions': {
        default: 'ERC Inductions - Recruiting new talent',
        images: {}
    },
    'eduspark': {
        default: 'Eduspark - Educational outreach program',
        images: {
            'ef6acea7-a625-40c6-92e0-83c2fe176da1.mp4': 'Educational workshop in action',
            'IMG_5153.HEIC': 'Students learning robotics fundamentals',
            'IMG_5170.HEIC': 'Hands-on electronics session',
            'IMG_5178.HEIC': 'Interactive demonstration for students',
            'IMG_5185.HEIC': 'Group activity during workshop'
        }
    }
};

// Project media descriptions
const PROJECT_MEDIA_DESCRIPTIONS = {
    '8bit': {
        default: '8-Bit Computer Project - Custom built computer from scratch',
        images: {
            '8bit.JPG': 'Complete 8-bit computer assembly',
            '8bit2.JPG': 'Close-up of circuit board design',
            'DSC_0956.JPG': '8-bit computer on display'
        }
    },
    'spiderbot': {
        default: 'SpiderBot - Six-legged hexapod robot',
        images: {
            'cover.JPG': 'SpiderBot hexapod robot',
            'DSC_0951.JPG': 'SpiderBot hexapod in walking stance',
            'DSC_0988.JPG': 'SpiderBot leg mechanism detail',
            'DSC_7635.JPG': 'SpiderBot full assembly'
        }
    },
    'vulcan': {
        default: 'Vulcan - Humanoid head project',
        images: {
            'cover.JPG': 'Vulcan humanoid head',
            'DSC_7683.JPG': 'Vulcan face mechanism',
            'DSC_7693.JPG': 'Vulcan eye tracking system',
            'IMG_7606.JPG': 'Vulcan on display',
            'IMG_7607.JPG': 'Vulcan demonstration'
        }
    },
    'snakebot': {
        default: 'SnakeBot - Modular wheel-less robot',
        images: {
            'cover.JPG': 'SnakeBot modular robot',
            'DSC_0904.JPG': 'SnakeBot segments',
            'snakebot V2.jpeg': 'SnakeBot version 2'
        }
    },
    'quadruped': {
        default: 'Quadruped - 12 DoF four-legged robot',
        images: {
            'quadruped motor.jpeg': 'Quadruped motor assembly'
        }
    },
    'drone-auto': {
        default: 'Drone Automation - Autonomous drone project',
        images: {
            'cover.JPG': 'Drone automation project',
            'drone auto.jpeg': 'Drone in flight'
        }
    },
    'robotic-arm': {
        default: 'Robotic Arm v2 - 6 DoF robotic arm',
        images: {
            'cover.JPG': 'Robotic Arm v2',
            'DSC_0893.JPG': 'Robotic arm assembly',
            'IMG_7576.JPG': 'Robotic arm gripper',
            'arm gripper omza.jpeg': 'Arm gripper mechanism'
        }
    },
    'trotbot': {
        default: 'Trotbot - Omni-directional robot',
        images: {
            'cover.jpg': 'Trotbot omni-directional robot',
            'IMG_5158.jpg': 'Trotbot navigation',
            'IMG_5188.jpg': 'Trotbot in action'
        }
    },
    '3dof - arm': {
        default: 'Robotic Arm (3 DoF) - Three degree of freedom arm',
        images: {
            'cover.png': 'Robotic Arm 3 DoF',
            'arm gripper ansh.jpeg': 'Arm gripper design'
        }
    }
};

// Default heights for masonry layout based on orientation
const HORIZONTAL_HEIGHTS = [300, 350, 400];
const VERTICAL_HEIGHTS = [500, 550, 600, 650];
const SQUARE_HEIGHTS = [400, 450, 500];

function getRandomHeight(orientation = 'horizontal') {
    const heights = orientation === 'vertical' ? VERTICAL_HEIGHTS : 
                    orientation === 'square' ? SQUARE_HEIGHTS : HORIZONTAL_HEIGHTS;
    return heights[Math.floor(Math.random() * heights.length)];
}

// Get image dimensions using Node.js buffer reading (for JPG/PNG)
function getImageOrientation(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        let width = 0, height = 0;
        
        // Check for JPEG
        if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
            let offset = 2;
            while (offset < buffer.length) {
                if (buffer[offset] !== 0xFF) break;
                const marker = buffer[offset + 1];
                if (marker === 0xC0 || marker === 0xC2) {
                    height = buffer.readUInt16BE(offset + 5);
                    width = buffer.readUInt16BE(offset + 7);
                    break;
                }
                const len = buffer.readUInt16BE(offset + 2);
                offset += 2 + len;
            }
        }
        // Check for PNG
        else if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
            width = buffer.readUInt32BE(16);
            height = buffer.readUInt32BE(20);
        }
        
        if (width > 0 && height > 0) {
            const ratio = width / height;
            if (ratio > 1.2) return 'horizontal';
            if (ratio < 0.8) return 'vertical';
            return 'square';
        }
    } catch (error) {
        // If we can't read dimensions, default to horizontal
    }
    return 'horizontal';
}

function isImageFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
}

function isVideoFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return VIDEO_EXTENSIONS.includes(ext);
}

function isMediaFile(filename) {
    return isImageFile(filename) || isVideoFile(filename);
}

function scanFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        return [];
    }
    
    try {
        return fs.readdirSync(folderPath).filter(file => {
            const fullPath = path.join(folderPath, file);
            return fs.statSync(fullPath).isFile() && isMediaFile(file);
        });
    } catch (error) {
        console.error(`Error scanning folder ${folderPath}:`, error);
        return [];
    }
}

function generateEventGalleryData() {
    const eventsDir = path.join(IMAGES_DIR, 'events');
    const eventFolders = fs.readdirSync(eventsDir).filter(item => {
        const itemPath = path.join(eventsDir, item);
        return fs.statSync(itemPath).isDirectory();
    });

    const eventsGallery = {};

    eventFolders.forEach(eventId => {
        const eventDir = path.join(eventsDir, eventId);
        const files = scanFolder(eventDir);
        const descriptions = EVENT_MEDIA_DESCRIPTIONS[eventId] || { default: '', images: {} };

        eventsGallery[eventId] = files.map((file, index) => {
            const isVideo = isVideoFile(file);
            const publicPath = `/images/events/${eventId}/${encodeURIComponent(file)}`;
            const filePath = path.join(eventDir, file);
            const orientation = isVideo ? 'horizontal' : getImageOrientation(filePath);
            
            return {
                id: `${eventId}-${index + 1}`,
                img: publicPath,
                type: isVideo ? 'video' : 'image',
                title: file.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
                description: descriptions.images[file] || descriptions.default,
                height: getRandomHeight(orientation),
                orientation: orientation
            };
        });
    });

    return eventsGallery;
}

function generateProjectGalleryData() {
    const projectsDir = path.join(IMAGES_DIR, 'projects');
    
    if (!fs.existsSync(projectsDir)) {
        return {};
    }

    const projectFolders = fs.readdirSync(projectsDir).filter(item => {
        const itemPath = path.join(projectsDir, item);
        return fs.statSync(itemPath).isDirectory();
    });

    const projectsGallery = {};

    projectFolders.forEach(projectId => {
        const projectDir = path.join(projectsDir, projectId);
        const files = scanFolder(projectDir);
        const descriptions = PROJECT_MEDIA_DESCRIPTIONS[projectId] || { default: '', images: {} };

        projectsGallery[projectId] = files.map((file, index) => {
            const isVideo = isVideoFile(file);
            const publicPath = `/images/projects/${projectId}/${encodeURIComponent(file)}`;
            const filePath = path.join(projectDir, file);
            const orientation = isVideo ? 'horizontal' : getImageOrientation(filePath);
            
            return {
                id: `${projectId}-${index + 1}`,
                img: publicPath,
                type: isVideo ? 'video' : 'image',
                title: file.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
                description: descriptions.images[file] || descriptions.default,
                height: getRandomHeight(orientation),
                orientation: orientation
            };
        });
    });

    return projectsGallery;
}

function generateHomeVideosData() {
    const homeVideosDir = path.join(PUBLIC_DIR, 'Home-Videos');
    
    if (!fs.existsSync(homeVideosDir)) {
        return [];
    }

    const files = fs.readdirSync(homeVideosDir).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return VIDEO_EXTENSIONS.includes(ext);
    });

    return files.map(file => `/Home-Videos/${encodeURIComponent(file)}`);
}

function generateDomeGalleryData(eventsGallery, projectsGallery) {
    // For dome gallery, select only ONE unique image per event to avoid repetition
    const eventItems = Object.entries(eventsGallery)
        .filter(([_, items]) => items.length > 0)
        .map(([eventId, items]) => {
            // Only include images (not videos) in the dome gallery
            const images = items.filter(item => item.type === 'image');
            if (images.length === 0) return null;
            
            // Pick the first image as the representative for this event
            const coverImage = images[0];
            return {
                name: eventId.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' '),
                image: coverImage.img,
                description: coverImage.description || EVENT_MEDIA_DESCRIPTIONS[eventId]?.default || '',
                link: `/events/${eventId}`
            };
        })
        .filter(item => item !== null);

    // For projects, prefer cover images and select only ONE image per project to avoid repetition
    const projectItems = Object.entries(projectsGallery)
        .filter(([_, items]) => items.length > 0)
        .map(([projectId, items]) => {
            const images = items.filter(item => item.type === 'image');
            if (images.length === 0) return null;
            
            // Prefer cover image, otherwise take first image
            const coverImage = images.find(img => img.img.toLowerCase().includes('cover')) || images[0];
            return {
                name: projectId.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' '),
                image: coverImage.img,
                description: coverImage.description || PROJECT_MEDIA_DESCRIPTIONS[projectId]?.default || '',
                link: `/projects/${projectId}`
            };
        })
        .filter(item => item !== null);

    return {
        events: eventItems,
        projects: projectItems,
        alumni: [
            {
                name: "ERC Alumni",
                image: "/images/alumni.jpg",
                description: "Our proud alumni network",
                link: "/about"
            },
            {
                name: "ERC Alumni",
                image: "/images/alumni2.jpg",
                description: "Our proud alumni network",
                link: "/about"
            }
        ]
    };
}

function updateEventsCoverImages(eventsGallery) {
    const eventsJsonPath = path.join(OUTPUT_DIR, 'events.json');
    
    if (!fs.existsSync(eventsJsonPath)) {
        console.log('⚠️ events.json not found, skipping cover image update');
        return;
    }

    const eventsData = JSON.parse(fs.readFileSync(eventsJsonPath, 'utf-8'));
    let updated = false;

    eventsData.forEach(event => {
        const eventGallery = eventsGallery[event.id] || [];
        // Find the first image (not video) in the folder
        const firstImage = eventGallery.find(item => item.type === 'image');
        
        // Only update if the event has no image or has a placeholder/missing image
        if (firstImage && (!event.image || event.image === '' || event.image.includes('cover.jpg'))) {
            event.image = firstImage.img;
            updated = true;
            console.log(`   📷 ${event.id}: Set cover to ${firstImage.img}`);
        }
    });

    if (updated) {
        fs.writeFileSync(eventsJsonPath, JSON.stringify(eventsData, null, 4));
        console.log(`✅ Updated: ${eventsJsonPath}`);
    }
}

function main() {
    console.log('🔍 Scanning folders for media files...\n');

    // Generate gallery data
    const eventsGallery = generateEventGalleryData();
    const projectsGallery = generateProjectGalleryData();
    const homeVideos = generateHomeVideosData();
    const domeGallery = generateDomeGalleryData(eventsGallery, projectsGallery);

    // Print summary
    console.log('📸 Events Gallery:');
    Object.entries(eventsGallery).forEach(([event, items]) => {
        console.log(`   - ${event}: ${items.length} media files`);
    });

    console.log('\n🔧 Projects Gallery:');
    Object.entries(projectsGallery).forEach(([project, items]) => {
        console.log(`   - ${project}: ${items.length} media files`);
    });

    console.log(`\n🎬 Home Videos: ${homeVideos.length} videos`);
    homeVideos.forEach(video => console.log(`   - ${video}`));

    // Create output data
    const galleryMediaData = {
        events: eventsGallery,
        projects: projectsGallery,
        homeVideos: homeVideos
    };

    // Write gallery media data
    const galleryMediaPath = path.join(OUTPUT_DIR, 'galleryMedia.json');
    fs.writeFileSync(galleryMediaPath, JSON.stringify(galleryMediaData, null, 4));
    console.log(`\n✅ Generated: ${galleryMediaPath}`);

    // Update gallery.json for DomeGallery
    const galleryPath = path.join(OUTPUT_DIR, 'gallery.json');
    fs.writeFileSync(galleryPath, JSON.stringify(domeGallery, null, 4));
    console.log(`✅ Updated: ${galleryPath}`);

    // Update events.json with cover images
    console.log('\n📷 Updating event cover images:');
    updateEventsCoverImages(eventsGallery);

    console.log('\n🎉 Gallery data generation complete!');
}

main();
