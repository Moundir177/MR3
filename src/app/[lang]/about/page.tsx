'use client';

import React from 'react';
import { translations } from '@/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiAward, FiTrendingUp, FiCheck, FiUsers } from 'react-icons/fi';

// Sample team data
const teamMembers = [
  {
    name: 'Mohammed Alami',
    role: 'Director',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3',
    bio: 'Over 15 years of experience in professional training.'
  },
  {
    name: 'Amina Benali',
    role: 'Academic Manager',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3',
    bio: 'Specialist in developing innovative educational programs.'
  },
  {
    name: 'Younes Chakir',
    role: 'Chief Technical Trainer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3',
    bio: 'Expert in web technologies and software development.'
  },
  {
    name: 'Nadia Moussaoui',
    role: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3',
    bio: 'Experienced in digital marketing strategies and student recruitment.'
  }
];

// History milestones
const historyMilestones = [
  {
    year: '2015',
    title: 'Foundation',
    description: 'Creation of MIRA ACADEMY with 3 initial training courses.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3'
  },
  {
    year: '2018',
    title: 'Expansion',
    description: 'Opening of our second campus and introduction of 10 new courses.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3'
  },
  {
    year: '2020',
    title: 'Innovation',
    description: 'Launch of our online learning platform.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3'
  },
  {
    year: '2023',
    title: 'Excellence',
    description: 'Recognition as one of the best training centers in Algeria.',
    image: 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?ixlib=rb-4.0.3'
  }
];

export default function AboutPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang as keyof typeof translations;
  const t = translations[lang] || translations.fr;
  
  // Safely access nested properties
  const about = t.about || {};
  const stats = t.stats || {};
  const cta = t.cta || {};
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">{typeof about.title === 'string' ? about.title : 'About MIRA ACADEMY'}</h1>
            <p className="text-xl max-w-2xl mx-auto">{typeof about.subtitle === 'string' ? about.subtitle : 'Your partner for professional training excellence'}</p>
          </div>
        </div>
        
        {/* Mission and Vision Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-6 text-blue-600">
                {typeof about.mission?.title === 'string' ? about.mission.title : 'Our Mission'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {typeof about.mission?.description === 'string' ? about.mission.description : 'To provide quality professional training that meets the needs of the local and international job market.'}
              </p>
              <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-6 text-green-600">
                {typeof about.vision?.title === 'string' ? about.vision.title : 'Our Vision'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {typeof about.vision?.description === 'string' ? about.vision.description : 'To become a leader in professional training in Algeria and contribute to the development of local skills.'}
              </p>
              <div className="w-20 h-1 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {typeof about.values?.title === 'string' ? about.values.title : 'Our Values'}
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <FiAward className="text-blue-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {typeof about.values?.excellence === 'string' ? about.values.excellence : 'Excellence'}
                </h3>
                <p className="text-gray-600">
                  {typeof about.values?.excellenceDesc === 'string' ? about.values.excellenceDesc : 'We aim for excellence in all our training programs.'}
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <FiTrendingUp className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {typeof about.values?.innovation === 'string' ? about.values.innovation : 'Innovation'}
                </h3>
                <p className="text-gray-600">
                  {typeof about.values?.innovationDesc === 'string' ? about.values.innovationDesc : 'We adopt the latest methodologies and technologies.'}
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <FiCheck className="text-blue-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {typeof about.values?.integrity === 'string' ? about.values.integrity : 'Integrity'}
                </h3>
                <p className="text-gray-600">
                  {typeof about.values?.integrityDesc === 'string' ? about.values.integrityDesc : 'We act with honesty and transparency in all our interactions.'}
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <FiUsers className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {typeof about.values?.community === 'string' ? about.values.community : 'Community'}
                </h3>
                <p className="text-gray-600">
                  {typeof about.values?.communityDesc === 'string' ? about.values.communityDesc : 'We believe in the power of community and knowledge sharing.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {typeof about.team?.title === 'string' ? about.team.title : 'Our Team'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {typeof about.team?.subtitle === 'string' ? about.team.subtitle : 'Professionals dedicated to your success'}
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* History Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {typeof about.history?.title === 'string' ? about.history.title : 'Our History'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {typeof about.history?.description === 'string' ? about.history.description : 'Founded in 2015, MIRA ACADEMY has grown to become one of the leading professional training academies in Algeria.'}
              </p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="space-y-20">
              {historyMilestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                  <div className="md:w-1/2">
                    <div className="relative">
                      <img 
                        src={milestone.image} 
                        alt={milestone.title} 
                        className="rounded-lg shadow-md w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white py-1 px-3 rounded-full font-bold">
                        {milestone.year}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">
                  {typeof stats.students === 'string' ? stats.students : '5000+'}
                </div>
                <div className="uppercase tracking-wider text-blue-100">
                  {typeof stats.studentsLabel === 'string' ? stats.studentsLabel : 'Students trained'}
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {typeof stats.courses === 'string' ? stats.courses : '50+'}
                </div>
                <div className="uppercase tracking-wider text-blue-100">
                  {typeof stats.coursesLabel === 'string' ? stats.coursesLabel : 'Courses available'}
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {typeof stats.success === 'string' ? stats.success : '95%'}
                </div>
                <div className="uppercase tracking-wider text-blue-100">
                  {typeof stats.successLabel === 'string' ? stats.successLabel : 'Satisfaction rate'}
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {typeof stats.partners === 'string' ? stats.partners : '100+'}
                </div>
                <div className="uppercase tracking-wider text-blue-100">
                  {typeof stats.partnersLabel === 'string' ? stats.partnersLabel : 'Partner companies'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {typeof cta.title === 'string' ? cta.title : 'Ready to develop your skills?'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {typeof cta.subtitle === 'string' ? cta.subtitle : 'Join MIRA ACADEMY today and start your journey to professional excellence.'}
          </p>
          <a 
            href={`/${lang}/contact`} 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            {typeof cta.button === 'string' ? cta.button : 'Register Now'}
          </a>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 