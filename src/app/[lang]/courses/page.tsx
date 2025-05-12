'use client';

import React, { useState, useEffect } from 'react';
import { translations } from '@/translations';
import { courses } from '@/data/courses';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import PageHeader from '@/components/PageHeader';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

export default function CoursesPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang;
  
  // Get translations for the current language
  const t = translations[lang as keyof typeof translations] || translations.fr;
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(courses);

  // Apply filters
  useEffect(() => {
    let results = courses;
    
    if (searchTerm) {
      results = results.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      results = results.filter(course => course.category === selectedCategory);
    }
    
    if (selectedLevel) {
      results = results.filter(course => course.level === selectedLevel);
    }
    
    setFilteredCourses(results);
  }, [searchTerm, selectedCategory, selectedLevel]);

  // Extract unique categories from courses
  const categories = Array.from(new Set(courses.map(course => course.category)));
  const levels = ['Débutant', 'Intermédiaire', 'Avancé'];
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedLevel(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t.courses?.title || "Nos formations"}
          subtitle={t.courses?.subtitle || "Découvrez nos programmes de formation professionnelle"}
          backgroundClass="bg-primary"
          breadcrumbs={[{ name: t.courses?.title || "Formations", href: "/courses" }]}
          lang={lang}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Search and Filter Bar */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                {/* Search Input */}
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Rechercher une formation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
                
                {/* Filter Toggle Button (Mobile) */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <FiFilter className="mr-2" />
                  <span>Filtres</span>
                </button>
                
                {/* Filter Dropdowns (Desktop) */}
                <div className="hidden md:flex gap-3">
                  {/* Category Filter */}
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  {/* Level Filter */}
                  <select
                    value={selectedLevel || ''}
                    onChange={(e) => setSelectedLevel(e.target.value || null)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Tous les niveaux</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  
                  {/* Reset Filters */}
                  {(selectedCategory || selectedLevel || searchTerm) && (
                    <button
                      onClick={resetFilters}
                      className="p-3 text-primary hover:bg-primary/10 rounded-lg transition"
                    >
                      Réinitialiser
                    </button>
                  )}
                </div>
              </div>
              
              {/* Mobile Filters (Collapsible) */}
              {showFilters && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg md:hidden">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Catégorie
                      </label>
                      <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Toutes les catégories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Level Filter */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Niveau
                      </label>
                      <select
                        value={selectedLevel || ''}
                        onChange={(e) => setSelectedLevel(e.target.value || null)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Tous les niveaux</option>
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Reset Button */}
                    <button
                      onClick={resetFilters}
                      className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                {filteredCourses.length} formation{filteredCourses.length !== 1 ? 's' : ''} trouvée{filteredCourses.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    {...course}
                    lang={lang}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Aucune formation trouvée</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Essayez de modifier vos filtres ou votre recherche.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-primary"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
            
            {/* Information Block */}
            <div className="mt-16 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Nous proposons également des formations sur mesure adaptées à vos besoins spécifiques. 
                  Contactez-nous pour discuter de vos objectifs de formation.
                </p>
                <a
                  href={`/${lang}/contact`}
                  className="btn btn-primary"
                >
                  Nous contacter
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