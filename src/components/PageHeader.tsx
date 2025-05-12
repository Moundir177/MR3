"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { translations } from '@/translations';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: {
    name: string;
    href: string;
  }[];
  backgroundClass?: string;
  lang: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  backgroundClass = 'hero-pattern',
  lang
}) => {
  const t = translations[lang as keyof typeof translations] || translations.fr;
  const pathname = usePathname();
  
  return (
    <div className={`relative ${backgroundClass} py-20 overflow-hidden`}>
      {/* Animated background shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-white/10 mix-blend-overlay filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-green/20 mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center text-white">
          {breadcrumbs && (
            <nav className="flex justify-center mb-6">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href={`/${lang}`} className="hover:text-green transition-colors">
                    {t.common?.home || 'Home'}
                  </Link>
                </li>
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    <li>
                      <span className="mx-2">/</span>
                    </li>
                    <li>
                      {index === breadcrumbs.length - 1 ? (
                        <span className="text-white/80">{item.name}</span>
                      ) : (
                        <Link href={`/${lang}${item.href}`} className="hover:text-green transition-colors">
                          {item.name}
                        </Link>
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </nav>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text fade-in">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl max-w-3xl mx-auto text-white/90 mb-8 fade-in" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="#f9fafb" 
            fillOpacity="1" 
            d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,58.7C672,64,768,64,864,58.7C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            className="dark:fill-gray-900 fill-white"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default PageHeader; 