// Script to split handbook.json into category-specific JSON files
const fs = require('fs');
const path = require('path');

const handbookPath = path.join(__dirname, '../handbook.json');
const outputDir = __dirname;

// Read the original handbook.json
const handbook = JSON.parse(fs.readFileSync(handbookPath, 'utf-8'));

// Group articles by category
const categories = {
  automation: [],
  electronics: [],
  mechanical: [],
  simulation: [],
  misc: [],
  about: []
};

// Process each article - clean up markdown formatting
function cleanText(text) {
  if (!text) return text;
  // Remove ** bold markers
  let cleaned = text.replace(/\*\*/g, '');
  // Remove single * markers (but keep math like $var$)
  cleaned = cleaned.replace(/(?<!\$)\*(?!\*)/g, '');
  // Remove __ markers
  cleaned = cleaned.replace(/__/g, '');
  return cleaned;
}

function cleanContent(content) {
  if (!Array.isArray(content)) return content;
  
  return content.map(item => {
    if (item.type === 'text' && item.value) {
      return { ...item, value: cleanText(item.value) };
    }
    return item;
  });
}

handbook.articles.forEach(article => {
  const cat = article.category;
  if (categories[cat]) {
    // Clean the content
    const cleanedArticle = {
      ...article,
      content: cleanContent(article.content)
    };
    categories[cat].push(cleanedArticle);
  }
});

// Write category files
Object.entries(categories).forEach(([category, articles]) => {
  if (articles.length > 0 && category !== 'misc' && category !== 'about') {
    const outputPath = path.join(outputDir, `${category}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2));
    console.log(`Written ${articles.length} articles to ${category}.json`);
  }
});

console.log('Done splitting handbook.json into category files');
