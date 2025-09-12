import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  i18n: {
    locales: ["en", "bn"], // Supported languages
    defaultLocale: "en", // Default language
  },
};

export default nextConfig;
