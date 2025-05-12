'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { useLocale } from '@/app/providers';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { locale, isRTL } = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: `/${locale}`, label: 'common.home' },
    { href: `/${locale}/about`, label: 'common.about' },
    { href: `/${locale}/courses`, label: 'common.courses' },
    { href: `/${locale}/events`, label: 'common.events' },
    { href: `/${locale}/contact`, label: 'common.contact' },
  ];

  const translations: Record<string, Record<string, string>> = {
    fr: {
      'common.home': 'Accueil',
      'common.about': 'À propos',
      'common.courses': 'Formations',
      'common.contact': 'Contact',
      'common.login': 'Connexion',
      'common.register': 'S\'inscrire',
      'common.language': 'Langue',
      'theme.light': 'Mode clair',
      'theme.dark': 'Mode sombre'
    },
    ar: {
      'common.home': 'الرئيسية',
      'common.about': 'من نحن',
      'common.courses': 'الدورات التدريبية',
      'common.contact': 'اتصل بنا',
      'common.login': 'تسجيل الدخول',
      'common.register': 'التسجيل',
      'common.language': 'اللغة',
      'theme.light': 'الوضع الفاتح',
      'theme.dark': 'الوضع الداكن'
    },
    en: {
      'common.home': 'Home',
      'common.about': 'About',
      'common.courses': 'Courses',
      'common.contact': 'Contact',
      'common.login': 'Login',
      'common.register': 'Register',
      'common.language': 'Language',
      'theme.light': 'Light Mode',
      'theme.dark': 'Dark Mode'
    }
  };

  const t = (key: string) => {
    return translations[locale]?.[key] || key;
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            href={`/${locale}`}
            className="flex items-center"
          >
            <span className="text-2xl font-bold gradient-text">MIRA ACADEMY</span>
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden md:flex md:items-center ${isRTL ? 'md:space-x-reverse' : ''} md:space-x-8`}>
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium animated-underline hover:text-blue transition-colors ${
                  pathname === link.href ? 'text-blue' : 'text-text-light dark:text-text-dark'
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
          </div>

          {/* Language and Theme Toggles */}
          <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
            {/* Language Dropdown */}
            <LanguageSwitcher variant="dropdown" />

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>

            {/* Auth Buttons */}
            <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
              <Link
                href={`/${locale}/login`}
                className="btn-outline-blue px-4 py-2 text-sm font-medium transition-colors"
              >
                {t('common.login')}
              </Link>
              <Link
                href={`/${locale}/register`}
                className="btn btn-blue px-4 py-2 text-sm font-medium rounded-md transition-colors"
              >
                {t('common.register')}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-text-light dark:text-text-dark"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={closeMenu}
                  className={`px-4 py-2 text-base font-medium hover:text-blue transition-colors ${
                    pathname === link.href ? 'text-blue' : 'text-text-light dark:text-text-dark'
                  }`}
                >
                  {t(link.label)}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="px-4 py-2">
                <p className="text-sm text-text-muted mb-2">{t('common.language')}</p>
                <LanguageSwitcher variant="default" />
              </div>
              
              {/* Mobile Theme Toggle */}
              <div className="px-4 py-2 flex items-center">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center space-x-2 text-text-light dark:text-text-dark"
                >
                  {mounted && theme === 'dark' ? <FiSun /> : <FiMoon />}
                  <span>{theme === 'dark' ? t('theme.light') : t('theme.dark')}</span>
                </button>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="px-4 py-2 flex flex-col space-y-2">
                <Link
                  href={`/${locale}/login`}
                  onClick={closeMenu}
                  className="btn-outline-blue px-4 py-2 text-sm font-medium text-center"
                >
                  {t('common.login')}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  onClick={closeMenu}
                  className="btn btn-blue px-4 py-2 text-sm font-medium text-center"
                >
                  {t('common.register')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 