import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumb from '../../../components/Breadcrumb';
import CityPrayerTimes from '../../../components/CityPrayerTimes';
import MonthlyPrayerTimesServer from '../../../components/MonthlyPrayerTimesServer';
import OtherCities from '../../../components/OtherCities';
import QiblaDirection from '../../../components/QiblaDirection';
import PrayerTimesFAQ from '../../../components/PrayerTimesFAQ';
import LanguageInitializer from '../../../components/LanguageInitializer';
import { ArrowLeft } from 'lucide-react';
import countriesData from '@/data/countries.json';
import type { Language } from '../../../context/LanguageContext';

// Enable ISR - Revalidate every 6 hours (21600 seconds)
export const revalidate = 21600;

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
      title: `مواقيت الصلاة والأذان في ${city.nameAr} ${country.nameAr} اليوم`,
      description: `احصل على أوقات الصلاة الدقيقة في ${city.nameAr}, ${country.nameAr}. مواقيت الفجر والظهر والعصر والمغرب والعشاء محدثة يومياً مع التقويم الهجري.`,
      ogTitle: `مواقيت الصلاة والأذان في ${city.nameAr} ${country.nameAr} اليوم`,
      ogDescription: `مواقيت الصلاة اليومية الدقيقة في ${city.nameAr}. الفجر، الظهر، العصر، المغرب، العشاء مع التقويم الهجري.`,
    },
    en: {
      title: `Prayer and Azan Times in ${city.name} ${country.name} Today`,
      description: `Get accurate prayer times for ${city.name}, ${country.name}. Daily Fajr, Dhuhr, Asr, Maghrib, and Isha timings based on verified Islamic calculations. Updated daily with Hijri calendar.`,
      ogTitle: `Prayer and Azan Times in ${city.name} ${country.name} Today`,
      ogDescription: `Accurate daily prayer times for ${city.name}. Fajr, Dhuhr, Asr, Maghrib, Isha with Hijri calendar.`,
    },
    ur: {
      title: `${city.name} ${country.name} میں آج نماز اور اذان کے اوقات`,
      description: `${city.name}, ${country.name} کے لیے درست نماز کے اوقات حاصل کریں۔ روزانہ فجر، ظہر، عصر، مغرب اور عشاء کے اوقات اسلامی حسابات کی بنیاد پر۔ ہجری کیلنڈر کے ساتھ روزانہ اپ ڈیٹ۔`,
      ogTitle: `${city.name} ${country.name} میں آج نماز اور اذان کے اوقات`,
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
        'x-default': `https://prayertimes.com/${countrySlug}/${cityParam}`,
        'ar': `https://prayertimes.com/${countrySlug}/${cityParam}`,
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

  // Fetch prayer times server-side for SEO and components
  let prayerTimesData = null;
  let hijriDate = '';
  let gregorianDate = '';
  let monthlyPrayerTimes: Array<{ date: Date; timings: any }> = [];
  
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${city.latitude}&longitude=${city.longitude}&method=4`,
      {
        next: { revalidate: 21600 } // Cache for 6 hours
      }
    );
    const data = await response.json();
    
    if (data.code === 200) {
      prayerTimesData = data.data.timings;
      hijriDate = `${data.data.date.hijri.day} ${data.data.date.hijri.month.ar} ${data.data.date.hijri.year}`;
      gregorianDate = data.data.date.readable;
    }

    // Fetch 30 days prayer times for monthly table (in batches to avoid timeout)
    // Skip during build to avoid API overload, will fetch on client-side
    const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL;
    
    if (!isBuildTime) {
      const today = new Date();
      const batchSize = 3; // Reduced to 3 for better reliability
      
      for (let batch = 0; batch < 10; batch++) { // 10 batches of 3 days = 30 days
        const batchPromises = [];
        
        for (let i = 0; i < batchSize; i++) {
          const dayIndex = batch * batchSize + i;
          if (dayIndex >= 30) break;
          
          const date = new Date(today);
          date.setDate(today.getDate() + dayIndex);
          const timestamp = Math.floor(date.getTime() / 1000);
          
          batchPromises.push(
            fetch(
              `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${city.latitude}&longitude=${city.longitude}&method=4`,
              { 
                next: { revalidate: 21600 },
                signal: AbortSignal.timeout(30000) // 30 second timeout
              }
            )
            .then(res => res.json())
            .then(data => ({ data, date }))
            .catch(err => {
              console.error(`Error fetching prayer times for day ${dayIndex}:`, err);
              return null;
            })
          );
        }

        const batchResults = await Promise.all(batchPromises);
        
        batchResults.forEach(result => {
          if (result && result.data && result.data.code === 200) {
            monthlyPrayerTimes.push({
              date: result.date,
              timings: result.data.data.timings
            });
          }
        });
        
        // Delay between batches to avoid rate limiting
        if (batch < 9) {
          await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
        }
      }
    }

  } catch (error) {
    console.error('Error fetching prayer times for SEO:', error);
  }

  // Enhanced Schema.org structured data with prayer times
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Prayer Times in ${city.name}`,
    "description": `Accurate Islamic prayer times for ${city.name}, ${country.name}. Today's prayer schedule including Fajr, Dhuhr, Asr, Maghrib, and Isha times.`,
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
    "mainEntity": prayerTimesData ? {
      "@type": "Schedule",
      "name": `Daily Prayer Times in ${city.name}`,
      "description": `Islamic prayer schedule for ${city.name}, ${country.name}`,
      "scheduleTimezone": "UTC",
      "byDay": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "event": [
        {
          "@type": "Event",
          "name": "Fajr Prayer",
          "description": "Dawn prayer - First prayer of the day",
          "startTime": prayerTimesData.Fajr,
          "location": {
            "@type": "Place",
            "name": city.name,
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": city.latitude,
              "longitude": city.longitude
            }
          }
        },
        {
          "@type": "Event",
          "name": "Sunrise",
          "description": "Time when sun rises",
          "startTime": prayerTimesData.Sunrise,
          "location": {
            "@type": "Place",
            "name": city.name
          }
        },
        {
          "@type": "Event",
          "name": "Dhuhr Prayer",
          "description": "Noon prayer - Second prayer of the day",
          "startTime": prayerTimesData.Dhuhr,
          "location": {
            "@type": "Place",
            "name": city.name,
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": city.latitude,
              "longitude": city.longitude
            }
          }
        },
        {
          "@type": "Event",
          "name": "Asr Prayer",
          "description": "Afternoon prayer - Third prayer of the day",
          "startTime": prayerTimesData.Asr,
          "location": {
            "@type": "Place",
            "name": city.name,
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": city.latitude,
              "longitude": city.longitude
            }
          }
        },
        {
          "@type": "Event",
          "name": "Maghrib Prayer",
          "description": "Sunset prayer - Fourth prayer of the day",
          "startTime": prayerTimesData.Maghrib,
          "location": {
            "@type": "Place",
            "name": city.name,
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": city.latitude,
              "longitude": city.longitude
            }
          }
        },
        {
          "@type": "Event",
          "name": "Isha Prayer",
          "description": "Night prayer - Fifth prayer of the day",
          "startTime": prayerTimesData.Isha,
          "location": {
            "@type": "Place",
            "name": city.name,
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": city.latitude,
              "longitude": city.longitude
            }
          }
        }
      ]
    } : {
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
        <Breadcrumb 
          language={language}
          items={[
            { label: 'Home', href: `/${language}` },
            { label: country.name, labelAr: country.nameAr, href: `/${language}/${country.slug}` },
            { label: city.name, labelAr: city.nameAr }
          ]}
        />

        {/* Hero Section - Responsive Typography */}
        <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 text-white py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-3 sm:space-y-4 md:space-y-5">
              {/* Main Heading - Progressive Text Scaling */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 font-[var(--font-tajawal)] leading-tight px-2">
                  {language === 'ar' ? `مواقيت الصلاة في ${city.nameAr}` : language === 'ur' ? `${city.name} میں نماز کے اوقات` : `Prayer Times in ${city.name}`}
                </h1>
                
                {/* Secondary City Name - Conditional Display */}
                {language === 'ur' && (
                  <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 sm:mb-3 text-emerald-50 font-medium">
                    {city.name}
                  </h2>
                )}
                
                {/* Country Info Badge - Responsive */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                  <span className="text-base sm:text-lg md:text-xl font-semibold">
                    {language === 'ar' ? country.nameAr : country.name}
                  </span>
                </div>

                {/* Dynamic Prayer Times Summary Paragraph - Server-Side Rendered */}
                {prayerTimesData && hijriDate && (
                  <div className="mt-4 sm:mt-6 max-w-4xl mx-auto">
                    <p className="text-sm sm:text-base md:text-lg text-emerald-50 leading-relaxed font-[var(--font-tajawal)] px-4">
                      {language === 'ar' 
                        ? `اليوم ${gregorianDate} مواقيت الصلاة في ${city.nameAr} هي وقت الفجر ${prayerTimesData.Fajr}، وقت الظهر ${prayerTimesData.Dhuhr}، وقت العصر ${prayerTimesData.Asr}، وقت المغرب ${prayerTimesData.Maghrib} ووقت العشاء ${prayerTimesData.Isha}.`
                        : language === 'ur'
                        ? `آج ${gregorianDate} ${city.name} میں نماز کے اوقات فجر ${prayerTimesData.Fajr}، ظہر ${prayerTimesData.Dhuhr}، عصر ${prayerTimesData.Asr}، مغرب ${prayerTimesData.Maghrib} اور عشاء ${prayerTimesData.Isha} ہیں۔`
                        : `Today ${gregorianDate} prayer times ${city.name} are Fajr Time ${prayerTimesData.Fajr}, Dhuhr Time ${prayerTimesData.Dhuhr}, Asr Time ${prayerTimesData.Asr}, Maghrib Time ${city.name} ${prayerTimesData.Maghrib} & Isha Time ${prayerTimesData.Isha}.`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Prayer Times Section - Directly after Hero */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <CityPrayerTimes
                cityName={city.name}
                cityNameAr={city.nameAr}
                latitude={city.latitude}
                longitude={city.longitude}
                initialPrayerTimes={prayerTimesData}
                initialHijriDate={hijriDate}
                initialGregorianDate={gregorianDate}
              />
            </div>
          </div>
        </section>

        {/* Monthly Prayer Times Table */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              {monthlyPrayerTimes.length > 0 ? (
                <MonthlyPrayerTimesServer
                  cityName={city.name}
                  cityNameAr={city.nameAr}
                  monthlyData={monthlyPrayerTimes}
                  language={language}
                />
              ) : (
                <div className="bg-white rounded-xl shadow-xl p-8 text-center">
                  <p className="text-gray-600 font-[var(--font-tajawal)]">
                    {language === 'ar' 
                      ? 'جدول الشهر متاح عند زيارة الصفحة' 
                      : language === 'ur' 
                      ? 'ماہانہ ٹائم ٹیبل صفحہ دیکھنے پر دستیاب ہے'
                      : 'Monthly timetable available when visiting page'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Qibla Direction */}
        <QiblaDirection 
          cityName={city.name}
          cityNameAr={city.nameAr}
          latitude={city.latitude}
          longitude={city.longitude}
        />

        {/* FAQs Section */}
        <PrayerTimesFAQ 
          language={language}
          cityName={city.name}
          cityNameAr={city.nameAr}
          countryName={country.name}
          countryNameAr={country.nameAr}
          prayerTimes={prayerTimesData || undefined}
        />

        {/* Other Cities - With Proper Format */}
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
