// This file combines all handbook JSON files into a single export
// Edit the individual category files to update content

import categories from './categories.json';
import roadmapArticles from './roadmap.json';
import automationArticles from './automation.json';
import electronicsArticles from './electronics.json';
import mechanicalArticles from './mechanical.json';
import simulationArticles from './simulation.json';

// Import misc and about from these files  
import miscAbout from '../handbook.json';

// Get misc and about articles from the old handbook
const miscAboutArticles = miscAbout.articles ? 
  miscAbout.articles.filter(a => a.category === 'misc' || a.category === 'about') :
  [];

// Combine all articles from different category files
const articles = [
  ...roadmapArticles,
  ...automationArticles,
  ...electronicsArticles,
  ...mechanicalArticles,
  ...simulationArticles,
  ...miscAboutArticles
];

const handbookData = {
  categories,
  articles
};

export default handbookData;
