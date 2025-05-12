'use client';

import React, { useState } from 'react';
import { translations } from '@/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiSearch, FiFilter, FiMail, FiLinkedin, FiGlobe, FiAward, FiBookOpen, FiUsers, FiMessageSquare } from 'react-icons/fi';

// Sample faculty departments
const departments = [
  'All',
  'Web Development',
  'Digital Marketing',
  'Artificial Intelligence',
  'Business Administration',
  'Graphic Design',
  'Data Science'
];

// Sample faculty members data
const facultyMembers = [
  {
    id: 1,
    name: 'Prof. Mohammed Al-Farsi',
    title: 'Head of Web Development Department',
    department: 'Web Development',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3',
    education: 'Ph.D. in Computer Science, MIT',
    bio: 'Professor Al-Farsi has over 15 years of experience in web development and software engineering. He has worked with major tech companies and brings real-world expertise to his teaching.',
    expertise: ['Front-end Development', 'Back-end Systems', 'Cloud Architecture', 'JavaScript Frameworks'],
    courses: ['Complete Web Development Bootcamp', 'Advanced JavaScript', 'Full-Stack Development with MERN'],
    contact: {
      email: 'alfarsi@miracademy.edu',
      linkedin: 'linkedin.com/in/alfarsi'
    },
    featured: true
  },
  {
    id: 2,
    name: 'Dr. Amina Benali',
    title: 'Senior Instructor, AI Department',
    department: 'Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3',
    education: 'Ph.D. in Artificial Intelligence, Stanford University',
    bio: 'Dr. Benali specializes in machine learning algorithms and neural networks. She has published numerous research papers and has been recognized for her contributions to AI education.',
    expertise: ['Machine Learning', 'Neural Networks', 'Computer Vision', 'Natural Language Processing'],
    courses: ['Introduction to AI', 'Machine Learning Fundamentals', 'Deep Learning Applications'],
    contact: {
      email: 'benali@miracademy.edu',
      linkedin: 'linkedin.com/in/benali'
    },
    featured: true
  },
  {
    id: 3,
    name: 'Younes Chakir',
    title: 'Lead Instructor, Digital Marketing',
    department: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3',
    education: 'MBA with Digital Marketing Specialization, INSEAD',
    bio: 'With extensive experience in digital marketing campaigns for international brands, Younes brings practical industry knowledge to his courses. He is Google and Facebook Ads certified.',
    expertise: ['SEO', 'Content Marketing', 'Social Media Strategy', 'PPC Advertising'],
    courses: ['Digital Marketing Masterclass', 'Social Media Marketing', 'SEO & SEM Fundamentals'],
    contact: {
      email: 'chakir@miracademy.edu',
      website: 'youneschakir.com'
    },
    featured: false
  },
  {
    id: 4,
    name: 'Fatima Zahra',
    title: 'Design Lead',
    department: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3',
    education: 'MFA in Graphic Design, Parsons School of Design',
    bio: 'Fatima has worked with leading design agencies and brands. Her approach combines artistic creativity with practical commercial applications, providing students with industry-relevant skills.',
    expertise: ['UI/UX Design', 'Brand Identity', 'Typography', 'Motion Graphics'],
    courses: ['Graphic Design Principles', 'UI/UX Design', 'Brand Identity Development'],
    contact: {
      email: 'fzahra@miracademy.edu',
      linkedin: 'linkedin.com/in/fzahra'
    },
    featured: false
  },
  {
    id: 5,
    name: 'Ahmed Bouazizi',
    title: 'Data Science Instructor',
    department: 'Data Science',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
    education: 'M.Sc. in Data Science, École Polytechnique',
    bio: 'Ahmed has extensive experience in data analysis and predictive modeling. Before joining academia, he worked as a senior data scientist for financial institutions and tech startups.',
    expertise: ['Statistical Analysis', 'Big Data', 'Predictive Modeling', 'Python for Data Science'],
    courses: ['Data Analysis with Python', 'Statistical Methods for Data Science', 'Big Data Technologies'],
    contact: {
      email: 'bouazizi@miracademy.edu',
      linkedin: 'linkedin.com/in/bouazizi'
    },
    featured: false
  },
  {
    id: 6,
    name: 'Sophia El-Mansouri',
    title: 'Business Administration Professor',
    department: 'Business Administration',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3',
    education: 'Ph.D. in Business Administration, HEC Paris',
    bio: 'Dr. El-Mansouri combines academic excellence with entrepreneurial experience. She has founded two successful startups and serves as an advisor to several companies.',
    expertise: ['Entrepreneurship', 'Strategic Management', 'Marketing', 'Business Ethics'],
    courses: ['Entrepreneurship Fundamentals', 'Business Strategy', 'Marketing Management'],
    contact: {
      email: 'elmansouri@miracademy.edu',
      linkedin: 'linkedin.com/in/elmansouri'
    },
    featured: true
  }
];

export default function FacultyPage({ params }: { params: { lang: string } }) {
  // Make sure we have a valid language, default to French if not found
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.fr;
  
  // Safely access nested properties - assuming we'll add faculty translations later
  const common = t.common || {};
  
  // State for filtering and viewing
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  
  // Filter faculty members based on department and search query
  const filteredFaculty = facultyMembers.filter(faculty => {
    const matchesDepartment = selectedDepartment === 'All' || faculty.department === selectedDepartment;
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faculty.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDepartment && matchesSearch;
  });
  
  // Get currently selected faculty member details
  const selectedMember = selectedFaculty !== null 
    ? facultyMembers.find(f => f.id === selectedFaculty) 
    : null;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Our Faculty</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Meet our expert instructors who bring real-world experience and academic excellence to MIRA ACADEMY
            </p>
          </div>
        </div>
        
        {/* Featured Faculty */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Instructors</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {facultyMembers.filter(f => f.featured).map(faculty => (
                <div 
                  key={faculty.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedFaculty(faculty.id)}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={faculty.image} 
                      alt={faculty.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{faculty.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{faculty.title}</p>
                    <p className="text-gray-600 mb-4 line-clamp-3">{faculty.bio}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiBookOpen className="mr-1" />
                      <span>{faculty.courses.length} courses</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Faculty Search & Directory */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Faculty Directory</h2>
            
            {/* Search & Filter */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-3/4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name or specialty..."
                      className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FiSearch className="absolute right-3 top-3.5 text-gray-400" />
                  </div>
                </div>
                <div className="md:w-1/4">
                  <div className="relative">
                    <select
                      className="w-full py-3 px-4 appearance-none rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    <FiFilter className="absolute right-3 top-3.5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Faculty Grid */}
            {filteredFaculty.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFaculty.map(faculty => (
                  <div 
                    key={faculty.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedFaculty(faculty.id)}
                  >
                    <div className="flex items-center p-4">
                      <img 
                        src={faculty.image} 
                        alt={faculty.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-gray-800">{faculty.name}</h3>
                        <p className="text-blue-600 text-sm">{faculty.title}</p>
                        <p className="text-gray-500 text-xs mt-1">{faculty.department}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <div className="flex flex-wrap gap-2 mt-2">
                        {faculty.expertise.slice(0, 3).map((skill, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {faculty.expertise.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{faculty.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600">No faculty members found matching your criteria.</p>
                <button 
                  className="mt-4 text-blue-600 hover:underline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDepartment('All');
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Faculty Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button 
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedFaculty(null)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-blue-50">
                    <div className="p-6">
                      <img 
                        src={selectedMember.image} 
                        alt={selectedMember.name}
                        className="w-full h-64 object-cover rounded-lg shadow mb-6"
                      />
                      
                      <h3 className="font-bold text-gray-800 text-xl mb-1">{selectedMember.name}</h3>
                      <p className="text-blue-600 mb-4">{selectedMember.title}</p>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center text-gray-600">
                          <FiBookOpen className="mr-2" />
                          <span>{selectedMember.department}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FiAward className="mr-2" />
                          <span>{selectedMember.education}</span>
                        </div>
                        
                        <div className="pt-4 space-y-2">
                          <p className="font-medium text-gray-800">Contact:</p>
                          {selectedMember.contact.email && (
                            <a 
                              href={`mailto:${selectedMember.contact.email}`}
                              className="flex items-center text-blue-600 hover:underline"
                            >
                              <FiMail className="mr-2" />
                              <span>{selectedMember.contact.email}</span>
                            </a>
                          )}
                          {selectedMember.contact.linkedin && (
                            <a 
                              href={`https://${selectedMember.contact.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 hover:underline"
                            >
                              <FiLinkedin className="mr-2" />
                              <span>LinkedIn Profile</span>
                            </a>
                          )}
                          {selectedMember.contact.website && (
                            <a 
                              href={`https://${selectedMember.contact.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 hover:underline"
                            >
                              <FiGlobe className="mr-2" />
                              <span>Personal Website</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Biography</h4>
                      <p className="text-gray-600">{selectedMember.bio}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.expertise.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Courses Taught</h4>
                      <ul className="space-y-2">
                        {selectedMember.courses.map((course, index) => (
                          <li key={index} className="flex items-start">
                            <FiBookOpen className="mt-1 mr-2 text-blue-600 flex-shrink-0" />
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <a 
                        href={`/${params.lang}/contact?instructor=${selectedMember.name}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <FiMessageSquare className="mr-2" />
                        <span>Contact This Instructor</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Join Our Faculty CTA */}
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Faculty</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              We're always looking for experienced professionals to join our teaching team. Share your knowledge and help shape the next generation of talent.
            </p>
            <a 
              href={`/${params.lang}/careers`} 
              className="inline-block px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Explore Teaching Opportunities
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 