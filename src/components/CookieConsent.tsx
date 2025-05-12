'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/providers';
import Link from 'next/link';

type CookieConsentProps = {
  className?: string;
  position?: 'bottom' | 'top' | 'bottom-left' | 'bottom-right';
};

/**
 * Multilingual cookie consent banner component
 */
export default function CookieConsent({
  className = '',
  position = 'bottom',
}: CookieConsentProps) {
  const { locale, isRTL } = useLocale();
  const [visible, setVisible] = useState(false);
  
  // Check if consent has been given on mount
  useEffect(() => {
    // Small delay to prevent flash on initial load
    const timer = setTimeout(() => {
      const hasConsent = localStorage.getItem('cookie-consent') === 'true';
      if (!hasConsent) {
        setVisible(true);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle accepting cookies
  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  };
  
  // Handle declining cookies
  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'false');
    setVisible(false);
  };
  
  // Position classes
  const positionClasses = {
    'bottom': 'inset-x-0 bottom-0',
    'top': 'inset-x-0 top-0',
    'bottom-left': 'bottom-4 left-4 max-w-md',
    'bottom-right': 'bottom-4 right-4 max-w-md',
  };
  
  // Translations
  const translations: Record<string, Record<string, string>> = {
    en: {
      title: 'Cookie Consent',
      description: 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.',
      acceptAll: 'Accept All',
      decline: 'Decline',
      settings: 'Cookie Settings',
      privacyPolicy: 'Privacy Policy',
    },
    fr: {
      title: 'Consentement aux cookies',
      description: 'Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. En cliquant sur "Accepter", vous consentez à notre utilisation des cookies.',
      acceptAll: 'Tout accepter',
      decline: 'Refuser',
      settings: 'Paramètres des cookies',
      privacyPolicy: 'Politique de confidentialité',
    },
    ar: {
      title: 'موافقة على ملفات تعريف الارتباط',
      description: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك، وتحليل حركة المرور على الموقع، وتخصيص المحتوى. بالنقر فوق "قبول"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
      acceptAll: 'قبول الكل',
      decline: 'رفض',
      settings: 'إعدادات ملفات تعريف الارتباط',
      privacyPolicy: 'سياسة الخصوصية',
    },
  };
  
  const t = (key: string): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };
  
  if (!visible) {
    return null;
  }
  
  return (
    <div 
      className={`fixed z-50 ${positionClasses[position]} p-4 ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="card glass p-4 md:p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('title')}
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t('description')}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Link 
              href={`/${locale}/privacy-policy`}
              className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
            >
              {t('privacyPolicy')}
            </Link>
            
            <div className="flex-grow"></div>
            
            <button 
              onClick={declineCookies}
              className="btn-outline px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t('decline')}
            </button>
            
            <button 
              onClick={acceptCookies}
              className="btn btn-primary px-4 py-2 text-sm rounded-lg"
            >
              {t('acceptAll')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 