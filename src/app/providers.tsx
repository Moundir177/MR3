'use client';

import { ThemeProvider } from 'next-themes';
import React, { createContext, useContext, ReactNode } from 'react';

type LocaleContextType = {
  locale: string;
  isRTL: boolean;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: 'fr',
  isRTL: false,
});

export const useLocale = () => useContext(LocaleContext);

export function Providers({
  children,
  locale = 'fr',
}: {
  children: ReactNode;
  locale?: string;
}) {
  const isRTL = locale === 'ar';

  return (
    <LocaleContext.Provider value={{ locale, isRTL }}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </LocaleContext.Provider>
  );
} 