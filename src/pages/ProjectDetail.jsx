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
    'desktop-companion-bot_done': 'choubot',
    'stewart-platform': 'stewarts platform',
    'single-inverted-pendulum_done': 'inverted pendulum',
    'automated-orchestra_done': 'automated orchestra',
    'automated-dart-board_done': 'dartboard',
    'led-matrix_done': 'led matrix',
    'swarm-minions_done': 'swarm minions'
};

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projectsData.find(p => p.id === id);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    
    // Get gallery items from the generated gallery media data
    const masonryItems = useMemo(() => {
        // Use mapped folder name if available, otherwise use the project id
        const folderId = PROJECT_FOLDER_MAP[id] || id;
        const projectGallery = galleryMedia.projects?.[folderId] || [];
        return projectGallery;
    }, [id]);

    // Filter only images for lightbox navigation
    const imageItems = useMemo(() => 
        masonryItems.filter(item => item.type === 'image'), 
        [masonryItems]
    );

    const handleItemClick = (item) => {
        if (item.type === 'image') {
            const index = imageItems.findIndex(img => img.id === item.id);
            if (index !== -1) {
                setLightboxIndex(index);
                setLightboxOpen(true);
            }
        }
    };

    const handlePrev = () => {
        setLightboxIndex((prev) => (prev - 1 + imageItems.length) % imageItems.length);
    };

    const handleNext = () => {
        setLightboxIndex((prev) => (prev + 1) % imageItems.length);
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

    return (
        <div className="min-h-screen pt-24 px-4 container mx-auto">
            <Link to="/projects" className="inline-flex items-center gap-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white mb-8 transition-colors">
                <FaArrowLeft /> Back to Projects
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
                                            <img src={imageUrl} alt={lead.name} className="w-12 h-12 rounded-full object-cover" />
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
                        onItemClick={handleItemClick}
                    />
                </motion.div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxOpen && imageItems.length > 0 && (
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
                        {imageItems.length > 1 && (
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

                        {/* Image */}
                        <motion.img
                            key={imageItems[lightboxIndex]?.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            src={imageItems[lightboxIndex]?.img}
                            alt={imageItems[lightboxIndex]?.title}
                            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                            {lightboxIndex + 1} / {imageItems.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetail;
