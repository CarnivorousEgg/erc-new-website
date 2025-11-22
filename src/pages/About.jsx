import React from 'react';
import { motion } from 'framer-motion';
import ChromaGrid from '../components/ChromaGrid';
import DomeGallery from '../components/DomeGallery';
import SpotlightCard from '../components/SpotlightCard';
import teamData from '../data/team.json';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const About = () => {
    return (
        <div className="min-h-screen pt-24 px-4 container mx-auto space-y-32 pb-20">

            {/* Story Section */}
            <section className="text-center max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
                >
                    Our Story
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-300 leading-relaxed mb-12"
                >
                    The Electronics and Robotics Club at BITS Goa is a hub for innovation and creativity.
                    Since our inception, we have been dedicated to fostering a culture of technical excellence
                    and hands-on learning. We build robots, design circuits, and push the boundaries of what's possible.
                </motion.p>

                {/* Stats Counters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                        <h3 className="text-4xl font-bold text-blue-400 mb-2">15+</h3>
                        <p className="text-gray-400">Years of Innovation</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                        <h3 className="text-4xl font-bold text-purple-400 mb-2">20+</h3>
                        <p className="text-gray-400">Ongoing Projects</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                        <h3 className="text-4xl font-bold text-pink-400 mb-2">500+</h3>
                        <p className="text-gray-400">Alumni Worldwide</p>
                    </div>
                </div>
            </section>

            {/* Current Team Section */}
            <section>
                <h2 className="text-4xl font-bold text-center mb-12">Current Team</h2>
                <ChromaGrid items={teamData.current} />
            </section>

            {/* Alumni Section */}
            <section>
                <h2 className="text-4xl font-bold text-center mb-12">Our Alumni</h2>
                <DomeGallery items={teamData.alumni} />
            </section>

            {/* Outreach & Impact */}
            <section>
                <h2 className="text-4xl font-bold text-center mb-12">Outreach & Impact</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <SpotlightCard>
                        <h3 className="text-2xl font-bold mb-4 text-yellow-400">Workshops</h3>
                        <p className="text-gray-400">
                            We conduct regular workshops on robotics, IoT, and electronics for students
                            across Goa, fostering the next generation of engineers.
                        </p>
                    </SpotlightCard>
                    <SpotlightCard>
                        <h3 className="text-2xl font-bold mb-4 text-green-400">Competitions</h3>
                        <p className="text-gray-400">
                            Our teams participate and win in national and international robotics competitions,
                            bringing accolades to the institute.
                        </p>
                    </SpotlightCard>
                </div>
            </section>

            {/* Contact Section */}
            <section className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Reach Out to Us</h2>
                <div className="flex justify-center gap-8 mb-8">
                    <a href="https://linkedin.com" className="p-4 rounded-full bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-all">
                        <FaLinkedin size={32} />
                    </a>
                    <a href="https://instagram.com" className="p-4 rounded-full bg-pink-600/20 hover:bg-pink-600 text-pink-400 hover:text-white transition-all">
                        <FaInstagram size={32} />
                    </a>
                    <a href="mailto:erc@goa.bits-pilani.ac.in" className="p-4 rounded-full bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white transition-all">
                        <FaEnvelope size={32} />
                    </a>
                </div>
                <p className="text-gray-400">
                    Have a project idea or want to sponsor us? <br />
                    Drop us an email at <a href="mailto:erc@goa.bits-pilani.ac.in" className="text-blue-400 hover:underline">erc@goa.bits-pilani.ac.in</a>
                </p>
            </section>
        </div>
    );
};

export default About;
