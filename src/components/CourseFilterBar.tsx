'use client';

import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
import { useLocale } from '@/app/providers';

// Types for the filter options
interface FilterOption {
  id: string;
  label: string;
}

interface CourseFilterBarProps {
  categories?: FilterOption[];
  levels?: FilterOption[];
  durations?: FilterOption[];
  tags?: FilterOption[];
  onFilterChange?: (filters: CourseFilters) => void;
  className?: string;
}

export interface CourseFilters {
  search: string;
  categories: string[];
  levels: string[];
  durations: string[];
  tags: string[];
  sortBy: string;
}

/**
 * Course filter component for filtering and searching courses
 */
const CourseFilterBar: React.FC<CourseFilterBarProps> = ({
  categories = [],
  levels = [],
  durations = [],
  tags = [],
  onFilterChange,
  className = '',
}) => {
  const { locale, isRTL } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  // Translations
  const translations: Record<string, Record<string, string>> = {
    en: {
      search: 'Search courses...',
      filters: 'Filters',
      categories: 'Categories',
      levels: 'Levels',
      duration: 'Duration',
      tags: 'Tags',
      sort: 'Sort by',
      newest: 'Newest',
      oldest: 'Oldest',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      popular: 'Most Popular',
      rated: 'Highest Rated',
      apply: 'Apply Filters',
      clear: 'Clear All',
      clearFilter: 'Clear',
      showMore: 'Show More',
      showLess: 'Show Less',
      mobileFilters: 'Filters',
      close: 'Close',
    },
    fr: {
      search: 'Rechercher des cours...',
      filters: 'Filtres',
      categories: 'Catégories',
      levels: 'Niveaux',
      duration: 'Durée',
      tags: 'Tags',
      sort: 'Trier par',
      newest: 'Plus récent',
      oldest: 'Plus ancien',
      priceAsc: 'Prix: Croissant',
      priceDesc: 'Prix: Décroissant',
      popular: 'Plus populaire',
      rated: 'Mieux noté',
      apply: 'Appliquer les filtres',
      clear: 'Effacer tout',
      clearFilter: 'Effacer',
      showMore: 'Voir plus',
      showLess: 'Voir moins',
      mobileFilters: 'Filtres',
      close: 'Fermer',
    },
    ar: {
      search: 'البحث عن الدورات...',
      filters: 'التصفية',
      categories: 'الفئات',
      levels: 'المستويات',
      duration: 'المدة',
      tags: 'الكلمات الدلالية',
      sort: 'ترتيب حسب',
      newest: 'الأحدث',
      oldest: 'الأقدم',
      priceAsc: 'السعر: من الأقل إلى الأعلى',
      priceDesc: 'السعر: من الأعلى إلى الأقل',
      popular: 'الأكثر شعبية',
      rated: 'الأعلى تقييماً',
      apply: 'تطبيق الفلاتر',
      clear: 'مسح الكل',
      clearFilter: 'مسح',
      showMore: 'عرض المزيد',
      showLess: 'عرض أقل',
      mobileFilters: 'الفلاتر',
      close: 'إغلاق',
    },
  };

  const t = (key: string): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };

  // Sort options
  const sortOptions = [
    { id: 'newest', label: t('newest') },
    { id: 'oldest', label: t('oldest') },
    { id: 'priceAsc', label: t('priceAsc') },
    { id: 'priceDesc', label: t('priceDesc') },
    { id: 'popular', label: t('popular') },
    { id: 'rated', label: t('rated') },
  ];

  // Update filters when component mounts or changes
  useEffect(() => {
    handleFilterChange();
  }, [search, selectedCategories, selectedLevels, selectedDurations, selectedTags, sortBy]);

  // Toggle filter dropdown
  const toggleFilterPanel = () => {
    setIsOpen(!isOpen);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Handle category toggle
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle level toggle
  const toggleLevel = (levelId: string) => {
    setSelectedLevels((prev) =>
      prev.includes(levelId)
        ? prev.filter((id) => id !== levelId)
        : [...prev, levelId]
    );
  };

  // Handle duration toggle
  const toggleDuration = (durationId: string) => {
    setSelectedDurations((prev) =>
      prev.includes(durationId)
        ? prev.filter((id) => id !== durationId)
        : [...prev, durationId]
    );
  };

  // Handle tag toggle
  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Clear specific filter type
  const clearFilterType = (filterType: 'categories' | 'levels' | 'durations' | 'tags') => {
    switch (filterType) {
      case 'categories':
        setSelectedCategories([]);
        break;
      case 'levels':
        setSelectedLevels([]);
        break;
      case 'durations':
        setSelectedDurations([]);
        break;
      case 'tags':
        setSelectedTags([]);
        break;
    }
  };

  // Toggle mobile filters panel
  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedDurations([]);
    setSelectedTags([]);
    setSortBy('newest');
  };

  // Apply filters and notify parent component
  const handleFilterChange = () => {
    if (onFilterChange) {
      onFilterChange({
        search,
        categories: selectedCategories,
        levels: selectedLevels,
        durations: selectedDurations,
        tags: selectedTags,
        sortBy,
      });
    }
  };

  // Get active filter count for badge
  const getActiveFilterCount = () => {
    return selectedCategories.length + selectedLevels.length + selectedDurations.length + selectedTags.length;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm ${className}`}>
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder={t('search')}
            className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-blue focus:border-blue dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Filter Toggle Button - Desktop & Mobile */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleFilterPanel}
            className="hidden md:flex items-center text-sm font-medium text-blue hover:text-blue-dark"
          >
            <FiFilter className="mr-2" />
            {t('filters')}
            <FiChevronDown
              className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <button
            onClick={toggleMobileFilters}
            className="md:hidden flex items-center text-sm font-medium text-blue hover:text-blue-dark"
          >
            <FiFilter className="mr-2" />
            {t('filters')}
            {getActiveFilterCount() > 0 && (
              <span className="ml-1 bg-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-sm text-gray-700 dark:text-gray-300">
            {t('sort')}:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-blue focus:border-blue"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Filter Panel */}
      {isOpen && (
        <div className="hidden md:block p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Categories Filter */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {t('categories')}
                </h3>
                {selectedCategories.length > 0 && (
                  <button 
                    onClick={() => clearFilterType('categories')}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    {t('clearFilter')}
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="rounded text-blue focus:ring-blue border-gray-300 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Levels Filter */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {t('levels')}
                </h3>
                {selectedLevels.length > 0 && (
                  <button 
                    onClick={() => clearFilterType('levels')}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    {t('clearFilter')}
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {levels.map((level) => (
                  <div key={level.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`level-${level.id}`}
                      checked={selectedLevels.includes(level.id)}
                      onChange={() => toggleLevel(level.id)}
                      className="rounded text-blue focus:ring-blue border-gray-300 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`level-${level.id}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {level.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {t('duration')}
                </h3>
                {selectedDurations.length > 0 && (
                  <button 
                    onClick={() => clearFilterType('durations')}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    {t('clearFilter')}
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {durations.map((duration) => (
                  <div key={duration.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`duration-${duration.id}`}
                      checked={selectedDurations.includes(duration.id)}
                      onChange={() => toggleDuration(duration.id)}
                      className="rounded text-blue focus:ring-blue border-gray-300 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`duration-${duration.id}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {duration.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {t('tags')}
                </h3>
                {selectedTags.length > 0 && (
                  <button 
                    onClick={() => clearFilterType('tags')}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    {t('clearFilter')}
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedTags.includes(tag.id)
                        ? 'bg-blue text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 dark:text-gray-400 flex items-center hover:text-blue"
            >
              <FiX className="mr-1" /> {t('clear')}
            </button>
            <button
              onClick={handleFilterChange}
              className="btn btn-blue px-4 py-2 text-sm"
            >
              {t('apply')}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white dark:bg-gray-800 rounded-t-xl w-full max-h-[80vh] overflow-y-auto transition-transform transform animate-slide-up">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <h2 className="text-lg font-bold">{t('mobileFilters')}</h2>
              <button onClick={toggleMobileFilters} className="text-gray-500">
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-4">
              {/* Categories Filter */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {t('categories')}
                  </h3>
                  {selectedCategories.length > 0 && (
                    <button 
                      onClick={() => clearFilterType('categories')}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      {t('clearFilter')}
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`mobile-category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="rounded text-blue focus:ring-blue border-gray-300 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`mobile-category-${category.id}`}
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Levels Filter */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {t('levels')}
                  </h3>
                  {selectedLevels.length > 0 && (
                    <button 
                      onClick={() => clearFilterType('levels')}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      {t('clearFilter')}
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <div key={level.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`mobile-level-${level.id}`}
                        checked={selectedLevels.includes(level.id)}
                        onChange={() => toggleLevel(level.id)}
                        className="rounded text-blue focus:ring-blue border-gray-300 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`mobile-level-${level.id}`}
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {level.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {t('duration')}
                  </h3>
                  {selectedDurations.length > 0 && (
                    <button 
                      onClick={() => clearFilterType('durations')}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      {t('clearFilter')}
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <div key={duration.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`mobile-duration-${duration.id}`}
                        checked={selectedDurations.includes(duration.id)}
                        onChange={() => toggleDuration(duration.id)}
                        className="rounded text-blue focus:ring-blue border-gray-300 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`mobile-duration-${duration.id}`}
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {duration.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {t('tags')}
                  </h3>
                  {selectedTags.length > 0 && (
                    <button 
                      onClick={() => clearFilterType('tags')}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      {t('clearFilter')}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedTags.includes(tag.id)
                          ? 'bg-blue text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Mobile */}
              <div className="flex flex-col space-y-3 sticky bottom-0 pt-3 pb-6 bg-white dark:bg-gray-800">
                <button
                  onClick={() => {
                    handleFilterChange();
                    toggleMobileFilters();
                  }}
                  className="btn btn-blue py-3 text-sm"
                >
                  {t('apply')}
                </button>
                <button
                  onClick={clearFilters}
                  className="btn btn-outline text-sm"
                >
                  {t('clear')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseFilterBar; 