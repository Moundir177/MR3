'use client';

import React, { useState } from 'react';
import { translations } from '@/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiClock, FiUser, FiTag, FiSearch, FiCalendar } from 'react-icons/fi';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'How to Choose the Right Programming Language for Beginners',
    slug: 'how-to-choose-programming-language-beginners',
    excerpt: 'Starting your programming journey can be overwhelming with so many languages available. This guide will help you make the right choice based on your goals.',
    content: '',
    publishedAt: '2024-06-10',
    readTime: 8,
    category: 'programming',
    author: {
      name: 'Mohammed Ali',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    isFeatured: true
  },
  {
    id: 2,
    title: 'The Future of Digital Marketing in 2024',
    slug: 'future-digital-marketing-2024',
    excerpt: 'Explore emerging trends and technologies that are reshaping digital marketing strategies in 2024 and beyond.',
    content: '',
    publishedAt: '2024-05-28',
    readTime: 6,
    category: 'marketing',
    author: {
      name: 'Sarah Benmoussa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    isFeatured: true
  },
  {
    id: 3,
    title: 'AI Ethics: Challenges and Considerations',
    slug: 'ai-ethics-challenges-considerations',
    excerpt: 'As AI becomes more integrated into our daily lives, understanding the ethical implications is crucial for responsible development.',
    content: '',
    publishedAt: '2024-05-15',
    readTime: 12,
    category: 'ai',
    author: {
      name: 'Karim Lahlou',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    isFeatured: false
  },
  {
    id: 4,
    title: 'Building a Strong Project Portfolio for Job Applications',
    slug: 'building-project-portfolio-job-applications',
    excerpt: 'Learn how to showcase your skills effectively through a well-structured project portfolio that stands out to employers.',
    content: '',
    publishedAt: '2024-05-08',
    readTime: 7,
    category: 'career',
    author: {
      name: 'Amina Belkacem',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
    },
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
    isFeatured: false
  },
  {
    id: 5,
    title: 'The Benefits of Project-Based Learning in Tech Education',
    slug: 'benefits-project-based-learning-tech-education',
    excerpt: 'Project-based learning provides hands-on experience and practical skills that traditional education methods often miss.',
    content: '',
    publishedAt: '2024-04-27',
    readTime: 5,
    category: 'education',
    author: {
      name: 'Younes Cherif',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    isFeatured: false
  },
  {
    id: 6,
    title: 'How to Prepare for a Technical Interview',
    slug: 'how-to-prepare-technical-interview',
    excerpt: 'A comprehensive guide to ace your technical interviews, from preparation strategies to common pitfalls to avoid.',
    content: '',
    publishedAt: '2024-04-15',
    readTime: 9,
    category: 'career',
    author: {
      name: 'Mohammed Ali',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    coverImage: 'https://images.unsplash.com/photo-1453906971074-ce568cccbc63',
    isFeatured: false
  }
];

// Blog categories
const categories = [
  { id: 'all', count: blogPosts.length },
  { id: 'programming', count: blogPosts.filter(post => post.category === 'programming').length },
  { id: 'marketing', count: blogPosts.filter(post => post.category === 'marketing').length },
  { id: 'ai', count: blogPosts.filter(post => post.category === 'ai').length },
  { id: 'career', count: blogPosts.filter(post => post.category === 'career').length },
  { id: 'education', count: blogPosts.filter(post => post.category === 'education').length }
];

export default function BlogPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang;
  
  // Get translations for the current language
  const t = translations[lang as keyof typeof translations] || translations.fr;
  
  // State for filtering and search
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.isFeatured);
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'ar' ? 'ar-EG' : 'en-US', options);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {t.blog?.title || "Blog"}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {t.blog?.subtitle || "Insights, trends and educational resources for your professional development"}
            </p>
          </div>
        </div>
        
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-8">{t.blog?.featuredPosts || "Featured Posts"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                  <div className="h-60 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-3">
                      {post.category in (t.blog?.categories || {}) 
                        ? t.blog?.categories[post.category as keyof typeof t.blog.categories] 
                        : post.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3">
                      <Link href={`/${lang}/blog/${post.slug}`} className="hover:text-purple-600 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <span className="text-sm text-gray-700">{post.author.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="mx-2">•</span>
                        <FiClock className="mr-1" />
                        <span>{post.readTime} {t.blog?.minRead || "min read"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Blog Content with Sidebar */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              {/* Search and Filter Bar */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-80">
                    <input
                      type="text"
                      placeholder={t.common?.search || "Search articles..."}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Blog Posts */}
              {filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img 
                            src={post.coverImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-3">
                            {post.category in (t.blog?.categories || {}) 
                              ? t.blog?.categories[post.category as keyof typeof t.blog.categories] 
                              : post.category}
                          </span>
                          <h3 className="text-xl font-bold mb-2">
                            <Link href={`/${lang}/blog/${post.slug}`} className="hover:text-purple-600 transition-colors">
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <img 
                                src={post.author.avatar} 
                                alt={post.author.name} 
                                className="w-8 h-8 rounded-full object-cover mr-2"
                              />
                              <span className="text-sm text-gray-700">{post.author.name}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <FiCalendar className="mr-1" />
                              <span>{formatDate(post.publishedAt)}</span>
                              <span className="mx-2">•</span>
                              <FiClock className="mr-1" />
                              <span>{post.readTime} {t.blog?.minRead || "min read"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <FiSearch className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-xl text-gray-600">{t.blog?.noResults || "No articles found matching your criteria"}</p>
                  <button 
                    onClick={() => {setActiveCategory('all'); setSearchQuery('');}}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    {t.blog?.clearFilters || "Clear filters"}
                  </button>
                </div>
              )}
              
              {/* Pagination */}
              {filteredPosts.length > 0 && (
                <div className="flex justify-center mt-12">
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
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">{t.blog?.categoriesTitle || "Categories"}</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex justify-between items-center px-3 py-2 rounded-md transition-colors ${
                          activeCategory === category.id 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span className="capitalize">
                          {category.id in (t.blog?.categories || {}) 
                            ? t.blog?.categories[category.id as keyof typeof t.blog.categories] 
                            : category.id}
                        </span>
                        <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Newsletter Subscribe */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg shadow-md p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{t.blog?.newsletterTitle || "Subscribe to Our Newsletter"}</h3>
                <p className="mb-4">{t.blog?.newsletterSubtitle || "Stay updated with our latest articles and news"}</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder={t.blog?.emailPlaceholder || "Your email address"}
                    className="w-full px-4 py-2 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-white text-purple-700 rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    {t.blog?.subscribe || "Subscribe"}
                  </button>
                </form>
              </div>
              
              {/* Popular Tags */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">{t.blog?.tagsTitle || "Popular Tags"}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors">
                    #programming
                  </span>
                  <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors">
                    #javascript
                  </span>
                  <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors">
                    #webdev
                  </span>
                  <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors">
                    #ai
                  </span>
                  <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors">
                    #machinelearning
                  </span>
                  <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors">
                    #career
                  </span>
                  <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors">
                    #education
                  </span>
                  <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors">
                    #digitalnomad
                  </span>
                  <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors">
                    #marketing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 