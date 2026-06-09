import type { Metadata } from "next";
import ExperienceClient from "../../components/pages/ExperienceClient";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Software engineering roles at MirrorTab, The Nudge, and Beehive AI, plus teaching and leadership at Boston University.",
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
