import React from 'react';
import { translations } from '@/translations';
import CourseDetailsClient from './CourseDetailsClient';

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

export default function CourseDetailsPage({ params }: { params: { slug: string, lang: string } }) {
  const { slug, lang } = params;
  
  // Find the requested course
  const course = coursesData.find(c => c.slug === slug);
  
  // Get translations for the current language
  const t = translations[lang as keyof typeof translations] || translations.fr;
  
  return <CourseDetailsClient course={course} lang={lang} t={t} />;
}

export function generateStaticParams() {
  const locales = ['fr', 'en', 'ar'];
  const slugs = coursesData.map(course => course.slug);
  
  const params: { lang: string; slug: string }[] = [];
  locales.forEach(locale => {
    slugs.forEach(slug => {
      params.push({ lang: locale, slug });
    });
  });
  
  return params;
}
