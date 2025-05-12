'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiX, FiInfo, FiAlertTriangle, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { useLocale } from '@/app/providers';

type NotificationType = 'info' | 'warning' | 'success';

interface NotificationBannerProps {
  type?: NotificationType;
  message: string;
  link?: {
    text: string;
    href: string;
    isExternal?: boolean;
  };
  dismissible?: boolean;
  position?: 'top' | 'bottom';
  expiryDays?: number;
  id?: string;
  className?: string;
}

/**
 * Notification banner component for site-wide announcements
 */
const NotificationBanner: React.FC<NotificationBannerProps> = ({
  type = 'info',
  message,
  link,
  dismissible = true,
  position = 'top',
  expiryDays = 7,
  id = 'default-notification',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { locale, isRTL } = useLocale();

  // Check if notification was previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem(`notification-${id}-dismissed`);
    if (!dismissed) {
      setIsVisible(true);
    } else {
      // Check if notification expiry has passed
      const dismissedDate = new Date(dismissed);
      const expiryDate = new Date(dismissedDate);
      expiryDate.setDate(dismissedDate.getDate() + expiryDays);
      
      if (new Date() > expiryDate) {
        // Expired, show again
        setIsVisible(true);
      }
    }
  }, [id, expiryDays]);

  // Handle notification dismissal
  const dismissNotification = () => {
    setIsVisible(false);
    localStorage.setItem(`notification-${id}-dismissed`, new Date().toISOString());
  };

  // If not visible, don't render anything
  if (!isVisible) {
    return null;
  }

  // Get type-specific styling
  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          bgClass: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
          textClass: 'text-yellow-800 dark:text-yellow-200',
          icon: <FiAlertTriangle className="w-5 h-5" />
        };
      case 'success':
        return {
          bgClass: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
          textClass: 'text-green-800 dark:text-green-200',
          icon: <FiCheckCircle className="w-5 h-5" />
        };
      default: // info
        return {
          bgClass: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
          textClass: 'text-blue-800 dark:text-blue-200',
          icon: <FiInfo className="w-5 h-5" />
        };
    }
  };

  const { bgClass, textClass, icon } = getTypeStyles();
  const positionClass = position === 'top' ? 'top-0' : 'bottom-0';

  return (
    <div 
      className={`fixed ${positionClass} left-0 right-0 z-50 ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className={`${bgClass} border-b dark:border-t px-4 py-3`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className={`${textClass} flex-shrink-0 mr-3`}>
              {icon}
            </span>
            <span className={`${textClass} text-sm font-medium mr-2`}>
              {message}
            </span>
            {link && (
              <Link
                href={link.href}
                className={`${textClass} text-sm font-medium underline hover:opacity-80 flex items-center`}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
              >
                {link.text}
                {link.isExternal && <FiExternalLink className="ml-1 w-3 h-3" />}
              </Link>
            )}
          </div>
          
          {dismissible && (
            <button
              onClick={dismissNotification}
              className={`${textClass} rounded-full p-1 hover:bg-opacity-20 hover:bg-black focus:outline-none`}
              aria-label="Dismiss notification"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner; 