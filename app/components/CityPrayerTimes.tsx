'use client';

import { useEffect, useState } from 'react';
import { Sun, Sunrise, CloudSun, Sunset, Moon, Calendar } from 'lucide-react';

interface PrayerTime {
  name: string;
  nameAr: string;
  time: string;
  icon: React.ReactNode;
}

interface CityPrayerTimesProps {
  cityName: string;
  cityNameAr: string;
  latitude: number;
  longitude: number;
}

export default function CityPrayerTimes({ cityName, cityNameAr, latitude, longitude }: CityPrayerTimesProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [hijriDate, setHijriDate] = useState('');
  const [gregorianDate, setGregorianDate] = useState('');
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
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4`
        );
        const data = await response.json();

        if (data.code === 200) {
          const timings = data.data.timings;
          const date = data.data.date;

          setPrayerTimes([
            {
              name: 'Fajr',
              nameAr: 'الفجر',
              time: formatTime(timings.Fajr),
              icon: <Sunrise className="w-8 h-8 text-blue-600" />,
            },
            {
              name: 'Dhuhr',
              nameAr: 'الظهر',
              time: formatTime(timings.Dhuhr),
              icon: <Sun className="w-8 h-8 text-yellow-600" />,
            },
            {
              name: 'Asr',
              nameAr: 'العصر',
              time: formatTime(timings.Asr),
              icon: <CloudSun className="w-8 h-8 text-orange-500" />,
            },
            {
              name: 'Maghrib',
              nameAr: 'المغرب',
              time: formatTime(timings.Maghrib),
              icon: <Sunset className="w-8 h-8 text-orange-700" />,
            },
            {
              name: 'Isha',
              nameAr: 'العشاء',
              time: formatTime(timings.Isha),
              icon: <Moon className="w-8 h-8 text-indigo-700" />,
            },
          ]);

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
  }, [latitude, longitude]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-emerald-100">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-[var(--font-tajawal)]">
          {cityNameAr}
        </h2>
        <h3 className="text-xl md:text-2xl text-gray-600 mb-4">{cityName}</h3>
        
        <div className="flex items-center justify-center gap-2 text-emerald-700 mb-2">
          <Calendar className="w-5 h-5" />
          <p className="text-lg font-semibold font-[var(--font-tajawal)]">{hijriDate}</p>
        </div>
        <p className="text-gray-600">{gregorianDate}</p>
      </div>

      {/* Prayer Times */}
      <div className="space-y-4">
        {prayerTimes.map((prayer, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-white rounded-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-md">
                {prayer.icon}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 font-[var(--font-tajawal)]">
                  {prayer.nameAr}
                </h4>
                <p className="text-gray-600">{prayer.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-emerald-700 font-mono">
                {prayer.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Location Info */}
      <div className="mt-6 pt-6 border-t-2 border-emerald-100 text-center text-sm text-gray-500">
        <p>Coordinates: {latitude.toFixed(4)}°, {longitude.toFixed(4)}°</p>
        <p className="mt-1">Calculation Method: Umm Al-Qura University, Makkah</p>
      </div>
    </div>
  );
}
