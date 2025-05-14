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
    unoptimized: process.env.NODE_ENV === 'production', // Optimize for Cloudflare Pages
  },
  output: 'standalone', // Optimize for Cloudflare Pages
};

module.exports = nextConfig; 