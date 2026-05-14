/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable partial prerendering for hybrid static/dynamic rendering
    ppr: false,
  },
  // Optimized image domains
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
