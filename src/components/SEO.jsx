import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '../config/seo';

/**
 * SEO component — manages <head> meta tags for each page.
 * 
 * Usage:
 *   <SEO
 *     title="Projects – ERC BITS Goa"
 *     description="Explore our robotics projects..."
 *     ogImage="/images/projects/cover.jpg"
 *   />
 */
const SEO = ({
    title,
    description,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    canonicalPath = '',
}) => {
    const fullTitle = title || SITE_NAME;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const ogImageUrl = ogImage?.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />
        </Helmet>
    );
};

export default SEO;
