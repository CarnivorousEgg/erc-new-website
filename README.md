# ERC BPGC Website

Official website of the **Electronics and Robotics Club (ERC)**, BITS Pilani, Goa Campus.

**Live:** [https://ercbpgc.in](https://ercbpgc.in)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Styling | TailwindCSS 3, custom CSS modules |
| Routing | React Router v6 |
| Animations | Framer Motion, GSAP |
| Markdown | React Markdown + KaTeX (math) + rehype (code highlighting) |
| Image Optimization | Sharp, custom Vite WebP plugin |
| Analytics | Umami (privacy-friendly) |
| Deployment | Vercel / Cloudflare Workers |

---

## Project Structure

```
erc-new-website/
├── public/                          # Static assets (served as-is)
│   ├── Home-Videos/                 # Hero section background videos
│   └── images/
│       ├── blog/                    # Blog article images (one folder per article)
│       ├── events/                  # Event gallery photos (one folder per event)
│       ├── handbook/                # Handbook article images
│       ├── people/                  # Team member photos (organized by batch year)
│       ├── projects/                # Project images (one folder per project)
│       └── spons/                   # Sponsor logos
│
├── src/
│   ├── App.jsx                      # Root component with route definitions
│   ├── main.jsx                     # React entry point
│   ├── index.css                    # Global styles + Tailwind imports
│   ├── components/                  # Reusable UI components
│   │   ├── Navbar.jsx               # Top navigation bar
│   │   ├── Footer.jsx               # Site footer with sponsor logos
│   │   ├── SponsorsTicker.jsx       # Auto-scrolling sponsor carousel
│   │   ├── DomeGallery.jsx          # Interactive circular gallery (homepage)
│   │   ├── Masonry.jsx              # Masonry gallery with lightbox
│   │   ├── AlumniTimeline.jsx       # Alumni section grouped by batch
│   │   ├── ChromaGrid.jsx           # Team member grid
│   │   ├── SEO.jsx                  # Per-page meta tags (Open Graph, etc.)
│   │   ├── Analytics.jsx            # Umami analytics tracker
│   │   ├── OptimizedImage.jsx       # Lazy-loading image wrapper
│   │   ├── OptimizedVideo.jsx       # Video with poster/fallback
│   │   └── ...                      # Other UI components
│   ├── config/
│   │   ├── seo.js                   # SEO metadata per route
│   │   └── analytics.js             # Analytics configuration
│   ├── data/                        # ⭐ ALL CONTENT LIVES HERE
│   │   ├── sponsors.json            # Sponsor entries
│   │   ├── team.json                # Current team + alumni
│   │   ├── projects.json            # Project listings
│   │   ├── events.json              # Event data + hackathon editions
│   │   ├── blogs.json               # Blog articles with sections
│   │   ├── news.json                # News ticker announcements
│   │   ├── gallery.json             # Gallery thumbnail data
│   │   ├── galleryMedia.json        # Full gallery images/videos (auto-generated)
│   │   └── handbook/                # Handbook articles (split by category)
│   │       ├── index.js             # Combines all handbook categories
│   │       ├── categories.json      # Category metadata (names, descriptions)
│   │       ├── automation.json      # Automation articles
│   │       ├── electronics.json     # Electronics articles
│   │       ├── mechanical.json      # Mechanical articles
│   │       ├── simulation.json      # Simulation articles
│   │       ├── roadmap.json         # Roadmap articles
│   │       ├── about.json           # About articles
│   │       └── misc.json            # Miscellaneous articles
│   ├── pages/                       # Route-level page components
│   │   ├── Home.jsx                 # Landing page
│   │   ├── Projects.jsx             # Project listing with filters
│   │   ├── ProjectDetail.jsx        # Individual project page
│   │   ├── Events.jsx               # Events listing
│   │   ├── EventDetail.jsx          # Individual event page
│   │   ├── Blog.jsx                 # Blog listing with search/filter
│   │   ├── BlogDetail.jsx           # Individual blog article
│   │   ├── Handbook.jsx             # Handbook category browser
│   │   ├── HandbookArticle.jsx      # Individual handbook article
│   │   ├── About.jsx                # About page (story, team, alumni, contact)
│   │   └── NotFound.jsx             # 404 page
│   └── utils/
│       └── cn.js                    # Classname utility
│
├── scripts/                         # Build & content management scripts
│   ├── generate_gallery_data.js     # Scans public/images/ → galleryMedia.json
│   ├── generate_thumbnails.js       # Creates .thumb.webp files for gallery
│   ├── optimize_images.js           # Batch convert images to WebP
│   ├── convert_to_webp.js           # WebP conversion with reference updates
│   ├── convert_handbook_to_json.js  # Markdown handbook → JSON
│   ├── clean_handbook_json.js       # Validate/clean handbook data
│   ├── structure_images.js          # Organize photos into folder hierarchy
│   ├── download_images.ps1          # Download people photos from GitHub
│   ├── download_handbook_images.ps1 # Download handbook images
│   ├── scrape_linkedin.js           # LinkedIn profile scraper (Puppeteer)
│   └── split_handbook.js            # One-time: split handbook.json by category
│
├── plugins/
│   └── vite-plugin-webp-convert.js  # Custom Vite plugin: post-build WebP conversion
│
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite config (React, image optimizer, WebP)
├── tailwind.config.js               # Tailwind theme (colors, fonts, dark mode)
├── postcss.config.js                # PostCSS config for Tailwind
├── vercel.json                      # Vercel SPA routing config
├── wrangler.jsonc                   # Cloudflare Workers config
└── index.html                       # HTML entry point
```

---

## Quick Start

```bash
# Install dependencies
yarn install

# Start dev server (http://localhost:5173)
yarn dev

# Production build (outputs to dist/)
yarn build

# Preview production build locally
yarn preview
```

---

## 📋 Content Update Guide

All website content is driven by JSON data files in `src/data/`. Most updates only require editing JSON files and adding images — no code changes needed.

> **After editing any data file**, the dev server hot-reloads instantly. For production, run `yarn build` and deploy.

---

### 1. Sponsors

**Data file:** `src/data/sponsors.json`
**Logo images:** `public/images/spons/`

#### To add a new sponsor:
1. Place the sponsor's logo in `public/images/spons/` (e.g., `new-sponsor.png`)
   - If the sponsor has separate light/dark mode logos, add both
2. Add an entry to `src/data/sponsors.json`:

```json
{
    "id": "sponsor-6",
    "name": "New Sponsor Name",
    "logo": "/images/spons/new-sponsor.png",
    "logoDark": "/images/spons/new-sponsor-dark.png",
    "website": "https://newsponsor.com/"
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier (e.g., `sponsor-6`) |
| `name` | Yes | Display name |
| `logo` | Yes | Path to logo image (used in light mode) |
| `logoDark` | No | Path to dark mode logo variant |
| `website` | Yes | Sponsor's website URL |

#### To remove a sponsor:
Delete the entry from the JSON array and optionally remove the logo file from `public/images/spons/`.

---

### 2. Gallery Images and Videos

Gallery media is organized into **events** and **projects**. The gallery data is auto-generated from the folder structure.

**Image folders:** `public/images/events/` and `public/images/projects/`
**Generated data:** `src/data/galleryMedia.json` (auto-generated)
**Thumbnail data:** `src/data/gallery.json`

#### To add event photos/videos:
1. Place images/videos in the event's folder under `public/images/events/<event-id>/`
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` (images), `.mp4`, `.webm`, `.mov` (videos)
   - Example: `public/images/events/open-day/new_photo.jpg`
2. Run the gallery data generator:
   ```bash
   node scripts/generate_gallery_data.js
   ```
   This scans all images and regenerates `src/data/galleryMedia.json`.

#### To add project photos/videos:
1. Place images in `public/images/projects/<project-id>/`
2. Run `node scripts/generate_gallery_data.js`

#### To add home page background videos:
1. Place `.mp4` files in `public/Home-Videos/`
2. The videos array in `src/pages/Home.jsx` (the `HOME_VIDEOS` constant) needs to be updated to include the new filename.

#### Gallery thumbnail (DomeGallery):
To update the circular gallery thumbnails shown on the homepage, edit `src/data/gallery.json`. Each entry links to a page:

```json
{
    "name": "Event Name",
    "image": "/images/events/event-id/photo.jpg",
    "description": "Short description",
    "link": "/events/event-id"
}
```

#### After adding new images:
- Run `node scripts/generate_gallery_data.js` to regenerate gallery data
- Run `node scripts/generate_thumbnails.js` to create optimized thumbnails
- Run `node scripts/optimize_images.js` to convert to WebP

---

### 3. News

**Data file:** `src/data/news.json`

News entries appear as a scrolling ticker on the homepage. To add a new entry:

```json
{
    "id": "mar-2026-1",
    "date": "Mar 2026",
    "content": "John Doe secured an internship at Boston Dynamics"
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique ID in format `mon-year-number` (e.g., `mar-2026-1`) |
| `date` | Yes | Display date (e.g., `Mar 2026`) |
| `content` | Yes | The news text (one sentence) |

> **Tip:** Add newest entries at the **top** of the array so they appear first.

---

### 4. Project Updates

**Data file:** `src/data/projects.json`
**Project images:** `public/images/projects/<project-id>/`

#### To add a new project:
1. Create an image folder: `public/images/projects/new-project/`
2. Add a cover image named `cover.jpg` (or `.JPG`, `.png`, etc.)
3. Add additional gallery images to the same folder
4. Add the project entry to `src/data/projects.json`:

```json
{
    "id": "new-project",
    "title": "New Project Name",
    "category": "ongoing",
    "type": "research",
    "image": "/images/projects/new-project/cover.jpg",
    "description": "Detailed project description...",
    "github": "https://github.com/ERC-BPGC/new-project",
    "team_leads": [
        { "name": "Lead Name 1" },
        { "name": "Lead Name 2" }
    ]
}
```

| Field | Required | Values |
|-------|----------|--------|
| `id` | Yes | Unique slug (lowercase, dashes). Use `_done` suffix for completed projects (e.g., `spiderbot_done`) |
| `title` | Yes | Display name |
| `category` | Yes | `"ongoing"` or `"completed"` |
| `type` | Yes | `"research"` or `"mini"` |
| `image` | Yes | Path to cover image |
| `description` | Yes | Full project description (supports rich text) |
| `github` | No | GitHub repository URL |
| `team_leads` | Yes | Array of `{ "name": "Name" }` objects |

#### To update an existing project:
- **Change status:** Update `"category"` from `"ongoing"` to `"completed"` and add `_done` suffix to `id`
- **Update description:** Edit the `"description"` field
- **Add images:** Drop images into `public/images/projects/<project-id>/` and run `node scripts/generate_gallery_data.js`
- **Update team leads:** Modify the `"team_leads"` array

#### Image folder mapping:
The project detail page maps project IDs to image folders. If the project `id` differs from the folder name, update the `PROJECT_FOLDER_MAP` object in `src/pages/ProjectDetail.jsx`.

---

### 5. Event Updates

**Data file:** `src/data/events.json`
**Event images:** `public/images/events/<event-id>/`

#### To add a new event:
1. Create image folder: `public/images/events/new-event/`
2. Add photos to that folder
3. Add event entry to `src/data/events.json`:

```json
{
    "id": "new-event",
    "name": "Event Name",
    "fullDescription": "Detailed description of the event...",
    "image": "/images/events/new-event/cover.jpg",
    "date": "Semester 1 (Annually)",
    "location": "BITS Pilani K K Birla Goa Campus",
    "highlights": [
        "Highlight 1",
        "Highlight 2",
        "Highlight 3"
    ]
}
```

#### To add a hackathon edition (ROS Hackathon):
Find the `erc-ros-hackathon` entry and add a new edition to the `editions` array:

```json
{
    "year": 2026,
    "problemStatementLink": "https://github.com/ERC-BPGC/...",
    "participants": 100,
    "leaderboard": [
        { "category": "Overall", "teamName": "Team A", "college": "College Name" },
        { "category": "Automation", "teamName": "Team B", "college": "College Name" },
        { "category": "Electrical", "teamName": "Team C", "college": "College Name" },
        { "category": "Mechanical", "teamName": "Team D", "college": "College Name" }
    ],
    "submissions": [
        { "teamName": "Team A", "submissionLink": "https://github.com/..." }
    ]
}
```

> Add newest editions at the **top** of the `editions` array.

#### After adding event images:
Run `node scripts/generate_gallery_data.js` to regenerate gallery media data.

---

### 6. Update Current Team and Alumni

**Data file:** `src/data/team.json`
**Photos:** `public/images/people/<Batch Year>/` (e.g., `2024 Batch/`)

The team file has three sections:
- `"current"` — Active team members (coordinators, heads)
- `"projectLeads"` — Current project leads
- `"alumni"` — Past members (grouped by batch)

#### To add a new team member:
1. Add their photo to `public/images/people/<YYYY> Batch/firstname_lastname.jpeg`
2. Add entry to the appropriate section in `src/data/team.json`:

**Current team member:**
```json
{
    "name": "Full Name",
    "role": "Role Title",
    "image": "/images/people/2024 Batch/firstname_lastname.jpeg",
    "linkedin": "https://www.linkedin.com/in/username/"
}
```

**Alumni entry (requires additional fields):**
```json
{
    "name": "Full Name",
    "role": "Previous Role (e.g., Chief Coordinator 2024-2025)",
    "batch": "2022 Batch",
    "currentWork": "Current position or company",
    "image": "/images/people/2022 Batch/firstname_lastname.jpeg",
    "linkedin": "https://www.linkedin.com/in/username/"
}
```

#### Annual team transition (end of year):
1. Move all `"current"` and `"projectLeads"` entries to `"alumni"`, adding `batch` and `currentWork` fields  
2. Add new team members to `"current"` and `"projectLeads"`
3. Create a new batch folder in `public/images/people/` (e.g., `2025 Batch/`) and add photos

> **Missing photos:** If a member's photo isn't available, you can use a placeholder URL like `https://ui-avatars.com/api/?name=First+Last&background=1e3a5f&color=fff&size=200`

---

### 7. Blog Section

**Data file:** `src/data/blogs.json`
**Cover images:** `public/images/blog/<article-id>/`

#### To add a new blog article:
1. Create an image folder: `public/images/blog/new-article/`
2. Add cover image and any section images
3. Add the article entry to `src/data/blogs.json`:

```json
{
    "id": "new-article-slug",
    "title": "Article Title",
    "excerpt": "Short 1-2 sentence summary shown in listing.",
    "author": {
        "name": "Author Name",
        "link": "https://www.linkedin.com/in/author/"
    },
    "date": "March 6, 2026",
    "readTime": "5 min",
    "categories": ["Robotics", "AI"],
    "coverImage": "/images/blog/new-article/cover.jpg",
    "sections": [
        {
            "title": "Introduction",
            "content": "Paragraph text with **bold**, *italic*, and [links](url).\n\nNew paragraphs use double newlines."
        },
        {
            "title": "Section with Image",
            "content": "Explanatory text for this section.",
            "image": {
                "src": "/images/blog/new-article/diagram.png",
                "caption": "Figure 1: Description of the image"
            }
        }
    ],
    "references": [
        {
            "text": "Author (Year). Paper title. Journal name.",
            "link": "https://doi.org/..."
        }
    ]
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | URL slug (lowercase, dashes) |
| `title` | Yes | Article title |
| `excerpt` | Yes | Short summary for listing page |
| `author` | Yes | Object with `name` and optional `link` |
| `date` | Yes | Publication date (e.g., `"March 6, 2026"`) |
| `readTime` | Yes | Estimated read time |
| `categories` | Yes | Array of tag strings (used for filtering) |
| `coverImage` | Yes | Path to cover image |
| `sections` | Yes | Array of content blocks (see below) |
| `references` | No | Academic citations |

**Section content** supports Markdown-like formatting: `**bold**`, `*italic*`, `[link text](url)`, `\n\n` for paragraphs, and numbered/bulleted lists.

---

### 8. Handbook Section

**Data files:** `src/data/handbook/` (one JSON file per category)
**Images:** `public/images/handbook/<category>/`

The handbook is organized into categories: **Roadmap**, **Automation**, **Electronics**, **Mechanical**, **Simulation**.

#### To add a new handbook article:
1. Choose the category file (e.g., `src/data/handbook/automation.json`)
2. Add a new article entry to the array:

```json
{
    "id": "unique-article-id",
    "title": "Article Title",
    "category": "automation",
    "subcategory": "ROS",
    "excerpt": "Brief description of the article content.",
    "content": [
        {
            "type": "heading",
            "value": "Section Heading"
        },
        {
            "type": "text",
            "value": "Paragraph text explaining the concept. Supports Markdown-like formatting."
        },
        {
            "type": "image",
            "value": "/images/handbook/automation/diagram.png",
            "caption": "Figure description"
        },
        {
            "type": "resources",
            "value": [
                { "name": "Resource Name", "url": "https://..." },
                { "name": "Tutorial Link", "url": "https://..." }
            ]
        }
    ]
}
```

**Content block types:**
| Type | Description |
|------|-------------|
| `heading` | Section heading text |
| `text` | Paragraph content (supports Markdown) |
| `image` | Image with `value` (path) and `caption` |
| `resources` | Array of `{ name, url }` link objects |

#### To add a new handbook category:
1. Create `src/data/handbook/newcategory.json` with an array of articles
2. Add category metadata to `src/data/handbook/categories.json`
3. Import and spread the new articles in `src/data/handbook/index.js`:
   ```js
   import newcategoryArticles from './newcategory.json';
   // ...
   const articles = [
     ...roadmapArticles,
     ...automationArticles,
     // ...
     ...newcategoryArticles
   ];
   ```

---

## Common Workflows

### Full content update cycle
```bash
# 1. Edit JSON data files in src/data/
# 2. Add any new images to public/images/

# 3. Regenerate gallery data (if images were added)
node scripts/generate_gallery_data.js

# 4. Generate thumbnails
node scripts/generate_thumbnails.js

# 5. (Optional) Optimize images to WebP
node scripts/optimize_images.js

# 6. Test locally
yarn dev

# 7. Build for production
yarn build
```

### Image optimization
```bash
# Convert all images to WebP (80% quality)
yarn optimize:images

# Force WebP conversion (re-process already converted)
yarn webp:convert:force

# Generate gallery thumbnails (200x200 WebP)
yarn thumbnails:generate
```

---

## Deployment

The site is deployed as a static SPA.

### Vercel
Push to the connected branch. Vercel auto-builds and deploys. Config: `vercel.json`.

### Cloudflare Workers
```bash
npx wrangler deploy
```
Config: `wrangler.jsonc`.

---

## 🔮 Future Work & TODO

### Yearly Event Memory Lane
Some events (Open Day, Quark, Eduspark, Inductions, Hackathon) happen every year. **Goal:** Add a scrollable yearly timeline/memory lane to each event detail page showing photos and highlights from each year, so visitors can browse through the history.

**Implementation plan:**
1. Organize event images by year: `public/images/events/<event-id>/<year>/`
2. Add a `years` array to each event in `events.json`:
   ```json
   {
       "id": "quark",
       "years": [
           { "year": 2025, "highlights": ["..."], "images": ["/images/events/quark/2025/photo1.jpg"] },
           { "year": 2024, "highlights": ["..."], "images": ["/images/events/quark/2024/photo1.jpg"] }
       ]
   }
   ```
3. Add a horizontal scroll timeline component to `EventDetail.jsx`

### More Blog Articles
- Add more technical blog posts covering club projects and research topics
- Potential topics: swarm robotics, embedded systems design, sensor fusion, reinforcement learning, etc.

### New Handbook Articles
- Add articles to existing categories (Automation, Electronics, Mechanical, Simulation)
- Potential topics: advanced ROS2 concepts, PCB design workflow, 3D printing guide, SLAM implementation
- See [Handbook Section](#8-handbook-section) above for how to add articles

### 2025 Quark Projects
- Add mini-projects built for Quark 2025 to `src/data/projects.json` with `"type": "mini"` and `"category": "completed"`
- Add their photos to `public/images/projects/<project-id>/`
- Run `node scripts/generate_gallery_data.js` after adding images

### Mobile-Friendly Redesign
The site is currently optimized for laptops and larger screens. A full mobile responsiveness pass is needed:
- **Layout fixes:** Several pages have layout issues on small screens (project grids, event galleries, handbook navigation)
- **Navigation:** The mobile menu (`MobileMenu.jsx`) needs UX improvements — desktop nav features don't all translate well to mobile
- **Feature parity:** Some desktop-only features (e.g., DomeGallery hover effects, masonry lightbox gestures) need mobile-specific alternatives or should be hidden on small screens
- **Touch interactions:** Replace hover-dependent interactions with tap/swipe equivalents
- **Performance:** Reduce image sizes and defer heavy animations on mobile to improve load times
- **Testing:** Test across common mobile viewports (iPhone SE, iPhone 14, Pixel 7, iPad)

### Other Ideas
- [ ] Integration with GitHub for live project stats (stars, last commit)
- [ ] Dark mode improvements for image galleries

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start dev server with hot reload |
| `yarn build` | Generate thumbnails + production build |
| `yarn preview` | Preview production build locally |
| `yarn lint` | Run ESLint |
| `yarn optimize:images` | Convert images to WebP |
| `yarn webp:convert` | WebP conversion with reference updates |
| `yarn webp:convert:force` | Force re-convert all images |
| `yarn thumbnails:generate` | Generate gallery thumbnails |
| `yarn scrape` | Run LinkedIn profile scraper |

---

## Contributing

1. Clone the repo and run `yarn install`
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes, test with `yarn dev`
4. Build to verify: `yarn build`
5. Commit and push your branch
6. Open a pull request

For content-only changes (updating JSON data files and adding images), no code review is strictly needed — just ensure the JSON is valid and the dev server renders correctly.
