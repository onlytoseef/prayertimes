'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../context/LanguageContext';
import type { ReactElement } from 'react';

interface FAQItem {
  question: { ar: string; en: string; ur: string; de: string; fr: string; es: string; fa: string; id: string; tr: string };
  answer: { ar: string; en: string; ur: string; de: string; fr: string; es: string; fa: string; id: string; tr: string } | { ar: ReactElement; en: ReactElement; ur: ReactElement; de: ReactElement; fr: ReactElement; es: ReactElement; fa: ReactElement; id: ReactElement; tr: ReactElement };
}

interface PrayerTimesFAQProps {
  language?: Language;
  cityName?: string;
  cityNameAr?: string;
  countryName?: string;
  countryNameAr?: string;
  prayerTimes?: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
}

export default function PrayerTimesFAQ({ 
  language: propLanguage,
  cityName = '',
  cityNameAr = '',
  countryName = '',
  countryNameAr = '',
  prayerTimes
}: PrayerTimesFAQProps) {
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Helper function to format 24-hour time to 12-hour with AM/PM
  const formatTime12Hour = (time24: string): string => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Get display names based on language
  const displayCityName = language === 'ar' || language === 'ur' || language === 'fa' ? cityNameAr : cityName;
  const displayCountryName = language === 'ar' || language === 'ur' || language === 'fa' ? countryNameAr : countryName;

  // Create dynamic first answer with prayer times list
  const firstAnswerWithTimes = prayerTimes ? {
    ar: (
      <div>
        <p className="mb-3">مواقيت الصلاة في {cityNameAr} في {countryNameAr} اليوم هي كالتالي. تشمل أوقات الصلاة الخمس اليومية والتي تحسب بين المصادر المختلفة ٪:</p>
        <ul className="list-none space-y-2 bg-emerald-50 p-4 rounded-lg">
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• الفجر:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Fajr}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• الظهر:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Dhuhr}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• العصر:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Asr}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• المغرب:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Maghrib}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• العشاء:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Isha}</span>
          </li>
        </ul>
      </div>
    ),
    en: (
      <div>
        <p className="mb-3">Prayer times in {cityName}, {countryName} today are as follows. These include the five daily prayers calculated with precision:</p>
        <ul className="list-none space-y-2 bg-emerald-50 p-4 rounded-lg">
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Fajr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Fajr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Dhuhr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Dhuhr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Asr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Asr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Maghrib:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Maghrib)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Isha:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Isha)}</span>
          </li>
        </ul>
      </div>
    ),
    ur: (
      <div>
        <p className="mb-3">{cityNameAr}، {countryNameAr} میں آج نماز کے اوقات درج ذیل ہیں۔ ان میں درستگی کے ساتھ شمار کی گئی پانچ روزانہ نمازیں شامل ہیں:</p>
        <ul className="list-none space-y-2 bg-emerald-50 p-4 rounded-lg">
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• فجر:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Fajr}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• ظہر:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Dhuhr}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• عصر:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Asr}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• مغرب:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Maghrib}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• عشاء:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Isha}</span>
          </li>
        </ul>
      </div>
    ),
    de: (
      <div>
        <p className="mb-3">Die Gebetszeiten in {cityName}, {countryName} heute sind wie folgt. Diese umfassen die fünf täglichen Gebete, die mit Präzision berechnet wurden:</p>
        <ul className="list-none space-y-2 bg-emerald-50 p-4 rounded-lg">
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Fadschr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Fajr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Dhuhr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Dhuhr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Asr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Asr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Maghrib:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Maghrib)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Ischaa:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Isha)}</span>
          </li>
        </ul>
      </div>
    ),
    fr: (
      <div>
        <p className="mb-3">Les horaires de prière à {cityName}, {countryName} aujourd'hui sont les suivants. Ceux-ci incluent les cinq prières quotidiennes calculées avec précision:</p>
        <ul className="list-none space-y-2 bg-emerald-50 p-4 rounded-lg">
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Fajr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Fajr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Dhuhr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Dhuhr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Asr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Asr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Maghrib:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Maghrib)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Isha:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Isha)}</span>
          </li>
        </ul>
      </div>
    ),
    es: (
      <div>
        <p className="mb-3">Los horarios de oración en {cityName}, {countryName} hoy son los siguientes. Estos incluyen las cinco oraciones diarias calculadas con precisión:</p>
        <ul className="list-none space-y-2 bg-emerald-50 p-4 rounded-lg">
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Fajr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Fajr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Dhuhr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Dhuhr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Asr:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Asr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Maghrib:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Maghrib)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Isha:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Isha)}</span>
          </li>
        </ul>
      </div>
    ),
    fa: (
      <div>
        <p className="mb-3">اوقات نماز امروز در {cityNameAr}، {countryName} به شرح زیر است. اینها شامل پنج نماز روزانه محاسبه شده با دقت هستند:</p>
        <ul className="list-none space-y-2 bg-emerald-50 p-4 rounded-lg">
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• صبح:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Fajr}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• ظهر:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Dhuhr}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• عصر:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Asr}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• مغرب:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Maghrib}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• عشا:</span>
            <span className="text-emerald-700 font-mono font-bold">{prayerTimes.Isha}</span>
          </li>
        </ul>
      </div>
    ),
    id: (
      <div>
        <p className="mb-3">Waktu sholat di {cityName}, {countryName} hari ini adalah sebagai berikut. Ini termasuk lima waktu sholat harian yang dihitung dengan presisi:</p>
        <ul className="list-none space-y-2 bg-emerald-50 p-4 rounded-lg">
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Subuh:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Fajr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Dzuhur:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Dhuhr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Ashar:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Asr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Maghrib:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Maghrib)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Isya:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Isha)}</span>
          </li>
        </ul>
      </div>
    ),
    tr: (
      <div>
        <p className="mb-3">{cityName}, {countryName} için bugün namaz vakitleri aşağıdaki gibidir. Bunlar hassasiyetle hesaplanmış beş vakit namazı içerir:</p>
        <ul className="list-none space-y-2 bg-emerald-50 p-4 rounded-lg">
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• İmsak:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Fajr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Öğle:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Dhuhr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• İkindi:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Asr)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Akşam:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Maghrib)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">• Yatsı:</span>
            <span className="text-emerald-700 font-mono font-bold">{formatTime12Hour(prayerTimes.Isha)}</span>
          </li>
        </ul>
      </div>
    )
  } : {
    ar: `مواقيت الصلاة في ${cityNameAr}, ${countryNameAr} تشمل خمس صلوات يومية: الفجر (قبل شروق الشمس)، الظهر (بعد الزوال)، العصر (بعد الظهر)، المغرب (عند غروب الشمس)، والعشاء (بعد غياب الشفق). يتم تحديث هذه الأوقات يومياً بناءً على الموقع الجغرافي الدقيق لـ ${cityNameAr}.`,
    en: `Prayer times in ${cityName}, ${countryName} include five daily prayers: Fajr (before sunrise), Dhuhr (after midday), Asr (afternoon), Maghrib (at sunset), and Isha (after twilight). These times are updated daily based on the precise geographical location of ${cityName}.`,
    ur: `${cityNameAr}, ${countryNameAr} میں نماز کے اوقات میں پانچ روزانہ نمازیں شامل ہیں: فجر (طلوع آفتاب سے پہلے)، ظہر (دوپہر کے بعد)، عصر (سہ پہر)، مغرب (غروب آفتاب کے وقت)، اور عشاء (شام کے بعد)۔ یہ اوقات ${cityNameAr} کے درست جغرافیائی محل وقوع کی بنیاد پر روزانہ اپ ڈیٹ کیے جاتے ہیں۔`,
    de: `Die Gebetszeiten in ${cityName}, ${countryName} umfassen fünf tägliche Gebete: Fadschr (vor Sonnenaufgang), Dhuhr (nach Mittag), Asr (Nachmittag), Maghrib (bei Sonnenuntergang) und Ischaa (nach Dämmerung). Diese Zeiten werden täglich basierend auf der präzisen geografischen Lage von ${cityName} aktualisiert.`,
    fr: `Les horaires de prière à ${cityName}, ${countryName} comprennent cinq prières quotidiennes: Fajr (avant le lever du soleil), Dhuhr (après midi), Asr (après-midi), Maghrib (au coucher du soleil) et Isha (après le crépuscule). Ces horaires sont mis à jour quotidiennement en fonction de la localisation géographique précise de ${cityName}.`,
    es: `Los horarios de oración en ${cityName}, ${countryName} incluyen cinco oraciones diarias: Fajr (antes del amanecer), Dhuhr (después del mediodía), Asr (tarde), Maghrib (al atardecer) e Isha (después del crepúsculo). Estos horarios se actualizan diariamente según la ubicación geográfica precisa de ${cityName}.`,
    fa: `اوقات نماز در ${cityNameAr}، ${countryName} شامل پنج نماز روزانه است: صبح (قبل از طلوع آفتاب)، ظهر (بعد از ظهر)، عصر (بعدازظهر)، مغرب (هنگام غروب آفتاب) و عشا (بعد از غروب). این اوقات بر اساس موقعیت دقیق جغرافیایی ${cityNameAr} به صورت روزانه به‌روزرسانی می‌شوند.`,
    id: `Waktu sholat di ${cityName}, ${countryName} mencakup lima sholat wajib harian: Subuh (sebelum matahari terbit), Dzuhur (setelah matahari tergelincir), Ashar (sore hari), Maghrib (saat matahari terbenam), dan Isya (setelah senja). Waktu-waktu ini diperbarui setiap hari berdasarkan lokasi geografis yang tepat dari ${cityName}.`,
    tr: `${cityName}, ${countryName} için namaz vakitleri beş vakit namazı içerir: İmsak (güneş doğmadan önce), Öğle (öğleden sonra), İkindi (ikindi vakti), Akşam (gün batımında) ve Yatsı (akşam karanlığından sonra). Bu vakitler ${cityName}'in kesin coğrafi konumu temelinde günlük güncellenir.`
  };

  const faqs: FAQItem[] = [
    {
      question: {
        ar: `ما هي مواقيت الصلاة في ${cityNameAr}؟`,
        en: `What are the prayer times in ${cityName}?`,
        ur: `${cityNameAr} میں نماز کے اوقات کیا ہیں؟`,
        de: `Was sind die Gebetszeiten in ${cityName}?`,
        fr: `Quels sont les horaires de prière à ${cityName}?`,
        es: `¿Cuáles son los horarios de oración en ${cityName}?`,
        fa: `اوقات نماز در ${cityNameAr} چیست؟`,
        id: `Apa waktu sholat di ${cityName}?`,
        tr: `${cityName} için namaz vakitleri nelerdir?`
      },
      answer: firstAnswerWithTimes
    },
    {
      question: {
        ar: `كيف يتم حساب أوقات الصلاة في ${cityNameAr}؟`,
        en: `How are prayer times calculated for ${cityName}?`,
        ur: `${cityNameAr} کے لیے نماز کے اوقات کیسے شمار کیے جاتے ہیں؟`,
        de: `Wie werden die Gebetszeiten für ${cityName} berechnet?`,
        fr: `Comment sont calculés les horaires de prière pour ${cityName}?`,
        es: `¿Cómo se calculan los horarios de oración para ${cityName}?`,
        fa: `اوقات نماز برای ${cityNameAr} چگونه محاسبه می‌شود؟`,
        id: `Bagaimana waktu sholat dihitung untuk ${cityName}?`,
        tr: `${cityName} için namaz vakitleri nasıl hesaplanır?`
      },
      answer: {
        ar: `يتم حساب أوقات الصلاة في ${cityNameAr} بناءً على خطوط الطول والعرض الدقيقة للمدينة. نستخدم حسابات فلكية معتمدة من المراكز الإسلامية وطريقة حساب متوافقة مع ${countryNameAr} لضمان دقة المواقيت لجميع سكان ${cityNameAr}.`,
        en: `Prayer times for ${cityName} are calculated based on the city's precise latitude and longitude coordinates. We use astronomical calculations approved by Islamic centers and calculation methods compatible with ${countryName} to ensure accurate timings for all residents of ${cityName}.`,
        ur: `${cityNameAr} کے لیے نماز کے اوقات شہر کے درست عرض البلد اور طول البلد کی بنیاد پر شمار کیے جاتے ہیں۔ ہم اسلامی مراکز کی منظور شدہ فلکیاتی حسابات اور ${countryNameAr} کے مطابق حساب کے طریقے استعمال کرتے ہیں تاکہ ${cityNameAr} کے تمام رہائشیوں کے لیے درست اوقات کو یقینی بنایا جا سکے۔`,
        de: `Die Gebetszeiten für ${cityName} werden basierend auf den präzisen Längen- und Breitengraden der Stadt berechnet. Wir verwenden von islamischen Zentren genehmigte astronomische Berechnungen und mit ${countryName} kompatible Berechnungsmethoden, um genaue Zeiten für alle Einwohner von ${cityName} zu gewährleisten.`,
        fr: `Les horaires de prière pour ${cityName} sont calculés en fonction des coordonnées de latitude et longitude précises de la ville. Nous utilisons des calculs astronomiques approuvés par les centres islamiques et des méthodes de calcul compatibles avec ${countryName} pour garantir des horaires précis pour tous les résidents de ${cityName}.`,
        es: `Los horarios de oración para ${cityName} se calculan según las coordenadas precisas de latitud y longitud de la ciudad. Utilizamos cálculos astronómicos aprobados por centros islámicos y métodos de cálculo compatibles con ${countryName} para garantizar horarios precisos para todos los residentes de ${cityName}.`,
        fa: `اوقات نماز برای ${cityNameAr} بر اساس مختصات دقیق طول و عرض جغرافیایی شهر محاسبه می‌شود. ما از محاسبات نجومی تایید شده توسط مراکز اسلامی و روش‌های محاسبه سازگار با ${countryName} استفاده می‌کنیم تا اوقات دقیق را برای تمام ساکنان ${cityNameAr} تضمین کنیم.`,
        id: `Waktu sholat untuk ${cityName} dihitung berdasarkan koordinat lintang dan bujur yang tepat dari kota. Kami menggunakan perhitungan astronomis yang disetujui oleh pusat-pusat Islam dan metode perhitungan yang kompatibel dengan ${countryName} untuk memastikan waktu yang akurat bagi semua penduduk ${cityName}.`,
        tr: `${cityName} için namaz vakitleri şehrin kesin enlem ve boylam koordinatlarına göre hesaplanır. İslami merkezler tarafından onaylanmış astronomik hesaplamalar ve ${countryName} ile uyumlu hesaplama yöntemleri kullanarak ${cityName}'in tüm sakinleri için doğru vakitleri garanti ederiz.`
      }
    },
    {
      question: {
        ar: `متى يبدأ وقت صلاة الفجر في ${cityNameAr}؟`,
        en: `When does Fajr prayer time start in ${cityName}?`,
        ur: `${cityNameAr} میں فجر کی نماز کا وقت کب شروع ہوتا ہے؟`,
        de: `Wann beginnt die Fajr-Gebetszeit in ${cityName}?`,
        fr: `Quand commence le temps de prière du Fajr à ${cityName}?`,
        es: `¿Cuándo comienza el tiempo de oración de Fajr en ${cityName}?`,
        fa: `وقت نماز صبح در ${cityNameAr} کی آغاز می‌شود؟`,
        id: `Kapan waktu sholat Subuh dimulai di ${cityName}?`,
        tr: `${cityName}'de İmsak vakti ne zaman başlar?`
      },
      answer: {
        ar: `يبدأ وقت صلاة الفجر في ${cityNameAr} عندما يظهر الفجر الصادق (الخيط الأبيض) في الأفق الشرقي، وينتهي عند شروق الشمس. الوقت المحدد يتغير يومياً حسب الموسم والموقع الجغرافي لـ ${cityNameAr} في ${countryNameAr}. يمكنك الاطلاع على التوقيت الدقيق أعلاه.`,
        en: `Fajr prayer time in ${cityName} begins when true dawn (white thread) appears on the eastern horizon and ends at sunrise. The exact time changes daily based on the season and geographical location of ${cityName} in ${countryName}. You can check the precise timing above.`,
        ur: `${cityNameAr} میں فجر کی نماز کا وقت اس وقت شروع ہوتا ہے جب مشرقی افق پر سچی فجر (سفید دھاگا) ظاہر ہوتی ہے اور طلوع آفتاب کے وقت ختم ہوتا ہے۔ درست وقت موسم اور ${countryNameAr} میں ${cityNameAr} کے جغرافیائی محل وقوع کی بنیاد پر روزانہ بدلتا ہے۔ آپ اوپر درست وقت دیکھ سکتے ہیں۔`,
        de: `Die Fadschr-Gebetszeit in ${cityName} beginnt, wenn die wahre Morgendämmerung (weißer Faden) am östlichen Horizont erscheint und endet bei Sonnenaufgang. Die genaue Zeit ändert sich täglich je nach Jahreszeit und geografischer Lage von ${cityName} in ${countryName}. Sie können die präzise Zeit oben überprüfen.`,
        fr: `Le temps de prière du Fajr à ${cityName} commence lorsque l'aube véritable (fil blanc) apparaît à l'horizon oriental et se termine au lever du soleil. L'heure exacte change quotidiennement en fonction de la saison et de la localisation géographique de ${cityName} dans ${countryName}. Vous pouvez vérifier l'heure précise ci-dessus.`,
        es: `El tiempo de oración de Fajr en ${cityName} comienza cuando aparece el verdadero amanecer (hilo blanco) en el horizonte oriental y termina al amanecer. La hora exacta cambia diariamente según la estación y la ubicación geográfica de ${cityName} en ${countryName}. Puede consultar la hora precisa arriba.`,
        fa: `وقت نماز صبح در ${cityNameAr} زمانی آغاز می‌شود که سپیده‌دم واقعی (رشته سفید) در افق شرقی ظاهر شود و با طلوع آفتاب پایان می‌یابد. زمان دقیق به‌طور روزانه بر اساس فصل و موقعیت جغرافیایی ${cityNameAr} در ${countryName} تغییر می‌کند. می‌توانید زمان دقیق را در بالا بررسی کنید.`,
        id: `Waktu sholat Subuh di ${cityName} dimulai ketika fajar sejati (benang putih) muncul di cakrawala timur dan berakhir saat matahari terbit. Waktu yang tepat berubah setiap hari berdasarkan musim dan lokasi geografis ${cityName} di ${countryName}. Anda dapat memeriksa waktu yang tepat di atas.`,
        tr: `${cityName}'de İmsak vakti gerçek şafak (beyaz iplik) doğu ufkunda göründüğünde başlar ve güneş doğuşunda sona erer. Tam saat mevsime ve ${countryName}'deki ${cityName}'in coğrafi konumuna göre günlük değişir. Kesin saati yukarıda kontrol edebilirsiniz.`
      }
    },
    {
      question: {
        ar: `هل تختلف أوقات الصلاة في ${cityNameAr} عن مدن ${countryNameAr} الأخرى؟`,
        en: `Do prayer times in ${cityName} differ from other cities in ${countryName}?`,
        ur: `کیا ${cityNameAr} میں نماز کے اوقات ${countryNameAr} کے دوسرے شہروں سے مختلف ہیں؟`,
        de: `Unterscheiden sich die Gebetszeiten in ${cityName} von anderen Städten in ${countryName}?`,
        fr: `Les horaires de prière à ${cityName} diffèrent-ils des autres villes de ${countryName}?`,
        es: `¿Los horarios de oración en ${cityName} difieren de otras ciudades en ${countryName}?`,
        fa: `آیا اوقات نماز در ${cityNameAr} با شهرهای دیگر ${countryName} متفاوت است؟`,
        id: `Apakah waktu sholat di ${cityName} berbeda dari kota lain di ${countryName}?`,
        tr: `${cityName}'deki namaz vakitleri ${countryName}'deki diğer şehirlerden farklı mı?`
      },
      answer: {
        ar: `نعم، قد تختلف أوقات الصلاة في ${cityNameAr} قليلاً عن المدن الأخرى في ${countryNameAr} بسبب الاختلاف في خطوط الطول والعرض. المدن الواقعة في شمال ${countryNameAr} قد يكون لها أوقات مختلفة عن المدن الجنوبية، والمدن الشرقية تختلف عن الغربية. لذلك من المهم التحقق من الأوقات المحددة لـ ${cityNameAr}.`,
        en: `Yes, prayer times in ${cityName} may differ slightly from other cities in ${countryName} due to differences in latitude and longitude. Cities in the north of ${countryName} may have different times than southern cities, and eastern cities differ from western ones. Therefore, it's important to check the specific times for ${cityName}.`,
        ur: `جی ہاں، عرض البلد اور طول البلد میں فرق کی وجہ سے ${cityNameAr} میں نماز کے اوقات ${countryNameAr} کے دوسرے شہروں سے تھوڑا مختلف ہو سکتے ہیں۔ ${countryNameAr} کے شمال میں واقع شہروں کے اوقات جنوبی شہروں سے مختلف ہو سکتے ہیں، اور مشرقی شہر مغربی سے مختلف ہیں۔ لہذا ${cityNameAr} کے مخصوص اوقات چیک کرنا ضروری ہے۔`,
        de: `Ja, die Gebetszeiten in ${cityName} können aufgrund unterschiedlicher Breiten- und Längengrade geringfügig von anderen Städten in ${countryName} abweichen. Städte im Norden von ${countryName} können andere Zeiten haben als südliche Städte, und östliche Städte unterscheiden sich von westlichen. Daher ist es wichtig, die spezifischen Zeiten für ${cityName} zu überprüfen.`,
        fr: `Oui, les horaires de prière à ${cityName} peuvent différer légèrement des autres villes de ${countryName} en raison des différences de latitude et de longitude. Les villes du nord de ${countryName} peuvent avoir des horaires différents des villes du sud, et les villes de l'est diffèrent de celles de l'ouest. Il est donc important de vérifier les horaires spécifiques pour ${cityName}.`,
        es: `Sí, los horarios de oración en ${cityName} pueden diferir ligeramente de otras ciudades en ${countryName} debido a las diferencias de latitud y longitud. Las ciudades del norte de ${countryName} pueden tener horarios diferentes a las ciudades del sur, y las ciudades del este difieren de las del oeste. Por lo tanto, es importante verificar los horarios específicos para ${cityName}.`,
        fa: `بله، اوقات نماز در ${cityNameAr} ممکن است به دلیل تفاوت در عرض و طول جغرافیایی با شهرهای دیگر در ${countryName} اندکی متفاوت باشد. شهرهای شمالی ${countryName} ممکن است اوقات متفاوتی با شهرهای جنوبی داشته باشند، و شهرهای شرقی با غربی متفاوت هستند. بنابراین بررسی اوقات خاص ${cityNameAr} مهم است.`,
        id: `Ya, waktu sholat di ${cityName} mungkin sedikit berbeda dari kota lain di ${countryName} karena perbedaan lintang dan bujur. Kota-kota di utara ${countryName} mungkin memiliki waktu yang berbeda dari kota-kota selatan, dan kota-kota timur berbeda dari yang barat. Oleh karena itu, penting untuk memeriksa waktu spesifik untuk ${cityName}.`,
        tr: `Evet, ${cityName}'deki namaz vakitleri enlem ve boylam farklılıkları nedeniyle ${countryName}'deki diğer şehirlerden biraz farklı olabilir. ${countryName}'nin kuzeyindeki şehirler güneydeki şehirlerden farklı vakitlere sahip olabilir ve doğudaki şehirler batıdakilerden farklıdır. Bu nedenle ${cityName} için özel vakitleri kontrol etmek önemlidir.`
      }
    },
    {
      question: {
        ar: `ما هو اتجاه القبلة من ${cityNameAr}؟`,
        en: `What is the Qibla direction from ${cityName}?`,
        ur: `${cityNameAr} سے قبلہ کی سمت کیا ہے؟`,
        de: `Was ist die Qibla-Richtung von ${cityName}?`,
        fr: `Quelle est la direction de la Qibla depuis ${cityName}?`,
        es: `¿Cuál es la dirección de la Qibla desde ${cityName}?`,
        fa: `جهت قبله از ${cityNameAr} چیست؟`,
        id: `Apa arah kiblat dari ${cityName}?`,
        tr: `${cityName}'den Kıble yönü nedir?`
      },
      answer: {
        ar: `اتجاه القبلة من ${cityNameAr}, ${countryNameAr} يشير نحو الكعبة المشرفة في مكة المكرمة. نوفر لك الاتجاه الدقيق بالدرجات والمسافة من ${cityNameAr} إلى مكة في قسم "اتجاه القبلة" أعلاه. يمكنك استخدام البوصلة الرقمية لتحديد الاتجاه بدقة عند الصلاة.`,
        en: `The Qibla direction from ${cityName}, ${countryName} points towards the Holy Kaaba in Makkah. We provide you with the precise direction in degrees and the distance from ${cityName} to Makkah in the "Qibla Direction" section above. You can use the digital compass to accurately determine the direction when praying.`,
        ur: `${cityNameAr}, ${countryNameAr} سے قبلہ کی سمت مکہ مکرمہ میں خانہ کعبہ کی طرف اشارہ کرتی ہے۔ ہم آپ کو درجات میں درست سمت اور ${cityNameAr} سے مکہ تک کا فاصلہ اوپر "قبلہ کی سمت" سیکشن میں فراہم کرتے ہیں۔ آپ نماز کے وقت سمت کا درست تعین کرنے کے لیے ڈیجیٹل کمپاس استعمال کر سکتے ہیں۔`,
        de: `Die Qibla-Richtung von ${cityName}, ${countryName} zeigt zur Heiligen Kaaba in Mekka. Wir bieten Ihnen die präzise Richtung in Grad und die Entfernung von ${cityName} nach Mekka im Abschnitt "Qibla-Richtung" oben. Sie können den digitalen Kompass verwenden, um die Richtung beim Beten genau zu bestimmen.`,
        fr: `La direction de la Qibla depuis ${cityName}, ${countryName} pointe vers la Sainte Kaaba à La Mecque. Nous vous fournissons la direction précise en degrés et la distance de ${cityName} à La Mecque dans la section "Direction de la Qibla" ci-dessus. Vous pouvez utiliser la boussole numérique pour déterminer avec précision la direction lors de la prière.`,
        es: `La dirección de la Qibla desde ${cityName}, ${countryName} apunta hacia la Sagrada Kaaba en La Meca. Le proporcionamos la dirección precisa en grados y la distancia desde ${cityName} hasta La Meca en la sección "Dirección de la Qibla" arriba. Puede usar la brújula digital para determinar con precisión la dirección al orar.`,
        fa: `جهت قبله از ${cityNameAr}، ${countryName} به سمت خانه کعبه مقدس در مکه است. ما جهت دقیق به درجه و فاصله از ${cityNameAr} تا مکه را در بخش "جهت قبله" در بالا ارائه می‌دهیم. می‌توانید از قطب‌نمای دیجیتال برای تعیین دقیق جهت هنگام نماز استفاده کنید.`,
        id: `Arah kiblat dari ${cityName}, ${countryName} menunjuk ke arah Ka'bah Suci di Mekkah. Kami menyediakan arah yang tepat dalam derajat dan jarak dari ${cityName} ke Mekkah di bagian "Arah Kiblat" di atas. Anda dapat menggunakan kompas digital untuk menentukan arah dengan akurat saat sholat.`,
        tr: `${cityName}, ${countryName}'den Kıble yönü Mekke'deki Kabe-i Müşerrefe'ye işaret eder. Yukarıdaki "Kıble Yönü" bölümünde ${cityName}'den Mekke'ye derece cinsinden kesin yön ve mesafeyi sağlıyoruz. Namaz kılarken yönü doğru bir şekilde belirlemek için dijital pusula kullanabilirsiniz.`
      }
    },
    {
      question: {
        ar: `هل يتم تحديث مواقيت الصلاة في ${cityNameAr} تلقائياً؟`,
        en: `Are prayer times in ${cityName} updated automatically?`,
        ur: `کیا ${cityNameAr} میں نماز کے اوقات خودکار طور پر اپ ڈیٹ ہوتے ہیں؟`,
        de: `Werden die Gebetszeiten in ${cityName} automatisch aktualisiert?`,
        fr: `Les horaires de prière à ${cityName} sont-ils mis à jour automatiquement?`,
        es: `¿Se actualizan los horarios de oración en ${cityName} automáticamente?`,
        fa: `آیا اوقات نماز در ${cityNameAr} به طور خودکار به‌روزرسانی می‌شوند؟`,
        id: `Apakah waktu sholat di ${cityName} diperbarui secara otomatis?`,
        tr: `${cityName}'deki namaz vakitleri otomatik olarak güncellenir mi?`
      },
      answer: {
        ar: `نعم، يتم تحديث مواقيت الصلاة في ${cityNameAr} تلقائياً كل 6 ساعات لضمان الدقة. نظامنا يحسب الأوقات بناءً على التاريخ الحالي والموقع الجغرافي لـ ${cityNameAr}، ${countryNameAr}، مع الأخذ في الاعتبار التقويم الهجري والميلادي. يمكنك الاعتماد على هذه الأوقات لجميع صلواتك اليومية.`,
        en: `Yes, prayer times in ${cityName} are automatically updated every 6 hours to ensure accuracy. Our system calculates times based on the current date and geographical location of ${cityName}, ${countryName}, taking into account both Hijri and Gregorian calendars. You can rely on these times for all your daily prayers.`,
        ur: `جی ہاں، ${cityNameAr} میں نماز کے اوقات درستگی کو یقینی بنانے کے لیے ہر 6 گھنٹے میں خودکار طور پر اپ ڈیٹ ہوتے ہیں۔ ہمارا نظام ${cityNameAr}, ${countryNameAr} کی موجودہ تاریخ اور جغرافیائی محل وقوع کی بنیاد پر اوقات کا حساب لگاتا ہے، ہجری اور عیسوی دونوں کیلنڈرز کو مدنظر رکھتے ہوئے۔ آپ اپنی تمام روزانہ نمازوں کے لیے ان اوقات پر بھروسہ کر سکتے ہیں۔`,
        de: `Ja, die Gebetszeiten in ${cityName} werden automatisch alle 6 Stunden aktualisiert, um Genauigkeit zu gewährleisten. Unser System berechnet die Zeiten basierend auf dem aktuellen Datum und der geografischen Lage von ${cityName}, ${countryName}, unter Berücksichtigung sowohl des islamischen als auch des gregorianischen Kalenders. Sie können sich für alle Ihre täglichen Gebete auf diese Zeiten verlassen.`,
        fr: `Oui, les horaires de prière à ${cityName} sont automatiquement mis à jour toutes les 6 heures pour garantir la précision. Notre système calcule les horaires en fonction de la date actuelle et de la localisation géographique de ${cityName}, ${countryName}, en tenant compte des calendriers hégirien et grégorien. Vous pouvez vous fier à ces horaires pour toutes vos prières quotidiennes.`,
        es: `Sí, los horarios de oración en ${cityName} se actualizan automáticamente cada 6 horas para garantizar la precisión. Nuestro sistema calcula los horarios según la fecha actual y la ubicación geográfica de ${cityName}, ${countryName}, teniendo en cuenta los calendarios hiyří y gregoriano. Puede confiar en estos horarios para todas sus oraciones diarias.`,
        fa: `بله، اوقات نماز در ${cityNameAr} به طور خودکار هر 6 ساعت به‌روزرسانی می‌شوند تا دقت تضمین شود. سیستم ما اوقات را بر اساس تاریخ جاری و موقعیت جغرافیایی ${cityNameAr}، ${countryName} محاسبه می‌کند، با در نظر گرفتن تقویم هجری و میلادی. می‌توانید برای تمام نمازهای روزانه خود به این اوقات اعتماد کنید.`,
        id: `Ya, waktu sholat di ${cityName} diperbarui secara otomatis setiap 6 jam untuk memastikan akurasi. Sistem kami menghitung waktu berdasarkan tanggal saat ini dan lokasi geografis ${cityName}, ${countryName}, dengan mempertimbangkan kalender Hijriah dan Gregorian. Anda dapat mengandalkan waktu ini untuk semua sholat harian Anda.`,
        tr: `Evet, ${cityName}'deki namaz vakitleri doğruluğu sağlamak için her 6 saatte bir otomatik olarak güncellenir. Sistemimiz, Hicri ve Miladi takvimleri dikkate alarak mevcut tarihe ve ${cityName}, ${countryName}'nin coğrafi konumuna göre vakitleri hesaplar. Tüm günlük namazlarınız için bu vakitlere güvenebilirsiniz.`
      }
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-[var(--font-tajawal)]">
                {language === 'ar' 
                  ? 'الأسئلة الشائعة'
                  : language === 'ur'
                  ? 'عمومی سوالات'
                  : language === 'de'
                  ? 'Häufig gestellte Fragen'
                  : language === 'fr'
                  ? 'Questions fréquemment posées'
                  : language === 'es'
                  ? 'Preguntas frecuentes'
                  : language === 'fa'
                  ? 'سوالات متداول'
                  : language === 'id'
                  ? 'Pertanyaan yang Sering Diajukan'
                  : language === 'tr'
                  ? 'Sık Sorulan Sorular'
                  : 'Frequently Asked Questions'}
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-[var(--font-tajawal)]">
              {language === 'ar'
                ? 'إجابات على الأسئلة الأكثر شيوعاً حول مواقيت الصلاة'
                : language === 'ur'
                ? 'نماز کے اوقات کے بارے میں عام سوالات کے جوابات'
                : language === 'de'
                ? 'Antworten auf häufige Fragen zu Gebetszeiten'
                : language === 'fr'
                ? 'Réponses aux questions courantes sur les horaires de prière'
                : language === 'es'
                ? 'Respuestas a preguntas comunes sobre horarios de oración'
                : language === 'fa'
                ? 'پاسخ به سوالات رایج درباره اوقات نماز'
                : language === 'id'
                ? 'Jawaban atas pertanyaan umum tentang waktu sholat'
                : language === 'tr'
                ? 'Namaz vakitleri hakkında sık sorulan soruların cevapları'
                : 'Answers to common questions about prayer times'}
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300 overflow-hidden"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-emerald-50/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 font-[var(--font-tajawal)] flex-1 pr-4">
                    {language === 'ar' ? faq.question.ar : language === 'ur' ? faq.question.ur : language === 'de' ? faq.question.de : language === 'fr' ? faq.question.fr : language === 'es' ? faq.question.es : language === 'fa' ? faq.question.fa : language === 'id' ? faq.question.id : language === 'tr' ? faq.question.tr : faq.question.en}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-emerald-600 transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer Panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-[600px]' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 sm:p-6 pt-0 border-t border-gray-200">
                    <div className="text-gray-700 text-sm sm:text-base leading-relaxed font-[var(--font-tajawal)]">
                      {typeof faq.answer === 'object' && 'ar' in faq.answer && typeof faq.answer.ar !== 'string'
                        ? (language === 'ar' ? faq.answer.ar : language === 'ur' ? faq.answer.ur : language === 'de' ? faq.answer.de : language === 'fr' ? faq.answer.fr : language === 'es' ? faq.answer.es : language === 'fa' ? faq.answer.fa : language === 'id' ? faq.answer.id : language === 'tr' ? faq.answer.tr : faq.answer.en)
                        : (language === 'ar' ? faq.answer.ar : language === 'ur' ? faq.answer.ur : language === 'de' ? faq.answer.de : language === 'fr' ? faq.answer.fr : language === 'es' ? faq.answer.es : language === 'fa' ? faq.answer.fa : language === 'id' ? faq.answer.id : language === 'tr' ? faq.answer.tr : faq.answer.en)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
            <p className="text-gray-700 text-sm sm:text-base font-[var(--font-tajawal)]">
              {language === 'ar'
                ? 'لمزيد من المعلومات حول مواقيت الصلاة، تصفح مدن أخرى أو اتصل بنا'
                : language === 'ur'
                ? 'نماز کے اوقات کے بارے میں مزید معلومات کے لیے، دوسرے شہروں کو دیکھیں یا ہم سے رابطہ کریں'
                : language === 'de'
                ? 'Für weitere Informationen zu Gebetszeiten, durchsuchen Sie andere Städte oder kontaktieren Sie uns'
                : language === 'fr'
                ? 'Pour plus d\'informations sur les horaires de prière, parcourez d\'autres villes ou contactez-nous'
                : language === 'es'
                ? 'Para más información sobre horarios de oración, explore otras ciudades o contáctenos'
                : language === 'fa'
                ? 'برای اطلاعات بیشتر درباره اوقات نماز، شهرهای دیگر را مرور کنید یا با ما تماس بگیرید'
                : language === 'id'
                ? 'Untuk informasi lebih lanjut tentang waktu sholat, jelajahi kota lain atau hubungi kami'
                : language === 'tr'
                ? 'Namaz vakitleri hakkında daha fazla bilgi için diğer şehirlere göz atın veya bizimle iletişime geçin'
                : 'For more information about prayer times, browse other cities or contact us'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
