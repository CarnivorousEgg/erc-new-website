import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the handbook.json file
const handbookPath = path.join(__dirname, '..', 'src', 'data', 'handbook.json');
const outputDir = path.join(__dirname, '..', 'src', 'data', 'handbook');

const handbook = JSON.parse(fs.readFileSync(handbookPath, 'utf8'));

// Helper function to extract links from markdown text
function extractLinks(text) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    links.push({ name: match[1].trim(), url: match[2].trim() });
  }
  return links;
}

// Helper function to remove markdown formatting
function cleanText(text) {
  if (!text) return text;
  
  // Remove bold markdown (**text** or __text__)
  let cleaned = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  cleaned = cleaned.replace(/__([^_]+)__/g, '$1');
  
  // Remove italic markdown (*text* or _text_) - be careful not to remove underscores in URLs
  cleaned = cleaned.replace(/(?<![a-zA-Z0-9_])\*([^*\n]+)\*(?![a-zA-Z0-9])/g, '$1');
  cleaned = cleaned.replace(/(?<![a-zA-Z0-9_])_([^_\n]+)_(?![a-zA-Z0-9])/g, '$1');
  
  // Remove empty markdown links [text]() and keep just the text
  cleaned = cleaned.replace(/\[([^\]]+)\]\(\)/g, '$1');
  
  // Remove markdown links and replace with just the text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove inline code backticks for display text
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');
  
  // Clean up HTML tags like <br>, <br/>, </br>
  cleaned = cleaned.replace(/<br\s*\/?>/gi, ' ');
  cleaned = cleaned.replace(/<\/br>/gi, ' ');
  cleaned = cleaned.replace(/<center>/gi, '');
  cleaned = cleaned.replace(/<\/center>/gi, '');
  
  // Clean up &nbsp;
  cleaned = cleaned.replace(/&nbsp;/g, ' ');
  
  // Clean up subscript/superscript HTML
  cleaned = cleaned.replace(/<sub>([^<]+)<\/sub>/gi, '$1');
  cleaned = cleaned.replace(/<sup>([^<]+)<\/sup>/gi, '$1');
  
  // Remove leading bullet points or dashes at start of text
  cleaned = cleaned.replace(/^\s*[-*•]\s+/, '');
  
  // Remove markdown heading markers (####, ###, ##, #)
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');
  
  // Trim extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

// Helper function to parse markdown list into array
function parseMarkdownList(text) {
  const lines = text.split('\n');
  const items = [];
  
  for (const line of lines) {
    // Match numbered lists (1. 2. etc) or bullet points (*, -, •)
    const match = line.match(/^\s*(?:\d+\.|[-*•])\s*(.+)$/);
    if (match) {
      items.push(cleanText(match[1]));
    }
  }
  
  return items;
}

// Helper function to check if text contains a markdown list
function isMarkdownList(text) {
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length < 2) return false;
  
  let listCount = 0;
  for (const line of lines) {
    if (/^\s*(?:\d+\.|[-*•])\s+/.test(line)) {
      listCount++;
    }
  }
  
  return listCount >= 2;
}

// Helper function to check if text contains markdown links
function containsLinks(text) {
  return /\[([^\]]+)\]\(([^)]+)\)/.test(text);
}

// Process a content item
function processContentItem(item) {
  if (item.type === 'text') {
    const text = item.value;
    
    // Check if this is primarily a list
    if (isMarkdownList(text)) {
      const items = parseMarkdownList(text);
      if (items.length > 0) {
        // Check if list items contain links
        const hasLinks = items.some(i => containsLinks(i));
        if (hasLinks) {
          // Extract resources from the list
          const resources = [];
          for (const itemText of items) {
            const links = extractLinks(itemText);
            if (links.length > 0) {
              resources.push(...links);
            }
          }
          if (resources.length > 0) {
            return { type: 'resources', items: resources };
          }
        }
        return { type: 'list', items: items.map(cleanText) };
      }
    }
    
    // Check if this text contains links that should be extracted
    if (containsLinks(text)) {
      const links = extractLinks(text);
      const cleanedText = cleanText(text);
      
      // If the text is mostly links, convert to resources
      if (links.length >= 2 && cleanedText.length < text.length * 0.5) {
        return { type: 'resources', items: links };
      }
      
      // Otherwise, return cleaned text
      return { type: 'text', value: cleanedText };
    }
    
    // Just clean the text
    return { type: 'text', value: cleanText(text) };
  }
  
  // Return other types as-is (heading, subheading, code, image, resources, list)
  if (item.type === 'heading' || item.type === 'subheading') {
    return { type: item.type, value: cleanText(item.value) };
  }
  
  if (item.type === 'resources') {
    // Clean up resource names
    return {
      type: 'resources',
      items: item.items.map(r => ({
        name: cleanText(r.name),
        url: r.url
      }))
    };
  }
  
  if (item.type === 'list') {
    return {
      type: 'list',
      items: item.items.map(cleanText)
    };
  }
  
  // Return as-is for code, image, etc.
  return item;
}

// Process an article's content
function processArticle(article) {
  const processedContent = article.content.map(processContentItem);
  
  // Filter out empty text items
  const filteredContent = processedContent.filter(item => {
    if (item.type === 'text' && (!item.value || item.value.trim() === '')) {
      return false;
    }
    return true;
  });
  
  return {
    id: article.id,
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    ...(article.subcategory && { subcategory: article.subcategory }),
    content: filteredContent
  };
}

// Group articles by category
const articlesByCategory = {};

for (const article of handbook.articles) {
  const category = article.category;
  if (!articlesByCategory[category]) {
    articlesByCategory[category] = [];
  }
  
  // Skip the roadmap category as it's already done
  if (category !== 'roadmap') {
    articlesByCategory[category].push(processArticle(article));
  }
}

// Write each category to its respective file
for (const [category, articles] of Object.entries(articlesByCategory)) {
  if (category === 'roadmap') continue; // Skip roadmap as it's already cleaned
  
  const outputPath = path.join(outputDir, `${category}.json`);
  
  // Write the file
  fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2), 'utf8');
  console.log(`Written ${articles.length} articles to ${category}.json`);
}

console.log('\nDone processing handbook articles!');
