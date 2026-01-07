import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import blogs from '../data/blogs.json';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Blog = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedBlog, setExpandedBlog] = useState(null);

    // Extract unique categories with counts from all blogs
    const categoriesWithCounts = useMemo(() => {
        const categoryMap = {};
        blogs.forEach(blog => {
            blog.categories.forEach(cat => {
                categoryMap[cat] = (categoryMap[cat] || 0) + 1;
            });
        });
        return Object.entries(categoryMap)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([name, count]) => ({ name, count }));
    }, []);

    // Toggle category selection
    const toggleCategory = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Filter blogs based on categories and search
    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesCategory = selectedCategories.length === 0 || 
                selectedCategories.some(cat => blog.categories.includes(cat));
            const matchesSearch = searchQuery === '' || 
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.author.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [selectedCategories, searchQuery]);

    // Format date to YYYY.M.DD format
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate().toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="text-6xl md:text-8xl font-bold text-black dark:text-white">
                        <span className="text-blue-500">ERC</span> Blog
                    </h1>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar - Filters - Hidden on mobile */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="hidden lg:block lg:w-64 flex-shrink-0"
                    >
                        <div className="sticky top-28">
                            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 tracking-wider">
                                FILTERS
                            </h2>

                            {/* Search */}
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border-b-2 border-gray-200 dark:border-gray-700 bg-transparent text-black dark:text-white placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                                />
                            </div>

                            {/* Topic Filter */}
                            <div>
                                <h3 className="text-sm font-medium text-black dark:text-white mb-3 flex items-center gap-2">
                                    <span className="w-4 h-4 flex items-center justify-center">📁</span>
                                    Topic
                                </h3>
                                <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
                                    {categoriesWithCounts.map(({ name, count }) => (
                                        <label
                                            key={name}
                                            className={`flex items-center gap-3 py-1.5 px-2 rounded cursor-pointer transition-colors group ${
                                                selectedCategories.includes(name)
                                                    ? 'bg-blue-500 dark:bg-blue-600 text-white'
                                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(name)}
                                                onChange={() => toggleCategory(name)}
                                                className="sr-only"
                                            />
                                            <span className={`w-4 h-4 border-2 rounded flex items-center justify-center text-xs transition-colors ${
                                                selectedCategories.includes(name)
                                                    ? 'border-white bg-white text-blue-600'
                                                    : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-400'
                                            }`}>
                                                {selectedCategories.includes(name) && '✓'}
                                            </span>
                                            <span className="text-sm flex-1">{name}</span>
                                            <span className={`text-xs ${
                                                selectedCategories.includes(name)
                                                    ? 'text-white/70'
                                                    : 'text-gray-400 dark:text-gray-500'
                                            }`}>
                                                ({count})
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters */}
                            {selectedCategories.length > 0 && (
                                <button
                                    onClick={() => setSelectedCategories([])}
                                    className="mt-4 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white underline transition-colors"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </motion.aside>

                    {/* Main Content - Blog List */}
                    <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 min-w-0"
                    >
                        {/* Table Header */}
                        <div className="flex items-center gap-6 py-3 border-b border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400">
                            <span className="w-24">DATE</span>
                            <span className="flex-1">NAME</span>
                            <span className="w-8"></span>
                        </div>

                        {/* Blog List */}
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            <AnimatePresence>
                                {filteredBlogs.map((blog, index) => (
                                    <motion.div
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3, delay: index * 0.03 }}
                                    >
                                        {/* Blog Row */}
                                        <div
                                            className={`group transition-colors ${
                                                expandedBlog === blog.id
                                                    ? 'bg-blue-500 dark:bg-blue-600'
                                                    : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                                            }`}
                                        >
                                            <div className="flex items-center gap-6 py-4">
                                                {/* Bullet Point */}
                                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                                    expandedBlog === blog.id
                                                        ? 'bg-white'
                                                        : 'bg-gray-300 dark:bg-gray-600'
                                                }`} />
                                                
                                                {/* Date */}
                                                <span className={`w-20 text-sm font-mono flex-shrink-0 ${
                                                    expandedBlog === blog.id
                                                        ? 'text-white/80'
                                                        : 'text-gray-500 dark:text-gray-400'
                                                }`}>
                                                    {formatDate(blog.date)}
                                                </span>

                                                {/* Title - Clickable */}
                                                <Link
                                                    to={`/blog/${blog.id}`}
                                                    className={`flex-1 text-lg font-medium transition-colors ${
                                                        expandedBlog === blog.id
                                                            ? 'text-white'
                                                            : 'text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
                                                    }`}
                                                >
                                                    {blog.title}
                                                    {expandedBlog === blog.id && (
                                                        <span className="ml-2 text-sm">↗</span>
                                                    )}
                                                </Link>

                                                {/* Expand Button */}
                                                <button
                                                    onClick={() => setExpandedBlog(expandedBlog === blog.id ? null : blog.id)}
                                                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                                                        expandedBlog === blog.id
                                                            ? 'bg-white text-blue-600'
                                                            : 'text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                                    }`}
                                                    aria-label={expandedBlog === blog.id ? 'Collapse' : 'Expand'}
                                                >
                                                    {expandedBlog === blog.id ? <FaMinus size={12} /> : <FaPlus size={12} />}
                                                </button>
                                            </div>

                                            {/* Expanded Content */}
                                            <AnimatePresence>
                                                {expandedBlog === blog.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pb-6 pl-12 pr-8">
                                                            <p className="text-white/80 mb-4 max-w-2xl">
                                                                {blog.excerpt}
                                                            </p>
                                                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                                                <span className="text-white/70">
                                                                    By {blog.author.name}
                                                                </span>
                                                                <span className="text-white/50">•</span>
                                                                <span className="text-white/70">
                                                                    {blog.readTime} read
                                                                </span>
                                                                <span className="text-white/50">•</span>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {blog.categories.map(cat => (
                                                                        <span
                                                                            key={cat}
                                                                            className="px-2 py-0.5 bg-white/20 text-white text-xs rounded"
                                                                        >
                                                                            {cat}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <Link
                                                                to={`/blog/${blog.id}`}
                                                                className="inline-flex items-center gap-2 mt-4 text-white font-medium hover:underline"
                                                            >
                                                                Read full article →
                                                            </Link>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* No Results */}
                        {filteredBlogs.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    No articles found matching your criteria.
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedCategories([]);
                                        setSearchQuery('');
                                    }}
                                    className="mt-4 text-black dark:text-white hover:underline"
                                >
                                    Clear filters
                                </button>
                            </motion.div>
                        )}
                    </motion.main>
                </div>
            </div>
        </div>
    );
};

export default Blog;
