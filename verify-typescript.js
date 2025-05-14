const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying TypeScript Installation');

// Check if TypeScript is installed
try {
  const tscVersion = execSync('npx tsc --version', { encoding: 'utf8' });
  console.log(`TypeScript version: ${tscVersion.trim()}`);
} catch (error) {
  console.error('❌ TypeScript is not correctly installed');
  console.error(error);
  process.exit(1);
}

// Check if tsconfig.json exists
const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  console.log('✅ tsconfig.json exists');
} else {
  console.error('❌ tsconfig.json does not exist');
  process.exit(1);
}

// Check if next-env.d.ts exists
const nextEnvPath = path.join(process.cwd(), 'next-env.d.ts');
if (fs.existsSync(nextEnvPath)) {
  console.log('✅ next-env.d.ts exists');
} else {
  console.error('❌ next-env.d.ts does not exist');
  process.exit(1);
}

console.log('✅ TypeScript verification complete'); 