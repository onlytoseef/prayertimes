'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../context/LanguageContext';

interface City {
  slug: string;
  name: string;
  nameAr: string;
}

interface Country {
  name: string;
  nameAr: string;
  cities: City[];
}

interface OtherCitiesPropsOld {
  currentCitySlug: string;
  countrySlug: string;
  countryName: string;
  countryNameAr: string;
  cities: City[];
  language?: Language;
  currentCity?: never;
  country?: never;
}

interface OtherCitiesPropsNew {
  currentCity: City;
  country: Country;
  countrySlug: string;
  language?: Language;
  currentCitySlug?: never;
  countryName?: never;
  countryNameAr?: never;
  cities?: never;
}

type OtherCitiesProps = OtherCitiesPropsOld | OtherCitiesPropsNew;

export default function OtherCities(props: OtherCitiesProps) {
  const { language: contextLanguage, t } = useLanguage();
  const language = props.language || contextLanguage;
  
  // Handle both prop formats
  const currentCitySlug = 'currentCity' in props ? props.currentCity.slug : props.currentCitySlug;
  const countrySlug = props.countrySlug;
  const countryName = 'country' in props ? props.country.name : props.countryName;
  const countryNameAr = 'country' in props ? props.country.nameAr : props.countryNameAr;
  const cities = 'country' in props ? props.country.cities : props.cities;
  
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
                href={language === 'ar' ? `/${countrySlug}/${city.slug}-prayertime` : `/${language}/${countrySlug}/${city.slug}-prayertime`}
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
