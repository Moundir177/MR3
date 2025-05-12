'use client';

import React, { useState } from 'react';
import { FiCheck, FiX, FiChevronDown, FiChevronUp, FiInfo } from 'react-icons/fi';
import { useLocale } from '@/app/providers';

interface PricingFeature {
  id: string;
  title: string;
  included: boolean;
  info?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency?: string;
  frequency?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  features: PricingFeature[];
  highlighted?: boolean;
  discount?: {
    amount: number;
    label: string;
  };
  icon?: React.ReactNode;
  mostPopular?: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface PricingTableProps {
  plans: PricingPlan[];
  title?: string;
  subtitle?: string;
  yearlyBilling?: boolean;
  showToggle?: boolean;
  className?: string;
  showCompare?: boolean;
  faqs?: FAQItem[];
}

/**
 * Pricing table component for displaying subscription plans
 */
const PricingTable: React.FC<PricingTableProps> = ({
  plans,
  title,
  subtitle,
  yearlyBilling: initialYearlyBilling = false,
  showToggle = false,
  className = '',
  showCompare = false,
  faqs = [],
}) => {
  const { locale, isRTL } = useLocale();
  const [yearlyBilling, setYearlyBilling] = useState(initialYearlyBilling);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  // Translations
  const translations: Record<string, Record<string, string>> = {
    en: {
      monthly: 'Monthly',
      yearly: 'Yearly',
      savePercent: 'Save',
      mostPopular: 'Most Popular',
      perMonth: '/month',
      perYear: '/year',
      get: 'Get Started',
      contact: 'Contact Us',
      compare: 'Compare Plans',
      hideCompare: 'Hide Comparison',
      allFeatures: 'Show All Features',
      hideFeatures: 'Hide Features',
      faqTitle: 'Frequently Asked Questions',
      billedMonthly: 'Billed monthly',
      billedYearly: 'Billed annually',
    },
    fr: {
      monthly: 'Mensuel',
      yearly: 'Annuel',
      savePercent: 'Économiser',
      mostPopular: 'Le plus populaire',
      perMonth: '/mois',
      perYear: '/an',
      get: 'Commencer',
      contact: 'Contactez-nous',
      compare: 'Comparer les plans',
      hideCompare: 'Masquer la comparaison',
      allFeatures: 'Afficher toutes les fonctionnalités',
      hideFeatures: 'Masquer les fonctionnalités',
      faqTitle: 'Questions fréquemment posées',
      billedMonthly: 'Facturé mensuellement',
      billedYearly: 'Facturé annuellement',
    },
    ar: {
      monthly: 'شهري',
      yearly: 'سنوي',
      savePercent: 'وفر',
      mostPopular: 'الأكثر شيوعًا',
      perMonth: '/شهر',
      perYear: '/سنة',
      get: 'ابدأ الآن',
      contact: 'اتصل بنا',
      compare: 'قارن الخطط',
      hideCompare: 'إخفاء المقارنة',
      allFeatures: 'عرض كل الميزات',
      hideFeatures: 'إخفاء الميزات',
      faqTitle: 'الأسئلة الشائعة',
      billedMonthly: 'تدفع شهريا',
      billedYearly: 'تدفع سنويا',
    },
  };

  const t = (key: string): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };

  // Handle toggle billing period
  const toggleBillingPeriod = () => {
    setYearlyBilling(!yearlyBilling);
  };

  // Format the price with currency
  const formatPrice = (price: number, currency = '$') => {
    return `${currency}${price}`;
  };

  // Toggle FAQ item expansion
  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // Get all unique features across all plans
  const getAllFeatures = () => {
    const allFeatures: PricingFeature[] = [];
    
    plans.forEach(plan => {
      plan.features.forEach(feature => {
        if (!allFeatures.some(f => f.id === feature.id)) {
          allFeatures.push(feature);
        }
      });
    });
    
    return allFeatures;
  };

  // Check if a plan includes a specific feature
  const hasFeature = (plan: PricingPlan, featureId: string) => {
    return plan.features.some(f => f.id === featureId && f.included);
  };

  // Get feature info by ID (for comparison table)
  const getFeatureById = (plan: PricingPlan, featureId: string) => {
    return plan.features.find(f => f.id === featureId);
  };

  return (
    <div className={`${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Billing Toggle */}
      {showToggle && (
        <div className="flex flex-col items-center mb-10">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full inline-flex relative">
            <div 
              className={`absolute top-1 bottom-1 ${yearlyBilling ? 'right-1 left-[calc(50%+4px)]' : 'left-1 right-[calc(50%+4px)]'} bg-white dark:bg-gray-700 rounded-full transition-all duration-300 ease-in-out`} 
            />
            <button
              className={`relative z-10 py-2 px-4 rounded-full text-sm font-medium transition ${
                !yearlyBilling
                  ? 'text-blue'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setYearlyBilling(false)}
            >
              {t('monthly')}
            </button>
            <button
              className={`relative z-10 py-2 px-4 rounded-full text-sm font-medium transition ${
                yearlyBilling
                  ? 'text-blue'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setYearlyBilling(true)}
            >
              {t('yearly')}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {yearlyBilling ? t('billedYearly') : t('billedMonthly')}
          </p>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`card h-full relative ${
              plan.highlighted
                ? 'border-2 border-blue shadow-lg transform hover:-translate-y-1 transition-transform duration-300'
                : 'border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300'
            }`}
          >
            {/* Popular Badge */}
            {(plan.highlighted || plan.mostPopular) && (
              <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                <span className="bg-gradient-to-r from-blue to-green text-white text-xs font-semibold px-4 py-1 rounded-full inline-block">
                  {t('mostPopular')}
                </span>
              </div>
            )}

            <div className="p-6">
              {/* Plan Icon & Name */}
              <div className="flex items-center mb-2">
                {plan.icon && <div className="mr-3">{plan.icon}</div>}
                <h3 className="text-xl font-bold">{plan.name}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {plan.description}
              </p>

              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold">
                  {formatPrice(
                    yearlyBilling ? Math.round(plan.price * 12 * 0.8) : plan.price,
                    plan.currency
                  )}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  {yearlyBilling ? t('perYear') : t('perMonth')}
                </span>

                {/* Discount Badge */}
                {yearlyBilling && plan.discount && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {t('savePercent')} {plan.discount.amount}%
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.slice(0, showAllFeatures ? plan.features.length : 5).map((feature) => (
                  <li
                    key={feature.id}
                    className="flex items-start group relative"
                  >
                    <span className="mr-2 mt-1 flex-shrink-0">
                      {feature.included ? (
                        <FiCheck className="h-5 w-5 text-green" />
                      ) : (
                        <FiX className="h-5 w-5 text-gray-400" />
                      )}
                    </span>
                    <span
                      className={
                        feature.included
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-500 dark:text-gray-500'
                      }
                    >
                      {feature.title}
                      {feature.info && (
                        <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 inline-flex">
                          <FiInfo className="h-4 w-4" />
                          <span className="sr-only">Info</span>
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 text-xs w-48 z-10">
                            {feature.info}
                          </div>
                        </button>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Show More Features Button */}
              {plan.features.length > 5 && (
                <button 
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="text-sm text-blue hover:text-blue-dark mb-6 flex items-center"
                >
                  {showAllFeatures ? t('hideFeatures') : t('allFeatures')}
                  {showAllFeatures ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                </button>
              )}

              {/* CTA Button */}
              <a
                href={plan.buttonLink}
                className={`btn w-full ${
                  plan.highlighted
                    ? 'btn-blue'
                    : 'btn-outline-blue'
                }`}
              >
                {plan.buttonText || t('get')}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Compare Plans Feature Table */}
      {showCompare && (
        <div className="mt-16">
          <button 
            onClick={() => setShowAllFeatures(!showAllFeatures)}
            className="mx-auto block mb-8 btn btn-outline-blue"
          >
            {showAllFeatures ? t('hideCompare') : t('compare')}
          </button>

          {showAllFeatures && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700"></th>
                    {plans.map(plan => (
                      <th 
                        key={plan.id} 
                        className={`p-4 text-left border-b border-gray-200 dark:border-gray-700 ${
                          plan.highlighted ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="font-bold">{plan.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {formatPrice(
                            yearlyBilling ? Math.round(plan.price * 12 * 0.8) : plan.price,
                            plan.currency
                          )}
                          <span className="text-xs ml-1">
                            {yearlyBilling ? t('perYear') : t('perMonth')}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getAllFeatures().map((feature, index) => (
                    <tr 
                      key={feature.id}
                      className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}
                    >
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                          <span>{feature.title}</span>
                          {feature.info && (
                            <div className="relative group ml-1">
                              <FiInfo className="h-4 w-4 text-gray-400" />
                              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 text-xs w-48 z-10">
                                {feature.info}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      {plans.map(plan => {
                        const planFeature = getFeatureById(plan, feature.id);
                        
                        return (
                          <td 
                            key={`${plan.id}-${feature.id}`} 
                            className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
                              plan.highlighted ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                          >
                            {planFeature?.included ? (
                              <FiCheck className="h-5 w-5 text-green" />
                            ) : (
                              <FiX className="h-5 w-5 text-gray-400" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">{t('faqTitle')}</h3>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left font-medium"
                >
                  <span>{faq.question}</span>
                  {expandedFaqs.includes(index) ? (
                    <FiChevronUp className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 flex-shrink-0" />
                  )}
                </button>
                {expandedFaqs.includes(index) && (
                  <div className="mt-2 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingTable; 