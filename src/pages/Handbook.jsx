import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import handbookData from '../data/handbook/index.js';
import { FaChevronDown, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';

// Base URL for handbook images from GitHub pages
const HANDBOOK_GITHUB_BASE = 'https://erc-bpgc.github.io/handbook';

// Category to section path mapping for GitHub fallback
const CATEGORY_SECTION_MAP = {
    'automation': {
        'ROS': 'automation/ROS/images',
        'PathPlanners': 'automation/PathPlanners/images',
        'ControlTheory': 'automation/ControlTheory/images',
        'default': 'automation/images'
    },
    'electronics': {
        'Development_Boards': 'electronics/Development_Boards/images',
        'Sensors': 'electronics/Sensors/images',
        'Modules': 'electronics/Modules/images',
        'Motors': 'electronics/Motors/images',
        'Basic_Electronic_Components': 'electronics/Basic_Electronic_Components/images',
        'default': 'electronics/Development_Boards/images'
    },
    'mechanical': {
        'default': 'mechanical/images'
    },
    'simulation': {
        'gazebo': 'simulation/gazebo/images',
        'stdr': 'simulation/stdr/images',
        'default': 'simulation/images'
    }
};

// Helper function to resolve handbook image URLs
const resolveHandbookImageUrl = (src, category) => {
    if (!src) return '';
    
    // If it's already a full URL, return as-is
    if (src.startsWith('http://') || src.startsWith('https://')) {
        return src;
    }
    
    // Return local path directly - it's now corrected in JSON files
    return src;
};

// Get GitHub fallback URL for an image
const getGitHubFallbackUrl = (src, category) => {
    if (!src) return null;
    
    const filename = src.split('/').pop();
    const categoryMap = CATEGORY_SECTION_MAP[category] || CATEGORY_SECTION_MAP['electronics'];
    
    // Try to determine the section from filename
    let section = 'default';
    if (filename.includes('lidar')) section = 'Sensors';
    else if (filename.includes('arduino') || filename.includes('esp') || filename.includes('stm') || filename.includes('pyboard') || filename.includes('bluepill')) section = 'Development_Boards';
    else if (filename.includes('breadboard') || filename.includes('bb')) section = 'Basic_Electronic_Components';
    else if (filename.includes('servo')) section = 'Motors';
    else if (filename.includes('wifi')) section = 'Modules';
    else if (filename.includes('gazebo') || filename.includes('rviz')) section = 'gazebo';
    else if (filename.includes('stdr')) section = 'stdr';
    
    const path = categoryMap[section] || categoryMap['default'];
    return `${HANDBOOK_GITHUB_BASE}/${path}/${filename}`;
};

const Handbook = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [expandedSubcategories, setExpandedSubcategories] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const { categories, articles } = handbookData;

    // Initialize expanded categories
    useEffect(() => {
        const expanded = {};
        categories.forEach(cat => {
            expanded[cat.id] = true;
        });
        setExpandedCategories(expanded);
    }, [categories]);

    // Handle URL hash for article selection (e.g., /handbook#ros-setup)
    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            const article = articles.find(a => a.id === hash);
            if (article) {
                setSelectedArticle(article);
                // Expand the relevant category and subcategory
                setExpandedCategories(prev => ({
                    ...prev,
                    [article.category]: true
                }));
                if (article.subcategory) {
                    const key = `${article.category}-${article.subcategory}`;
                    setExpandedSubcategories(prev => ({
                        ...prev,
                        [key]: true
                    }));
                }
                return;
            }
        }
        // Set first article as selected by default
        if (!selectedArticle && articles.length > 0) {
            setSelectedArticle(articles[0]);
        }
    }, [location.hash, articles]);

    // Group articles by category and subcategory
    const articlesByCategory = useMemo(() => {
        const grouped = {};
        categories.forEach(cat => {
            const categoryArticles = articles.filter(a => a.category === cat.id);
            
            // Separate intro article and subcategorized articles
            const introArticle = categoryArticles.find(a => !a.subcategory);
            const subcategorized = categoryArticles.filter(a => a.subcategory);
            
            // Group by subcategory
            const bySubcategory = {};
            subcategorized.forEach(article => {
                if (!bySubcategory[article.subcategory]) {
                    bySubcategory[article.subcategory] = [];
                }
                bySubcategory[article.subcategory].push(article);
            });
            
            grouped[cat.id] = {
                intro: introArticle,
                subcategories: bySubcategory
            };
        });
        return grouped;
    }, [categories, articles]);

    // Filter articles based on search
    const filteredArticles = useMemo(() => {
        if (!searchQuery) return articles;
        return articles.filter(article => 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, articles]);

    // Get count per category
    const getCategoryCount = (categoryId) => {
        if (searchQuery) {
            return filteredArticles.filter(a => a.category === categoryId).length;
        }
        return articles.filter(a => a.category === categoryId).length;
    };

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const toggleSubcategory = (categoryId, subcategoryName) => {
        const key = `${categoryId}-${subcategoryName}`;
        setExpandedSubcategories(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
        // Update URL hash for SEO and direct linking
        navigate(`/handbook#${article.id}`, { replace: true });
        // Scroll to top when changing articles
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white">
                        <span className="text-blue-500">ERC</span> Handbook
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl">
                        Comprehensive documentation for robotics, automation, electronics, and more.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Navigation */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:w-72 flex-shrink-0"
                    >
                        <div className="lg:sticky lg:top-28 flex flex-col max-h-[70vh] lg:max-h-[calc(100vh-8rem)]">
                            {/* Search */}
                            <div className="relative mb-6 flex-shrink-0">
                                <input
                                    type="text"
                                    placeholder="Search documentation..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <svg
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Category Navigation */}
                            <nav className="space-y-1 overflow-y-auto pr-2 flex-1 min-h-0 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                                {categories.map(category => {
                                    const categoryData = articlesByCategory[category.id];
                                    const hasSubcategories = categoryData && Object.keys(categoryData.subcategories).length > 0;
                                    
                                    return (
                                        <div key={category.id}>
                                            {/* Category Header */}
                                            <button
                                                onClick={() => toggleCategory(category.id)}
                                                className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{category.icon}</span>
                                                    <span className="font-semibold text-black dark:text-white text-sm">
                                                        {category.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-400">
                                                        ({getCategoryCount(category.id)})
                                                    </span>
                                                    {expandedCategories[category.id] ? (
                                                        <FaChevronDown className="w-3 h-3 text-gray-400" />
                                                    ) : (
                                                        <FaChevronRight className="w-3 h-3 text-gray-400" />
                                                    )}
                                                </div>
                                            </button>

                                            {/* Category Content */}
                                            <AnimatePresence>
                                                {expandedCategories[category.id] && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-0.5 py-1">
                                                            {/* Intro Article */}
                                                            {categoryData?.intro && (
                                                                <button
                                                                    onClick={() => handleArticleClick(categoryData.intro)}
                                                                    className={`w-full text-left py-1.5 px-3 rounded text-sm transition-colors ${
                                                                        selectedArticle?.id === categoryData.intro.id
                                                                            ? 'bg-blue-500 text-white'
                                                                            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                                                    }`}
                                                                >
                                                                    {categoryData.intro.title}
                                                                </button>
                                                            )}
                                                            
                                                            {/* Subcategories */}
                                                            {hasSubcategories && Object.entries(categoryData.subcategories).map(([subcategoryName, subcategoryArticles]) => {
                                                                const subcategoryKey = `${category.id}-${subcategoryName}`;
                                                                const isExpanded = expandedSubcategories[subcategoryKey];
                                                                
                                                                return (
                                                                    <div key={subcategoryName}>
                                                                        {/* Subcategory Header */}
                                                                        <button
                                                                            onClick={() => toggleSubcategory(category.id, subcategoryName)}
                                                                            className="w-full flex items-center justify-between py-1.5 px-3 rounded text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                                                                        >
                                                                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                                                                {subcategoryName}
                                                                            </span>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-xs text-gray-400">
                                                                                    ({subcategoryArticles.length})
                                                                                </span>
                                                                                {isExpanded ? (
                                                                                    <FaChevronDown className="w-2.5 h-2.5 text-gray-400" />
                                                                                ) : (
                                                                                    <FaChevronRight className="w-2.5 h-2.5 text-gray-400" />
                                                                                )}
                                                                            </div>
                                                                        </button>
                                                                        
                                                                        {/* Subcategory Articles */}
                                                                        <AnimatePresence>
                                                                            {isExpanded && (
                                                                                <motion.div
                                                                                    initial={{ height: 0, opacity: 0 }}
                                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                                    exit={{ height: 0, opacity: 0 }}
                                                                                    transition={{ duration: 0.15 }}
                                                                                    className="overflow-hidden"
                                                                                >
                                                                                    <div className="ml-3 pl-3 border-l border-gray-200 dark:border-gray-700 space-y-0.5 py-0.5">
                                                                                        {subcategoryArticles.map(article => (
                                                                                            <button
                                                                                                key={article.id}
                                                                                                onClick={() => handleArticleClick(article)}
                                                                                                className={`w-full text-left py-1.5 px-3 rounded text-sm transition-colors ${
                                                                                                    selectedArticle?.id === article.id
                                                                                                        ? 'bg-blue-500 text-white'
                                                                                                        : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                                                                                }`}
                                                                                            >
                                                                                                {article.title}
                                                                                            </button>
                                                                                        ))}
                                                                                    </div>
                                                                                </motion.div>
                                                                            )}
                                                                        </AnimatePresence>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </nav>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 min-w-0"
                    >
                        {selectedArticle ? (
                            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                                {/* Breadcrumb */}
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                                    <span>{categories.find(c => c.id === selectedArticle.category)?.icon}</span>
                                    <span>{categories.find(c => c.id === selectedArticle.category)?.name}</span>
                                    {selectedArticle.subcategory && (
                                        <>
                                            <span>/</span>
                                            <span>{selectedArticle.subcategory}</span>
                                        </>
                                    )}
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                                    {selectedArticle.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                    {selectedArticle.excerpt}
                                </p>

                                {/* Content Blocks */}
                                {selectedArticle.content && Array.isArray(selectedArticle.content) && (
                                    <div className="space-y-6">
                                        {selectedArticle.content.map((block, index) => {
                                            switch (block.type) {
                                                case 'heading':
                                                    return (
                                                        <h3 
                                                            key={index} 
                                                            className="text-2xl font-bold text-black dark:text-white mt-8 mb-4 pt-6 border-t border-gray-200 dark:border-gray-700"
                                                        >
                                                            {block.value}
                                                        </h3>
                                                    );
                                                case 'subheading':
                                                    return (
                                                        <h4 
                                                            key={index} 
                                                            className="text-lg font-semibold text-black dark:text-white mt-6 mb-3"
                                                        >
                                                            {block.value}
                                                        </h4>
                                                    );
                                                case 'text':
                                                    return (
                                                        <div 
                                                            key={index} 
                                                            className="prose prose-lg dark:prose-invert max-w-none
                                                                prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-p:my-2
                                                                prose-strong:text-black dark:prose-strong:text-white
                                                                prose-code:text-blue-600 dark:prose-code:text-blue-400
                                                                prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                                                                prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                                                                prose-a:text-blue-600 dark:prose-a:text-blue-400
                                                                prose-ul:text-gray-600 dark:prose-ul:text-gray-400
                                                                prose-ol:text-gray-600 dark:prose-ol:text-gray-400
                                                            "
                                                        >
                                                            <ReactMarkdown
                                                                remarkPlugins={[remarkGfm, remarkMath]}
                                                                rehypePlugins={[rehypeKatex, rehypeHighlight]}
                                                            >
                                                                {block.value}
                                                            </ReactMarkdown>
                                                        </div>
                                                    );
                                                case 'code':
                                                    return (
                                                        <div key={index} className="relative group">
                                                            <div className="absolute top-3 right-3 px-2 py-1 text-xs font-mono text-gray-400 bg-gray-700 rounded">
                                                                {block.language || 'code'}
                                                            </div>
                                                            <pre className="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 overflow-x-auto border border-gray-700">
                                                                <code className="text-sm font-mono text-gray-200 whitespace-pre">
                                                                    {block.value}
                                                                </code>
                                                            </pre>
                                                        </div>
                                                    );
                                                case 'image':
                                                    const imgSrc = resolveHandbookImageUrl(block.src, selectedArticle?.category);
                                                    const fallbackSrc = getGitHubFallbackUrl(block.src, selectedArticle?.category);
                                                    return (
                                                        <figure key={index} className="my-6">
                                                            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                                                <img 
                                                                    src={imgSrc} 
                                                                    alt={block.alt || block.caption || 'Handbook image'} 
                                                                    className="w-full h-auto max-h-[500px] object-contain bg-white dark:bg-gray-800"
                                                                    loading="lazy"
                                                                    decoding="async"
                                                                    onError={(e) => {
                                                                        // Try GitHub fallback first
                                                                        if (fallbackSrc && e.target.src !== fallbackSrc) {
                                                                            e.target.src = fallbackSrc;
                                                                        } else {
                                                                            // Hide broken images
                                                                            e.target.style.display = 'none';
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            {block.caption && (
                                                                <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400 italic">
                                                                    {block.caption}
                                                                </figcaption>
                                                            )}
                                                        </figure>
                                                    );
                                                case 'resources':
                                                    return (
                                                        <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                                            <h5 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                                </svg>
                                                                Resources
                                                            </h5>
                                                            <div className="space-y-2">
                                                                {block.items.map((item, itemIdx) => (
                                                                    <a
                                                                        key={itemIdx}
                                                                        href={item.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                                                                    >
                                                                        <FaExternalLinkAlt className="w-3 h-3 flex-shrink-0" />
                                                                        {item.name}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                case 'list':
                                                    return (
                                                        <ul key={index} className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                                                            {block.items.map((item, itemIdx) => (
                                                                <li key={itemIdx}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    );
                                                default:
                                                    return null;
                                            }
                                        })}
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Welcome / Overview Card */
                            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                                <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                                    Welcome to the ERC Handbook
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-8">
                                    Select a topic from the sidebar to get started. This handbook covers everything 
                                    from basic programming concepts to advanced robotics topics.
                                </p>

                                {/* Category Overview Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {categories.map(category => (
                                        <div 
                                            key={category.id}
                                            className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                                        >
                                            <div className="text-3xl mb-3">{category.icon}</div>
                                            <h3 className="font-bold text-black dark:text-white mb-1">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                {category.description}
                                            </p>
                                            <span className="text-xs text-blue-600 dark:text-blue-400">
                                                {getCategoryCount(category.id)} articles
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.main>
                </div>
            </div>
        </div>
    );
};

export default Handbook;
