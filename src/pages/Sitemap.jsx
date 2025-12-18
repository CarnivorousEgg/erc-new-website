import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Sitemap.css';

const Sitemap = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen py-20 px-4"
        >
            <div className="container mx-auto max-w-6xl">
                {/* Title */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-blue-500">ERC</span> Site Map
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Navigate through our website
                    </p>
                </div>

                {/* Flowchart Sitemap */}
                <div className="sitemap-flowchart">
                    {/* Connector line from title */}
                    <div className="sitemap-connector vertical"></div>
                    <div className="sitemap-connector-wrapper">
                        <div className="sitemap-connector horizontal-spread"></div>
                    </div>

                    {/* Level 2: Main Sections */}
                    <div className="sitemap-level level-2">
                        <div className="sitemap-branch">
                            <div className="branch-connector"></div>
                            <Link to="/" className="sitemap-node node-secondary">
                                <span className="node-text">Home</span>
                            </Link>
                            <div className="sitemap-connector vertical-small"></div>
                            <div className="sitemap-children">
                                <div className="sitemap-node node-tertiary">
                                    <span className="node-text">What We Do</span>
                                </div>
                                <div className="sitemap-node node-tertiary">
                                    <span className="node-text">Sponsors</span>
                                </div>
                                <div className="sitemap-node node-tertiary">
                                    <span className="node-text">ERC Gallery</span>
                                </div>
                            </div>
                        </div>

                        <div className="sitemap-branch">
                            <div className="branch-connector"></div>
                            <Link to="/about" className="sitemap-node node-secondary">
                                <span className="node-text">About Us</span>
                            </Link>
                            <div className="sitemap-connector vertical-small"></div>
                            <div className="sitemap-children">
                                <div className="sitemap-node node-tertiary">
                                    <span className="node-text">Our Story</span>
                                </div>
                                <div className="sitemap-node node-tertiary">
                                    <span className="node-text">Team</span>
                                </div>
                                <div className="sitemap-node node-tertiary">
                                    <span className="node-text">Alumni</span>
                                </div>
                                <div className="sitemap-node node-tertiary">
                                    <span className="node-text">Contact Us</span>
                                </div>
                            </div>
                        </div>

                        <div className="sitemap-branch">
                            <div className="branch-connector"></div>
                            <Link to="/projects" className="sitemap-node node-secondary">
                                <span className="node-text">Projects</span>
                            </Link>
                            <div className="sitemap-connector vertical-small"></div>
                            <div className="sitemap-children">
                                <div className="sitemap-node node-tertiary">
                                    <span className="node-text">Ongoing</span>
                                </div>
                                <div className="sitemap-node node-tertiary">
                                    <span className="node-text">Completed</span>
                                </div>
                                <div className="sitemap-node node-tertiary">
                                    <span className="node-text">Mini</span>
                                </div>
                            </div>
                        </div>

                        <div className="sitemap-branch">
                            <div className="branch-connector"></div>
                            <Link to="/events" className="sitemap-node node-secondary">
                                <span className="node-text">Events</span>
                            </Link>
                            <div className="sitemap-connector vertical-small"></div>
                            <div className="sitemap-children">
                                <Link to="/events/open-day" className="sitemap-node node-tertiary">
                                    <span className="node-text">Open Day</span>
                                </Link>
                                <Link to="/events/quark" className="sitemap-node node-tertiary">
                                    <span className="node-text">Quark</span>
                                </Link>
                                <Link to="/events/cte-techweekend" className="sitemap-node node-tertiary">
                                    <span className="node-text">CTE Tech Weekend</span>
                                </Link>
                                <Link to="/events/eduspark" className="sitemap-node node-tertiary">
                                    <span className="node-text">EduSpark</span>
                                </Link>
                                <Link to="/events/qstp" className="sitemap-node node-tertiary">
                                    <span className="node-text">QSTP</span>
                                </Link>
                                <Link to="/events/inductions" className="sitemap-node node-tertiary">
                                    <span className="node-text">Inductions</span>
                                </Link>
                            </div>
                        </div>

                        <div className="sitemap-branch">
                            <div className="branch-connector"></div>
                            <div className="sitemap-node node-secondary">
                                <span className="node-text">Resources</span>
                            </div>
                            <div className="sitemap-connector vertical-small"></div>
                            <div className="sitemap-children">
                                <a href="https://github.com/ERC-BPGC" target="_blank" rel="noopener noreferrer" className="sitemap-node node-tertiary">
                                    <span className="node-text">GitHub</span>
                                </a>
                                <a href="https://erc-bpgc.github.io/handbook/" target="_blank" rel="noopener noreferrer" className="sitemap-node node-tertiary">
                                    <span className="node-text">Handbook</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Sitemap;
