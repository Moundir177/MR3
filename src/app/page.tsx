import { redirect } from 'next/navigation';

export const dynamicParams = false;

export default function Home() {
  // This will redirect on the server side
  redirect('/fr');
  
  // This is a fallback in case the redirect doesn't work
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1>MIRA Academy</h1>
      <p>Redirecting to the main page...</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/fr" style={{ color: '#0070f3', textDecoration: 'none', marginRight: '10px' }}>French</a>
        <a href="/en" style={{ color: '#0070f3', textDecoration: 'none', marginRight: '10px' }}>English</a>
        <a href="/ar" style={{ color: '#0070f3', textDecoration: 'none' }}>Arabic</a>
          </div>
    </div>
  );
}

// Generate static parameters for all supported locales
export function generateStaticParams() {
  return [];
} 