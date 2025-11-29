'use client';

import Link from 'next/link';
import { Church, Mail, Globe, Clock, Facebook, Twitter, Instagram, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Church className="w-8 h-8 text-white" />
              <h3 className="text-xl font-bold font-[var(--font-tajawal)]">{t('prayerTimes')}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed font-[var(--font-tajawal)]">
              {language === 'ar' 
                ? 'موقع إسلامي يوفر مواقيت الصلاة الدقيقة لجميع مدن العالم مع التقويم الهجري'
                : language === 'ur'
                ? 'اسلامی ویب سائٹ جو دنیا بھر کے تمام شہروں کے لیے ہجری کیلنڈر کے ساتھ درست نماز کے اوقات فراہم کرتی ہے'
                : 'Islamic website providing accurate prayer times for all cities worldwide with Hijri calendar'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-[var(--font-tajawal)]">
              {language === 'ar' ? 'روابط سريعة' : language === 'ur' ? 'فوری لنکس' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={language === 'ar' ? '/' : `/${language}`} className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-[var(--font-tajawal)]">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href={language === 'ar' ? '/prayer-times' : `/${language}/prayer-times`} className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-[var(--font-tajawal)]">
                  {t('prayerTimesPage')}
                </Link>
              </li>
              <li>
                <Link href={language === 'ar' ? '/about' : `/${language}/about`} className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-[var(--font-tajawal)]">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href={language === 'ar' ? '/contact' : `/${language}/contact`} className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-[var(--font-tajawal)]">
                  {t('contactUs')}
                </Link>
              </li>
              <li>
                <Link href={language === 'ar' ? '/privacy' : `/${language}/privacy`} className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-[var(--font-tajawal)]">
                  {t('privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-[var(--font-tajawal)]">
              {language === 'ar' ? 'تواصل معنا' : language === 'ur' ? 'رابطہ کریں' : 'Contact Us'}
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>info@prayertimes.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>www.prayertimes.com</span>
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Facebook">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Twitter">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400">
            <p className="font-[var(--font-tajawal)]">
              {language === 'ar' 
                ? `© ${currentYear} أوقات الصلاة - جميع الحقوق محفوظة`
                : language === 'ur'
                ? `© ${currentYear} نماز کے اوقات - تمام حقوق محفوظ ہیں`
                : `© ${currentYear} Prayer Times - All Rights Reserved`
              }
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
