import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CountriesList from '../components/CountriesList';
import { Church, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'مواقيت الصلاة - Prayer Times Worldwide | أوقات الصلاة',
  description: 'Find accurate Islamic prayer times (Salah times) for cities worldwide. Fajr, Dhuhr, Asr, Maghrib, Isha times - مواقيت الصلاة لجميع مدن العالم',
  keywords: [
    'prayer times',
    'salah times',
    'namaz times',
    'مواقيت الصلاة',
    'وقت الصلاة',
    'fajr time',
    'dhuhr time',
    'asr time',
    'maghrib time',
    'isha time',
    'islamic prayer schedule'
  ],
};

export default function PrayerTimesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Hero */}
        <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[var(--font-tajawal)]">
              مواقيت الصلاة
            </h1>
            <h2 className="text-2xl md:text-4xl mb-6">Prayer Times Worldwide</h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto font-[var(--font-tajawal)]">
              اختر دولتك لعرض مواقيت الصلاة الدقيقة
            </p>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto mt-2">
              Select your country to view accurate prayer times
            </p>
          </div>
        </section>

        {/* Prayer Times Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Church className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2 font-[var(--font-tajawal)]">الصلوات الخمس</h3>
                <p className="text-gray-600 text-sm">Five Daily Prayers</p>
                <p className="text-xs text-gray-500 mt-2 font-[var(--font-tajawal)]">
                  الفجر، الظهر، العصر، المغرب، العشاء
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2 font-[var(--font-tajawal)]">موقع دقيق</h3>
                <p className="text-gray-600 text-sm">Precise Location</p>
                <p className="text-xs text-gray-500 mt-2">
                  Based on geographical coordinates
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Clock className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2 font-[var(--font-tajawal)]">تحديث يومي</h3>
                <p className="text-gray-600 text-sm">Daily Updates</p>
                <p className="text-xs text-gray-500 mt-2">
                  Updated automatically every day
                </p>
              </div>
            </div>

            {/* Countries List Component */}
            <CountriesList />

            {/* Prayer Information */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 font-[var(--font-tajawal)]">
                  الصلوات الخمس المفروضة
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-2 text-blue-900 font-[var(--font-tajawal)]">صلاة الفجر</h4>
                    <p className="text-sm text-blue-800 mb-2">Fajr Prayer</p>
                    <p className="text-gray-700 text-sm font-[var(--font-tajawal)]">
                      صلاة الفجر تبدأ من طلوع الفجر الصادق حتى شروق الشمس
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                      Dawn prayer, from true dawn until sunrise
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-2 text-yellow-900 font-[var(--font-tajawal)]">صلاة الظهر</h4>
                    <p className="text-sm text-yellow-800 mb-2">Dhuhr Prayer</p>
                    <p className="text-gray-700 text-sm font-[var(--font-tajawal)]">
                      صلاة الظهر تبدأ من زوال الشمس حتى وقت العصر
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                      Noon prayer, after sun passes meridian
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-2 text-orange-900 font-[var(--font-tajawal)]">صلاة العصر</h4>
                    <p className="text-sm text-orange-800 mb-2">Asr Prayer</p>
                    <p className="text-gray-700 text-sm font-[var(--font-tajawal)]">
                      صلاة العصر تبدأ عندما يصبح ظل الشيء مثله
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                      Afternoon prayer, late afternoon
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-2 text-red-900 font-[var(--font-tajawal)]">صلاة المغرب</h4>
                    <p className="text-sm text-red-800 mb-2">Maghrib Prayer</p>
                    <p className="text-gray-700 text-sm font-[var(--font-tajawal)]">
                      صلاة المغرب تبدأ من غروب الشمس حتى مغيب الشفق الأحمر
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                      Sunset prayer, just after sunset
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg md:col-span-2">
                    <h4 className="text-xl font-bold mb-2 text-indigo-900 font-[var(--font-tajawal)]">صلاة العشاء</h4>
                    <p className="text-sm text-indigo-800 mb-2">Isha Prayer</p>
                    <p className="text-gray-700 text-sm font-[var(--font-tajawal)]">
                      صلاة العشاء تبدأ من مغيب الشفق الأحمر حتى منتصف الليل
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                      Night prayer, after twilight disappears
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
