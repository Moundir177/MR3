'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/providers';
import { FiCheckCircle, FiCircle, FiClock, FiAward } from 'react-icons/fi';

type CourseProgressProps = {
  courseId: string;
  totalLessons: number;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
  showCertificate?: boolean;
};

/**
 * Course progress tracker for enrolled courses
 */
export default function CourseProgress({
  courseId,
  totalLessons,
  className = '',
  variant = 'default',
  showCertificate = true,
}: CourseProgressProps) {
  const { locale, isRTL } = useLocale();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Translations
  const translations: Record<string, Record<string, string>> = {
    en: {
      progress: 'Your Progress',
      completed: 'Completed',
      remaining: 'Remaining',
      startCourse: 'Start Course',
      continueCourse: 'Continue Learning',
      certificateReady: 'Your certificate is ready!',
      certificateNotReady: 'Complete the course to get your certificate',
      downloadCertificate: 'Download Certificate',
      of: 'of',
      lessons: 'lessons completed',
    },
    fr: {
      progress: 'Votre progression',
      completed: 'Terminé',
      remaining: 'Restant',
      startCourse: 'Commencer le cours',
      continueCourse: 'Continuer l\'apprentissage',
      certificateReady: 'Votre certificat est prêt !',
      certificateNotReady: 'Terminez le cours pour obtenir votre certificat',
      downloadCertificate: 'Télécharger le certificat',
      of: 'sur',
      lessons: 'leçons terminées',
    },
    ar: {
      progress: 'تقدمك',
      completed: 'مكتمل',
      remaining: 'متبقي',
      startCourse: 'ابدأ الدورة',
      continueCourse: 'متابعة التعلم',
      certificateReady: 'شهادتك جاهزة!',
      certificateNotReady: 'أكمل الدورة للحصول على شهادتك',
      downloadCertificate: 'تحميل الشهادة',
      of: 'من',
      lessons: 'دروس مكتملة',
    },
  };
  
  const t = (key: string): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };
  
  // Mock data - Replace with actual API call in production
  useEffect(() => {
    // Simulate API call to get user progress
    const timer = setTimeout(() => {
      // Simulate getting completed lessons from storage
      const savedProgress = localStorage.getItem(`course-progress-${courseId}`);
      if (savedProgress) {
        setCompletedLessons(JSON.parse(savedProgress));
      } else {
        // Mock initial progress for demo purposes
        const initialProgress = Array.from({ length: Math.floor(totalLessons * 0.3) }, 
          (_, i) => `lesson-${i + 1}`);
        setCompletedLessons(initialProgress);
        localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(initialProgress));
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [courseId, totalLessons]);
  
  // Calculate progress percentage
  const progressPercentage = Math.round((completedLessons.length / totalLessons) * 100);
  const isCompleted = progressPercentage === 100;
  
  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={`card bg-white dark:bg-gray-800 p-4 ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">{t('progress')}</h3>
          <span className="text-sm font-bold text-blue">{progressPercentage}%</span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-blue to-green h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-center">
          <button className="btn-outline-blue text-xs font-medium">
            {completedLessons.length > 0 ? t('continueCourse') : t('startCourse')}
          </button>
        </div>
      </div>
    );
  }
  
  // Detailed variant
  if (variant === 'detailed') {
    return (
      <div className={`card bg-white dark:bg-gray-800 p-6 ${className}`}>
        <h3 className="text-lg font-bold mb-4">{t('progress')}</h3>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue to-green h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FiCheckCircle className="text-blue mr-2" />
            <span className="text-sm">
              <span className="font-bold">{completedLessons.length}</span> {t('completed')}
            </span>
          </div>
          
          <div className="flex items-center">
            <FiCircle className="text-gray-400 dark:text-gray-500 mr-2" />
            <span className="text-sm">
              <span className="font-bold">{totalLessons - completedLessons.length}</span> {t('remaining')}
            </span>
          </div>
        </div>
        
        {showCertificate && (
          <div className={`p-4 rounded-lg mb-5 ${
            isCompleted 
              ? 'glass-green'
              : 'bg-gray-100 dark:bg-gray-700'
          }`}>
            <div className="flex items-start">
              <FiAward className={`text-xl mr-3 ${isCompleted ? 'text-green' : 'text-gray-400'}`} />
              <div>
                <p className="font-medium">
                  {isCompleted ? t('certificateReady') : t('certificateNotReady')}
                </p>
                
                {isCompleted && (
                  <button className="mt-2 btn btn-secondary text-sm px-3 py-1 rounded-lg">
                    {t('downloadCertificate')}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        
        <button className="w-full py-3 btn btn-primary rounded-lg">
          {completedLessons.length > 0 ? t('continueCourse') : t('startCourse')}
        </button>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className={`card bg-white dark:bg-gray-800 p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-md font-bold">{t('progress')}</h3>
        <div className="flex items-center">
          <FiClock className="text-blue mr-2" />
          <span className="text-sm font-medium">
            {completedLessons.length} {t('of')} {totalLessons} {t('lessons')}
          </span>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
        <div 
          className="bg-gradient-to-r from-blue to-green h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {showCertificate && isCompleted && (
        <div className="flex items-center justify-between text-green text-sm mb-4">
          <div className="flex items-center">
            <FiAward className="mr-2" />
            <span>{t('certificateReady')}</span>
          </div>
          <button className="animated-underline hover:text-green-dark">
            {t('downloadCertificate')}
          </button>
        </div>
      )}
      
      <button className="w-full py-2 btn btn-primary rounded-lg text-sm">
        {completedLessons.length > 0 ? t('continueCourse') : t('startCourse')}
      </button>
    </div>
  );
} 