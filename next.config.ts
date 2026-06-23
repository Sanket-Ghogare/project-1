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

  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "img-src 'self' data: blob: https://images.unsplash.com https://logo.clearbit.com",
      "font-src 'self' data:",
      // Next.js dev/runtime needs inline+eval; tighten further only if you migrate to nonces.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "connect-src 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "SAMEORIGIN" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Content-Security-Policy",   value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
