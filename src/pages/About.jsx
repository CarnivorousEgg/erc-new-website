
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import ChromaGrid from '../components/ChromaGrid';
import AlumniTimeline from '../components/AlumniTimeline';
import BackToTop from '../components/BackToTop';
import CurveDivider from '../components/CurveDivider';
import teamData from '../data/team.json';
import { FaLinkedin, FaInstagram, FaEnvelope, FaTwitter, FaCamera } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { cn } from '../utils/cn';

// Counter animation hook
const useCountUp = (end, duration = 2000, shouldStart = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldStart) return;

        let startTime;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldStart]);

    return count;
};

const tabs = [
    { id: 'story', label: 'Our Story' },
    { id: 'team', label: 'Current Team' },
    { id: 'alumni', label: 'Alumni' },
    { id: 'contact', label: 'Contact Us' }
];

const About = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('story');
    const [startCounters, setStartCounters] = useState(false);

    const years = useCountUp(15, 2000, startCounters);
    const projects = useCountUp(20, 2000, startCounters);
    const alumni = useCountUp(500, 2500, startCounters);

    // Handle URL hash for tabs
    useEffect(() => {
        const hash = location.hash.replace('#', '');
        // Support both #alumni and #year=2021 style hashes
        if (hash.startsWith('year=')) {
            // Alumni year hash - set tab to alumni
            setActiveTab('alumni');
        } else if (hash && tabs.find(t => t.id === hash)) {
            // Direct tab hash
            setActiveTab(hash);
        }
    }, [location.hash]);

    useEffect(() => {
        if (activeTab === 'story') {
            setStartCounters(true);
        }
    }, [activeTab]);

    // Handle tab change and update URL hash
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        navigate(`#${tabId}`, { replace: true });
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

            {/* Tab Navigation */}
            <div className="hidden md:flex flex-wrap justify-center gap-4 mb-16">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            activeTab === tab.id
                                ? "bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[400px]"
                >
                    {activeTab === 'story' && (
                        <section className="max-w-4xl mx-auto space-y-12">
                            <div>
                                <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                                    Our Story
                                </h1>
                                <div className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 text-left">
                                    <p>
                                        The Electronics and Robotics Club (ERC) of BITS Goa is a diverse group of students with interests ranging from electronics to machine learning to mechanical design. Founded in 2008, it is one of the oldest clubs on campus and has evolved into a platform to learn and experiment with various aspects of science and engineering and to apply them in robotics.
                                    </p>
                                    <p>
                                        This Club is a great place not only for electronics engineers but also mechanical enthusiasts and dynamic coders. We are organised into multiple teams working on a wide range of projects including hardware design, open source libraries and even full robots from scratch! Members are also encouraged to exchange experiences and expertise and we hold weekly discussion sessions, demonstrations and presentations for exactly that.
                                    </p>
                                    <p>
                                        Over the years, the Club has shifted its focus from competing in robotics competitions to taking on more research oriented projects and problem statements with real world applications. With robotics being a rapidly changing field, we strive to keep up with the latest developments in both research and industry while also learning about various subfields in detail. Apart from this, we frequently work on exhibition projects to display during the annual technical fest on the campus and other events throughout the year.
                                    </p>
                                    <p>
                                        We are open to anyone with a general interest in engineering and who wants to explore robotics, so feel free to get in touch with us.
                                    </p>
                                </div>
                            </div>

                            {/* Stats Counters */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="p-6 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                                    <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{years}+</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Years of Innovation</p>
                                </div>
                                <div className="p-6 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                                    <h3 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{projects}+</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Ongoing Projects</p>
                                </div>
                                <div className="p-6 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                                    <h3 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">{alumni}+</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Alumni Worldwide</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'team' && (
                        <section>
                            {/* Coordinators Section */}
                            <h2 className="text-4xl font-bold text-center mb-12">Coordinators</h2>
                            <ChromaGrid items={teamData.current} />
                            
                            {/* Curve Divider */}
                            <div className="my-16">
                                <CurveDivider variant={2} />
                            </div>
                            
                            {/* Project Leads Section */}
                            <h2 className="text-4xl font-bold text-center mb-12">Project Leads</h2>
                            <ChromaGrid items={teamData.projectLeads || []} />
                        </section>
                    )}

                    {activeTab === 'alumni' && (
                        <section className="w-full overflow-hidden">
                            <AlumniTimeline alumni={teamData.alumni} />
                        </section>
                    )}

                    {activeTab === 'contact' && (
                        <section className="w-full max-w-5xl mx-auto px-4">
                            {/* Headline */}
                            <div className="text-center mb-12">
                                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-blue-600 dark:text-blue-500">
                                    Don't Be A Stranger.
                                </h1>
                            </div>

                            {/* Stacked Bars */}
                            <div className="space-y-4">
                                {/* Instagram Bar */}
                                <a
                                    href="https://www.instagram.com/erc_bitsgoa/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block w-full py-6 md:py-10 px-6 md:px-10 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-400 hover:via-red-400 hover:to-yellow-400 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/30"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4 md:gap-6">
                                            {/* Instagram to Camera morph */}
                                            <div className="relative w-[30px] h-[30px] md:w-[48px] md:h-[48px]">
                                                <FaInstagram className="absolute inset-0 text-3xl md:text-5xl text-white transition-all duration-300 group-hover:opacity-0 group-hover:scale-50 group-hover:rotate-180" />
                                                <FaCamera className="absolute inset-0 text-3xl md:text-5xl text-white transition-all duration-300 opacity-0 scale-50 -rotate-180 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0" />
                                            </div>
                                            <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                                                The Gram
                                            </span>
                                        </div>
                                        <span className="text-sm md:text-base text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 hidden sm:flex items-center gap-2">
                                            Visual vibes only
                                            <span className="text-lg md:text-xl">→</span>
                                        </span>
                                    </div>
                                </a>

                                {/* LinkedIn Bar */}
                                <a
                                    href="https://in.linkedin.com/company/electronics-robotics-club-bits-goa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block w-full py-6 md:py-10 px-6 md:px-10 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4 md:gap-6">
                                            {/* LinkedIn rotates right */}
                                            <FaLinkedin className="text-3xl md:text-5xl text-white transition-transform duration-300 ease-out group-hover:rotate-12" />
                                            <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                                                The Network
                                            </span>
                                        </div>
                                        <span className="text-sm md:text-base text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 hidden sm:flex items-center gap-2">
                                            Professional connections
                                            <span className="text-lg md:text-xl">→</span>
                                        </span>
                                    </div>
                                </a>

                                {/* Twitter/X Bar */}
                                <a
                                    href="https://twitter.com/erc_bitsgoa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block w-full py-6 md:py-10 px-6 md:px-10 rounded-2xl bg-sky-500 hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-sky-500/30"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4 md:gap-6">
                                            {/* Bird squashed by X animation */}
                                            <div className="relative w-[30px] h-[30px] md:w-[48px] md:h-[48px]">
                                                <FaTwitter className="absolute inset-0 text-3xl md:text-5xl text-white transition-all duration-300 group-hover:scale-y-0 group-hover:opacity-0" />
                                                <FaXTwitter className="absolute inset-0 text-3xl md:text-5xl text-white transition-all duration-300 opacity-0 scale-150 group-hover:opacity-100 group-hover:scale-100" />
                                            </div>
                                            <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                                                <span className="inline group-hover:hidden">The Bird App</span>
                                                <span className="hidden group-hover:inline">Now It's X</span>
                                            </span>
                                        </div>
                                        <span className="text-sm md:text-base text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 hidden sm:flex items-center gap-2">
                                            Fast replies & updates
                                            <span className="text-lg md:text-xl">→</span>
                                        </span>
                                    </div>
                                </a>

                                {/* Email Bar */}
                                <a
                                    href="mailto:erc@goa.bits-pilani.ac.in"
                                    className="group block w-full py-6 md:py-10 px-6 md:px-10 rounded-2xl bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-900/30 dark:hover:shadow-white/20"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4 md:gap-6">
                                            {/* Email rotates left */}
                                            <FaEnvelope className="text-3xl md:text-5xl text-white dark:text-gray-900 transition-transform duration-300 ease-out group-hover:-rotate-12" />
                                            <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white dark:text-gray-900 uppercase tracking-tight">
                                                The Old School Way
                                            </span>
                                        </div>
                                        <span className="text-sm md:text-base text-white/80 dark:text-gray-600 group-hover:text-white dark:group-hover:text-gray-900 group-hover:translate-x-2 transition-all duration-300 hidden sm:flex items-center gap-2">
                                            Send us an email
                                            <span className="text-lg md:text-xl">→</span>
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </section>
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default About;
