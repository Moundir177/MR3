'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { translations } from '@/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiTag, FiShare2, FiDownload } from 'react-icons/fi';

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
    fullDescription: {
      fr: 'La Journée Portes Ouvertes de MIRA ACADEMY est l\'occasion idéale pour découvrir notre campus, rencontrer nos formateurs et en apprendre davantage sur nos programmes de formation professionnelle. Vous pourrez participer à des ateliers d\'introduction, assister à des démonstrations pratiques et poser toutes vos questions sur nos différentes filières. Notre équipe sera disponible pour vous conseiller sur les parcours adaptés à vos objectifs professionnels et vous présenter les différentes options de financement disponibles.',
      ar: 'يعد يوم الأبواب المفتوحة في أكاديمية ميرا فرصة مثالية لاكتشاف حرمنا الجامعي ومقابلة مدربينا ومعرفة المزيد عن برامج التدريب المهني لدينا. ستتمكن من المشاركة في ورش عمل تمهيدية، وحضور عروض توضيحية عملية، وطرح جميع أسئلتك حول مختلف المجالات لدينا. سيكون فريقنا متاحًا لتقديم المشورة لك بشأن المسارات المناسبة لأهدافك المهنية وتقديم خيارات التمويل المختلفة المتاحة.',
      en: 'MIRA ACADEMY\'s Open House Day is the perfect opportunity to discover our campus, meet our trainers and learn more about our professional training programs. You will be able to participate in introductory workshops, attend practical demonstrations and ask all your questions about our different fields. Our team will be available to advise you on the paths adapted to your professional objectives and present the different financing options available.'
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
    address: {
      fr: '123 Boulevard Mohammed V, Alger',
      ar: '123 شارع محمد الخامس، الجزائر',
      en: '123 Mohammed V Boulevard, Algiers'
    },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3',
    coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3',
    category: {
      fr: 'Portes Ouvertes',
      ar: 'الأبواب المفتوحة',
      en: 'Open House'
    },
    featured: true,
    organizer: {
      fr: 'MIRA ACADEMY',
      ar: 'أكاديمية ميرا',
      en: 'MIRA ACADEMY'
    },
    capacity: {
      fr: 'Places limitées à 100 participants',
      ar: 'الأماكن محدودة لـ 100 مشارك',
      en: 'Limited to 100 participants'
    },
    registration: {
      fr: 'Inscription gratuite mais obligatoire',
      ar: 'التسجيل مجاني ولكنه إلزامي',
      en: 'Free registration required'
    },
    schedule: [
      {
        time: {
          fr: '10:00 - 11:00',
          ar: '10:00 - 11:00',
          en: '10:00 - 11:00 AM'
        },
        title: {
          fr: 'Accueil et présentation de l\'académie',
          ar: 'الترحيب وتقديم الأكاديمية',
          en: 'Welcome and academy presentation'
        }
      },
      {
        time: {
          fr: '11:00 - 12:30',
          ar: '11:00 - 12:30',
          en: '11:00 AM - 12:30 PM'
        },
        title: {
          fr: 'Visite du campus et des installations',
          ar: 'جولة في الحرم الجامعي والمرافق',
          en: 'Campus and facilities tour'
        }
      },
      {
        time: {
          fr: '12:30 - 14:00',
          ar: '12:30 - 14:00',
          en: '12:30 - 2:00 PM'
        },
        title: {
          fr: 'Pause déjeuner',
          ar: 'استراحة الغداء',
          en: 'Lunch break'
        }
      },
      {
        time: {
          fr: '14:00 - 15:30',
          ar: '14:00 - 15:30',
          en: '2:00 - 3:30 PM'
        },
        title: {
          fr: 'Ateliers et démonstrations',
          ar: 'ورش العمل والعروض التوضيحية',
          en: 'Workshops and demonstrations'
        }
      },
      {
        time: {
          fr: '15:30 - 17:00',
          ar: '15:30 - 17:00',
          en: '3:30 - 5:00 PM'
        },
        title: {
          fr: 'Sessions de questions-réponses et inscriptions',
          ar: 'جلسات الأسئلة والأجوبة والتسجيل',
          en: 'Q&A sessions and registrations'
        }
      }
    ]
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
    fullDescription: {
      fr: 'Notre conférence sur l\'Intelligence Artificielle réunira des experts du domaine qui partageront leurs connaissances sur les dernières innovations et applications de l\'IA. Les participants découvriront comment l\'apprentissage automatique transforme les industries et quelles sont les compétences nécessaires pour réussir dans ce secteur en pleine expansion. Cette conférence est idéale pour les professionnels de la technologie, les étudiants et toute personne intéressée par les opportunités offertes par l\'IA.',
      ar: 'سيجمع مؤتمرنا حول الذكاء الاصطناعي خبراء في هذا المجال الذين سيشاركون معارفهم حول أحدث الابتكارات وتطبيقات الذكاء الاصطناعي. سيكتشف المشاركون كيف يحول التعلم الآلي الصناعات وما هي المهارات اللازمة للنجاح في هذا القطاع المتنامي. هذا المؤتمر مثالي للمحترفين في مجال التكنولوجيا والطلاب وأي شخص مهتم بالفرص التي يقدمها الذكاء الاصطناعي.',
      en: 'Our Artificial Intelligence conference will bring together experts in the field who will share their knowledge on the latest innovations and applications of AI. Participants will discover how machine learning is transforming industries and what skills are needed to succeed in this growing sector. This conference is ideal for technology professionals, students and anyone interested in the opportunities offered by AI.'
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
    address: {
      fr: '123 Boulevard Mohammed V, Alger',
      ar: '123 شارع محمد الخامس، الجزائر',
      en: '123 Mohammed V Boulevard, Algiers'
    },
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3',
    coverImage: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3',
    category: {
      fr: 'Conférence',
      ar: 'مؤتمر',
      en: 'Conference'
    },
    featured: true,
    organizer: {
      fr: 'MIRA ACADEMY',
      ar: 'أكاديمية ميرا',
      en: 'MIRA ACADEMY'
    },
    capacity: {
      fr: 'Places limitées à 150 participants',
      ar: 'الأماكن محدودة لـ 150 مشارك',
      en: 'Limited to 150 participants'
    },
    registration: {
      fr: 'Inscription obligatoire - 1500 DA',
      ar: 'التسجيل إلزامي - 1500 دج',
      en: 'Registration required - 1500 DA'
    },
    speakers: [
      {
        name: 'Dr. Ahmed Benali',
        position: {
          fr: 'Chercheur en IA',
          ar: 'باحث في الذكاء الاصطناعي',
          en: 'AI Researcher'
        },
        image: 'https://images.unsplash.com/photo-1601582589907-f92af5ed9db8?ixlib=rb-4.0.3'
      },
      {
        name: 'Leila Mahmoudi',
        position: {
          fr: 'Experte en Machine Learning',
          ar: 'خبيرة في تعلم الآلة',
          en: 'Machine Learning Expert'
        },
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3'
      },
      {
        name: 'Mohammed Khaldi',
        position: {
          fr: 'Ingénieur Data Science',
          ar: 'مهندس علوم البيانات',
          en: 'Data Science Engineer'
        },
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3'
      }
    ],
    schedule: [
      {
        time: {
          fr: '14:00 - 14:30',
          ar: '14:00 - 14:30',
          en: '2:00 - 2:30 PM'
        },
        title: {
          fr: 'Accueil et introduction',
          ar: 'الترحيب والمقدمة',
          en: 'Welcome and introduction'
        }
      },
      {
        time: {
          fr: '14:30 - 15:30',
          ar: '14:30 - 15:30',
          en: '2:30 - 3:30 PM'
        },
        title: {
          fr: 'Les dernières avancées en IA',
          ar: 'أحدث التطورات في الذكاء الاصطناعي',
          en: 'Latest advances in AI'
        }
      },
      {
        time: {
          fr: '15:30 - 16:00',
          ar: '15:30 - 16:00',
          en: '3:30 - 4:00 PM'
        },
        title: {
          fr: 'Pause café',
          ar: 'استراحة قهوة',
          en: 'Coffee break'
        }
      },
      {
        time: {
          fr: '16:00 - 17:00',
          ar: '16:00 - 17:00',
          en: '4:00 - 5:00 PM'
        },
        title: {
          fr: 'Applications pratiques de l\'IA',
          ar: 'التطبيقات العملية للذكاء الاصطناعي',
          en: 'Practical applications of AI'
        }
      },
      {
        time: {
          fr: '17:00 - 18:00',
          ar: '17:00 - 18:00',
          en: '5:00 - 6:00 PM'
        },
        title: {
          fr: 'Table ronde et questions-réponses',
          ar: 'نقاش مفتوح وأسئلة وأجوبة',
          en: 'Panel discussion and Q&A'
        }
      }
    ]
  },
  // More event details would be added here
];

export default function EventDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string, lang: string }> 
}) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang;
  const slug = resolvedParams.slug;
  
  const t = translations[lang as keyof typeof translations] || translations.fr;
  
  // Create a safe accessor for eventDetail properties with TypeScript type assertion
  const eventDetail = (t as any).eventDetail || {};
  
  // Find the event with the matching slug
  const event = eventsData.find(e => e.slug === slug);
  
  // If no event is found, show a 404 page
  if (!event) {
    notFound();
  }
  
  // Function to format dates based on language
  const formatDate = (dateString: string) => {
    return dateString; // In a real app, you'd format this based on locale
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with Cover Image */}
        <div className="relative h-80 lg:h-96">
          <Image 
            src={event.coverImage || event.image} 
            alt={event.title[lang as keyof typeof event.title]} 
            className="object-cover object-center"
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-900/40 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl">
                <span className="inline-flex items-center bg-purple-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {event.category[lang as keyof typeof event.category]}
                </span>
                <h1 className="text-4xl font-bold text-white mb-4">
                  {event.title[lang as keyof typeof event.title]}
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  {event.description[lang as keyof typeof event.description]}
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center text-white text-sm px-3 py-1 rounded-full bg-white/20">
                    <FiCalendar className="mr-2" />
                    {event.date[lang as keyof typeof event.date]}
                  </span>
                  <span className="inline-flex items-center text-white text-sm px-3 py-1 rounded-full bg-white/20">
                    <FiClock className="mr-2" />
                    {event.time[lang as keyof typeof event.time]}
                  </span>
                  <span className="inline-flex items-center text-white text-sm px-3 py-1 rounded-full bg-white/20">
                    <FiMapPin className="mr-2" />
                    {event.location[lang as keyof typeof event.location]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2">
              {/* Event Description */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{eventDetail.about || 'About This Event'}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {event.fullDescription?.[lang as keyof typeof event.fullDescription] || 
                   event.description[lang as keyof typeof event.description]}
                </p>
                
                {event.speakers && (
                  <>
                    <hr className="my-8 border-gray-200" />
                    
                    {/* Speakers */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{eventDetail.speakers || 'Speakers'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                            <Image 
                              src={speaker.image} 
                              alt={speaker.name} 
                              className="object-cover"
                              width={96}
                              height={96}
                            />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800">{speaker.name}</h3>
                          <p className="text-purple-600">{speaker.position[lang as keyof typeof speaker.position]}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Event Schedule */}
              {event.schedule && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{eventDetail.schedule || 'Event Schedule'}</h2>
                  
                  <div className="space-y-6">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:items-start border-l-4 border-purple-600 pl-4 md:space-x-4">
                        <div className="md:w-1/4 font-medium text-purple-700 mb-2 md:mb-0">
                          {item.time[lang as keyof typeof item.time]}
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.title[lang as keyof typeof item.title]}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Event Registration */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{eventDetail.eventDetails || 'Event Details'}</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <FiCalendar className="text-purple-600 mr-3 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">{eventDetail.date || 'Date'}</h4>
                      <p className="text-gray-800">{event.date[lang as keyof typeof event.date]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FiClock className="text-purple-600 mr-3 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">{eventDetail.time || 'Time'}</h4>
                      <p className="text-gray-800">{event.time[lang as keyof typeof event.time]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FiMapPin className="text-purple-600 mr-3 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">{eventDetail.location || 'Location'}</h4>
                      <p className="text-gray-800">{event.location[lang as keyof typeof event.location]}</p>
                      <p className="text-gray-600 text-sm">
                        {event.address?.[lang as keyof typeof event.address]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FiTag className="text-purple-600 mr-3 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">{eventDetail.category || 'Category'}</h4>
                      <p className="text-gray-800">{event.category[lang as keyof typeof event.category]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FiUsers className="text-purple-600 mr-3 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">{eventDetail.capacity || 'Capacity'}</h4>
                      <p className="text-gray-800">{event.capacity?.[lang as keyof typeof event.capacity]}</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors mb-4">
                  {eventDetail.register || 'Register Now'}
                </button>
                
                <div className="flex justify-between">
                  <button className="flex items-center text-purple-600 hover:text-purple-800">
                    <FiShare2 className="mr-2" />
                    {eventDetail.share || 'Share'}
                  </button>
                  
                  <button className="flex items-center text-purple-600 hover:text-purple-800">
                    <FiDownload className="mr-2" />
                    {eventDetail.addToCalendar || 'Add to Calendar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Events */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {eventDetail.relatedEvents || 'Related Events'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {eventsData.filter(e => e.slug !== slug)
                .slice(0, 3)
                .map((relatedEvent) => (
                <div key={relatedEvent.slug} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={relatedEvent.image} 
                      alt={relatedEvent.title[lang as keyof typeof relatedEvent.title]} 
                      className="group-hover:scale-105 transition-transform duration-300"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-0 left-0 bg-purple-600 text-white py-1 px-4 text-sm font-medium">
                      {relatedEvent.category[lang as keyof typeof relatedEvent.category]}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <FiCalendar />
                      <span>{relatedEvent.date[lang as keyof typeof relatedEvent.date]}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                      {relatedEvent.title[lang as keyof typeof relatedEvent.title]}
                    </h3>
                    
                    <a 
                      href={`/${lang}/events/${relatedEvent.slug}`}
                      className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      {t.common?.details || "Details"}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-purple-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{eventDetail.ctaTitle || 'Interested in More Events?'}</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              {eventDetail.ctaText || 'Check out our upcoming events and programs. Join MIRA ACADEMY for more educational opportunities.'}
            </p>
            <a 
              href={`/${lang}/events`}
              className="inline-block px-6 py-3 bg-white text-purple-700 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              {eventDetail.viewAllEvents || 'View All Events'}
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 