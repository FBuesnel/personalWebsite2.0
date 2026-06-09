// filepath: src/sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
const path = require('path');
const hostname = 'https://www.fynnbuesnel.me';

// Post URLs come from the `id` fields in posts.ts — those are the real route
// slugs (/posts/:id), not the markdown titles.
const postsRegistry = fs.readFileSync(path.join(__dirname, 'posts', 'posts.ts'), 'utf8');
const posts = [...postsRegistry.matchAll(/id:\s*'([^']+)'/g)].map(match => {
  console.log(match[1]);
  return { id: match[1] };
});

const urls = [
  { url: '/', changefreq: 'monthly', priority: 1 },
  { url: '/experience', changefreq: 'monthly', priority: 0.5 },
  { url: '/portfolio', changefreq: 'monthly', priority: 0.8 },
  { url: '/posts', changefreq: 'monthly', priority: 0.4 },
  { url: '/contact', changefreq: 'yearly', priority: 0.2 },
  // Additional pages here
];

// Add blog posts to the sitemap
posts.forEach((post) => {
  urls.push({
    url: `/posts/${post.id}`,
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
}).catch(err => {
  console.error('Error generating sitemap:', err);
});