import Header from '../components/Header';
import Footer from '../components/Footer';
import HolyCitiesPrayerTable from '../components/HolyCitiesPrayerTable';
import HijriCalendar from '../components/HijriCalendar';
import CountriesList from '../components/CountriesList';
import LanguageInitializer from '../components/LanguageInitializer';
import HomeHero from '../components/HomeHero';
import type { Language } from '../context/LanguageContext';

// Generate static params for all languages at build time
export function generateStaticParams() {
  return [
    { lang: 'ar' },
    { lang: 'en' },
    { lang: 'ur' },
  ];
}

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function LangHome({ params }: Props) {
  const { lang } = await params;
  const language = (['ar', 'en', 'ur'].includes(lang) ? lang : 'ar') as Language;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LanguageInitializer language={language} />
      <Header />
      
      <main className="flex-grow">
        <HomeHero />
        
        {/* Holy Cities Prayer Times Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <HolyCitiesPrayerTable />
          </div>
        </section>

        {/* Hijri Calendar Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <HijriCalendar />
          </div>
        </section>

        {/* Countries List Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <CountriesList language={language} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
