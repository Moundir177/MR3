'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface HomeClientProps {
  langCode: string;
  t: any;
  heroImageUrl: string;
}

export default function HomeClient({ langCode, t, heroImageUrl }: HomeClientProps) {
  const pathname = usePathname();
  const currentPath = pathname.split('/').slice(2).join('/');
  
  // Scroll animation references
  const statsRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  
  // Animation states
  const [statsVisible, setStatsVisible] = useState(false);
  const [coursesVisible, setCoursesVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const [eventsVisible, setEventsVisible] = useState(false);

  // Use framer-motion's useInView for scroll animations
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const coursesInView = useInView(coursesRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });
  const eventsInView = useInView(eventsRef, { once: true, amount: 0.3 });

  // Update visibility state when sections come into view
  useEffect(() => {
    if (statsInView) setStatsVisible(true);
    if (coursesInView) setCoursesVisible(true);
    if (featuresInView) setFeaturesVisible(true);
    if (testimonialsInView) setTestimonialsVisible(true);
    if (eventsInView) setEventsVisible(true);
  }, [statsInView, coursesInView, featuresInView, testimonialsInView, eventsInView]);

  // Helper for language switching
  const getLanguagePath = (newLang: string) => {
    if (currentPath) {
      return `/${newLang}/${currentPath}`;
    }
    return `/${newLang}`;
  };

  // Function to handle smooth scroll
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-r from-primary to-secondary overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          
          {/* Hero Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImageUrl}
              alt={t.hero.imageCaption}
              fill
              priority
              className="object-cover object-center opacity-20"
            />
          </div>
          
          <div className="container relative z-10 mx-auto px-4 py-20 flex flex-col justify-center min-h-screen">
            <div className="max-w-5xl mx-auto text-center text-white">
              {/* Language switcher */}
              <div className="absolute top-8 right-6 flex space-x-2 bg-black/20 p-1 rounded-lg">
                <Link 
                  href={getLanguagePath('fr')} 
                  className={`px-4 py-2 rounded-md transition ${langCode === 'fr' ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  <span className="font-medium">FR</span>
                </Link>
                <Link 
                  href={getLanguagePath('ar')} 
                  className={`px-4 py-2 rounded-md transition ${langCode === 'ar' ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  <span className="font-medium">عربي</span>
                </Link>
                <Link 
                  href={getLanguagePath('en')} 
                  className={`px-4 py-2 rounded-md transition ${langCode === 'en' ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  <span className="font-medium">EN</span>
                </Link>
              </div>
              
              {/* Hero content */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-md fade-in">
                {t.hero.title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium mb-8 text-white/80 drop-shadow-md fade-in" style={{ animationDelay: '0.2s' }}>
                {t.hero.subtitle}
              </h2>
              <p className="text-xl max-w-2xl mx-auto mb-12 text-white/70 fade-in" style={{ animationDelay: '0.4s' }}>
                {t.hero.description}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  href={`/${langCode}/courses`}
                  className="btn btn-secondary slide-in-left"
                  style={{ animationDelay: '0.2s' }}
                >
                  {t.hero.exploreButton}
                </Link>
                <Link
                  href={`/${langCode}/contact`}
                  className="btn btn-outline border-white text-white hover:bg-white hover:text-primary slide-in-left"
                  style={{ animationDelay: '0.4s' }}
                >
                  {t.hero.contactButton}
                </Link>
              </div>
              
              {/* Scroll down indicator */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/70 flex flex-col items-center cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection(featuresRef)}>
                <span className="mb-2 text-sm">{t.hero.scrollDown}</span>
                <span className="animate-bounce"><FiChevronDown /></span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="section-title gradient-text">{t.features.title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t.features.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className={`card glass-card p-6 border-t-4 border-primary ${featuresVisible ? 'slide-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0s' }}>
                <div className="mb-4 text-primary">
                  <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{t.features.quality.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.features.quality.description}</p>
              </div>
              
              {/* Feature 2 */}
              <div className={`card glass-card p-6 border-t-4 border-blue ${featuresVisible ? 'slide-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.2s' }}>
                <div className="mb-4 text-blue">
                  <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{t.features.practical.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.features.practical.description}</p>
              </div>
              
              {/* Feature 3 */}
              <div className={`card glass-card p-6 border-t-4 border-secondary ${featuresVisible ? 'slide-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.4s' }}>
                <div className="mb-4 text-secondary">
                  <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{t.features.certification.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.features.certification.description}</p>
              </div>
              
              {/* Feature 4 */}
              <div className={`card glass-card p-6 border-t-4 border-tertiary ${featuresVisible ? 'slide-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.6s' }}>
                <div className="mb-4 text-tertiary">
                  <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{t.features.support.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.features.support.description}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Rest of the components... use langCode instead of params.lang */}
        
      </main>
      
      <Footer />
    </>
  );
} 