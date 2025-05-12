'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/app/providers';
import { FiChevronRight } from 'react-icons/fi';

type BreadcrumbsProps = {
  className?: string;
  homeIcon?: React.ReactNode;
  separator?: React.ReactNode;
  overrides?: Record<string, string>;
  omitHome?: boolean;
};

/**
 * Localized breadcrumb navigation component
 */
export default function Breadcrumbs({
  className = '',
  homeIcon = null,
  separator = <FiChevronRight className={`mx-2 flex-shrink-0 ${useLocale().isRTL ? 'flip-x' : ''}`} />,
  overrides = {},
  omitHome = false,
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const { locale, isRTL } = useLocale();
  
  // Skip rendering for home page
  if (pathname === `/${locale}` || pathname === '/') {
    return null;
  }
  
  // Extract path segments
  const segments = pathname.split('/').filter(Boolean);
  
  // Remove language segment from path segments for processing
  if (segments[0] === locale) {
    segments.shift();
  }
  
  // If all segments are removed, return null
  if (segments.length === 0) {
    return null;
  }
  
  // Translation mapping
  const pathTranslations: Record<string, Record<string, string>> = {
    fr: {
      home: 'Accueil',
      courses: 'Formations',
      about: 'À propos',
      contact: 'Contact',
      blog: 'Blog',
      login: 'Connexion',
      register: 'Inscription',
    },
    en: {
      home: 'Home',
      courses: 'Courses',
      about: 'About',
      contact: 'Contact',
      blog: 'Blog',
      login: 'Login',
      register: 'Register',
    },
    ar: {
      home: 'الرئيسية',
      courses: 'الدورات التدريبية',
      about: 'من نحن',
      contact: 'اتصل بنا',
      blog: 'المدونة',
      login: 'تسجيل الدخول',
      register: 'التسجيل',
    },
  };
  
  // Get translated segment name
  const getSegmentName = (segment: string): string => {
    // First check if there's an override for this segment
    if (overrides[segment]) {
      return overrides[segment];
    }
    
    // Then check if there's a translation in our mapping
    if (pathTranslations[locale]?.[segment]) {
      return pathTranslations[locale][segment];
    }
    
    // Fallback: capitalize first letter and replace hyphens with spaces
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Build breadcrumb links
  const breadcrumbs = [];
  
  // Add home link if not omitted
  if (!omitHome) {
    breadcrumbs.push({
      label: homeIcon || getSegmentName('home'),
      href: `/${locale}`,
      isCurrent: false,
    });
  }
  
  // Add segment links
  let currentPath = `/${locale}`;
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: getSegmentName(segment),
      href: currentPath,
      isCurrent: index === segments.length - 1,
    });
  });
  
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center text-sm ${isRTL ? 'flex-row-reverse' : ''} ${className}`}
    >
      <ol className={`flex items-center flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && separator}
            
            {breadcrumb.isCurrent ? (
              <span 
                aria-current="page" 
                className="font-medium text-blue"
              >
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="text-gray-500 hover:text-blue dark:text-gray-400 dark:hover:text-gray-200"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 