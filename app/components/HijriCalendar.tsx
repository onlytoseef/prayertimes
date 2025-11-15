'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CalendarDay {
  gregorianDay: number;
  gregorianMonth: string;
  gregorianYear: number;
  hijriDay: number;
  hijriMonth: string;
  hijriMonthEn: string;
  hijriYear: number;
  gregorianDate: string;
  weekDay: string;
  weekDayAr: string;
  isToday: boolean;
}

export default function HijriCalendar() {
  const { t, language } = useLanguage();
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [currentHijriMonth, setCurrentHijriMonth] = useState('');
  const [currentHijriYear, setCurrentHijriYear] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCalendarData();
  }, []);

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

  const fetchCalendarData = async () => {
    try {
      setLoading(true);
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      
      // Get number of days in current month
      const daysInMonth = new Date(year, month, 0).getDate();
      const days: CalendarDay[] = [];

      // Fetch data for each day of the month
      for (let day = 1; day <= Math.min(daysInMonth, 30); day++) {
        const date = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
        const response = await fetch(
          `https://api.aladhan.com/v1/gToH/${date}`
        );
        const data = await response.json();
        
        if (data.code === 200) {
          const hijri = data.data.hijri;
          const gregorian = data.data.gregorian;
          
          days.push({
            gregorianDay: day,
            gregorianMonth: gregorian.month.en,
            gregorianYear: year,
            hijriDay: parseInt(hijri.day),
            hijriMonth: hijri.month.ar,
            hijriMonthEn: hijri.month.en,
            hijriYear: parseInt(hijri.year),
            gregorianDate: date,
            weekDay: gregorian.weekday.en,
            weekDayAr: hijri.weekday.ar,
            isToday: day === today.getDate(),
          });

          if (day === 1) {
            setCurrentMonth(gregorian.month.en);
            setCurrentYear(year.toString());
            setCurrentHijriMonth(hijri.month.ar);
            setCurrentHijriYear(hijri.year);
          }
        }
      }
      
      setCalendarDays(days);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching calendar:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-4 sm:p-5 md:p-6 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-[var(--font-tajawal)]">
            {t('hijriCalendarTitle')}
          </h2>
        </div>
        {currentMonth && (
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
            <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
              <span className="font-semibold font-[var(--font-tajawal)]">{getMonthTranslation(currentMonth)} {currentYear}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
              <span className="font-semibold font-[var(--font-tajawal)]">{currentHijriMonth} {currentHijriYear}</span>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 sm:py-16">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-[var(--font-tajawal)]">جاري التحميل...</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-amber-500">
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm md:text-base font-bold text-gray-800 font-[var(--font-tajawal)]">
                    {t('day')}
                  </th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm md:text-base font-bold text-gray-800 font-[var(--font-tajawal)]">
                    {t('gregorian')}
                  </th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm md:text-base font-bold text-gray-800 font-[var(--font-tajawal)]">
                    {t('hijri')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {calendarDays.map((day, index) => (
                  <tr 
                    key={index}
                    className={`
                      border-b border-gray-100 transition-colors duration-200
                      ${day.isToday 
                        ? 'bg-amber-50' 
                        : 'hover:bg-gray-50'
                      }
                    `}
                  >
                    {/* Week Day */}
                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                      <div className="text-center">
                        <div className={`text-xs sm:text-sm md:text-base font-semibold font-[var(--font-tajawal)] ${day.isToday ? 'text-amber-700' : 'text-gray-800'}`}>
                          {language === 'ar' || language === 'ur' ? day.weekDayAr : day.weekDay}
                        </div>
                      </div>
                    </td>
                    
                    {/* Gregorian Date */}
                    <td className="px-3 py-2">
                      <div className="text-center">
                        <div className={`text-base font-bold ${day.isToday ? 'text-amber-700' : 'text-gray-800'}`}>
                          {day.gregorianDay}
                        </div>
                      </div>
                    </td>
                    
                    {/* Hijri Date */}
                    <td className="px-3 py-2">
                      <div className="text-center">
                        <div className={`text-base font-bold font-[var(--font-tajawal)] ${day.isToday ? 'text-amber-700' : 'text-emerald-700'}`}>
                          {day.hijriDay}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Today Indicator */}
          {calendarDays.some(d => d.isToday) && (
            <div className="bg-amber-50 px-4 py-2 text-center border-t border-amber-200">
              <div className="flex items-center justify-center gap-2 text-xs text-amber-800">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="font-semibold font-[var(--font-tajawal)]">{language === 'ar' || language === 'ur' ? 'اليوم' : 'Today'}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
