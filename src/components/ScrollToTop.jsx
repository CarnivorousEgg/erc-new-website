import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Automatically scrolls to the top of the page when navigating to a new route
 * This fixes the issue where navigating to a new page opens at the bottom
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' // Instant scroll on route change
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
