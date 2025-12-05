'use client';

import { useLanguage } from '../context/LanguageContext';
import cityDescriptions from '@/data/cityDescriptions.json';
import { MapPin, Calendar, Info } from 'lucide-react';

interface CityDescriptionProps {
  countrySlug: string;
  citySlug: string;
  cityName: string;
  cityNameAr: string;
  countryName: string;
}

export default function CityDescription({ 
  countrySlug, 
  citySlug, 
  cityName, 
  cityNameAr,
  countryName 
}: CityDescriptionProps) {
  const { language } = useLanguage();

  // Get description from JSON
  const countryData = cityDescriptions[countrySlug as keyof typeof cityDescriptions];
  const cityData = countryData?.[citySlug as keyof typeof countryData];
  
  // If no description exists, show default
  const description = cityData?.[language as keyof typeof cityData] || cityData?.['en'];

  if (!description) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
      {/* Main Description Section */}
      <div className="flex items-start gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Info className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0 mt-1" />
        <div className="flex-1 min-w-0">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 font-[var(--font-tajawal)] leading-tight">
            {language === 'en' ? `About ${cityName}` : language === 'ur' ? `${cityNameAr} کے بارے میں` : language === 'de' ? `Über ${cityName}` : language === 'fr' ? `À propos de ${cityName}` : language === 'es' ? `Acerca de ${cityName}` : language === 'fa' ? `درباره ${cityName}` : language === 'id' ? `Tentang ${cityName}` : `عن ${cityNameAr}`}
          </h2>
          <p className="text-gray-700 leading-relaxed font-[var(--font-tajawal)] text-sm xs:text-base sm:text-lg md:text-xl break-words">
            {description}
          </p>
        </div>
      </div>

      {/* Additional Info - Responsive Grid */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-emerald-200">
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 bg-white/60 rounded-lg p-3">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 font-[var(--font-tajawal)] mb-0.5">
                {language === 'en' ? 'Location' : language === 'ur' ? 'مقام' : language === 'de' ? 'Standort' : language === 'fr' ? 'Emplacement' : language === 'es' ? 'Ubicación' : language === 'fa' ? 'مکان' : language === 'id' ? 'Lokasi' : 'الموقع'}
              </p>
              <p className="font-semibold text-gray-800 font-[var(--font-tajawal)] text-sm sm:text-base truncate">
                {language === 'en' ? cityName : cityNameAr}, {countryName}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 bg-white/60 rounded-lg p-3">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 font-[var(--font-tajawal)] mb-0.5">
                {language === 'en' ? 'Updated' : language === 'ur' ? 'اپ ڈیٹ' : language === 'de' ? 'Aktualisiert' : language === 'fr' ? 'Mis à jour' : language === 'es' ? 'Actualizado' : language === 'fa' ? 'به‌روزرسانی شده' : language === 'id' ? 'Diperbarui' : 'تحديث'}
              </p>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {language === 'en' ? 'Daily' : language === 'ur' ? 'روزانہ' : language === 'de' ? 'Täglich' : language === 'fr' ? 'Quotidien' : language === 'es' ? 'Diario' : language === 'fa' ? 'روزانه' : language === 'id' ? 'Harian' : 'يومياً'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO-friendly text - Responsive Typography */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-emerald-200">
        <p className="text-xs xs:text-sm sm:text-base leading-relaxed text-gray-600 font-[var(--font-tajawal)] break-words">
          {language === 'en' 
            ? `Prayer times for ${cityName} are calculated using the most accurate astronomical methods. Our timings include Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha prayers, updated daily with the Hijri calendar. Whether you're a resident or visitor, you can rely on these prayer schedules for your daily worship.`
            : language === 'ur'
            ? `${cityNameAr} کے لیے نماز کے اوقات انتہائی درست فلکیاتی طریقوں سے شمار کیے جاتے ہیں۔ ہمارے اوقات میں فجر، طلوع آفتاب، ظہر، عصر، مغرب اور عشاء کی نمازیں شامل ہیں، جو روزانہ ہجری کیلنڈر کے ساتھ اپ ڈیٹ ہوتی ہیں۔`
            : `يتم حساب أوقات الصلاة في ${cityNameAr} باستخدام أدق الطرق الفلكية. تشمل أوقاتنا صلاة الفجر والشروق والظهر والعصر والمغرب والعشاء، ويتم تحديثها يومياً مع التقويم الهجري.`
          }
        </p>
      </div>
    </div>
  );
}
