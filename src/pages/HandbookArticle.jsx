import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import handbookData from '../data/handbook/index.js';

const HandbookArticle = () => {
    const { id } = useParams();
    const { categories, articles } = handbookData;
    const article = articles.find(a => a.id === id);

    if (!article) {
        return (
            <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Article Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
                    <Link
                        to="/handbook"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        ← Back to Handbook
                    </Link>
                </div>
            </div>
        );
    }

    const category = categories.find(c => c.id === article.category);
    
    // Find related articles (same category, excluding current)
    const relatedArticles = articles
        .filter(a => a.category === article.category && a.id !== article.id)
        .slice(0, 4);

    const getCategoryColor = (categoryId) => {
        const cat = categories.find(c => c.id === categoryId);
        return cat ? cat.color : 'from-gray-500 to-gray-600';
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-black">
            <article className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        to="/handbook"
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Handbook
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className={`px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r ${getCategoryColor(article.category)} text-white`}>
                            {category?.icon} {category?.name}
                        </span>
                        {article.subcategory && (
                            <span className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                {article.subcategory}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
                        {article.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                        {article.excerpt}
                    </p>
                </motion.header>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-8"
                >
                    {/* Main Content */}
                    {article.content && (
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {article.content}
                            </p>
                        </div>
                    )}

                    {/* Sections */}
                    {article.sections && article.sections.map((section, index) => (
                        <section key={index} className="border-t border-gray-200 dark:border-gray-800 pt-8">
                            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                                {section.title}
                            </h2>
                            
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-4">
                                {section.content}
                            </p>

                            {/* Code Block */}
                            {section.code && (
                                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                                    <code>{section.code}</code>
                                </pre>
                            )}

                            {/* Links */}
                            {section.links && section.links.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {section.links.map((link, linkIndex) => (
                                        <a
                                            key={linkIndex}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            {link.text}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Subsections */}
                            {section.subsections && section.subsections.map((sub, subIndex) => (
                                <div key={subIndex} className="mt-6 pl-4 border-l-2 border-blue-500">
                                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                                        {sub.title}
                                    </h3>
                                    {sub.links && (
                                        <div className="space-y-2">
                                            {sub.links.map((link, linkIndex) => (
                                                <a
                                                    key={linkIndex}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    {link.text}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>
                    ))}

                    {/* References */}
                    {article.references && article.references.length > 0 && (
                        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
                            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                                References & Resources
                            </h2>
                            <ul className="space-y-3">
                                {article.references.map((ref, index) => (
                                    <li key={index}>
                                        <a
                                            href={ref.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            {ref.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </motion.div>

                {/* View Full Article CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-black dark:text-white mb-1">
                                Want more details?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                View the complete article with code examples, images, and interactive content.
                            </p>
                        </div>
                        <a
                            href={article.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                        >
                            Open Full Article
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </motion.div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-16"
                    >
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {relatedArticles.map(related => (
                                <Link
                                    key={related.id}
                                    to={`/handbook/${related.id}`}
                                    className="group p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        {related.subcategory && (
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {related.subcategory}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {related.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                        {related.excerpt}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </motion.section>
                )}
            </article>
        </div>
    );
};

export default HandbookArticle;
