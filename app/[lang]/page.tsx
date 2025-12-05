import Header from '../components/Header';
import Footer from '../components/Footer';
import HolyCitiesPrayerTable from '../components/HolyCitiesPrayerTable';
import CountriesList from '../components/CountriesList';
import LanguageInitializer from '../components/LanguageInitializer';
import HomeHero from '../components/HomeHero';
import AutoQiblaDirection from '../components/AutoQiblaDirection';
import type { Language } from '../context/LanguageContext';

// Enable ISR - Revalidate every 6 hours
export const revalidate = 21600;

// Generate static params for all languages at build time
export function generateStaticParams() {
  return [
    { lang: 'ar' },
    { lang: 'en' },
    { lang: 'ur' },
    { lang: 'de' },
    { lang: 'fr' },
    { lang: 'es' },
    { lang: 'fa' },
    { lang: 'id' },
    { lang: 'tr' },
  ];
}

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function LangHome({ params }: Props) {
  const { lang } = await params;
  const language = (['ar', 'en', 'ur', 'de', 'fr', 'es', 'fa', 'id', 'tr'].includes(lang) ? lang : 'ar') as Language;

  // Fetch Holy Cities prayer times on server
  let holyCitiesData = null;
  try {
    const [makkahRes, madinahRes] = await Promise.all([
      fetch('https://api.aladhan.com/v1/timingsByCity?city=Makkah&country=SA&method=4', {
        next: { revalidate: 21600 }
      }),
      fetch('https://api.aladhan.com/v1/timingsByCity?city=Madinah&country=SA&method=4', {
        next: { revalidate: 21600 }
      })
    ]);

    const [makkahData, madinahData] = await Promise.all([
      makkahRes.json(),
      madinahRes.json()
    ]);

    if (makkahData.code === 200 && madinahData.code === 200) {
      holyCitiesData = {
        makkah: makkahData.data.timings,
        madinah: madinahData.data.timings,
        hijriDate: `${makkahData.data.date.hijri.day} ${makkahData.data.date.hijri.month.ar} ${makkahData.data.date.hijri.year}`
      };
    }
  } catch (error) {
    console.error('Error fetching holy cities prayer times:', error);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LanguageInitializer language={language} />
      <Header />
      
      <main className="flex-grow">
        <HomeHero />
        
        {/* Holy Cities Prayer Times Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <HolyCitiesPrayerTable initialData={holyCitiesData} />
          </div>
        </section>

        {/* Countries List Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <CountriesList language={language} />
          </div>
        </section>

        {/* Auto Qibla Direction Section */}
        <AutoQiblaDirection />
      </main>

      <Footer />
    </div>
  );
}
