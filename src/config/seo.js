/**
 * SEO Configuration for ERC Website
 * 
 * Controls per-page title, description, keywords, and Open Graph image.
 * Dynamic pages (ProjectDetail, EventDetail, etc.) use the `default` entry
 * as a fallback and are further customized in their page components.
 */

export const SITE_URL = 'https://ercbpgc.in';
export const SITE_NAME = 'ERC BITS Goa';
export const TWITTER_HANDLE = '@erc_bpgc';

export const DEFAULT_OG_IMAGE = '/images/erc-logo.png';

export const DEFAULT_KEYWORDS = 'ERC, ERC BITS Goa, ERC BPGC, Electronics and Robotics Club, BITS Pilani Goa, BITS Goa robotics, robotics club, electronics club, BPGC, erc bits goa, erc bpgc, robotics BITS Goa, college robotics India';

export const PAGE_SEO = {
    home: {
        title: 'ERC – Electronics and Robotics Club, BITS Goa',
        description:
            'The Electronics and Robotics Club (ERC) of BITS Pilani, Goa Campus. We build cutting-edge robots, host events, and push the boundaries of electronics and robotics research.',
        keywords: DEFAULT_KEYWORDS,
        ogImage: DEFAULT_OG_IMAGE,
    },
    projects: {
        title: 'Projects – ERC BITS Goa',
        description:
            'Explore innovative robotics and electronics projects built by ERC members — from drone automation and robotic arms to AI-driven systems.',
        keywords: `${DEFAULT_KEYWORDS}, robotics projects, drone automation, robotic arms, AI robots, student projects`,
        ogImage: DEFAULT_OG_IMAGE,
    },
    events: {
        title: 'Events – ERC BITS Goa',
        description:
            'Workshops, competitions, and outreach events organised by ERC BITS Goa throughout the year.',
        keywords: `${DEFAULT_KEYWORDS}, robotics workshops, robotics competitions, tech events, BITS Goa events`,
        ogImage: DEFAULT_OG_IMAGE,
    },
    about: {
        title: 'About Us – ERC BITS Goa',
        description:
            'Learn about the Electronics and Robotics Club of BITS Pilani, Goa Campus — our story, current team, alumni network, and how to reach us.',
        keywords: `${DEFAULT_KEYWORDS}, about ERC, ERC team, ERC alumni, BITS Goa clubs`,
        ogImage: '/images/events/inductions/cover.jpg',
    },
    blog: {
        title: 'Blog – ERC BITS Goa',
        description:
            'Technical articles, project write-ups, and insights from ERC BITS Goa members on robotics, electronics, and programming.',
        keywords: `${DEFAULT_KEYWORDS}, robotics blog, electronics tutorials, technical articles`,
        ogImage: DEFAULT_OG_IMAGE,
    },
    handbook: {
        title: 'Handbook – ERC BITS Goa',
        description:
            'The ERC Handbook: guides, tutorials, and resources on electronics, robotics, and programming curated by ERC members.',
        keywords: `${DEFAULT_KEYWORDS}, robotics handbook, electronics tutorials, programming guides, robotics resources`,
        ogImage: DEFAULT_OG_IMAGE,
    },
    notFound: {
        title: '404 – Page Not Found | ERC BITS Goa',
        description: 'The page you are looking for does not exist.',
        keywords: DEFAULT_KEYWORDS,
        ogImage: DEFAULT_OG_IMAGE,
    },
};
