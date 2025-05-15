'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiTag, FiShare2, FiDownload } from 'react-icons/fi';

interface Event {
  id: string;
  slug: string;
  title: Record<string, string>;
  description: Record<string, string>;
  fullDescription?: Record<string, string>;
  date: Record<string, string>;
  time: Record<string, string>;
  location: Record<string, string>;
  address?: Record<string, string>;
  image: string;
  coverImage?: string;
  category: Record<string, string>;
  featured: boolean;
  organizer: Record<string, string>;
  capacity?: Record<string, string>;
  registration?: Record<string, string>;
  schedule?: Array<{
    time: Record<string, string>;
    title: Record<string, string>;
  }>;
  speakers?: Array<{
    name: string;
    position: Record<string, string>;
    image: string;
  }>;
}

interface EventDetailClientProps {
  event: Event | undefined;
  eventsData: Event[];
  slug: string;
  lang: string;
  t: any;
}

export default function EventDetailClient({ event, eventsData, slug, lang, t }: EventDetailClientProps) {
  // Create a safe accessor for eventDetail properties with TypeScript type assertion
  const eventDetail = (t as any).eventDetail || {};
  
  // If no event is found, show a 404 page
  if (!event) {
    notFound();
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with Cover Image */}
        <div className="relative h-80 lg:h-96">
          <Image 
            src={event.coverImage || event.image} 
            alt={event.title[lang as keyof typeof event.title]} 
            className="object-cover object-center"
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-900/40 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl">
                <span className="inline-flex items-center bg-purple-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {event.category[lang as keyof typeof event.category]}
                </span>
                <h1 className="text-4xl font-bold text-white mb-4">
                  {event.title[lang as keyof typeof event.title]}
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  {event.description[lang as keyof typeof event.description]}
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center text-white text-sm px-3 py-1 rounded-full bg-white/20">
                    <span className="mr-2"><FiCalendar /></span>
                    {event.date[lang as keyof typeof event.date]}
                  </span>
                  <span className="inline-flex items-center text-white text-sm px-3 py-1 rounded-full bg-white/20">
                    <span className="mr-2"><FiClock /></span>
                    {event.time[lang as keyof typeof event.time]}
                  </span>
                  <span className="inline-flex items-center text-white text-sm px-3 py-1 rounded-full bg-white/20">
                    <span className="mr-2"><FiMapPin /></span>
                    {event.location[lang as keyof typeof event.location]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2">
              {/* Event Description */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{eventDetail.about || 'About This Event'}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {event.fullDescription?.[lang as keyof typeof event.fullDescription] || 
                   event.description[lang as keyof typeof event.description]}
                </p>
                
                {event.speakers && (
                  <>
                    <hr className="my-8 border-gray-200" />
                    
                    {/* Speakers */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{eventDetail.speakers || 'Speakers'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                            <Image 
                              src={speaker.image} 
                              alt={speaker.name} 
                              className="object-cover"
                              width={96}
                              height={96}
                            />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800">{speaker.name}</h3>
                          <p className="text-purple-600">{speaker.position[lang as keyof typeof speaker.position]}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Event Schedule */}
              {event.schedule && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{eventDetail.schedule || 'Event Schedule'}</h2>
                  
                  <div className="space-y-6">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:items-start border-l-4 border-purple-600 pl-4 md:space-x-4">
                        <div className="md:w-1/4 font-medium text-purple-700 mb-2 md:mb-0">
                          {item.time[lang as keyof typeof item.time]}
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.title[lang as keyof typeof item.title]}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Event Registration */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{eventDetail.eventDetails || 'Event Details'}</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1"><FiCalendar /></span>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">{eventDetail.date || 'Date'}</h4>
                      <p className="text-gray-800">{event.date[lang as keyof typeof event.date]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1"><FiClock /></span>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">{eventDetail.time || 'Time'}</h4>
                      <p className="text-gray-800">{event.time[lang as keyof typeof event.time]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1"><FiMapPin /></span>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">{eventDetail.location || 'Location'}</h4>
                      <p className="text-gray-800">{event.location[lang as keyof typeof event.location]}</p>
                      <p className="text-gray-600 text-sm">
                        {event.address?.[lang as keyof typeof event.address]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1"><FiTag /></span>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">{eventDetail.category || 'Category'}</h4>
                      <p className="text-gray-800">{event.category[lang as keyof typeof event.category]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1"><FiUsers /></span>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">{eventDetail.capacity || 'Capacity'}</h4>
                      <p className="text-gray-800">{event.capacity?.[lang as keyof typeof event.capacity]}</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors mb-4">
                  {eventDetail.register || 'Register Now'}
                </button>
                
                <div className="flex justify-between">
                  <button className="flex items-center text-purple-600 hover:text-purple-800">
                    <span className="mr-2"><FiShare2 /></span>
                    {eventDetail.share || 'Share'}
                  </button>
                  
                  <button className="flex items-center text-purple-600 hover:text-purple-800">
                    <span className="mr-2"><FiDownload /></span>
                    {eventDetail.addToCalendar || 'Add to Calendar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Events */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {eventDetail.relatedEvents || 'Related Events'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {eventsData.filter(e => e.slug !== slug)
                .slice(0, 3)
                .map((relatedEvent) => (
                <div key={relatedEvent.slug} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={relatedEvent.image} 
                      alt={relatedEvent.title[lang as keyof typeof relatedEvent.title]} 
                      className="group-hover:scale-105 transition-transform duration-300"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-0 left-0 bg-purple-600 text-white py-1 px-4 text-sm font-medium">
                      {relatedEvent.category[lang as keyof typeof relatedEvent.category]}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <span><FiCalendar /></span>
                      <span>{relatedEvent.date[lang as keyof typeof relatedEvent.date]}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                      {relatedEvent.title[lang as keyof typeof relatedEvent.title]}
                    </h3>
                    
                    <a 
                      href={`/${lang}/events/${relatedEvent.slug}`}
                      className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      {t.common?.details || "Details"}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-purple-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{eventDetail.ctaTitle || 'Interested in More Events?'}</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              {eventDetail.ctaText || 'Check out our upcoming events and programs. Join MIRA ACADEMY for more educational opportunities.'}
            </p>
            <a 
              href={`/${lang}/events`}
              className="inline-block px-6 py-3 bg-white text-purple-700 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              {eventDetail.viewAllEvents || 'View All Events'}
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 