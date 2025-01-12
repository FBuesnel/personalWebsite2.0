// filepath: src/sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
const path = require('path');
const hostname = 'https://fynnbuesnel.me';

const postsDirectory = path.join(__dirname, 'posts');
const postFiles = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));

const posts = postFiles.map(file => {
  const id = path.basename(file, '.md');
  const content = fs.readFileSync(path.join(postsDirectory, file), 'utf-8');
  return { id, content };
});

const urls = [
  { url: '/', changefreq: 'monthly', priority: 1 },
  { url: '/experience', changefreq: 'monthly', priority: 0.5 },
  { url: '/portfolio', changefreq: 'monthly', priority: 0.8 },
  { url: '/blogs', changefreq: 'monthly', priority: 0.4 },
  { url: '/contact', changefreq: 'yearly', priority: 0.2 },
  // Additional pages here
];

// Add blog posts to the sitemap
posts.forEach((post) => {
  urls.push({
    url: `/blogs/${post.id}`,
    changefreq: 'yearly',
    priority: 0.3,
  });
});

const sitemapStream = new SitemapStream({ hostname });

urls.forEach(url => {
  sitemapStream.write(url);
});

sitemapStream.end();

streamToPromise(sitemapStream).then(data => {
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), data.toString());
  console.log('Sitemap generated successfully!');
}).catch(err => {
  console.error('Error generating sitemap:', err);
});