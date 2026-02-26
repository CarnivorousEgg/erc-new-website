import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import galleryMedia from '../data/galleryMedia.json';
import teamData from '../data/team.json';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaArrowLeft, FaLinkedin, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Masonry from '../components/Masonry';

// Helper function to find team member by name
const findTeamMember = (name) => {
    // Search in current members
    const currentMember = teamData.current?.find(
        m => m.name.toLowerCase() === name.toLowerCase()
    );
    if (currentMember) return currentMember;
    
    // Search in project leads
    const projectLead = teamData.projectLeads?.find(
        m => m.name.toLowerCase() === name.toLowerCase()
    );
    if (projectLead) return projectLead;
    
    // Search in alumni
    const alumniMember = teamData.alumni?.find(
        m => m.name.toLowerCase() === name.toLowerCase()
    );
    return alumniMember;
};

// Map project IDs to gallery folder names
const PROJECT_FOLDER_MAP = {
    'robotic-arm-v2_done': 'robotic-arm',
    'robotic-arm-3dof_done': '3dof - arm',
    '8bit-computer_done': '8bit',
    'drone-automation': 'drone-auto',
    'desktop-companion-bot_done': 'chotubot',
    'stewart-platform': 'stewarts platform',
    'single-inverted-pendulum_done': 'inverted pendulum',
    'automated-orchestra_done': 'automated orchestra',
    'automated-dart-board_done': 'dartboard',
    'led-matrix_done': 'led matrix',
    'swarm-minions_done': 'swarm minions',
    'wall-e_done': 'walle'
};

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projectsData.find(p => p.id === id);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    
    // Get gallery items from the generated gallery media data
    const masonryItems = useMemo(() => {
        // Use mapped folder name if available
        let folderId = PROJECT_FOLDER_MAP[id];
        
        // If not in map, try removing _done suffix
        if (!folderId) {
            folderId = id.replace(/_done$/, '');
        }
        
        const projectGallery = galleryMedia.projects?.[folderId] || [];
        return projectGallery;
    }, [id]);

    const handleItemClick = (item) => {
        const index = masonryItems.findIndex(i => i.id === item.id);
        if (index !== -1) {
            setLightboxIndex(index);
            setLightboxOpen(true);
        }
    };

    const handlePrev = () => {
        setLightboxIndex((prev) => (prev - 1 + masonryItems.length) % masonryItems.length);
    };

    const handleNext = () => {
        setLightboxIndex((prev) => (prev + 1) % masonryItems.length);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') setLightboxOpen(false);
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
    };

    React.useEffect(() => {
        if (lightboxOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [lightboxOpen]);

    if (!project) {
        return <div className="pt-32 text-center">Project not found</div>;
    }

    // Determine the correct back link based on project type
    const backLink = project.type === 'mini' ? '/projects#mini' : '/projects';
    const backLabel = project.type === 'mini' ? 'Back to Mini Projects' : 'Back to Projects';

    return (
        <div className="min-h-screen pt-24 px-4 container mx-auto">
            <Link to={backLink} className="inline-flex items-center gap-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white mb-8 transition-colors">
                <FaArrowLeft /> {backLabel}
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-12"
            >
                <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 text-sm font-medium mb-6 capitalize">
                        {project.category}
                    </span>

                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                        {project.description}
                    </p>

                    {project.team_leads && project.team_leads.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-4">Team Leads</h3>
                            <div className="flex flex-wrap gap-6">
                                {project.team_leads.map((lead, index) => {
                                    const teamMember = findTeamMember(lead.name);
                                    const linkedinUrl = teamMember?.linkedin;
                                    const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(lead.name)}&background=3b82f6&color=fff&size=400&font-size=0.4`;
                                    
                                    const cardContent = (
                                        <div className={`flex items-center gap-4 bg-gray-100 dark:bg-white/5 p-3 rounded-xl border border-gray-200 dark:border-white/10 ${linkedinUrl ? 'hover:bg-gray-200 dark:hover:bg-white/10 cursor-pointer transition-colors' : ''}`}>
                                            <img src={imageUrl} alt={lead.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" decoding="async" />
                                            <h4 className="font-bold">{lead.name}</h4>
                                        </div>
                                    );
                                    
                                    return linkedinUrl ? (
                                        <a 
                                            key={index}
                                            href={linkedinUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            {cardContent}
                                        </a>
                                    ) : (
                                        <div key={index}>
                                            {cardContent}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors text-white font-medium"
                    >
                        <FaGithub className="text-xl" /> View Repository
                    </a>
                </div>
            </motion.div>

            {/* Project Gallery */}
            {masonryItems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 pb-20"
                >
                    <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {masonryItems.map((item, index) => (
                            <motion.div
                                key={item.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
                                onClick={() => handleItemClick(item)}
                            >
                                {item.type === 'video' ? (
                                    <video
                                        src={item.img}
                                        className="w-full h-full object-cover"
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                    />
                                ) : (
                                    <img
                                        src={item.img}
                                        alt={item.title || item.description || 'Gallery image'}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                )}
                                {/* Hover overlay removed as per user request */}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxOpen && masonryItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                        onClick={() => setLightboxOpen(false)}
                    >
                        {/* Close button */}
                        <button 
                            className="absolute top-4 right-4 text-white text-2xl p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                            onClick={() => setLightboxOpen(false)}
                        >
                            <FaTimes />
                        </button>

                        {/* Navigation arrows */}
                        {masonryItems.length > 1 && (
                            <>
                                <button 
                                    className="absolute left-4 text-white text-3xl p-3 hover:bg-white/10 rounded-full transition-colors z-10"
                                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                >
                                    <FaChevronLeft />
                                </button>
                                <button 
                                    className="absolute right-4 text-white text-3xl p-3 hover:bg-white/10 rounded-full transition-colors z-10"
                                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                >
                                    <FaChevronRight />
                                </button>
                            </>
                        )}

                        {/* Media (Image or Video) */}
                        {masonryItems[lightboxIndex]?.type === 'video' ? (
                            <motion.video
                                key={masonryItems[lightboxIndex]?.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                src={masonryItems[lightboxIndex]?.img}
                                controls
                                autoPlay
                                loop
                                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            <motion.img
                                key={masonryItems[lightboxIndex]?.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                src={masonryItems[lightboxIndex]?.img}
                                alt={masonryItems[lightboxIndex]?.title}
                                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            />
                        )}

                        {/* Media counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                            {lightboxIndex + 1} / {masonryItems.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetail;
