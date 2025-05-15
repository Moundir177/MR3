import React from 'react';
import { translations } from '@/translations';
import EventDetailClient from './EventDetailClient';

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
          fr: '15:30 - 16:30',
          ar: '15:30 - 16:30',
          en: '3:30 - 4:30 PM'
        },
        title: {
          fr: 'Applications pratiques et démonstrations',
          ar: 'التطبيقات العملية والعروض التوضيحية',
          en: 'Practical applications and demonstrations'
        }
      },
      {
        time: {
          fr: '16:30 - 17:00',
          ar: '16:30 - 17:00',
          en: '4:30 - 5:00 PM'
        },
        title: {
          fr: 'Pause café',
          ar: 'استراحة القهوة',
          en: 'Coffee break'
        }
      },
      {
        time: {
          fr: '17:00 - 18:00',
          ar: '17:00 - 18:00',
          en: '5:00 - 6:00 PM'
        },
        title: {
          fr: 'Panel de discussion et Q&A',
          ar: 'مناقشة اللجنة وأسئلة وأجوبة',
          en: 'Panel discussion and Q&A'
        }
      }
    ]
  },
  {
    id: '3',
    slug: 'event-3',
    title: {
      fr: 'Atelier de Formation en Design UI/UX',
      ar: 'ورشة عمل تدريبية في تصميم واجهة المستخدم',
      en: 'UI/UX Design Workshop'
    },
    description: {
      fr: 'Un atelier pratique pour apprendre les principes fondamentaux du design d\'interface et d\'expérience utilisateur.',
      ar: 'ورشة عمل عملية لتعلم المبادئ الأساسية لتصميم واجهة المستخدم وتجربة المستخدم.',
      en: 'A hands-on workshop to learn the fundamental principles of user interface and user experience design.'
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
      fr: 'Salle de formation',
      ar: 'قاعة التدريب',
      en: 'Training Room'
    },
    address: {
      fr: '123 Boulevard Mohammed V, Alger',
      ar: '123 شارع محمد الخامس، الجزائر',
      en: '123 Mohammed V Boulevard, Algiers'
    },
    image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3',
    category: {
      fr: 'Atelier',
      ar: 'ورشة عمل',
      en: 'Workshop'
    },
    featured: false,
    organizer: {
      fr: 'MIRA ACADEMY',
      ar: 'أكاديمية ميرا',
      en: 'MIRA ACADEMY'
    },
    capacity: {
      fr: 'Places limitées à 20 participants',
      ar: 'الأماكن محدودة لـ 20 مشارك',
      en: 'Limited to 20 participants'
    },
    registration: {
      fr: 'Inscription obligatoire - 2000 DA',
      ar: 'التسجيل إلزامي - 2000 دج',
      en: 'Registration required - 2000 DA'
    }
  }
];

export default function EventDetailPage({ params }: { params: { slug: string, lang: string } }) {
  const { slug, lang } = params;
  
  // Find the current event
  const event = eventsData.find(e => e.slug === slug);
  
  // Initialize translations
  const t = translations[lang as keyof typeof translations] || translations.fr;
  
  return <EventDetailClient event={event} eventsData={eventsData} slug={slug} lang={lang} t={t} />;
}

// Static params for Next.js static export
export function generateStaticParams() {
  return [
  {
    "lang": "fr",
    "slug": "event-1"
  },
  {
    "lang": "fr",
    "slug": "event-2"
  },
  {
    "lang": "fr",
    "slug": "event-3"
  },
  {
    "lang": "en",
    "slug": "event-1"
  },
  {
    "lang": "en",
    "slug": "event-2"
  },
  {
    "lang": "en",
    "slug": "event-3"
  },
  {
    "lang": "ar",
    "slug": "event-1"
  },
  {
    "lang": "ar",
    "slug": "event-2"
  },
  {
    "lang": "ar",
    "slug": "event-3"
  }
];
}
