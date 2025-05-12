'use client';

import React, { useState } from 'react';
import { 
  FiFacebook, 
  FiTwitter, 
  FiLinkedin, 
  FiMail, 
  FiLink, 
  FiCheck,
  FiShare2 
} from 'react-icons/fi';
import { useLocale } from '@/app/providers';

type SocialShareProps = {
  url: string;
  title: string;
  description?: string;
  className?: string;
  iconSize?: number;
  showLabel?: boolean;
  compact?: boolean;
  variant?: 'default' | 'outline' | 'minimal';
};

/**
 * Social sharing component for courses and other content
 */
export default function SocialShare({
  url,
  title,
  description = '',
  className = '',
  iconSize = 18,
  showLabel = false,
  compact = false,
  variant = 'default',
}: SocialShareProps) {
  const { locale, isRTL } = useLocale();
  const [copied, setCopied] = useState(false);
  
  // Make sure URL is absolute
  if (!url.startsWith('http')) {
    url = `https://mira-academy.com${url.startsWith('/') ? '' : '/'}${url}`;
  }
  
  // Encoded parameters for sharing
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  
  // Social sharing URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };
  
  // Localized share text
  const shareText: Record<string, Record<string, string>> = {
    en: {
      share: 'Share',
      facebook: 'Share on Facebook',
      twitter: 'Share on Twitter',
      linkedin: 'Share on LinkedIn',
      email: 'Share via Email',
      copy: 'Copy link',
      copied: 'Copied!',
    },
    fr: {
      share: 'Partager',
      facebook: 'Partager sur Facebook',
      twitter: 'Partager sur Twitter',
      linkedin: 'Partager sur LinkedIn',
      email: 'Partager par email',
      copy: 'Copier le lien',
      copied: 'Copié !',
    },
    ar: {
      share: 'مشاركة',
      facebook: 'مشاركة على فيسبوك',
      twitter: 'مشاركة على تويتر',
      linkedin: 'مشاركة على لينكد إن',
      email: 'مشاركة عبر البريد الإلكتروني',
      copy: 'نسخ الرابط',
      copied: 'تم النسخ!',
    },
  };
  
  const t = (key: string): string => {
    return shareText[locale]?.[key] || shareText.en[key] || key;
  };
  
  // Handle copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Button class based on variant
  const getButtonClass = () => {
    switch (variant) {
      case 'outline':
        return 'bg-transparent border border-gray-300 dark:border-gray-700 hover:border-blue';
      case 'minimal':
        return 'hover:bg-gray-100 dark:hover:bg-gray-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700';
    }
  };
  
  // Compact display with dropdown
  if (compact) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center p-2 rounded-full ${getButtonClass()}`}
          aria-label={t('share')}
        >
          <FiShare2 size={iconSize} />
          {showLabel && <span className="ml-2">{t('share')}</span>}
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-md p-2 right-0">
            <div className="grid grid-cols-1 gap-2 min-w-[150px]">
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiFacebook size={iconSize} className="text-[#1877F2]" />
                <span className="ml-2">{t('facebook')}</span>
              </a>
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiTwitter size={iconSize} className="text-[#1DA1F2]" />
                <span className="ml-2">{t('twitter')}</span>
              </a>
              <a
                href={shareUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiLinkedin size={iconSize} className="text-[#0A66C2]" />
                <span className="ml-2">{t('linkedin')}</span>
              </a>
              <a
                href={shareUrls.email}
                className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiMail size={iconSize} className="text-gray-600 dark:text-gray-300" />
                <span className="ml-2">{t('email')}</span>
              </a>
              <button
                onClick={copyToClipboard}
                className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {copied ? (
                  <>
                    <FiCheck size={iconSize} className="text-green" />
                    <span className="ml-2">{t('copied')}</span>
                  </>
                ) : (
                  <>
                    <FiLink size={iconSize} className="text-gray-600 dark:text-gray-300" />
                    <span className="ml-2">{t('copy')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Standard display with all buttons
  return (
    <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} ${showLabel ? 'flex-col space-y-2' : 'items-center space-x-2'} ${className}`}>
      {showLabel && <span className="text-sm text-gray-500 dark:text-gray-400">{t('share')}:</span>}
      
      <div className={`flex ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}>
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full btn-outline text-[#1877F2] ${getButtonClass()}`}
          aria-label={t('facebook')}
        >
          <FiFacebook size={iconSize} />
        </a>
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full btn-outline text-[#1DA1F2] ${getButtonClass()}`}
          aria-label={t('twitter')}
        >
          <FiTwitter size={iconSize} />
        </a>
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full btn-outline text-[#0A66C2] ${getButtonClass()}`}
          aria-label={t('linkedin')}
        >
          <FiLinkedin size={iconSize} />
        </a>
        <a
          href={shareUrls.email}
          className={`p-2 rounded-full btn-outline ${getButtonClass()}`}
          aria-label={t('email')}
        >
          <FiMail size={iconSize} className="text-gray-600 dark:text-gray-300" />
        </a>
        <button
          onClick={copyToClipboard}
          className={`p-2 rounded-full btn-outline ${getButtonClass()}`}
          aria-label={copied ? t('copied') : t('copy')}
        >
          {copied ? (
            <FiCheck size={iconSize} className="text-green" />
          ) : (
            <FiLink size={iconSize} className="text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
} 