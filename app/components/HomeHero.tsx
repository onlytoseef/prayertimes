'use client';

import { Church, Calendar, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 font-[var(--font-tajawal)] leading-tight">
            {t('heroTitle')}
          </h1>
          
          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-emerald-50 font-[var(--font-tajawal)] leading-relaxed px-4">
            {t('heroDescription')}
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm">
              <Church className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium">{t('accurateTimes')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm">
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium">{t('hijriCalendar')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm">
              <Globe className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium">{t('multipleCountries')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
