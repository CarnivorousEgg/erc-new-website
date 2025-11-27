
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import ChromaGrid from '../components/ChromaGrid';
import AlumniTimeline from '../components/AlumniTimeline';
import PlusDivider from '../components/PlusDivider';
import SpotlightCard from '../components/SpotlightCard';
import BackToTop from '../components/BackToTop';
import teamData from '../data/team.json';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
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
    { id: 'outreach', label: 'Outreach' }
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
                        <section className="text-center max-w-4xl mx-auto space-y-12">
                            <div>
                                <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                                    Our Story
                                </h1>
                                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                    The Electronics and Robotics Club at BITS Goa is a hub for innovation and creativity.
                                    Since our inception, we have been dedicated to fostering a culture of technical excellence
                                    and hands-on learning. We build robots, design circuits, and push the boundaries of what's possible.
                                </p>
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

                    {activeTab === 'outreach' && (
                        <section>
                            <h2 className="text-4xl font-bold text-center mb-12">Outreach & Impact</h2>
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                <SpotlightCard>
                                    <h3 className="text-2xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">Workshops</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        We conduct regular workshops on robotics, IoT, and electronics for students
                                        across Goa, fostering the next generation of engineers.
                                    </p>
                                </SpotlightCard>
                                <SpotlightCard>
                                    <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Competitions</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Our teams participate and win in national and international robotics competitions,
                                        bringing accolades to the institute.
                                    </p>
                                </SpotlightCard>
                            </div>
                        </section>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="my-20">
                <PlusDivider />
            </div>

            {/* Contact Section - Always Visible */}
            <section className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Reach Out to Us</h2>
                <div className="flex justify-center gap-8 mb-8">
                    <a href="https://linkedin.com" className="p-4 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white dark:bg-blue-600/20 dark:text-blue-400 dark:hover:text-white transition-all">
                        <FaLinkedin size={32} />
                    </a>
                    <a href="https://instagram.com" className="p-4 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white dark:bg-pink-600/20 dark:text-pink-400 dark:hover:text-white transition-all">
                        <FaInstagram size={32} />
                    </a>
                    <a href="mailto:erc@goa.bits-pilani.ac.in" className="p-4 rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white dark:bg-green-600/20 dark:text-green-400 dark:hover:text-white transition-all">
                        <FaEnvelope size={32} />
                    </a>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Have a project idea or want to sponsor us? <br />
                    Drop us an email at <a href="mailto:erc@goa.bits-pilani.ac.in" className="text-blue-600 dark:text-blue-400 hover:underline">erc@goa.bits-pilani.ac.in</a>
                </p>
            </section>
        </motion.div>
    );
};

export default About;
