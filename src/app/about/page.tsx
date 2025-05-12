'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <h1 className="section-title">À propos de MIRA ACADEMY</h1>
          <div className="max-w-3xl mx-auto">
            <p className="mb-6 text-lg">
              MIRA ACADEMY est un centre de formation professionnelle algérien dédié à l'excellence éducative. Nous proposons des formations innovantes et adaptées aux besoins du marché du travail local et international.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 text-primary">Notre vision</h2>
            <p className="mb-6">
              Devenir le leader de la formation professionnelle en Algérie, en offrant des programmes éducatifs de haute qualité qui répondent aux défis du 21ème siècle.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 text-primary">Notre mission</h2>
            <p className="mb-6">
              Former la prochaine génération de professionnels qualifiés en offrant un enseignement pratique, innovant et accessible à tous.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 