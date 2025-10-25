'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Church, Menu, X } from 'lucide-react';

type Language = 'ar' | 'en' | 'ur';

const translations = {
  ar: {
    prayerTimes: 'أوقات الصلاة',
    home: 'الرئيسية',
    aboutUs: 'من نحن',
    contactUs: 'اتصل بنا',
    prayerTimesPage: 'مواقيت الصلاة',
    privacyPolicy: 'سياسة الخصوصية',
  },
  en: {
    prayerTimes: 'Prayer Times',
    home: 'Home',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    prayerTimesPage: 'Prayer Times',
    privacyPolicy: 'Privacy Policy',
  },
  ur: {
    prayerTimes: 'نماز کے اوقات',
    home: 'ہوم',
    aboutUs: 'ہمارے بارے میں',
    contactUs: 'رابطہ کریں',
    prayerTimesPage: 'نماز کے اوقات',
    privacyPolicy: 'پرائیویسی پالیسی',
  }
};

export default function Header() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const t = translations[currentLang];

  const languageOptions = [
    { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'ur' as Language, name: 'اردو', flag: '🇵🇰' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-700 to-emerald-600 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Church className="w-8 h-8 text-white" />
            <span className="text-xl md:text-2xl font-bold text-white font-[var(--font-tajawal)]">
              {t.prayerTimes}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link href="/" className="text-white hover:text-emerald-100 transition-colors font-medium">
              {t.home}
            </Link>
            <Link href="/prayer-times" className="text-white hover:text-emerald-100 transition-colors font-medium">
              {t.prayerTimesPage}
            </Link>
            <Link href="/about" className="text-white hover:text-emerald-100 transition-colors font-medium">
              {t.aboutUs}
            </Link>
            <Link href="/contact" className="text-white hover:text-emerald-100 transition-colors font-medium">
              {t.contactUs}
            </Link>
            <Link href="/privacy" className="text-white hover:text-emerald-100 transition-colors font-medium">
              {t.privacyPolicy}
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value as Language)}
              className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
              aria-label="Select Language"
            >
              {languageOptions.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-emerald-700 text-white">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link href="/" className="block text-white hover:text-emerald-100 transition-colors py-2">
              {t.home}
            </Link>
            <Link href="/prayer-times" className="block text-white hover:text-emerald-100 transition-colors py-2">
              {t.prayerTimesPage}
            </Link>
            <Link href="/about" className="block text-white hover:text-emerald-100 transition-colors py-2">
              {t.aboutUs}
            </Link>
            <Link href="/contact" className="block text-white hover:text-emerald-100 transition-colors py-2">
              {t.contactUs}
            </Link>
            <Link href="/privacy" className="block text-white hover:text-emerald-100 transition-colors py-2">
              {t.privacyPolicy}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
