'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  FiBook, 
  FiAward, 
  FiUsers, 
  FiThumbsUp, 
  FiArrowRight 
} from 'react-icons/fi';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20 md:py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-primary bg-opacity-90"></div>
            {/* Background pattern */}
            <svg
              className="absolute left-0 top-0 h-full w-full text-white/5"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <defs>
                <pattern
                  id="pattern"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(10)"
                >
                  <path
                    d="M0 100V0h100v100zM0 100V0h100v100z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  MIRA ACADEMY
                </h1>
                <h2 className="text-2xl md:text-3xl mb-6 text-secondary font-medium">
                  L'excellence en formation professionnelle
                </h2>
                <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl mx-auto lg:mx-0">
                  Découvrez nos formations de qualité pour développer vos compétences et avancer dans votre carrière.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Link
                    href="/courses"
                    className="btn btn-secondary"
                  >
                    Explorez nos formations
                  </Link>
                  <Link
                    href="/contact"
                    className="btn btn-outline border-white text-white hover:bg-white hover:text-primary"
                  >
                    Contactez-nous
                  </Link>
                </div>

                {/* Language Selection */}
                <div className="mt-8 flex justify-center lg:justify-start gap-3">
                  <Link href="/" locale="fr" className="px-3 py-1 bg-white/20 rounded-md hover:bg-white/30 transition">
                    Français
                  </Link>
                  <Link href="/" locale="ar" className="px-3 py-1 bg-white/20 rounded-md hover:bg-white/30 transition">
                    العربية
                  </Link>
                  <Link href="/" locale="en" className="px-3 py-1 bg-white/20 rounded-md hover:bg-white/30 transition">
                    English
                  </Link>
                </div>
              </div>
              
              <div className="lg:w-1/2 relative">
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                    alt="MIRA ACADEMY Campus"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                </div>
                
                {/* Stats */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">50+</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Formations</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">25+</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Formateurs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">1000+</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Étudiants</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">95%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="section-title">Pourquoi choisir MIRA ACADEMY ?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Nous offrons une expérience d'apprentissage unique, adaptée aux besoins du marché algérien et international.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-6 bg-primary/10 rounded-lg text-primary">
                  <FiAward className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-light dark:text-white">Enseignement de qualité</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Des formateurs expérimentés et des programmes innovants adaptés aux tendances actuelles.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-6 bg-secondary/10 rounded-lg text-secondary">
                  <FiBook className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-light dark:text-white">Apprentissage pratique</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Des formations orientées vers la pratique et les besoins réels du marché du travail.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-6 bg-tertiary/10 rounded-lg text-tertiary">
                  <FiThumbsUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-light dark:text-white">Certifications reconnues</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Des diplômes valorisés par les employeurs et reconnus sur le marché du travail.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-6 bg-primary/10 rounded-lg text-primary">
                  <FiUsers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-light dark:text-white">Support personnalisé</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Un accompagnement sur mesure pour votre réussite académique et professionnelle.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Popular Courses Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <h2 className="section-title text-left">Nos formations populaires</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  Découvrez nos programmes de formation les plus demandés pour développer vos compétences.
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center mt-4 md:mt-0 text-primary hover:text-primary-dark"
              >
                <span className="mr-2">Voir toutes les formations</span>
                <FiArrowRight />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Course 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                    alt="Développement Web"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Technologie</span>
                    <span className="text-secondary font-semibold">35000 DA</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-text-light dark:text-white">Développement Web Complet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Maîtrisez les technologies front-end et back-end pour créer des sites web modernes.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Durée: 4 mois</span>
                    <Link
                      href="/courses/web-development"
                      className="text-primary hover:text-primary-dark inline-flex items-center"
                    >
                      <span className="mr-1">Détails</span>
                      <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Course 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                    alt="Marketing Digital"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full">Business</span>
                    <span className="text-secondary font-semibold">30000 DA</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-text-light dark:text-white">Marketing Digital</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Apprenez à élaborer et exécuter des stratégies marketing digitales efficaces.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Durée: 3 mois</span>
                    <Link
                      href="/courses/digital-marketing"
                      className="text-primary hover:text-primary-dark inline-flex items-center"
                    >
                      <span className="mr-1">Détails</span>
                      <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Course 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1679518070594-9e29cb0c462c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                    alt="Intelligence Artificielle"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-xs rounded-full">Science des données</span>
                    <span className="text-secondary font-semibold">45000 DA</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-text-light dark:text-white">Intelligence Artificielle</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Explorez les fondements et applications pratiques de l'IA et du machine learning.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Durée: 5 mois</span>
                    <Link
                      href="/courses/artificial-intelligence"
                      className="text-primary hover:text-primary-dark inline-flex items-center"
                    >
                      <span className="mr-1">Détails</span>
                      <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="section-title">Ce que nos étudiants disent</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Découvrez les témoignages de nos anciens étudiants qui ont transformé leur carrière grâce à MIRA ACADEMY.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="relative w-14 h-14 mr-4 rounded-full overflow-hidden">
                    <Image
                      src="https://randomuser.me/api/portraits/women/42.jpg"
                      alt="Testimonial avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Amina Benali</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Développeuse Web</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "La formation en développement web à MIRA ACADEMY a changé ma vie. J'ai pu acquérir les compétences nécessaires pour décrocher mon premier emploi dans le domaine de la tech."
                </p>
                <div className="flex mt-4 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="relative w-14 h-14 mr-4 rounded-full overflow-hidden">
                    <Image
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Testimonial avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Karim Hamdi</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Expert en Cybersécurité</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "Les cours de cybersécurité étaient exceptionnels. Les formateurs sont des professionnels du secteur et le contenu est à jour avec les dernières tendances."
                </p>
                <div className="flex mt-4 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="relative w-14 h-14 mr-4 rounded-full overflow-hidden">
                    <Image
                      src="https://randomuser.me/api/portraits/women/24.jpg"
                      alt="Testimonial avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Sabrina Mazouz</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Designer UX/UI</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "MIRA ACADEMY m'a fourni un environnement d'apprentissage idéal pour développer mes compétences en design. Les projets pratiques m'ont permis de créer un portfolio solide."
                </p>
                <div className="flex mt-4 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link
                href="/testimonials"
                className="btn btn-primary"
              >
                Voir plus de témoignages
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à développer vos compétences ?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Rejoignez MIRA ACADEMY aujourd'hui et commencez votre parcours vers l'excellence professionnelle.
            </p>
            <Link
              href="/contact"
              className="btn px-8 py-4 bg-white text-primary hover:bg-gray-100 transition-colors"
            >
              Inscrivez-vous maintenant
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 