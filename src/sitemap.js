
const sitemap = require('sitemap');
const hostname = 'https://www.fynnbuesnel.me';

const urls = [
  { url: '/', changefreq: 'monthly', priority: 1 },
  { url: '/experience', changefreq: 'monthly', priority: 0.5 },
  { url: '/portfolio', changefreq: 'monthly', priority: 0.8 },
  { url: '/blogs', changefreq: 'monthly', priority: 0.4 },
  { url: '/contact', changefreq: 'yearly', priority: 0.2 },
  // Add additional pages here
];

const sitemapInstance = sitemap.createSitemap({
  hostname,
  urls,
});
