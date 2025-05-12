import React, { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'blue' | 'green' | 'white' | 'outline-blue' | 'outline-green' | 'outline-white' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isExternal?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  lang?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'blue',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
  isExternal = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  lang = 'fr'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'blue':
        return 'bg-blue hover:bg-blue-dark text-white';
      case 'green':
        return 'bg-green hover:bg-green-dark text-white';
      case 'white':
        return 'bg-white hover:bg-gray-100 text-blue border border-gray-200';
      case 'outline-blue':
        return 'bg-transparent border-2 border-blue text-blue hover:bg-blue/10';
      case 'outline-green':
        return 'bg-transparent border-2 border-green text-green hover:bg-green/10';
      case 'outline-white':
        return 'bg-transparent border-2 border-white text-white hover:bg-white/10';
      case 'gradient':
        return 'gradient-bg text-white hover:opacity-90';
      default:
        return 'bg-blue hover:bg-blue-dark text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3';
    }
  };

  const baseClasses = `inline-flex items-center justify-center rounded-lg font-medium shadow-sm transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue ${
    disabled ? 'opacity-60 cursor-not-allowed' : ''
  } ${fullWidth ? 'w-full' : ''}`;

  const buttonClasses = `${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href.startsWith('/') ? href : `/${lang}${href}`}
        className={buttonClasses}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick} 
      disabled={disabled}
      type={type}
    >
      {content}
    </button>
  );
};

export default Button; 