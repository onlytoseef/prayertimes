import Header from '../components/Header';
import Footer from '../components/Footer';
import HijriCalendar from '../components/HijriCalendar';
import LanguageInitializer from '../components/LanguageInitializer';

export const metadata = {
  title: 'Hijri Calendar | التقويم الهجري | Islamic Calendar',
  description: 'View the current Hijri calendar with Gregorian dates. Islamic calendar for prayer times and important dates.',
};

export default function HijriCalendarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LanguageInitializer language="ar" />
      <Header />
      
      <main className="flex-grow">
        {/* Hijri Calendar Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <HijriCalendar />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
