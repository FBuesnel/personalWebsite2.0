import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StyledComponentsRegistry from "../lib/registry";
import ThemeShell from "../components/ThemeShell";
import { baskerville } from "./fonts";
import "./globals.css";

const SITE_DESCRIPTION =
  "Fynn Buesnel is a software engineer studying Computer Science and Economics at Boston University. Read about his work, projects, and writing.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fynnbuesnel.me"),
  title: {
    default: "Fynn Buesnel | Software Engineer",
    template: "%s | Fynn Buesnel",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Fynn Buesnel" }],
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    siteName: "Fynn Buesnel",
    title: "Fynn Buesnel | Software Engineer",
    description: SITE_DESCRIPTION,
    url: "/",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary",
  },
};

// Matched to --background per theme; the init script and the navbar toggle
// keep the meta tag in sync so browser chrome follows the active theme.
export const viewport: Viewport = {
  themeColor: "#1e1e1e",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fynn Buesnel",
  url: "https://www.fynnbuesnel.me/",
  image: "https://www.fynnbuesnel.me/og-image.jpg",
  jobTitle: "Software Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Boston University",
  },
  sameAs: [
    "https://www.linkedin.com/in/fbuesnel/",
    "https://github.com/FBuesnel",
    "https://instagram.com/fynnbuesnel",
  ],
};

// Runs before first paint so the stored theme applies with no flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var l=t==='light';document.documentElement.dataset.theme=l?'light':'dark';var s=function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',l?'#dad5d2':'#1e1e1e');};s();document.addEventListener('DOMContentLoaded',s);}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={baskerville.variable}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <StyledComponentsRegistry>
          <ThemeShell>{children}</ThemeShell>
        </StyledComponentsRegistry>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
