'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'en' | 'ur' | 'de' | 'fr' | 'es' | 'fa' | 'id' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Header
    prayerTimes: 'أوقات الصلاة',
    home: 'الرئيسية',
    aboutUs: 'من نحن',
    contactUs: 'اتصل بنا',
    prayerTimesPage: 'مواقيت الصلاة',
    privacyPolicy: 'سياسة الخصوصية',
    
    // Home Page - Hero
    heroTitle: 'أوقات الصلاة والأذان في جميع أنحاء العالم',
    heroDescription: 'مواقيت الصلاة الدقيقة لجميع مدن العالم مع التقويم الهجري والميلادي',
    accurateTimes: 'مواقيت دقيقة',
    hijriCalendar: 'التقويم الهجري',
    allCountries: 'جميع الدول',
    multipleCountries: 'جميع الدول',
    
    // Holy Cities Section
    holyCitiesTitle: 'مواقيت الصلاة في الحرمين الشريفين',
    makkah: 'مكة المكرمة',
    madinah: 'المدينة المنورة',
    
    // Prayer Names
    fajr: 'الفجر',
    sunrise: 'الشروق',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
    
    // Calendar
    hijriCalendarTitle: 'التقويم الهجري والميلادي',
    day: 'اليوم',
    gregorian: 'ميلادي',
    hijri: 'هجري',
    
    // Countries
    countriesTitle: 'اختر دولتك',
    countriesDescription: 'اختر دولتك لمعرفة مواقيت الصلاة الدقيقة',
    
    // City Pages
    otherCitiesIn: 'مدن أخرى في',
    backTo: 'العودة إلى',
    
    // Days
    sunday: 'الأحد',
    monday: 'الإثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت',
    
    // Months
    january: 'يناير',
    february: 'فبراير',
    march: 'مارس',
    april: 'أبريل',
    may: 'مايو',
    june: 'يونيو',
    july: 'يوليو',
    august: 'أغسطس',
    september: 'سبتمبر',
    october: 'أكتوبر',
    november: 'نوفمبر',
    december: 'ديسمبر',
  },
  en: {
    // Header
    prayerTimes: 'Prayer Times',
    home: 'Home',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    prayerTimesPage: 'Prayer Times',
    privacyPolicy: 'Privacy Policy',
    
    // Home Page - Hero
    heroTitle: 'Prayer and Azan Time Worldwide',
    heroDescription: 'Accurate Islamic Prayer Times Worldwide with Hijri and Gregorian Calendar',
    accurateTimes: 'Accurate Times',
    hijriCalendar: 'Hijri Calendar',
    allCountries: 'All Countries',
    multipleCountries: 'Multiple Countries',
    
    // Holy Cities Section
    holyCitiesTitle: 'Prayer Times in Holy Cities',
    makkah: 'Makkah',
    madinah: 'Madinah',
    
    // Prayer Names
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    
    // Calendar
    hijriCalendarTitle: 'Hijri & Gregorian Calendar',
    day: 'Day',
    gregorian: 'Gregorian',
    hijri: 'Hijri',
    
    // Countries
    countriesTitle: 'Choose Your Country',
    countriesDescription: 'Select your country to view accurate prayer times',
    
    // City Pages
    otherCitiesIn: 'Other Cities in',
    backTo: 'Back to',
    
    // Days
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    
    // Months
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
  },
  ur: {
    // Header
    prayerTimes: 'نماز کے اوقات',
    home: 'ہوم',
    aboutUs: 'ہمارے بارے میں',
    contactUs: 'رابطہ کریں',
    prayerTimesPage: 'نماز کے اوقات',
    privacyPolicy: 'پرائیویسی پالیسی',
    
    // Home Page - Hero
    heroTitle: 'دنیا بھر میں نماز اور اذان کے اوقات',
    heroDescription: 'دنیا بھر کے تمام شہروں کے لیے درست نماز کے اوقات اور ہجری و عیسوی کیلنڈر',
    accurateTimes: 'درست اوقات',
    hijriCalendar: 'ہجری کیلنڈر',
    allCountries: 'تمام ممالک',
    multipleCountries: 'متعدد ممالک',
    
    // Holy Cities Section
    holyCitiesTitle: 'حرمین شریفین میں نماز کے اوقات',
    makkah: 'مکہ مکرمہ',
    madinah: 'مدینہ منورہ',
    
    // Prayer Names
    fajr: 'فجر',
    sunrise: 'طلوع آفتاب',
    dhuhr: 'ظہر',
    asr: 'عصر',
    maghrib: 'مغرب',
    isha: 'عشاء',
    
    // Calendar
    hijriCalendarTitle: 'ہجری اور عیسوی کیلنڈر',
    day: 'دن',
    gregorian: 'عیسوی',
    hijri: 'ہجری',
    
    // Countries
    countriesTitle: 'اپنا ملک منتخب کریں',
    countriesDescription: 'درست نماز کے اوقات دیکھنے کے لیے اپنا ملک منتخب کریں',
    
    // City Pages
    otherCitiesIn: 'میں دیگر شہر',
    backTo: 'واپس',
    
    // Days
    sunday: 'اتوار',
    monday: 'پیر',
    tuesday: 'منگل',
    wednesday: 'بدھ',
    thursday: 'جمعرات',
    friday: 'جمعہ',
    saturday: 'ہفتہ',
    
    // Months
    january: 'جنوری',
    february: 'فروری',
    march: 'مارچ',
    april: 'اپریل',
    may: 'مئی',
    june: 'جون',
    july: 'جولائی',
    august: 'اگست',
    september: 'ستمبر',
    october: 'اکتوبر',
    november: 'نومبر',
    december: 'دسمبر',
  },
  de: {
    // Header
    prayerTimes: 'Gebetszeiten',
    home: 'Startseite',
    aboutUs: 'Über uns',
    contactUs: 'Kontakt',
    prayerTimesPage: 'Gebetszeiten',
    privacyPolicy: 'Datenschutz',
    
    // Home Page - Hero
    heroTitle: 'Gebetszeiten und Adhan weltweit',
    heroDescription: 'Genaue Gebetszeiten für alle Städte der Welt mit islamischem und gregorianischem Kalender',
    accurateTimes: 'Genaue Zeiten',
    hijriCalendar: 'Islamischer Kalender',
    allCountries: 'Alle Länder',
    multipleCountries: 'Alle Länder',
    
    // Holy Cities Section
    holyCitiesTitle: 'Gebetszeiten in den heiligen Städten',
    makkah: 'Mekka',
    madinah: 'Medina',
    
    // Prayer Names
    fajr: 'Fadschr',
    sunrise: 'Sonnenaufgang',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Ischaa',
    
    // Calendar
    hijriCalendarTitle: 'Islamischer und Gregorianischer Kalender',
    day: 'Tag',
    gregorian: 'Gregorianisch',
    hijri: 'Islamisch',
    
    // Countries
    countriesTitle: 'Wählen Sie Ihr Land',
    countriesDescription: 'Wählen Sie Ihr Land, um genaue Gebetszeiten anzuzeigen',
    
    // City Pages
    otherCitiesIn: 'Andere Städte in',
    backTo: 'Zurück zu',
    
    // Days
    sunday: 'Sonntag',
    monday: 'Montag',
    tuesday: 'Dienstag',
    wednesday: 'Mittwoch',
    thursday: 'Donnerstag',
    friday: 'Freitag',
    saturday: 'Samstag',
    
    // Months
    january: 'Januar',
    february: 'Februar',
    march: 'März',
    april: 'April',
    may: 'Mai',
    june: 'Juni',
    july: 'Juli',
    august: 'August',
    september: 'September',
    october: 'Oktober',
    november: 'November',
    december: 'Dezember',
  },
  fr: {
    // Header
    prayerTimes: 'Horaires de prière',
    home: 'Accueil',
    aboutUs: 'À propos',
    contactUs: 'Contact',
    prayerTimesPage: 'Horaires de prière',
    privacyPolicy: 'Confidentialité',
    
    // Home Page - Hero
    heroTitle: 'Horaires de prière et Adhan dans le monde',
    heroDescription: 'Horaires de prière islamiques précis dans le monde avec calendrier hégirien et grégorien',
    accurateTimes: 'Horaires précis',
    hijriCalendar: 'Calendrier hégirien',
    allCountries: 'Tous les pays',
    multipleCountries: 'Tous les pays',
    
    // Holy Cities Section
    holyCitiesTitle: 'Horaires de prière dans les villes saintes',
    makkah: 'La Mecque',
    madinah: 'Médine',
    
    // Prayer Names
    fajr: 'Fajr',
    sunrise: 'Lever du soleil',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    
    // Calendar
    hijriCalendarTitle: 'Calendrier hégirien et grégorien',
    day: 'Jour',
    gregorian: 'Grégorien',
    hijri: 'Hégirien',
    
    // Countries
    countriesTitle: 'Choisissez votre pays',
    countriesDescription: 'Sélectionnez votre pays pour voir les horaires de prière précis',
    
    // City Pages
    otherCitiesIn: 'Autres villes en',
    backTo: 'Retour à',
    
    // Days
    sunday: 'Dimanche',
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    
    // Months
    january: 'Janvier',
    february: 'Février',
    march: 'Mars',
    april: 'Avril',
    may: 'Mai',
    june: 'Juin',
    july: 'Juillet',
    august: 'Août',
    september: 'Septembre',
    october: 'Octobre',
    november: 'Novembre',
    december: 'Décembre',
  },
  es: {
    // Header
    prayerTimes: 'Horarios de oración',
    home: 'Inicio',
    aboutUs: 'Acerca de',
    contactUs: 'Contacto',
    prayerTimesPage: 'Horarios de oración',
    privacyPolicy: 'Privacidad',
    
    // Home Page - Hero
    heroTitle: 'Horarios de oración y Adhan en todo el mundo',
    heroDescription: 'Horarios de oración islámicos precisos en todo el mundo con calendario hegírico y gregoriano',
    accurateTimes: 'Horarios precisos',
    hijriCalendar: 'Calendario hegírico',
    allCountries: 'Todos los países',
    multipleCountries: 'Todos los países',
    
    // Holy Cities Section
    holyCitiesTitle: 'Horarios de oración en las ciudades santas',
    makkah: 'La Meca',
    madinah: 'Medina',
    
    // Prayer Names
    fajr: 'Fajr',
    sunrise: 'Amanecer',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    
    // Calendar
    hijriCalendarTitle: 'Calendario hegírico y gregoriano',
    day: 'Día',
    gregorian: 'Gregoriano',
    hijri: 'Hegírico',
    
    // Countries
    countriesTitle: 'Elige tu país',
    countriesDescription: 'Selecciona tu país para ver los horarios de oración precisos',
    
    // City Pages
    otherCitiesIn: 'Otras ciudades en',
    backTo: 'Volver a',
    
    // Days
    sunday: 'Domingo',
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    
    // Months
    january: 'Enero',
    february: 'Febrero',
    march: 'Marzo',
    april: 'Abril',
    may: 'Mayo',
    june: 'Junio',
    july: 'Julio',
    august: 'Agosto',
    september: 'Septiembre',
    october: 'Octubre',
    november: 'Noviembre',
    december: 'Diciembre',
  },
  fa: {
    // Header
    prayerTimes: 'اوقات نماز',
    home: 'خانه',
    aboutUs: 'درباره ما',
    contactUs: 'تماس با ما',
    prayerTimesPage: 'اوقات نماز',
    privacyPolicy: 'حریم خصوصی',
    
    // Home Page - Hero
    heroTitle: 'اوقات نماز و اذان در سراسر جهان',
    heroDescription: 'اوقات دقیق نماز اسلامی در سراسر جهان با تقویم هجری و میلادی',
    accurateTimes: 'اوقات دقیق',
    hijriCalendar: 'تقویم هجری',
    allCountries: 'همه کشورها',
    multipleCountries: 'همه کشورها',
    
    // Holy Cities Section
    holyCitiesTitle: 'اوقات نماز در شهرهای مقدس',
    makkah: 'مکه',
    madinah: 'مدینه',
    
    // Prayer Names
    fajr: 'صبح',
    sunrise: 'طلوع آفتاب',
    dhuhr: 'ظهر',
    asr: 'عصر',
    maghrib: 'مغرب',
    isha: 'عشا',
    
    // Calendar
    hijriCalendarTitle: 'تقویم هجری و میلادی',
    day: 'روز',
    gregorian: 'میلادی',
    hijri: 'هجری',
    
    // Countries
    countriesTitle: 'کشور خود را انتخاب کنید',
    countriesDescription: 'کشور خود را برای مشاهده اوقات دقیق نماز انتخاب کنید',
    
    // City Pages
    otherCitiesIn: 'شهرهای دیگر در',
    backTo: 'بازگشت به',
    
    // Days
    sunday: 'یکشنبه',
    monday: 'دوشنبه',
    tuesday: 'سه‌شنبه',
    wednesday: 'چهارشنبه',
    thursday: 'پنجشنبه',
    friday: 'جمعه',
    saturday: 'شنبه',
    
    // Months
    january: 'ژانویه',
    february: 'فوریه',
    march: 'مارس',
    april: 'آوریل',
    may: 'مه',
    june: 'ژوئن',
    july: 'ژوئیه',
    august: 'اوت',
    september: 'سپتامبر',
    october: 'اکتبر',
    november: 'نوامبر',
    december: 'دسامبر',
  },
  id: {
    // Header
    prayerTimes: 'Waktu Sholat',
    home: 'Beranda',
    aboutUs: 'Tentang Kami',
    contactUs: 'Hubungi Kami',
    prayerTimesPage: 'Waktu Sholat',
    privacyPolicy: 'Kebijakan Privasi',
    
    // Home Page - Hero
    heroTitle: 'Waktu Sholat dan Adzan di Seluruh Dunia',
    heroDescription: 'Waktu sholat yang akurat untuk semua kota di dunia dengan kalender Hijriah dan Masehi',
    accurateTimes: 'Waktu Akurat',
    hijriCalendar: 'Kalender Hijriah',
    allCountries: 'Semua Negara',
    multipleCountries: 'Semua Negara',
    
    // Holy Cities Section
    holyCitiesTitle: 'Waktu Sholat di Kota-Kota Suci',
    makkah: 'Makkah',
    madinah: 'Madinah',
    
    // Prayer Names
    fajr: 'Subuh',
    sunrise: 'Terbit',
    dhuhr: 'Dzuhur',
    asr: 'Ashar',
    maghrib: 'Maghrib',
    isha: 'Isya',
    
    // Calendar
    hijriCalendarTitle: 'Kalender Hijriah & Masehi',
    day: 'Hari',
    gregorian: 'Masehi',
    hijri: 'Hijriah',
    
    // Countries
    countriesTitle: 'Pilih Negara Anda',
    countriesDescription: 'Pilih negara Anda untuk melihat waktu sholat yang akurat',
    
    // City Pages
    otherCitiesIn: 'Kota Lain di',
    backTo: 'Kembali ke',
    
    // Days
    sunday: 'Minggu',
    monday: 'Senin',
    tuesday: 'Selasa',
    wednesday: 'Rabu',
    thursday: 'Kamis',
    friday: 'Jumat',
    saturday: 'Sabtu',
    
    // Months
    january: 'Januari',
    february: 'Februari',
    march: 'Maret',
    april: 'April',
    may: 'Mei',
    june: 'Juni',
    july: 'Juli',
    august: 'Agustus',
    september: 'September',
    october: 'Oktober',
    november: 'November',
    december: 'Desember',
  },
  tr: {
    // Header
    prayerTimes: 'Namaz Vakitleri',
    home: 'Ana Sayfa',
    aboutUs: 'Hakkımızda',
    contactUs: 'İletişim',
    prayerTimesPage: 'Namaz Vakitleri',
    privacyPolicy: 'Gizlilik Politikası',
    
    // Home Page - Hero
    heroTitle: 'Dünya Genelinde Namaz Vakitleri ve Ezan',
    heroDescription: 'Hicri ve Miladi takvimle dünyanın tüm şehirleri için doğru namaz vakitleri',
    accurateTimes: 'Doğru Vakitler',
    hijriCalendar: 'Hicri Takvim',
    allCountries: 'Tüm Ülkeler',
    multipleCountries: 'Tüm Ülkeler',
    
    // Holy Cities Section
    holyCitiesTitle: 'Kutsal Şehirlerde Namaz Vakitleri',
    makkah: 'Mekke',
    madinah: 'Medine',
    
    // Prayer Names
    fajr: 'İmsak',
    sunrise: 'Güneş',
    dhuhr: 'Öğle',
    asr: 'İkindi',
    maghrib: 'Akşam',
    isha: 'Yatsı',
    
    // Calendar
    hijriCalendarTitle: 'Hicri ve Miladi Takvim',
    day: 'Gün',
    gregorian: 'Miladi',
    hijri: 'Hicri',
    
    // Countries
    countriesTitle: 'Ülkenizi Seçin',
    countriesDescription: 'Doğru namaz vakitlerini görmek için ülkenizi seçin',
    
    // City Pages
    otherCitiesIn: 'Diğer Şehirler',
    backTo: 'Geri Dön',
    
    // Days
    sunday: 'Pazar',
    monday: 'Pazartesi',
    tuesday: 'Salı',
    wednesday: 'Çarşamba',
    thursday: 'Perşembe',
    friday: 'Cuma',
    saturday: 'Cumartesi',
    
    // Months
    january: 'Ocak',
    february: 'Şubat',
    march: 'Mart',
    april: 'Nisan',
    may: 'Mayıs',
    june: 'Haziran',
    july: 'Temmuz',
    august: 'Ağustos',
    september: 'Eylül',
    october: 'Ekim',
    november: 'Kasım',
    december: 'Aralık',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && ['ar', 'en', 'ur', 'de', 'fr', 'es', 'fa', 'id', 'tr'].includes(savedLang)) {
        setLanguageState(savedLang);
        updateHtmlAttributes(savedLang);
      }
    }
  }, []);

  // Update HTML attributes when language changes
  const updateHtmlAttributes = (lang: Language) => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' || lang === 'ur' || lang === 'fa' ? 'rtl' : 'ltr');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    updateHtmlAttributes(lang);
  };

  const t = (key: string): string => {
    const translationObj = translations[language];
    if (!translationObj) {
      console.error(`Translation object not found for language: ${language}`);
      return key;
    }
    return translationObj[key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
