import React from 'react';
import { translations } from '@/translations';
import HomeClient from './HomeClient';

// Hero image URL instead of local import
const heroImageUrl = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80";

export default function Home({
  params,
}: {
  params: { lang: string };
}) {
  const langCode = params.lang || 'fr';
  const t = translations[langCode as keyof typeof translations] || translations.fr;
  
  return <HomeClient langCode={langCode} t={t} heroImageUrl={heroImageUrl} />;
}

// Static params for Next.js static export
export function generateStaticParams() {
  return [
  {
    "lang": "fr"
  },
  {
    "lang": "en"
  },
  {
    "lang": "ar"
  }
];
}
