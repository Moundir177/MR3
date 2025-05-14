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

// Simplify TypeScript configuration for build
console.log('🔧 Setting up TypeScript configuration');
// Use the simpler TypeScript config
if (fs.existsSync('temp-tsconfig.json')) {
  fs.copyFileSync('temp-tsconfig.json', 'tsconfig.json');
  console.log('✅ Using simplified tsconfig.json');
}

// Directly install TypeScript
console.log('📦 Installing TypeScript dependencies');
runCommand('npm install -g typescript');
runCommand('npm install --no-save typescript@4.9.5 @types/node@18.11.18 @types/react@18.0.27 @types/react-dom@18.0.10');

// Build the application using direct build command
console.log('🏗️ Building Next.js application');
runCommand('next build');

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