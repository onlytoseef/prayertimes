'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../context/LanguageContext';

interface OtherCitiesProps {
  currentCitySlug: string;
  countrySlug: string;
  countryName: string;
  countryNameAr: string;
  cities: Array<{
    slug: string;
    name: string;
    nameAr: string;
  }>;
  language?: Language;
}

export default function OtherCities({ currentCitySlug, countrySlug, countryName, countryNameAr, cities, language: propLanguage }: OtherCitiesProps) {
  const { language: contextLanguage, t } = useLanguage();
  const language = propLanguage || contextLanguage;
  
  const otherCities = cities.filter(city => city.slug !== currentCitySlug);
  
  if (otherCities.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 font-[var(--font-tajawal)]">
            {t('otherCitiesIn')} {language === 'en' ? countryName : countryNameAr}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${language}/${countrySlug}/${city.slug}-prayertime`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-4 text-center group hover:scale-105 transform duration-200"
              >
                <p className="text-lg font-bold text-gray-800 mb-1 font-[var(--font-tajawal)] group-hover:text-emerald-600 transition-colors">
                  {language === 'en' ? city.name : city.nameAr}
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? city.nameAr : city.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
