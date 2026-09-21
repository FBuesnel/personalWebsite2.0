import type { Metadata } from "next";
import { prisma } from "../../lib/db";
import ExperienceClient from "../../components/pages/ExperienceClient";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Software engineering at MirrorTab, The Nudge, ChitChat, and Beehive AI, plus teaching Distributed Systems at Boston University and studying abroad in Rome.",
};

// Static with on-demand revalidation: admin writes call revalidatePath.
export const revalidate = 3600;

export default async function ExperiencePage() {
  const entries = await prisma.experienceEntry.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  return (
    <ExperienceClient
      experience={entries.filter(e => e.section === "EXPERIENCE")}
      education={entries.filter(e => e.section === "EDUCATION")}
    />
  );
}
