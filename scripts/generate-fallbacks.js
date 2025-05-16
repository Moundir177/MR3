/**
 * Generate fallback pages for dynamic routes
 * This script is necessary when using Next.js static export with dynamic routes
 */

const fs = require('fs');
const path = require('path');

// Define the supported locales
const locales = ['fr', 'ar', 'en'];

// Define the dynamic routes that need fallbacks
const dynamicRoutes = [
  '/[lang]/admissions',
  '/[lang]/blog',
  '/[lang]/blog/[slug]',
  '/[lang]/contact',
  '/[lang]/courses',
  '/[lang]/courses/[slug]',
  '/[lang]/events',
  '/[lang]/events/[slug]',
  '/[lang]/faculty',
  '/[lang]/faq',
  '/[lang]/resources',
  '/[lang]/testimonials',
];

console.log('Generating fallback pages for dynamic routes...');

// Create fallbacks for the dynamic routes with actual locales
locales.forEach(locale => {
  dynamicRoutes.forEach(route => {
    // Replace [lang] with the actual locale
    let localeRoute = route.replace('[lang]', locale);
    
    // For routes with other dynamic parameters, create a simple fallback
    // We'll handle these with client-side routing
    if (localeRoute.includes('[')) {
      const basePath = localeRoute.split('[')[0];
      localeRoute = basePath + '_fallback';
    }
    
    const outDir = path.join(process.cwd(), 'out', localeRoute);
    
    // Ensure directory exists
    try {
      fs.mkdirSync(outDir, { recursive: true });
      console.log(`Created directory: ${outDir}`);
      
      // Create a simple HTML fallback that redirects to the main page
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MIRA Academy</title>
  <meta http-equiv="refresh" content="0;url=/${locale}">
  <script>
    window.location.href = '/${locale}';
  </script>
</head>
<body>
  <p>Redirecting to <a href="/${locale}">MIRA Academy</a>...</p>
</body>
</html>
      `;
      
      fs.writeFileSync(path.join(outDir, 'index.html'), htmlContent);
      console.log(`Created fallback for: ${localeRoute}`);
    } catch (error) {
      console.error(`Error creating fallback for ${localeRoute}:`, error);
    }
  });
});

console.log('Fallback generation complete!');

// Create a root redirect to the default locale (fr)
try {
  const rootHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MIRA Academy</title>
  <meta http-equiv="refresh" content="0;url=/fr">
  <script>
    window.location.href = '/fr';
  </script>
</head>
<body>
  <p>Redirecting to <a href="/fr">MIRA Academy</a>...</p>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join(process.cwd(), 'out', 'index.html'), rootHtml);
  console.log('Created root redirect to /fr');
} catch (error) {
  console.error('Error creating root redirect:', error);
} 