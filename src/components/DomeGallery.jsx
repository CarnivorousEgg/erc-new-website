import React from 'react';
import { motion } from 'framer-motion';

const DomeGallery = ({ items }) => {
    return (
        <div className="flex flex-wrap justify-center gap-6 p-8">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/20 cursor-pointer"
                    whileHover={{ scale: 1.1, borderColor: '#3b82f6' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                >
                    <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center p-2">
                            <span className="text-xs font-bold text-white">{item.name}</span>
                        </div>
                    </a>
                </motion.div>
            ))}
        </div>
    );
};

export default DomeGallery;
