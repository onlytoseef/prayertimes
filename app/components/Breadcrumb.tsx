'use client';

import Link from 'next/link';
import { useLanguage, Language } from '../context/LanguageContext';

type BreadcrumbProps = {
  items: {
    label: string;
    labelAr?: string;
    href?: string;
  }[];
  language: Language;
};

export default function Breadcrumb({ items, language }: BreadcrumbProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className="hover:text-emerald-600 transition-colors">
                  {index === 0 
                    ? t('home') 
                    : language === 'ar' && item.labelAr 
                      ? item.labelAr 
                      : item.label}
                </Link>
              ) : (
                <span className="text-emerald-600 font-semibold">
                  {language === 'ar' && item.labelAr ? item.labelAr : item.label}
                </span>
              )}
              {index < items.length - 1 && <span>/</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
