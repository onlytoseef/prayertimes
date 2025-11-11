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
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 md:p-8 mb-8 border border-emerald-100">
      <div className="flex items-start gap-3 mb-4">
        <Info className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-[var(--font-tajawal)]">
            {language === 'en' ? `About ${cityName}` : language === 'ur' ? `${cityNameAr} کے بارے میں` : `عن ${cityNameAr}`}
          </h2>
          <p className="text-gray-700 leading-relaxed font-[var(--font-tajawal)] text-base md:text-lg">
            {description}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-emerald-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-sm text-gray-600 font-[var(--font-tajawal)]">
                {language === 'en' ? 'Location' : language === 'ur' ? 'مقام' : 'الموقع'}
              </p>
              <p className="font-semibold text-gray-800 font-[var(--font-tajawal)]">
                {language === 'en' ? cityName : cityNameAr}, {countryName}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-sm text-gray-600 font-[var(--font-tajawal)]">
                {language === 'en' ? 'Updated' : language === 'ur' ? 'اپ ڈیٹ' : 'تحديث'}
              </p>
              <p className="font-semibold text-gray-800">
                {language === 'en' ? 'Daily' : language === 'ur' ? 'روزانہ' : 'يومياً'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO-friendly text */}
      <div className="mt-6 pt-6 border-t border-emerald-200">
        <p className="text-sm text-gray-600 leading-relaxed font-[var(--font-tajawal)]">
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
