import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Check if the device supports hover (not a touch-only device)
const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

const SpotlightCard = ({ children, className = "" }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!canHover || !divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        if (!canHover) return;
        setOpacity(1);
    };

    const handleBlur = () => {
        if (!canHover) return;
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        if (!canHover) return;
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        if (!canHover) return;
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-xl border border-transparent dark:border-white/10 bg-white dark:bg-neutral-900/50 px-8 py-16 shadow-lg dark:shadow-2xl ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--spotlight-color), transparent 40%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default SpotlightCard;
