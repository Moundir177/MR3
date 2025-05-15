'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import * as FiIcons from 'react-icons/fi';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: number;
  category: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  coverImage: string;
  tags: string[];
}

interface TranslationType {
  blog?: {
    postNotFound?: string;
    postNotFoundDesc?: string;
    backToBlog?: string;
    categories?: Record<string, string>;
    minRead?: string;
    tags?: string;
    relatedPosts?: string;
    newsletterTitle?: string;
    newsletterSubtitle?: string;
    emailPlaceholder?: string;
    subscribe?: string;
    tagsTitle?: string;
  };
  common?: {
    shareOn?: string;
  };
}

interface BlogPostClientProps {
  post: BlogPost | undefined;
  relatedPosts: BlogPost[];
  lang: string;
  t: TranslationType;
}

export default function BlogPostClient({ post, relatedPosts, lang, t }: BlogPostClientProps) {
  // Add state for current URL
  const [currentUrl, setCurrentUrl] = useState('');
  
  // Set the URL on client side only
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'ar' ? 'ar-EG' : 'en-US', options);
  };
  
  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{t.blog?.postNotFound || "Post Not Found"}</h1>
            <p className="mb-8">{t.blog?.postNotFoundDesc || "The blog post you're looking for doesn't exist or has been removed."}</p>
            <Link 
              href={`/${lang}/blog`}
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              <span className="mr-2">{FiIcons.FiChevronLeft({})}</span>
              {t.blog?.backToBlog || "Back to Blog"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Helper to safely access category translations
  const getCategoryName = (category: string) => {
    if (t.blog?.categories && category in t.blog.categories) {
      return t.blog.categories[category as keyof typeof t.blog.categories];
    }
    return category;
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <div className="absolute inset-0">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-end py-12">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium mb-4">
                {getCategoryName(post.category)}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
              <div className="flex items-center text-white gap-6">
                <div className="flex items-center">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{FiIcons.FiCalendar({})}</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{FiIcons.FiClock({})}</span>
                  <span>{post.readTime} {t.blog?.minRead || "min read"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              <Link 
                href={`/${lang}/blog`}
                className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-8"
              >
                <span className="mr-2">{FiIcons.FiChevronLeft({})}</span>
                {t.blog?.backToBlog || "Back to Blog"}
              </Link>
              
              {/* Article Content */}
              <article className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
              
              {/* Tags */}
              <div className="mt-12 border-t border-b border-gray-200 py-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-700 font-medium">{t.blog?.tags || "Tags"}:</span>
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-6">
                <div className="flex items-center">
                  <span className="text-gray-700 font-medium mr-4">
                    <span className="inline mr-2">{FiIcons.FiShare2({})}</span>
                    {t.common?.shareOn || "Share on"}:
                  </span>
                  <div className="flex space-x-3">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <span>{FiIcons.FiFacebook({})}</span>
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                    >
                      <span>{FiIcons.FiTwitter({})}</span>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
                    >
                      <span>{FiIcons.FiLinkedin({})}</span>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Author Bio */}
              <div className="mt-12 bg-gray-50 rounded-xl p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                    <p className="text-gray-600">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 space-y-8">
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-6">{t.blog?.relatedPosts || "Related Posts"}</h3>
                  <div className="space-y-6">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.id} className="flex gap-4">
                        <img 
                          src={relatedPost.coverImage} 
                          alt={relatedPost.title} 
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-medium mb-1 leading-tight">
                            <Link href={`/${lang}/blog/${relatedPost.slug}`} className="hover:text-purple-600 transition-colors">
                              {relatedPost.title}
                            </Link>
                          </h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-1">{FiIcons.FiCalendar({})}</span>
                            <span>{formatDate(relatedPost.publishedAt)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
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
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
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