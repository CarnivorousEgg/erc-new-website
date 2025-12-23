import React from 'react';
import { motion } from 'framer-motion';

const ChromaGrid = ({ items }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 max-w-6xl mx-auto">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="block">
                        {/* Image Container */}
                        <div className="overflow-hidden rounded-lg aspect-square bg-neutral-800">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 md:grayscale md:group-hover:grayscale-0"
                            />
                            {/* Desktop overlay - only visible on hover on md+ */}
                            <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-end p-4 rounded-lg">
                                <h3 className="text-white font-bold text-lg">{item.name}</h3>
                                <p className="text-blue-400 text-sm">{item.role}</p>
                            </div>
                        </div>
                        {/* Mobile text below image */}
                        <div className="md:hidden mt-2 text-center">
                            <h3 className="text-gray-900 dark:text-white font-bold text-sm">{item.name}</h3>
                            <p className="text-blue-600 dark:text-blue-400 text-xs">{item.role}</p>
                        </div>
                    </a>
                </motion.div>
            ))}
        </div>
    );
};

export default ChromaGrid;
