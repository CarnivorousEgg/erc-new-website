import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../data/projects.json';
import { Link, useLocation } from 'react-router-dom';

const Projects = () => {
    const location = useLocation();
    const [filter, setFilter] = useState('all');

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filterParam = params.get('filter');
        if (filterParam) {
            setFilter(filterParam);
        } else {
            setFilter('all');
        }
    }, [location.search]);

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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 px-4 container mx-auto pb-20"
        >
            {/* Tabs */}
            <div className="hidden md:flex justify-center gap-4 mb-16 flex-wrap">
                {tabs.map((tab) => (
                    <Link
                        key={tab.id}
                        to={tab.id === 'all' ? '/projects' : `/projects?filter=${tab.id}`}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === tab.id
                            ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
                            }`}
                    >
                        {tab.label}
                    </Link>
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
                            className="group relative"
                        >
                            {/* Underglow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>

                            <Link
                                to={`/projects/${project.id}`}
                                className="block relative rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none h-full transition-colors duration-300"
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
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 capitalize">
                                            {project.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{project.description}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default Projects;
