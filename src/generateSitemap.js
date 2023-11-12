const fs = require('fs');
const sitemap = require('./src/sitemap'); // Import your sitemap configuration

// Generate the sitemap
const sitemapXML = sitemap.toString();

// Write sitemap to the public directory
fs.writeFileSync('./public/sitemap.xml', sitemapXML);

console.log('Sitemap generated successfully!');
