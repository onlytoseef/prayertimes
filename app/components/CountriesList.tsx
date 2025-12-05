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
            : language === 'de'
            ? 'Wählen Sie Ihr Land aus der Liste unten aus, um genaue Gebetszeiten für alle Städte anzuzeigen. Wir bieten Gebetszeiten für über 29 islamische Länder weltweit.'
            : language === 'fr'
            ? 'Sélectionnez votre pays dans la liste ci-dessous pour afficher les horaires de prière précis pour toutes les villes. Nous fournissons les horaires de prière pour plus de 29 pays islamiques du monde entier.'
            : language === 'es'
            ? 'Seleccione su país de la lista a continuación para ver horarios de oración precisos para todas las ciudades. Proporcionamos horarios de oración para más de 29 países islámicos en todo el mundo.'
            : language === 'fa'
            ? 'کشور خود را از لیست زیر انتخاب کنید تا اوقات دقیق نماز برای تمام شهرها را مشاهده کنید. ما اوقات نماز را برای بیش از 29 کشور اسلامی در سراسر جهان ارائه می‌دهیم.'
            : language === 'id'
            ? 'Pilih negara Anda dari daftar di bawah ini untuk melihat waktu sholat yang akurat untuk semua kota. Kami menyediakan waktu sholat untuk lebih dari 29 negara Islam di seluruh dunia.'
            : language === 'tr'
            ? 'Tüm şehirler için doğru namaz vakitlerini görüntülemek için aşağıdaki listeden ülkenizi seçin. Dünya çapında 29\'dan fazla İslam ülkesi için namaz vakitleri sağlıyoruz.'
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
                : language === 'de'
                ? 'Suchen Sie Ihr Land...'
                : language === 'fr'
                ? 'Recherchez votre pays...'
                : language === 'es'
                ? 'Busque su país...'
                : language === 'id'
                ? 'Cari negara Anda...'
                : language === 'tr'
                ? 'Ülkenizi arayın...'
                : 'Search for your country...'}
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
              : language === 'de'
              ? `${filteredCountries.length} ${filteredCountries.length === 1 ? 'Land' : 'L\u00e4nder'} gefunden`
              : language === 'es'
              ? `${filteredCountries.length} ${filteredCountries.length === 1 ? 'país' : 'países'} encontrado${filteredCountries.length === 1 ? '' : 's'}`
              : `Found ${filteredCountries.length} ${filteredCountries.length === 1 ? 'country' : 'countries'}`}
          </p>
        )}
      </div>

      {/* Statistics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 sm:mb-10">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md text-center border-2 border-emerald-100">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">{filteredCountries.length}</p>
          <p className="text-xs sm:text-sm text-gray-600 font-[var(--font-tajawal)]">
            {language === 'ar' ? 'دولة' : language === 'ur' ? 'ممالک' : language === 'de' ? 'L\u00e4nder' : language === 'fr' ? 'Pays' : language === 'es' ? 'Países' : 'Countries'}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md text-center border-2 border-emerald-100">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">
            {filteredCountries.reduce((sum, c) => sum + c.cities.length, 0)}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 font-[var(--font-tajawal)]">
            {language === 'ar' ? 'مدينة' : language === 'ur' ? 'شہر' : language === 'de' ? 'St\u00e4dte' : language === 'fr' ? 'Villes' : language === 'es' ? 'Ciudades' : 'Cities'}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md text-center border-2 border-emerald-100">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">5</p>
          <p className="text-xs sm:text-sm text-gray-600 font-[var(--font-tajawal)]">
            {language === 'ar' ? 'صلوات' : language === 'ur' ? 'نمازیں' : language === 'de' ? 'Gebete' : language === 'fr' ? 'Pri\u00e8res' : language === 'es' ? 'Oraciones' : 'Prayers'}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md text-center border-2 border-emerald-100">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">24/7</p>
          <p className="text-xs sm:text-sm text-gray-600 font-[var(--font-tajawal)]">
            {language === 'ar' ? 'تحديث' : language === 'ur' ? 'اپ ڈیٹ' : language === 'de' ? 'Aktualisiert' : language === 'fr' ? 'Mis à jour' : language === 'es' ? 'Actualizado' : language === 'fa' ? 'به‌روزرسانی' : language === 'id' ? 'Diperbarui' : language === 'tr' ? 'Güncellendi' : 'Updated'}
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
                    : language === 'de'
                    ? 'Gebetszeiten in'
                    : language === 'fr'
                    ? 'Horaires de prière en'
                    : language === 'es'
                    ? 'Horarios de oración en'
                    : language === 'fa'
                    ? 'اوقات نماز در'
                    : language === 'id'
                    ? 'Waktu sholat di'
                    : language === 'tr'
                    ? 'Namaz vakitleri'
                    : 'Prayer Times in'}
                </p>
                
                {/* Country Name */}
                <h3 className="font-bold mb-1 sm:mb-2 font-[var(--font-tajawal)] text-sm sm:text-base md:text-lg text-gray-800 group-hover:text-emerald-600 transition-colors leading-tight">
                  {language === 'ar' || language === 'ur' || language === 'fa' ? country.nameAr : country.name}
                </h3>
                
                {/* City Count Badge */}
                <div className="inline-flex items-center gap-1 bg-emerald-50 group-hover:bg-emerald-100 px-2 py-1 rounded-full transition-colors">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span className="text-[10px] sm:text-xs text-emerald-700 font-semibold">
                    {country.cities.length} {language === 'ar' ? 'مدينة' : language === 'ur' ? 'شہر' : language === 'de' ? (country.cities.length === 1 ? 'Stadt' : 'Städte') : language === 'fr' ? (country.cities.length === 1 ? 'ville' : 'villes') : language === 'es' ? (country.cities.length === 1 ? 'ciudad' : 'ciudades') : language === 'fa' ? 'شهر' : language === 'id' ? 'kota' : language === 'tr' ? 'şehir' : (country.cities.length === 1 ? 'city' : 'cities')}
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
                : language === 'de'
                ? 'Keine Ergebnisse gefunden'
                : language === 'fr'
                ? 'Aucun r\u00e9sultat trouv\u00e9'
                : language === 'es'
                ? 'No se encontraron resultados'
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
              : language === 'de'
              ? 'Präzise Gebetszeiten weltweit'
              : language === 'fr'
              ? 'Horaires de prière précis dans le monde entier'
              : language === 'es'
              ? 'Horarios de oración precisos en todo el mundo'
              : language === 'fa'
              ? 'اوقات دقیق نماز در سراسر جهان'
              : language === 'id'
              ? 'Waktu Sholat Akurat di Seluruh Dunia'
              : language === 'tr'
              ? 'Dünya Çapında Doğru Namaz Vakitleri'
              : 'Accurate Prayer Times Worldwide'}
          </h3>
          <p className="text-emerald-50 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-[var(--font-tajawal)]">
            {language === 'ar'
              ? 'نوفر أوقات الصلاة الدقيقة بناءً على موقعك الجغرافي، محدثة يومياً مع التقويم الهجري واتجاه القبلة لكل مدينة.'
              : language === 'ur'
              ? 'ہم آپ کے جغرافیائی محل وقوع کی بنیاد پر درست نماز کے اوقات فراہم کرتے ہیں، جو روزانہ ہجری کیلنڈر اور ہر شہر کے لیے قبلہ کی سمت کے ساتھ اپ ڈیٹ ہوتے ہیں۔'
              : language === 'de'
              ? 'Wir bieten präzise Gebetszeiten basierend auf Ihrem geografischen Standort, täglich aktualisiert mit dem islamischen Kalender und der Qibla-Richtung für jede Stadt.'
              : language === 'fr'
              ? 'Nous fournissons des horaires de prière précis basés sur votre localisation géographique, mis à jour quotidiennement avec le calendrier hégirien et la direction de la Qibla pour chaque ville.'
              : language === 'es'
              ? 'Proporcionamos horarios de oración precisos basados en su ubicación geográfica, actualizados diariamente con el calendario hegírico y la dirección de la Qibla para cada ciudad.'
              : language === 'fa'
              ? 'ما اوقات دقیق نماز را بر اساس موقعیت جغرافیایی شما ارائه می‌دهیم، که روزانه با تقویم هجری و جهت قبله برای هر شهر به‌روزرسانی می‌شود.'
              : language === 'id'
              ? 'Kami menyediakan waktu sholat yang akurat berdasarkan lokasi geografis Anda, diperbarui setiap hari dengan kalender Hijriah dan arah Kiblat untuk setiap kota.'
              : language === 'tr'
              ? 'Coğrafi konumunuza göre doğru namaz vakitlerini sağlıyoruz, her şehir için Hicri takvim ve Kıble yönü ile günlük olarak güncellenir.'
              : 'We provide accurate prayer times based on your geographical location, updated daily with Hijri calendar and Qibla direction for every city.'}
          </p>
        </div>
      </footer>
    </section>
  );
}
