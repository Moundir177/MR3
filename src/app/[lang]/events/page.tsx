'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiClock, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { translations } from '@/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

// Sample events data - this would typically come from a database or API
const eventsData = [
  {
    id: '1',
    slug: 'event-1',
    title: {
      fr: 'Journée Portes Ouvertes',
      ar: 'يوم الأبواب المفتوحة',
      en: 'Open House Day'
    },
    description: {
      fr: 'Découvrez nos formations et rencontrez nos formateurs. Une journée complète dédiée à la découverte de notre académie et de nos programmes.',
      ar: 'اكتشف دوراتنا التدريبية وقابل مدربينا. يوم كامل مخصص لاكتشاف أكاديميتنا وبرامجنا.',
      en: 'Discover our courses and meet our trainers. A full day dedicated to discovering our academy and our programs.'
    },
    date: {
      fr: '15 Juin 2024',
      ar: '15 يونيو 2024',
      en: 'June 15, 2024'
    },
    time: {
      fr: '10:00 - 17:00',
      ar: '10:00 - 17:00',
      en: '10:00 AM - 5:00 PM'
    },
    location: {
      fr: 'Campus Principal',
      ar: 'الحرم الرئيسي',
      en: 'Main Campus'
    },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3',
    category: {
      fr: 'Portes Ouvertes',
      ar: 'الأبواب المفتوحة',
      en: 'Open House'
    }
  },
  {
    id: '2',
    slug: 'event-2',
    title: {
      fr: 'Conférence sur l\'IA',
      ar: 'مؤتمر حول الذكاء الاصطناعي',
      en: 'AI Conference'
    },
    description: {
      fr: 'Rejoignez-nous pour une conférence passionnante sur les dernières tendances et avancées en Intelligence Artificielle et Machine Learning.',
      ar: 'انضم إلينا لحضور مؤتمر مثير حول أحدث الاتجاهات والتطورات في الذكاء الاصطناعي وتعلم الآلة.',
      en: 'Join us for an exciting conference on the latest trends and advances in Artificial Intelligence and Machine Learning.'
    },
    date: {
      fr: '20 Juin 2024',
      ar: '20 يونيو 2024',
      en: 'June 20, 2024'
    },
    time: {
      fr: '14:00 - 18:00',
      ar: '14:00 - 18:00',
      en: '2:00 PM - 6:00 PM'
    },
    location: {
      fr: 'Auditorium',
      ar: 'قاعة المحاضرات',
      en: 'Auditorium'
    },
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3',
    category: {
      fr: 'Conférence',
      ar: 'مؤتمر',
      en: 'Conference'
    }
  },
  {
    id: '3',
    slug: 'event-3',
    title: {
      fr: 'Atelier Marketing Digital',
      ar: 'ورشة عمل التسويق الرقمي',
      en: 'Digital Marketing Workshop'
    },
    description: {
      fr: 'Apprenez les stratégies de marketing digital efficaces. Une journée pour maîtriser les outils et techniques essentiels.',
      ar: 'تعلم استراتيجيات التسويق الرقمي الفعالة. يوم واحد لإتقان الأدوات والتقنيات الأساسية.',
      en: 'Learn effective digital marketing strategies. A day to master essential tools and techniques.'
    },
    date: {
      fr: '25 Juin 2024',
      ar: '25 يونيو 2024',
      en: 'June 25, 2024'
    },
    time: {
      fr: '09:00 - 16:00',
      ar: '09:00 - 16:00',
      en: '9:00 AM - 4:00 PM'
    },
    location: {
      fr: 'Salle de Formation',
      ar: 'قاعة التدريب',
      en: 'Training Room'
    },
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3',
    category: {
      fr: 'Atelier',
      ar: 'ورشة عمل',
      en: 'Workshop'
    }
  }
];

export default function EventsPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang;
  
  // Get translations for the current language
  const t = translations[lang as keyof typeof translations] || translations.fr;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <PageHeader 
          title={t.events?.title || "Événements"} 
          subtitle={t.events?.subtitle || "Participez à nos événements et développez votre réseau professionnel"} 
          backgroundClass="bg-secondary"
          breadcrumbs={[{ name: t.events?.title || "Événements", href: "/events" }]}
          lang={lang}
        />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventsData.map((event) => (
                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  {/* Event Image */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.image}
                      alt={event.title[lang as keyof typeof event.title]}
                      fill
                      className="object-cover"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-secondary/90 text-white text-xs font-medium px-2.5 py-1 rounded">
                        {event.category[lang as keyof typeof event.category]}
                      </span>
                    </div>
                  </div>
                  
                  {/* Event Content */}
                  <div className="p-5">
                    <Link href={`/${lang}/events/${event.slug}`}>
                      <h3 className="font-bold text-xl mb-3 hover:text-secondary transition-colors">
                        {event.title[lang as keyof typeof event.title]}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {event.description[lang as keyof typeof event.description]}
                    </p>
                    
                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <FiCalendar className="mr-2 text-secondary" />
                        {event.date[lang as keyof typeof event.date]}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <FiClock className="mr-2 text-secondary" />
                        {event.time[lang as keyof typeof event.time]}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <FiMapPin className="mr-2 text-secondary" />
                        {event.location[lang as keyof typeof event.location]}
                      </div>
                    </div>
                    
                    <Link 
                      href={`/${lang}/events/${event.slug}`} 
                      className="inline-flex items-center text-secondary hover:text-secondary-dark font-medium text-sm"
                    >
                      {t.common?.details || "Détails"}
                      <FiArrowRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Vous avez une question sur nos événements ?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  N'hésitez pas à nous contacter pour plus d'informations sur nos événements ou pour vous inscrire.
                </p>
                <Link 
                  href={`/${lang}/contact`} 
                  className="btn btn-secondary"
                >
                  {t.common?.contact || "Contactez-nous"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 