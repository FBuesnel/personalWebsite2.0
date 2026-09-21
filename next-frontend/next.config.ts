import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  turbopack: {
    // Pin the workspace root: stray lockfiles in the repo root otherwise
    // make Turbopack mis-infer it and break the client module manifest.
    root: __dirname,
  },
};

export default nextConfig;
