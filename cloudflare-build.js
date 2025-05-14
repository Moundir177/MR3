/**
 * Cloudflare Pages build script
 * This script helps optimize the build process for Cloudflare Pages
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper to execute commands and log output
function runCommand(command) {
  console.log(`\n📋 Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    process.exit(1);
  }
}

console.log('🚀 Starting Cloudflare Pages build process');

// Set environment variables
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.NODE_ENV = 'production';
process.env.CLOUDFLARE_PAGES = '1';

// Set increased memory for Node.js
process.env.NODE_OPTIONS = '--max_old_space_size=4096';

// Install dependencies
console.log('📦 Installing dependencies');
runCommand('npm ci --prefer-offline --no-audit');

// Build the application
console.log('🏗️ Building Next.js application');
runCommand('npm run build');

// Optimize the build output
console.log('🧹 Cleaning up build artifacts');

// Remove cache directory to reduce size
const cachePath = path.join('.next', 'cache');
if (fs.existsSync(cachePath)) {
  console.log('  - Removing .next/cache directory');
  fs.rmSync(cachePath, { recursive: true, force: true });
}

// Remove source maps to reduce size
console.log('  - Removing source maps');
const removeSourceMaps = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      removeSourceMaps(fullPath);
    } else if (entry.name.endsWith('.map')) {
      fs.unlinkSync(fullPath);
    }
  }
};

removeSourceMaps('.next');

// Report final size
console.log('📊 Final build size:');
runCommand('du -sh .next');

console.log('✅ Build completed successfully!'); 