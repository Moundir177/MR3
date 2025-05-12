'use client';

import React from 'react';
import Image from 'next/image';
import { FiStar, FiMessageSquare } from 'react-icons/fi';

interface TestimonialProps {
  name: string;
  role?: string;
  avatar?: string;
  text: string;
  rating?: number;
  variant?: 'blue' | 'green' | 'default';
  className?: string;
}

/**
 * Testimonial component for displaying student or client reviews
 */
const Testimonial: React.FC<TestimonialProps> = ({
  name,
  role,
  avatar,
  text,
  rating = 5,
  variant = 'default',
  className = '',
}) => {
  // Generate the variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'blue':
        return 'glass-blue';
      case 'green':
        return 'glass-green';
      default:
        return 'glass';
    }
  };

  // Render stars based on rating
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        size={16}
      />
    ));
  };

  return (
    <div className={`testimonial-card ${getVariantStyles()} p-6 rounded-lg ${className}`}>
      {/* Quote Icon */}
      <div className="absolute -top-4 -left-2 text-blue/20 dark:text-blue/10">
        <FiMessageSquare size={48} />
      </div>
      
      {/* Testimonial Content */}
      <div className="relative z-10">
        {/* Rating Stars */}
        {rating > 0 && (
          <div className="flex mb-4">{renderStars()}</div>
        )}
        
        {/* Testimonial Text */}
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          "{text}"
        </p>
        
        {/* Author Info */}
        <div className="flex items-center">
          {avatar && (
            <div className="mr-4 relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue">
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div>
            <h4 className="font-bold text-blue">{name}</h4>
            {role && (
              <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial; 