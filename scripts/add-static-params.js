/**
 * This script adds generateStaticParams functions to all dynamic route files
 * to support Next.js static export
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Define our supported locales
const locales = ['fr', 'en', 'ar'];

// Define dummy content for testing
const blogSlugs = ['post-1', 'post-2', 'post-3'];
const courseSlugs = ['course-1', 'course-2', 'course-3'];
const eventSlugs = ['event-1', 'event-2', 'event-3'];

// Helper to check if a file already has generateStaticParams
function hasGenerateStaticParams(content) {
  return content.includes('export function generateStaticParams');
}

// Helper to add generateStaticParams to a file
function addGenerateStaticParams(filePath, params) {
  console.log(`Processing ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if the file already has the function
  if (hasGenerateStaticParams(content)) {
    console.log(`  Already has generateStaticParams, skipping.`);
    return;
  }
  
  // Add the generateStaticParams function
  content += `\n\n// Static params for Next.js static export
export function generateStaticParams() {
  return ${JSON.stringify(params, null, 2)};
}\n`;
  
  // Write the modified content back
  fs.writeFileSync(filePath, content);
  console.log(`  Added generateStaticParams to ${filePath}`);
}

// Find all dynamic route files
const appDir = path.join(process.cwd(), 'src', 'app');

// Process [lang] routes
glob.sync(`${appDir}/\\[lang\\]/page.tsx`).forEach(file => {
  addGenerateStaticParams(file, locales.map(locale => ({ lang: locale })));
});

// Process [lang]/blog/[slug] routes
glob.sync(`${appDir}/\\[lang\\]/blog/\\[slug\\]/page.tsx`).forEach(file => {
  const params = [];
  locales.forEach(locale => {
    blogSlugs.forEach(slug => {
      params.push({ lang: locale, slug });
    });
  });
  addGenerateStaticParams(file, params);
});

// Process [lang]/courses/[slug] routes
glob.sync(`${appDir}/\\[lang\\]/courses/\\[slug\\]/page.tsx`).forEach(file => {
  const params = [];
  locales.forEach(locale => {
    courseSlugs.forEach(slug => {
      params.push({ lang: locale, slug });
    });
  });
  addGenerateStaticParams(file, params);
});

// Process [lang]/events/[slug] routes
glob.sync(`${appDir}/\\[lang\\]/events/\\[slug\\]/page.tsx`).forEach(file => {
  const params = [];
  locales.forEach(locale => {
    eventSlugs.forEach(slug => {
      params.push({ lang: locale, slug });
    });
  });
  addGenerateStaticParams(file, params);
});

console.log('All dynamic routes processed with generateStaticParams functions.'); 