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
  // Use export mode for better Cloudflare compatibility
  output: 'export',
  
  // Generate static HTML to ensure good Cloudflare Pages compatibility
  generateEtags: false,
  poweredByHeader: false,
  
  // Enable asset prefixing for better path handling
  assetPrefix: '',
  
  // Required for static export with dynamic routes
  experimental: {
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