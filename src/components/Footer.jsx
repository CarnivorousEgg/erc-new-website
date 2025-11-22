import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 py-12 mt-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            ERC BITS Goa
                        </h3>
                        <p className="text-gray-400 mt-2">Innovating the future, one robot at a time.</p>
                    </div>

                    <div className="flex gap-6">
                        <a href="https://github.com/ERC-BPGC" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xl">
                            <FaGithub />
                        </a>
                        <a href="https://in.linkedin.com/company/electronics-robotics-club-bits-goa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors text-xl">
                            <FaLinkedin />
                        </a>
                        <a href="https://www.instagram.com/erc_bitsgoa/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors text-xl">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com/erc_bpgc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors text-xl">
                            <FaTwitter />
                        </a>
                        <a href="https://www.facebook.com/ElectronicsAndRoboticsClub/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors text-xl">
                            <FaFacebook />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Electronics and Robotics Club, BITS Goa. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
