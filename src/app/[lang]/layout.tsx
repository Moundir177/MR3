'use client';

import React from 'react';
import { Inter, Amiri } from 'next/font/google';
import { Providers } from '@/app/providers';
import RTLProvider from '@/components/RTLProvider';
import '@/app/globals.css';

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

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // Extract the language code safely using React.use()
  const resolvedParams = React.use(params);
  const langCode = resolvedParams?.lang || 'fr';
  const isRTL = langCode === 'ar';
  
  return (
    <div className={`${inter.variable} ${amiri.variable} ${isRTL ? 'rtl-layout' : ''}`}>
      <Providers locale={langCode}>
        <RTLProvider>
          {children}
        </RTLProvider>
      </Providers>
    </div>
  );
} 