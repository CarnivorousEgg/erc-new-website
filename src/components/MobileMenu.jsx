import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiChevronDown, FiX, FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import OptimizedImage from './OptimizedImage';

const menuItems = [
    {
        name: 'Home',
        path: '/',
        hasDropdown: false
    },
    {
        name: 'Projects',
        path: '/projects',
        hasDropdown: true,
        subItems: [
            { name: 'All Research Projects', path: '/projects' },
            { name: 'All Mini Projects', path: '/projects#mini' },
            { name: 'Ongoing', path: '/projects#ongoing' },
            { name: 'Completed', path: '/projects#completed' }
        ]
    },
    {
        name: 'Events',
        path: '/events',
        hasDropdown: false
    },
    {
        name: 'About Us',
        path: '/about',
        hasDropdown: true,
        subItems: [
            { name: 'Our Story', path: '/about#story' },
            { name: 'Current Team', path: '/about#team' },
            { name: 'Alumni', path: '/about#alumni' },
            { name: 'News', path: '/about#news' }
        ]
    },
    {
        name: 'Contact Us',
        path: '/about#contact',
        hasDropdown: false
    },
    {
        name: 'Blog',
        path: '/blog',
        hasDropdown: false
    },
    {
        name: 'Handbook',
        path: '/handbook',
        hasDropdown: false
    }
];

const socialLinks = [
    { icon: FaInstagram, href: 'https://www.instagram.com/erc_bitsgoa/', label: 'Instagram' },
    { icon: FaXTwitter, href: 'https://twitter.com/erc_bitsgoa', label: 'X (Twitter)' },
    { icon: FaLinkedin, href: 'https://in.linkedin.com/company/electronics-robotics-club-bits-goa', label: 'LinkedIn' },
    { icon: FaGithub, href: 'https://github.com/ERC-BPGC', label: 'GitHub' }
];

const MobileMenu = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItem, setExpandedItem] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setExpandedItem(null);
    }, [location.pathname, location.hash]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleNavigation = (path, hasDropdown, external) => {
        if (external) {
            window.open(path, '_blank', 'noopener,noreferrer');
            setIsOpen(false);
            return;
        }

        if (hasDropdown) {
            // Toggle dropdown
            setExpandedItem(expandedItem === path ? null : path);
        } else {
            // Always use navigate for consistent behavior
            navigate(path);
            setIsOpen(false);
        }
    };

    const handleSubItemClick = (path) => {
        // Always use navigate() - this ensures hash changes trigger route updates
        // which is needed for tab-based navigation like About page
        navigate(path);
        setIsOpen(false);
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        },
        open: {
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: -30 },
        open: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.4,
                ease: 'easeOut'
            }
        })
    };

    const dropdownVariants = {
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: 'easeInOut'
            }
        },
        open: {
            height: 'auto',
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: 'easeOut'
            }
        }
    };

    return (
        <>
            {/* Blurred backdrop behind the floating header */}
            <div className="fixed top-0 left-0 right-0 h-20 z-40 backdrop-blur-xl" />

            {/* Floating Header - No bar, just logo and menu */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 pointer-events-none"
            >
                {/* Logo */}
                <div 
                    onClick={() => {
                        navigate('/');
                        setIsOpen(false);
                    }}
                    className="cursor-pointer pointer-events-auto"
                >
                    <OptimizedImage 
                        src="/images/erc-logo.png" 
                        alt="ERC Logo" 
                        className="h-10 w-auto drop-shadow-lg"
                        eager={true}
                        style={{ height: '40px', width: 'auto' }}
                    />
                </div>

                {/* Hamburger/Close Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 rounded-full bg-blue-600 text-white shadow-lg pointer-events-auto"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </motion.div>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 z-40 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-y-auto"
                        style={{ paddingTop: '80px' }}
                    >

                        {/* Menu Content */}
                        <div className="flex flex-col min-h-full justify-between px-6 py-8">
                            {/* Main Navigation */}
                            <nav className="flex-1">
                                <ul className="space-y-2">
                                    {menuItems.map((item, index) => (
                                        <motion.li
                                            key={item.name}
                                            custom={index}
                                            variants={itemVariants}
                                            initial="closed"
                                            animate="open"
                                        >
                                            <button
                                                onClick={() => handleNavigation(item.path, item.hasDropdown, item.external)}
                                                className="w-full flex items-center justify-between py-4 text-left"
                                            >
                                                <span className="text-4xl font-bold text-white tracking-tight">
                                                    {item.name}
                                                </span>
                                                {item.hasDropdown && (
                                                    <motion.span
                                                        animate={{ rotate: expandedItem === item.path ? 180 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="text-white/80"
                                                    >
                                                        <FiChevronDown size={28} />
                                                    </motion.span>
                                                )}
                                            </button>

                                            {/* Dropdown Submenu */}
                                            <AnimatePresence>
                                                {item.hasDropdown && expandedItem === item.path && (
                                                    <motion.ul
                                                        variants={dropdownVariants}
                                                        initial="closed"
                                                        animate="open"
                                                        exit="closed"
                                                        className="overflow-hidden pl-4 border-l-2 border-white/30 ml-2"
                                                    >
                                                        {item.subItems.map((subItem) => (
                                                            <li key={subItem.name}>
                                                                <button
                                                                    onClick={() => handleSubItemClick(subItem.path)}
                                                                    className="w-full py-3 text-left text-xl text-white/80 hover:text-white transition-colors"
                                                                >
                                                                    {subItem.name}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </motion.ul>
                                                )}
                                            </AnimatePresence>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Bottom Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="mt-8 pt-6 border-t border-white/20"
                            >
                                {/* Animated Theme Toggle */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-white/80 text-lg font-medium">Theme</span>
                                    <button
                                        onClick={toggleTheme}
                                        className="relative w-16 h-8 rounded-full bg-white/20 flex items-center p-1 transition-colors"
                                        aria-label="Toggle theme"
                                    >
                                        <motion.div
                                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md"
                                            animate={{ x: theme === 'dark' ? 32 : 0 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={theme}
                                                    initial={{ rotate: -90, opacity: 0 }}
                                                    animate={{ rotate: 0, opacity: 1 }}
                                                    exit={{ rotate: 90, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {theme === 'dark' ? (
                                                        <FiMoon size={14} className="text-blue-600" />
                                                    ) : (
                                                        <FiSun size={14} className="text-yellow-500" />
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </motion.div>
                                    </button>
                                </div>

                                {/* Social Links */}
                                <div className="flex items-center justify-center gap-5">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                            aria-label={social.label}
                                        >
                                            <social.icon size={22} />
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileMenu;
