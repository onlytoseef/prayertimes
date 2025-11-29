'use client';

import { Church, Calendar, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-5 md:mb-6 font-[var(--font-tajawal)] leading-tight tracking-tight">
            {t('heroTitle')}
          </h1>
          
          {/* Description */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 text-emerald-50 font-[var(--font-tajawal)] leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
            {t('heroDescription')}
          </p>
        </div>
      </div>
    </section>
  );
}
