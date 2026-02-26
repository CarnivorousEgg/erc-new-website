import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import eventsData from '../data/events.json';
import galleryMedia from '../data/galleryMedia.json';
import BackToTop from '../components/BackToTop';

// Helper function to get a thumbnail image for an event
const getEventThumbnail = (event) => {
    // Check if event has a direct image path with file extension
    if (event.image && event.image.includes('.')) {
        return event.image;
    }
    
    // Try to get first image from galleryMedia
    const eventGallery = galleryMedia.events?.[event.id] || [];
    if (eventGallery.length > 0) {
        const firstImage = eventGallery.find(item => item.type === 'image');
        if (firstImage) return firstImage.img;
    }
    
    return null;
};

const Events = () => {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 px-4 container mx-auto pb-20"
        >
            <BackToTop />
            <header className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Events
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Explore our events, workshops, and activities that bring our robotics community together.
                </p>
            </header>

            {/* Events Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {eventsData.map((event, index) => {
                    const thumbnail = getEventThumbnail(event);
                    return (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                to={`/events/${event.id}`}
                                className="group block relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100 dark:bg-gray-800"
                            >
                                {/* Event Image or Placeholder */}
                                {thumbnail ? (
                                    <img
                                        src={thumbnail}
                                        alt={event.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                                
                                {/* Gradient Overlay - Always visible, darker for better text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                                
                                {/* Event Name - Always visible with enhanced hover */}
                                <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                                    <h3 className="text-xl font-bold text-white text-center mb-2">
                                        {event.name}
                                    </h3>
                                    <span className="mt-1 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                        View Details →
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Events;
