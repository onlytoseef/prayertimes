import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Globe, Clock, MessageSquare, Facebook, Twitter, Instagram, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'اتصل بنا - Contact Us | أوقات الصلاة Prayer Times',
  description: 'تواصل معنا - Contact us for questions about prayer times and Islamic calendar.',
  keywords: ['اتصل بنا', 'contact us', 'prayer times contact', 'تواصل معنا'],
};

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Hero */}
        <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[var(--font-tajawal)]">اتصل بنا</h1>
            <h2 className="text-2xl md:text-3xl mb-4">Contact Us</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto font-[var(--font-tajawal)]">
              نحن هنا للإجابة على استفساراتكم
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 font-[var(--font-tajawal)]">
                  معلومات الاتصال
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">البريد الإلكتروني</h3>
                      <p className="text-gray-600">info@prayertimes.com</p>
                      <p className="text-gray-600">support@prayertimes.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Globe className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 font-[var(--font-tajawal)]">الموقع الإلكتروني</h3>
                      <p className="text-gray-600">www.prayertimes.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 font-[var(--font-tajawal)]">ساعات العمل</h3>
                      <p className="text-gray-600">24/7 - خدمة متاحة على مدار الساعة</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MessageSquare className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 font-[var(--font-tajawal)]">وسائل التواصل الاجتماعي</h3>
                      <div className="flex gap-3 mt-2">
                        <a href="#" className="text-emerald-600 hover:scale-110 transition-transform">
                          <Facebook className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-emerald-600 hover:scale-110 transition-transform">
                          <Twitter className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-emerald-600 hover:scale-110 transition-transform">
                          <Instagram className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-emerald-600 hover:scale-110 transition-transform">
                          <Smartphone className="w-6 h-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Message</h3>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Name / الاسم
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email / البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                      Subject / الموضوع
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Message subject"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Message / الرسالة
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    إرسال الرسالة / Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center font-[var(--font-tajawal)]">
                الأسئلة الشائعة
              </h3>
              <div className="space-y-4">
                <details className="bg-gray-50 p-4 rounded-lg">
                  <summary className="font-semibold text-gray-800 cursor-pointer font-[var(--font-tajawal)]">
                    كيف يتم حساب مواقيت الصلاة؟
                  </summary>
                  <p className="mt-2 text-gray-600 font-[var(--font-tajawal)]">
                    نستخدم حسابات فلكية دقيقة من خلال واجهة Aladhan API التي تعتمد على موقعك الجغرافي وزاوية الشمس.
                  </p>
                </details>
                
                <details className="bg-gray-50 p-4 rounded-lg">
                  <summary className="font-semibold text-gray-800 cursor-pointer">
                    How accurate are the prayer times?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Our prayer times are calculated using precise astronomical data and are accurate within minutes.
                  </p>
                </details>
                
                <details className="bg-gray-50 p-4 rounded-lg">
                  <summary className="font-semibold text-gray-800 cursor-pointer font-[var(--font-tajawal)]">
                    هل الخدمة مجانية؟
                  </summary>
                  <p className="mt-2 text-gray-600 font-[var(--font-tajawal)]">
                    نعم، جميع خدماتنا مجانية تماماً ومتاحة للجميع.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
