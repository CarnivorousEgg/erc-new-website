import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import galleryData from '../data/gallery.json';

const EventDetail = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    
    // Create slugs for matching
    const createSlug = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };
    
    // Find the event by slug
    const event = galleryData.events.find(e => createSlug(e.name) === id);
    
    if (!event) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen pt-24 px-4 container mx-auto pb-20 text-center"
            >
                <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The event you're looking for doesn't exist.
                </p>
                <Link
                    to="/events"
                    className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                    Back to Events
                </Link>
            </motion.div>
        );
    }

    // Generate sample gallery images (in real implementation, these would come from the JSON)
    // For now, using the main image with variations
    const galleryImages = [
        { id: 1, src: event.image, alt: `${event.name} - Image 1` },
        { id: 2, src: event.image.replace(/seed\/[^/]+/, 'seed/' + createSlug(event.name) + '-2'), alt: `${event.name} - Image 2` },
        { id: 3, src: event.image.replace(/seed\/[^/]+/, 'seed/' + createSlug(event.name) + '-3'), alt: `${event.name} - Image 3` },
        { id: 4, src: event.image.replace(/seed\/[^/]+/, 'seed/' + createSlug(event.name) + '-4'), alt: `${event.name} - Image 4` },
        { id: 5, src: event.image.replace(/seed\/[^/]+/, 'seed/' + createSlug(event.name) + '-5'), alt: `${event.name} - Image 5` },
        { id: 6, src: event.image.replace(/seed\/[^/]+/, 'seed/' + createSlug(event.name) + '-6'), alt: `${event.name} - Image 6` },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 px-4 container mx-auto pb-20"
        >
            {/* Back Button */}
            <Link
                to="/events"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Events
            </Link>

            {/* Event Header */}
            <header className="mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                >
                    {event.name}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 dark:text-gray-400"
                >
                    {event.description}
                </motion.p>
            </header>

            {/* Gallery Grid - Masonry-like layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((image, index) => (
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative overflow-hidden rounded-xl cursor-pointer ${
                            index === 0 ? 'col-span-2 row-span-2' : ''
                        }`}
                        onClick={() => setSelectedImage(image)}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-5xl max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                            >
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default EventDetail;
