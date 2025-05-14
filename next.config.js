/** @type {import('next').NextConfig} */
const path = require('path');

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
    unoptimized: true, // Required for Cloudflare Pages
    minimumCacheTTL: 60,
  },
  // Change output mode to export for Cloudflare Pages compatibility
  output: 'export',
  distDir: '.next',
  experimental: {
    // Enable serverActions only for client components
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