import { prisma } from "../../lib/db";
import { KIND_LABELS } from "../../lib/posts-format";

export const revalidate = 3600;

const BASE = "https://www.fynnbuesnel.me";

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, quote: true, kind: true, publishedAt: true },
  });

  const items = posts
    .map(post => {
      const url = `${BASE}/posts/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.quote)}</description>
      <category>${escapeXml(KIND_LABELS[post.kind])}</category>
      <pubDate>${post.publishedAt.toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fynn Buesnel</title>
    <link>${BASE}/posts</link>
    <description>Stories, poems, essays, and book reviews by Fynn Buesnel.</description>
    <language>en-us</language>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
