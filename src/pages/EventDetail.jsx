import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import eventsData from '../data/events.json';
import galleryMedia from '../data/galleryMedia.json';
import Masonry from '../components/Masonry';

const EventDetail = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    
    // Find the event by id
    const event = eventsData.find(e => e.id === id);
    
    // Get gallery items from the generated gallery media data
    const masonryItems = useMemo(() => {
        const eventGallery = galleryMedia.events?.[id] || [];
        
        // If we have gallery media from the script, use it
        if (eventGallery.length > 0) {
            return eventGallery;
        }
        
        // Fallback to event.gallery if no generated data
        if (event?.gallery) {
            return event.gallery.map((src, index) => ({
                id: `${id}-${index + 1}`,
                img: src,
                type: 'image',
                title: `${event.name} - Photo ${index + 1}`,
                description: event.description || '',
                height: [300, 350, 400, 450, 500][Math.floor(Math.random() * 5)]
            }));
        }
        
        return [];
    }, [id, event]);
    
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
                    className="text-xl text-gray-600 dark:text-gray-400 mb-6"
                >
                    {event.fullDescription || event.description}
                </motion.p>
                
                {/* Event Meta Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-4 mb-6"
                >
                    {event.date && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {event.date}
                        </span>
                    )}
                    {event.location && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                        </span>
                    )}
                </motion.div>

                {/* Highlights */}
                {event.highlights && event.highlights.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-2"
                    >
                        {event.highlights.map((highlight, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                            >
                                {highlight}
                            </span>
                        ))}
                    </motion.div>
                )}
            </header>

            {/* Gallery Masonry Grid */}
            {masonryItems.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                    <Masonry
                        items={masonryItems}
                        ease="power3.out"
                        duration={0.6}
                        stagger={0.05}
                        animateFrom="bottom"
                        scaleOnHover={true}
                        hoverScale={0.97}
                        blurToFocus={true}
                        colorShiftOnHover={false}
                        onItemClick={(item) => {
                            if (item.type !== 'video') {
                                setSelectedImage({
                                    src: item.img,
                                    alt: item.title || item.description
                                });
                            }
                        }}
                    />
                </motion.div>
            ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <p>No gallery images available for this event yet.</p>
                </div>
            )}

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
