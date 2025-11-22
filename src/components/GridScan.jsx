import React from 'react';
import { motion } from 'framer-motion';

const GridScan = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Grid Background */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    opacity: 0.2
                }}
            />

            {/* Scanning Line */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
                style={{ height: '100%' }}
                animate={{
                    top: ['-100%', '100%'],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
    );
};

export default GridScan;
