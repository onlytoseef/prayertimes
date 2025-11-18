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
  
  // Handle both prop formats with proper type guards
  const currentCitySlug = 'currentCity' in props && props.currentCity !== undefined 
    ? props.currentCity.slug 
    : props.currentCitySlug!;
  const countrySlug = props.countrySlug;
  const countryName = 'country' in props && props.country !== undefined 
    ? props.country.name 
    : props.countryName!;
  const countryNameAr = 'country' in props && props.country !== undefined 
    ? props.country.nameAr 
    : props.countryNameAr!;
  const cities = 'country' in props && props.country !== undefined 
    ? props.country.cities 
    : props.cities!;
  
  const otherCities = cities.filter(city => city.slug !== currentCitySlug);
  
  if (otherCities.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800 font-[var(--font-tajawal)]">
            {language === 'ar' 
              ? `مواقيت الصلاة في مدن ${countryNameAr} الأخرى`
              : language === 'ur'
              ? `${countryName} کے دیگر شہروں میں نماز کے اوقات`
              : `Prayer times in other cities of ${countryName}`}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {otherCities.map((city) => (
              <Link
                key={city.slug}
                href={language === 'ar' ? `/${countrySlug}/${city.slug}-prayertime` : `/${language}/${countrySlug}/${city.slug}-prayertime`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border-2 border-transparent hover:border-emerald-500 group"
              >
                <div className="text-center">
                  <p className="text-base sm:text-lg font-bold text-gray-800 font-[var(--font-tajawal)] group-hover:text-emerald-600 transition-colors leading-tight">
                    {language === 'ar'
                      ? `مواقيت الصلاة في ${city.nameAr}`
                      : language === 'ur'
                      ? `${city.nameAr} میں نماز کے اوقات`
                      : `Prayer time in ${city.name}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
