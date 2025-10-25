import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CityPrayerTimes from '../../components/CityPrayerTimes';
import { ArrowLeft } from 'lucide-react';
import countriesData from '@/data/countries.json';

type Props = {
  params: Promise<{ country: string; city: string }>
}

export async function generateStaticParams() {
  const params: { country: string; city: string }[] = [];
  
  Object.entries(countriesData).forEach(([countrySlug, country]) => {
    country.cities.forEach((city) => {
      params.push({
        country: countrySlug,
        city: city.slug,
      });
    });
  });
  
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countrySlug, city: cityParam } = await params;
  const country = countriesData[countrySlug as keyof typeof countriesData];
  const citySlug = cityParam.replace('-prayertime', '');
  const city = country?.cities.find(c => c.slug === citySlug);
  
  if (!country || !city) {
    return {
      title: 'Prayer Times Not Found',
    };
  }

  return {
    title: `${city.nameAr} Prayer Times - ${city.name} | مواقيت الصلاة`,
    description: `Accurate prayer times for ${city.name} (${city.nameAr}), ${country.name}. Daily Salah times including Fajr, Dhuhr, Asr, Maghrib, and Isha with precise calculations.`,
    keywords: [
      `${city.name} prayer times`,
      `${city.nameAr} مواقيت الصلاة`,
      `prayer times in ${city.name}`,
      `${city.name} salah times`,
      `${country.name} prayer times`,
      'islamic prayer times',
      'accurate prayer times',
    ],
    openGraph: {
      title: `${city.name} Prayer Times - ${city.nameAr}`,
      description: `Daily prayer times for ${city.name}, ${country.name}`,
      type: 'website',
    },
    alternates: {
      canonical: `/${countrySlug}/${cityParam}`,
    },
  };
}

export default async function CityPrayerTimePage({ params }: Props) {
  const { country: countrySlug, city: cityParam } = await params;
  const country = countriesData[countrySlug as keyof typeof countriesData];
  const citySlug = cityParam.replace('-prayertime', '');
  const city = country?.cities.find(c => c.slug === citySlug);

  if (!country || !city) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">City Not Found</h1>
            <Link href="/" className="text-emerald-600 hover:underline">
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
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href={`/${country.slug}`} className="hover:text-emerald-600 transition-colors">
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
                href={`/${country.slug}`}
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
              <CityPrayerTimes
                cityName={city.name}
                cityNameAr={city.nameAr}
                latitude={city.latitude}
                longitude={city.longitude}
              />
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-[var(--font-tajawal)]">
                عن مواقيت الصلاة في {city.nameAr}
              </h3>
              <p className="text-gray-700 font-[var(--font-tajawal)] leading-relaxed mb-6">
                نقدم لكم مواقيت الصلاة الدقيقة لمدينة {city.nameAr} في {country.nameAr}.
                يتم حساب الأوقات بناءً على الإحداثيات الجغرافية الدقيقة للمدينة وطريقة حساب جامعة أم القرى بمكة المكرمة.
                تشمل الأوقات: صلاة الفجر، الظهر، العصر، المغرب، والعشاء.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">
                About Prayer Times in {city.name}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We provide accurate prayer times for {city.name}, {country.name}, calculated based on the city's precise geographic coordinates
                using the Umm Al-Qura University (Makkah) calculation method. The times include all five daily prayers: Fajr, Dhuhr, Asr, Maghrib, and Isha.
              </p>

              <h4 className="text-xl font-bold text-gray-800 mb-3">Why Accurate Prayer Times Matter</h4>
              <p className="text-gray-700 leading-relaxed">
                Performing prayers at their correct times is one of the fundamental pillars of Islam. Our calculations use the latest astronomical data
                to ensure you never miss a prayer. The times are automatically adjusted for your location's latitude and longitude.
              </p>
            </div>
          </div>
        </section>

        {/* Other Cities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Other Cities in {country.name}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {country.cities
                  .filter(c => c.slug !== city.slug)
                  .map((otherCity) => (
                    <Link
                      key={otherCity.slug}
                      href={`/${country.slug}/${otherCity.slug}-prayertime`}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-4 text-center group"
                    >
                      <p className="text-lg font-bold text-gray-800 mb-1 font-[var(--font-tajawal)] group-hover:text-emerald-600 transition-colors">
                        {otherCity.nameAr}
                      </p>
                      <p className="text-sm text-gray-600">{otherCity.name}</p>
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
