import React from 'react';
import GridScan from '../components/GridScan';
import SpotlightCard from '../components/SpotlightCard';
import PlusDivider from '../components/PlusDivider';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen pt-20"
        >
            {/* Hero Section with Grid Scan Background */}
            <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <GridScan
                        sensitivity={0.55}
                        lineThickness={0.6}
                        linesColor="#c5d9ed"
                        gridScale={0.1}
                        scanColor="#3b82f6"
                        scanOpacity={0.7}
                        enablePost={true}
                        bloomIntensity={0.2}
                        chromaticAberration={0.0003}
                        noiseIntensity={0.001}
                    />
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-bold text-blue-600 dark:text-blue-400 mb-6 drop-shadow-xl"
                    >
                        ERC BITS GOA
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
                    >
                        Innovating the future through Electronics and Robotics.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link to="/projects" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30">
                            Explore Projects
                        </Link>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4">
                <PlusDivider />
            </div>

            {/* Highlights Section */}
            <section className="py-20 px-4 container mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">What We Do</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <SpotlightCard>
                        <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Robotics</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Designing and building autonomous robots for various competitions and research purposes.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard>
                        <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Electronics</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Developing embedded systems, IoT devices, and custom PCBs for innovative solutions.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard>
                        <h3 className="text-2xl font-bold mb-4 text-pink-600 dark:text-pink-400">Research</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Pushing the boundaries of technology through cutting-edge research and development.
                        </p>
                    </SpotlightCard>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
