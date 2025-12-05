import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import LanguageInitializer from '../../components/LanguageInitializer';
import CapitalPrayerTimes from '../../components/CapitalPrayerTimes';
import RelatedCountries from '../../components/RelatedCountries';
import { MapPin, ArrowRight } from 'lucide-react';
import countriesData from '@/data/countries.json';
import type { Language } from '../../context/LanguageContext';

// Enable ISR - Revalidate every 6 hours (21600 seconds)
export const revalidate = 21600;

// Valid language codes
const LANGUAGES: Language[] = ['ar', 'en', 'ur', 'de', 'fr', 'es', 'fa', 'id', 'tr'];

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
      title: `مواقيت الصلاة في ${country.nameAr} - جميع المدن ${new Date().getFullYear()}`,
      description: `مواقيت الصلاة الكاملة لجميع المدن الـ ${country.cities.length} في ${country.nameAr}. أوقات الفجر والظهر والعصر والمغرب والعشاء الدقيقة مع التقويم الهجري واتجاه القبلة لكل مدينة.`,
      ogTitle: `مواقيت الصلاة في ${country.nameAr}`,
      ogDescription: `مواقيت الصلاة الدقيقة لجميع المدن في ${country.nameAr}. ${country.cities.length} مدينة مغطاة.`,
    },
    en: {
      title: `Prayer Times in ${country.name} - All Cities ${new Date().getFullYear()}`,
      description: `Complete prayer times for all ${country.cities.length} cities in ${country.name}. Accurate Fajr, Dhuhr, Asr, Maghrib, and Isha timings with Hijri calendar and Qibla direction for every city.`,
      ogTitle: `Prayer Times in ${country.name}`,
      ogDescription: `Accurate prayer times for all cities in ${country.name}. ${country.cities.length} cities covered.`,
    },
    ur: {
      title: `${country.name} میں نماز کے اوقات - تمام شہر ${new Date().getFullYear()}`,
      description: `${country.name} کے تمام ${country.cities.length} شہروں کے لیے مکمل نماز کے اوقات۔ ہر شہر کے لیے ہجری کیلنڈر اور قبلہ کی سمت کے ساتھ فجر، ظہر، عصر، مغرب اور عشاء کے درست اوقات۔`,
      ogTitle: `${country.name} میں نماز کے اوقات`,
      ogDescription: `${country.name} کے تمام شہروں کے لیے درست نماز کے اوقات۔ ${country.cities.length} شہر شامل ہیں۔`,
    },
    de: {
      title: `Gebetszeiten in ${country.name} - Alle Städte ${new Date().getFullYear()}`,
      description: `Vollständige Gebetszeiten für alle ${country.cities.length} Städte in ${country.name}. Genaue Fadschr, Dhuhr, Asr, Maghrib und Ischaa Zeiten mit islamischem Kalender und Qibla-Richtung für jede Stadt.`,
      ogTitle: `Gebetszeiten in ${country.name}`,
      ogDescription: `Genaue Gebetszeiten für alle Städte in ${country.name}. ${country.cities.length} Städte abgedeckt.`,
    },
    fr: {
      title: `Horaires de prière en ${country.name} - Toutes les villes ${new Date().getFullYear()}`,
      description: `Horaires de prière complets pour toutes les ${country.cities.length} villes de ${country.name}. Horaires précis de Fajr, Dhuhr, Asr, Maghrib et Isha avec calendrier hégirien et direction de la Qibla pour chaque ville.`,
      ogTitle: `Horaires de prière en ${country.name}`,
      ogDescription: `Horaires de prière précis pour toutes les villes de ${country.name}. ${country.cities.length} villes couvertes.`,
    },
    es: {
      title: `Horarios de oración en ${country.name} - Todas las ciudades ${new Date().getFullYear()}`,
      description: `Horarios de oración completos para todas las ${country.cities.length} ciudades de ${country.name}. Horarios precisos de Fajr, Dhuhr, Asr, Maghrib e Isha con calendario hegírico y dirección de la Qibla para cada ciudad.`,
      ogTitle: `Horarios de oración en ${country.name}`,
      ogDescription: `Horarios de oración precisos para todas las ciudades de ${country.name}. ${country.cities.length} ciudades cubiertas.`,
    },
    fa: {
      title: `اوقات نماز در ${country.name} - همه شهرها ${new Date().getFullYear()}`,
      description: `اوقات کامل نماز برای همه ${country.cities.length} شهر ${country.name}. اوقات دقیق صبح، ظهر، عصر، مغرب و عشا با تقویم هجری و جهت قبله برای هر شهر.`,
      ogTitle: `اوقات نماز در ${country.name}`,
      ogDescription: `اوقات دقیق نماز برای همه شهرهای ${country.name}. ${country.cities.length} شهر پوشش داده شده.`,
    },
    id: {
      title: `Waktu Sholat di ${country.name} - Semua Kota ${new Date().getFullYear()}`,
      description: `Waktu sholat lengkap untuk semua ${country.cities.length} kota di ${country.name}. Waktu Subuh, Dzuhur, Ashar, Maghrib, dan Isya yang akurat dengan kalender Hijriah dan arah Kiblat untuk setiap kota.`,
      ogTitle: `Waktu Sholat di ${country.name}`,
      ogDescription: `Waktu sholat akurat untuk semua kota di ${country.name}. ${country.cities.length} kota tercakup.`,
    },
    tr: {
      title: `${country.name} Namaz Vakitleri - Tüm Şehirler ${new Date().getFullYear()}`,
      description: `${country.name}'deki tüm ${country.cities.length} şehir için tam namaz vakitleri. Her şehir için Hicri takvim ve Kıble yönü ile doğru İmsak, Öğle, İkindi, Akşam ve Yatsı vakitleri.`,
      ogTitle: `${country.name} Namaz Vakitleri`,
      ogDescription: `${country.name}'deki tüm şehirler için doğru namaz vakitleri. ${country.cities.length} şehir kapsandı.`,
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
      locale: language === 'ar' ? 'ar_SA' : language === 'ur' ? 'ur_PK' : language === 'de' ? 'de_DE' : language === 'fr' ? 'fr_FR' : language === 'es' ? 'es_ES' : language === 'fa' ? 'fa_IR' : language === 'id' ? 'id_ID' : language === 'tr' ? 'tr_TR' : 'en_US',
      url: baseUrl,
      siteName: 'Prayer Times',
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        'x-default': `https://prayertimes.com/${countrySlug}`,
        'ar': `https://prayertimes.com/${countrySlug}`,
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
        <Breadcrumb 
          language={language}
          items={[
            { label: 'Home', href: `/${language}` },
            { label: country.name, labelAr: country.nameAr }
          ]}
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Main Title - SEO Optimized */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-[var(--font-tajawal)] leading-tight">
                {language === 'ar' 
                  ? `مواقيت الصلاة في ${country.nameAr}`
                  : language === 'ur'
                  ? `${country.name} میں نماز کے اوقات`
                  : language === 'de'
                  ? `Gebetszeiten in ${country.name}`
                  : language === 'fr'
                  ? `Horaires de prière en ${country.name}`
                  : language === 'es'
                  ? `Horarios de oración en ${country.name}`
                  : language === 'fa'
                  ? `اوقات نماز در ${country.name}`
                  : language === 'id'
                  ? `Waktu Sholat di ${country.name}`
                  : language === 'tr'
                  ? `${country.name} Namaz Vakitleri`
                  : `Prayer Times in ${country.name}`}
              </h1>
              
              {/* SEO-Rich Description Paragraph */}
              <div className="text-emerald-50 text-base sm:text-lg font-[var(--font-tajawal)] max-w-4xl mx-auto leading-relaxed">
                <p>
                  {language === 'ar'
                    ? `احصل على مواقيت الصلاة الدقيقة لجميع مدن ${country.nameAr} بما في ذلك ${country.cities.slice(0, 4).map(c => c.nameAr).join('، ')}${country.cities.length > 4 ? '، وغيرها' : ''}. نوفر أوقات الفجر والظهر والعصر والمغرب والعشاء مع التقويم الهجري واتجاه القبلة لكل مدينة في ${country.nameAr}.`
                    : language === 'ur'
                    ? `${country.name} کے تمام شہروں بشمول ${country.cities.slice(0, 4).map(c => c.nameAr).join('، ')}${country.cities.length > 4 ? ' اور دیگر' : ''} کے لیے درست نماز کے اوقات حاصل کریں۔ ہم ${country.name} کے ہر شہر کے لیے فجر، ظہر، عصر، مغرب اور عشاء کے اوقات ہجری کیلنڈر اور قبلہ کی سمت کے ساتھ فراہم کرتے ہیں۔`
                    : language === 'de'
                    ? `Erhalten Sie genaue Gebetszeiten für alle Städte in ${country.name}, einschließlich ${country.cities.slice(0, 4).map(c => c.name).join(', ')}${country.cities.length > 4 ? ' und mehr' : ''}. Wir bieten Fadschr, Dhuhr, Asr, Maghrib und Ischaa Zeiten mit islamischem Kalender und Qibla-Richtung für jede Stadt in ${country.name}.`
                    : language === 'fr'
                    ? `Obtenez des horaires de prière précis pour toutes les villes de ${country.name}, y compris ${country.cities.slice(0, 4).map(c => c.name).join(', ')}${country.cities.length > 4 ? ' et plus' : ''}. Nous fournissons les horaires de Fajr, Dhuhr, Asr, Maghrib et Isha avec le calendrier hégirien et la direction de la Qibla pour chaque ville de ${country.name}.`
                    : language === 'es'
                    ? `Obtenga horarios de oración precisos para todas las ciudades de ${country.name}, incluyendo ${country.cities.slice(0, 4).map(c => c.name).join(', ')}${country.cities.length > 4 ? ' y más' : ''}. Proporcionamos los horarios de Fajr, Dhuhr, Asr, Maghrib e Isha con el calendario hegírico y la dirección de la Qibla para cada ciudad de ${country.name}.`
                    : language === 'fa'
                    ? `اوقات دقیق نماز را برای تمام شهرهای ${country.nameAr} از جمله ${country.cities.slice(0, 4).map(c => c.nameAr).join('، ')}${country.cities.length > 4 ? ' و غیره' : ''} دریافت کنید. ما اوقات فجر، ظهر، عصر، مغرب و عشاء را همراه با تقویم هجری و جهت قبله برای هر شهر در ${country.nameAr} ارائه می‌دهیم.`
                    : language === 'id'
                    ? `Dapatkan waktu sholat yang akurat untuk semua kota di ${country.name}, termasuk ${country.cities.slice(0, 4).map(c => c.name).join(', ')}${country.cities.length > 4 ? ' dan lainnya' : ''}. Kami menyediakan waktu Subuh, Dzuhur, Ashar, Maghrib, dan Isya dengan kalender Hijriah dan arah Kiblat untuk setiap kota di ${country.name}.`
                    : language === 'tr'
                    ? `${country.name}'deki ${country.cities.slice(0, 4).map(c => c.name).join(', ')}${country.cities.length > 4 ? ' ve daha fazlası' : ''} dahil olmak üzere tüm şehirler için doğru namaz vakitlerini edinin. ${country.name}'deki her şehir için Hicri takvim ve Kıble yönü ile İmsak, Öğle, İkindi, Akşam ve Yatsı vakitlerini sağlıyoruz.`
                    : `Get accurate prayer times for all cities in ${country.name} including ${country.cities.slice(0, 4).map(c => c.name).join(', ')}${country.cities.length > 4 ? ', and more' : ''}. We provide Fajr, Dhuhr, Asr, Maghrib, and Isha timings with Hijri calendar and Qibla direction for every city in ${country.name}.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capital City Prayer Times */}
        <CapitalPrayerTimes
          cityName={country.cities[0].name}
          cityNameAr={country.cities[0].nameAr}
          latitude={country.cities[0].latitude}
          longitude={country.cities[0].longitude}
          countryName={country.name}
          countryNameAr={country.nameAr}
        />

        {/* Cities Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center font-[var(--font-tajawal)]">
                {language === 'ar' 
                  ? `مواقيت الصلاة في مدن ${country.nameAr} الأخرى`
                  : language === 'ur'
                  ? `${country.name} کے دیگر شہروں میں نماز کے اوقات`
                  : language === 'de'
                  ? `Gebetszeiten in anderen Städten von ${country.name}`
                  : language === 'fr'
                  ? `Horaires de prière dans d'autres villes de ${country.name}`
                  : language === 'es'
                  ? `Horarios de oración en otras ciudades de ${country.name}`
                  : language === 'fa'
                  ? `اوقات نماز در شهرهای دیگر ${country.name}`
                  : language === 'id'
                  ? `Waktu sholat di kota lain di ${country.name}`
                  : language === 'tr'
                  ? `${country.name}'deki diğer şehirlerde namaz vakitleri`
                  : `Prayer time in other cities of ${country.name}`}
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
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors font-[var(--font-tajawal)] leading-tight">
                            {language === 'ar'
                              ? `مواقيت الصلاة في ${city.nameAr}`
                              : language === 'ur'
                              ? `${city.nameAr} میں نماز کے اوقات`
                              : language === 'de'
                              ? `Gebetszeiten in ${city.name}`
                              : language === 'fr'
                              ? `Horaires de prière à ${city.name}`
                              : language === 'es'
                              ? `Horarios de oración en ${city.name}`
                              : language === 'fa'
                              ? `اوقات نماز در ${city.name}`
                              : language === 'id'
                              ? `Waktu sholat di ${city.name}`
                              : language === 'tr'
                              ? `${city.name} namaz vakitleri`
                              : `Prayer time in ${city.name}`}
                          </h3>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Countries */}
        <RelatedCountries currentCountrySlug={country.slug} language={language} />
      </main>

      <Footer />
    </div>
  );
}
