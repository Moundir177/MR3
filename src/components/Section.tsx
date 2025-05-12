import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  title?: string;
  subtitle?: string;
  background?: 'white' | 'light' | 'blue' | 'green' | 'gradient' | 'pattern-blue' | 'pattern-green';
  className?: string;
  titleColorClass?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  id,
  title,
  subtitle,
  background = 'white',
  className = '',
  titleColorClass = 'gradient-text'
}) => {
  const getBgClass = () => {
    switch (background) {
      case 'light':
        return 'bg-gray-50 dark:bg-gray-900';
      case 'blue':
        return 'bg-blue text-white';
      case 'green':
        return 'bg-green text-white';
      case 'gradient':
        return 'gradient-bg text-white';
      case 'pattern-blue':
        return 'hero-pattern text-white';
      case 'pattern-green':
        return 'hero-pattern-green text-white';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  return (
    <section id={id} className={`py-20 relative overflow-hidden ${getBgClass()} ${className}`}>
      {/* Decorative background elements */}
      {(background === 'light' || background === 'white') && (
        <>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue/5 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green/5 rounded-tr-full"></div>
        </>
      )}

      {(background === 'blue' || background === 'pattern-blue') && (
        <>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-white/10 mix-blend-overlay filter blur-3xl animate-blob"></div>
            <div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-white/5 mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>
        </>
      )}

      {(background === 'green' || background === 'pattern-green') && (
        <>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-white/10 mix-blend-overlay filter blur-3xl animate-blob"></div>
            <div className="absolute top-40 left-10 w-80 h-80 rounded-full bg-white/5 mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>
        </>
      )}

      {background === 'gradient' && (
        <>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl"></div>
          </div>
        </>
      )}
      
      <div className="container relative z-10">
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {title && <h2 className={`section-title ${titleColorClass}`}>{title}</h2>}
            {subtitle && (
              <p className={`text-lg ${background === 'white' || background === 'light' ? 'text-gray-600 dark:text-gray-300' : 'text-white/90'}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default Section; 