import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import handbookData from '../data/handbook.json';

const Handbook = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { categories, articles } = handbookData;

    // Filter articles based on category and search
    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
            const matchesSearch = searchQuery === '' ||
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (article.subcategory && article.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery, articles]);

    // Group articles by subcategory for better organization
    const groupedArticles = useMemo(() => {
        const groups = {};
        filteredArticles.forEach(article => {
            const key = article.subcategory || 'General';
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(article);
        });
        return groups;
    }, [filteredArticles]);

    const getCategoryColor = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.color : 'from-gray-500 to-gray-600';
    };

    const getCategoryIcon = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.icon : '📚';
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
                        The ERC Handbook
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        An extensive compilation of information and resources for everything robotics - 
                        from getting started to advanced concepts in automation, electronics, and mechanical design.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-2xl mx-auto mb-10"
                >
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search topics, algorithms, tutorials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 pl-14 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
                        />
                        <svg
                            className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </motion.div>

                {/* Category Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
                >
                    {/* All Category */}
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            selectedCategory === 'all'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                    >
                        <div className="text-2xl mb-2">📚</div>
                        <div className="font-semibold text-black dark:text-white">All Topics</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{articles.length} articles</div>
                    </button>

                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                                selectedCategory === category.id
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        >
                            <div className="text-2xl mb-2">{category.icon}</div>
                            <div className="font-semibold text-black dark:text-white text-sm">{category.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {articles.filter(a => a.category === category.id).length} articles
                            </div>
                        </button>
                    ))}
                </motion.div>

                {/* Selected Category Info */}
                {selectedCategory !== 'all' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-6 rounded-2xl bg-gradient-to-r opacity-90"
                        style={{
                            background: `linear-gradient(135deg, ${
                                selectedCategory === 'automation' ? '#3b82f6, #06b6d4' :
                                selectedCategory === 'electronics' ? '#eab308, #f97316' :
                                selectedCategory === 'mechanical' ? '#22c55e, #10b981' :
                                selectedCategory === 'simulation' ? '#ec4899, #f43f5e' :
                                '#8b5cf6, #6366f1'
                            })`
                        }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {getCategoryIcon(selectedCategory)} {categories.find(c => c.id === selectedCategory)?.name}
                        </h2>
                        <p className="text-white/90">
                            {categories.find(c => c.id === selectedCategory)?.description}
                        </p>
                    </motion.div>
                )}

                {/* Articles Grid */}
                <div className="space-y-10">
                    {Object.entries(groupedArticles).map(([subcategory, articles], groupIndex) => (
                        <motion.div
                            key={subcategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                        >
                            {selectedCategory !== 'all' && subcategory !== 'General' && (
                                <h3 className="text-xl font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    {subcategory}
                                </h3>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {articles.map((article, index) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={`/handbook/${article.id}`}
                                            className="group block h-full"
                                        >
                                            <div className="h-full p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 flex flex-col">
                                                {/* Category Badge */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className={`px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r ${getCategoryColor(article.category)} text-white`}>
                                                        {getCategoryIcon(article.category)} {article.category}
                                                    </span>
                                                    {article.subcategory && (
                                                        <span className="px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                                            {article.subcategory}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Title */}
                                                <h4 className="text-lg font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                                                    {article.title}
                                                </h4>

                                                {/* Excerpt */}
                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1">
                                                    {article.excerpt}
                                                </p>

                                                {/* Read More */}
                                                <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                                                    Read more
                                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* No Results */}
                {filteredArticles.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                            No articles found matching your search.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory('all');
                                setSearchQuery('');
                            }}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Clear filters
                        </button>
                    </motion.div>
                )}

                {/* External Link Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-black dark:text-white mb-1">
                                Looking for the complete documentation?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Visit the full ERC Handbook for detailed tutorials with code examples and images.
                            </p>
                        </div>
                        <a
                            href="https://erc-bpgc.github.io/handbook/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium hover:opacity-80 transition-opacity"
                        >
                            Open Full Handbook
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Handbook;
