import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import blogs from '../data/blogs.json';

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Extract unique categories from all blogs
    const allCategories = useMemo(() => {
        const categories = new Set();
        blogs.forEach(blog => {
            blog.categories.forEach(cat => categories.add(cat));
        });
        return ['All', ...Array.from(categories).sort()];
    }, []);

    // Filter blogs based on category and search
    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesCategory = selectedCategory === 'All' || blog.categories.includes(selectedCategory);
            const matchesSearch = searchQuery === '' || 
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.author.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-black">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
                        The ERC Blog
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Technical articles and insights from the Electronics and Robotics Club
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-10"
                >
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto mb-6">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {allCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map((blog, index) => (
                        <motion.article
                            key={blog.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <Link to={`/blog/${blog.id}`}>
                                <div className="h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col">
                                    {/* Cover Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x200?text=ERC+Blog';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        
                                        {/* Read Time Badge */}
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                                            {blog.readTime} read
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        {/* Categories */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {blog.categories.slice(0, 2).map(cat => (
                                                <span
                                                    key={cat}
                                                    className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md"
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                            {blog.categories.length > 2 && (
                                                <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                                                    +{blog.categories.length - 2}
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold mb-2 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h2>

                                        {/* Excerpt */}
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                                            {blog.excerpt}
                                        </p>

                                        {/* Author and Date */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {blog.author.name}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-500">
                                                {blog.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
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
                                setSelectedCategory('All');
                                setSearchQuery('');
                            }}
                            className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Clear filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Blog;
