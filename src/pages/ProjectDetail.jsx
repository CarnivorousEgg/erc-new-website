import React from 'react';
import { useParams, Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowLeft } from 'react-icons/fa';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projectsData.find(p => p.id === id);

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
                        {/* Add more dummy text for detail view */}
                        <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    {project.team_leads && project.team_leads.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-4">Team Leads</h3>
                            <div className="flex flex-wrap gap-6">
                                {project.team_leads.map((lead, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-gray-100 dark:bg-white/5 p-3 rounded-xl border border-gray-200 dark:border-white/10">
                                        <img src={lead.image} alt={lead.name} className="w-12 h-12 rounded-full object-cover" />
                                        <div>
                                            <h4 className="font-bold">{lead.name}</h4>
                                            <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">
                                                LinkedIn
                                            </a>
                                        </div>
                                    </div>
                                ))}
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
        </div>
    );
};

export default ProjectDetail;
