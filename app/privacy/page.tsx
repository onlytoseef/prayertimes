import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية - Privacy Policy | أوقات الصلاة Prayer Times',
  description: 'Privacy policy for Prayer Times website - سياسة الخصوصية لموقع أوقات الصلاة',
  keywords: ['سياسة الخصوصية', 'privacy policy', 'prayer times privacy', 'data protection'],
};

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Hero */}
        <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[var(--font-tajawal)]">سياسة الخصوصية</h1>
            <h2 className="text-2xl md:text-3xl mb-4">Privacy Policy</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              Last Updated: October 25, 2025
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              
              {/* Arabic Section */}
              <div className="mb-12 font-[var(--font-tajawal)]">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">سياسة الخصوصية</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    نحن في موقع أوقات الصلاة نلتزم بحماية خصوصيتك. هذه السياسة توضح كيفية جمع واستخدام المعلومات عند زيارة موقعنا.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">المعلومات التي نجمعها</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>معلومات الموقع الجغرافي (اختيارية) لعرض مواقيت الصلاة الدقيقة</li>
                    <li>معلومات الاستخدام العامة مثل نوع المتصفح والجهاز</li>
                    <li>تفضيلات اللغة التي تختارها</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">كيف نستخدم معلوماتك</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>توفير مواقيت الصلاة الدقيقة بناءً على موقعك</li>
                    <li>تحسين تجربة المستخدم وخدماتنا</li>
                    <li>إرسال الإشعارات والتحديثات (إن طلبت ذلك)</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">حماية البيانات</h4>
                  <p>
                    نحن لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة. جميع البيانات محمية ومؤمنة.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">ملفات تعريف الارتباط (Cookies)</h4>
                  <p>
                    نستخدم ملفات تعريف الارتباط لحفظ تفضيلاتك اللغوية وتحسين تجربتك. يمكنك تعطيلها من إعدادات المتصفح.
                  </p>
                </div>
              </div>

              {/* English Section */}
              <div className="mb-12 border-t pt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    At Prayer Times, we are committed to protecting your privacy. This policy explains how we collect and use information when you visit our website.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Information We Collect</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Geographic location information (optional) to display accurate prayer times</li>
                    <li>General usage information such as browser type and device</li>
                    <li>Language preferences you select</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How We Use Your Information</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Provide accurate prayer times based on your location</li>
                    <li>Improve user experience and our services</li>
                    <li>Send notifications and updates (if requested)</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Data Protection</h4>
                  <p>
                    We do not sell or share your personal information with third parties. All data is protected and secured.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Cookies</h4>
                  <p>
                    We use cookies to save your language preferences and improve your experience. You can disable them in your browser settings.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Third-Party Services</h4>
                  <p>
                    We use the Aladhan API to fetch prayer times. Please refer to their privacy policy for information about how they handle data.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Your Rights</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Access and review your data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of data collection</li>
                    <li>Update your preferences at any time</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Contact Us</h4>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                    <br />
                    <a href="mailto:privacy@prayertimes.com" className="text-emerald-600 hover:underline">
                      privacy@prayertimes.com
                    </a>
                  </p>

                  <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Changes to This Policy</h4>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated "Last Updated" date.
                  </p>
                </div>
              </div>

              {/* Consent */}
              <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-600">
                <h4 className="font-bold text-gray-800 mb-2 font-[var(--font-tajawal)]">الموافقة / Consent</h4>
                <p className="text-gray-700 font-[var(--font-tajawal)] mb-2">
                  باستخدامك لموقعنا، فإنك توافق على سياسة الخصوصية هذه.
                </p>
                <p className="text-gray-700">
                  By using our website, you consent to this Privacy Policy.
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
