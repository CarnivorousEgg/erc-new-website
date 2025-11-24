import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import ThemeToggle from './ThemeToggle';
import CardNav from './CardNav';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About Us', path: '/about' },
    { name: 'Handbook', path: 'https://erc-bpgc.github.io/handbook/' },
];

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [hoveredPath, setHoveredPath] = useState(location.pathname);
    const [isMobile, setIsMobile] = useState(false);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            localStorage.setItem('theme', 'dark');
            return 'dark';
        }
        return savedTheme;
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // CardNav configuration for mobile
    const cardNavItems = useMemo(() => [
        {
            label: "Home",
            bgColor: "#3b82f6", // Blue 500
            textColor: "#fff",
            links: [
                { label: "Home", ariaLabel: "Go to Home", href: "/" }
            ]
        },
        {
            label: "Projects",
            bgColor: "#1e40af", // Blue 700
            textColor: "#fff",
            links: [
                { label: "All Projects", ariaLabel: "View All Projects", href: "/projects" },
                { label: "Completed", ariaLabel: "Completed Projects", href: "/projects?filter=completed" },
                { label: "Ongoing", ariaLabel: "Ongoing Projects", href: "/projects?filter=ongoing" },
                { label: "Mini Projects", ariaLabel: "Mini Projects", href: "/projects?filter=mini" },
                { label: "Handbook", ariaLabel: "Handbook", href: "https://erc-bpgc.github.io/handbook/" }
            ]
        },
        {
            label: "About Us",
            bgColor: "#2563eb", // Blue 600
            textColor: "#fff",
            links: [
                { label: "Our Story", ariaLabel: "Our Story", href: "/about#story" },
                { label: "Current Team", ariaLabel: "Current Team", href: "/about#team" },
                { label: "Alumni", ariaLabel: "Alumni", href: "/about#alumni" },
                { label: "Outreach", ariaLabel: "Outreach", href: "/about#outreach" }
            ]
        },
        {
            label: "Theme Toggle",
            bgColor: "#60a5fa", // Blue 400
            textColor: "#fff",
            isCustom: true,
            component: <ThemeToggle className="" theme={theme} toggleTheme={toggleTheme} />
        }
    ], [theme, toggleTheme]);

    // Handle CardNav link clicks
    // Handle CardNav link clicks
    const handleCardNavLinkClick = (e, href) => {
        if (href && !href.startsWith('http')) {
            e.preventDefault();

            // Handle hash links
            if (href.includes('#')) {
                const [path, hash] = href.split('#');

                // If we're on the same page, just scroll
                if (location.pathname === path || (path === '/' && location.pathname === '/')) {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // Navigate to page then scroll (handled by useEffect in target page or hash link handler)
                    navigate(href);
                    // Small timeout to allow navigation to happen before scrolling
                    setTimeout(() => {
                        const element = document.getElementById(hash);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                }
            } else {
                navigate(href);
            }
        }
    };

    // Handle CardNav logo click
    const handleCardNavLogoClick = (e) => {
        e.preventDefault();
        navigate('/');
    };

    // Render CardNav on mobile
    if (isMobile) {
        return (
            <CardNav
                logo="/images/erc-logo.png"
                logoAlt="ERC Logo"
                items={cardNavItems}
                baseColor="rgba(255, 255, 255, 0.8)"
                menuColor="#000"
                buttonBgColor="#111"
                buttonTextColor="#fff"
                ease="power3.out"
                onLinkClick={handleCardNavLinkClick}
                onLogoClick={handleCardNavLogoClick}
                onThemeToggle={toggleTheme}
            />
        );
    }

    // Render regular navbar on desktop
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
            <Link
                to="/"
                className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-auto"
            >
                <img src="/images/erc-logo.png" alt="ERC Logo" className="h-12 w-auto hover:opacity-80 transition-opacity" />
            </Link>
            <div className="flex items-center gap-2 p-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 shadow-lg pointer-events-auto transition-colors duration-300">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const isExternal = item.path.startsWith('http');
                    const Component = isExternal ? 'a' : Link;
                    const props = isExternal
                        ? { href: item.path, target: "_blank", rel: "noopener noreferrer" }
                        : { to: item.path };

                    return (
                        <Component
                            key={item.path}
                            {...props}
                            onMouseEnter={() => setHoveredPath(item.path)}
                            onMouseLeave={() => setHoveredPath(location.pathname)}
                            className={cn(
                                "relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                                isActive ? "text-black dark:text-black" : "text-gray-700 dark:text-white hover:text-black dark:hover:text-white/80"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-black/5 dark:bg-white rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    style={{ zIndex: -1 }}
                                />
                            )}
                            {/* Target Cursor Effect Overlay (Simplified) */}
                            {hoveredPath === item.path && !isActive && (
                                <motion.div
                                    layoutId="nav-hover"
                                    className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    style={{ zIndex: -1 }}
                                />
                            )}
                            <span className="relative z-10">{item.name}</span>
                        </Component>
                    );
                })}
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
        </nav>
    );
};

export default Navbar;
