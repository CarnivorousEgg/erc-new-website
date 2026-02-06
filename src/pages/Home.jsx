import React, { useState, useEffect, useRef } from 'react';
import GridScan from '../components/GridScan';
import SpotlightCard from '../components/SpotlightCard';
import CurveDivider from '../components/CurveDivider';
import DomeGallery from '../components/DomeGallery';
import SponsorsTicker from '../components/SponsorsTicker';
import OptimizedVideo from '../components/OptimizedVideo';
import galleryData from '../data/gallery.json';
import galleryMedia from '../data/galleryMedia.json';
import sponsorsData from '../data/sponsors.json';
import newsData from '../data/news.json';
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
                    <OptimizedVideo
                        key={currentVideoIndex}
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        eager={true}
                        onEnded={handleVideoEnded}
                        className="w-full h-full"
                        style={{ width: '100%', height: '100%' }}
                        src={HOME_VIDEOS[currentVideoIndex]}
                        poster={`/Home-Videos/poster-${currentVideoIndex}.webp`}
                    />
                    {/* Black overlay for text visibility */}
                    <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
                </div>
                    
                {/* Video navigation arrows */}
                {HOME_VIDEOS.length > 1 && (
                    <>
                        {/* Left Arrow - Minimalist */}
                        <button
                            onClick={() => {
                                setCurrentVideoIndex((prev) => (prev - 1 + HOME_VIDEOS.length) % HOME_VIDEOS.length);
                            }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-all duration-300 hover:scale-125"
                            aria-label="Previous video"
                        >
                            <svg className="w-10 h-10 md:w-14 md:h-14 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        {/* Right Arrow - Minimalist */}
                        <button
                            onClick={() => {
                                setCurrentVideoIndex((prev) => (prev + 1) % HOME_VIDEOS.length);
                            }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-all duration-300 hover:scale-125"
                            aria-label="Next video"
                        >
                            <svg className="w-10 h-10 md:w-14 md:h-14 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        {/* Video indicator dots */}
                        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
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
                    </>
                )}

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
                        key={currentVideoIndex}
                    >
                        {currentVideoIndex === 0 && (
                            <Link to="/projects" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30">
                                Explore Projects
                            </Link>
                        )}
                        {currentVideoIndex === 1 && (
                            <Link to="/events" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30">
                                Explore Events
                            </Link>
                        )}
                        {currentVideoIndex === 2 && (
                            <Link to="/about#contact" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30">
                                Contact Us
                            </Link>
                        )}
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
                    <h2 className="text-4xl font-bold text-center mb-12"><span className="text-blue-500">ERC</span> Gallery</h2>
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

            {/* Section 4: Latest News */}
            <section className="relative">
                <CurveDivider variant={1} />
                <div className="py-20 px-4 container mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">News</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Latest updates from our members
                            </p>
                        </div>
                        
                        <div className="space-y-3">
                            {newsData.slice(0, 8).map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex gap-4 md:gap-6 p-4 md:p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-24 md:w-28">
                                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                            [{item.date}]
                                        </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 flex-1">
                                        {item.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {newsData.length > 8 && (
                            <div className="text-center mt-8">
                                <Link
                                    to="/about#news"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
                                >
                                    View All News
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
