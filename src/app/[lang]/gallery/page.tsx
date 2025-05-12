'use client';

import React, { useState } from 'react';
import { translations } from '@/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiCamera, FiSearch, FiFilter } from 'react-icons/fi';

// Sample gallery data
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3',
    alt: 'Campus main building',
    category: 'campus',
    size: 'large'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3',
    alt: 'Computer lab',
    category: 'facilities',
    size: 'medium'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3',
    alt: 'Library',
    category: 'facilities',
    size: 'medium'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-4.0.3',
    alt: 'Student project presentation',
    category: 'events',
    size: 'large'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1580582932707-520aed937b52?ixlib=rb-4.0.3',
    alt: 'Classroom',
    category: 'facilities',
    size: 'small'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?ixlib=rb-4.0.3',
    alt: 'Graduation ceremony',
    category: 'events',
    size: 'large'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3',
    alt: 'Group study',
    category: 'students',
    size: 'medium'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3',
    alt: 'Technology workshop',
    category: 'workshops',
    size: 'medium'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3',
    alt: 'Open day',
    category: 'events',
    size: 'small'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3',
    alt: 'Campus garden',
    category: 'campus',
    size: 'large'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?ixlib=rb-4.0.3',
    alt: 'Cafeteria',
    category: 'facilities',
    size: 'medium'
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3',
    alt: 'Students in hallway',
    category: 'students',
    size: 'medium'
  }
];

// Define categories for the filter
const categories = [
  { id: 'all', label: { fr: 'Tous', ar: 'الكل', en: 'All' } },
  { id: 'campus', label: { fr: 'Campus', ar: 'الحرم الجامعي', en: 'Campus' } },
  { id: 'facilities', label: { fr: 'Installations', ar: 'المرافق', en: 'Facilities' } },
  { id: 'events', label: { fr: 'Événements', ar: 'الفعاليات', en: 'Events' } },
  { id: 'students', label: { fr: 'Étudiants', ar: 'الطلاب', en: 'Students' } },
  { id: 'workshops', label: { fr: 'Ateliers', ar: 'ورش العمل', en: 'Workshops' } }
];

export default function GalleryPage({ params }: { params: { lang: string } }) {
  const t = translations[params.lang as keyof typeof translations] || translations.fr;
  
  // State for filter and search
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter images based on category and search query
  const filteredImages = galleryImages.filter((image) => {
    const matchesCategory = activeCategory === 'all' || image.category === activeCategory;
    const matchesSearch = image.alt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {t.gallery?.title || "Gallery"}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {t.gallery?.subtitle || "Explore our campus, facilities, and student life through our gallery of images"}
            </p>
          </div>
        </div>
        
        {/* Filter and Search Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-10 -mt-12 relative z-10">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map((category) => (
                  <button 
                    key={category.id} 
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.id 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label[params.lang as keyof typeof category.label] || category.label.en}
                  </button>
                ))}
              </div>
              
              {/* Search Input */}
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder={t.common?.search || "Search"}
                  className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredImages.length > 0 ? (
              filteredImages.map((image) => (
                <div 
                  key={image.id} 
                  className={`overflow-hidden rounded-lg shadow-md group hover:shadow-xl transition-all duration-300 ${
                    image.size === 'large' ? 'lg:col-span-2 lg:row-span-2' : 
                    image.size === 'medium' ? 'lg:col-span-1 lg:row-span-1' : ''
                  }`}
                >
                  <div className="relative h-64 md:h-80 w-full overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 w-full">
                        <p className="text-white font-medium">{image.alt}</p>
                        <span className="inline-block px-2 py-1 mt-2 bg-purple-600 text-white text-xs rounded-full">
                          {categories.find(cat => cat.id === image.category)?.label[params.lang as keyof {fr: string, ar: string, en: string}] || image.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <FiSearch className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">{t.gallery?.noResults || "No images found matching your criteria"}</p>
                <button 
                  onClick={() => {setActiveCategory('all'); setSearchQuery('');}}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  {t.gallery?.clearFilters || "Clear filters"}
                </button>
              </div>
            )}
          </div>
          
          {/* Pagination (if needed) */}
          {filteredImages.length > 0 && (
            <div className="flex justify-center my-12">
              <div className="flex items-center space-x-1">
                <button className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
                  {t.common?.previous || "Previous"}
                </button>
                <button className="px-4 py-2 border rounded-md bg-purple-600 text-white">1</button>
                <button className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
                  {t.common?.next || "Next"}
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t.gallery?.ctaTitle || "Want to Visit Our Campus?"}</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              {t.gallery?.ctaText || "Schedule a tour to see our facilities and meet our instructors in person."}
            </p>
            <a 
              href={`/${params.lang}/contact`}
              className="inline-block px-6 py-3 bg-white text-purple-700 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              {t.gallery?.ctaButton || "Contact Us"}
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 