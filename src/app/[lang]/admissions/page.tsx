'use client';

import React, { useState } from 'react';
import { translations } from '@/translations';
import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import { 
  FiCalendar, 
  FiCheckCircle, 
  FiFileText, 
  FiDollarSign, 
  FiUsers, 
  FiHelpCircle, 
  FiArrowRight,
  FiDownload,
  FiClock,
  FiCreditCard,
  FiBook,
  FiMessageSquare
} from 'react-icons/fi';

// Sample upcoming dates
const upcomingDates = [
  { id: 1, event: 'Fall Term Application Deadline', date: '2024-08-15' },
  { id: 2, event: 'Fall Term Classes Begin', date: '2024-09-05' },
  { id: 3, event: 'Winter Term Application Deadline', date: '2024-12-10' },
  { id: 4, event: 'Winter Term Classes Begin', date: '2025-01-12' }
];

// Admission process steps
const admissionSteps = [
  {
    id: 1,
    title: 'Choose Your Program',
    description: 'Browse through our diverse range of professional training programs to find the one that aligns with your career goals.',
    icon: <FiBook className="w-6 h-6" />,
    action: {
      text: 'Explore Programs',
      link: '/courses'
    }
  },
  {
    id: 2,
    title: 'Submit Application',
    description: 'Complete the online application form with your personal information, educational background, and program preferences.',
    icon: <FiFileText className="w-6 h-6" />,
    action: {
      text: 'Apply Online',
      link: '/apply'
    }
  },
  {
    id: 3,
    title: 'Document Submission',
    description: 'Upload required documents including identification, previous diplomas, and any other program-specific requirements.',
    icon: <FiDownload className="w-6 h-6" />,
    action: {
      text: 'Document Checklist',
      link: '/documents'
    }
  },
  {
    id: 4,
    title: 'Application Review',
    description: 'Our admissions team will review your application and documents. This process typically takes 5-7 business days.',
    icon: <FiClock className="w-6 h-6" />,
    action: null
  },
  {
    id: 5,
    title: 'Admission Decision',
    description: 'You will receive a decision via email. If accepted, your admission letter will include next steps for enrollment.',
    icon: <FiCheckCircle className="w-6 h-6" />,
    action: null
  },
  {
    id: 6,
    title: 'Tuition Payment',
    description: 'Secure your spot by paying the tuition deposit. Various payment options and financial aid are available.',
    icon: <FiCreditCard className="w-6 h-6" />,
    action: {
      text: 'Payment Options',
      link: '/tuition'
    }
  },
  {
    id: 7,
    title: 'Orientation',
    description: 'Attend the orientation session to meet your instructors, tour the facilities, and get ready for your program.',
    icon: <FiUsers className="w-6 h-6" />,
    action: null
  }
];

// FAQ section
const admissionsFAQs = [
  {
    question: 'What are the general admission requirements?',
    answer: 'General requirements include being at least 18 years old, having a high school diploma or equivalent, and specific requirements based on your chosen program. Some programs may require previous experience or specific academic background.'
  },
  {
    question: 'Can I apply for more than one program?',
    answer: 'Yes, you can apply to multiple programs. However, you will need to submit separate applications for each program and pay the application fee for each.'
  },
  {
    question: 'Is there an application fee?',
    answer: 'Yes, there is a non-refundable application fee of 50€. This fee covers the administrative costs of processing your application.'
  },
  {
    question: 'How can I check my application status?',
    answer: 'Once you submit your application, you will receive a confirmation email with login credentials to our applicant portal where you can track your application status.'
  },
  {
    question: 'Are there any scholarships or financial aid options?',
    answer: 'Yes, we offer merit-based scholarships and need-based financial aid. After being accepted to a program, you can apply for financial assistance through our student services office.'
  }
];

// Tuition info
const tuitionInfo = [
  {
    category: 'Short Courses',
    priceRange: '500€ - 1,200€',
    duration: '1-2 months',
    description: 'Focused training in specific skills and tools'
  },
  {
    category: 'Certificate Programs',
    priceRange: '1,500€ - 3,000€',
    duration: '3-6 months',
    description: 'Comprehensive training in professional domains'
  },
  {
    category: 'Diploma Programs',
    priceRange: '3,500€ - 6,000€',
    duration: '9-12 months',
    description: 'In-depth professional education with practicum'
  }
];

export default function AdmissionsPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang as keyof typeof translations;
  const t = translations[lang] || translations.fr;
  
  // Safely access nested properties
  const common = t.common || {};
  
  // State for FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Toggle FAQ open/close
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderWrapper />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Admissions & Registration</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Begin your journey at MIRA ACADEMY with a simple application process. We're here to guide you every step of the way.
            </p>
            <div className="mt-8">
              <a 
                href={`/${resolvedParams.lang}/apply`} 
                className="inline-block px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors mx-2"
              >
                Apply Now
              </a>
              <a 
                href="#admission-process" 
                className="inline-block px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-blue-700 transition-colors mx-2"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        
        {/* Key Dates Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Important Upcoming Dates</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {upcomingDates.map(item => (
                  <div key={item.id} className="bg-blue-50 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center mb-2">
                      <FiCalendar className="text-blue-600 mr-2" />
                      <span className="font-medium text-blue-600">{item.date}</span>
                    </div>
                    <p className="text-gray-800">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Admission Process Section */}
        <div id="admission-process" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Admission Process</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                Our straightforward admission process is designed to help you smoothly transition into your chosen program.
              </p>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
                
                {/* Steps */}
                <div className="space-y-12">
                  {admissionSteps.map((step, index) => (
                    <div key={step.id} className={`flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                      <div className="md:w-1/2 p-4 flex md:justify-end">
                        <div className={`md:max-w-sm bg-white p-6 rounded-lg shadow-md ${index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'} relative`}>
                          {/* Number Badge */}
                          <div className="absolute top-4 -left-4 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            {step.id}
                          </div>
                          
                          <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                              {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{step.description}</p>
                          
                          {step.action && (
                            <a 
                              href={`/${resolvedParams.lang}${step.action.link}`} 
                              className="inline-flex items-center text-blue-600 hover:text-blue-800"
                            >
                              {step.action.text}
                              <FiArrowRight className="ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Timeline Center Point (visible only on md+) */}
                      <div className="hidden md:flex justify-center items-center absolute left-1/2 transform -translate-x-1/2" style={{ top: `${(index * 12) + 6}rem` }}>
                        <div className="w-5 h-5 rounded-full bg-blue-600 border-4 border-blue-100"></div>
                      </div>
                      
                      <div className="md:w-1/2 p-4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tuition & Fees Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Tuition & Fees</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                MIRA ACADEMY offers competitive tuition rates with flexible payment options to make quality education accessible.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tuitionInfo.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                    <div className="p-1 bg-blue-600">
                      <h3 className="text-center text-white font-bold py-2">{item.category}</h3>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                        <span className="text-gray-600">Cost Range:</span>
                        <span className="font-bold text-gray-800">{item.priceRange}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-800">{item.duration}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-blue-50 rounded-lg p-6">
                <div className="flex items-start">
                  <FiDollarSign className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Payment Options</h4>
                    <p className="text-gray-600 mb-2">
                      We offer several payment options including:
                    </p>
                    <ul className="text-gray-600 space-y-1 mb-4">
                      <li>• Full payment with early registration discount</li>
                      <li>• Monthly installment plans</li>
                      <li>• Employer-sponsored payment options</li>
                      <li>• Scholarships and financial aid for eligible students</li>
                    </ul>
                    <a 
                      href={`/${resolvedParams.lang}/financial-aid`} 
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                    >
                      Learn about financial aid options
                      <FiArrowRight className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Application Requirements */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Application Requirements</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                Make sure you have the following documents ready before starting your application.
              </p>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                      <FiFileText className="mr-2 text-blue-600" />
                      General Requirements
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Valid government-issued ID or passport</span>
                      </li>
                      <li className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>High school diploma or equivalent</span>
                      </li>
                      <li className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Current resume/CV detailing work experience</span>
                      </li>
                      <li className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Personal statement (250-500 words)</span>
                      </li>
                      <li className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Application fee payment</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                      <FiFileText className="mr-2 text-blue-600" />
                      Program-Specific Requirements
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Previous academic transcripts (for advanced programs)</span>
                      </li>
                      <li className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Portfolio of work (for design programs)</span>
                      </li>
                      <li className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Programming assessment (for technical programs)</span>
                      </li>
                      <li className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Language proficiency test results (if applicable)</span>
                      </li>
                      <li className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Letters of recommendation (optional)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 mb-4">
                    All documents must be submitted in French or English. Translations must be certified. Original documents may be requested for verification during the enrollment process.
                  </p>
                  <a 
                    href={`/${resolvedParams.lang}/document-guidelines`} 
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  >
                    View document submission guidelines
                    <FiArrowRight className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-center mb-12">
                Find answers to common questions about our admissions process.
              </p>
              
              <div className="space-y-4">
                {admissionsFAQs.map((faq, index) => (
                  <div 
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="font-medium text-gray-800">{faq.question}</span>
                      <span className="ml-4">
                        {openFaqIndex === index ? (
                          <FiCheckCircle className="text-blue-600" />
                        ) : (
                          <FiHelpCircle className="text-gray-400" />
                        )}
                      </span>
                    </button>
                    
                    {openFaqIndex === index && (
                      <div className="p-5 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Don't see your question answered here?
                </p>
                <a 
                  href={`/${resolvedParams.lang}/contact?department=admissions`} 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FiMessageSquare className="mr-2" />
                  <span>Contact Admissions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Apply Now CTA */}
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Start your application today and take the first step toward your professional growth with MIRA ACADEMY.
            </p>
            <a 
              href={`/${resolvedParams.lang}/apply`} 
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-md font-bold hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      </main>
      
      <FooterWrapper />
    </div>
  );
} 