import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  linkText?: string;
  variant?: 'blue' | 'green' | 'default';
  icon?: ReactNode;
  badges?: string[];
  className?: string;
  lang?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  imageAlt = '',
  link,
  linkText = 'Learn More',
  variant = 'default',
  icon,
  badges = [],
  className = '',
  lang = 'fr'
}) => {
  const variantClasses = {
    blue: 'card-blue',
    green: 'card-green',
    default: ''
  };

  const cardContent = (
    <>
      {image && (
        <div className="relative h-48 overflow-hidden img-hover-zoom">
          <div className={`absolute inset-0 ${variant === 'blue' ? 'img-overlay-blue' : variant === 'green' ? 'img-overlay-green' : 'img-overlay'}`}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-t-xl"
            />
          </div>
          {badges && badges.length > 0 && (
            <div className="absolute top-3 right-3 z-10 flex flex-wrap gap-2 justify-end">
              {badges.map((badge, index) => (
                <span 
                  key={index} 
                  className={`${variant === 'blue' ? 'badge-blue' : variant === 'green' ? 'badge-green' : 'bg-gray-700 text-white'} px-2 py-1 text-xs font-medium rounded-full`}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        {icon && (
          <div className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full ${
            variant === 'blue' ? 'bg-blue/10 text-blue' : 
            variant === 'green' ? 'bg-green/10 text-green' : 
            'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}>
            {icon}
          </div>
        )}
        
        <h3 className={`text-xl font-semibold mb-3 ${
          variant === 'blue' ? 'text-blue' : 
          variant === 'green' ? 'text-green' : 
          'text-text-light dark:text-white'
        }`}>
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        )}
        
        {link && (
          <Link 
            href={`/${lang}${link}`} 
            className={`inline-flex items-center font-medium ${
              variant === 'blue' ? 'text-blue hover:text-blue-dark' : 
              variant === 'green' ? 'text-green hover:text-green-dark' : 
              'text-primary hover:text-primary-dark'
            }`}
          >
            {linkText}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </>
  );

  const cardClasses = `card ${variantClasses[variant]} ${className}`;

  if (link) {
    return (
      <Link href={`/${lang}${link}`} className={cardClasses}>
        {cardContent}
      </Link>
    );
  }

  return <div className={cardClasses}>{cardContent}</div>;
};

export default Card; 