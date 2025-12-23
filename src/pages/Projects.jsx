import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../data/projects.json';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import BackToTop from '../components/BackToTop';

const Projects = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [filter, setFilter] = useState('research');

    React.useEffect(() => {
        // Check for query param filter (e.g., ?filter=completed)
        const queryFilter = searchParams.get('filter');
        // Also check for hash-based filter (e.g., #completed, #ongoing) for backwards compatibility
        const hash = location.hash.replace('#', '');
        
        if (queryFilter && ['research', 'mini', 'ongoing', 'completed'].includes(queryFilter)) {
            setFilter(queryFilter);
        } else if (hash && ['research', 'mini', 'ongoing', 'completed'].includes(hash)) {
            setFilter(hash);
        } else {
            setFilter('research');
        }
    }, [location.hash, searchParams]);

    // Filter projects based on selected tab
    const getSortedProjects = () => {
        if (filter === 'research') {
            // All research projects - ongoing first, then completed
            const ongoing = projectsData.filter(p => p.type === 'research' && p.category === 'ongoing');
            const completed = projectsData.filter(p => p.type === 'research' && p.category === 'completed');
            return [...ongoing, ...completed];
        }
        if (filter === 'mini') {
            // All mini projects
            return projectsData.filter(p => p.type === 'mini');
        }
        if (filter === 'ongoing') {
            // All ongoing projects (both research and mini)
            return projectsData.filter(p => p.category === 'ongoing');
        }
        if (filter === 'completed') {
            // All completed projects (both research and mini)
            return projectsData.filter(p => p.category === 'completed');
        }
        return projectsData;
    };

    const filteredProjects = getSortedProjects();

    const tabs = [
        { id: 'research', label: 'All Research Projects' },
        { id: 'mini', label: 'All Mini Projects' },
        { id: 'ongoing', label: 'Ongoing' },
        { id: 'completed', label: 'Completed' },
    ];

    // Determine which badge to show based on current filter
    const getBadge = (project) => {
        if (filter === 'research' || filter === 'mini') {
            // In type tabs, show status (ongoing/completed)
            return {
                text: project.category,
                colorClass: project.category === 'ongoing'
                    ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400'
                    : 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
            };
        } else {
            // In status tabs (ongoing/completed), show type (research/mini)
            return {
                text: project.type,
                colorClass: project.type === 'research'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                    : 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400'
            };
        }
    };

    const handleFilterChange = (filterId) => {
        setFilter(filterId);
        const hash = filterId === 'research' ? '' : `#${filterId}`;
        navigate(hash, { replace: true });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 px-4 container mx-auto pb-20"
        >
            <BackToTop />
            {/* Tabs */}
            <div className="hidden md:flex justify-center gap-4 mb-16 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleFilterChange(tab.id)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === tab.id
                            ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
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
                                        <div className="flex gap-1 flex-wrap justify-end">
                                            {(() => {
                                                const badge = getBadge(project);
                                                return (
                                                    <span className={`text-xs px-2 py-1 rounded capitalize ${badge.colorClass}`}>
                                                        {badge.text}
                                                    </span>
                                                );
                                            })()}
                                        </div>
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
