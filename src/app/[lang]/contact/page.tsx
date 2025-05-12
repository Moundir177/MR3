'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

export default function ContactPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang;
  
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title="Contactez-nous"
          subtitle="Nous sommes là pour répondre à toutes vos questions"
          backgroundClass="bg-primary"
          lang={lang}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 h-full">
                  <h2 className="text-2xl font-bold mb-6 text-primary">Informations de contact</h2>
                  
                  <div className="space-y-6">
                    {/* Address */}
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FiMapPin className="h-6 w-6 text-primary mt-1" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium">Notre adresse</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          123 Rue des Formations<br />
                          16000 Alger<br />
                          Algérie
                        </p>
                      </div>
                    </div>
                    
                    {/* Phone */}
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FiPhone className="h-6 w-6 text-primary mt-1" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium">Téléphone</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          <a href="tel:+213123456789" className="hover:text-primary">+213 12 345 67 89</a>
                        </p>
                      </div>
                    </div>
                    
                    {/* Email */}
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FiMail className="h-6 w-6 text-primary mt-1" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium">Email</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          <a href="mailto:contact@miracademy.dz" className="hover:text-primary">contact@miracademy.dz</a>
                        </p>
                      </div>
                    </div>
                    
                    {/* Hours */}
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FiClock className="h-6 w-6 text-primary mt-1" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium">Heures d'ouverture</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Lundi - Vendredi: 8h30 - 17h30<br />
                          Samedi: 9h00 - 13h00<br />
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="mt-10">
                    <h3 className="text-lg font-medium mb-4">Suivez-nous</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      </a>
                      <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                      </a>
                      <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                <ContactForm />
              </div>
            </div>
            
            {/* Map */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Notre localisation</h2>
              <div className="rounded-lg overflow-hidden h-96 shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102368.25011978797!2d3.0071102302246123!3d36.73692029177144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb26977ea659f%3A0x128fb3686e9aac4f!2sAlger!5e0!3m2!1sfr!2sdz!4v1618920131393!5m2!1sfr!2sdz" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="MIRA ACADEMY Location"
                ></iframe>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-16">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl font-bold mb-4">Questions fréquemment posées</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Trouvez rapidement des réponses aux questions les plus courantes sur nos services et notre processus d'inscription.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto space-y-6">
                {/* FAQ Item 1 */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Comment puis-je m'inscrire à une formation ?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Vous pouvez vous inscrire en ligne en remplissant le formulaire sur la page de la formation qui vous intéresse, ou en nous contactant directement par téléphone ou email. Notre équipe vous guidera tout au long du processus d'inscription.
                  </p>
                </div>
                
                {/* FAQ Item 2 */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Quelles sont les méthodes de paiement acceptées ?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Nous acceptons les paiements par carte bancaire, virement bancaire, et espèces à notre bureau. Nous proposons également des options de paiement échelonné pour certaines formations.
                  </p>
                </div>
                
                {/* FAQ Item 3 */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Proposez-vous des formations en ligne ?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Oui, nous proposons à la fois des formations en présentiel et en ligne. Nos formations en ligne sont interactives et dispensées en direct par nos formateurs, avec des sessions enregistrées disponibles pour révision.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <a href={`/${lang}/faq`} className="text-primary hover:underline font-medium">
                  Voir toutes les questions fréquentes →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 