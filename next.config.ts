import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Produce a standalone build for tiny Docker images.
     Outputs .next/standalone/ containing a self-contained server.js. */
  output: "standalone",

  /* Trust the X-Forwarded-* headers from the Nginx reverse proxy on Hostinger VPS. */
  poweredByHeader: false,

  /* Whitelist external image hosts used by next/image */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
    ],
  },
};

export default nextConfig;
