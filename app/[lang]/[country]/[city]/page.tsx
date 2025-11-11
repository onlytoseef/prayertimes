import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CityPrayerTimes from '../../../components/CityPrayerTimes';
import CityDescription from '../../../components/CityDescription';
import CitySEOContent from '../../../components/CitySEOContent';
import OtherCities from '../../../components/OtherCities';
import LanguageInitializer from '../../../components/LanguageInitializer';
import { ArrowLeft } from 'lucide-react';
import countriesData from '@/data/countries.json';
import type { Language } from '../../../context/LanguageContext';

// Enable ISR - Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

// Valid language codes
const LANGUAGES: Language[] = ['ar', 'en', 'ur'];

type Props = {
  params: Promise<{ lang: string; country: string; city: string }>
}

// Generate static params for all cities AND all languages at build time
export async function generateStaticParams() {
  const params: { lang: string; country: string; city: string }[] = [];
  
  // Generate for all 3 languages
  LANGUAGES.forEach((lang) => {
    Object.entries(countriesData).forEach(([countrySlug, country]) => {
      country.cities.forEach((city) => {
        params.push({
          lang,
          country: countrySlug,
          city: city.slug,
        });
      });
    });
  });
  
  console.log(`🚀 Generating ${params.length} static prayer time pages (123 cities × 3 languages = 369 pages)...`);
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, country: countrySlug, city: cityParam } = await params;
  const language = (LANGUAGES.includes(lang as Language) ? lang : 'ar') as Language;
  
  const country = countriesData[countrySlug as keyof typeof countriesData];
  const citySlug = cityParam.replace('-prayertime', '');
  const city = country?.cities.find(c => c.slug === citySlug);
  
  if (!country || !city) {
    return {
      title: 'Prayer Times Not Found',
    };
  }

  // Language-specific metadata
  const metadataByLanguage = {
    ar: {
      title: `أوقات الصلاة في ${city.nameAr} - ${country.nameAr} ${new Date().getFullYear()}`,
      description: `احصل على أوقات الصلاة الدقيقة في ${city.nameAr}, ${country.nameAr}. مواقيت الفجر والظهر والعصر والمغرب والعشاء محدثة يومياً مع التقويم الهجري.`,
      ogTitle: `أوقات الصلاة في ${city.nameAr} - ${country.nameAr}`,
      ogDescription: `مواقيت الصلاة اليومية الدقيقة في ${city.nameAr}. الفجر، الظهر، العصر، المغرب، العشاء مع التقويم الهجري.`,
    },
    en: {
      title: `Prayer Times in ${city.name} - ${country.name} ${new Date().getFullYear()}`,
      description: `Get accurate prayer times for ${city.name}, ${country.name}. Daily Fajr, Dhuhr, Asr, Maghrib, and Isha timings based on verified Islamic calculations. Updated daily with Hijri calendar.`,
      ogTitle: `Prayer Times in ${city.name} - ${country.name}`,
      ogDescription: `Accurate daily prayer times for ${city.name}. Fajr, Dhuhr, Asr, Maghrib, Isha with Hijri calendar.`,
    },
    ur: {
      title: `${city.name} میں نماز کے اوقات - ${country.name} ${new Date().getFullYear()}`,
      description: `${city.name}, ${country.name} کے لیے درست نماز کے اوقات حاصل کریں۔ روزانہ فجر، ظہر، عصر، مغرب اور عشاء کے اوقات اسلامی حسابات کی بنیاد پر۔ ہجری کیلنڈر کے ساتھ روزانہ اپ ڈیٹ۔`,
      ogTitle: `${city.name} میں نماز کے اوقات - ${country.name}`,
      ogDescription: `${city.name} کے لیے روزانہ نماز کے اوقات۔ فجر، ظہر، عصر، مغرب، عشاء کے ساتھ ہجری کیلنڈر۔`,
    },
  };

  const meta = metadataByLanguage[language];
  const baseUrl = `https://prayertimes.com/${language}/${countrySlug}/${cityParam}`;

  // SEO-optimized metadata with rich information
  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      `${city.name} prayer times`,
      `${city.nameAr} مواقيت الصلاة`,
      `${city.name} نماز کے اوقات`,
      `prayer times in ${city.name}`,
      `${city.name} salah times`,
      `${city.name} namaz timings`,
      `${country.name} prayer times`,
      `${country.nameAr} مواقيت الصلاة`,
      `${country.name} نماز کے اوقات`,
      'islamic prayer times',
      'accurate prayer times',
      `fajr time ${city.name}`,
      `maghrib time ${city.name}`,
      `isha time ${city.name}`,
      'hijri calendar',
      'aladhan prayer times',
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
    twitter: {
      card: 'summary',
      title: meta.ogTitle,
      description: meta.ogDescription,
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        'x-default': `https://prayertimes.com/ar/${countrySlug}/${cityParam}`,
        'ar': `https://prayertimes.com/ar/${countrySlug}/${cityParam}`,
        'en': `https://prayertimes.com/en/${countrySlug}/${cityParam}`,
        'ur': `https://prayertimes.com/ur/${countrySlug}/${cityParam}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function CityPrayerTimePage({ params }: Props) {
  const { lang, country: countrySlug, city: cityParam } = await params;
  const language = (LANGUAGES.includes(lang as Language) ? lang : 'ar') as Language;
  
  const country = countriesData[countrySlug as keyof typeof countriesData];
  const citySlug = cityParam.replace('-prayertime', '');
  const city = country?.cities.find(c => c.slug === citySlug);

  if (!country || !city) {
    return (
      <div className="min-h-screen flex flex-col">
        <LanguageInitializer language={language} />
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">City Not Found</h1>
            <Link href={`/${language}`} className="text-emerald-600 hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Schema.org structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Prayer Times in ${city.name}`,
    "description": `Accurate Islamic prayer times for ${city.name}, ${country.name}`,
    "url": `https://prayertimes.com/${language}/${countrySlug}/${cityParam}`,
    "inLanguage": language === 'ar' ? 'ar-SA' : language === 'ur' ? 'ur-PK' : 'en-US',
    "about": {
      "@type": "Place",
      "name": city.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city.name,
        "addressCountry": country.name
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": city.latitude,
        "longitude": city.longitude
      }
    },
    "mainEntity": {
      "@type": "Event",
      "name": "Islamic Prayer Times",
      "eventSchedule": {
        "@type": "Schedule",
        "repeatFrequency": "Daily",
        "byDay": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      "location": {
        "@type": "Place",
        "name": city.name,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": city.name,
          "addressCountry": country.name
        }
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `https://prayertimes.com/${language}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": country.name,
          "item": `https://prayertimes.com/${language}/${countrySlug}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": city.name,
          "item": `https://prayertimes.com/${language}/${countrySlug}/${cityParam}`
        }
      ]
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Initialize language from URL path */}
      <LanguageInitializer language={language} />
      
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href={`/${language}`} className="hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href={`/${language}/${country.slug}`} className="hover:text-emerald-600 transition-colors">
                {country.name}
              </Link>
              <span>/</span>
              <span className="text-emerald-600 font-semibold">{city.name}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link
                href={`/${language}/${country.slug}`}
                className="inline-flex items-center gap-2 text-emerald-100 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to {country.name}</span>
              </Link>
              
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 font-[var(--font-tajawal)]">
                  مواقيت الصلاة في {city.nameAr}
                </h1>
                <h2 className="text-2xl md:text-3xl mb-2">
                  Prayer Times in {city.name}
                </h2>
                <p className="text-emerald-100 text-lg">
                  {country.name} {country.flag}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prayer Times Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* City Description */}
              <CityDescription 
                countrySlug={countrySlug}
                citySlug={citySlug}
                cityName={city.name}
                cityNameAr={city.nameAr}
                countryName={country.name}
              />
              
              {/* Prayer Times Table */}
              <CityPrayerTimes
                cityName={city.name}
                cityNameAr={city.nameAr}
                latitude={city.latitude}
                longitude={city.longitude}
              />
            </div>
          </div>
        </section>

        {/* SEO Content - Language-aware */}
        <CitySEOContent 
          cityName={city.name}
          cityNameAr={city.nameAr}
          latitude={city.latitude}
          longitude={city.longitude}
        />

        {/* Other Cities - Multilingual */}
        <OtherCities 
          currentCitySlug={city.slug}
          countrySlug={countrySlug}
          countryName={country.name}
          countryNameAr={country.nameAr}
          cities={country.cities}
          language={language}
        />
      </main>

      <Footer />
    </div>
  );
}
