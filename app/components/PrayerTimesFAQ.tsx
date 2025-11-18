'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../context/LanguageContext';

interface FAQItem {
  question: { ar: string; en: string; ur: string };
  answer: { ar: string; en: string; ur: string };
}

interface PrayerTimesFAQProps {
  language?: Language;
  cityName?: string;
  cityNameAr?: string;
  countryName?: string;
  countryNameAr?: string;
}

export default function PrayerTimesFAQ({ 
  language: propLanguage,
  cityName = '',
  cityNameAr = '',
  countryName = '',
  countryNameAr = ''
}: PrayerTimesFAQProps) {
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Get display names based on language
  const displayCityName = language === 'ar' || language === 'ur' ? cityNameAr : cityName;
  const displayCountryName = language === 'ar' || language === 'ur' ? countryNameAr : countryName;

  const faqs: FAQItem[] = [
    {
      question: {
        ar: `ما هي مواقيت الصلاة في ${cityNameAr}؟`,
        en: `What are the prayer times in ${cityName}?`,
        ur: `${cityNameAr} میں نماز کے اوقات کیا ہیں؟`
      },
      answer: {
        ar: `مواقيت الصلاة في ${cityNameAr}, ${countryNameAr} تشمل خمس صلوات يومية: الفجر (قبل شروق الشمس)، الظهر (بعد الزوال)، العصر (بعد الظهر)، المغرب (عند غروب الشمس)، والعشاء (بعد غياب الشفق). يتم تحديث هذه الأوقات يومياً بناءً على الموقع الجغرافي الدقيق لـ ${cityNameAr}.`,
        en: `Prayer times in ${cityName}, ${countryName} include five daily prayers: Fajr (before sunrise), Dhuhr (after midday), Asr (afternoon), Maghrib (at sunset), and Isha (after twilight). These times are updated daily based on the precise geographical location of ${cityName}.`,
        ur: `${cityNameAr}, ${countryNameAr} میں نماز کے اوقات میں پانچ روزانہ نمازیں شامل ہیں: فجر (طلوع آفتاب سے پہلے)، ظہر (دوپہر کے بعد)، عصر (سہ پہر)، مغرب (غروب آفتاب کے وقت)، اور عشاء (شام کے بعد)۔ یہ اوقات ${cityNameAr} کے درست جغرافیائی محل وقوع کی بنیاد پر روزانہ اپ ڈیٹ کیے جاتے ہیں۔`
      }
    },
    {
      question: {
        ar: `كيف يتم حساب أوقات الصلاة في ${cityNameAr}؟`,
        en: `How are prayer times calculated for ${cityName}?`,
        ur: `${cityNameAr} کے لیے نماز کے اوقات کیسے شمار کیے جاتے ہیں؟`
      },
      answer: {
        ar: `يتم حساب أوقات الصلاة في ${cityNameAr} بناءً على خطوط الطول والعرض الدقيقة للمدينة. نستخدم حسابات فلكية معتمدة من المراكز الإسلامية وطريقة حساب متوافقة مع ${countryNameAr} لضمان دقة المواقيت لجميع سكان ${cityNameAr}.`,
        en: `Prayer times for ${cityName} are calculated based on the city's precise latitude and longitude coordinates. We use astronomical calculations approved by Islamic centers and calculation methods compatible with ${countryName} to ensure accurate timings for all residents of ${cityName}.`,
        ur: `${cityNameAr} کے لیے نماز کے اوقات شہر کے درست عرض البلد اور طول البلد کی بنیاد پر شمار کیے جاتے ہیں۔ ہم اسلامی مراکز کی منظور شدہ فلکیاتی حسابات اور ${countryNameAr} کے مطابق حساب کے طریقے استعمال کرتے ہیں تاکہ ${cityNameAr} کے تمام رہائشیوں کے لیے درست اوقات کو یقینی بنایا جا سکے۔`
      }
    },
    {
      question: {
        ar: `متى يبدأ وقت صلاة الفجر في ${cityNameAr}؟`,
        en: `When does Fajr prayer time start in ${cityName}?`,
        ur: `${cityNameAr} میں فجر کی نماز کا وقت کب شروع ہوتا ہے؟`
      },
      answer: {
        ar: `يبدأ وقت صلاة الفجر في ${cityNameAr} عندما يظهر الفجر الصادق (الخيط الأبيض) في الأفق الشرقي، وينتهي عند شروق الشمس. الوقت المحدد يتغير يومياً حسب الموسم والموقع الجغرافي لـ ${cityNameAr} في ${countryNameAr}. يمكنك الاطلاع على التوقيت الدقيق أعلاه.`,
        en: `Fajr prayer time in ${cityName} begins when true dawn (white thread) appears on the eastern horizon and ends at sunrise. The exact time changes daily based on the season and geographical location of ${cityName} in ${countryName}. You can check the precise timing above.`,
        ur: `${cityNameAr} میں فجر کی نماز کا وقت اس وقت شروع ہوتا ہے جب مشرقی افق پر سچی فجر (سفید دھاگا) ظاہر ہوتی ہے اور طلوع آفتاب کے وقت ختم ہوتا ہے۔ درست وقت موسم اور ${countryNameAr} میں ${cityNameAr} کے جغرافیائی محل وقوع کی بنیاد پر روزانہ بدلتا ہے۔ آپ اوپر درست وقت دیکھ سکتے ہیں۔`
      }
    },
    {
      question: {
        ar: `هل تختلف أوقات الصلاة في ${cityNameAr} عن مدن ${countryNameAr} الأخرى؟`,
        en: `Do prayer times in ${cityName} differ from other cities in ${countryName}?`,
        ur: `کیا ${cityNameAr} میں نماز کے اوقات ${countryNameAr} کے دوسرے شہروں سے مختلف ہیں؟`
      },
      answer: {
        ar: `نعم، قد تختلف أوقات الصلاة في ${cityNameAr} قليلاً عن المدن الأخرى في ${countryNameAr} بسبب الاختلاف في خطوط الطول والعرض. المدن الواقعة في شمال ${countryNameAr} قد يكون لها أوقات مختلفة عن المدن الجنوبية، والمدن الشرقية تختلف عن الغربية. لذلك من المهم التحقق من الأوقات المحددة لـ ${cityNameAr}.`,
        en: `Yes, prayer times in ${cityName} may differ slightly from other cities in ${countryName} due to differences in latitude and longitude. Cities in the north of ${countryName} may have different times than southern cities, and eastern cities differ from western ones. Therefore, it's important to check the specific times for ${cityName}.`,
        ur: `جی ہاں، عرض البلد اور طول البلد میں فرق کی وجہ سے ${cityNameAr} میں نماز کے اوقات ${countryNameAr} کے دوسرے شہروں سے تھوڑا مختلف ہو سکتے ہیں۔ ${countryNameAr} کے شمال میں واقع شہروں کے اوقات جنوبی شہروں سے مختلف ہو سکتے ہیں، اور مشرقی شہر مغربی سے مختلف ہیں۔ لہذا ${cityNameAr} کے مخصوص اوقات چیک کرنا ضروری ہے۔`
      }
    },
    {
      question: {
        ar: `ما هو اتجاه القبلة من ${cityNameAr}؟`,
        en: `What is the Qibla direction from ${cityName}?`,
        ur: `${cityNameAr} سے قبلہ کی سمت کیا ہے؟`
      },
      answer: {
        ar: `اتجاه القبلة من ${cityNameAr}, ${countryNameAr} يشير نحو الكعبة المشرفة في مكة المكرمة. نوفر لك الاتجاه الدقيق بالدرجات والمسافة من ${cityNameAr} إلى مكة في قسم "اتجاه القبلة" أعلاه. يمكنك استخدام البوصلة الرقمية لتحديد الاتجاه بدقة عند الصلاة.`,
        en: `The Qibla direction from ${cityName}, ${countryName} points towards the Holy Kaaba in Makkah. We provide you with the precise direction in degrees and the distance from ${cityName} to Makkah in the "Qibla Direction" section above. You can use the digital compass to accurately determine the direction when praying.`,
        ur: `${cityNameAr}, ${countryNameAr} سے قبلہ کی سمت مکہ مکرمہ میں خانہ کعبہ کی طرف اشارہ کرتی ہے۔ ہم آپ کو درجات میں درست سمت اور ${cityNameAr} سے مکہ تک کا فاصلہ اوپر "قبلہ کی سمت" سیکشن میں فراہم کرتے ہیں۔ آپ نماز کے وقت سمت کا درست تعین کرنے کے لیے ڈیجیٹل کمپاس استعمال کر سکتے ہیں۔`
      }
    },
    {
      question: {
        ar: `هل يتم تحديث مواقيت الصلاة في ${cityNameAr} تلقائياً؟`,
        en: `Are prayer times in ${cityName} updated automatically?`,
        ur: `کیا ${cityNameAr} میں نماز کے اوقات خودکار طور پر اپ ڈیٹ ہوتے ہیں؟`
      },
      answer: {
        ar: `نعم، يتم تحديث مواقيت الصلاة في ${cityNameAr} تلقائياً كل 6 ساعات لضمان الدقة. نظامنا يحسب الأوقات بناءً على التاريخ الحالي والموقع الجغرافي لـ ${cityNameAr}، ${countryNameAr}، مع الأخذ في الاعتبار التقويم الهجري والميلادي. يمكنك الاعتماد على هذه الأوقات لجميع صلواتك اليومية.`,
        en: `Yes, prayer times in ${cityName} are automatically updated every 6 hours to ensure accuracy. Our system calculates times based on the current date and geographical location of ${cityName}, ${countryName}, taking into account both Hijri and Gregorian calendars. You can rely on these times for all your daily prayers.`,
        ur: `جی ہاں، ${cityNameAr} میں نماز کے اوقات درستگی کو یقینی بنانے کے لیے ہر 6 گھنٹے میں خودکار طور پر اپ ڈیٹ ہوتے ہیں۔ ہمارا نظام ${cityNameAr}, ${countryNameAr} کی موجودہ تاریخ اور جغرافیائی محل وقوع کی بنیاد پر اوقات کا حساب لگاتا ہے، ہجری اور عیسوی دونوں کیلنڈرز کو مدنظر رکھتے ہوئے۔ آپ اپنی تمام روزانہ نمازوں کے لیے ان اوقات پر بھروسہ کر سکتے ہیں۔`
      }
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-[var(--font-tajawal)]">
                {language === 'ar' 
                  ? 'الأسئلة الشائعة'
                  : language === 'ur'
                  ? 'عمومی سوالات'
                  : 'Frequently Asked Questions'}
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-[var(--font-tajawal)]">
              {language === 'ar'
                ? 'إجابات على الأسئلة الأكثر شيوعاً حول مواقيت الصلاة'
                : language === 'ur'
                ? 'نماز کے اوقات کے بارے میں عام سوالات کے جوابات'
                : 'Answers to common questions about prayer times'}
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300 overflow-hidden"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-emerald-50/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 font-[var(--font-tajawal)] flex-1 pr-4">
                    {language === 'ar' ? faq.question.ar : language === 'ur' ? faq.question.ur : faq.question.en}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-emerald-600 transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer Panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 sm:p-6 pt-0 border-t border-gray-200">
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-[var(--font-tajawal)]">
                      {language === 'ar' ? faq.answer.ar : language === 'ur' ? faq.answer.ur : faq.answer.en}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
            <p className="text-gray-700 text-sm sm:text-base font-[var(--font-tajawal)]">
              {language === 'ar'
                ? 'لمزيد من المعلومات حول مواقيت الصلاة، تصفح مدن أخرى أو اتصل بنا'
                : language === 'ur'
                ? 'نماز کے اوقات کے بارے میں مزید معلومات کے لیے، دوسرے شہروں کو دیکھیں یا ہم سے رابطہ کریں'
                : 'For more information about prayer times, browse other cities or contact us'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
