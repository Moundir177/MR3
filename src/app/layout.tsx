import '../styles/globals.css';
import { Inter, Amiri } from 'next/font/google';
import type { Metadata } from 'next';
import { Providers } from './providers';

// Font configuration
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-amiri',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'MIRA ACADEMY - Centre de Formation en Algérie',
  description: 'MIRA ACADEMY est un centre de formation professionnelle algérien dédié à l\'excellence éducative.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${amiri.variable} font-sans font-inter bg-background-light dark:bg-background-dark`} suppressHydrationWarning>
        <Providers locale="fr">
          {children}
        </Providers>
      </body>
    </html>
  );
} 