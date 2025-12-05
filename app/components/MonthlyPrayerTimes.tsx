'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Loader } from 'lucide-react';

interface MonthlyPrayerTime {
  date: string;
  day: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

interface MonthlyPrayerTimesProps {
  cityName: string;
  cityNameAr: string;
  latitude: number;
  longitude: number;
  initialMonthlyData?: Array<{
    date: Date;
    timings: any;
  }>;
}

export default function MonthlyPrayerTimes({ 
  cityName, 
  cityNameAr, 
  latitude, 
  longitude,
  initialMonthlyData
}: MonthlyPrayerTimesProps) {
  const { language } = useLanguage();
  const [prayerTimes, setPrayerTimes] = useState<MonthlyPrayerTime[]>([]);
  const [loading, setLoading] = useState(!initialMonthlyData);

  const formatTime = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    // If we have initial data from server, use it
    if (initialMonthlyData && initialMonthlyData.length > 0) {
      const monthNames = {
        ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        ur: ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'],
        de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        fr: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        fa: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
        id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
      };

      const times = initialMonthlyData.map(item => {
        const date = new Date(item.date);
        const month = language === 'ar' ? monthNames.ar[date.getMonth()]
          : language === 'ur' ? monthNames.ur[date.getMonth()]
          : language === 'de' ? monthNames.de[date.getMonth()]
          : language === 'fr' ? monthNames.fr[date.getMonth()]
          : language === 'es' ? monthNames.es[date.getMonth()]
          : language === 'fa' ? monthNames.fa[date.getMonth()]
          : language === 'id' ? monthNames.id[date.getMonth()]
          : monthNames.en[date.getMonth()];
        
        const formattedDate = language === 'ar' || language === 'ur' || language === 'fa'
          ? `${date.getDate()} ${month}`
          : `${month} ${date.getDate()}`;

        return {
          date: formattedDate,
          day: date.getDate().toString().padStart(2, '0'),
          fajr: formatTime(item.timings.Fajr),
          sunrise: formatTime(item.timings.Sunrise),
          dhuhr: formatTime(item.timings.Dhuhr),
          asr: formatTime(item.timings.Asr),
          maghrib: formatTime(item.timings.Maghrib),
          isha: formatTime(item.timings.Isha),
        };
      });

      setPrayerTimes(times);
      setLoading(false);
      return;
    }

    // Fallback: Fetch from API if no initial data
    fetchMonthlyPrayerTimes();
  }, [latitude, longitude, initialMonthlyData, language]);

  const fetchMonthlyPrayerTimes = async () => {
    try {
      setLoading(true);
      const times: MonthlyPrayerTime[] = [];
      const today = new Date();
      
      const monthNames = {
        ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        ur: ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'],
        de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        fr: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        fa: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
        id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
      };
      
      // Fetch next 30 days
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const timestamp = Math.floor(date.getTime() / 1000);
        
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=4`
        );
        const data = await response.json();
        
        if (data.code === 200) {
          const month = language === 'ar' ? monthNames.ar[date.getMonth()]
            : language === 'ur' ? monthNames.ur[date.getMonth()]
            : language === 'de' ? monthNames.de[date.getMonth()]
            : language === 'fr' ? monthNames.fr[date.getMonth()]
            : language === 'es' ? monthNames.es[date.getMonth()]
            : language === 'fa' ? monthNames.fa[date.getMonth()]
            : language === 'id' ? monthNames.id[date.getMonth()]
            : monthNames.en[date.getMonth()];
          
          const formattedDate = language === 'ar' || language === 'ur' || language === 'fa'
            ? `${date.getDate()} ${month}`
            : `${month} ${date.getDate()}`;

          times.push({
            date: formattedDate,
            day: date.getDate().toString().padStart(2, '0'),
            fajr: formatTime(data.data.timings.Fajr),
            sunrise: formatTime(data.data.timings.Sunrise),
            dhuhr: formatTime(data.data.timings.Dhuhr),
            asr: formatTime(data.data.timings.Asr),
            maghrib: formatTime(data.data.timings.Maghrib),
            isha: formatTime(data.data.timings.Isha),
          });
        }
      }
      setPrayerTimes(times);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching monthly prayer times:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-8 text-center">
        <Loader className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-[var(--font-tajawal)]">
          {language === 'ar' ? 'جاري تحميل مواقيت الصلاة...' : language === 'ur' ? 'نماز کے اوقات لوڈ ہو رہے ہیں...' : language === 'de' ? 'Lädt Gebetszeiten...' : language === 'fr' ? 'Chargement des horaires de prière...' : language === 'es' ? 'Cargando horarios de oración...' : language === 'fa' ? 'در حال بارگذاری اوقات نماز...' : language === 'id' ? 'Memuat waktu sholat...' : 'Loading prayer times...'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 font-[var(--font-tajawal)]">
            {language === 'ar' 
              ? `مواقيت الصلاة لـ 30 يوم القادمة في ${cityNameAr}`
              : language === 'ur'
              ? `${cityNameAr} میں اگلے 30 دنوں کے نماز کے اوقات`
              : language === 'de'
              ? `Gebetszeiten f\u00fcr die n\u00e4chsten 30 Tage in ${cityName}`
              : language === 'fr'
              ? `Horaires de pri\u00e8re pour les 30 prochains jours \u00e0 ${cityName}`
              : language === 'es'
              ? `Horarios de oraci\u00f3n para los pr\u00f3ximos 30 d\u00edas en ${cityName}`
              : language === 'fa'
              ? `اوقات نماز 30 روز \u00c2ینده در ${cityNameAr}`
              : language === 'id'
              ? `Waktu Sholat 30 Hari Mendatang di ${cityName}`
              : language === 'tr'
              ? `Gelecek 30 G\u00fcn ${cityName} Namaz Vakitleri`
              : `Next 30 Days ${cityName} Prayer Times`}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-gray-600 font-[var(--font-tajawal)]">
          {language === 'ar'
            ? 'جدول كامل لمواقيت الصلاة اليومية للشهر القادم'
            : language === 'ur'
            ? 'اگلے مہینے کے روزانہ نماز کے اوقات کی مکمل جدول'
            : language === 'de'
            ? 'Vollst\u00e4ndiger Zeitplan der t\u00e4glichen Gebetszeiten f\u00fcr den n\u00e4chsten Monat'
            : language === 'fr'
            ? 'Programme complet des horaires de pri\u00e8re quotidiens pour le mois prochain'
            : language === 'es'
            ? 'Programa completo de horarios de oraci\u00f3n diarios para el pr\u00f3ximo mes'
            : language === 'fa'
            ? 'برنامه کامل اوقات نماز روزانه برای ماه \u00c2ینده'
            : language === 'id'
            ? 'Jadwal lengkap waktu sholat harian untuk bulan depan'
            : language === 'tr'
            ? 'Gelecek ay i\u00e7in g\u00fcnl\u00fck namaz vakitlerinin eksiksiz program\u0131'
            : 'Complete schedule of daily prayer times for the next month'}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
              <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs sm:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600">
                {language === 'ar' ? 'التاريخ' : language === 'ur' ? 'تاریخ' : language === 'de' ? 'Datum' : language === 'es' ? 'Fecha' : language === 'fa' ? 'تاریخ' : language === 'id' ? 'Tanggal' : language === 'tr' ? 'Tarih' : 'Date'}
              </th>
              <th className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600">
                {language === 'ar' ? 'الفجر' : language === 'ur' ? 'فجر' : language === 'de' ? 'Fadschr' : language === 'es' ? 'Fajr' : language === 'fa' ? 'صبح' : language === 'id' ? 'Subuh' : language === 'tr' ? 'İmsak' : 'Fajr'}
              </th>
              <th className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600">
                {language === 'ar' ? 'الشروق' : language === 'ur' ? 'طلوع' : language === 'de' ? 'Sonnenaufgang' : language === 'es' ? 'Amanecer' : language === 'fa' ? 'طلوع آفتاب' : language === 'id' ? 'Terbit' : language === 'tr' ? 'Güneş' : 'Sunrise'}
              </th>
              <th className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600">
                {language === 'ar' ? 'الظهر' : language === 'ur' ? 'ظہر' : language === 'de' ? 'Dhuhr' : language === 'es' ? 'Dhuhr' : language === 'fa' ? 'ظهر' : language === 'id' ? 'Dzuhur' : language === 'tr' ? 'Öğle' : 'Dhuhr'}
              </th>
              <th className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600">
                {language === 'ar' ? 'العصر' : language === 'ur' ? 'عصر' : language === 'de' ? 'Asr' : language === 'fa' ? 'عصر' : language === 'id' ? 'Ashar' : language === 'tr' ? 'İkindi' : 'Asr'}
              </th>
              <th className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600">
                {language === 'ar' ? 'المغرب' : language === 'ur' ? 'مغرب' : language === 'de' ? 'Maghrib' : language === 'fa' ? 'مغرب' : language === 'id' ? 'Maghrib' : language === 'tr' ? 'Akşam' : 'Maghrib'}
              </th>
              <th className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-bold font-[var(--font-tajawal)]">
                {language === 'ar' ? 'العشاء' : language === 'ur' ? 'عشاء' : language === 'de' ? 'Ischaa' : language === 'fa' ? 'عشا' : language === 'id' ? 'Isya' : language === 'tr' ? 'Yatsı' : 'Isha'}
              </th>
            </tr>
          </thead>
          <tbody>
            {prayerTimes.map((prayer, index) => (
              <tr 
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-pink-50'
                } hover:bg-emerald-50 transition-colors border-b border-gray-200`}
              >
                <td className="px-3 py-3 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 font-[var(--font-tajawal)] border-r border-gray-200">
                  {prayer.date}
                </td>
                <td className="px-3 py-3 sm:px-4 sm:py-3 text-center border-r border-gray-200">
                  <span className="text-xs sm:text-sm font-semibold text-black">{prayer.fajr.split(' ')[0]}</span>
                  <span className="text-[10px] sm:text-xs text-emerald-600 ml-1">{prayer.fajr.split(' ')[1]}</span>
                </td>
                <td className="px-3 py-3 sm:px-4 sm:py-3 text-center border-r border-gray-200">
                  <span className="text-xs sm:text-sm font-semibold text-black">{prayer.sunrise.split(' ')[0]}</span>
                  <span className="text-[10px] sm:text-xs text-emerald-600 ml-1">{prayer.sunrise.split(' ')[1]}</span>
                </td>
                <td className="px-3 py-3 sm:px-4 sm:py-3 text-center border-r border-gray-200">
                  <span className="text-xs sm:text-sm font-semibold text-black">{prayer.dhuhr.split(' ')[0]}</span>
                  <span className="text-[10px] sm:text-xs text-emerald-600 ml-1">{prayer.dhuhr.split(' ')[1]}</span>
                </td>
                <td className="px-3 py-3 sm:px-4 sm:py-3 text-center border-r border-gray-200">
                  <span className="text-xs sm:text-sm font-semibold text-black">{prayer.asr.split(' ')[0]}</span>
                  <span className="text-[10px] sm:text-xs text-emerald-600 ml-1">{prayer.asr.split(' ')[1]}</span>
                </td>
                <td className="px-3 py-3 sm:px-4 sm:py-3 text-center border-r border-gray-200">
                  <span className="text-xs sm:text-sm font-semibold text-black">{prayer.maghrib.split(' ')[0]}</span>
                  <span className="text-[10px] sm:text-xs text-emerald-600 ml-1">{prayer.maghrib.split(' ')[1]}</span>
                </td>
                <td className="px-3 py-3 sm:px-4 sm:py-3 text-center">
                  <span className="text-xs sm:text-sm font-semibold text-black">{prayer.isha.split(' ')[0]}</span>
                  <span className="text-[10px] sm:text-xs text-emerald-600 ml-1">{prayer.isha.split(' ')[1]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
