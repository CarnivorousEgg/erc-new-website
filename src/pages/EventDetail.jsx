import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import eventsData from '../data/events.json';
import galleryMedia from '../data/galleryMedia.json';

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

            {/* Hackathon Leaderboard Section */}
            {event.type === 'hackathon' && event.editions && event.editions.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold mb-6">Hackathon Results</h2>
                    
                    <div className="space-y-8">
                        {event.editions.map((edition) => (
                            <div key={edition.year} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {edition.year} Edition
                                        </h3>
                                        {edition.participants > 0 && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {edition.participants} teams participated
                                            </p>
                                        )}
                                    </div>
                                    <span className="mt-2 md:mt-0 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-medium">
                                        Official Results
                                    </span>
                                </div>
                                
                                {/* Problem Statement - Clickable Link */}
                                {edition.problemStatementLink && (
                                    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                        <a 
                                            href={edition.problemStatementLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group"
                                        >
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-medium">Problem Statement</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Click to view PDF →</p>
                                            </div>
                                        </a>
                                    </div>
                                )}

                                {/* Podium for top 3 */}
                                <div className="flex flex-col md:flex-row items-end justify-center gap-4 mb-8">
                                    {/* Second Place */}
                                    {edition.leaderboard[1] && (
                                        <div className="order-2 md:order-1 flex flex-col items-center">
                                            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mb-3">
                                                <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">2nd</span>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-gray-900 dark:text-white">{edition.leaderboard[1].teamName}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{edition.leaderboard[1].college}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Score: {edition.leaderboard[1].score}</p>
                                            </div>
                                            <div className="mt-3 w-24 h-20 bg-gray-300 dark:bg-gray-600 rounded-t-lg flex items-center justify-center">
                                                <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">2</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* First Place */}
                                    {edition.leaderboard[0] && (
                                        <div className="order-1 md:order-2 flex flex-col items-center">
                                            <div className="w-24 h-24 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-3 ring-4 ring-yellow-400">
                                                <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">1st</span>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-lg text-gray-900 dark:text-white">{edition.leaderboard[0].teamName}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{edition.leaderboard[0].college}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Score: {edition.leaderboard[0].score}</p>
                                            </div>
                                            <div className="mt-3 w-28 h-28 bg-yellow-400 dark:bg-yellow-600 rounded-t-lg flex items-center justify-center">
                                                <span className="text-3xl font-bold text-yellow-900">1</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Third Place */}
                                    {edition.leaderboard[2] && (
                                        <div className="order-3 flex flex-col items-center">
                                            <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-3">
                                                <span className="text-2xl font-bold text-orange-700 dark:text-orange-400">3rd</span>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-gray-900 dark:text-white">{edition.leaderboard[2].teamName}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{edition.leaderboard[2].college}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Score: {edition.leaderboard[2].score}</p>
                                            </div>
                                            <div className="mt-3 w-24 h-16 bg-orange-400 dark:bg-orange-600 rounded-t-lg flex items-center justify-center">
                                                <span className="text-2xl font-bold text-orange-900">3</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Full Leaderboard Table */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Rank</th>
                                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Team Name</th>
                                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">College</th>
                                                    <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Score</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {edition.leaderboard.map((team, idx) => (
                                                    <tr key={idx} className={`border-t border-gray-100 dark:border-gray-700 ${idx < 3 ? 'bg-gradient-to-r from-yellow-50/50 to-transparent dark:from-yellow-900/10' : ''}`}>
                                                        <td className="py-4 px-6">
                                                            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${idx === 0 ? 'bg-yellow-400 text-yellow-900' : idx === 1 ? 'bg-gray-300 text-gray-800' : idx === 2 ? 'bg-orange-400 text-orange-900' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                                                {team.rank}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                                                            {team.teamName}
                                                        </td>
                                                        <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                                                            {team.college}
                                                        </td>
                                                        <td className="py-4 px-6 text-right font-mono text-lg text-gray-700 dark:text-gray-300">
                                                            {team.score}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Gallery Grid - Only for non-hackathon events */}
            {event.type !== 'hackathon' && masonryItems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {masonryItems.map((item, index) => (
                            <motion.div
                                key={item.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
                                onClick={() => {
                                    if (item.type !== 'video') {
                                        setSelectedImage({
                                            src: item.img,
                                            alt: item.title || item.description
                                        });
                                    }
                                }}
                            >
                                {item.type === 'video' ? (
                                    <video
                                        src={item.img}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        muted
                                        loop
                                        playsInline
                                        onMouseEnter={(e) => e.target.play()}
                                        onMouseLeave={(e) => e.target.pause()}
                                    />
                                ) : (
                                    <img
                                        src={item.img}
                                        alt={item.title || item.description || 'Gallery image'}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                                {/* Hover overlay with description */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        {item.title && (
                                            <p className="text-white font-medium text-sm">{item.title}</p>
                                        )}
                                        {item.description && (
                                            <p className="text-gray-300 text-xs mt-1">{item.description}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
            
            {/* No gallery message - Only for non-hackathon events with no images */}
            {event.type !== 'hackathon' && masonryItems.length === 0 && (
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
