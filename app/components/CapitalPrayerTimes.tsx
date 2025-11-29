'use client';

import { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface CapitalPrayerTimesProps {
  cityName: string;
  cityNameAr: string;
  latitude: number;
  longitude: number;
  countryName: string;
  countryNameAr: string;
}

export default function CapitalPrayerTimes({ 
  cityName, 
  cityNameAr, 
  latitude, 
  longitude,
  countryName,
  countryNameAr
}: CapitalPrayerTimesProps) {
  const { language, t } = useLanguage();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState<string>('');
  const [gregorianDate, setGregorianDate] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const getMonthTranslation = (monthName: string): string => {
    const monthMap: { [key: string]: string } = {
      'January': 'january',
      'February': 'february',
      'March': 'march',
      'April': 'april',
      'May': 'may',
      'June': 'june',
      'July': 'july',
      'August': 'august',
      'September': 'september',
      'October': 'october',
      'November': 'november',
      'December': 'december',
    };
    
    const key = monthMap[monthName];
    return key ? t(key) : monthName;
  };

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4`
        );
        const data = await response.json();
        
        if (data.code === 200) {
          setPrayerTimes(data.data.timings);
          
          // Format Hijri date
          const hijri = data.data.date.hijri;
          const hijriFormatted = language === 'ar' 
            ? `${hijri.day} ${hijri.month.ar} ${hijri.year}`
            : language === 'ur'
            ? `${hijri.day} ${hijri.month.ar} ${hijri.year}`
            : `${hijri.day} ${hijri.month.en} ${hijri.year}`;
          setHijriDate(hijriFormatted);

          // Format Gregorian date
          const greg = data.data.date.gregorian;
          const monthName = getMonthTranslation(greg.month.en);
          const gregFormatted = `${greg.day} ${monthName} ${greg.year}`;
          setGregorianDate(gregFormatted);
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [latitude, longitude, language]);

  const prayerNames = {
    ar: {
      Fajr: 'الفجر',
      Dhuhr: 'الظهر',
      Asr: 'العصر',
      Maghrib: 'المغرب',
      Isha: 'العشاء'
    },
    en: {
      Fajr: 'Fajr',
      Dhuhr: 'Dhuhr',
      Asr: 'Asr',
      Maghrib: 'Maghrib',
      Isha: 'Isha'
    },
    ur: {
      Fajr: 'فجر',
      Dhuhr: 'ظہر',
      Asr: 'عصر',
      Maghrib: 'مغرب',
      Isha: 'عشاء'
    }
  };

  const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-32 mx-auto mb-8"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!prayerTimes) return null;

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-[var(--font-tajawal)]">
                {language === 'ar' 
                  ? `مواقيت الصلاة في ${cityNameAr}`
                  : language === 'ur'
                  ? `${cityName} میں نماز کے اوقات`
                  : `Prayer Times in ${cityName}`}
              </h2>
            </div>
            
            <p className="text-gray-600 text-sm sm:text-base mb-2">
              {language === 'ar'
                ? `عاصمة ${countryNameAr}`
                : language === 'ur'
                ? `${countryName} کا دارالحکومت`
                : `Capital of ${countryName}`}
            </p>

            {/* Dates */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-[var(--font-tajawal)]">{gregorianDate}</span>
              </div>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="font-[var(--font-tajawal)]">{hijriDate}</span>
            </div>
          </div>

          {/* Prayer Times Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {prayers.map((prayer) => (
              <div
                key={prayer}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-5 border-2 border-emerald-100 hover:border-emerald-300"
              >
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-2 font-[var(--font-tajawal)]">
                    {prayerNames[language][prayer]}
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
                    {prayerTimes[prayer]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sunrise Info */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-50 border-2 border-yellow-200 rounded-lg px-4 py-2">
              <span className="text-sm font-semibold text-gray-700">
                {language === 'ar' ? 'الشروق' : language === 'ur' ? 'طلوع آفتاب' : 'Sunrise'}:
              </span>
              <span className="text-lg font-bold text-yellow-600">
                {prayerTimes.Sunrise}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
