import type { Metadata } from "next";
import ContactClient from "../../components/pages/ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Fynn Buesnel about his projects, experience, or writing.",
};

export default function ContactPage() {
  return <ContactClient />;
}
