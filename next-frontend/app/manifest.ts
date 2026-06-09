import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fynn Buesnel | Software Engineer",
    short_name: "Fynn Buesnel",
    start_url: "/",
    display: "standalone",
    theme_color: "#1e1e1e",
    background_color: "#1e1e1e",
    icons: [
      { src: "/logo192.png", sizes: "192x192", type: "image/png" },
      { src: "/logo512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
