
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import ChromaGrid from '../components/ChromaGrid';
import AlumniTimeline from '../components/AlumniTimeline';
import BackToTop from '../components/BackToTop';
import teamData from '../data/team.json';
import { FaLinkedin, FaInstagram, FaEnvelope, FaTwitter } from 'react-icons/fa';
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
                            <h2 className="text-4xl font-bold text-center mb-12">Current Team</h2>
                            <ChromaGrid items={teamData.current} />
                        </section>
                    )}

                    {activeTab === 'alumni' && (
                        <section className="w-full overflow-hidden">
                            <AlumniTimeline alumni={teamData.alumni} />
                        </section>
                    )}

                    {activeTab === 'contact' && (
                        <section className="w-full max-w-5xl mx-auto px-4 py-8">
                            
                            {/* 2x2 Grid with side labels */}
                            <div className="grid grid-cols-2 gap-8 md:gap-12 max-w-lg mx-auto relative">
                                
                                {/* Instagram - Top Left */}
                                <div className="relative flex items-center">
                                    {/* Label on left side - text first, then arrow pointing to box */}
                                    <div className="absolute -left-4 md:-left-56 top-1/2 -translate-y-1/2 flex items-center gap-3 md:gap-4">
                                        <span className="text-sm md:text-lg font-bold text-pink-500 dark:text-pink-400 text-right leading-tight hidden md:block">
                                            Reels &<br/>Behind the Scenes
                                        </span>
                                        <img 
                                            src="/images/arrow1.png" 
                                            alt="" 
                                            className="w-12 h-12 md:w-20 md:h-20 opacity-80 dark:invert transform rotate-[120deg]"
                                        />
                                    </div>
                                    <a
                                        href="https://www.instagram.com/erc_bitsgoa/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="aspect-square w-full flex items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/30"
                                    >
                                        <FaInstagram className="text-5xl md:text-7xl text-white" />
                                    </a>
                                </div>

                                {/* LinkedIn - Top Right */}
                                <div className="relative flex items-center">
                                    {/* Label on right side - arrow first (pointing to box), then text */}
                                    <div className="absolute -right-4 md:-right-52 top-1/2 -translate-y-1/2 flex items-center gap-3 md:gap-4">
                                        <img 
                                            src="/images/arrow2.png" 
                                            alt="" 
                                            className="w-12 h-12 md:w-20 md:h-20 opacity-80 dark:invert transform -rotate-[60deg]"
                                        />
                                        <span className="text-sm md:text-lg font-bold text-blue-500 dark:text-blue-400 text-left leading-tight hidden md:block">
                                            Connect<br/>With Us
                                        </span>
                                    </div>
                                    <a
                                        href="https://in.linkedin.com/company/electronics-robotics-club-bits-goa"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="aspect-square w-full flex items-center justify-center rounded-2xl bg-blue-600 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
                                    >
                                        <FaLinkedin className="text-5xl md:text-7xl text-white" />
                                    </a>
                                </div>

                                {/* Email - Bottom Left */}
                                <div className="relative flex items-center">
                                    {/* Label on left side - text first, then arrow pointing to box */}
                                    <div className="absolute -left-4 md:-left-52 top-1/2 -translate-y-1/2 flex items-center gap-3 md:gap-4">
                                        <span className="text-sm md:text-lg font-bold text-emerald-500 dark:text-emerald-400 text-right leading-tight hidden md:block">
                                            Drop an<br/>Email!
                                        </span>
                                        <img 
                                            src="/images/arrow2.png" 
                                            alt="" 
                                            className="w-12 h-12 md:w-20 md:h-20 opacity-80 dark:invert transform rotate-[120deg]"
                                        />
                                    </div>
                                    <a
                                        href="mailto:erc@goa.bits-pilani.ac.in"
                                        className="aspect-square w-full flex items-center justify-center rounded-2xl bg-emerald-500 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30"
                                    >
                                        <FaEnvelope className="text-5xl md:text-7xl text-white" />
                                    </a>
                                </div>

                                {/* Twitter - Bottom Right */}
                                <div className="relative flex items-center">
                                    {/* Label on right side - arrow first (pointing to box), then text */}
                                    <div className="absolute -right-4 md:-right-52 top-1/2 -translate-y-1/2 flex items-center gap-3 md:gap-4">
                                        <img 
                                            src="/images/arrow1.png" 
                                            alt="" 
                                            className="w-12 h-12 md:w-20 md:h-20 opacity-80 dark:invert transform -rotate-[60deg]"
                                        />
                                        <span className="text-sm md:text-lg font-bold text-sky-500 dark:text-sky-400 text-left leading-tight hidden md:block">
                                            Exciting<br/>Updates
                                        </span>
                                    </div>
                                    <a
                                        href="https://twitter.com/erc_bitsgoa"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="aspect-square w-full flex items-center justify-center rounded-2xl bg-sky-500 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/30"
                                    >
                                        <FaTwitter className="text-5xl md:text-7xl text-white" />
                                    </a>
                                </div>
                            </div>

                            {/* Email address display */}
                            <div className="mt-16 text-center">
                                <p className="text-gray-500 dark:text-gray-400 text-base mb-2">Or reach out directly at</p>
                                <a 
                                    href="mailto:erc@goa.bits-pilani.ac.in" 
                                    className="text-xl md:text-2xl font-mono font-bold text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                >
                                    erc@goa.bits-pilani.ac.in
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
