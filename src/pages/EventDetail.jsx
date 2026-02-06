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
                            <div key={edition.year} className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
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
                                </div>
                                
                                {/* Hackathon Links */}
                                {edition.problemStatementLink && (
                                    <div className="mb-6">
                                        <a 
                                            href={edition.problemStatementLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 transition-all group hover:shadow-md inline-flex items-center gap-3 w-full md:w-auto"
                                        >
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 dark:text-white">Problem Statement</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Click to view GitHub →</p>
                                            </div>
                                        </a>
                                    </div>
                                )}

                                {/* Team Submissions */}
                                {edition.submissions && edition.submissions.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Team Submissions</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {edition.submissions.map((submission, idx) => (
                                                <a
                                                    key={idx}
                                                    href={submission.submissionLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 transition-all group hover:shadow-md flex items-center gap-2"
                                                >
                                                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                    </svg>
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                        {submission.teamName}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Category Winners Table */}
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-100 dark:bg-gray-800">
                                                <tr>
                                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-200">Category</th>
                                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-200">Team Name</th>
                                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-200">College</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-gray-800">
                                                {edition.leaderboard.map((team, idx) => (
                                                    <tr key={idx} className={`border-t border-gray-200 dark:border-gray-700 ${team.category === 'Overall' ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}>
                                                        <td className="py-4 px-6">
                                                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${team.category === 'Overall' ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950' : team.category === 'Automation' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : team.category === 'Electrical' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-950' : team.category === 'Mechanical' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                                                                {team.category}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                                                            {team.teamName}
                                                        </td>
                                                        <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                                                            {team.college}
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
                                        className="w-full h-full object-cover"
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={item.img}
                                        alt={item.title || item.description || 'Gallery image'}
                                        className="w-full h-full object-cover"
                                    />
                                )}
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
