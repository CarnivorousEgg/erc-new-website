import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import ThemeToggle from './ThemeToggle';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About Us', path: '/about' },
];

const Navbar = () => {
    const location = useLocation();
    const [hoveredPath, setHoveredPath] = useState(location.pathname);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
            <div className="flex items-center gap-2 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onMouseEnter={() => setHoveredPath(item.path)}
                            onMouseLeave={() => setHoveredPath(location.pathname)}
                            className={cn(
                                "relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                                isActive ? "text-black" : "text-white hover:text-white/80"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    style={{ zIndex: -1 }}
                                />
                            )}
                            {/* Target Cursor Effect Overlay (Simplified) */}
                            {hoveredPath === item.path && !isActive && (
                                <motion.div
                                    layoutId="nav-hover"
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    style={{ zIndex: -1 }}
                                />
                            )}
                            <span className="relative z-10">{item.name}</span>
                        </Link>
                    );
                })}
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
