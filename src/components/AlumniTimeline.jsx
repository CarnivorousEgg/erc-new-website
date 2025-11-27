import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import './AlumniTimeline.css';

/**
 * AlumniTimeline Component
 * SIMPLIFIED VERSION - Fixed sticky timeline and removed problematic auto-scroll
 */
const AlumniTimeline = ({ alumni = [] }) => {
    const [activeYear, setActiveYear] = useState(null);
    const sectionsRef = useRef({});
    const observerRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const initialHashHandled = useRef(false);

    // Group alumni by batch year
    const alumniByBatch = alumni.reduce((acc, member) => {
        const batch = member.batch || 'Unknown';
        if (!acc[batch]) {
            acc[batch] = [];
        }
        acc[batch].push(member);
        return acc;
    }, {});

    // Sort batches in descending order (newest first)
    const sortedBatches = Object.keys(alumniByBatch).sort((a, b) => {
        const yearA = parseInt(a.match(/\d+/)?.[0] || '0');
        const yearB = parseInt(b.match(/\d+/)?.[0] || '0');
        return yearB - yearA;
    });

    // Extract year number for display
    const getYearLabel = (batch) => {
        const year = batch.match(/\d+/)?.[0];
        return year || batch;
    };

    // Handle ONLY initial URL hash on mount - NEVER again after that
    useEffect(() => {
        if (!initialHashHandled.current) {
            const hash = location.hash;
            if (hash.startsWith('#year=')) {
                const year = hash.replace('#year=', '');
                const matchingBatch = sortedBatches.find(batch => {
                    const batchYear = getYearLabel(batch);
                    return batchYear === year;
                });
                if (matchingBatch && sectionsRef.current[matchingBatch]) {
                    setTimeout(() => {
                        sectionsRef.current[matchingBatch]?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        setActiveYear(matchingBatch);
                    }, 300);
                }
            }
            initialHashHandled.current = true;
        }
    }, []); // Only run ONCE on mount

    // Simple scroll spy - just update active state, NO hash updates
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const batch = entry.target.getAttribute('data-batch');
                    setActiveYear(batch);
                }
            });
        }, observerOptions);

        // Observe all batch sections
        Object.keys(sectionsRef.current).forEach(batch => {
            if (sectionsRef.current[batch]) {
                observerRef.current.observe(sectionsRef.current[batch]);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [sortedBatches]);

    // Smooth scroll to batch section - update hash but DON'T trigger scroll effect
    const scrollToBatch = (batch) => {
        const section = sectionsRef.current[batch];
        if (section) {
            setActiveYear(batch);
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Update URL hash for sharing
            const year = getYearLabel(batch);
            navigate(`#year=${year}`, { replace: true });
        }
    };

    return (
        <div className="alumni-timeline-wrapper">
            {/* Desktop Timeline Navigation */}
            <aside className="timeline-sidebar">
                <nav className="timeline-nav">
                    <div className="timeline-line"></div>
                    <ul className="timeline-list">
                        {sortedBatches.map((batch) => (
                            <li
                                key={batch}
                                className={`timeline-item ${activeYear === batch ? 'active' : ''}`}
                            >
                                <button
                                    onClick={() => scrollToBatch(batch)}
                                    className="timeline-link"
                                    aria-label={`Jump to ${batch}`}
                                >
                                    {getYearLabel(batch)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Mobile Navigation */}
            <nav className="mobile-timeline-nav">
                {sortedBatches.map((batch) => (
                    <button
                        key={batch}
                        onClick={() => scrollToBatch(batch)}
                        className={`mobile-timeline-link ${activeYear === batch ? 'active' : ''}`}
                    >
                        {getYearLabel(batch)}
                    </button>
                ))}
            </nav>

            {/* Main Content */}
            <main className="timeline-content">
                <header className="timeline-header">
                    <h1 className="timeline-title">Meet the Family ^_^</h1>
                    <p className="timeline-subtitle">
                        From 2008 to present, the Electronics and Robotics Club (ERC) has been home to creators, engineers, and dreamers.
                    </p>
                </header>

                {/* Batch Sections */}
                {sortedBatches.map((batch) => (
                    <section
                        key={batch}
                        id={`batch-${batch.replace(/\s+/g, '-').toLowerCase()}`}
                        className="batch-section"
                        data-batch={batch}
                        ref={(el) => (sectionsRef.current[batch] = el)}
                    >
                        <h2 className="batch-year-title">
                            Batch of {getYearLabel(batch)}
                        </h2>
                        <div className="team-grid">
                            {alumniByBatch[batch].map((member, index) => (
                                <motion.div
                                    key={`${member.name}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="alumni-card"
                                >
                                    <div className="img-container">
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="img-link"
                                            aria-label={`View ${member.name}'s LinkedIn profile`}
                                        >
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="profile-img"
                                                onError={(e) => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                                                }}
                                            />
                                        </a>
                                    </div>
                                    <h3 className="member-name">{member.name}</h3>
                                    <span className="member-role">{member.role}</span>
                                    {member.currentWork && (
                                        <p className="member-work">{member.currentWork}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
};

export default AlumniTimeline;
