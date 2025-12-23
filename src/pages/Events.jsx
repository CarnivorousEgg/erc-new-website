import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import eventsData from '../data/events.json';

const Events = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 px-4 container mx-auto pb-20"
        >
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
                {eventsData.map((event, index) => (
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
                            {/* Event Image */}
                            <img
                                src={event.image}
                                alt={event.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            {/* Gradient Overlay - Always visible */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            
                            {/* Event Name - Always visible with enhanced hover */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                                <h3 className="text-xl font-bold text-white text-center mb-2">
                                    {event.name}
                                </h3>
                                <p className="text-sm text-gray-300 text-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                    {event.description}
                                </p>
                                <span className="mt-3 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    View Gallery →
                                </span>
                            </div>

                            {/* Corner badge */}
                            <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="w-4 h-4 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Events;
