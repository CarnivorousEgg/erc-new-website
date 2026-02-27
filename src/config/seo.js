/**
 * SEO Configuration for ERC Website
 * 
 * Controls per-page title, description, and Open Graph image.
 * Dynamic pages (ProjectDetail, EventDetail, etc.) use the `default` entry
 * as a fallback and are further customized in their page components.
 */

export const SITE_URL = 'https://erc-bpgc.github.io'; // Update to production URL
export const SITE_NAME = 'ERC BITS Goa';

export const DEFAULT_OG_IMAGE = '/images/og-default.jpg'; // Create this image in public/images/

export const PAGE_SEO = {
    home: {
        title: 'ERC – Electronics and Robotics Club, BITS Goa',
        description:
            'The Electronics and Robotics Club (ERC) of BITS Goa. We build cutting-edge robots, host events, and push the boundaries of electronics and robotics research.',
        ogImage: DEFAULT_OG_IMAGE,
    },
    projects: {
        title: 'Projects – ERC BITS Goa',
        description:
            'Explore innovative robotics and electronics projects built by ERC members — from drone automation and robotic arms to AI-driven systems.',
        ogImage: DEFAULT_OG_IMAGE,
    },
    events: {
        title: 'Events – ERC BITS Goa',
        description:
            'Workshops, competitions, and outreach events organised by ERC BITS Goa throughout the year.',
        ogImage: DEFAULT_OG_IMAGE,
    },
    about: {
        title: 'About Us – ERC BITS Goa',
        description:
            'Learn about the Electronics and Robotics Club of BITS Goa — our story, current team, alumni network, and how to reach us.',
        ogImage: '/images/events/inductions/cover.jpg',
    },
    blog: {
        title: 'Blog – ERC BITS Goa',
        description:
            'Technical articles, project write-ups, and insights from ERC BITS Goa members.',
        ogImage: DEFAULT_OG_IMAGE,
    },
    handbook: {
        title: 'Handbook – ERC BITS Goa',
        description:
            'The ERC Handbook: guides, tutorials, and resources on electronics, robotics, and programming curated by ERC members.',
        ogImage: DEFAULT_OG_IMAGE,
    },
    notFound: {
        title: '404 – Page Not Found | ERC BITS Goa',
        description: 'The page you are looking for does not exist.',
        ogImage: DEFAULT_OG_IMAGE,
    },
};
