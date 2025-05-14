#!/bin/bash

# Exit on error
set -e

# Print memory usage (helpful for debugging)
free -h

# Setup environment
echo "Setting up environment variables..."
export NODE_OPTIONS="--max_old_space_size=4096"
export NEXT_TELEMETRY_DISABLED=1
export CLOUDFLARE_PAGES=1

# Install dependencies 
echo "Installing dependencies..."
npm ci --prefer-offline --no-audit

# Build the application
echo "Building application..."
npm run build

# Remove unnecessary files to reduce size
echo "Optimizing build output..."
rm -rf .next/cache
find .next -type f -name "*.map" -delete

# Show final size
echo "Final build size:"
du -sh .next/

echo "Build completed successfully!" 