import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import blogs from '../data/blogs.json';
import SEO from '../components/SEO';
import { PAGE_SEO } from '../config/seo';

const BlogDetail = () => {
    const { id } = useParams();
    const blog = blogs.find(b => b.id === id);

    if (!blog) {
        return (
            <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Article Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    // Find previous and next blogs for navigation
    const currentIndex = blogs.findIndex(b => b.id === id);
    const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
    const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

    return (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-black">
            <SEO
                title={`${blog.title} – ERC BITS Goa`}
                description={blog.excerpt}
                ogImage={blog.coverImage || PAGE_SEO.blog.ogImage}
                ogType="article"
                canonicalPath={`/blog/${blog.id}`}
            />
            <article className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog.categories.map(cat => (
                            <span
                                key={cat}
                                className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                        {/* Author */}
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                {blog.author.name.charAt(0)}
                            </div>
                            <div>
                                <a
                                    href={blog.author.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {blog.author.name}
                                </a>
                            </div>
                        </div>

                        <span className="hidden sm:inline">•</span>

                        {/* Date */}
                        <span>{blog.date}</span>

                        <span className="hidden sm:inline">•</span>

                        {/* Read Time */}
                        <span>{blog.readTime} read</span>
                    </div>
                </motion.header>

                {/* Cover Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-64 md:h-96 object-cover"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                                // Try GitHub fallback URL for local images
                                const src = e.target.src;
                                if (!src.includes('raw.githubusercontent.com') && src.includes('/images/')) {
                                    const path = src.substring(src.indexOf('/images/'));
                                    e.target.src = `https://raw.githubusercontent.com/ERC-BPGC/erc-website-static/main${path}`;
                                } else {
                                    // Hide broken image and show gradient background
                                    e.target.style.display = 'none';
                                }
                            }}
                        />
                        {/* Fallback gradient with title */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center p-8 opacity-30">
                                <div className="text-6xl mb-4">📝</div>
                                <div className="text-xl font-bold text-gray-600 dark:text-gray-400">ERC Blog</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Content Sections */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-lg dark:prose-invert max-w-none"
                >
                    {blog.sections.map((section, index) => (
                        <section key={index} className="mb-10">
                            {section.title && (
                                <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4 mt-8">
                                    {section.title}
                                </h2>
                            )}

                            {/* Content - rendered with markdown */}
                            <div className="prose prose-lg dark:prose-invert max-w-none
                                prose-headings:text-black dark:prose-headings:text-white
                                prose-p:text-gray-700 dark:prose-p:text-gray-300
                                prose-strong:text-black dark:prose-strong:text-white
                                prose-code:text-blue-600 dark:prose-code:text-blue-400
                                prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                                prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700
                                prose-a:text-blue-600 dark:prose-a:text-blue-400
                                prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                                prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                                prose-li:text-gray-700 dark:prose-li:text-gray-300
                            ">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkMath]}
                                    rehypePlugins={[rehypeKatex, rehypeHighlight]}
                                >
                                    {section.content}
                                </ReactMarkdown>
                            </div>

                            {/* Section Image */}
                            {section.image && (
                                <figure className="my-8">
                                    <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 min-h-[200px] flex items-center justify-center">
                                        <img
                                            src={section.image.src}
                                            alt={section.image.caption}
                                            className="w-full object-contain bg-gray-100 dark:bg-gray-900"
                                            loading="lazy"
                                            decoding="async"
                                            onError={(e) => {
                                                // Try GitHub fallback URL
                                                const src = e.target.src;
                                                if (!src.includes('raw.githubusercontent.com') && src.startsWith('/')) {
                                                    e.target.src = `https://raw.githubusercontent.com/ERC-BPGC/erc-website-static/main${src}`;
                                                } else {
                                                    // Hide and show placeholder
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.classList.add('image-fallback');
                                                }
                                            }}
                                        />
                                        <div className="image-placeholder hidden text-center p-8">
                                            <div className="text-4xl mb-2">🖼️</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Image unavailable</div>
                                        </div>
                                    </div>
                                    {section.image.caption && (
                                        <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
                                            {section.image.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            )}
                        </section>
                    ))}
                </motion.div>

                {/* References */}
                {blog.references && blog.references.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
                    >
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">References</h2>
                        <ol className="list-decimal list-inside space-y-3">
                            {blog.references.map((ref, index) => (
                                <li key={index} className="text-gray-600 dark:text-gray-400 text-sm">
                                    {ref.link ? (
                                        <a
                                            href={ref.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline"
                                        >
                                            {ref.text}
                                        </a>
                                    ) : (
                                        <span>{ref.text}</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </motion.section>
                )}

                {/* Navigation */}
                <motion.nav
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
                >
                    <div className="flex justify-center">
                        {nextBlog && (
                            <Link
                                to={`/blog/${nextBlog.id}`}
                                className="group p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all text-center min-w-[280px]"
                            >
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center justify-center gap-1">
                                    Next Article
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </p>
                                <p className="font-medium text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {nextBlog.title}
                                </p>
                            </Link>
                        )}
                        {!nextBlog && prevBlog && (
                            <Link
                                to={`/blog/${prevBlog.id}`}
                                className="group p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all text-center min-w-[280px]"
                            >
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center justify-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Previous Article
                                </p>
                                <p className="font-medium text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {prevBlog.title}
                                </p>
                            </Link>
                        )}
                    </div>
                </motion.nav>
            </article>
        </div>
    );
};

export default BlogDetail;
