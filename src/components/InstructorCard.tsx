'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiLinkedin, FiTwitter, FiGlobe, FiMail, FiStar, FiPlay, FiAward, FiChevronRight, FiUsers, FiBookOpen, FiThumbsUp, FiMessageCircle } from 'react-icons/fi';
import { useLocale } from '@/app/providers';

interface SocialLink {
  type: 'linkedin' | 'twitter' | 'website' | 'email';
  url: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  date?: string;
}

interface CoursePreview {
  id: string;
  title: string;
  thumbnail: string;
  rating: number;
  studentCount: number;
  duration: string;
}

interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
}

interface InstructorCardProps {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  expertise?: string[];
  courseCount?: number;
  studentCount?: number;
  rating?: number;
  socialLinks?: SocialLink[];
  variant?: 'default' | 'compact' | 'detailed' | 'profile';
  className?: string;
  achievements?: Achievement[];
  coursesPreviews?: CoursePreview[];
  reviews?: Review[];
  showLatestCourses?: boolean;
  showReviews?: boolean;
}

/**
 * Instructor card component to display teacher profiles
 */
const InstructorCard: React.FC<InstructorCardProps> = ({
  id,
  name,
  role,
  bio,
  avatar,
  expertise = [],
  courseCount,
  studentCount,
  rating,
  socialLinks = [],
  variant = 'default',
  className = '',
  achievements = [],
  coursesPreviews = [],
  reviews = [],
  showLatestCourses = false,
  showReviews = false,
}) => {
  const { locale, isRTL } = useLocale();
  const [activeTab, setActiveTab] = useState<'courses' | 'reviews' | 'achievements'>('courses');

  // Translations
  const translations: Record<string, Record<string, string>> = {
    en: {
      courses: 'Courses',
      students: 'Students',
      rating: 'Rating',
      expertise: 'Expertise',
      viewProfile: 'View Profile',
      viewCourses: 'View Courses',
      aboutMe: 'About Me',
      achievements: 'Achievements',
      latestCourses: 'Latest Courses',
      reviews: 'Reviews',
      allReviews: 'View All Reviews',
      enroll: 'Enroll',
      preview: 'Preview',
      contactInstructor: 'Contact Instructor',
      coursesTab: 'Courses',
      reviewsTab: 'Reviews',
      achievementsTab: 'Achievements',
      seeMore: 'See More',
    },
    fr: {
      courses: 'Cours',
      students: 'Étudiants',
      rating: 'Évaluation',
      expertise: 'Expertise',
      viewProfile: 'Voir le profil',
      viewCourses: 'Voir les cours',
      aboutMe: 'À propos de moi',
      achievements: 'Réalisations',
      latestCourses: 'Derniers cours',
      reviews: 'Avis',
      allReviews: 'Voir tous les avis',
      enroll: 'S\'inscrire',
      preview: 'Aperçu',
      contactInstructor: 'Contacter l\'instructeur',
      coursesTab: 'Cours',
      reviewsTab: 'Avis',
      achievementsTab: 'Réalisations',
      seeMore: 'Voir plus',
    },
    ar: {
      courses: 'الدورات',
      students: 'الطلاب',
      rating: 'التقييم',
      expertise: 'التخصص',
      viewProfile: 'عرض الملف الشخصي',
      viewCourses: 'عرض الدورات',
      aboutMe: 'نبذة عني',
      achievements: 'الإنجازات',
      latestCourses: 'أحدث الدورات',
      reviews: 'التقييمات',
      allReviews: 'عرض جميع التقييمات',
      enroll: 'التسجيل',
      preview: 'معاينة',
      contactInstructor: 'الاتصال بالمدرب',
      coursesTab: 'الدورات',
      reviewsTab: 'التقييمات',
      achievementsTab: 'الإنجازات',
      seeMore: 'المزيد',
    },
  };

  const t = (key: string): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };

  // Get icon for social link type
  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'linkedin':
        return <FiLinkedin size={18} />;
      case 'twitter':
        return <FiTwitter size={18} />;
      case 'website':
        return <FiGlobe size={18} />;
      case 'email':
        return <FiMail size={18} />;
      default:
        return null;
    }
  };
  
  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Profile variant
  if (variant === 'profile') {
    return (
      <div className={`${className}`}>
        <div className="bg-gradient-to-r from-blue/10 to-green/10 pt-12 pb-32 px-4 relative">
          {/* Profile Header */}
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 mb-4 shadow-lg">
              <Image src={avatar} alt={name} fill className="object-cover" />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-1">{name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{role}</p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 text-blue hover:text-blue-dark shadow-sm rounded-full p-3 transition-all hover:shadow-md"
                  aria-label={`${name}'s ${link.type}`}
                >
                  {getSocialIcon(link.type)}
                </a>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg w-full">
              {courseCount !== undefined && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
                  <FiBookOpen className="h-6 w-6 text-blue mx-auto mb-1" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{courseCount}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('courses')}</div>
                </div>
              )}
              
              {studentCount !== undefined && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
                  <FiUsers className="h-6 w-6 text-green mx-auto mb-1" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{studentCount}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('students')}</div>
                </div>
              )}
              
              {rating !== undefined && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
                  <FiStar className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{rating.toFixed(1)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('rating')}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Tabs */}
        <div className="max-w-5xl mx-auto -mt-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'courses'
                  ? 'text-blue border-b-2 border-blue'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue'
              }`}
            >
              {t('coursesTab')}
            </button>
            {reviews.length > 0 && (
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'text-blue border-b-2 border-blue'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue'
                }`}
              >
                {t('reviewsTab')}
              </button>
            )}
            {achievements.length > 0 && (
              <button
                onClick={() => setActiveTab('achievements')}
                className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'achievements'
                    ? 'text-blue border-b-2 border-blue'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue'
                }`}
              >
                {t('achievementsTab')}
              </button>
            )}
          </div>
          
          {/* About Me */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">{t('aboutMe')}</h2>
            <p className="text-gray-700 dark:text-gray-300">{bio}</p>
            
            {/* Expertise */}
            {expertise.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">{t('expertise')}</h3>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Active Tab Content */}
          {activeTab === 'courses' && coursesPreviews.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6">{t('latestCourses')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesPreviews.map((course) => (
                  <div key={course.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-40">
                      <Image 
                        src={course.thumbnail} 
                        alt={course.title} 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button className="bg-blue text-white rounded-full p-3 transform hover:scale-110 transition-transform">
                          <FiPlay />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-md mb-2 line-clamp-1">{course.title}</h3>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <FiUsers className="text-gray-500 mr-1" size={14} />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{course.studentCount}</span>
                        </div>
                        <div className="flex items-center">
                          <FiStar className="text-yellow-500 mr-1" size={14} />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{course.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600 dark:text-gray-400">{course.duration}</span>
                        </div>
                      </div>
                      <Link href={`/${locale}/courses/${course.id}`} className="btn btn-sm btn-blue w-full">
                        {t('enroll')}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href={`/${locale}/instructors/${id}/courses`} className="btn btn-outline-blue">
                  {t('viewCourses')}
                </Link>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && reviews.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6">{t('reviews')}</h2>
              <div className="space-y-6">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-start">
                      {review.avatar && (
                        <div className="mr-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                          </div>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{review.author}</h4>
                            <div className="mt-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {reviews.length > 3 && (
                <div className="text-center mt-8">
                  <Link href={`/${locale}/instructors/${id}/reviews`} className="btn btn-outline-blue">
                    {t('allReviews')}
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'achievements' && achievements.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6">{t('achievements')}</h2>
              <div className="space-y-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start">
                    <div className="bg-blue/10 rounded-full p-3 mr-4">
                      {achievement.icon || <FiAward className="text-blue h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold">{achievement.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{achievement.description}</p>
                      {achievement.date && (
                        <p className="text-gray-500 text-xs mt-1">{achievement.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <a
              href={`mailto:${socialLinks.find(link => link.type === 'email')?.url ?? '#'}`}
              className="btn btn-blue flex items-center justify-center"
            >
              <FiMessageCircle className="mr-2" />
              {t('contactInstructor')}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={`flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm ${className}`}>
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image src={avatar} alt={name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold">{name}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">{role}</p>
        </div>
        {rating && (
          <div className="flex items-center ml-2">
            <FiStar className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
    );
  }

  // Detailed variant
  if (variant === 'detailed') {
    return (
      <div className={`card p-6 ${className}`}>
        <div className="text-center mb-6">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue mb-4">
            <Image src={avatar} alt={name} fill className="object-cover" />
          </div>
          <h3 className="text-xl font-bold gradient-text">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{role}</p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-3 mb-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:text-blue-dark transition-colors"
                aria-label={`${name}'s ${link.type}`}
              >
                {getSocialIcon(link.type)}
              </a>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {courseCount !== undefined && (
            <div className="text-center bg-blue/5 dark:bg-blue/10 rounded-lg p-3">
              <div className="text-lg font-bold text-blue">{courseCount}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t('courses')}</div>
            </div>
          )}
          
          {studentCount !== undefined && (
            <div className="text-center bg-green/5 dark:bg-green/10 rounded-lg p-3">
              <div className="text-lg font-bold text-green">{studentCount}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t('students')}</div>
            </div>
          )}
          
          {rating !== undefined && (
            <div className="text-center bg-yellow-50 dark:bg-yellow-900/10 rounded-lg p-3">
              <div className="text-lg font-bold text-yellow-600">{rating.toFixed(1)}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t('rating')}</div>
            </div>
          )}
        </div>
        
        {/* Bio */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">{bio}</p>
        
        {/* Expertise */}
        {expertise.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{t('expertise')}</h4>
            <div className="flex flex-wrap gap-2">
              {expertise.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full px-3 py-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{t('achievements')}</h4>
            <div className="space-y-2">
              {achievements.slice(0, 2).map((achievement) => (
                <div key={achievement.id} className="flex items-center bg-blue/5 dark:bg-blue/10 p-2 rounded-lg">
                  <FiAward className="text-blue mr-2 flex-shrink-0" />
                  <span className="text-xs">{achievement.title}</span>
                </div>
              ))}
              {achievements.length > 2 && (
                <Link href={`/${locale}/instructors/${id}`} className="text-xs text-blue flex items-center">
                  {t('seeMore')} <FiChevronRight className="ml-1" size={14} />
                </Link>
              )}
            </div>
          </div>
        )}
        
        {/* Latest Courses */}
        {showLatestCourses && coursesPreviews.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{t('latestCourses')}</h4>
            <div className="space-y-2">
              {coursesPreviews.slice(0, 2).map((course) => (
                <Link 
                  key={course.id} 
                  href={`/${locale}/courses/${course.id}`}
                  className="block bg-gray-50 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded overflow-hidden mr-2 flex-shrink-0">
                      <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-medium truncate">{course.title}</h5>
                      <div className="flex items-center mt-1">
                        <FiStar className="text-yellow-500 h-3 w-3" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{course.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Reviews Preview */}
        {showReviews && reviews.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{t('reviews')}</h4>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-sm">
              <div className="flex items-start">
                {reviews[0].avatar && (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <Image src={reviews[0].avatar} alt={reviews[0].author} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-xs">{reviews[0].author}</span>
                    <div className="flex ml-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`h-3 w-3 ${
                            i < reviews[0].rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{reviews[0].text}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href={`/${locale}/instructors/${id}`} className="btn btn-outline-blue text-sm text-center">
            {t('viewProfile')}
          </Link>
          <Link href={`/${locale}/instructors/${id}/courses`} className="btn btn-blue text-sm text-center">
            {t('viewCourses')}
          </Link>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`card overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      <div className="relative h-48 bg-gradient-to-r from-blue/10 to-green/10">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
            <Image src={avatar} alt={name} fill className="object-cover" />
          </div>
        </div>
        
        {/* Achievements Badge */}
        {achievements.length > 0 && (
          <div className="absolute top-4 right-4 bg-blue/90 text-white rounded-full p-2" title={achievements[0].title}>
            <FiAward className="h-5 w-5" />
          </div>
        )}
      </div>
      
      <div className="pt-16 pb-6 px-6 text-center">
        <h3 className="text-lg font-bold mb-1">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{role}</p>
        
        {/* Condensed stats on same line */}
        {(courseCount !== undefined || studentCount !== undefined || rating !== undefined) && (
          <div className="flex justify-center mb-4 text-xs text-gray-600 dark:text-gray-400 space-x-4">
            {courseCount !== undefined && (
              <div className="flex items-center">
                <FiBookOpen className="mr-1 text-blue" size={14} />
                <span className="font-bold text-blue">{courseCount}</span> {t('courses')}
              </div>
            )}
            {studentCount !== undefined && (
              <div className="flex items-center">
                <FiUsers className="mr-1 text-green" size={14} />
                <span className="font-bold text-green">{studentCount}</span> {t('students')}
              </div>
            )}
            {rating !== undefined && (
              <div className="flex items-center">
                <FiStar className="mr-1 text-yellow-500" size={14} />
                <span className="font-bold text-yellow-600">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        )}
        
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{bio}</p>
        
        {/* Latest Course Preview */}
        {showLatestCourses && coursesPreviews.length > 0 && (
          <div className="mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-left">
            <Link href={`/${locale}/courses/${coursesPreviews[0].id}`}>
              <div className="flex items-center">
                <div className="relative w-12 h-12 overflow-hidden rounded mr-3 flex-shrink-0">
                  <Image src={coursesPreviews[0].thumbnail} alt={coursesPreviews[0].title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium truncate">{coursesPreviews[0].title}</h4>
                  <div className="flex items-center mt-1">
                    <FiStar className="text-yellow-500 h-3 w-3" />
                    <span className="text-xs ml-1">{coursesPreviews[0].rating.toFixed(1)}</span>
                    <FiUsers className="ml-2 h-3 w-3 text-gray-500" />
                    <span className="text-xs ml-1">{coursesPreviews[0].studentCount}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
        
        {/* Social Links */}
        <div className="flex justify-center space-x-3 mb-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:text-blue-dark transition-colors"
              aria-label={`${name}'s ${link.type}`}
            >
              {getSocialIcon(link.type)}
            </a>
          ))}
        </div>
        
        <Link href={`/${locale}/instructors/${id}`} className="btn btn-outline-blue w-full text-sm">
          {t('viewProfile')}
        </Link>
      </div>
    </div>
  );
};

export default InstructorCard; 