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
    <div className="min-h-screen flex flex-col">
      <LanguageInitializer language={language} />
      <Header />
      
      <main className="flex-grow">
        <HomeHero />
        <HolyCitiesPrayerTable />
        <HijriCalendar />
        <CountriesList language={language} />
      </main>

      <Footer />
    </div>
  );
}
