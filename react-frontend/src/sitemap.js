// filepath: src/sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
const path = require('path');
const hostname = 'https://www.fynnbuesnel.me';

const postsDirectory = path.join(__dirname, 'posts');
const postFiles = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));

const posts = postFiles.map(file => {
  const id = path.basename(file, '.md');
  const title = fs.readFileSync(path.join(postsDirectory, file), 'utf8').split('\n')[0].replace('# ', '');
  const urlTitle = title.toLowerCase().replace(/\s+/g, '-');
  console.log(urlTitle);
  return { id, title: urlTitle };
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
    url: `/posts/${post.title}`,
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