import React, { useState, useEffect, useRef } from 'react';
import GridScan from '../components/GridScan';
import SpotlightCard from '../components/SpotlightCard';
import CurveDivider from '../components/CurveDivider';
import DomeGallery from '../components/DomeGallery';
import SponsorsTicker from '../components/SponsorsTicker';
import galleryData from '../data/gallery.json';
import galleryMedia from '../data/galleryMedia.json';
import sponsorsData from '../data/sponsors.json';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Home videos from the public/Home-Videos folder
const HOME_VIDEOS = galleryMedia.homeVideos || [
    '/Home-Videos/ERC_Badge.mp4',
    '/Home-Videos/CV.MP4',
    '/Home-Videos/Laser.mp4'
];

const Home = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef(null);

    // Handle video ended event to switch to next video
    const handleVideoEnded = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % HOME_VIDEOS.length);
    };

    // When video index changes, play the new video
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => {
                // Autoplay might be blocked, that's okay
            });
        }
    }, [currentVideoIndex]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen"
        >
            {/* Hero Section with Video Background - Full Screen */}
            <section className="section-hero relative h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Video Background - Cycles through Home-Videos */}
                <div className="absolute inset-0">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnded}
                        className="w-full h-full object-cover"
                        key={currentVideoIndex}
                    >
                        <source src={HOME_VIDEOS[currentVideoIndex]} type="video/mp4" />
                    </video>
                    {/* Black overlay for text visibility */}
                    <div className="absolute inset-0 bg-black/50"></div>
                    
                    {/* Video indicator dots */}
                    {HOME_VIDEOS.length > 1 && (
                        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                            {HOME_VIDEOS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentVideoIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentVideoIndex 
                                            ? 'bg-white w-6' 
                                            : 'bg-white/50 hover:bg-white/70'
                                    }`}
                                    aria-label={`Play video ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Old GridScan Background - Commented out */}
                {/* <div className="absolute inset-0">
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
                </div> */}

                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-xl"
                    >
                        Electronics and Robotics Club, BITS Goa
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8"
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

                {/* Curve integrated into hero - cuts the video */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg
                        className="w-full h-[60px] md:h-[80px]"
                        viewBox="0 0 1440 100"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Main curve fill - matches next section background */}
                        <path
                            className="fill-white dark:fill-black"
                            d="M0,100 L0,60 Q360,100 720,60 Q1080,20 1440,60 L1440,100 Z"
                        />
                        {/* Blue accent line */}
                        <path
                            className="stroke-blue-500"
                            d="M0,60 Q360,100 720,60 Q1080,20 1440,60"
                            fill="none"
                            strokeWidth="3"
                        />
                    </svg>
                </div>
            </section>

            {/* Section 1: What We Do */}
            <section className="relative">
                <div className="py-20 px-4 container mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">What We Do</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Link to="/projects" className="block transition-transform hover:scale-105">
                            <SpotlightCard>
                                <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Research Projects</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We work on cutting-edge research projects, bringing innovative ideas from concept to implementation.
                                </p>
                            </SpotlightCard>
                        </Link>

                        <Link to="/events" className="block transition-transform hover:scale-105">
                            <SpotlightCard>
                                <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Hosting Events</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We organize and host a variety of events throughout the year, from workshops to competitions.
                                </p>
                            </SpotlightCard>
                        </Link>

                        <Link to="/about#contact" className="block transition-transform hover:scale-105">
                            <SpotlightCard>
                                <h3 className="text-2xl font-bold mb-4 text-pink-600 dark:text-pink-400">Community Building</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We foster engagement and inspire a passion for robotics across our campus community.
                                </p>
                            </SpotlightCard>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Section 2: Sponsors */}
            <section className="relative">
                <CurveDivider variant={2} />
                <div className="py-20 px-4 container mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4">Our Previous Sponsors and Collaborators</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
                        We are grateful to our sponsors and collaborators who have supported our journey in robotics and electronics.
                    </p>
                    <SponsorsTicker sponsors={sponsorsData} />
                </div>
            </section>
            
            {/* Section 3: ERC Gallery */}
            <section className="relative">
                <CurveDivider variant={3} />
                <div className="py-20 px-4 container mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">ERC Gallery</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
                        Explore our amazing events, competitions, and innovative projects that showcase the creativity and technical expertise of our club members.
                    </p>
                    <div className="w-full overflow-hidden">
                        <DomeGallery
                            items={[...galleryData.events, ...(galleryData.projects || []), ...(galleryData.alumni || [])]}
                            overlayBlurColor="var(--dome-overlay)"
                            segments={20}
                        />
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
