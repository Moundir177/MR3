'use client';

import React, { useState } from 'react';
import { translations } from '@/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  FiBook, 
  FiDownload, 
  FiLink, 
  FiVideo, 
  FiFileText, 
  FiCode, 
  FiPenTool, 
  FiGlobe, 
  FiCreditCard, 
  FiCalendar, 
  FiSearch,
  FiExternalLink,
  FiMessageSquare,
  FiClock,
  FiBarChart
} from 'react-icons/fi';

// Sample resource categories
const resourceCategories = [
  'All',
  'Learning Materials',
  'Software & Tools',
  'Career Resources',
  'Student Support',
  'Libraries & Databases'
];

// Sample resources data
const resources = [
  {
    id: 1,
    title: 'Web Development Learning Path',
    description: 'A comprehensive guide for web development students with recommended tutorials, articles, and coding exercises.',
    category: 'Learning Materials',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    link: '/web-development-path',
    icon: <FiCode className="w-6 h-6" />,
    featured: true
  },
  {
    id: 2,
    title: 'Digital Marketing Toolkit',
    description: 'Essential resources for digital marketing students, including templates, case studies, and analysis tools.',
    category: 'Learning Materials',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3',
    tags: ['SEO', 'Social Media', 'Content Marketing'],
    link: '/marketing-toolkit',
    icon: <FiPenTool className="w-6 h-6" />,
    featured: true
  },
  {
    id: 3,
    title: 'Student Software Licenses',
    description: 'Free and discounted software licenses available to all enrolled students, including Adobe Creative Cloud, Microsoft Office, and more.',
    category: 'Software & Tools',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3',
    tags: ['Software', 'Design Tools', 'Programming'],
    link: '/student-licenses',
    icon: <FiDownload className="w-6 h-6" />,
    featured: true
  },
  {
    id: 4,
    title: 'Online Learning Platform Guide',
    description: 'Learn how to use our online learning platform effectively, access course materials, submit assignments, and track your progress.',
    category: 'Student Support',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3',
    tags: ['E-learning', 'Platform', 'Guide'],
    link: '/platform-guide',
    icon: <FiGlobe className="w-6 h-6" />,
    featured: false
  },
  {
    id: 5,
    title: 'Academic Calendar',
    description: 'Important dates for the academic year, including registration periods, exam schedules, and holidays.',
    category: 'Student Support',
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3',
    tags: ['Calendar', 'Schedule', 'Dates'],
    link: '/academic-calendar',
    icon: <FiCalendar className="w-6 h-6" />,
    featured: false
  },
  {
    id: 6,
    title: 'Career Resources Portal',
    description: 'Access job listings, internship opportunities, resume templates, and interview preparation materials.',
    category: 'Career Resources',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3',
    tags: ['Jobs', 'Career', 'Interview'],
    link: '/career-portal',
    icon: <FiBarChart className="w-6 h-6" />,
    featured: true
  },
  {
    id: 7,
    title: 'Research Databases Access',
    description: 'Access to premium research databases and digital libraries for academic research and projects.',
    category: 'Libraries & Databases',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3',
    tags: ['Research', 'Library', 'Academic'],
    link: '/research-databases',
    icon: <FiFileText className="w-6 h-6" />,
    featured: false
  },
  {
    id: 8,
    title: 'Video Tutorials Library',
    description: 'Extensive library of video tutorials covering various subjects and tools used in our programs.',
    category: 'Learning Materials',
    image: 'https://images.unsplash.com/photo-1567443024551-f3e3a5e1a7a2?ixlib=rb-4.0.3',
    tags: ['Videos', 'Tutorials', 'Learning'],
    link: '/video-library',
    icon: <FiVideo className="w-6 h-6" />,
    featured: false
  },
  {
    id: 9,
    title: 'Financial Aid Resources',
    description: 'Information about scholarships, payment plans, and other financial assistance options available to students.',
    category: 'Student Support',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3',
    tags: ['Financial', 'Scholarships', 'Aid'],
    link: '/financial-aid',
    icon: <FiCreditCard className="w-6 h-6" />,
    featured: false
  },
  {
    id: 10,
    title: 'Programming Practice Platforms',
    description: 'Access to coding practice platforms and competitive programming resources for hands-on learning.',
    category: 'Software & Tools',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3',
    tags: ['Coding', 'Practice', 'Development'],
    link: '/coding-practice',
    icon: <FiCode className="w-6 h-6" />,
    featured: false
  },
  {
    id: 11,
    title: 'Student Support Services',
    description: 'Information about academic advising, tutoring services, and technical support available to all students.',
    category: 'Student Support',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3',
    tags: ['Support', 'Tutoring', 'Help'],
    link: '/support-services',
    icon: <FiMessageSquare className="w-6 h-6" />,
    featured: false
  },
  {
    id: 12,
    title: 'Industry Partnership Program',
    description: 'Information about our industry partners, internship opportunities, and joint projects with leading companies.',
    category: 'Career Resources',
    image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3',
    tags: ['Industry', 'Partners', 'Internships'],
    link: '/industry-partnerships',
    icon: <FiLink className="w-6 h-6" />,
    featured: false
  }
];

// Recent updates for the announcement section
const recentUpdates = [
  {
    id: 1,
    title: 'New Cloud Computing Resources Added',
    date: '2024-06-15',
    description: 'We\'ve added a comprehensive collection of AWS and Azure learning resources to our cloud computing section.'
  },
  {
    id: 2,
    title: 'Extended Library Hours During Finals',
    date: '2024-06-10',
    description: 'The campus library will remain open 24/7 during the final exam period from June 20-30.'
  },
  {
    id: 3,
    title: 'New Career Workshop Series',
    date: '2024-06-05',
    description: 'Join our new series of career workshops every Wednesday afternoon, starting June 15th.'
  }
];

export default function ResourcesPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang;
  
  // Make sure we have a valid language, default to French if not found
  const safeLanguage = lang as keyof typeof translations;
  const t = translations[safeLanguage] || translations.fr;
  
  // Safely access nested properties
  const common = t.common || {};
  
  // State for filtering
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter resources based on category and search query
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Student Resources</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Tools, materials, and support services to help you succeed in your studies at MIRA ACADEMY
            </p>
          </div>
        </div>
        
        {/* Featured Resources */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resources.filter(r => r.featured).map(resource => (
                <div 
                  key={resource.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white p-2 rounded-full">
                      {resource.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{resource.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={resource.link} 
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                    >
                      Access Resource
                      <FiExternalLink className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent Updates */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <FiClock className="mr-2 text-blue-600" />
                Recent Updates
              </h2>
              
              <div className="space-y-6">
                {recentUpdates.map(update => (
                  <div key={update.id} className="border-l-4 border-blue-600 pl-4 py-1">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-gray-800">{update.title}</h3>
                      <span className="text-gray-500 text-sm">{update.date}</span>
                    </div>
                    <p className="text-gray-600">{update.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* All Resources */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">All Resources</h2>
            
            {/* Filter and Search */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-2/3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search resources..."
                      className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FiSearch className="absolute right-3 top-3.5 text-gray-400" />
                  </div>
                </div>
                <div className="md:w-1/3">
                  <select
                    className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {resourceCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Resources Grid */}
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map(resource => (
                  <div 
                    key={resource.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-100"
                  >
                    <div className="flex items-center p-4 border-b border-gray-100">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4 text-blue-600">
                        {resource.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{resource.title}</h3>
                        <p className="text-gray-500 text-sm">{resource.category}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={resource.link} 
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 text-sm"
                      >
                        Access Resource
                        <FiExternalLink className="ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600">No resources found matching your criteria.</p>
                <button 
                  className="mt-4 text-blue-600 hover:underline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Support Section */}
        <div className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Need Help Finding Resources?</h2>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Academic Support</h3>
                    <p className="text-gray-600 mb-4">
                      Our academic advisors can help you find the right resources for your specific needs and learning goals.
                    </p>
                    <a 
                      href={`/${lang}/contact?department=academic`} 
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <FiMessageSquare className="mr-2" />
                      <span>Contact Academic Support</span>
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Technical Support</h3>
                    <p className="text-gray-600 mb-4">
                      Having trouble accessing online resources or need help with software? Our technical team is here to help.
                    </p>
                    <a 
                      href={`/${lang}/contact?department=technical`} 
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <FiMessageSquare className="mr-2" />
                      <span>Contact Technical Support</span>
                    </a>
                  </div>
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