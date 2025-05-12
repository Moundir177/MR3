'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { translations } from '@/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiCalendar, FiClock, FiBook, FiUsers, FiAward, FiList, FiCheck, FiDownload, FiShare2, FiChevronLeft, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { courses } from '@/data/courses';

// Sample course data
const coursesData = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    slug: 'complete-web-development-bootcamp',
    subtitle: 'Master frontend and backend technologies to become a full-stack web developer',
    description: `Our comprehensive web development bootcamp takes you from beginner to professional developer. You'll learn the latest web technologies, best practices, and build real-world projects to add to your portfolio.
    
    This intensive program covers HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and more. By the end of the course, you'll have the skills and confidence to apply for web development positions or build your own web applications.`,
    duration: 16, // weeks
    level: 'beginner',
    category: 'web-development',
    enrolledStudents: 348,
    rating: 4.8,
    reviewCount: 128,
    language: 'English',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3',
    price: {
      regular: 599,
      discount: 499,
      currency: '$'
    },
    schedule: [
      {
        day: 'Monday',
        time: '18:00 - 21:00'
      },
      {
        day: 'Wednesday',
        time: '18:00 - 21:00'
      }
    ],
    startDate: '2024-08-15',
    enrollmentDeadline: '2024-08-10',
    instructors: [
      {
        id: 1,
        name: 'Mohammed Ali',
        title: 'Senior Web Developer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        bio: 'Over 10 years of experience in web development with expertise in frontend and backend technologies.',
        specialties: ['JavaScript', 'React', 'Node.js']
      },
      {
        id: 2,
        name: 'Sarah Benmoussa',
        title: 'UX/UI Designer & Frontend Developer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        bio: 'Specialized in creating beautiful, functional interfaces with an emphasis on user experience.',
        specialties: ['UX/UI Design', 'CSS', 'React']
      }
    ],
    curriculum: [
      {
        title: 'Introduction to Web Development',
        modules: [
          { title: 'Course Overview & Setup', duration: 2 },
          { title: 'Internet & How the Web Works', duration: 1 },
          { title: 'HTML Fundamentals', duration: 3 },
          { title: 'CSS Fundamentals', duration: 3 },
        ]
      },
      {
        title: 'JavaScript Programming',
        modules: [
          { title: 'JavaScript Basics', duration: 3 },
          { title: 'DOM Manipulation', duration: 3 },
          { title: 'Events & Event Handling', duration: 2 },
          { title: 'Asynchronous JavaScript', duration: 3 },
        ]
      },
      {
        title: 'Frontend Development',
        modules: [
          { title: 'React Fundamentals', duration: 4 },
          { title: 'State Management with Redux', duration: 3 },
          { title: 'Building Responsive UIs', duration: 3 },
          { title: 'Testing React Applications', duration: 2 },
        ]
      },
      {
        title: 'Backend Development',
        modules: [
          { title: 'Node.js Fundamentals', duration: 3 },
          { title: 'RESTful API Design', duration: 3 },
          { title: 'Express Framework', duration: 3 },
          { title: 'MongoDB & Mongoose', duration: 3 },
        ]
      },
      {
        title: 'Project & Deployment',
        modules: [
          { title: 'Full-Stack Project Development', duration: 6 },
          { title: 'Authentication & Authorization', duration: 3 },
          { title: 'Deployment & DevOps Basics', duration: 2 },
          { title: 'Final Project Presentation', duration: 2 },
        ]
      }
    ],
    requirements: [
      'Basic computer skills and familiarity with using the internet',
      'No prior programming experience needed, but logical thinking helps',
      'A computer with at least 8GB RAM (Mac, Windows, or Linux)',
      'Reliable internet connection for live sessions and assignments',
      'Dedication and at least 20 hours/week for study and practice'
    ],
    outcomes: [
      'Build responsive, accessible, and interactive websites',
      'Develop dynamic web applications using React',
      'Create backend services with Node.js and Express',
      'Design and integrate with databases like MongoDB',
      'Implement authentication and secure your applications',
      'Deploy applications to production environments',
      'Work with development tools like Git, npm, and webpack',
      'Collaborate effectively on team development projects'
    ],
    testimonials: [
      {
        id: 1,
        name: 'Ahmed Bouazizi',
        role: 'Frontend Developer at TechCorp',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        text: 'This bootcamp changed my life. As someone with no technical background, I was able to learn web development from scratch and land a job within two months of completing the program.'
      },
      {
        id: 2,
        name: 'Leila Kaddour',
        role: 'Freelance Web Developer',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        text: 'The course content is incredibly well-structured and the instructors are amazing. The hands-on projects really helped me build a solid portfolio that I now use to attract clients.'
      }
    ],
    faqs: [
      {
        question: 'Do I need any prior programming experience for this course?',
        answer: 'No, this bootcamp is designed for beginners. We start with the fundamentals and gradually build up to more advanced concepts. However, having basic computer skills is necessary.'
      },
      {
        question: 'How much time should I dedicate to this course?',
        answer: 'You should expect to spend at least 20 hours per week on the course, including lectures, assignments, and projects. The more time you invest in practice, the better your results will be.'
      },
      {
        question: 'Will I get a certificate upon completion?',
        answer: 'Yes, you will receive a certificate of completion after successfully finishing all course modules and the final project. This certificate is recognized by our industry partners.'
      },
      {
        question: 'Is there job placement assistance?',
        answer: 'We offer career coaching, resume reviews, and connect you with our hiring partners. While we don\'t guarantee job placement, our graduates have a high success rate in finding employment within 3 months.'
      }
    ]
  },
  {
    id: 2,
    title: 'Digital Marketing Masterclass',
    slug: 'digital-marketing-masterclass',
    subtitle: 'Learn to plan and execute effective digital marketing campaigns',
    level: 'intermediate',
    category: 'marketing',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    price: {
      regular: 399,
      discount: 349,
      currency: '$'
    }
  },
  {
    id: 3,
    title: 'Artificial Intelligence & Machine Learning',
    slug: 'artificial-intelligence-machine-learning',
    subtitle: 'Master AI concepts and implementation with Python',
    level: 'advanced',
    category: 'ai',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    price: {
      regular: 699,
      discount: 599,
      currency: '$'
    }
  }
];

export default function CourseDetailsPage({ 
  params 
}: { 
  params: Promise<{ slug: string, lang: string }> 
}) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug as string;
  const lang = resolvedParams.lang as string;
  
  // Find the requested course
  const course = coursesData.find(c => c.slug === slug);
  
  // If no course is found, show 404
  if (!course) {
    notFound();
  }
  
  // Get translations for the current language
  const t = translations[lang as keyof typeof translations] || translations.fr;
  
  // State for opening/closing FAQ items
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // State for opening/closing curriculum sections
  const [openCurriculumSections, setOpenCurriculumSections] = useState<number[]>([0]); // Start with first section open
  
  // Toggle FAQ open/close
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  
  // Toggle curriculum section open/close
  const toggleCurriculumSection = (index: number) => {
    setOpenCurriculumSections(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };
  
  // Calculate total hours of the course
  const calculateTotalHours = () => {
    if (!course || !course.curriculum) return 0;
    return course.curriculum.reduce((total, section) => 
      total + section.modules.reduce((sectionTotal, module) => sectionTotal + module.duration, 0), 0
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white py-20">
          <div className="absolute inset-0 opacity-30">
            <img 
              src={course.coverImage} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-900/70"></div>
          
          <div className="relative container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/3">
                <Link 
                  href={`/${lang}/courses`}
                  className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-6"
                >
                  <FiChevronLeft className="mr-1" />
                  Back to Courses
                </Link>
                
                <span className="inline-block px-3 py-1 bg-purple-500 rounded-full text-sm font-medium mb-4">
                  {course.category}
                </span>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl text-gray-200 mb-8">{course.subtitle}</p>
                
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center">
                    <FiClock className="mr-2" />
                    <span>{course.duration} weeks</span>
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="mr-2" />
                    <span>{course.enrolledStudents}+ students enrolled</span>
                  </div>
                  <div className="flex items-center">
                    <FiBook className="mr-2" />
                    <span>{calculateTotalHours()} hours</span>
                  </div>
                  <div className="flex items-center">
                    <FiAward className="mr-2" />
                    <span>{course.level}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors">
                    Enroll Now
                  </button>
                  <button className="px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors">
                    Download Syllabus
                  </button>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden">
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-purple-600">{course.price.currency}{course.price.discount}</span>
                      {course.price.regular !== course.price.discount && (
                        <span className="ml-2 text-gray-500 line-through">{course.price.currency}{course.price.regular}</span>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Full course access</span>
                      </li>
                      <li className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Certificate of completion</span>
                      </li>
                      <li className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Real-world projects included</span>
                      </li>
                      <li className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Lifetime access to materials</span>
                      </li>
                    </ul>
                    
                    <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors">
                      Enroll Now
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 px-6 py-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Start Date</span>
                      <span>{course.startDate ? new Date(course.startDate).toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'ar' ? 'ar-EG' : 'en-US') : 'TBA'}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 px-6 py-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Language</span>
                      <span>{course.language}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Enrollment Deadline</p>
                      <p className="font-medium">{course.enrollmentDeadline ? new Date(course.enrollmentDeadline).toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'ar' ? 'ar-EG' : 'en-US') : 'TBA'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Course Description */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Course Overview</h2>
                <div className="prose prose-lg max-w-none">
                  {course.description && course.description.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
              
              {/* What You'll Learn */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.outcomes && course.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start">
                      <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Course Curriculum */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Course Curriculum</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
                  {course.curriculum && course.curriculum.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="bg-white">
                      <button
                        onClick={() => toggleCurriculumSection(sectionIndex)}
                        className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="font-medium text-lg">{section.title}</span>
                          <span className="ml-4 text-sm text-gray-500">
                            {section.modules.length} modules • 
                            {section.modules.reduce((total, module) => total + module.duration, 0)} hours
                          </span>
                        </div>
                        {openCurriculumSections.includes(sectionIndex) ? (
                          <FiChevronUp className="text-gray-500" />
                        ) : (
                          <FiChevronDown className="text-gray-500" />
                        )}
                      </button>
                      
                      {openCurriculumSections.includes(sectionIndex) && (
                        <div className="px-4 pb-4">
                          <ul className="divide-y divide-gray-100">
                            {section.modules.map((module, moduleIndex) => (
                              <li key={moduleIndex} className="py-3 flex justify-between items-center">
                                <div className="flex items-center">
                                  <FiList className="text-gray-400 mr-3" />
                                  <span>{module.title}</span>
                                </div>
                                <span className="text-sm text-gray-500">{module.duration} hours</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Requirements */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {course.requirements && course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              {/* Instructors */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Your Instructors</h2>
                <div className="space-y-8">
                  {course.instructors && course.instructors.map((instructor) => (
                    <div key={instructor.id} className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex flex-col md:flex-row gap-6">
                        <img 
                          src={instructor.image} 
                          alt={instructor.name} 
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-bold mb-1">{instructor.name}</h3>
                          <p className="text-purple-600 mb-3">{instructor.title}</p>
                          <p className="text-gray-600 mb-4">{instructor.bio}</p>
                          <div className="flex flex-wrap gap-2">
                            {instructor.specialties.map((specialty, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* FAQs */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {course.faqs && course.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-left">{faq.question}</span>
                        {openFaqIndex === index ? (
                          <FiChevronUp className="text-gray-500 flex-shrink-0" />
                        ) : (
                          <FiChevronDown className="text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {openFaqIndex === index && (
                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Schedule */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Course Schedule</h3>
                <ul className="space-y-3">
                  {course.schedule && course.schedule.map((item, index) => (
                    <li key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="font-medium">{item.day}</span>
                      <span>{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Testimonials */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Student Testimonials</h3>
                <div className="space-y-6">
                  {course.testimonials && course.testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Share */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Share This Course</h3>
                <div className="flex space-x-4">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(course.title)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a 
                    href={`mailto:?subject=${encodeURIComponent(course.title)}&body=${encodeURIComponent(`Check out this course: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join this course today and take the first step towards your new career.
            </p>
            <button className="inline-block px-8 py-4 bg-white text-purple-700 rounded-md font-medium hover:bg-gray-100 transition-colors text-lg">
              Enroll Now
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 