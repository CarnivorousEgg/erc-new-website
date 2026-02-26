import React, { useState, useEffect } from 'react';
import './SponsorsTicker.css';

const SponsorsTicker = ({ sponsors }) => {
    // Triple the sponsors array to create seamless infinite scroll
    const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];
    
    // Track dark mode state
    const [isDark, setIsDark] = useState(false);
    
    useEffect(() => {
        // Check initial theme
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        
        checkDarkMode();
        
        // Watch for theme changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        return () => observer.disconnect();
    }, []);
    
    // Get the appropriate logo based on theme
    const getLogo = (sponsor) => {
        if (isDark && sponsor.logoDark) {
            return sponsor.logoDark;
        }
        return sponsor.logo;
    };

    return (
        <div className="sponsors-ticker-container">
            <div className="sponsors-ticker">
                {duplicatedSponsors.map((sponsor, index) => (
                    <a
                        key={`${sponsor.id}-${index}`}
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sponsor-item"
                        title={sponsor.name}
                    >
                        <img
                            src={getLogo(sponsor)}
                            alt={sponsor.name}
                            className="sponsor-logo"
                            loading="lazy"
                            decoding="async"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SponsorsTicker;
