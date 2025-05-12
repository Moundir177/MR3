import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Import translation files
import fr from './fr.json';
import ar from './ar.json';
import en from './en.json';

// Type definitions
type Locale = 'fr' | 'ar' | 'en';
type Translations = typeof fr;

// Translations object
const translations: Record<Locale, Translations> = {
  fr,
  ar,
  en,
};

// Get translation for a key
export const getTranslation = (locale: Locale, key: string) => {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    if (!value[k]) return key;
    value = value[k];
  }
  
  return value;
};

// Hook to use translations
export const useTranslations = () => {
  const router = useRouter();
  const { locale = 'fr' } = router;
  const currentLocale = locale as Locale;
  
  const t = (key: string) => getTranslation(currentLocale, key);
  
  return {
    t,
    locale: currentLocale,
    changeLocale: (newLocale: Locale) => {
      router.push(router.pathname, router.asPath, { locale: newLocale });
    },
    isRTL: currentLocale === 'ar',
  };
};

// Direction utility
export const getDirection = (locale: string): 'ltr' | 'rtl' => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};

// Available locales
export const locales: Locale[] = ['fr', 'ar', 'en'];

// Get locale name
export const getLocaleName = (locale: Locale): string => {
  switch (locale) {
    case 'fr':
      return 'Français';
    case 'ar':
      return 'العربية';
    case 'en':
      return 'English';
    default:
      return locale;
  }
};

// Hook to handle document direction
export const useDocumentDirection = () => {
  const { locale, isRTL } = useTranslations();
  
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale, isRTL]);
  
  return { isRTL };
}; 