import { Calendar } from 'lucide-react';
import type { Language } from '../context/LanguageContext';

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

interface MonthlyPrayerTimesServerProps {
  cityName: string;
  cityNameAr: string;
  monthlyData: Array<{
    date: Date;
    timings: any;
  }>;
  language: Language;
}

export default function MonthlyPrayerTimesServer({ 
  cityName, 
  cityNameAr, 
  monthlyData,
  language
}: MonthlyPrayerTimesServerProps) {
  
  const formatTime = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    return `${hours}:${minutes}`;
  };

  const monthNames = {
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ur: ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'],
    de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    fa: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
    id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    tr: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
  };

  const prayerTimes: MonthlyPrayerTime[] = monthlyData.map(item => {
    const date = new Date(item.date);
    const month = language === 'ar' ? monthNames.ar[date.getMonth()]
      : language === 'ur' ? monthNames.ur[date.getMonth()]
      : language === 'de' ? monthNames.de[date.getMonth()]
      : language === 'es' ? monthNames.es[date.getMonth()]
      : language === 'fa' ? monthNames.fa[date.getMonth()]
      : language === 'id' ? monthNames.id[date.getMonth()]
      : language === 'tr' ? monthNames.tr[date.getMonth()]
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

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-4 md:p-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-emerald-600" />
          <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 font-[var(--font-tajawal)]">
            {language === 'ar' 
              ? `مواقيت الصلاة لـ 30 يوم القادمة في ${cityNameAr}`
              : language === 'ur'
              ? `${cityNameAr} میں اگلے 30 دنوں کے نماز کے اوقات`
              : language === 'de'
              ? `Gebetszeiten für die nächsten 30 Tage in ${cityName}`
              : language === 'fr'
              ? `Horaires de prière pour les 30 prochains jours à ${cityName}`
              : language === 'es'
              ? `Horarios de oración para los próximos 30 días en ${cityName}`
              : language === 'fa'
              ? `اوقات نماز 30 روز آینده در ${cityNameAr}`
              : language === 'id'
              ? `Waktu Sholat 30 Hari Mendatang di ${cityName}`
              : language === 'tr'
              ? `Gelecek 30 Gün ${cityName} Namaz Vakitleri`
              : `Next 30 Days ${cityName} Prayer Times`}
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-[var(--font-tajawal)]">
          {language === 'ar'
            ? 'جدول كامل لمواقيت الصلاة اليومية للشهر القادم'
            : language === 'ur'
            ? 'اگلے مہینے کے روزانہ نماز کے اوقات کی مکمل جدول'
            : language === 'de'
            ? 'Vollständiger Zeitplan der täglichen Gebetszeiten für den nächsten Monat'
            : language === 'fr'
            ? 'Programme complet des horaires de prière quotidiens pour le mois prochain'
            : language === 'es'
            ? 'Programa completo de horarios de oración diarios para el próximo mes'
            : language === 'fa'
            ? 'برنامه کامل اوقات نماز روزانه برای ماه آینده'
            : language === 'id'
            ? 'Jadwal lengkap waktu sholat harian untuk bulan depan'
            : language === 'tr'
            ? 'Gelecek ay için günlük namaz vakitlerinin eksiksiz programı'
            : 'Complete schedule of daily prayer times for the next month'}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="w-full border-collapse min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
              <th className="px-1 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'التاريخ' : language === 'ur' ? 'تاریخ' : language === 'de' ? 'Datum' : language === 'fr' ? 'Date' : language === 'es' ? 'Fecha' : language === 'fa' ? 'تاریخ' : language === 'id' ? 'Tanggal' : language === 'tr' ? 'Tarih' : 'Date'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'الفجر' : language === 'ur' ? 'فجر' : language === 'de' ? 'Fadschr' : language === 'fr' ? 'Fajr' : language === 'es' ? 'Fajr' : language === 'fa' ? 'صبح' : language === 'id' ? 'Subuh' : language === 'tr' ? 'İmsak' : 'Fajr'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'الشروق' : language === 'ur' ? 'طلوع' : language === 'de' ? 'Sonnenaufgang' : language === 'fr' ? 'Lever' : language === 'es' ? 'Amanecer' : language === 'fa' ? 'طلوع آفتاب' : language === 'id' ? 'Terbit' : language === 'tr' ? 'Güneş' : 'Sunrise'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'الظهر' : language === 'ur' ? 'ظہر' : language === 'de' ? 'Dhuhr' : language === 'fr' ? 'Dhuhr' : language === 'es' ? 'Dhuhr' : language === 'fa' ? 'ظهر' : language === 'id' ? 'Dzuhur' : language === 'tr' ? 'Öğle' : 'Dhuhr'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'العصر' : language === 'ur' ? 'عصر' : language === 'de' ? 'Asr' : language === 'fr' ? 'Asr' : language === 'es' ? 'Asr' : language === 'fa' ? 'عصر' : language === 'id' ? 'Ashar' : language === 'tr' ? 'İkindi' : 'Asr'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'المغرب' : language === 'ur' ? 'مغرب' : language === 'de' ? 'Maghrib' : language === 'fr' ? 'Maghrib' : language === 'es' ? 'Maghrib' : language === 'fa' ? 'مغرب' : language === 'id' ? 'Maghrib' : language === 'tr' ? 'Akşam' : 'Maghrib'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] whitespace-nowrap">
                {language === 'ar' ? 'العشاء' : language === 'ur' ? 'عشاء' : language === 'de' ? 'Ischaa' : language === 'fr' ? 'Isha' : language === 'id' ? 'Isya' : language === 'tr' ? 'Yatsı' : 'Isha'}
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
                <td className="px-1 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 text-left text-[9px] sm:text-xs md:text-sm font-semibold text-gray-800 font-[var(--font-tajawal)] border-r border-gray-200 whitespace-nowrap">
                  {prayer.date}
                </td>
                <td className="px-1 py-1.5 sm:px-2 sm:py-2 md:px-4 md:py-3 text-center border-r border-gray-200 whitespace-nowrap">
                  <span className="text-[9px] sm:text-xs md:text-sm font-semibold text-black block">{prayer.fajr}</span>
                </td>
                <td className="px-1 py-1.5 sm:px-2 sm:py-2 md:px-4 md:py-3 text-center border-r border-gray-200 whitespace-nowrap">
                  <span className="text-[9px] sm:text-xs md:text-sm font-semibold text-black block">{prayer.sunrise}</span>
                </td>
                <td className="px-1 py-1.5 sm:px-2 sm:py-2 md:px-4 md:py-3 text-center border-r border-gray-200 whitespace-nowrap">
                  <span className="text-[9px] sm:text-xs md:text-sm font-semibold text-black block">{prayer.dhuhr}</span>
                </td>
                <td className="px-1 py-1.5 sm:px-2 sm:py-2 md:px-4 md:py-3 text-center border-r border-gray-200 whitespace-nowrap">
                  <span className="text-[9px] sm:text-xs md:text-sm font-semibold text-black block">{prayer.asr}</span>
                </td>
                <td className="px-1 py-1.5 sm:px-2 sm:py-2 md:px-4 md:py-3 text-center border-r border-gray-200 whitespace-nowrap">
                  <span className="text-[9px] sm:text-xs md:text-sm font-semibold text-black block">{prayer.maghrib}</span>
                </td>
                <td className="px-1 py-1.5 sm:px-2 sm:py-2 md:px-4 md:py-3 text-center whitespace-nowrap">
                  <span className="text-[9px] sm:text-xs md:text-sm font-semibold text-black block">{prayer.isha}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
