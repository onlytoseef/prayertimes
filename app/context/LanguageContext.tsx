'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'en' | 'ur';

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
    heroTitle: 'أوقات الصلاة',
    heroDescription: 'مواقيت الصلاة الدقيقة لجميع مدن العالم مع التقويم الهجري والميلادي',
    accurateTimes: 'مواقيت دقيقة',
    hijriCalendar: 'التقويم الهجري',
    allCountries: 'جميع الدول',
    
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
    heroTitle: 'Prayer Times',
    heroDescription: 'Accurate Islamic Prayer Times Worldwide with Hijri and Gregorian Calendar',
    accurateTimes: 'Accurate Times',
    hijriCalendar: 'Hijri Calendar',
    allCountries: 'All Countries',
    
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
    heroTitle: 'نماز کے اوقات',
    heroDescription: 'دنیا بھر کے تمام شہروں کے لیے درست نماز کے اوقات اور ہجری و عیسوی کیلنڈر',
    accurateTimes: 'درست اوقات',
    hijriCalendar: 'ہجری کیلنڈر',
    allCountries: 'تمام ممالک',
    
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
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['ar', 'en', 'ur'].includes(savedLang)) {
      setLanguageState(savedLang);
      updateHtmlAttributes(savedLang);
    }
  }, []);

  // Update HTML attributes when language changes
  const updateHtmlAttributes = (lang: Language) => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    updateHtmlAttributes(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
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
