import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 py-8 mt-20 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            ERC BITS Goa
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Innovating the future, one robot at a time.</p>
                    </div>

                    <div className="flex gap-6">
                        <a href="https://github.com/ERC-BPGC" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-xl">
                            <FaGithub />
                        </a>
                        <a href="https://in.linkedin.com/company/electronics-robotics-club-bits-goa" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors text-xl">
                            <FaLinkedin />
                        </a>
                        <a href="https://www.instagram.com/erc_bitsgoa/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 transition-colors text-xl">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com/erc_bpgc" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-400 transition-colors text-xl">
                            <FaTwitter />
                        </a>
                    </div>
                </div>

                <div className="mt-6 text-center text-gray-500 text-sm flex flex-col gap-1">
                    <p>&copy; {new Date().getFullYear()} Electronics and Robotics Club, BITS Goa. All rights reserved.</p>
                    <p>Made with ❤️ Parth Jaju</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
