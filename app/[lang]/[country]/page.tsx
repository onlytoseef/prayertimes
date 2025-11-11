import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LanguageInitializer from '../../components/LanguageInitializer';
import { MapPin, ArrowRight } from 'lucide-react';
import countriesData from '@/data/countries.json';
import type { Language } from '../../context/LanguageContext';

// Enable ISR - Revalidate every 24 hours
export const revalidate = 86400;

// Valid language codes
const LANGUAGES: Language[] = ['ar', 'en', 'ur'];

type Props = {
  params: Promise<{ lang: string; country: string }>
}

export async function generateStaticParams() {
  const params: { lang: string; country: string }[] = [];
  
  // Generate for all 3 languages
  LANGUAGES.forEach((lang) => {
    Object.keys(countriesData).forEach((slug) => {
      params.push({
        lang,
        country: slug,
      });
    });
  });
  
  console.log(`🚀 Generating ${params.length} static country pages (29 countries × 3 languages = 87 pages)...`);
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, country: countrySlug } = await params;
  const language = (LANGUAGES.includes(lang as Language) ? lang : 'ar') as Language;
  
  const country = countriesData[countrySlug as keyof typeof countriesData];
  
  if (!country) {
    return {
      title: 'Country Not Found',
    };
  }

  // Language-specific metadata
  const metadataByLanguage = {
    ar: {
      title: `أوقات الصلاة في ${country.nameAr} - جميع المدن ${new Date().getFullYear()}`,
      description: `أوقات الصلاة الكاملة لجميع المدن الـ ${country.cities.length} في ${country.nameAr}. مواقيت الفجر والظهر والعصر والمغرب والعشاء الدقيقة مع التقويم الهجري لكل مدينة.`,
      ogTitle: `أوقات الصلاة في ${country.nameAr}`,
      ogDescription: `مواقيت الصلاة الدقيقة لجميع المدن في ${country.nameAr}. ${country.cities.length} مدينة مغطاة.`,
    },
    en: {
      title: `Prayer Times in ${country.name} - All Cities ${new Date().getFullYear()}`,
      description: `Complete prayer times for all ${country.cities.length} cities in ${country.name}. Accurate Fajr, Dhuhr, Asr, Maghrib, and Isha timings with Hijri calendar for every city.`,
      ogTitle: `Prayer Times in ${country.name}`,
      ogDescription: `Accurate prayer times for all cities in ${country.name}. ${country.cities.length} cities covered.`,
    },
    ur: {
      title: `${country.name} میں نماز کے اوقات - تمام شہر ${new Date().getFullYear()}`,
      description: `${country.name} کے تمام ${country.cities.length} شہروں کے لیے مکمل نماز کے اوقات۔ ہر شہر کے لیے ہجری کیلنڈر کے ساتھ فجر، ظہر، عصر، مغرب اور عشاء کے درست اوقات۔`,
      ogTitle: `${country.name} میں نماز کے اوقات`,
      ogDescription: `${country.name} کے تمام شہروں کے لیے درست نماز کے اوقات۔ ${country.cities.length} شہر شامل ہیں۔`,
    },
  };

  const meta = metadataByLanguage[language];
  const baseUrl = `https://prayertimes.com/${language}/${countrySlug}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      `${country.name} prayer times`,
      `${country.nameAr} مواقيت الصلاة`,
      `${country.name} نماز کے اوقات`,
      'islamic prayer times',
      'salah times',
      `prayer times in ${country.name}`,
      `${country.name} namaz timings`,
      'accurate prayer schedule',
      'muslim prayer times',
    ],
    authors: [{ name: 'Prayer Times' }],
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      type: 'website',
      locale: language === 'ar' ? 'ar_SA' : language === 'ur' ? 'ur_PK' : 'en_US',
      url: baseUrl,
      siteName: 'Prayer Times',
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        'x-default': `https://prayertimes.com/ar/${countrySlug}`,
        'ar': `https://prayertimes.com/ar/${countrySlug}`,
        'en': `https://prayertimes.com/en/${countrySlug}`,
        'ur': `https://prayertimes.com/ur/${countrySlug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { lang, country: countrySlug } = await params;
  const language = (LANGUAGES.includes(lang as Language) ? lang : 'ar') as Language;
  
  const country = countriesData[countrySlug as keyof typeof countriesData];

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col">
        <LanguageInitializer language={language} />
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Country Not Found</h1>
            <Link href={`/${language}`} className="text-emerald-600 hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Initialize language from URL path */}
      <LanguageInitializer language={language} />
      
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-4">{country.flag}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[var(--font-tajawal)]">
                {country.nameAr}
              </h1>
              <h2 className="text-2xl md:text-3xl mb-4">{country.name}</h2>
              <p className="text-emerald-100 text-lg font-[var(--font-tajawal)]">
                اختر مدينة لعرض مواقيت الصلاة
              </p>
              <p className="text-emerald-100">
                Select a city to view prayer times
              </p>
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                Cities in {country.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {country.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${language}/${country.slug}/${city.slug}-prayertime`}
                    className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-emerald-500"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                          <h4 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                            {city.name}
                          </h4>
                        </div>
                        <p className="text-gray-600 font-[var(--font-tajawal)] text-right">
                          {city.nameAr}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
