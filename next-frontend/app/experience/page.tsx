import type { Metadata } from "next";
import { prisma } from "../../lib/db";
import ExperienceClient from "../../components/pages/ExperienceClient";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Software engineering roles at MirrorTab, The Nudge, and Beehive AI, plus teaching and leadership at Boston University.",
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
