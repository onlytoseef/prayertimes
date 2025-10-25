'use client';

import { useState, useEffect } from 'react';
import { Church } from 'lucide-react';

interface PrayerTime {
  name: string;
  nameAr: string;
  time: string;
}

interface PrayerTimesProps {
  city: string;
  cityAr: string;
  country: string;
}

export default function PrayerTimesCard({ city, cityAr, country }: PrayerTimesProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [hijriDate, setHijriDate] = useState('');
  const [loading, setLoading] = useState(true);

  // Convert 24-hour to 12-hour format with AM/PM
  const formatTime = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, [city, country]);

  const fetchPrayerTimes = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=4`
      );
      const data = await response.json();
      
      if (data.code === 200) {
        const timings = data.data.timings;
        const date = data.data.date;
        
        setPrayerTimes([
          { name: 'Fajr', nameAr: 'الفجر', time: formatTime(timings.Fajr) },
          { name: 'Sunrise', nameAr: 'الشروق', time: formatTime(timings.Sunrise) },
          { name: 'Dhuhr', nameAr: 'الظهر', time: formatTime(timings.Dhuhr) },
          { name: 'Asr', nameAr: 'العصر', time: formatTime(timings.Asr) },
          { name: 'Maghrib', nameAr: 'المغرب', time: formatTime(timings.Maghrib) },
          { name: 'Isha', nameAr: 'العشاء', time: formatTime(timings.Isha) },
        ]);
        
        setHijriDate(`${date.hijri.day} ${date.hijri.month.ar} ${date.hijri.year}`);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold font-[var(--font-tajawal)] mb-1">{cityAr}</h3>
            <p className="text-emerald-100 text-sm">{city}</p>
          </div>
          <Church className="w-10 h-10 text-white" />
        </div>
        {hijriDate && (
          <p className="mt-3 text-sm text-emerald-50 font-[var(--font-tajawal)]">{hijriDate}</p>
        )}
      </div>

      {/* Prayer Times */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            <p className="mt-2 text-gray-600">جاري التحميل...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {prayerTimes.map((prayer, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <div>
                  <span className="text-lg font-semibold text-gray-800 font-[var(--font-tajawal)]">
                    {prayer.nameAr}
                  </span>
                  <span className="text-sm text-gray-500 mr-2">({prayer.name})</span>
                </div>
                <span className="text-xl font-bold text-emerald-700 font-mono">
                  {prayer.time}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
