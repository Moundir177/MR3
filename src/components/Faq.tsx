'use client';

import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

const Faq: React.FC<FaqProps> = ({ items, title, subtitle }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className="max-w-3xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
        {items.map((item, index) => (
          <div key={index} className="py-5">
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full justify-between items-center text-left focus:outline-none"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.question}</h3>
              <span className="ml-6 flex-shrink-0 text-primary">
                {openIndex === index ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
              </span>
            </button>
            <div
              className={`mt-2 pr-12 transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-base text-gray-600 dark:text-gray-300">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq; 