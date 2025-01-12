// filepath: src/generateSitemap.js
const fs = require('fs');
const path = require('path');
const sitemap = require('./sitemap');

// Generate the sitemap
const sitemapXML = sitemap.toString();

// Write sitemap to the public directory
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXML);

console.log('Sitemap generated successfully!');