import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ className = "ml-4", theme, toggleTheme }) => {
    // State lifted to parent


    return (
        <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 transition-colors ${className}`}
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'dark' ? (
                    <FaMoon className="text-yellow-400" />
                ) : (
                    <FaSun className="text-orange-400" />
                )}
            </motion.div>
        </button>
    );
};

export default ThemeToggle;
