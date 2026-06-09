import type { Metadata } from "next";
import PortfolioClient from "../../components/pages/PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Projects by Fynn Buesnel, including LUMINA, a production wellness booking platform, and DormDash, a cross-platform delivery app.",
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
