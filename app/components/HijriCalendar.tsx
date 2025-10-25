'use client';

import { useState, useEffect } from 'react';

interface CalendarDay {
  gregorianDay: number;
  hijriDay: number;
  hijriMonth: string;
  hijriMonthEn: string;
  gregorianDate: string;
  isToday: boolean;
}

export default function HijriCalendar() {
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentHijriMonth, setCurrentHijriMonth] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCalendarData();
  }, []);

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
            hijriDay: parseInt(hijri.day),
            hijriMonth: hijri.month.ar,
            hijriMonthEn: hijri.month.en,
            gregorianDate: date,
            isToday: day === today.getDate(),
          });

          if (day === 1) {
            setCurrentMonth(gregorian.month.en);
            setCurrentHijriMonth(hijri.month.ar);
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
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 font-[var(--font-tajawal)] mb-2">
          التقويم الهجري والميلادي
        </h2>
        <p className="text-gray-600">Gregorian & Hijri Calendar</p>
        {currentMonth && (
          <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
            <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold">
              {currentMonth}
            </span>
            <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold font-[var(--font-tajawal)]">
              {currentHijriMonth}
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">جاري تحميل التقويم...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer
                ${day.isToday 
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-700 text-white shadow-lg' 
                  : 'bg-gray-50 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                }
              `}
            >
              {/* Gregorian Date */}
              <div className={`text-center mb-2 ${day.isToday ? 'text-white' : 'text-gray-800'}`}>
                <div className="text-2xl font-bold">{day.gregorianDay}</div>
                <div className="text-xs opacity-75">Gregorian</div>
              </div>
              
              {/* Divider */}
              <div className={`border-t ${day.isToday ? 'border-white/30' : 'border-gray-300'} my-2`}></div>
              
              {/* Hijri Date */}
              <div className={`text-center ${day.isToday ? 'text-white' : 'text-emerald-700'}`}>
                <div className="text-xl font-bold font-[var(--font-tajawal)]">{day.hijriDay}</div>
                <div className="text-xs opacity-75 font-[var(--font-tajawal)]">هجري</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex justify-center items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded"></div>
          <span>اليوم (Today)</span>
        </div>
      </div>
    </div>
  );
}
