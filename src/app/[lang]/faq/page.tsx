'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import Faq, { FaqItem } from '@/components/Faq';
import Link from 'next/link';

export default function FaqPage({ params }: { params: { lang: string } }) {
  const { t } = useTranslation();
  const lang = params.lang;

  const generalFaqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que MIRA ACADEMY ?",
      answer: "MIRA ACADEMY est un centre de formation professionnelle spécialisé dans les domaines du numérique, de la technologie et du développement personnel. Nous proposons des formations de qualité, adaptées aux besoins du marché du travail actuel."
    },
    {
      question: "Où se situe MIRA ACADEMY ?",
      answer: "Notre campus principal se trouve à Alger, mais nous disposons également de centres de formation dans d'autres villes d'Algérie. Nous proposons aussi des formations en ligne accessibles partout."
    },
    {
      question: "Les formations sont-elles certifiantes ?",
      answer: "Oui, toutes nos formations sont certifiantes. Nous délivrons des certificats reconnus par les entreprises et les institutions, ce qui valorise considérablement votre CV et vos compétences sur le marché du travail."
    },
    {
      question: "Est-ce que MIRA ACADEMY aide à trouver un emploi après la formation ?",
      answer: "Absolument ! Nous disposons d'un service d'aide à l'insertion professionnelle qui vous accompagne dans votre recherche d'emploi. Nous organisons également des événements de recrutement et avons des partenariats avec de nombreuses entreprises."
    }
  ];

  const admissionsFaqItems: FaqItem[] = [
    {
      question: "Comment s'inscrire à une formation ?",
      answer: "Pour vous inscrire, vous pouvez remplir le formulaire d'inscription en ligne sur notre site web, nous contacter par téléphone ou venir directement dans l'un de nos centres. Notre équipe vous guidera tout au long du processus d'inscription."
    },
    {
      question: "Quels sont les prérequis pour suivre une formation ?",
      answer: "Les prérequis varient selon les formations. Certaines sont accessibles à tous, d'autres nécessitent des connaissances préalables. Vous pouvez consulter les détails sur la page de chaque formation ou nous contacter pour plus d'informations."
    },
    {
      question: "Est-il possible de payer en plusieurs fois ?",
      answer: "Oui, nous proposons différentes options de paiement, notamment le paiement en plusieurs fois. Nous adaptons nos solutions de financement à votre situation pour rendre nos formations accessibles à tous."
    },
    {
      question: "Y a-t-il un test d'entrée ?",
      answer: "Pour certaines formations spécialisées, nous organisons des tests d'entrée pour évaluer vos connaissances et votre niveau. Ces tests nous permettent de vous orienter vers la formation la plus adaptée à votre profil."
    }
  ];

  const coursesFaqItems: FaqItem[] = [
    {
      question: "Quelle est la durée moyenne d'une formation ?",
      answer: "La durée des formations varie selon le programme et le niveau. Nous proposons des formations courtes de quelques jours, des formations intensives de plusieurs semaines, et des cursus complets pouvant s'étendre sur plusieurs mois."
    },
    {
      question: "Les formations sont-elles disponibles en ligne ?",
      answer: "Oui, la majorité de nos formations sont disponibles en ligne, en format 100% à distance ou en format hybride (présentiel et distanciel). Notre plateforme e-learning est accessible 24h/24 et 7j/7."
    },
    {
      question: "Comment se déroulent les cours ?",
      answer: "Nos cours combinent théorie et pratique. Ils sont dispensés par des formateurs expérimentés et incluent des projets concrets, des études de cas, des exercices pratiques et des mises en situation professionnelle."
    },
    {
      question: "Est-ce que je recevrai des supports de cours ?",
      answer: "Oui, tous les participants reçoivent des supports de cours complets (numériques ou imprimés), des ressources complémentaires et un accès à notre bibliothèque en ligne pour approfondir leurs connaissances."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title="Foire Aux Questions"
          subtitle="Trouvez les réponses à vos questions les plus fréquentes"
          backgroundClass="bg-primary"
          lang={lang}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-16">
              {/* General Questions */}
              <div>
                <Faq 
                  title="Questions générales" 
                  subtitle="Tout ce que vous devez savoir sur MIRA ACADEMY"
                  items={generalFaqItems} 
                />
              </div>

              {/* Admissions Questions */}
              <div>
                <Faq 
                  title="Admissions et inscriptions" 
                  subtitle="Comment rejoindre nos formations"
                  items={admissionsFaqItems} 
                />
              </div>

              {/* Courses Questions */}
              <div>
                <Faq 
                  title="Formations et cours" 
                  subtitle="Comment se déroulent nos formations"
                  items={coursesFaqItems} 
                />
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-16 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Vous n'avez pas trouvé votre réponse ?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  N'hésitez pas à nous contacter directement. Notre équipe est disponible pour répondre à toutes vos questions.
                </p>
                <Link
                  href={`/${lang}/contact`}
                  className="btn btn-primary"
                >
                  Nous contacter
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