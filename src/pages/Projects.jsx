import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../data/projects.json';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import BackToTop from '../components/BackToTop';
import SEO from '../components/SEO';
import { PAGE_SEO } from '../config/seo';

const Projects = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [tab, setTab] = useState('research');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'ongoing', 'completed'

    React.useEffect(() => {
        const queryFilter = searchParams.get('filter');
        const hash = location.hash.replace('#', '');

        if (queryFilter && ['research', 'mini'].includes(queryFilter)) {
            setTab(queryFilter);
        } else if (hash && ['research', 'mini'].includes(hash)) {
            setTab(hash);
        } else if (hash === 'ongoing' || hash === 'completed') {
            // Backwards compatibility: map old status tabs to research + filter
            setTab('research');
            setStatusFilter(hash);
        } else {
            setTab('research');
        }
    }, [location.hash, searchParams]);

    // Filter projects based on selected tab and status filter
    const getSortedProjects = () => {
        let filtered = projectsData.filter(p => p.type === tab);

        if (statusFilter !== 'all') {
            filtered = filtered.filter(p => p.category === statusFilter);
        } else if (tab === 'research') {
            // When showing all research, put ongoing first
            const ongoing = filtered.filter(p => p.category === 'ongoing');
            const completed = filtered.filter(p => p.category === 'completed');
            filtered = [...ongoing, ...completed];
        }

        return filtered.sort((a, b) => {
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(b.date) - new Date(a.date);
        });
    };

    const filteredProjects = getSortedProjects();

    const tabs = [
        { id: 'research', label: 'All Research Projects' },
        { id: 'mini', label: 'All Mini Projects' },
    ];

    const statusOptions = [
        { id: 'all', label: 'All' },
        { id: 'ongoing', label: 'Ongoing' },
        { id: 'completed', label: 'Completed' },
    ];

    // Badge always shows status (ongoing/completed)
    const getBadge = (project) => {
        return {
            text: project.category,
            colorClass: project.category === 'ongoing'
                ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400'
                : 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
        };
    };

    const handleTabChange = (tabId) => {
        setTab(tabId);
        setStatusFilter('all');
        const hash = tabId === 'research' ? '' : `#${tabId}`;
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
            <SEO
                title={PAGE_SEO.projects.title}
                description={PAGE_SEO.projects.description}
                ogImage={PAGE_SEO.projects.ogImage}
                canonicalPath="/projects"
            />
            <BackToTop />
            {/* Tabs */}
            <div className="hidden md:flex flex-col items-center gap-4 mb-16">
                <div className="flex justify-center gap-4 flex-wrap">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => handleTabChange(t.id)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${tab === t.id
                                ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                {/* Status Filter */}
                <div className="flex gap-2">
                    {statusOptions.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => setStatusFilter(opt.id)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${statusFilter === opt.id
                                ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                : 'border-gray-300 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-white/40'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
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
                                        loading="lazy"
                                        decoding="async"
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
                                    {project.date && (
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">{project.date}</p>
                                    )}
                                    <p className="hidden md:block text-gray-600 dark:text-gray-400 text-sm mb-4">{project.description}</p>
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
