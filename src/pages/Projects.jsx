import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../data/projects.json';
import { Link } from 'react-router-dom';

const Projects = () => {
    const [filter, setFilter] = useState('all');

    const filteredProjects = filter === 'all'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    const tabs = [
        { id: 'all', label: 'All Projects' },
        { id: 'completed', label: 'Completed' },
        { id: 'ongoing', label: 'Ongoing' },
        { id: 'mini', label: 'Mini Projects' },
    ];

    return (
        <div className="min-h-screen pt-24 px-4 container mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            >
                Our Projects
            </motion.h1>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === tab.id
                                ? 'bg-white text-black shadow-lg scale-105'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="group relative rounded-xl overflow-hidden bg-neutral-900 border border-white/10"
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                    <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 capitalize">
                                        {project.category}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                                <div className="flex gap-4">
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="text-sm text-white hover:text-blue-400 transition-colors underline"
                                    >
                                        View Details
                                    </Link>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        GitHub Repo
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Projects;
