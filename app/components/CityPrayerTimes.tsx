'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Sunrise, CloudSun, Sunset, Moon, Calendar } from 'lucide-react';

interface PrayerTime {
  name: string;
  nameAr: string;
  nameUr: string;
  time: string;
  time24: string;
  icon: React.ReactNode;
}

interface CityPrayerTimesProps {
  cityName: string;
  cityNameAr: string;
  latitude: number;
  longitude: number;
  initialPrayerTimes?: any;
  initialHijriDate?: string;
  initialGregorianDate?: string;
}

export default function CityPrayerTimes({ 
  cityName, 
  cityNameAr, 
  latitude, 
  longitude,
  initialPrayerTimes,
  initialHijriDate,
  initialGregorianDate
}: CityPrayerTimesProps) {
  const { language } = useLanguage();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [hijriDate, setHijriDate] = useState(initialHijriDate || '');
  const [gregorianDate, setGregorianDate] = useState(initialGregorianDate || '');
  const [loading, setLoading] = useState(!initialPrayerTimes);

  // Convert 24-hour to 12-hour format with AM/PM
  const formatTime = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  const formatTime24 = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    // If we have initial data from server, use it
    if (initialPrayerTimes) {
      const prayers: PrayerTime[] = [
        {
          name: 'Fajr',
          nameAr: 'الفجر',
          nameUr: 'فجر',
          time: formatTime(initialPrayerTimes.Fajr),
          time24: initialPrayerTimes.Fajr,
          icon: <Sunrise className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
        },
        {
          name: 'Sunrise',
          nameAr: 'الشروق',
          nameUr: 'طلوع',
          time: formatTime(initialPrayerTimes.Sunrise),
          time24: initialPrayerTimes.Sunrise,
          icon: <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />,
        },
        {
          name: 'Dhuhr',
          nameAr: 'الظهر',
          nameUr: 'ظہر',
          time: formatTime(initialPrayerTimes.Dhuhr),
          time24: initialPrayerTimes.Dhuhr,
          icon: <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />,
        },
        {
          name: 'Asr',
          nameAr: 'العصر',
          nameUr: 'عصر',
          time: formatTime(initialPrayerTimes.Asr),
          time24: initialPrayerTimes.Asr,
          icon: <CloudSun className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />,
        },
        {
          name: 'Maghrib',
          nameAr: 'المغرب',
          nameUr: 'مغرب',
          time: formatTime(initialPrayerTimes.Maghrib),
          time24: initialPrayerTimes.Maghrib,
          icon: <Sunset className="w-6 h-6 sm:w-8 sm:h-8 text-orange-700" />,
        },
        {
          name: 'Isha',
          nameAr: 'العشاء',
          nameUr: 'عشاء',
          time: formatTime(initialPrayerTimes.Isha),
          time24: initialPrayerTimes.Isha,
          icon: <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-700" />,
        },
      ];

      setPrayerTimes(prayers);
      setLoading(false);
      return;
    }

    // Fallback: Fetch from API if no initial data
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4`
        );
        const data = await response.json();

        if (data.code === 200) {
          const timings = data.data.timings;
          const date = data.data.date;

          const prayers: PrayerTime[] = [
            {
              name: 'Fajr',
              nameAr: 'الفجر',
              nameUr: 'فجر',
              time: formatTime(timings.Fajr),
              time24: timings.Fajr,
              icon: <Sunrise className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
            },
            {
              name: 'Sunrise',
              nameAr: 'الشروق',
              nameUr: 'طلوع',
              time: formatTime(timings.Sunrise),
              time24: timings.Sunrise,
              icon: <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />,
            },
            {
              name: 'Dhuhr',
              nameAr: 'الظهر',
              nameUr: 'ظہر',
              time: formatTime(timings.Dhuhr),
              time24: timings.Dhuhr,
              icon: <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />,
            },
            {
              name: 'Asr',
              nameAr: 'العصر',
              nameUr: 'عصر',
              time: formatTime(timings.Asr),
              time24: timings.Asr,
              icon: <CloudSun className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />,
            },
            {
              name: 'Maghrib',
              nameAr: 'المغرب',
              nameUr: 'مغرب',
              time: formatTime(timings.Maghrib),
              time24: timings.Maghrib,
              icon: <Sunset className="w-6 h-6 sm:w-8 sm:h-8 text-orange-700" />,
            },
            {
              name: 'Isha',
              nameAr: 'العشاء',
              nameUr: 'عشاء',
              time: formatTime(timings.Isha),
              time24: timings.Isha,
              icon: <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-700" />,
            },
          ];

          setPrayerTimes(prayers);
          setHijriDate(`${date.hijri.day} ${date.hijri.month.ar} ${date.hijri.year}`);
          setGregorianDate(`${date.readable}`);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error);
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [latitude, longitude, initialPrayerTimes]);

  // Find next prayer and calculate countdown
  useEffect(() => {
    if (prayerTimes.length === 0) return;

    const updateCountdown = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      // Find next prayer
      let next = null;
      for (const prayer of prayerTimes) {
        const [hours, minutes] = prayer.time24.split(':').map(Number);
        const prayerMinutes = hours * 60 + minutes;
        
        if (prayerMinutes > currentTime) {
          next = prayer;
          break;
        }
      }

      // If no prayer found today, use first prayer of tomorrow
      if (!next) {
        next = prayerTimes[0];
      }

      setNextPrayer(next);

      // Calculate time difference
      const [hours, minutes] = next.time24.split(':').map(Number);
      let targetTime = new Date(now);
      targetTime.setHours(hours, minutes, 0, 0);

      // If target time is in the past, add one day
      if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const diff = targetTime.getTime() - now.getTime();
      const totalSeconds = Math.floor(diff / 1000);
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

      setCountdown({ hours: hrs, minutes: mins, seconds: secs });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-6">
        {/* Skeleton - Header with Dates */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b-2 border-gray-200">
          <div className="flex-1 w-full sm:w-auto">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-2 animate-pulse w-3/4"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse w-1/2"></div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse w-32"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse w-24"></div>
          </div>
        </div>

        {/* Skeleton - Next Prayer Card */}
        <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 animate-pulse">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-right flex-1">
              <div className="h-4 bg-white/40 rounded mb-2 w-24 mx-auto sm:mx-0"></div>
              <div className="h-10 bg-white/40 rounded mb-2 w-32 mx-auto sm:mx-0"></div>
              <div className="h-6 bg-white/40 rounded w-28 mx-auto sm:mx-0"></div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 sm:p-6 min-w-[200px]">
              <div className="h-4 bg-white/40 rounded mb-2 w-20 mx-auto"></div>
              <div className="h-12 bg-white/40 rounded mb-2 w-40 mx-auto"></div>
              <div className="h-3 bg-white/40 rounded w-16 mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Skeleton - Prayer Times Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-4 sm:p-5 animate-pulse">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-3 w-20 mx-auto"></div>
              <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 w-16 mx-auto"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-12 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Skeleton - Sunrise Badge */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-6 h-6 bg-yellow-200 rounded-full"></div>
              <div>
                <div className="h-4 bg-yellow-200 rounded w-20 mb-2"></div>
                <div className="h-3 bg-yellow-200 rounded w-24"></div>
              </div>
            </div>
            <div className="h-6 bg-yellow-200 rounded w-20"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-sm text-gray-500 animate-pulse">
            {language === 'ar' ? 'جاري تحميل مواقيت الصلاة...' : language === 'ur' ? 'نماز کے اوقات لوڈ ہو رہے ہیں...' : 'Loading prayer times...'}
          </p>
        </div>
      </div>
    );
  }

  const getPrayerName = (prayer: PrayerTime) => {
    return language === 'ar' ? prayer.nameAr : language === 'ur' ? prayer.nameUr : prayer.name;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-6">
      {/* Header with Dates */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b-2 border-gray-200">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 font-[var(--font-tajawal)]">
            {language === 'ar' ? `أوقات الصلاة في ${cityNameAr}` : language === 'ur' ? `${cityName} میں نماز کے اوقات` : `Prayer Times in ${cityName}`}
          </h2>
        </div>
        <div className="flex flex-col items-start sm:items-end text-right">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-semibold font-[var(--font-tajawal)]">{hijriDate}</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{gregorianDate}</p>
        </div>
      </div>

      {/* Next Prayer Countdown - Featured Card */}
      {nextPrayer && (
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Next Prayer Info */}
            <div className="text-center sm:text-right flex-1">
              <p className="text-sm sm:text-base text-emerald-100 mb-1 font-[var(--font-tajawal)]">
                {language === 'ar' ? 'الصلاة التالية' : language === 'ur' ? 'اگلی نماز' : 'Next Prayer'}
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 font-[var(--font-tajawal)]">
                {getPrayerName(nextPrayer)}
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold">
                {formatTime24(nextPrayer.time24)}
              </p>
            </div>

            {/* Right: Live Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 min-w-[200px]">
              <p className="text-xs sm:text-sm text-emerald-100 text-center mb-2 font-[var(--font-tajawal)]">
                {language === 'ar' ? 'الوقت المتبقي' : language === 'ur' ? 'باقی وقت' : 'Time Remaining'}
              </p>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-center font-mono tracking-tight">
                {String(countdown.hours).padStart(2, '0')}:
                {String(countdown.minutes).padStart(2, '0')}:
                {String(countdown.seconds).padStart(2, '0')}
              </div>
              <p className="text-xs text-emerald-100 text-center mt-2">
                {formatTime24(nextPrayer.time24)} {language === 'ar' ? 'ص' : 'AM'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Prayer Times Grid - Horizontal Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {prayerTimes.filter(p => p.name !== 'Sunrise').map((prayer, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl p-4 sm:p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              nextPrayer?.name === prayer.name
                ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg ring-2 ring-emerald-400'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              {/* Prayer Name */}
              <h3 className={`text-base sm:text-lg font-bold mb-2 font-[var(--font-tajawal)] ${
                nextPrayer?.name === prayer.name ? 'text-white' : 'text-gray-800'
              }`}>
                {getPrayerName(prayer)}
              </h3>
              
              {/* Prayer Time */}
              <p className={`text-xl sm:text-2xl font-bold font-mono ${
                nextPrayer?.name === prayer.name ? 'text-white' : 'text-gray-700'
              }`}>
                {formatTime24(prayer.time24)}
              </p>
              
              {/* AM/PM */}
              <p className={`text-xs mt-1 ${
                nextPrayer?.name === prayer.name ? 'text-emerald-100' : 'text-gray-500'
              }`}>
                {prayer.time.split(' ')[1]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sunrise Info - Separate Badge */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700 font-[var(--font-tajawal)]">
                {language === 'ar' ? 'الشروق' : language === 'ur' ? 'طلوع آفتاب' : 'Sunrise'}
              </p>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'وقت الشروق' : language === 'ur' ? 'سورج نکلنے کا وقت' : 'Sun Rise Time'}
              </p>
            </div>
          </div>
          <p className="text-lg sm:text-xl font-bold text-gray-800 font-mono">
            {formatTime24(prayerTimes.find(p => p.name === 'Sunrise')?.time24 || '')}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-gray-200 text-center text-xs sm:text-sm text-gray-500 space-y-1 font-[var(--font-tajawal)]">
       
        <p className="text-emerald-600">
          {language === 'ar'
            ? `الفجر ${formatTime24(prayerTimes[0]?.time24 || '')} درجة حتى 18.0 درجة حتى 18.0`
            : language === 'ur'
            ? `الفجر ${formatTime24(prayerTimes[0]?.time24 || '')} تک 18.0 ڈگری تک 18.0 ڈگری`
            : `Fajr ${formatTime24(prayerTimes[0]?.time24 || '')} up to 18.0 degrees up to 18.0 degrees`}
        </p>
      </div>

      {/* Azan Time Card - Matching Prayer Time Card Style */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-6 mt-8">
        {/* Header with Dates */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b-2 border-gray-200">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 font-[var(--font-tajawal)]">
              {language === 'ar' ? `أوقات الأذان في ${cityNameAr}` : language === 'ur' ? `${cityName} میں اذان کے اوقات` : `Azan Time in ${cityName}`}
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end text-right">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-semibold font-[var(--font-tajawal)]">{hijriDate}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{gregorianDate}</p>
          </div>
        </div>

        {/* Azan Times Grid - Matching Prayer Times Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {prayerTimes.filter(p => p.name !== 'Sunrise').map((prayer) => {
            const isNext = nextPrayer?.name === prayer.name;
            return (
              <div
                key={prayer.name}
                className={`relative rounded-lg shadow-md p-4 sm:p-5 md:p-6 text-center transition-all duration-300 hover:scale-105 overflow-hidden ${
                  isNext
                    ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-emerald-300'
                    : 'bg-white hover:shadow-xl'
                }`}
              >
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  {prayer.icon}
                </div>

                {/* Decorative Background */}
                {!isNext && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full"></div>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Prayer Name */}
                  <h3 className={`text-base sm:text-lg font-bold mb-2 font-[var(--font-tajawal)] ${
                    isNext ? 'text-white' : 'text-gray-800'
                  }`}>
                    {getPrayerName(prayer)}
                  </h3>
                  
                  {/* Prayer Time */}
                  <p className={`text-xl sm:text-2xl font-bold font-mono ${
                    isNext ? 'text-white' : 'text-gray-700'
                  }`}>
                    {formatTime24(prayer.time24)}
                  </p>
                  
                  {/* AM/PM */}
                  <p className={`text-xs mt-1 ${
                    isNext ? 'text-emerald-100' : 'text-gray-500'
                  }`}>
                    {prayer.time.split(' ')[1]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Azan Info Note */}
        <div className="pt-4 border-t border-gray-200 text-center">
          <p className="text-xs sm:text-sm text-gray-600 font-[var(--font-tajawal)] leading-relaxed">
            {language === 'ar'
              ? `أوقات الأذان في ${cityNameAr} هي نفسها أوقات الصلاة. يتم رفع الأذان عند دخول وقت كل صلاة من الصلوات الخمس.`
              : language === 'ur'
              ? `${cityName} میں اذان کے اوقات نماز کے اوقات کے برابر ہیں۔ ہر نماز کے وقت داخل ہونے پر اذان دی جاتی ہے۔`
              : `Azan times in ${cityName} are the same as prayer times. The call to prayer (Azan) is made at the beginning of each of the five daily prayers.`}
          </p>
        </div>
      </div>
    </div>
  );
}
