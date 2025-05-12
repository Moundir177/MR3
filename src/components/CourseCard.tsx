'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiUsers, FiAward } from 'react-icons/fi';

export interface CourseProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  studentsCount?: number;
  rating?: number;
  price: number;
  discountPrice?: number;
  instructor?: string;
  lang: string;
}

const CourseCard: React.FC<CourseProps> = ({
  id,
  slug,
  title,
  description,
  image,
  category,
  duration,
  level,
  studentsCount,
  rating,
  price,
  discountPrice,
  instructor,
  lang
}) => {
  const levelColorClass = 
    level === 'Débutant' ? 'bg-green-100 text-green-800' : 
    level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800' : 
    'bg-red-100 text-red-800';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Course Image */}
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-primary/90 text-white text-xs font-medium px-2.5 py-1 rounded">
            {category}
          </span>
        </div>
        
        {/* Price Badge */}
        {discountPrice ? (
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="line-through text-gray-300 text-sm">{price} DA</span>
            <span className="bg-secondary text-white font-bold text-sm px-3 py-1.5 rounded">
              {discountPrice} DA
            </span>
          </div>
        ) : (
          <div className="absolute bottom-4 right-4">
            <span className="bg-secondary text-white font-bold text-sm px-3 py-1.5 rounded">
              {price} DA
            </span>
          </div>
        )}
      </div>
      
      {/* Course Content */}
      <div className="p-5">
        <Link href={`/${lang}/courses/${slug}`}>
          <h3 className="font-bold text-xl mb-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Course Details */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <FiClock className="mr-1" />
            {duration}
          </div>
          
          <div className={`flex items-center text-sm px-2 py-0.5 rounded-full ${levelColorClass}`}>
            <FiAward className="mr-1" />
            {level}
          </div>
          
          {studentsCount && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <FiUsers className="mr-1" />
              {studentsCount} étudiants
            </div>
          )}
        </div>
        
        {/* Rating and Instructor */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          {instructor ? (
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Par {instructor}
            </span>
          ) : (
            <span></span>
          )}
          
          {rating && (
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Button */}
      <div className="px-5 pb-5">
        <Link href={`/${lang}/courses/${slug}`} className="block w-full text-center py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
          Détails du cours
        </Link>
      </div>
    </div>
  );
};

export default CourseCard; 