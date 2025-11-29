'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, MapPin, ChevronRight, Search } from 'lucide-react';
import countriesData from '@/data/countries.json';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../context/LanguageContext';

interface CountriesListProps {
  language?: Language;
}

export default function CountriesList({ language: propLanguage }: CountriesListProps) {
  const { t, language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage;
  const [searchQuery, setSearchQuery] = useState('');
  
  const countries = Object.entries(countriesData).map(([slug, country]) => ({
    ...country,
    slug,
  }));

  // Filter countries based on search query
  const filteredCountries = countries.filter((country) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    return (
      country.name.toLowerCase().includes(query) ||
      country.nameAr.includes(query) ||
      country.slug.toLowerCase().includes(query)
    );
  });

  return (
    <section 
      className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* SEO Header */}
      <header className="text-center mb-8 sm:mb-10 md:mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Globe className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-600" aria-hidden="true" />
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 font-[var(--font-tajawal)]"
            itemProp="name"
          >
            {t('countriesTitle')}
          </h2>
        </div>
        <p 
          className="text-base sm:text-lg md:text-xl text-gray-600 font-[var(--font-tajawal)] max-w-3xl mx-auto leading-relaxed"
          itemProp="description"
        >
          {language === 'ar'
            ? 'اختر دولتك من القائمة أدناه لعرض مواقيت الصلاة الدقيقة لجميع المدن. نوفر أوقات الصلاة لأكثر من 29 دولة إسلامية حول العالم.'
            : language === 'ur'
            ? 'تمام شہروں کے لیے درست نماز کے اوقات دیکھنے کے لیے نیچے سے اپنا ملک منتخب کریں۔ ہم دنیا بھر کے 29 سے زیادہ اسلامی ممالک کے نماز کے اوقات فراہم کرتے ہیں۔'
            : 'Select your country from the list below to view accurate prayer times for all cities. We provide prayer times for over 29 Islamic countries worldwide.'}
        </p>
      </header>

      {/* Search Bar */}
      <div className="mb-8 sm:mb-10 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'ar'
                ? 'ابحث عن بلدك...'
                : language === 'ur'
                ? 'اپنا ملک تلاش کریں...'
                : 'Search for your country...'
            }
            className="w-full pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-300 font-[var(--font-tajawal)] bg-white shadow-md"
            dir={language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'}
          />
        </div>
        {searchQuery && (
          <p className="text-sm sm:text-base text-gray-600 mt-3 font-[var(--font-tajawal)] text-center">
            {language === 'ar'
              ? `تم العثور على ${filteredCountries.length} دولة`
              : language === 'ur'
              ? `${filteredCountries.length} ممالک ملے`
              : `Found ${filteredCountries.length} ${filteredCountries.length === 1 ? 'country' : 'countries'}`}
          </p>
        )}
      </div>

      {/* Statistics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 sm:mb-10">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md text-center border-2 border-emerald-100">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">{filteredCountries.length}</p>
          <p className="text-xs sm:text-sm text-gray-600 font-[var(--font-tajawal)]">
            {language === 'ar' ? 'دولة' : language === 'ur' ? 'ممالک' : 'Countries'}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md text-center border-2 border-emerald-100">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">
            {filteredCountries.reduce((sum, c) => sum + c.cities.length, 0)}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 font-[var(--font-tajawal)]">
            {language === 'ar' ? 'مدينة' : language === 'ur' ? 'شہر' : 'Cities'}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md text-center border-2 border-emerald-100">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">5</p>
          <p className="text-xs sm:text-sm text-gray-600 font-[var(--font-tajawal)]">
            {language === 'ar' ? 'صلوات' : language === 'ur' ? 'نمازیں' : 'Prayers'}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md text-center border-2 border-emerald-100">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">24/7</p>
          <p className="text-xs sm:text-sm text-gray-600 font-[var(--font-tajawal)]">
            {language === 'ar' ? 'تحديث' : language === 'ur' ? 'اپ ڈیٹ' : 'Updated'}
          </p>
        </div>
      </div>

      {/* Countries Grid - SEO Enhanced */}
      <div 
        className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5"
        role="list"
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
          <article
            key={country.slug}
            className="group relative overflow-hidden"
            itemScope
            itemType="https://schema.org/Place"
            itemProp="itemListElement"
            role="listitem"
          >
            {/* Hidden SEO Data */}
            <meta itemProp="position" content={String(index + 1)} />
            <meta itemProp="name" content={country.name} />
            <meta itemProp="alternateName" content={country.nameAr} />
            
            <Link
              href={language === 'ar' ? `/${country.slug}` : `/${language}/${country.slug}`}
              className="block p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 bg-white border-gray-200 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-center flex flex-col items-center justify-center min-h-[130px] sm:min-h-[150px] md:min-h-[160px] relative"
            >
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              {/* Content */}
              <div className="relative z-10 w-full">
                {/* Flag Image */}
                <div className="mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`}
                    alt={`${country.name} flag`}
                    className="w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 object-cover rounded-md mx-auto shadow-md"
                    loading="lazy"
                  />
                </div>
                
                {/* Prayer Times Title */}
                <p className="text-[10px] sm:text-xs text-emerald-600 font-semibold mb-1 font-[var(--font-tajawal)]">
                  {language === 'ar' 
                    ? 'مواقيت الصلاة في' 
                    : language === 'ur' 
                    ? 'نماز کے اوقات' 
                    : 'Prayer Times in'}
                </p>
                
                {/* Country Name */}
                <h3 className="font-bold mb-1 sm:mb-2 font-[var(--font-tajawal)] text-sm sm:text-base md:text-lg text-gray-800 group-hover:text-emerald-600 transition-colors leading-tight">
                  {language === 'en' ? country.name : country.nameAr}
                </h3>
                
                {/* City Count Badge */}
                <div className="inline-flex items-center gap-1 bg-emerald-50 group-hover:bg-emerald-100 px-2 py-1 rounded-full transition-colors">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span className="text-[10px] sm:text-xs text-emerald-700 font-semibold">
                    {country.cities.length} {language === 'ar' ? 'مدينة' : language === 'ur' ? 'شہر' : (country.cities.length === 1 ? 'city' : 'cities')}
                  </span>
                </div>
                
                {/* Arrow Icon */}
                <ChevronRight className="w-5 h-5 text-emerald-600 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </article>
        ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Globe className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-lg text-gray-500 font-[var(--font-tajawal)]">
              {language === 'ar'
                ? 'لم يتم العثور على نتائج'
                : language === 'ur'
                ? 'کوئی نتیجہ نہیں ملا'
                : 'No results found'}
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA Section */}
      <footer className="text-center py-6 sm:py-8 md:py-10 mt-8 sm:mt-10 md:mt-12 border-t-2 border-emerald-200">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl">
          <Globe className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 text-white" />
          <h3 className="font-bold text-white text-xl sm:text-2xl md:text-3xl mb-3 font-[var(--font-tajawal)]">
            {language === 'ar'
              ? 'مواقيت الصلاة الدقيقة لجميع أنحاء العالم'
              : language === 'ur'
              ? 'پوری دنیا کے لیے درست نماز کے اوقات'
              : 'Accurate Prayer Times Worldwide'}
          </h3>
          <p className="text-emerald-50 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-[var(--font-tajawal)]">
            {language === 'ar'
              ? 'نوفر أوقات الصلاة الدقيقة بناءً على موقعك الجغرافي، محدثة يومياً مع التقويم الهجري واتجاه القبلة لكل مدينة.'
              : language === 'ur'
              ? 'ہم آپ کے جغرافیائی محل وقوع کی بنیاد پر درست نماز کے اوقات فراہم کرتے ہیں، جو روزانہ ہجری کیلنڈر اور ہر شہر کے لیے قبلہ کی سمت کے ساتھ اپ ڈیٹ ہوتے ہیں۔'
              : 'We provide accurate prayer times based on your geographical location, updated daily with Hijri calendar and Qibla direction for every city.'}
          </p>
        </div>
      </footer>
    </section>
  );
}
