import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import './CloudDivider.css';

const Footer = () => {
    return (
        <>
            {/* Cloud Divider with Sitemap */}
            <div className="cloud-divider-section">
                {/* Wave Curve SVG Divider with blue accent */}
                <div className="cloud-divider">
                    <svg
                        className="cloud-svg"
                        viewBox="0 0 1440 100"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Main curve fill */}
                        <path
                            className="cloud-path"
                            d="M0,0 L0,60 Q360,100 720,60 Q1080,20 1440,60 L1440,0 Z"
                        />
                        {/* Blue accent line */}
                        <path
                            className="cloud-accent"
                            d="M0,60 Q360,100 720,60 Q1080,20 1440,60"
                            fill="none"
                            strokeWidth="3"
                        />
                    </svg>
                </div>

                {/* Footer Content */}
                <div className="sitemap-container">
                    <div className="container mx-auto px-4 py-12">
                        <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-8">
                            {/* Left side - Quick Links */}
                            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">Quick Links</h4>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <Link to="/" className="sitemap-link">Home</Link>
                                    <Link to="/projects" className="sitemap-link">Projects</Link>
                                    <Link to="/events" className="sitemap-link">Events</Link>
                                    <Link to="/about" className="sitemap-link">About Us</Link>
                                    <Link to="/about#contact" className="sitemap-link font-medium text-blue-500 hover:text-blue-400">Contact Us</Link>
                                </div>
                            </div>

                            {/* Right side - ERC Info and Social Links */}
                            <div className="text-center md:text-right">
                                <h3 className="text-2xl font-bold text-blue-500">
                                    Electronics and Robotics Club
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">Innovating the future, one robot at a time.</p>
                                
                                <div className="flex items-center justify-center md:justify-end">
                                    <div className="flex gap-4">
                                        <a href="https://github.com/ERC-BPGC" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:opacity-70 transition-opacity text-xl">
                                            <FaGithub />
                                        </a>
                                        <a href="https://in.linkedin.com/company/electronics-robotics-club-bits-goa" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:opacity-70 transition-opacity text-xl">
                                            <FaLinkedin />
                                        </a>
                                        <a href="https://www.instagram.com/erc_bitsgoa/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:opacity-70 transition-opacity text-xl">
                                            <FaInstagram />
                                        </a>
                                        <a href="https://twitter.com/erc_bpgc" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:opacity-70 transition-opacity text-xl">
                                            <FaTwitter />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Copyright section - integrated into cloud theme */}
                    <div className="footer-credits">
                        <div className="container mx-auto px-4 py-6">
                            <div className="text-center text-gray-400 dark:text-gray-500 text-sm flex flex-col gap-1">
                                <p>&copy; {new Date().getFullYear()} Electronics and Robotics Club, BITS Goa. All rights reserved.</p>
                                <p>Made with ❤️ Parth Jaju</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
