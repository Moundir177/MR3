'use client';

import React, { useEffect, ReactNode } from 'react';
import { useLocale } from '@/app/providers';

type RTLProviderProps = {
  children: ReactNode;
};

/**
 * RTLProvider sets the document direction attribute based on the current locale.
 * It ensures proper RTL (right-to-left) support for Arabic content.
 */
export default function RTLProvider({ children }: RTLProviderProps) {
  const { isRTL, locale } = useLocale();
  
  useEffect(() => {
    // Set the document direction attribute
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Also update the lang attribute to ensure proper language identification
    document.documentElement.lang = locale;
    
    // Set a body class for additional RTL-specific styling
    if (isRTL) {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }
    
    return () => {
      // Clean up when component unmounts
      document.body.classList.remove('rtl-layout');
    };
  }, [isRTL, locale]);
  
  return <>{children}</>;
} 