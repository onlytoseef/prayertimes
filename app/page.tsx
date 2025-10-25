import Header from './components/Header';
import Footer from './components/Footer';
import PrayerTimesCard from './components/PrayerTimesCard';
import HijriCalendar from './components/HijriCalendar';
import CountriesList from './components/CountriesList';
import { Church, Calendar, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Main Heading - Arabic (H1 for SEO) */}
              <h1 className="text-5xl md:text-7xl font-bold mb-4 font-[var(--font-tajawal)] leading-tight">
                أوقات الصلاة
              </h1>
              
              {/* English Heading */}
              <h2 className="text-3xl md:text-5xl font-bold mb-6 opacity-90">
                Prayer Times
              </h2>
              
              {/* Description - Arabic */}
              <p className="text-xl md:text-2xl mb-4 text-emerald-50 font-[var(--font-tajawal)] leading-relaxed">
                مواقيت الصلاة الدقيقة لجميع مدن العالم مع التقويم الهجري والميلادي
              </p>
              
              {/* Description - English */}
              <p className="text-lg md:text-xl text-emerald-100 mb-8">
                Accurate Islamic Prayer Times Worldwide with Hijri Calendar
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                  <Church className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="font-semibold font-[var(--font-tajawal)]">مواقيت دقيقة</p>
                  <p className="text-sm text-emerald-100">Accurate Times</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="font-semibold font-[var(--font-tajawal)]">التقويم الهجري</p>
                  <p className="text-sm text-emerald-100">Hijri Calendar</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                  <Globe className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="font-semibold font-[var(--font-tajawal)]">جميع الدول</p>
                  <p className="text-sm text-emerald-100">All Countries</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Makkah & Madinah Prayer Times Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-3 font-[var(--font-tajawal)]">
                مواقيت الصلاة في الحرمين الشريفين
              </h2>
              <p className="text-xl text-gray-600">Prayer Times in Holy Cities</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Makkah Prayer Times */}
              <PrayerTimesCard 
                city="Makkah" 
                cityAr="مكة المكرمة" 
                country="SA" 
              />
              
              {/* Madinah Prayer Times */}
              <PrayerTimesCard 
                city="Madinah" 
                cityAr="المدينة المنورة" 
                country="SA" 
              />
            </div>
          </div>
        </section>

        {/* Hijri Calendar Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <HijriCalendar />
          </div>
        </section>

        {/* Countries List Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <CountriesList />
          </div>
        </section>

        {/* Additional SEO Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 font-[var(--font-tajawal)] text-center">
                عن مواقيت الصلاة الإسلامية
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-4 font-[var(--font-tajawal)]">
                <p>
                  الصلاة هي الركن الثاني من أركان الإسلام، وهي فرض على كل مسلم ومسلمة. تبدأ الصلوات الخمس المفروضة مع صلاة الفجر وتنتهي بصلاة العشاء، ولكل صلاة وقت محدد يجب أداؤها فيه.
                </p>
                <p>
                  يوفر موقعنا مواقيت الصلاة الدقيقة لجميع المدن حول العالم، بما في ذلك مكة المكرمة والمدينة المنورة والعواصم الإسلامية الكبرى. نستخدم حسابات فلكية دقيقة لتحديد أوقات الصلاة بناءً على موقعك الجغرافي.
                </p>
              </div>
              
              <div className="mt-8 text-gray-700 leading-relaxed space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">About Islamic Prayer Times</h3>
                <p>
                  Prayer (Salah) is the second pillar of Islam and is obligatory for every Muslim. The five daily prayers are Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), and Isha (night). Each prayer has a specific time window during which it must be performed.
                </p>
                <p>
                  Our website provides accurate prayer times for cities worldwide, including Makkah, Madinah, and major Islamic capitals. We use precise astronomical calculations to determine prayer times based on your geographical location.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

