/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      }
    ],
    unoptimized: true, // Fix for Cloudflare Pages deployment - must be unconditionally true
  },
  output: 'standalone', // Optimize for Cloudflare Pages deployment
};

module.exports = nextConfig; 