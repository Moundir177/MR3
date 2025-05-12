'use client';

import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Testimonial from './Testimonial';
import { useLocale } from '@/app/providers';

interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  text: string;
  rating?: number;
}

interface TestimonialCarouselProps {
  testimonials: TestimonialItem[];
  title?: string;
  autoplay?: boolean;
  interval?: number;
  variant?: 'blue' | 'green' | 'default';
  className?: string;
}

/**
 * Testimonial carousel component for displaying multiple testimonials
 */
const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  title,
  autoplay = true,
  interval = 5000,
  variant = 'default',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isRTL } = useLocale();

  // Handle autoplay functionality
  useEffect(() => {
    if (!autoplay || isPaused || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, isPaused, testimonials.length]);

  // Navigate to the previous testimonial
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Navigate to the next testimonial
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Handle carousel pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Select a specific testimonial
  const selectTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Generate the variant styles
  const carouselVariantStyles = () => {
    switch (variant) {
      case 'blue':
        return 'bg-blue/5 dark:bg-blue/10';
      case 'green':
        return 'bg-green/5 dark:bg-green/10';
      default:
        return 'bg-gray-50 dark:bg-gray-900/30';
    }
  };

  return (
    <div className={`${className}`}>
      {/* Section Title */}
      {title && (
        <h2 className="section-title mb-8">{title}</h2>
      )}

      {/* Carousel Container */}
      <div
        className={`${carouselVariantStyles()} p-6 md:p-10 rounded-xl relative overflow-hidden`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Carousel Controls for Desktop */}
        {testimonials.length > 1 && (
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 z-20">
            <button
              onClick={prevSlide}
              className={`p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-blue/10 ${
                isRTL ? 'rotate-180' : ''
              }`}
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={20} className="text-blue" />
            </button>
            <button
              onClick={nextSlide}
              className={`p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-blue/10 ${
                isRTL ? 'rotate-180' : ''
              }`}
              aria-label="Next testimonial"
            >
              <FiChevronRight size={20} className="text-blue" />
            </button>
          </div>
        )}

        {/* Testimonial Display Area */}
        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-500 ${
                index === currentIndex
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 absolute top-0 left-0 right-0 translate-y-10'
              }`}
              style={{ display: index === currentIndex ? 'block' : 'none' }}
            >
              <Testimonial
                name={testimonial.name}
                role={testimonial.role}
                avatar={testimonial.avatar}
                text={testimonial.text}
                rating={testimonial.rating}
                variant={variant}
              />
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => selectTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-blue w-5'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue/60'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCarousel; 