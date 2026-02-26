import React from 'react';
import { motion } from 'framer-motion';

const InfiniteScroll = ({ items }) => {
    return (
        <div className="relative w-full overflow-hidden py-10 bg-neutral-900/50 dark:bg-neutral-900/50">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-8 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30,
                }}
            >
                {[...items, ...items].map((item, index) => (
                    <a
                        key={index}
                        href={item.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-4 min-w-[160px] group"
                    >
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-blue-500 transition-colors">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <span className="text-gray-400 group-hover:text-white font-medium transition-colors text-center">
                            {item.name}
                        </span>
                    </a>
                ))}
            </motion.div>
        </div>
    );
};

export default InfiniteScroll;
