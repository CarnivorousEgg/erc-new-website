import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, TWITTER_HANDLE, DEFAULT_KEYWORDS, CONTACT_EMAIL, OLD_DOMAIN } from '../config/seo';

/**
 * SEO component — manages <head> meta tags for each page.
 * 
 * Usage:
 *   <SEO
 *     title="Projects – ERC BITS Goa"
 *     description="Explore our robotics projects..."
 *     ogImage="/images/projects/cover.jpg"
 *     keywords="robotics projects, drones"
 *   />
 */
const SEO = ({
    title,
    description,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    canonicalPath = '',
    keywords = DEFAULT_KEYWORDS,
    jsonLd,
}) => {
    const fullTitle = title || SITE_NAME;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const ogImageUrl = ogImage?.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

    // Organization structured data
    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Electronics and Robotics Club, BITS Pilani Goa Campus',
        alternateName: ['ERC', 'ERC BITS Goa', 'ERC BPGC', 'The Robotics Club of BITS GOA'],
        url: SITE_URL,
        logo: `${SITE_URL}/images/erc-logo.png`,
        description: 'The Electronics and Robotics Club (ERC) of BITS Pilani, Goa Campus — the robotics club of BITS Goa.',
        email: CONTACT_EMAIL,
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'BITS Pilani K K Birla Goa Campus',
            addressLocality: 'Sancoale',
            addressRegion: 'Goa',
            postalCode: '403726',
            addressCountry: 'IN',
        },
        sameAs: [
            'https://www.instagram.com/erc_bitsgoa/',
            'https://github.com/ERC-BPGC',
            'https://in.linkedin.com/company/electronics-robotics-club-bits-goa',
            'https://x.com/ERC_BITS_Goa',
            `${OLD_DOMAIN}/`,
        ],
    };

    // WebSite structured data — helps Google understand site identity
    const websiteJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        alternateName: ['ERC', 'ERC BPGC', 'Electronics and Robotics Club BITS Goa'],
        url: SITE_URL,
    };

    // Page-level WebPage structured data
    const webPageJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: fullTitle,
        description,
        url: canonicalUrl,
        isPartOf: { '@type': 'WebSite', url: SITE_URL },
    };

    const structuredDataArray = jsonLd
        ? [jsonLd]
        : [organizationJsonLd, websiteJsonLd, webPageJsonLd];

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={TWITTER_HANDLE} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Structured Data — multiple JSON-LD blocks */}
            {structuredDataArray.map((data, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(data)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
