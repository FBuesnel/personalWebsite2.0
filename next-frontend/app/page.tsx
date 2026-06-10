import { prisma } from "../lib/db";
import HomeClient from "../components/pages/HomeClient";

export const revalidate = 3600;

export default async function Home() {
  const recentPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { slug: true, title: true, quote: true },
  });
  return <HomeClient recentPosts={recentPosts} />;
}
