import type { Metadata } from "next";
import { prisma } from "../../lib/db";
import PortfolioClient from "../../components/pages/PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Projects by Fynn Buesnel, including LUMINA, a production wellness booking platform, and DormDash, a cross-platform delivery app.",
};

export const revalidate = 3600;

export default async function PortfolioPage() {
  const projects = await prisma.portfolioProject.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  return <PortfolioClient projects={projects} />;
}
