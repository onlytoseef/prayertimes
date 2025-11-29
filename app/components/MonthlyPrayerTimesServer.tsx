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
    ur: ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر']
  };

  const prayerTimes: MonthlyPrayerTime[] = monthlyData.map(item => {
    const date = new Date(item.date);
    const month = language === 'ar' || language === 'ur' 
      ? monthNames[language][date.getMonth()]
      : monthNames.en[date.getMonth()];
    
    const formattedDate = language === 'ar' || language === 'ur'
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
              : `Next 30 Days ${cityName} Prayer Times`}
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-[var(--font-tajawal)]">
          {language === 'ar'
            ? 'جدول كامل لمواقيت الصلاة اليومية للشهر القادم'
            : language === 'ur'
            ? 'اگلے مہینے کے روزانہ نماز کے اوقات کی مکمل جدول'
            : 'Complete schedule of daily prayer times for the next month'}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="w-full border-collapse min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
              <th className="px-1 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'التاريخ' : language === 'ur' ? 'تاریخ' : 'Date'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'الفجر' : language === 'ur' ? 'فجر' : 'Fajr'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'الشروق' : language === 'ur' ? 'طلوع' : 'Sunrise'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'الظهر' : language === 'ur' ? 'ظہر' : 'Dhuhr'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'العصر' : language === 'ur' ? 'عصر' : 'Asr'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] border-r border-emerald-600 whitespace-nowrap">
                {language === 'ar' ? 'المغرب' : language === 'ur' ? 'مغرب' : 'Maghrib'}
              </th>
              <th className="px-1 py-2 sm:px-2 sm:py-3 md:px-4 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold font-[var(--font-tajawal)] whitespace-nowrap">
                {language === 'ar' ? 'العشاء' : language === 'ur' ? 'عشاء' : 'Isha'}
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

      {/* Footer Note */}
      <div className="mt-4 sm:mt-6 bg-emerald-50 rounded-lg p-3 sm:p-4 border border-emerald-200">
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center font-[var(--font-tajawal)] leading-relaxed">
          {language === 'ar'
            ? 'جميع الأوقات محلية ومحسوبة وفقًا للطريقة الإسلامية القياسية. قد تختلف الأوقات الفعلية قليلاً حسب المسجد المحلي.'
            : language === 'ur'
            ? 'تمام اوقات مقامی ہیں اور معیاری اسلامی طریقہ کار کے مطابق شمار کیے گئے ہیں۔ مقامی مسجد کے مطابق اصل اوقات قدرے مختلف ہو سکتے ہیں۔'
            : 'All times are local and calculated according to standard Islamic method. Actual times may vary slightly depending on local mosque.'}
        </p>
      </div>
    </div>
  );
}
