'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';
import { useLocale } from '@/app/providers';

type LanguageSwitcherProps = {
  variant?: 'default' | 'minimal' | 'dropdown';
  className?: string;
};

export const locales = ['fr', 'ar', 'en'] as const;
export type Locale = typeof locales[number];

export const getLocaleName = (locale: Locale) => {
  const names: Record<Locale, string> = {
    fr: 'Français',
    ar: 'العربية',
    en: 'English'
  };
  return names[locale];
};

/**
 * Language switcher component that allows switching between supported languages
 */
export default function LanguageSwitcher({ 
  variant = 'default',
  className = ''
}: LanguageSwitcherProps) {
  const { locale } = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Calculate the new path for language switching
  const getLanguagePath = (lang: string) => {
    const segments = pathname.split('/');
    segments[1] = lang;
    return segments.join('/');
  };
  
  // Minimal variant (just an icon with a dropdown)
  if (variant === 'minimal') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary"
          aria-label="Change language"
        >
          <FiGlobe className="w-5 h-5" />
        </button>
        
        {isOpen && (
          <div className="absolute z-50 right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
            {locales.map((lang) => (
              <Link
                key={lang}
                href={getLanguagePath(lang)}
                className={`block px-4 py-2 text-sm ${
                  locale === lang 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {getLocaleName(lang as Locale)}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  // Dropdown variant
  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary"
        >
          <FiGlobe className="mr-1" />
          <span>{getLocaleName(locale as Locale)}</span>
          <FiChevronDown className={`ml-1 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-50 right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
            {locales.map((lang) => (
              <Link
                key={lang}
                href={getLanguagePath(lang)}
                className={`block px-4 py-2 text-sm ${
                  locale === lang 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {getLocaleName(lang as Locale)}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  // Default variant (buttons)
  return (
    <div className={`flex space-x-2 ${className}`}>
      {locales.map((lang) => (
        <Link
          key={lang}
          href={getLanguagePath(lang)}
          className={`px-3 py-1 text-sm rounded-md ${
            locale === lang 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {getLocaleName(lang as Locale)}
        </Link>
      ))}
    </div>
  );
} 