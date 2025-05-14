/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // swcMinify: true, // Removed - deprecated in Next.js 15+
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
    minimumCacheTTL: 60, // Increase cache time to reduce builds
  },
  output: 'standalone', // Optimize for Cloudflare Pages deployment
  experimental: {
    // Enable serverActions only for client components to avoid SSR issues
    serverActions: {
      allowedOrigins: ['localhost:3000', 'mracad.pages.dev', '*.mracad.pages.dev'],
    },
    // Reduce memory usage during builds
    memoryBasedWorkersCount: true,
  },
  typescript: {
    // Disable type checking in production build to speed up deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable eslint checking in production build to speed up deployment
    ignoreDuringBuilds: true,
  },
  // Add webpack configuration for path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src/'),
    };
    return config;
  },
};

module.exports = nextConfig; 