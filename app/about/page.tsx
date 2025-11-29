import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Church, Calendar, Globe, Languages } from 'lucide-react';

export const metadata: Metadata = {
  title: 'من نحن - About Us | أوقات الصلاة Prayer Times',
  description: 'تعرف على موقع أوقات الصلاة - Learn about our mission to provide accurate Islamic prayer times worldwide.',
  keywords: ['من نحن', 'about us', 'prayer times', 'islamic website', 'أوقات الصلاة'],
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Hero */}
        <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[var(--font-tajawal)]">من نحن</h1>
            <h2 className="text-2xl md:text-3xl mb-4">About Us</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              موقع إسلامي متخصص في توفير مواقيت الصلاة الدقيقة
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              {/* Arabic Section */}
              <div className="mb-12 font-[var(--font-tajawal)]">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">مهمتنا</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                  <p>
                    نحن نسعى لتوفير مواقيت الصلاة الدقيقة لجميع المسلمين حول العالم، مع الحرص على استخدام أحدث التقنيات والحسابات الفلكية الدقيقة.
                  </p>
                  <p>
                    موقعنا يخدم ملايين المسلمين يومياً، ويوفر لهم معلومات موثوقة عن مواقيت الصلاة في مختلف المدن والبلدان، بما في ذلك الحرمين الشريفين في مكة المكرمة والمدينة المنورة.
                  </p>
                  <p>
                    نؤمن بأن الصلاة في وقتها هي من أهم الفرائض الإسلامية، ولذلك نعمل جاهدين على توفير خدمة موثوقة ومجانية لجميع المسلمين.
                  </p>
                </div>
              </div>

              {/* English Section */}
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    We strive to provide accurate prayer times for Muslims worldwide, utilizing the latest technology and precise astronomical calculations.
                  </p>
                  <p>
                    Our website serves millions of Muslims daily, providing them with reliable information about prayer times in various cities and countries, including the Holy Mosques in Makkah and Madinah.
                  </p>
                  <p>
                    We believe that praying on time is one of the most important Islamic obligations, and we work hard to provide a reliable and free service for all Muslims.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center font-[var(--font-tajawal)]">
                  ما نقدمه
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <Church className="w-12 h-12 text-emerald-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2 font-[var(--font-tajawal)]">مواقيت دقيقة</h3>
                    <p className="text-gray-600 text-sm">
                      حسابات فلكية دقيقة باستخدام واجهة Aladhan API
                    </p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <Calendar className="w-12 h-12 text-emerald-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2 font-[var(--font-tajawal)]">التقويم الهجري</h3>
                    <p className="text-gray-600 text-sm">
                      تقويم هجري وميلادي شامل لمدة 30 يوماً
                    </p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <Globe className="w-12 h-12 text-emerald-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2 font-[var(--font-tajawal)]">تغطية عالمية</h3>
                    <p className="text-gray-600 text-sm">
                      مواقيت لجميع دول الخليج وآسيا والعالم
                    </p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <Languages className="w-12 h-12 text-emerald-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2 font-[var(--font-tajawal)]">لغات متعددة</h3>
                    <p className="text-gray-600 text-sm">
                      دعم اللغة العربية والإنجليزية والأردية
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
