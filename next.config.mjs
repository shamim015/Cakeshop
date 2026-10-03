/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve files from /public directly instead of through the /_next/image optimizer
    unoptimized: true,
  },
};

export default nextConfig;
