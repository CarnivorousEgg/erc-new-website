import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Handbook', path: '/handbook' },
];

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [hoveredPath, setHoveredPath] = useState(location.pathname);
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
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

    // Scroll-based navbar visibility - only on homepage for desktop
    useEffect(() => {
        const handleScroll = () => {
            // Always show on mobile, or on non-home pages, or after scrolling 50px on desktop homepage
            if (isMobile || location.pathname !== '/') {
                setIsVisible(true);
            } else {
                setIsVisible(window.scrollY > 50);
            }
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname, isMobile]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Render new MobileMenu on mobile
    if (isMobile) {
        return (
            <MobileMenu theme={theme} toggleTheme={toggleTheme} />
        );
    }

    // Render regular navbar on desktop
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none"
                >
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
        </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
