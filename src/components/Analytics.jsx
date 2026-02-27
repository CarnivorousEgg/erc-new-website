import { Helmet } from 'react-helmet-async';
import { UMAMI_WEBSITE_ID, UMAMI_SCRIPT_URL } from '../config/analytics';

/**
 * Analytics component — injects the Umami Cloud tracking script.
 * 
 * Privacy-friendly: no cookies, GDPR-compliant, no consent banner needed.
 * SPA route changes are tracked automatically by the Umami script.
 * 
 * To disable: set UMAMI_WEBSITE_ID to '' in src/config/analytics.js
 */
const Analytics = () => {
    if (!UMAMI_WEBSITE_ID) return null;

    return (
        <Helmet>
            <script
                defer
                src={UMAMI_SCRIPT_URL}
                data-website-id={UMAMI_WEBSITE_ID}
            />
        </Helmet>
    );
};

export default Analytics;
