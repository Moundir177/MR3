'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useParams } from 'next/navigation';

export default function TestimonialsPage({ params }: { params: { lang: string } }) {
  const { t } = useTranslation();
  const lang = params.lang;
  
  const testimonials = [
    {
      id: 1,
      name: "Amina Benali",
      role: "Développeuse Web",
      image: "https://randomuser.me/api/portraits/women/42.jpg",
      text: "La formation en développement web à MIRA ACADEMY a changé ma vie. J'ai pu acquérir les compétences nécessaires pour décrocher mon premier emploi dans le domaine de la tech. Les formateurs sont très compétents et disponibles, et le contenu est très bien structuré. Je recommande vivement cette formation à tous ceux qui souhaitent se lancer dans le développement web."
    },
    {
      id: 2,
      name: "Karim Hamdi",
      role: "Expert en Cybersécurité",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Les cours de cybersécurité étaient exceptionnels. Les formateurs sont des professionnels du secteur et le contenu est à jour avec les dernières tendances. J'ai pu mettre en pratique les connaissances acquises dès la fin de ma formation. MIRA ACADEMY a vraiment changé ma carrière et m'a permis de travailler dans un domaine qui me passionne."
    },
    {
      id: 3,
      name: "Sabrina Mazouz",
      role: "Designer UX/UI",
      image: "https://randomuser.me/api/portraits/women/24.jpg",
      text: "MIRA ACADEMY m'a fourni un environnement d'apprentissage idéal pour développer mes compétences en design. Les projets pratiques m'ont permis de créer un portfolio solide. Je me suis sentie parfaitement préparée pour entrer sur le marché du travail grâce à l'accompagnement personnalisé et aux conseils des formateurs."
    },
    {
      id: 4,
      name: "Younes Kaddour",
      role: "Analyste de Données",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "La formation en analyse de données à MIRA ACADEMY est complète et très bien structurée. J'ai apprécié l'approche pratique et les projets réels sur lesquels nous avons travaillé. Les compétences que j'ai acquises sont exactement ce que recherchent les employeurs aujourd'hui."
    },
    {
      id: 5,
      name: "Leila Boudiaf",
      role: "Cheffe de Projet Digital",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
      text: "Après plusieurs années d'expérience professionnelle, j'ai décidé de me reconvertir dans le digital. MIRA ACADEMY m'a offert une formation adaptée à mon profil et à mes objectifs. Aujourd'hui, je suis cheffe de projet digital dans une grande entreprise, et je dois beaucoup de ce succès à la qualité de la formation reçue."
    },
    {
      id: 6,
      name: "Omar Belkacem",
      role: "Développeur Mobile",
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      text: "La formation en développement d'applications mobiles était exactement ce dont j'avais besoin. Le programme est complet et couvre toutes les technologies essentielles. Les projets pratiques m'ont permis de maîtriser rapidement les concepts et de développer mes propres applications."
    },
    {
      id: 7,
      name: "Nadia Hamza",
      role: "Spécialiste en Marketing Digital",
      image: "https://randomuser.me/api/portraits/women/90.jpg",
      text: "MIRA ACADEMY propose une formation en marketing digital qui répond parfaitement aux besoins actuels des entreprises. Les cas pratiques et les études de cas réelles m'ont permis de comprendre les enjeux et les stratégies à mettre en place. Je recommande vivement cette formation."
    },
    {
      id: 8,
      name: "Mehdi Khalfi",
      role: "Administrateur Systèmes",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      text: "La formation en administration systèmes m'a fourni toutes les compétences nécessaires pour exercer mon métier avec confiance. Les laboratoires pratiques et les environnements de test sont vraiment bien pensés. Je suis très satisfait de mon expérience à MIRA ACADEMY."
    },
    {
      id: 9,
      name: "Samia Belkacemi",
      role: "Responsable E-commerce",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      text: "J'ai suivi la formation en e-commerce et gestion de boutiques en ligne, et je suis maintenant responsable e-commerce dans une entreprise de mode. Les connaissances acquises à MIRA ACADEMY sont directement applicables et très valorisées sur le marché du travail."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title="Témoignages"
          subtitle="Découvrez ce que nos étudiants pensent de leur expérience à MIRA ACADEMY"
          backgroundClass="bg-primary"
          lang={lang}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="relative w-14 h-14 mr-4 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={`${testimonial.name} avatar`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex mt-4 text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 bg-primary text-white p-8 rounded-lg shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl font-bold mb-2">Prêt à commencer votre parcours ?</h3>
                  <p className="text-white/80">
                    Rejoignez notre communauté d'apprenants et transformez votre carrière dès aujourd'hui.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={`/${lang}/courses`} className="btn btn-secondary whitespace-nowrap">
                    Voir nos formations
                  </a>
                  <a href={`/${lang}/contact`} className="btn btn-outline border-white text-white hover:bg-white hover:text-primary whitespace-nowrap">
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 