'use client';

import React from 'react';
import Head from 'next/head';
import { useLocale } from '@/app/providers';

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  canonical?: string;
  noIndex?: boolean;
};

/**
 * SEO component for handling localized metadata
 */
export default function SEO({
  title = '',
  description = '',
  keywords = '',
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonical = '',
  noIndex = false,
}: SEOProps) {
  const { locale, isRTL } = useLocale();
  
  // Localized title mappings
  const getLocalizedTitle = (title: string): string => {
    if (!title) return 'MIRA ACADEMY';
    
    const siteName = 'MIRA ACADEMY';
    const localizedTitles: Record<string, Record<string, string>> = {
      en: {
        home: 'Home',
        about: 'About Us',
        courses: 'Our Courses',
        contact: 'Contact Us',
      },
      fr: {
        home: 'Accueil',
        about: 'À propos',
        courses: 'Nos formations',
        contact: 'Contactez-nous',
      },
      ar: {
        home: 'الرئيسية',
        about: 'من نحن',
        courses: 'دوراتنا التدريبية',
        contact: 'اتصل بنا',
      },
    };
    
    // If it's a predefined page, use localized title
    if (localizedTitles[locale] && localizedTitles[locale][title.toLowerCase()]) {
      return `${localizedTitles[locale][title.toLowerCase()]} | ${siteName}`;
    }
    
    // Otherwise just use the passed title
    return `${title} | ${siteName}`;
  };
  
  // Localized descriptions
  const getLocalizedDescription = (description: string): string => {
    if (description) return description;
    
    // Default descriptions by locale
    const defaultDescriptions: Record<string, string> = {
      en: 'MIRA ACADEMY is a professional training center in Algeria dedicated to educational excellence.',
      fr: 'MIRA ACADEMY est un centre de formation professionnelle algérien dédié à l\'excellence éducative.',
      ar: 'أكاديمية ميرا هي مركز تدريب مهني في الجزائر مكرس للتميز التعليمي.',
    };
    
    return defaultDescriptions[locale] || defaultDescriptions.fr;
  };
  
  // Format metadata
  const formattedTitle = getLocalizedTitle(title);
  const formattedDescription = getLocalizedDescription(description);
  
  // Construct canonical URL
  const siteUrl = 'https://mira-academy.com';
  const formattedCanonical = canonical 
    ? `${siteUrl}${canonical}`
    : `${siteUrl}/${locale}`;
  
  return (
    <Head>
      <title>{formattedTitle}</title>
      <meta name="description" content={formattedDescription} />
      
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={formattedCanonical} />
      
      {/* Alternate language URLs */}
      <link rel="alternate" href={`${siteUrl}/fr`} hrefLang="fr" />
      <link rel="alternate" href={`${siteUrl}/en`} hrefLang="en" />
      <link rel="alternate" href={`${siteUrl}/ar`} hrefLang="ar" />
      
      {/* Open Graph */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={formattedDescription} />
      <meta property="og:url" content={formattedCanonical} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={formattedDescription} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* No index if specified */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Language direction */}
      <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} />
    </Head>
  );
} 