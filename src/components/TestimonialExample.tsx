'use client';

import React from 'react';
import Testimonial from './Testimonial';
import TestimonialCarousel from './TestimonialCarousel';
import NotificationBanner from './NotificationBanner';

/**
 * Example component showing how to use the new testimonial components
 */
const TestimonialExample: React.FC = () => {
  // Sample testimonial data
  const testimonials = [
    {
      id: '1',
      name: 'Sarah Larson',
      role: 'Web Development Student',
      avatar: '/images/testimonials/student1.jpg',
      text: 'The courses at Mira Academy have transformed my career. I went from knowing nothing about coding to landing a job as a frontend developer in just 6 months!',
      rating: 5
    },
    {
      id: '2',
      name: 'Mohamed Ahmed',
      role: 'UX Design Professional',
      avatar: '/images/testimonials/student2.jpg',
      text: 'The instructors are incredibly knowledgeable and supportive. The course content is up-to-date with the latest industry standards and practices.',
      rating: 4
    },
    {
      id: '3',
      name: 'Jean Dupont',
      role: 'Data Science Graduate',
      avatar: '/images/testimonials/student3.jpg',
      text: 'As someone who was switching careers, I found the step-by-step approach perfect for beginners. The practical projects helped me build a strong portfolio.',
      rating: 5
    },
  ];

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      {/* Example notification banner */}
      <NotificationBanner 
        type="info"
        message="New courses are now available!"
        link={{
          text: "Browse courses",
          href: "/courses",
        }}
        id="new-courses-2023"
      />
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center gradient-text">What Our Students Say</h2>
        
        {/* Single Testimonial Example */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6">Featured Testimonial</h3>
          <Testimonial
            name="Sarah Larson"
            role="Web Development Student"
            avatar="/images/testimonials/student1.jpg"
            text="The courses at Mira Academy have transformed my career. I went from knowing nothing about coding to landing a job as a frontend developer in just 6 months!"
            rating={5}
            variant="blue"
            className="max-w-2xl mx-auto"
          />
        </div>
        
        {/* Testimonial Grid Example */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6">Testimonial Grid</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Testimonial
                key={testimonial.id}
                name={testimonial.name}
                role={testimonial.role}
                avatar={testimonial.avatar}
                text={testimonial.text}
                rating={testimonial.rating}
                variant={testimonial.id === '1' ? 'blue' : testimonial.id === '2' ? 'green' : 'default'}
              />
            ))}
          </div>
        </div>
        
        {/* Testimonial Carousel Example */}
        <div>
          <TestimonialCarousel
            testimonials={testimonials}
            title="Testimonial Carousel"
            variant="blue"
            autoplay={true}
            interval={5000}
          />
        </div>
        
        {/* Example of notification banners with different types */}
        <div className="mt-16 space-y-4">
          <h3 className="text-xl font-bold mb-6">Notification Banner Examples</h3>
          <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <NotificationBanner 
              type="success"
              message="Your profile has been updated successfully!"
              dismissible={true}
              position="top"
              className="static"
            />
          </div>
          <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <NotificationBanner 
              type="warning"
              message="Your subscription will expire in 7 days."
              link={{
                text: "Renew now",
                href: "/subscription",
              }}
              dismissible={true}
              position="top"
              className="static"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialExample; 