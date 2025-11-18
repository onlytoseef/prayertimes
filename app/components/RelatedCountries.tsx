'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../context/LanguageContext';
import countriesData from '@/data/countries.json';
import relatedCountriesData from '@/data/relatedCountries.json';

interface RelatedCountriesProps {
  currentCountrySlug: string;
  language?: Language;
}

export default function RelatedCountries({ currentCountrySlug, language: propLanguage }: RelatedCountriesProps) {
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage;

  const relatedSlugs = relatedCountriesData[currentCountrySlug as keyof typeof relatedCountriesData] || [];
  
  // Get first 6 related countries
  const relatedCountries = relatedSlugs
    .slice(0, 6)
    .map(slug => ({
      slug,
      ...countriesData[slug as keyof typeof countriesData]
    }))
    .filter(Boolean);

  if (relatedCountries.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-emerald-600" />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 font-[var(--font-tajawal)]">
                {language === 'ar' 
                  ? 'الدول ذات الصلة'
                  : language === 'ur'
                  ? 'متعلقہ ممالک'
                  : 'Related Countries'}
              </h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-[var(--font-tajawal)]">
              {language === 'ar'
                ? 'اكتشف مواقيت الصلاة في الدول المجاورة'
                : language === 'ur'
                ? 'قریبی ممالک میں نماز کے اوقات دریافت کریں'
                : 'Discover prayer times in neighboring countries'}
            </p>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedCountries.map((country) => (
              <Link
                key={country.slug}
                href={language === 'ar' ? `/${country.slug}` : `/${language}/${country.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 text-center border-2 border-transparent hover:border-emerald-500 hover:scale-105 transform"
              >
                {/* Flag */}
                <div className="text-4xl sm:text-5xl mb-3 transform group-hover:scale-110 transition-transform">
                  {country.flag}
                </div>
                
                {/* Country Name */}
                <h4 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-emerald-600 transition-colors mb-2 font-[var(--font-tajawal)] leading-tight">
                  {language === 'ar' || language === 'ur' ? country.nameAr : country.name}
                </h4>

                {/* Prayer Times Text */}
                <p className="text-xs text-gray-600 font-[var(--font-tajawal)]">
                  {language === 'ar'
                    ? 'مواقيت الصلاة'
                    : language === 'ur'
                    ? 'نماز کے اوقات'
                    : 'Prayer Times'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
