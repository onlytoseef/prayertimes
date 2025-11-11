'use client';

import { useState, useEffect } from 'react';
import { Sunrise, Sun, CloudSun, Sunset, Moon, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PrayerTime {
  nameKey: string;
  makkahTime: string;
  madinahTime: string;
  icon: React.ReactNode;
}

export default function HolyCitiesPrayerTable() {
  const { t, language } = useLanguage();
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
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        
        // Fetch Makkah prayer times
        const makkahResponse = await fetch(
          'https://api.aladhan.com/v1/timingsByCity?city=Makkah&country=SA&method=4'
        );
        const makkahData = await makkahResponse.json();
        
        // Fetch Madinah prayer times
        const madinahResponse = await fetch(
          'https://api.aladhan.com/v1/timingsByCity?city=Madinah&country=SA&method=4'
        );
        const madinahData = await madinahResponse.json();
        
        if (makkahData.code === 200 && madinahData.code === 200) {
          const makkahTimings = makkahData.data.timings;
          const madinahTimings = madinahData.data.timings;
          const date = makkahData.data.date;
          
          setPrayerTimes([
            {
              nameKey: 'fajr',
              makkahTime: formatTime(makkahTimings.Fajr),
              madinahTime: formatTime(madinahTimings.Fajr),
              icon: <Sunrise className="w-6 h-6 text-blue-600" />,
            },
            {
              nameKey: 'dhuhr',
              makkahTime: formatTime(makkahTimings.Dhuhr),
              madinahTime: formatTime(madinahTimings.Dhuhr),
              icon: <Sun className="w-6 h-6 text-yellow-600" />,
            },
            {
              nameKey: 'asr',
              makkahTime: formatTime(makkahTimings.Asr),
              madinahTime: formatTime(madinahTimings.Asr),
              icon: <CloudSun className="w-6 h-6 text-orange-500" />,
            },
            {
              nameKey: 'maghrib',
              makkahTime: formatTime(makkahTimings.Maghrib),
              madinahTime: formatTime(madinahTimings.Maghrib),
              icon: <Sunset className="w-6 h-6 text-orange-700" />,
            },
            {
              nameKey: 'isha',
              makkahTime: formatTime(makkahTimings.Isha),
              madinahTime: formatTime(madinahTimings.Isha),
              icon: <Moon className="w-6 h-6 text-indigo-700" />,
            },
          ]);
          
          setHijriDate(`${date.hijri.day} ${date.hijri.month.ar} ${date.hijri.year}`);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error);
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((item) => (
          <div key={item} className="bg-white rounded-xl shadow-lg p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Makkah Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-4 text-center">
          <h3 className="text-2xl font-bold mb-1 font-[var(--font-tajawal)]">
            {t('makkah')}
          </h3>
          {hijriDate && (
            <div className="flex items-center justify-center gap-2 text-emerald-50 mt-2 text-sm">
              <Calendar className="w-4 h-4" />
              <p className="font-semibold font-[var(--font-tajawal)]">{hijriDate}</p>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {prayerTimes.map((prayer, index) => (
                <tr 
                  key={index}
                  className={`border-b ${index === prayerTimes.length - 1 ? 'border-0' : 'border-gray-200'} hover:bg-emerald-50 transition-colors`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        {prayer.icon}
                      </div>
                      <div>
                        <div className="text-base font-bold text-gray-800 font-[var(--font-tajawal)]">
                          {t(prayer.nameKey)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="text-xl font-bold text-emerald-700 font-mono">
                      {prayer.makkahTime}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Madinah Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-4 text-center">
          <h3 className="text-2xl font-bold mb-1 font-[var(--font-tajawal)]">
            {t('madinah')}
          </h3>
          {hijriDate && (
            <div className="flex items-center justify-center gap-2 text-emerald-50 mt-2 text-sm">
              <Calendar className="w-4 h-4" />
              <p className="font-semibold font-[var(--font-tajawal)]">{hijriDate}</p>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {prayerTimes.map((prayer, index) => (
                <tr 
                  key={index}
                  className={`border-b ${index === prayerTimes.length - 1 ? 'border-0' : 'border-gray-200'} hover:bg-emerald-50 transition-colors`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        {prayer.icon}
                      </div>
                      <div>
                        <div className="text-base font-bold text-gray-800 font-[var(--font-tajawal)]">
                          {t(prayer.nameKey)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="text-xl font-bold text-emerald-700 font-mono">
                      {prayer.madinahTime}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
