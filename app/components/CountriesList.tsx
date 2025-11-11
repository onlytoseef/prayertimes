'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';
import countriesData from '@/data/countries.json';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../context/LanguageContext';

interface CountriesListProps {
  language?: Language;
}

export default function CountriesList({ language: propLanguage }: CountriesListProps) {
  const { t, language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage;
  
  const countries = Object.entries(countriesData).map(([slug, country]) => ({
    ...country,
    slug,
  }));

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 font-[var(--font-tajawal)] mb-2">
          {t('countriesTitle')}
        </h2>
        <p className="text-sm text-gray-500 font-[var(--font-tajawal)] mt-2">
          {t('countriesDescription')}
        </p>
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {countries.map((country) => (
          <Link
            key={country.slug}
            href={`/${language}/${country.slug}`}
            className="group p-4 rounded-lg border-2 bg-white border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all hover:scale-105 text-center"
          >
            <div className="text-4xl mb-2">{country.flag}</div>
            <div className="font-semibold mb-1 font-[var(--font-tajawal)] text-sm text-gray-800 group-hover:text-emerald-600 transition-colors">
              {language === 'en' ? country.name : country.nameAr}
            </div>
            <div className="text-xs text-gray-400 mt-2">
              {country.cities.length} {language === 'ar' || language === 'ur' ? 'مدينة' : (country.cities.length === 1 ? 'city' : 'cities')}
            </div>
          </Link>
        ))}
      </div>

      {/* Info Message */}
      <div className="text-center py-8 mt-8 border-t border-gray-200">
        <Globe className="w-12 h-12 mx-auto mb-3 text-emerald-600" />
        <p className="font-[var(--font-tajawal)] text-gray-700 mb-1">
          {t('countriesDescription')}
        </p>
      </div>
    </div>
  );
}
