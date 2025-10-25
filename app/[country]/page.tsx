import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, ArrowRight } from 'lucide-react';
import countriesData from '@/data/countries.json';

type Props = {
  params: Promise<{ country: string }>
}

export async function generateStaticParams() {
  return Object.keys(countriesData).map((slug) => ({
    country: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countrySlug } = await params;
  const country = countriesData[countrySlug as keyof typeof countriesData];
  
  if (!country) {
    return {
      title: 'Country Not Found',
    };
  }

  return {
    title: `${country.nameAr} - ${country.name} Prayer Times | أوقات الصلاة`,
    description: `Accurate prayer times for all cities in ${country.name} (${country.nameAr}). Find Salah times for major cities with precise calculations.`,
    keywords: [
      `${country.name} prayer times`,
      `${country.nameAr} مواقيت الصلاة`,
      'islamic prayer times',
      'salah times',
      `prayer times in ${country.name}`,
    ],
    openGraph: {
      title: `${country.name} Prayer Times`,
      description: `Prayer times for all cities in ${country.name}`,
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { country: countrySlug } = await params;
  const country = countriesData[countrySlug as keyof typeof countriesData];

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Country Not Found</h1>
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
              <h3 className="text-3xl font-bold text-center mb-12 text-gray-800 font-[var(--font-tajawal)]">
                المدن - Cities
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {country.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${country.slug}/${city.slug}-prayertime`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-emerald-500"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-grow">
                        <h4 className="text-2xl font-bold text-gray-800 mb-1 font-[var(--font-tajawal)] group-hover:text-emerald-600 transition-colors">
                          {city.nameAr}
                        </h4>
                        <p className="text-gray-600 text-lg">{city.name}</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{city.latitude.toFixed(4)}°, {city.longitude.toFixed(4)}°</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className="text-sm text-emerald-600 font-semibold">
                        View Prayer Times →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-[var(--font-tajawal)]">
                مواقيت الصلاة في {country.nameAr}
              </h3>
              <p className="text-gray-700 font-[var(--font-tajawal)] leading-relaxed mb-4">
                نوفر لكم مواقيت الصلاة الدقيقة لجميع مدن {country.nameAr} بناءً على الحسابات الفلكية الدقيقة.
                يمكنكم الاطلاع على أوقات الصلوات الخمس (الفجر، الظهر، العصر، المغرب، العشاء) لأي مدينة.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">
                Prayer Times in {country.name}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We provide accurate prayer times for all cities in {country.name} based on precise astronomical calculations.
                You can view the five daily prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for any city.
                Select your city from the list above to get detailed prayer schedules.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
