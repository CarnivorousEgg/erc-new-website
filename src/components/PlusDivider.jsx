import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PlusItem = () => {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div
            className="relative w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => setIsClicked(!isClicked)}
        >
            <motion.div
                className="text-gray-500 text-2xl font-light select-none"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
            >
                +
            </motion.div>

            {/* Circle Animation on Click */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    fill="transparent"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isClicked ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
};

const PlusDivider = ({ className = "" }) => {
    return (
        <div className={`flex justify-between items-center w-full py-8 overflow-hidden ${className}`}>
            {[...Array(12)].map((_, i) => (
                <PlusItem key={i} />
            ))}
        </div>
    );
};

export default PlusDivider;
