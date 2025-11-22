import React from 'react';
import { motion } from 'framer-motion';

const ChromaGrid = ({ items }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    className="relative group overflow-hidden rounded-lg aspect-square bg-neutral-800"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white font-bold text-lg">{item.name}</h3>
                        <p className="text-blue-400 text-sm">{item.role}</p>
                        <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 hover:text-white mt-1 underline">
                            LinkedIn
                        </a>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ChromaGrid;
