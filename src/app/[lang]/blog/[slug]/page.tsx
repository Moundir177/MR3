'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { translations } from '@/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiClock, FiCalendar, FiShare2, FiFacebook, FiTwitter, FiLinkedin, FiChevronLeft } from 'react-icons/fi';

// Sample blog posts data (simplified version for the individual page)
const blogPosts = [
  {
    id: 1,
    title: 'How to Choose the Right Programming Language for Beginners',
    slug: 'how-to-choose-programming-language-beginners',
    excerpt: 'Starting your programming journey can be overwhelming with so many languages available. This guide will help you make the right choice based on your goals.',
    content: `
      <p>Starting your programming journey can be overwhelming with the multitude of languages available today. Each language has its own strengths, communities, and ideal use cases. This guide will help you narrow down your choices based on your specific goals and interests.</p>
      
      <h2>Consider Your Goals</h2>
      <p>Before diving into any programming language, it's important to define what you want to accomplish:</p>
      <ul>
        <li><strong>Web Development:</strong> If you're interested in creating websites, consider starting with HTML, CSS, and JavaScript.</li>
        <li><strong>Mobile App Development:</strong> For Android apps, Java or Kotlin are good choices. For iOS, Swift is the recommended language.</li>
        <li><strong>Data Science and AI:</strong> Python has become the standard for these fields due to its simplicity and powerful libraries.</li>
        <li><strong>Game Development:</strong> C# (with Unity) or C++ are commonly used in game development.</li>
        <li><strong>Enterprise Software:</strong> Java, C#, and Python are widely used in business applications.</li>
      </ul>
      
      <h2>Beginner-Friendly Languages</h2>
      <p>Some languages are more approachable for beginners than others. Here are some excellent starting points:</p>
      
      <h3>Python</h3>
      <p>Python is often recommended as a first language because of its readable syntax and versatility. It's widely used in web development, data science, AI, and automation.</p>
      <p>Example Python code:</p>
      <pre>
# A simple greeting program
name = input("What's your name? ")
print(f"Hello, {name}! Welcome to programming.")
      </pre>
      
      <h3>JavaScript</h3>
      <p>As the language of the web, JavaScript is essential for front-end development and increasingly popular for back-end development through Node.js.</p>
      <p>Example JavaScript code:</p>
      <pre>
// A simple greeting function
function greet(name) {
  return \`Hello, \${name}! Welcome to programming.\`;
}
console.log(greet("Learner"));
      </pre>
      
      <h2>Learning Resources</h2>
      <p>No matter which language you choose, having quality learning resources is essential:</p>
      <ul>
        <li><strong>Online Platforms:</strong> Codecademy, freeCodeCamp, and Coursera offer structured courses for beginners.</li>
        <li><strong>Documentation:</strong> Official language documentation is invaluable as you progress.</li>
        <li><strong>Community:</strong> Join forums like Stack Overflow or Reddit communities related to your chosen language.</li>
        <li><strong>Projects:</strong> Build small projects to apply what you've learned and build your portfolio.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Remember that your first programming language is just the beginning of your journey. Many developers become proficient in multiple languages throughout their careers. The most important thing is to start coding and learning the fundamental concepts that apply across languages.</p>
      
      <p>Once you've chosen a language, commit to it long enough to build something meaningful before considering whether to explore another language. Consistency and practice are key to becoming a successful programmer.</p>
    `,
    publishedAt: '2024-06-10',
    readTime: 8,
    category: 'programming',
    author: {
      name: 'Mohammed Ali',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      bio: 'Senior Software Engineer with 10+ years of experience. Passionate about teaching programming and mentoring new developers.'
    },
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    tags: ['programming', 'beginners', 'coding', 'education', 'tech career']
  },
  {
    id: 2,
    title: 'The Future of Digital Marketing in 2024',
    slug: 'future-digital-marketing-2024',
    excerpt: 'Explore emerging trends and technologies that are reshaping digital marketing strategies in 2024 and beyond.',
    content: `<p>Digital marketing continues to evolve at a rapid pace, with new technologies and changing consumer behaviors reshaping the landscape. In 2024, marketers need to adapt to these changes to stay competitive.</p>`,
    publishedAt: '2024-05-28',
    readTime: 6,
    category: 'marketing',
    author: {
      name: 'Sarah Benmoussa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      bio: 'Digital Marketing Specialist and content strategist with expertise in SEO and social media marketing.'
    },
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    tags: ['marketing', 'digital marketing', 'trends', 'social media', 'SEO']
  },
  {
    id: 3,
    title: 'AI Ethics: Challenges and Considerations',
    slug: 'ai-ethics-challenges-considerations',
    excerpt: 'As AI becomes more integrated into our daily lives, understanding the ethical implications is crucial for responsible development.',
    content: `<p>Artificial Intelligence is transforming virtually every industry, from healthcare to education and beyond. With this rapid advancement comes a responsibility to consider the ethical implications.</p>`,
    publishedAt: '2024-05-15',
    readTime: 12,
    category: 'ai',
    author: {
      name: 'Karim Lahlou',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      bio: 'AI researcher and ethicist focusing on responsible AI development and implementation.'
    },
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    tags: ['AI', 'ethics', 'technology', 'future', 'machine learning']
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lang = params.lang as string;
  
  const t = translations[lang as keyof typeof translations] || translations.fr;
  
  // Find the current post
  const post = blogPosts.find(p => p.slug === slug);
  
  // Get related posts (same category, excluding current post)
  const relatedPosts = post 
    ? blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3) 
    : [];
  
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
              <FiChevronLeft className="mr-2" />
              {t.blog?.backToBlog || "Back to Blog"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
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
                {post.category in (t.blog?.categories || {}) 
                  ? t.blog?.categories[post.category as keyof typeof t.blog.categories] 
                  : post.category}
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
                  <FiCalendar className="mr-2" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-2" />
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
                <FiChevronLeft className="mr-1" />
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
                    <FiShare2 className="inline mr-2" />
                    {t.common?.shareOn || "Share on"}:
                  </span>
                  <div className="flex space-x-3">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <FiFacebook />
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                    >
                      <FiTwitter />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
                    >
                      <FiLinkedin />
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
                            <FiCalendar className="mr-1" />
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