'use client';

import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { useLocale } from '@/app/providers';

/**
 * Helper function to generate metadata for Next.js App Router
 */
export function generateMetadata(
  params: { lang: string, [key: string]: string },
  parent?: ResolvingMetadata,
  title?: string,
  description?: string
): Metadata {
  const { lang } = params;
  const locale = lang || 'fr';
  const isRTL = locale === 'ar';
  
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
  
  const formattedTitle = getLocalizedTitle(title || '');
  const formattedDescription = getLocalizedDescription(description || '');
  
  return {
    title: formattedTitle,
    description: formattedDescription,
    openGraph: {
      title: formattedTitle,
      description: formattedDescription,
      url: `https://mira-academy.com/${locale}`,
      siteName: 'MIRA ACADEMY',
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: `https://mira-academy.com/${locale}`,
      languages: {
        'fr': `https://mira-academy.com/fr`,
        'en': `https://mira-academy.com/en`,
        'ar': `https://mira-academy.com/ar`,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description: formattedDescription,
    },
  };
}

export function getLocalizedCourseMetadata(
  params: { lang: string, slug: string },
  course: any
): Metadata {
  const { lang } = params;
  const locale = lang || 'fr';
  
  // Localized course information
  const localizedTitles: Record<string, string> = {
    en: `${course.title} - Online Course`,
    fr: `${course.title} - Formation en ligne`,
    ar: `${course.title} - دورة عبر الإنترنت`,
  };
  
  const localizedDescriptions: Record<string, string> = {
    en: `Learn ${course.title} with our comprehensive online course. Expert instructor, practical projects, and recognized certification.`,
    fr: `Apprenez ${course.title} avec notre formation en ligne complète. Formateur expert, projets pratiques et certification reconnue.`,
    ar: `تعلم ${course.title} مع دورتنا الشاملة عبر الإنترنت. مدرب خبير ومشاريع عملية وشهادة معترف بها.`,
  };
  
  return {
    title: localizedTitles[locale] || localizedTitles.fr,
    description: localizedDescriptions[locale] || localizedDescriptions.fr,
    openGraph: {
      title: localizedTitles[locale] || localizedTitles.fr,
      description: localizedDescriptions[locale] || localizedDescriptions.fr,
      url: `https://mira-academy.com/${locale}/courses/${course.slug}`,
      siteName: 'MIRA ACADEMY',
      locale: locale,
      type: 'website',
      images: [
        {
          url: course.image,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    alternates: {
      canonical: `https://mira-academy.com/${locale}/courses/${course.slug}`,
      languages: {
        'fr': `https://mira-academy.com/fr/courses/${course.slug}`,
        'en': `https://mira-academy.com/en/courses/${course.slug}`,
        'ar': `https://mira-academy.com/ar/courses/${course.slug}`,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedTitles[locale] || localizedTitles.fr,
      description: localizedDescriptions[locale] || localizedDescriptions.fr,
      images: [course.image],
    },
  };
} 